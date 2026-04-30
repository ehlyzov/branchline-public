import org.gradle.api.tasks.SourceSetContainer

plugins {
    kotlin("jvm") version "2.3.0"
    application
}

val ktorVersion = providers.gradleProperty("ktor.version").get()
val jacksonVersion = providers.gradleProperty("jackson.version").get()
val logbackVersion = providers.gradleProperty("logback.version").get()
val junitVersion = providers.gradleProperty("junit.version").get()
val branchlineVersion = providers.gradleProperty("branchline.version").get()
val branchlineInterpreterArtifact = providers.gradleProperty("branchline.interpreter.artifact").get()
val kotlinPoetVersion = providers.gradleProperty("kotlinpoet.version").get()
val kotlinxSerializationVersion = providers.gradleProperty("kotlinx.serialization.version").get()
val useLocalBranchline =
    providers.gradleProperty("branchline.useLocal").orNull?.toBooleanStrictOrNull() == true
val branchlineInterpreterJarPath = providers.gradleProperty("branchline.interpreter.jarPath").orNull
val useBranchlineJar = !branchlineInterpreterJarPath.isNullOrBlank()
val githubActor = (findProperty("gpr.user") as String?) ?: System.getenv("GITHUB_ACTOR")
val githubToken = (findProperty("gpr.key") as String?) ?: System.getenv("GITHUB_TOKEN")

val generatedContractsDir = layout.buildDirectory.dir("generated/branchline")
val generatedContractsFile = layout.buildDirectory.file("generated/branchline/contracts.json")
val generatedDtoDir = layout.buildDirectory.dir("generated/source/branchlineContracts/kotlin")

repositories {
    mavenCentral()

    if (!useLocalBranchline && !useBranchlineJar && !githubActor.isNullOrBlank() && !githubToken.isNullOrBlank()) {
        maven("https://maven.pkg.github.com/ehlyzov/branchline") {
            credentials {
                username = githubActor
                password = githubToken
            }
        }
    }
}

val sourceSets = extensions.getByType(SourceSetContainer::class.java)
sourceSets.named("main") {
    java.srcDir(generatedDtoDir)
    resources.srcDir(generatedContractsDir)
}

val codegenSourceSet = sourceSets.create("codegen") {
    java.srcDir("src/codegen/kotlin")
}

dependencies {
    implementation(kotlin("stdlib"))

    implementation("io.ktor:ktor-server-core-jvm:$ktorVersion")
    implementation("io.ktor:ktor-server-netty-jvm:$ktorVersion")
    implementation("io.ktor:ktor-server-content-negotiation-jvm:$ktorVersion")
    implementation("io.ktor:ktor-serialization-jackson-jvm:$ktorVersion")
    implementation("io.ktor:ktor-server-status-pages-jvm:$ktorVersion")
    implementation("io.ktor:ktor-server-call-logging-jvm:$ktorVersion")

    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:$jacksonVersion")
    implementation("com.fasterxml.jackson.datatype:jackson-datatype-jsr310:$jacksonVersion")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:$kotlinxSerializationVersion")
    implementation("ch.qos.logback:logback-classic:$logbackVersion")

    if (useBranchlineJar) {
        implementation(files(branchlineInterpreterJarPath))
    } else {
        implementation("io.github.ehlyzov.branchline:$branchlineInterpreterArtifact:$branchlineVersion")
    }

    add("codegenImplementation", kotlin("stdlib"))
    add("codegenImplementation", "com.squareup:kotlinpoet:$kotlinPoetVersion")
    add("codegenImplementation", "org.jetbrains.kotlinx:kotlinx-serialization-json:$kotlinxSerializationVersion")
    if (useBranchlineJar) {
        add("codegenImplementation", files(branchlineInterpreterJarPath))
    } else {
        add("codegenImplementation", "io.github.ehlyzov.branchline:$branchlineInterpreterArtifact:$branchlineVersion")
    }

    testImplementation("io.ktor:ktor-server-test-host-jvm:$ktorVersion")
    testImplementation(kotlin("test"))
    testImplementation("org.junit.jupiter:junit-jupiter-api:$junitVersion")
    testImplementation("com.squareup:kotlinpoet:$kotlinPoetVersion")
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine:$junitVersion")

    testImplementation(codegenSourceSet.output)
}

val extractBranchlineContracts by tasks.registering(JavaExec::class) {
    group = "code generation"
    description = "Extracts Branchline contracts from scripts"

    dependsOn(tasks.named(codegenSourceSet.classesTaskName))

    classpath = codegenSourceSet.runtimeClasspath
    mainClass.set("com.example.ktorservice.codegen.ExtractContractsMainKt")

    val scriptsDir = layout.projectDirectory.dir("src/main/resources/branchline").asFile
    val outputFile = generatedContractsFile.get().asFile

    inputs.files(fileTree(scriptsDir) { include("**/*.bl") })
    outputs.file(outputFile)

    doFirst {
        outputFile.parentFile.mkdirs()
    }

    args(scriptsDir.absolutePath, outputFile.absolutePath)
}

val generateBranchlineDtos by tasks.registering(JavaExec::class) {
    group = "code generation"
    description = "Generates Kotlin DTOs from extracted Branchline contracts using KotlinPoet"

    dependsOn(extractBranchlineContracts)
    dependsOn(tasks.named(codegenSourceSet.classesTaskName))

    classpath = codegenSourceSet.runtimeClasspath
    mainClass.set("com.example.ktorservice.codegen.GenerateDtosMainKt")

    val contractsFile = generatedContractsFile.get().asFile
    val outputDir = generatedDtoDir.get().asFile

    inputs.file(contractsFile)
    outputs.dir(outputDir)

    doFirst {
        outputDir.mkdirs()
    }

    args(
        contractsFile.absolutePath,
        outputDir.absolutePath,
        "com.example.ktorservice.generated.contracts",
    )
}

tasks.named("compileKotlin") {
    dependsOn(generateBranchlineDtos)
}

tasks.named("processResources") {
    dependsOn(extractBranchlineContracts)
}

kotlin {
    jvmToolchain(21)
}

application {
    mainClass.set("com.example.ktorservice.ApplicationKt")
}

tasks.test {
    useJUnitPlatform()
}
