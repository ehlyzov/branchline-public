package com.example.ktorservice

import com.example.ktorservice.api.BatchPriceChangeRequest
import com.example.ktorservice.bridge.BranchlinePayloadMapper
import com.example.ktorservice.domain.InMemoryHistoryStore
import com.example.ktorservice.domain.InMemoryOutbox
import com.example.ktorservice.domain.InMemoryPriceStore
import com.example.ktorservice.domain.ProcessedTransactionStore
import com.example.ktorservice.domain.ProductPriceKafkaDto
import com.example.ktorservice.domain.PriceMutationEngine
import com.example.ktorservice.runtime.BranchlineRuntimeFacade
import com.example.ktorservice.runtime.ContractViolationException
import com.example.ktorservice.runtime.TransformExecutionException
import com.example.ktorservice.service.PriceIngestService
import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.databind.SerializationFeature
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.registerKotlinModule
import io.ktor.http.HttpStatusCode
import io.ktor.serialization.jackson.jackson
import io.ktor.server.application.Application
import io.ktor.server.application.call
import io.ktor.server.application.install
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import io.ktor.server.plugins.callloging.CallLogging
import io.ktor.server.plugins.contentnegotiation.ContentNegotiation
import io.ktor.server.plugins.statuspages.StatusPages
import io.ktor.server.plugins.statuspages.exception
import io.ktor.server.request.receive
import io.ktor.server.response.respond
import io.ktor.server.routing.get
import io.ktor.server.routing.post
import io.ktor.server.routing.routing
import java.time.Clock

data class ApplicationConfig(
    val clock: Clock = Clock.systemUTC(),
    val runtimeFacade: BranchlineRuntimeFacade = BranchlineRuntimeFacade.fromResources(),
)

data class ApiError(
    val code: String,
    val message: String,
)

fun main() {
    val port = System.getenv("PORT")?.toIntOrNull() ?: 8080
    embeddedServer(Netty, port = port) {
        module()
    }.start(wait = true)
}

fun Application.module(config: ApplicationConfig = ApplicationConfig()) {
    install(CallLogging)
    install(ContentNegotiation) {
        jackson {
            registerKotlinModule()
            registerModule(JavaTimeModule())
            disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
            setSerializationInclusion(JsonInclude.Include.NON_NULL)
        }
    }
    install(StatusPages) {
        exception<ContractViolationException> { call, cause ->
            call.respond(
                HttpStatusCode.BadRequest,
                ApiError(code = "CONTRACT_ERROR", message = cause.message ?: "contract error"),
            )
        }
        exception<TransformExecutionException> { call, cause ->
            call.respond(
                HttpStatusCode.InternalServerError,
                ApiError(code = "TRANSFORM_ERROR", message = cause.message ?: "transform error"),
            )
        }
        exception<Throwable> { call, cause ->
            call.respond(
                HttpStatusCode.InternalServerError,
                ApiError(code = "INTERNAL_ERROR", message = cause.message ?: "internal error"),
            )
        }
    }

    val priceStore = InMemoryPriceStore()
    val historyStore = InMemoryHistoryStore()
    val outbox = InMemoryOutbox()
    val processedTransactions = ProcessedTransactionStore()
    val mutationEngine = PriceMutationEngine(priceStore, config.clock)
    val service = PriceIngestService(
        runtimeFacade = config.runtimeFacade,
        mapper = BranchlinePayloadMapper(),
        mutationEngine = mutationEngine,
        priceStore = priceStore,
        historyStore = historyStore,
        outbox = outbox,
        processedTransactions = processedTransactions,
        clock = config.clock,
    )

    routing {
        post("/api/v1/price-change") {
            val dto = call.receive<ProductPriceKafkaDto>()
            call.respond(HttpStatusCode.OK, service.process(dto))
        }

        post("/api/v1/price-change/batch") {
            val request = call.receive<BatchPriceChangeRequest>()
            call.respond(HttpStatusCode.OK, service.processBatch(request.items))
        }

        get("/api/v1/prices") {
            call.respond(HttpStatusCode.OK, service.prices())
        }

        get("/api/v1/history") {
            call.respond(HttpStatusCode.OK, service.history())
        }

        get("/api/v1/outbox/acks") {
            call.respond(HttpStatusCode.OK, service.ackOutbox())
        }

        get("/api/v1/outbox/events") {
            call.respond(HttpStatusCode.OK, service.eventOutbox())
        }
    }
}
