package v2.std

import kotlinx.coroutines.runBlocking

actual fun blockingAwait(store: SharedStore, resource: String, key: String): Any? =
    runBlocking { store.await(resource, key) }

