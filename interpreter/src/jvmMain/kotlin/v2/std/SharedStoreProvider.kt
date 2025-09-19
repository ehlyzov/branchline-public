package v2.std

/**
 * Global provider for SharedStore to be used by VM host functions.
 * Tests or embedders should set [store] before running code that uses AWAIT_SHARED.
 */
object SharedStoreProvider {
    @Volatile
    var store: SharedStore? = null
}

