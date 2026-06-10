package io.github.ehlyzov.branchline.benchmarks.jsonata

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import java.nio.channels.FileChannel
import java.nio.file.AtomicMoveNotSupportedException
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.nio.file.StandardCopyOption
import java.nio.file.StandardOpenOption

private val STATE_REPORT_DIR: Path = resolveJsonataBenchmarkReportDir()
private val STATE_REPORT_CSV_PATH: Path = STATE_REPORT_DIR.resolve("state-report.csv")
private val STATE_REPORT_JSON_PATH: Path = STATE_REPORT_DIR.resolve("state-report.json")
private val STATE_REPORT_LOCK_PATH: Path = STATE_REPORT_DIR.resolve("state-report.lock")

internal object CrossEngineStateReport {
    private val lock = Any()
    private val objectMapper = ObjectMapper()
    private val rowComparator = compareBy<StateReportRow> { it.caseId }.thenBy { it.engineId }

    fun write(decisions: Map<OutputValidationKey, OutputValidationDecision>) {
        val incoming = decisions.map { (key, decision) ->
            StateReportRow(
                engineId = key.engineId,
                caseId = key.caseId,
                validationState = decision.validationState,
                comparable = decision.comparable,
                phase = decision.phase,
                reason = decision.reason,
                notes = decision.notes,
            )
        }
        synchronized(lock) {
            Files.createDirectories(STATE_REPORT_DIR)
            FileChannel.open(
                STATE_REPORT_LOCK_PATH,
                StandardOpenOption.CREATE,
                StandardOpenOption.WRITE,
            ).use { channel ->
                channel.lock().use {
                    val rows = LinkedHashMap<RowKey, StateReportRow>()
                    for (row in readExistingRows()) {
                        rows[row.key] = row
                    }
                    for (row in incoming) {
                        rows[row.key] = row
                    }
                    val sortedRows = rows.values.sortedWith(rowComparator)
                    writeCsv(sortedRows)
                    writeJson(sortedRows)
                }
            }
        }
    }

    private fun readExistingRows(): List<StateReportRow> {
        if (!Files.isRegularFile(STATE_REPORT_JSON_PATH)) return emptyList()
        val root = try {
            objectMapper.readTree(STATE_REPORT_JSON_PATH.toFile())
        } catch (_: Throwable) {
            return emptyList()
        }
        if (!root.isArray) return emptyList()
        val rows = ArrayList<StateReportRow>()
        for (node in root) {
            rowFromJson(node)?.let { rows.add(it) }
        }
        return rows
    }

    private fun rowFromJson(node: JsonNode): StateReportRow? {
        val engine = node["engine"]?.asText()?.takeIf { it.isNotBlank() } ?: return null
        val case = node["case"]?.asText()?.takeIf { it.isNotBlank() } ?: return null
        return StateReportRow(
            engineId = engine,
            caseId = case,
            validationState = node["validation_state"]?.asText() ?: "not_comparable",
            comparable = node["comparable"]?.asBoolean(false) ?: false,
            phase = node["phase"]?.asText() ?: "",
            reason = node["reason"]?.asText() ?: "",
            notes = node["notes"]?.asText() ?: "",
        )
    }

    private fun writeCsv(rows: List<StateReportRow>) {
        val payload = buildString {
            appendLine("engine,case,validation_state,comparable,phase,reason,notes")
            for (row in rows) {
                appendLine(
                    listOf(
                        row.engineId,
                        row.caseId,
                        row.validationState,
                        row.comparable.toString(),
                        row.phase,
                        row.reason,
                        row.notes,
                    ).joinToString(",") { escapeCsv(it) },
                )
            }
        }
        writeAtomically(STATE_REPORT_CSV_PATH, payload)
    }

    private fun writeJson(rows: List<StateReportRow>) {
        val payload = objectMapper.writerWithDefaultPrettyPrinter()
            .writeValueAsString(rows.map { it.toJsonObject() }) + "\n"
        writeAtomically(STATE_REPORT_JSON_PATH, payload)
    }

    private fun writeAtomically(path: Path, payload: String) {
        val tmp = path.resolveSibling("${path.fileName}.tmp")
        Files.writeString(
            tmp,
            payload,
            StandardOpenOption.CREATE,
            StandardOpenOption.TRUNCATE_EXISTING,
        )
        try {
            Files.move(tmp, path, StandardCopyOption.ATOMIC_MOVE, StandardCopyOption.REPLACE_EXISTING)
        } catch (_: AtomicMoveNotSupportedException) {
            Files.move(tmp, path, StandardCopyOption.REPLACE_EXISTING)
        }
    }

    private fun escapeCsv(value: String): String {
        val mustQuote = value.any { it == ',' || it == '"' || it == '\n' || it == '\r' }
        if (!mustQuote) return value
        return "\"" + value.replace("\"", "\"\"") + "\""
    }
}

private data class StateReportRow(
    val engineId: String,
    val caseId: String,
    val validationState: String,
    val comparable: Boolean,
    val phase: String,
    val reason: String,
    val notes: String,
) {
    val key: RowKey
        get() = RowKey(engineId, caseId)

    fun toJsonObject(): Map<String, Any> {
        return linkedMapOf(
            "engine" to engineId,
            "case" to caseId,
            "validation_state" to validationState,
            "comparable" to comparable,
            "phase" to phase,
            "reason" to reason,
            "notes" to notes,
        )
    }
}

private data class RowKey(
    val engineId: String,
    val caseId: String,
)

internal fun resolveJsonataBenchmarkReportDir(): Path {
    val cwd = Paths.get("").toAbsolutePath().normalize()
    val projectRoot = if (cwd.fileName?.toString() == "jsonata-benchmarks") {
        cwd
    } else {
        cwd.resolve("jsonata-benchmarks")
    }
    return projectRoot.resolve("build").resolve("reports").resolve("jsonata-benchmarks")
}
