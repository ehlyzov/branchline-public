package v2.runtime

import v2.runtime.bignum.BLBigDec
import v2.runtime.bignum.BLBigInt

actual fun isBigInt(x: Any?): Boolean = x is BLBigInt

actual fun isBigDec(x: Any?): Boolean = x is BLBigDec

