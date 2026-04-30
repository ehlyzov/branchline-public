package com.example.ktorservice.domain

import java.util.UUID
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.CopyOnWriteArrayList

private data class PriceKey(
    val skuId: UUID,
    val warehouseId: UUID,
)

class InMemoryPriceStore {
    private val snapshotsByKey = ConcurrentHashMap<PriceKey, PriceSnapshot>()

    fun get(skuId: UUID, warehouseId: UUID): PriceSnapshot? = snapshotsByKey[PriceKey(skuId, warehouseId)]

    fun save(snapshot: PriceSnapshot): PriceSnapshot {
        snapshotsByKey[PriceKey(snapshot.skuId, snapshot.warehouseId)] = snapshot
        return snapshot
    }

    fun snapshots(): List<PriceSnapshot> = snapshotsByKey.values.sortedWith(
        compareBy<PriceSnapshot> { it.skuId.toString() }.thenBy { it.warehouseId.toString() },
    )
}

class InMemoryHistoryStore {
    private val records = CopyOnWriteArrayList<PriceHistoryRecord>()

    fun append(record: PriceHistoryRecord) {
        records += record
    }

    fun all(): List<PriceHistoryRecord> = records.toList()
}

class InMemoryOutbox {
    private val acks = CopyOnWriteArrayList<PriceChangeAckMessage>()
    private val events = CopyOnWriteArrayList<PriceUpdatedEvent>()

    fun pushAck(message: PriceChangeAckMessage) {
        acks += message
    }

    fun pushEvent(event: PriceUpdatedEvent) {
        events += event
    }

    fun acks(): List<PriceChangeAckMessage> = acks.toList()

    fun events(): List<PriceUpdatedEvent> = events.toList()
}

class ProcessedTransactionStore {
    private val ids = ConcurrentHashMap.newKeySet<String>()

    fun contains(transactionId: String): Boolean = ids.contains(transactionId)

    fun add(transactionId: String) {
        ids.add(transactionId)
    }
}
