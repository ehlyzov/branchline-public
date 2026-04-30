package com.example.ktorservice.bridge

import com.example.ktorservice.domain.PriceChangeAckMessage
import com.example.ktorservice.domain.PriceMutationResult
import com.example.ktorservice.domain.PriceUpdatedEvent
import com.example.ktorservice.domain.ProductPriceKafkaDto
import com.example.ktorservice.generated.contracts.ComposeOutboundInputDto
import com.example.ktorservice.generated.contracts.ComposeOutboundOutputDto
import com.example.ktorservice.generated.contracts.DetectBatchModeInputDto
import com.example.ktorservice.generated.contracts.DetectBatchModeInputDtoItemsItem
import com.example.ktorservice.generated.contracts.DetectBatchModeOutputDto
import com.example.ktorservice.generated.contracts.ValidateAndPlanInputDto
import com.example.ktorservice.generated.contracts.ValidateAndPlanOutputDto
import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.registerKotlinModule
import java.math.BigDecimal
import java.time.OffsetDateTime
import java.util.UUID

interface BranchlineInputMapper<T> {
    fun toMap(value: T): Map<String, Any?>
}

interface BranchlineOutputMapper<T> {
    fun fromMap(value: Map<String, Any?>): T
}

class BranchlinePayloadMapper : BranchlineInputMapper<ProductPriceKafkaDto> {
    private val objectMapper: ObjectMapper = jacksonObjectMapper()
        .registerKotlinModule()
        .registerModule(JavaTimeModule())
        .setSerializationInclusion(JsonInclude.Include.NON_NULL)

    override fun toMap(value: ProductPriceKafkaDto): Map<String, Any?> = objectMapper.convertValue(
        toValidateAndPlanInput(value),
        mapType,
    )

    fun toValidateAndPlanInput(dto: ProductPriceKafkaDto): ValidateAndPlanInputDto = ValidateAndPlanInputDto(
        transactionId = dto.transactionId,
        warehouseId = dto.warehouseId.toString(),
        skuId = dto.skuId.toString(),
        price = dto.price.toPlainString(),
        effectiveTime = dto.effectiveTime.toString(),
        source = dto.source,
        needAck = dto.needAck,
    )

    fun toValidateAndPlanOutput(value: Map<String, Any?>): ValidateAndPlanOutputDto =
        objectMapper.convertValue(value, ValidateAndPlanOutputDto::class.java)

    fun toComposeOutboundInput(
        dto: ProductPriceKafkaDto,
        accepted: Boolean,
        reason: String?,
        errors: List<String>,
        mutationStatus: String,
        mutation: PriceMutationResult?,
        eventId: String,
        storedAt: OffsetDateTime,
    ): ComposeOutboundInputDto = ComposeOutboundInputDto(
        transactionId = dto.transactionId,
        needAck = dto.needAck,
        accepted = accepted,
        reason = reason,
        errors = errors,
        mutationStatus = mutationStatus,
        warehouseId = dto.warehouseId.toString(),
        skuId = dto.skuId.toString(),
        productId = mutation?.price?.productId?.toString() ?: dto.skuId.toString(),
        price = (mutation?.price?.price ?: dto.price).toPlainString(),
        effectiveTime = (mutation?.price?.effectiveTime ?: dto.effectiveTime).toString(),
        storedAt = storedAt.toString(),
        eventId = eventId,
        source = dto.source,
    )

    fun toComposeOutboundOutput(value: Map<String, Any?>): ComposeOutboundOutputDto =
        objectMapper.convertValue(value, ComposeOutboundOutputDto::class.java)

    fun toDetectBatchModeInput(dtos: List<ProductPriceKafkaDto>): DetectBatchModeInputDto = DetectBatchModeInputDto(
        items = dtos.map(::toDetectBatchModeItem),
    )

    fun toDetectBatchModeOutput(value: Map<String, Any?>): DetectBatchModeOutputDto =
        objectMapper.convertValue(value, DetectBatchModeOutputDto::class.java)

    fun toAck(output: ComposeOutboundOutputDto): PriceChangeAckMessage? {
        val payload = output.ack ?: return null
        return objectMapper.convertValue(payload, PriceChangeAckMessage::class.java)
    }

    fun toUpdatedEvent(output: ComposeOutboundOutputDto): PriceUpdatedEvent? {
        val payload = output.event ?: return null
        val mapPayload = objectMapper.convertValue(payload, mapType)
        return PriceUpdatedEvent(
            transactionId = requireString(mapPayload, "transactionId"),
            warehouseId = UUID.fromString(requireString(mapPayload, "warehouseId")),
            skuId = UUID.fromString(requireString(mapPayload, "skuId")),
            productId = UUID.fromString(requireString(mapPayload, "productId")),
            price = asBigDecimal(mapPayload["price"], "price"),
            effectiveTime = OffsetDateTime.parse(requireString(mapPayload, "effectiveTime")),
            storedAt = OffsetDateTime.parse(requireString(mapPayload, "storedAt")),
            eventId = requireString(mapPayload, "eventId"),
            source = requireString(mapPayload, "source"),
        )
    }

    private fun toDetectBatchModeItem(dto: ProductPriceKafkaDto): DetectBatchModeInputDtoItemsItem =
        DetectBatchModeInputDtoItemsItem(
            transactionId = dto.transactionId,
        )

    private fun requireString(value: Map<String, Any?>, key: String): String {
        val raw = value[key] ?: error("$key is required")
        return raw as? String ?: error("$key must be string")
    }

    private fun asBigDecimal(value: Any?, key: String): BigDecimal {
        return when (value) {
            is BigDecimal -> value
            is Number -> BigDecimal(value.toString())
            is String -> BigDecimal(value)
            is JsonNode -> {
                if (value.isNumber) BigDecimal(value.asText()) else BigDecimal(value.asText())
            }

            else -> error("$key must be decimal-compatible")
        }
    }

    private companion object {
        val mapType = object : com.fasterxml.jackson.core.type.TypeReference<Map<String, Any?>>() {}
    }
}
