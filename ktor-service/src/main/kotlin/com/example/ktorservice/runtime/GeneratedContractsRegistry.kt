package com.example.ktorservice.runtime

import io.github.ehlyzov.branchline.contract.TransformContract
import kotlinx.serialization.builtins.MapSerializer
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.json.Json

object GeneratedContractsRegistry {
    private const val defaultContractsResource = "contracts.json"

    private val json = Json {
        ignoreUnknownKeys = true
    }

    private val serializer = MapSerializer(String.serializer(), TransformContract.serializer())

    fun loadFromResources(resourcePath: String = defaultContractsResource): LinkedHashMap<String, TransformContract> {
        val stream = Thread.currentThread().contextClassLoader.getResourceAsStream(resourcePath)
            ?: throw TransformExecutionException("Generated contracts resource '$resourcePath' is missing")
        val decoded = stream.bufferedReader().use { reader ->
            json.decodeFromString(serializer, reader.readText())
        }
        val contracts = LinkedHashMap<String, TransformContract>(decoded.size)
        for (key in decoded.keys.sorted()) {
            contracts[key] = decoded.getValue(key)
        }
        return contracts
    }
}
