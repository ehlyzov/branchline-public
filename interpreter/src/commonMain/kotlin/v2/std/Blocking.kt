package v2.std

/** Platform-specific blocking bridge for suspend operations. */
expect fun blockingAwait(store: SharedStore, resource: String, key: String): Any?

