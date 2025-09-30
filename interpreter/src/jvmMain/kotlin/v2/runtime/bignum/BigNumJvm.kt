package v2.runtime.bignum

import java.math.BigDecimal
import java.math.BigInteger

actual typealias BLBigInt = BigInteger
actual typealias BLBigDec = BigDecimal

// --- BLBigInt ---
actual fun blBigIntOfLong(v: Long): BLBigInt = BigInteger.valueOf(v)
actual fun blBigIntParse(s: String): BLBigInt = BigInteger(s)
actual operator fun BLBigInt.plus(other: BLBigInt): BLBigInt = this.add(other)
actual operator fun BLBigInt.minus(other: BLBigInt): BLBigInt = this.subtract(other)
actual operator fun BLBigInt.times(other: BLBigInt): BLBigInt = this.multiply(other)
actual operator fun BLBigInt.div(other: BLBigInt): BLBigInt = this.divide(other)
actual operator fun BLBigInt.rem(other: BLBigInt): BLBigInt = this.remainder(other)
actual operator fun BLBigInt.unaryMinus(): BLBigInt = this.negate()
actual operator fun BLBigInt.compareTo(other: BLBigInt): Int = this.compareTo(other)
actual fun BLBigInt.signum(): Int = this.signum()
actual fun BLBigInt.toInt(): Int = this.toInt()
actual fun BLBigInt.toLong(): Long = this.toLong()
actual fun BLBigInt.bitLength(): Int = this.bitLength()
actual fun BLBigInt.toBLBigDec(): BLBigDec = BigDecimal(this)

// --- BLBigDec ---
actual fun blBigDecOfLong(v: Long): BLBigDec = BigDecimal.valueOf(v)
actual fun blBigDecOfDouble(v: Double): BLBigDec = BigDecimal.valueOf(v)
actual fun blBigDecParse(s: String): BLBigDec = BigDecimal(s)
actual operator fun BLBigDec.plus(other: BLBigDec): BLBigDec = this.add(other)
actual operator fun BLBigDec.minus(other: BLBigDec): BLBigDec = this.subtract(other)
actual operator fun BLBigDec.times(other: BLBigDec): BLBigDec = this.multiply(other)
actual operator fun BLBigDec.div(other: BLBigDec): BLBigDec = this.divide(other)
actual operator fun BLBigDec.rem(other: BLBigDec): BLBigDec = this.remainder(other)
actual operator fun BLBigDec.unaryMinus(): BLBigDec = this.negate()
actual operator fun BLBigDec.compareTo(other: BLBigDec): Int = this.compareTo(other)
actual fun BLBigDec.toPlainString(): String = this.toPlainString()
actual fun BLBigDec.toBLBigInt(): BLBigInt = this.toBigInteger()
