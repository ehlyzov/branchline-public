rootProject.name = "ktor-service"

val useLocalBranchline =
    providers.gradleProperty("branchline.useLocal").orNull?.toBooleanStrictOrNull() == true

if (useLocalBranchline) {
    includeBuild("..") {
        dependencySubstitution {
            substitute(module("io.github.ehlyzov.branchline:branchline-interpreter"))
                .using(project(":interpreter"))
        }
    }
}
