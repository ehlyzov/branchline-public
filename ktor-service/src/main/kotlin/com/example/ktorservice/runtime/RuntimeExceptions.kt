package com.example.ktorservice.runtime

class ContractViolationException(
    message: String,
    cause: Throwable? = null,
) : RuntimeException(message, cause)

class TransformExecutionException(message: String) : RuntimeException(message)
