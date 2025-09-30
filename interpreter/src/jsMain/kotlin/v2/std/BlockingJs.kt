package v2.std

actual fun blockingAwait(store: SharedStore, resource: String, key: String): Any? =
    throw UnsupportedOperationException("SharedStore.await is not supported in JS sync eval")

