package v2.runtime

import java.math.BigDecimal
import java.math.BigInteger

actual fun isBigInt(x: Any?): Boolean = x is BigInteger

actual fun isBigDec(x: Any?): Boolean = x is BigDecimal

