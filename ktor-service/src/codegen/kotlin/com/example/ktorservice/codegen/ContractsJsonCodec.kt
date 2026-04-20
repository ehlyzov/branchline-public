package com.example.ktorservice.codegen

import io.github.ehlyzov.branchline.contract.TransformContract
import kotlinx.serialization.builtins.MapSerializer
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.json.Json

object ContractsJsonCodec {
    private val json = Json {
        prettyPrint = true
        encodeDefaults = true
        ignoreUnknownKeys = true
    }

    private val serializer = MapSerializer(String.serializer(), TransformContract.serializer())

    fun encode(contracts: Map<String, TransformContract>): String =
        json.encodeToString(serializer, normalize(contracts))

    fun decode(raw: String): LinkedHashMap<String, TransformContract> = normalize(
        json.decodeFromString(serializer, raw),
    )

    private fun normalize(contracts: Map<String, TransformContract>): LinkedHashMap<String, TransformContract> {
        val sortedKeys = contracts.keys.sorted()
        val normalized = LinkedHashMap<String, TransformContract>(sortedKeys.size)
        for (key in sortedKeys) {
            normalized[key] = contracts.getValue(key)
        }
        return normalized
    }
}
