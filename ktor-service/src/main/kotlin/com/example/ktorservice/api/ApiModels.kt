package com.example.ktorservice.api

import com.example.ktorservice.domain.PriceChangeAckMessage
import com.example.ktorservice.domain.PriceUpdatedEvent
import com.example.ktorservice.domain.ProductPriceKafkaDto

data class BatchPriceChangeRequest(
    val items: List<ProductPriceKafkaDto>,
)

data class PriceChangeResponse(
    val transactionId: String,
    val accepted: Boolean,
    val mutationStatus: String,
    val reason: String? = null,
    val errors: List<String> = emptyList(),
    val ack: PriceChangeAckMessage? = null,
    val event: PriceUpdatedEvent? = null,
)

data class BatchPriceChangeResponse(
    val mode: String,
    val results: List<PriceChangeResponse>,
)
