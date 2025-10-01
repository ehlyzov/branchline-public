(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-serialization-kotlinx-serialization-core'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kotlinx-serialization-kotlinx-serialization-core'.");
    }
    globalThis['kotlinx-serialization-kotlinx-serialization-core'] = factory(typeof globalThis['kotlinx-serialization-kotlinx-serialization-core'] === 'undefined' ? {} : globalThis['kotlinx-serialization-kotlinx-serialization-core'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var protoOf = kotlin_kotlin.$_$.o8;
  var initMetadataForInterface = kotlin_kotlin.$_$.r7;
  var VOID = kotlin_kotlin.$_$.e;
  var StringCompanionObject_instance = kotlin_kotlin.$_$.l3;
  var Unit_instance = kotlin_kotlin.$_$.y3;
  var emptyList = kotlin_kotlin.$_$.h5;
  var LazyThreadSafetyMode_PUBLICATION_getInstance = kotlin_kotlin.$_$.g;
  var lazy = kotlin_kotlin.$_$.wb;
  var KProperty1 = kotlin_kotlin.$_$.z8;
  var getPropertyCallableRef = kotlin_kotlin.$_$.l7;
  var toString = kotlin_kotlin.$_$.r8;
  var initMetadataForClass = kotlin_kotlin.$_$.o7;
  var getKClassFromExpression = kotlin_kotlin.$_$.c;
  var IllegalArgumentException_init_$Init$ = kotlin_kotlin.$_$.z;
  var objectCreate = kotlin_kotlin.$_$.n8;
  var captureStack = kotlin_kotlin.$_$.a7;
  var IllegalArgumentException_init_$Init$_0 = kotlin_kotlin.$_$.a1;
  var IllegalArgumentException_init_$Init$_1 = kotlin_kotlin.$_$.c1;
  var IllegalArgumentException = kotlin_kotlin.$_$.ya;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.s4;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.i;
  var THROW_CCE = kotlin_kotlin.$_$.db;
  var KClass = kotlin_kotlin.$_$.y8;
  var isInterface = kotlin_kotlin.$_$.c8;
  var Triple = kotlin_kotlin.$_$.eb;
  var getKClass = kotlin_kotlin.$_$.d;
  var Pair = kotlin_kotlin.$_$.ab;
  var Entry = kotlin_kotlin.$_$.h4;
  var KtMap = kotlin_kotlin.$_$.i4;
  var KtMutableMap = kotlin_kotlin.$_$.k4;
  var LinkedHashMap = kotlin_kotlin.$_$.e4;
  var HashMap = kotlin_kotlin.$_$.b4;
  var KtSet = kotlin_kotlin.$_$.m4;
  var KtMutableSet = kotlin_kotlin.$_$.l4;
  var LinkedHashSet = kotlin_kotlin.$_$.f4;
  var HashSet = kotlin_kotlin.$_$.c4;
  var Collection = kotlin_kotlin.$_$.a4;
  var KtList = kotlin_kotlin.$_$.g4;
  var KtMutableList = kotlin_kotlin.$_$.j4;
  var ArrayList = kotlin_kotlin.$_$.z3;
  var copyToArray = kotlin_kotlin.$_$.e5;
  var _Result___get_value__impl__bjfvqg = kotlin_kotlin.$_$.u1;
  var _Result___get_isFailure__impl__jpiriv = kotlin_kotlin.$_$.t1;
  var Result = kotlin_kotlin.$_$.bb;
  var ensureNotNull = kotlin_kotlin.$_$.sb;
  var equals = kotlin_kotlin.$_$.j7;
  var getStringHashCode = kotlin_kotlin.$_$.m7;
  var Iterable = kotlin_kotlin.$_$.d4;
  var isBlank = kotlin_kotlin.$_$.m9;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.b1;
  var toList = kotlin_kotlin.$_$.n6;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.j;
  var HashSet_init_$Create$ = kotlin_kotlin.$_$.p;
  var toHashSet = kotlin_kotlin.$_$.l6;
  var toBooleanArray = kotlin_kotlin.$_$.k6;
  var withIndex = kotlin_kotlin.$_$.r6;
  var to = kotlin_kotlin.$_$.bc;
  var toMap = kotlin_kotlin.$_$.p6;
  var lazy_0 = kotlin_kotlin.$_$.xb;
  var contentEquals = kotlin_kotlin.$_$.t4;
  var initMetadataForObject = kotlin_kotlin.$_$.t7;
  var Long = kotlin_kotlin.$_$.za;
  var Char = kotlin_kotlin.$_$.sa;
  var Duration__toIsoString_impl_9h6wsm = kotlin_kotlin.$_$.l1;
  var Duration = kotlin_kotlin.$_$.pa;
  var Companion_getInstance = kotlin_kotlin.$_$.n3;
  var Instant = kotlin_kotlin.$_$.qa;
  var Companion_getInstance_0 = kotlin_kotlin.$_$.o3;
  var Uuid = kotlin_kotlin.$_$.ra;
  var Companion_getInstance_1 = kotlin_kotlin.$_$.q3;
  var toIntOrNull = kotlin_kotlin.$_$.ca;
  var hashCode = kotlin_kotlin.$_$.n7;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.d1;
  var ArrayList_init_$Create$_1 = kotlin_kotlin.$_$.k;
  var HashSet_init_$Create$_0 = kotlin_kotlin.$_$.q;
  var LinkedHashSet_init_$Create$ = kotlin_kotlin.$_$.u;
  var LinkedHashSet_init_$Create$_0 = kotlin_kotlin.$_$.v;
  var HashMap_init_$Create$ = kotlin_kotlin.$_$.m;
  var HashMap_init_$Create$_0 = kotlin_kotlin.$_$.n;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.s;
  var LinkedHashMap_init_$Create$_0 = kotlin_kotlin.$_$.t;
  var isArray = kotlin_kotlin.$_$.u7;
  var arrayIterator = kotlin_kotlin.$_$.y6;
  var asList = kotlin_kotlin.$_$.p4;
  var until = kotlin_kotlin.$_$.x8;
  var step = kotlin_kotlin.$_$.w8;
  var getValue = kotlin_kotlin.$_$.n5;
  var longArray = kotlin_kotlin.$_$.h8;
  var initMetadataForCompanion = kotlin_kotlin.$_$.p7;
  var get_lastIndex = kotlin_kotlin.$_$.s5;
  var countTrailingZeroBits = kotlin_kotlin.$_$.qb;
  var HashSet_init_$Create$_1 = kotlin_kotlin.$_$.o;
  var toString_0 = kotlin_kotlin.$_$.ac;
  var KTypeParameter = kotlin_kotlin.$_$.a9;
  var contentHashCode = kotlin_kotlin.$_$.u4;
  var joinToString = kotlin_kotlin.$_$.r5;
  var booleanArray = kotlin_kotlin.$_$.z6;
  var emptyMap = kotlin_kotlin.$_$.i5;
  var Companion_getInstance_2 = kotlin_kotlin.$_$.r3;
  var isCharArray = kotlin_kotlin.$_$.x7;
  var charArray = kotlin_kotlin.$_$.c7;
  var DoubleCompanionObject_instance = kotlin_kotlin.$_$.h3;
  var isDoubleArray = kotlin_kotlin.$_$.z7;
  var FloatCompanionObject_instance = kotlin_kotlin.$_$.i3;
  var isFloatArray = kotlin_kotlin.$_$.a8;
  var Companion_getInstance_3 = kotlin_kotlin.$_$.s3;
  var isLongArray = kotlin_kotlin.$_$.d8;
  var Companion_getInstance_4 = kotlin_kotlin.$_$.w3;
  var _ULongArray___get_size__impl__ju6dtr = kotlin_kotlin.$_$.u2;
  var ULongArray = kotlin_kotlin.$_$.jb;
  var _ULongArray___init__impl__twm1l3 = kotlin_kotlin.$_$.q2;
  var _ULong___init__impl__c78o9k = kotlin_kotlin.$_$.n2;
  var ULongArray__get_impl_pr71q9 = kotlin_kotlin.$_$.s2;
  var _ULong___get_data__impl__fggpzb = kotlin_kotlin.$_$.o2;
  var IntCompanionObject_instance = kotlin_kotlin.$_$.j3;
  var isIntArray = kotlin_kotlin.$_$.b8;
  var Companion_getInstance_5 = kotlin_kotlin.$_$.v3;
  var _UIntArray___get_size__impl__r6l8ci = kotlin_kotlin.$_$.l2;
  var UIntArray = kotlin_kotlin.$_$.hb;
  var _UIntArray___init__impl__ghjpc6 = kotlin_kotlin.$_$.h2;
  var _UInt___init__impl__l7qpdl = kotlin_kotlin.$_$.e2;
  var UIntArray__get_impl_gp5kza = kotlin_kotlin.$_$.j2;
  var _UInt___get_data__impl__f0vqqw = kotlin_kotlin.$_$.f2;
  var ShortCompanionObject_instance = kotlin_kotlin.$_$.k3;
  var isShortArray = kotlin_kotlin.$_$.f8;
  var Companion_getInstance_6 = kotlin_kotlin.$_$.x3;
  var _UShortArray___get_size__impl__jqto1b = kotlin_kotlin.$_$.d3;
  var UShortArray = kotlin_kotlin.$_$.lb;
  var _UShortArray___init__impl__9b26ef = kotlin_kotlin.$_$.z2;
  var _UShort___init__impl__jigrne = kotlin_kotlin.$_$.w2;
  var UShortArray__get_impl_fnbhmx = kotlin_kotlin.$_$.b3;
  var _UShort___get_data__impl__g0245 = kotlin_kotlin.$_$.x2;
  var ByteCompanionObject_instance = kotlin_kotlin.$_$.g3;
  var isByteArray = kotlin_kotlin.$_$.w7;
  var Companion_getInstance_7 = kotlin_kotlin.$_$.u3;
  var _UByteArray___get_size__impl__h6pkdv = kotlin_kotlin.$_$.c2;
  var UByteArray = kotlin_kotlin.$_$.fb;
  var _UByteArray___init__impl__ip4y9n = kotlin_kotlin.$_$.z1;
  var _UByte___init__impl__g9hnc4 = kotlin_kotlin.$_$.v1;
  var UByteArray__get_impl_t5f3hv = kotlin_kotlin.$_$.a2;
  var _UByte___get_data__impl__jof9qr = kotlin_kotlin.$_$.w1;
  var BooleanCompanionObject_instance = kotlin_kotlin.$_$.f3;
  var isBooleanArray = kotlin_kotlin.$_$.v7;
  var coerceAtLeast = kotlin_kotlin.$_$.t8;
  var copyOf = kotlin_kotlin.$_$.y4;
  var copyOf_0 = kotlin_kotlin.$_$.a5;
  var copyOf_1 = kotlin_kotlin.$_$.b5;
  var copyOf_2 = kotlin_kotlin.$_$.w4;
  var _ULongArray___get_storage__impl__28e64j = kotlin_kotlin.$_$.v2;
  var _ULongArray___init__impl__twm1l3_0 = kotlin_kotlin.$_$.r2;
  var ULongArray__set_impl_z19mvh = kotlin_kotlin.$_$.t2;
  var copyOf_3 = kotlin_kotlin.$_$.d5;
  var _UIntArray___get_storage__impl__92a0v0 = kotlin_kotlin.$_$.m2;
  var _UIntArray___init__impl__ghjpc6_0 = kotlin_kotlin.$_$.i2;
  var UIntArray__set_impl_7f2zu2 = kotlin_kotlin.$_$.k2;
  var copyOf_4 = kotlin_kotlin.$_$.v4;
  var _UShortArray___get_storage__impl__t2jpv5 = kotlin_kotlin.$_$.e3;
  var _UShortArray___init__impl__9b26ef_0 = kotlin_kotlin.$_$.a3;
  var UShortArray__set_impl_6d8whp = kotlin_kotlin.$_$.c3;
  var copyOf_5 = kotlin_kotlin.$_$.z4;
  var _UByteArray___get_storage__impl__d4kctt = kotlin_kotlin.$_$.d2;
  var _UByteArray___init__impl__ip4y9n_0 = kotlin_kotlin.$_$.y1;
  var UByteArray__set_impl_jvcicn = kotlin_kotlin.$_$.b2;
  var copyOf_6 = kotlin_kotlin.$_$.x4;
  var Unit = kotlin_kotlin.$_$.nb;
  var trimIndent = kotlin_kotlin.$_$.ma;
  var charSequenceLength = kotlin_kotlin.$_$.f7;
  var lastOrNull = kotlin_kotlin.$_$.u5;
  var get_lastIndex_0 = kotlin_kotlin.$_$.t5;
  var ULong = kotlin_kotlin.$_$.kb;
  var UInt = kotlin_kotlin.$_$.ib;
  var UShort = kotlin_kotlin.$_$.mb;
  var UByte = kotlin_kotlin.$_$.gb;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.yb;
  var PrimitiveClasses_getInstance = kotlin_kotlin.$_$.m3;
  var mapOf = kotlin_kotlin.$_$.z5;
  var get_js = kotlin_kotlin.$_$.g8;
  var findAssociatedObject = kotlin_kotlin.$_$.b;
  var get_indices = kotlin_kotlin.$_$.p5;
  var IndexOutOfBoundsException_init_$Create$ = kotlin_kotlin.$_$.e1;
  var get_indices_0 = kotlin_kotlin.$_$.o5;
  var Companion_instance = kotlin_kotlin.$_$.t3;
  var _Result___init__impl__xyqfz8 = kotlin_kotlin.$_$.s1;
  var createFailure = kotlin_kotlin.$_$.rb;
  //endregion
  //region block: pre-declaration
  initMetadataForInterface(SerializationStrategy, 'SerializationStrategy');
  initMetadataForInterface(DeserializationStrategy, 'DeserializationStrategy');
  initMetadataForInterface(KSerializer, 'KSerializer', VOID, VOID, [SerializationStrategy, DeserializationStrategy]);
  initMetadataForClass(AbstractPolymorphicSerializer, 'AbstractPolymorphicSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(PolymorphicSerializer, 'PolymorphicSerializer', VOID, AbstractPolymorphicSerializer);
  initMetadataForClass(SealedClassSerializer, 'SealedClassSerializer', VOID, AbstractPolymorphicSerializer);
  initMetadataForClass(SerializationException, 'SerializationException', SerializationException_init_$Create$, IllegalArgumentException);
  initMetadataForClass(MissingFieldException, 'MissingFieldException', VOID, SerializationException);
  function get_isNullable() {
    return false;
  }
  function get_isInline() {
    return false;
  }
  function get_annotations() {
    return emptyList();
  }
  initMetadataForInterface(SerialDescriptor, 'SerialDescriptor');
  initMetadataForClass(ContextDescriptor, 'ContextDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForClass(elementDescriptors$1);
  initMetadataForClass(elementDescriptors$$inlined$Iterable$1, VOID, VOID, VOID, [Iterable]);
  initMetadataForClass(ClassSerialDescriptorBuilder, 'ClassSerialDescriptorBuilder');
  initMetadataForInterface(CachedNames, 'CachedNames');
  initMetadataForClass(SerialDescriptorImpl, 'SerialDescriptorImpl', VOID, VOID, [SerialDescriptor, CachedNames]);
  initMetadataForClass(SerialKind, 'SerialKind');
  initMetadataForObject(ENUM, 'ENUM', VOID, SerialKind);
  initMetadataForObject(CONTEXTUAL, 'CONTEXTUAL', VOID, SerialKind);
  initMetadataForClass(PolymorphicKind, 'PolymorphicKind', VOID, SerialKind);
  initMetadataForObject(SEALED, 'SEALED', VOID, PolymorphicKind);
  initMetadataForObject(OPEN, 'OPEN', VOID, PolymorphicKind);
  initMetadataForClass(PrimitiveKind, 'PrimitiveKind', VOID, SerialKind);
  initMetadataForObject(BOOLEAN, 'BOOLEAN', VOID, PrimitiveKind);
  initMetadataForObject(BYTE, 'BYTE', VOID, PrimitiveKind);
  initMetadataForObject(CHAR, 'CHAR', VOID, PrimitiveKind);
  initMetadataForObject(SHORT, 'SHORT', VOID, PrimitiveKind);
  initMetadataForObject(INT, 'INT', VOID, PrimitiveKind);
  initMetadataForObject(LONG, 'LONG', VOID, PrimitiveKind);
  initMetadataForObject(FLOAT, 'FLOAT', VOID, PrimitiveKind);
  initMetadataForObject(DOUBLE, 'DOUBLE', VOID, PrimitiveKind);
  initMetadataForObject(STRING, 'STRING', VOID, PrimitiveKind);
  initMetadataForClass(StructureKind, 'StructureKind', VOID, SerialKind);
  initMetadataForObject(CLASS, 'CLASS', VOID, StructureKind);
  initMetadataForObject(LIST, 'LIST', VOID, StructureKind);
  initMetadataForObject(MAP, 'MAP', VOID, StructureKind);
  initMetadataForObject(OBJECT, 'OBJECT', VOID, StructureKind);
  function decodeSerializableValue(deserializer) {
    return deserializer.bk(this);
  }
  initMetadataForInterface(Decoder, 'Decoder');
  function decodeSequentially() {
    return false;
  }
  function decodeCollectionSize(descriptor) {
    return -1;
  }
  function decodeSerializableElement$default(descriptor, index, deserializer, previousValue, $super) {
    previousValue = previousValue === VOID ? null : previousValue;
    return $super === VOID ? this.in(descriptor, index, deserializer, previousValue) : $super.in.call(this, descriptor, index, deserializer, previousValue);
  }
  initMetadataForInterface(CompositeDecoder, 'CompositeDecoder');
  initMetadataForClass(AbstractDecoder, 'AbstractDecoder', VOID, VOID, [Decoder, CompositeDecoder]);
  function encodeNotNullMark() {
  }
  function beginCollection(descriptor, collectionSize) {
    return this.wm(descriptor);
  }
  function encodeSerializableValue(serializer, value) {
    serializer.ak(this, value);
  }
  initMetadataForInterface(Encoder, 'Encoder');
  initMetadataForClass(AbstractEncoder, 'AbstractEncoder', VOID, VOID, [Encoder]);
  initMetadataForObject(NothingSerializer_0, 'NothingSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(DurationSerializer, 'DurationSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(InstantSerializer, 'InstantSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(UuidSerializer, 'UuidSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(ListLikeDescriptor, 'ListLikeDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForClass(ArrayListClassDesc, 'ArrayListClassDesc', VOID, ListLikeDescriptor);
  initMetadataForClass(HashSetClassDesc, 'HashSetClassDesc', VOID, ListLikeDescriptor);
  initMetadataForClass(LinkedHashSetClassDesc, 'LinkedHashSetClassDesc', VOID, ListLikeDescriptor);
  initMetadataForClass(MapLikeDescriptor, 'MapLikeDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForClass(HashMapClassDesc, 'HashMapClassDesc', VOID, MapLikeDescriptor);
  initMetadataForClass(LinkedHashMapClassDesc, 'LinkedHashMapClassDesc', VOID, MapLikeDescriptor);
  initMetadataForClass(ArrayClassDesc, 'ArrayClassDesc', VOID, ListLikeDescriptor);
  initMetadataForClass(PrimitiveArrayDescriptor, 'PrimitiveArrayDescriptor', VOID, ListLikeDescriptor);
  initMetadataForClass(AbstractCollectionSerializer, 'AbstractCollectionSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(CollectionLikeSerializer, 'CollectionLikeSerializer', VOID, AbstractCollectionSerializer);
  initMetadataForClass(CollectionSerializer, 'CollectionSerializer', VOID, CollectionLikeSerializer);
  initMetadataForClass(ArrayListSerializer, 'ArrayListSerializer', VOID, CollectionSerializer);
  initMetadataForClass(HashSetSerializer, 'HashSetSerializer', VOID, CollectionSerializer);
  initMetadataForClass(LinkedHashSetSerializer, 'LinkedHashSetSerializer', VOID, CollectionSerializer);
  initMetadataForClass(MapLikeSerializer, 'MapLikeSerializer', VOID, AbstractCollectionSerializer);
  initMetadataForClass(HashMapSerializer, 'HashMapSerializer', VOID, MapLikeSerializer);
  initMetadataForClass(LinkedHashMapSerializer, 'LinkedHashMapSerializer', VOID, MapLikeSerializer);
  initMetadataForClass(ReferenceArraySerializer, 'ReferenceArraySerializer', VOID, CollectionLikeSerializer);
  initMetadataForClass(PrimitiveArraySerializer, 'PrimitiveArraySerializer', VOID, CollectionLikeSerializer);
  initMetadataForClass(PrimitiveArrayBuilder, 'PrimitiveArrayBuilder');
  initMetadataForCompanion(Companion);
  initMetadataForClass(ElementMarker, 'ElementMarker');
  initMetadataForClass(PluginGeneratedSerialDescriptor, 'PluginGeneratedSerialDescriptor', VOID, VOID, [SerialDescriptor, CachedNames]);
  initMetadataForClass(InlineClassDescriptor, 'InlineClassDescriptor', VOID, PluginGeneratedSerialDescriptor);
  function typeParametersSerializers() {
    return get_EMPTY_SERIALIZER_ARRAY();
  }
  initMetadataForInterface(GeneratedSerializer, 'GeneratedSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(InlinePrimitiveDescriptor$1, VOID, VOID, VOID, [GeneratedSerializer]);
  initMetadataForObject(NoOpEncoder, 'NoOpEncoder', VOID, AbstractEncoder);
  initMetadataForObject(NothingSerialDescriptor, 'NothingSerialDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForClass(NullableSerializer, 'NullableSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(SerialDescriptorForNullable, 'SerialDescriptorForNullable', VOID, VOID, [SerialDescriptor, CachedNames]);
  initMetadataForClass(ObjectSerializer, 'ObjectSerializer', VOID, VOID, [KSerializer]);
  initMetadataForInterface(SerializerFactory, 'SerializerFactory');
  initMetadataForObject(CharArraySerializer_0, 'CharArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(DoubleArraySerializer_0, 'DoubleArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(FloatArraySerializer_0, 'FloatArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(LongArraySerializer_0, 'LongArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(ULongArraySerializer_0, 'ULongArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(IntArraySerializer_0, 'IntArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(UIntArraySerializer_0, 'UIntArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(ShortArraySerializer_0, 'ShortArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(UShortArraySerializer_0, 'UShortArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(ByteArraySerializer_0, 'ByteArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(UByteArraySerializer_0, 'UByteArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForObject(BooleanArraySerializer_0, 'BooleanArraySerializer', VOID, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  initMetadataForClass(CharArrayBuilder, 'CharArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(DoubleArrayBuilder, 'DoubleArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(FloatArrayBuilder, 'FloatArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(LongArrayBuilder, 'LongArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(ULongArrayBuilder, 'ULongArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(IntArrayBuilder, 'IntArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(UIntArrayBuilder, 'UIntArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(ShortArrayBuilder, 'ShortArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(UShortArrayBuilder, 'UShortArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(ByteArrayBuilder, 'ByteArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(UByteArrayBuilder, 'UByteArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForClass(BooleanArrayBuilder, 'BooleanArrayBuilder', VOID, PrimitiveArrayBuilder);
  initMetadataForObject(StringSerializer, 'StringSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(CharSerializer, 'CharSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(DoubleSerializer, 'DoubleSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(FloatSerializer, 'FloatSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(LongSerializer, 'LongSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(IntSerializer, 'IntSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(ShortSerializer, 'ShortSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(ByteSerializer, 'ByteSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(BooleanSerializer, 'BooleanSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(UnitSerializer, 'UnitSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(PrimitiveSerialDescriptor_0, 'PrimitiveSerialDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForClass(TaggedDecoder, 'TaggedDecoder', VOID, VOID, [Decoder, CompositeDecoder]);
  initMetadataForClass(NamedValueDecoder, 'NamedValueDecoder', VOID, TaggedDecoder);
  initMetadataForClass(MapEntry, 'MapEntry', VOID, VOID, [Entry]);
  initMetadataForClass(KeyValueSerializer, 'KeyValueSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(MapEntrySerializer_0, 'MapEntrySerializer', VOID, KeyValueSerializer);
  initMetadataForClass(PairSerializer_0, 'PairSerializer', VOID, KeyValueSerializer);
  initMetadataForClass(TripleSerializer_0, 'TripleSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(ULongSerializer, 'ULongSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(UIntSerializer, 'UIntSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(UShortSerializer, 'UShortSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(UByteSerializer, 'UByteSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(SerializersModule, 'SerializersModule');
  initMetadataForClass(SerialModuleImpl, 'SerialModuleImpl', VOID, SerializersModule);
  initMetadataForClass(ContextualProvider, 'ContextualProvider');
  initMetadataForClass(Argless, 'Argless', VOID, ContextualProvider);
  initMetadataForClass(WithTypeArguments, 'WithTypeArguments', VOID, ContextualProvider);
  function contextual(kClass, serializer) {
    return this.q12(kClass, SerializersModuleCollector$contextual$lambda(serializer));
  }
  initMetadataForInterface(SerializersModuleCollector, 'SerializersModuleCollector');
  initMetadataForClass(SerializableWith, 'SerializableWith', VOID, VOID, VOID, VOID, 0);
  initMetadataForClass(createCache$1);
  initMetadataForClass(createParametrizedCache$1);
  //endregion
  function KSerializer() {
  }
  function SerializationStrategy() {
  }
  function DeserializationStrategy() {
  }
  function PolymorphicSerializer$descriptor$delegate$lambda$lambda(this$0) {
    return function ($this$buildSerialDescriptor) {
      $this$buildSerialDescriptor.kk('type', serializer_0(StringCompanionObject_instance).zj());
      $this$buildSerialDescriptor.kk('value', buildSerialDescriptor('kotlinx.serialization.Polymorphic<' + this$0.lk_1.m9() + '>', CONTEXTUAL_getInstance(), []));
      $this$buildSerialDescriptor.ek_1 = this$0.mk_1;
      return Unit_instance;
    };
  }
  function PolymorphicSerializer$descriptor$delegate$lambda(this$0) {
    return function () {
      var tmp = OPEN_getInstance();
      return withContext(buildSerialDescriptor('kotlinx.serialization.Polymorphic', tmp, [], PolymorphicSerializer$descriptor$delegate$lambda$lambda(this$0)), this$0.lk_1);
    };
  }
  function PolymorphicSerializer$_get_descriptor_$ref_8tw9if() {
    return function (p0) {
      return p0.zj();
    };
  }
  function PolymorphicSerializer(baseClass) {
    AbstractPolymorphicSerializer.call(this);
    this.lk_1 = baseClass;
    this.mk_1 = emptyList();
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.nk_1 = lazy(tmp_0, PolymorphicSerializer$descriptor$delegate$lambda(this));
  }
  protoOf(PolymorphicSerializer).ok = function () {
    return this.lk_1;
  };
  protoOf(PolymorphicSerializer).zj = function () {
    var tmp0 = this.nk_1;
    var tmp = KProperty1;
    // Inline function 'kotlin.getValue' call
    getPropertyCallableRef('descriptor', 1, tmp, PolymorphicSerializer$_get_descriptor_$ref_8tw9if(), null);
    return tmp0.v1();
  };
  protoOf(PolymorphicSerializer).toString = function () {
    return 'kotlinx.serialization.PolymorphicSerializer(baseClass: ' + toString(this.lk_1) + ')';
  };
  function findPolymorphicSerializer(_this__u8e3s4, encoder, value) {
    var tmp0_elvis_lhs = _this__u8e3s4.rk(encoder, value);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throwSubtypeNotRegistered(getKClassFromExpression(value), _this__u8e3s4.ok());
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function findPolymorphicSerializer_0(_this__u8e3s4, decoder, klassName) {
    var tmp0_elvis_lhs = _this__u8e3s4.qk(decoder, klassName);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throwSubtypeNotRegistered_0(klassName, _this__u8e3s4.ok());
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function SealedClassSerializer$_get_descriptor_$ref_m511rz() {
    return function (p0) {
      return p0.zj();
    };
  }
  function SealedClassSerializer() {
  }
  protoOf(SealedClassSerializer).zj = function () {
    var tmp0 = this.sk_1;
    var tmp = KProperty1;
    // Inline function 'kotlin.getValue' call
    getPropertyCallableRef('descriptor', 1, tmp, SealedClassSerializer$_get_descriptor_$ref_m511rz(), null);
    return tmp0.v1();
  };
  function SerializationException_init_$Init$($this) {
    IllegalArgumentException_init_$Init$($this);
    SerializationException.call($this);
    return $this;
  }
  function SerializationException_init_$Create$() {
    var tmp = SerializationException_init_$Init$(objectCreate(protoOf(SerializationException)));
    captureStack(tmp, SerializationException_init_$Create$);
    return tmp;
  }
  function SerializationException_init_$Init$_0(message, $this) {
    IllegalArgumentException_init_$Init$_0(message, $this);
    SerializationException.call($this);
    return $this;
  }
  function SerializationException_init_$Create$_0(message) {
    var tmp = SerializationException_init_$Init$_0(message, objectCreate(protoOf(SerializationException)));
    captureStack(tmp, SerializationException_init_$Create$_0);
    return tmp;
  }
  function SerializationException_init_$Init$_1(message, cause, $this) {
    IllegalArgumentException_init_$Init$_1(message, cause, $this);
    SerializationException.call($this);
    return $this;
  }
  function SerializationException() {
    captureStack(this, SerializationException);
  }
  function MissingFieldException(missingFields, message, cause) {
    SerializationException_init_$Init$_1(message, cause, this);
    captureStack(this, MissingFieldException);
    this.tk_1 = missingFields;
  }
  function serializerOrNull(_this__u8e3s4) {
    var tmp0_elvis_lhs = compiledSerializerImpl(_this__u8e3s4);
    return tmp0_elvis_lhs == null ? builtinSerializerOrNull(_this__u8e3s4) : tmp0_elvis_lhs;
  }
  function serializersForParameters(_this__u8e3s4, typeArguments, failOnMissingTypeArgSerializer) {
    var tmp;
    if (failOnMissingTypeArgSerializer) {
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination = ArrayList_init_$Create$(collectionSizeOrDefault(typeArguments, 10));
      var _iterator__ex2g4s = typeArguments.g();
      while (_iterator__ex2g4s.h()) {
        var item = _iterator__ex2g4s.i();
        var tmp$ret$0 = serializer(_this__u8e3s4, item);
        destination.e(tmp$ret$0);
      }
      tmp = destination;
    } else {
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination_0 = ArrayList_init_$Create$(collectionSizeOrDefault(typeArguments, 10));
      var _iterator__ex2g4s_0 = typeArguments.g();
      while (_iterator__ex2g4s_0.h()) {
        var item_0 = _iterator__ex2g4s_0.i();
        var tmp0_elvis_lhs = serializerOrNull_0(_this__u8e3s4, item_0);
        var tmp_0;
        if (tmp0_elvis_lhs == null) {
          return null;
        } else {
          tmp_0 = tmp0_elvis_lhs;
        }
        var tmp$ret$3 = tmp_0;
        destination_0.e(tmp$ret$3);
      }
      tmp = destination_0;
    }
    var serializers = tmp;
    return serializers;
  }
  function parametrizedSerializerOrNull(_this__u8e3s4, serializers, elementClassifierIfArray) {
    var tmp0_elvis_lhs = builtinParametrizedSerializer(_this__u8e3s4, serializers, elementClassifierIfArray);
    return tmp0_elvis_lhs == null ? compiledParametrizedSerializer(_this__u8e3s4, serializers) : tmp0_elvis_lhs;
  }
  function serializer(_this__u8e3s4, type) {
    var tmp0_elvis_lhs = serializerByKTypeImpl(_this__u8e3s4, type, true);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      platformSpecificSerializerNotRegistered(kclass(type));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function serializerOrNull_0(_this__u8e3s4, type) {
    return serializerByKTypeImpl(_this__u8e3s4, type, false);
  }
  function builtinParametrizedSerializer(_this__u8e3s4, serializers, elementClassifierIfArray) {
    var tmp;
    if (_this__u8e3s4.equals(getKClass(Collection)) || _this__u8e3s4.equals(getKClass(KtList)) || (_this__u8e3s4.equals(getKClass(KtMutableList)) || _this__u8e3s4.equals(getKClass(ArrayList)))) {
      tmp = new ArrayListSerializer(serializers.o(0));
    } else if (_this__u8e3s4.equals(getKClass(HashSet))) {
      tmp = new HashSetSerializer(serializers.o(0));
    } else if (_this__u8e3s4.equals(getKClass(KtSet)) || (_this__u8e3s4.equals(getKClass(KtMutableSet)) || _this__u8e3s4.equals(getKClass(LinkedHashSet)))) {
      tmp = new LinkedHashSetSerializer(serializers.o(0));
    } else if (_this__u8e3s4.equals(getKClass(HashMap))) {
      tmp = new HashMapSerializer(serializers.o(0), serializers.o(1));
    } else if (_this__u8e3s4.equals(getKClass(KtMap)) || (_this__u8e3s4.equals(getKClass(KtMutableMap)) || _this__u8e3s4.equals(getKClass(LinkedHashMap)))) {
      tmp = new LinkedHashMapSerializer(serializers.o(0), serializers.o(1));
    } else if (_this__u8e3s4.equals(getKClass(Entry))) {
      tmp = MapEntrySerializer(serializers.o(0), serializers.o(1));
    } else if (_this__u8e3s4.equals(getKClass(Pair))) {
      tmp = PairSerializer(serializers.o(0), serializers.o(1));
    } else if (_this__u8e3s4.equals(getKClass(Triple))) {
      tmp = TripleSerializer(serializers.o(0), serializers.o(1), serializers.o(2));
    } else {
      var tmp_0;
      if (isReferenceArray(_this__u8e3s4)) {
        var tmp_1 = elementClassifierIfArray();
        tmp_0 = ArraySerializer((!(tmp_1 == null) ? isInterface(tmp_1, KClass) : false) ? tmp_1 : THROW_CCE(), serializers.o(0));
      } else {
        tmp_0 = null;
      }
      tmp = tmp_0;
    }
    return tmp;
  }
  function compiledParametrizedSerializer(_this__u8e3s4, serializers) {
    // Inline function 'kotlin.collections.toTypedArray' call
    var tmp$ret$0 = copyToArray(serializers);
    return constructSerializerForGivenTypeArgs(_this__u8e3s4, tmp$ret$0.slice());
  }
  function serializerByKTypeImpl(_this__u8e3s4, type, failOnMissingTypeArgSerializer) {
    var rootClass = kclass(type);
    var isNullable = type.aa();
    // Inline function 'kotlin.collections.map' call
    var this_0 = type.z9();
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      var tmp$ret$0 = typeOrThrow(item);
      destination.e(tmp$ret$0);
    }
    var typeArguments = destination;
    var tmp;
    if (typeArguments.p()) {
      var tmp_0;
      if (isInterface_0(rootClass) && !(_this__u8e3s4.vk(rootClass) == null)) {
        tmp_0 = null;
      } else {
        tmp_0 = findCachedSerializer(rootClass, isNullable);
      }
      tmp = tmp_0;
    } else {
      var tmp_1;
      if (_this__u8e3s4.uk()) {
        tmp_1 = null;
      } else {
        // Inline function 'kotlin.Result.getOrNull' call
        var this_1 = findParametrizedCachedSerializer(rootClass, typeArguments, isNullable);
        var tmp_2;
        if (_Result___get_isFailure__impl__jpiriv(this_1)) {
          tmp_2 = null;
        } else {
          var tmp_3 = _Result___get_value__impl__bjfvqg(this_1);
          tmp_2 = (tmp_3 == null ? true : !(tmp_3 == null)) ? tmp_3 : THROW_CCE();
        }
        tmp_1 = tmp_2;
      }
      tmp = tmp_1;
    }
    var cachedSerializer = tmp;
    if (!(cachedSerializer == null))
      return cachedSerializer;
    var tmp_4;
    if (typeArguments.p()) {
      var tmp0_elvis_lhs = serializerOrNull(rootClass);
      var tmp1_elvis_lhs = tmp0_elvis_lhs == null ? _this__u8e3s4.vk(rootClass) : tmp0_elvis_lhs;
      var tmp_5;
      if (tmp1_elvis_lhs == null) {
        // Inline function 'kotlinx.serialization.polymorphicIfInterface' call
        tmp_5 = isInterface_0(rootClass) ? new PolymorphicSerializer(rootClass) : null;
      } else {
        tmp_5 = tmp1_elvis_lhs;
      }
      tmp_4 = tmp_5;
    } else {
      var tmp2_elvis_lhs = serializersForParameters(_this__u8e3s4, typeArguments, failOnMissingTypeArgSerializer);
      var tmp_6;
      if (tmp2_elvis_lhs == null) {
        return null;
      } else {
        tmp_6 = tmp2_elvis_lhs;
      }
      var serializers = tmp_6;
      var tmp3_elvis_lhs = parametrizedSerializerOrNull(rootClass, serializers, serializerByKTypeImpl$lambda(typeArguments));
      var tmp4_elvis_lhs = tmp3_elvis_lhs == null ? _this__u8e3s4.wk(rootClass, serializers) : tmp3_elvis_lhs;
      var tmp_7;
      if (tmp4_elvis_lhs == null) {
        // Inline function 'kotlinx.serialization.polymorphicIfInterface' call
        tmp_7 = isInterface_0(rootClass) ? new PolymorphicSerializer(rootClass) : null;
      } else {
        tmp_7 = tmp4_elvis_lhs;
      }
      tmp_4 = tmp_7;
    }
    var contextualSerializer = tmp_4;
    var tmp_8;
    if (contextualSerializer == null) {
      tmp_8 = null;
    } else {
      // Inline function 'kotlinx.serialization.internal.cast' call
      tmp_8 = isInterface(contextualSerializer, KSerializer) ? contextualSerializer : THROW_CCE();
    }
    var tmp6_safe_receiver = tmp_8;
    return tmp6_safe_receiver == null ? null : nullable(tmp6_safe_receiver, isNullable);
  }
  function nullable(_this__u8e3s4, shouldBeNullable) {
    if (shouldBeNullable)
      return get_nullable(_this__u8e3s4);
    return isInterface(_this__u8e3s4, KSerializer) ? _this__u8e3s4 : THROW_CCE();
  }
  function serializerByKTypeImpl$lambda($typeArguments) {
    return function () {
      return $typeArguments.o(0).y9();
    };
  }
  function get_SERIALIZERS_CACHE() {
    _init_properties_SerializersCache_kt__hgwi2p();
    return SERIALIZERS_CACHE;
  }
  var SERIALIZERS_CACHE;
  function get_SERIALIZERS_CACHE_NULLABLE() {
    _init_properties_SerializersCache_kt__hgwi2p();
    return SERIALIZERS_CACHE_NULLABLE;
  }
  var SERIALIZERS_CACHE_NULLABLE;
  function get_PARAMETRIZED_SERIALIZERS_CACHE() {
    _init_properties_SerializersCache_kt__hgwi2p();
    return PARAMETRIZED_SERIALIZERS_CACHE;
  }
  var PARAMETRIZED_SERIALIZERS_CACHE;
  function get_PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE() {
    _init_properties_SerializersCache_kt__hgwi2p();
    return PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE;
  }
  var PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE;
  function findCachedSerializer(clazz, isNullable) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var tmp;
    if (!isNullable) {
      var tmp0_safe_receiver = get_SERIALIZERS_CACHE().xk(clazz);
      var tmp_0;
      if (tmp0_safe_receiver == null) {
        tmp_0 = null;
      } else {
        // Inline function 'kotlinx.serialization.internal.cast' call
        tmp_0 = isInterface(tmp0_safe_receiver, KSerializer) ? tmp0_safe_receiver : THROW_CCE();
      }
      tmp = tmp_0;
    } else {
      tmp = get_SERIALIZERS_CACHE_NULLABLE().xk(clazz);
    }
    return tmp;
  }
  function findParametrizedCachedSerializer(clazz, types, isNullable) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var tmp;
    if (!isNullable) {
      var tmp_0 = get_PARAMETRIZED_SERIALIZERS_CACHE().yk(clazz, types);
      tmp = new Result(tmp_0) instanceof Result ? tmp_0 : THROW_CCE();
    } else {
      tmp = get_PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE().yk(clazz, types);
    }
    return tmp;
  }
  function SERIALIZERS_CACHE$lambda(it) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var tmp0_elvis_lhs = serializerOrNull(it);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlinx.serialization.polymorphicIfInterface' call
      tmp = isInterface_0(it) ? new PolymorphicSerializer(it) : null;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function SERIALIZERS_CACHE_NULLABLE$lambda(it) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var tmp0_elvis_lhs = serializerOrNull(it);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlinx.serialization.polymorphicIfInterface' call
      tmp = isInterface_0(it) ? new PolymorphicSerializer(it) : null;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var tmp1_safe_receiver = tmp;
    var tmp2_safe_receiver = tmp1_safe_receiver == null ? null : get_nullable(tmp1_safe_receiver);
    var tmp_0;
    if (tmp2_safe_receiver == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlinx.serialization.internal.cast' call
      tmp_0 = isInterface(tmp2_safe_receiver, KSerializer) ? tmp2_safe_receiver : THROW_CCE();
    }
    return tmp_0;
  }
  function PARAMETRIZED_SERIALIZERS_CACHE$lambda(clazz, types) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var serializers = ensureNotNull(serializersForParameters(EmptySerializersModule_0(), types, true));
    return parametrizedSerializerOrNull(clazz, serializers, PARAMETRIZED_SERIALIZERS_CACHE$lambda$lambda(types));
  }
  function PARAMETRIZED_SERIALIZERS_CACHE$lambda$lambda($types) {
    return function () {
      return $types.o(0).y9();
    };
  }
  function PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE$lambda(clazz, types) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var serializers = ensureNotNull(serializersForParameters(EmptySerializersModule_0(), types, true));
    var tmp0_safe_receiver = parametrizedSerializerOrNull(clazz, serializers, PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE$lambda$lambda(types));
    var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_nullable(tmp0_safe_receiver);
    var tmp;
    if (tmp1_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlinx.serialization.internal.cast' call
      tmp = isInterface(tmp1_safe_receiver, KSerializer) ? tmp1_safe_receiver : THROW_CCE();
    }
    return tmp;
  }
  function PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE$lambda$lambda($types) {
    return function () {
      return $types.o(0).y9();
    };
  }
  var properties_initialized_SerializersCache_kt_q8kf25;
  function _init_properties_SerializersCache_kt__hgwi2p() {
    if (!properties_initialized_SerializersCache_kt_q8kf25) {
      properties_initialized_SerializersCache_kt_q8kf25 = true;
      SERIALIZERS_CACHE = createCache(SERIALIZERS_CACHE$lambda);
      SERIALIZERS_CACHE_NULLABLE = createCache(SERIALIZERS_CACHE_NULLABLE$lambda);
      PARAMETRIZED_SERIALIZERS_CACHE = createParametrizedCache(PARAMETRIZED_SERIALIZERS_CACHE$lambda);
      PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE = createParametrizedCache(PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE$lambda);
    }
  }
  function get_nullable(_this__u8e3s4) {
    var tmp;
    if (_this__u8e3s4.zj().zk()) {
      tmp = isInterface(_this__u8e3s4, KSerializer) ? _this__u8e3s4 : THROW_CCE();
    } else {
      tmp = new NullableSerializer(_this__u8e3s4);
    }
    return tmp;
  }
  function serializer_0(_this__u8e3s4) {
    return StringSerializer_getInstance();
  }
  function serializer_1(_this__u8e3s4) {
    return CharSerializer_getInstance();
  }
  function CharArraySerializer() {
    return CharArraySerializer_getInstance();
  }
  function serializer_2(_this__u8e3s4) {
    return DoubleSerializer_getInstance();
  }
  function DoubleArraySerializer() {
    return DoubleArraySerializer_getInstance();
  }
  function serializer_3(_this__u8e3s4) {
    return FloatSerializer_getInstance();
  }
  function FloatArraySerializer() {
    return FloatArraySerializer_getInstance();
  }
  function serializer_4(_this__u8e3s4) {
    return LongSerializer_getInstance();
  }
  function LongArraySerializer() {
    return LongArraySerializer_getInstance();
  }
  function serializer_5(_this__u8e3s4) {
    return ULongSerializer_getInstance();
  }
  function ULongArraySerializer() {
    return ULongArraySerializer_getInstance();
  }
  function serializer_6(_this__u8e3s4) {
    return IntSerializer_getInstance();
  }
  function IntArraySerializer() {
    return IntArraySerializer_getInstance();
  }
  function serializer_7(_this__u8e3s4) {
    return UIntSerializer_getInstance();
  }
  function UIntArraySerializer() {
    return UIntArraySerializer_getInstance();
  }
  function serializer_8(_this__u8e3s4) {
    return ShortSerializer_getInstance();
  }
  function ShortArraySerializer() {
    return ShortArraySerializer_getInstance();
  }
  function serializer_9(_this__u8e3s4) {
    return UShortSerializer_getInstance();
  }
  function UShortArraySerializer() {
    return UShortArraySerializer_getInstance();
  }
  function serializer_10(_this__u8e3s4) {
    return ByteSerializer_getInstance();
  }
  function ByteArraySerializer() {
    return ByteArraySerializer_getInstance();
  }
  function serializer_11(_this__u8e3s4) {
    return UByteSerializer_getInstance();
  }
  function UByteArraySerializer() {
    return UByteArraySerializer_getInstance();
  }
  function serializer_12(_this__u8e3s4) {
    return BooleanSerializer_getInstance();
  }
  function BooleanArraySerializer() {
    return BooleanArraySerializer_getInstance();
  }
  function serializer_13(_this__u8e3s4) {
    return UnitSerializer_getInstance();
  }
  function NothingSerializer() {
    return NothingSerializer_getInstance();
  }
  function serializer_14(_this__u8e3s4) {
    return DurationSerializer_getInstance();
  }
  function serializer_15(_this__u8e3s4) {
    return InstantSerializer_getInstance();
  }
  function serializer_16(_this__u8e3s4) {
    return UuidSerializer_getInstance();
  }
  function MapEntrySerializer(keySerializer, valueSerializer) {
    return new MapEntrySerializer_0(keySerializer, valueSerializer);
  }
  function PairSerializer(keySerializer, valueSerializer) {
    return new PairSerializer_0(keySerializer, valueSerializer);
  }
  function TripleSerializer(aSerializer, bSerializer, cSerializer) {
    return new TripleSerializer_0(aSerializer, bSerializer, cSerializer);
  }
  function ArraySerializer(kClass, elementSerializer) {
    return new ReferenceArraySerializer(kClass, elementSerializer);
  }
  function MapSerializer(keySerializer, valueSerializer) {
    return new LinkedHashMapSerializer(keySerializer, valueSerializer);
  }
  function ListSerializer(elementSerializer) {
    return new ArrayListSerializer(elementSerializer);
  }
  function withContext(_this__u8e3s4, context) {
    return new ContextDescriptor(_this__u8e3s4, context);
  }
  function ContextDescriptor(original, kClass) {
    this.al_1 = original;
    this.bl_1 = kClass;
    this.cl_1 = this.al_1.dl() + '<' + this.bl_1.m9() + '>';
  }
  protoOf(ContextDescriptor).dl = function () {
    return this.cl_1;
  };
  protoOf(ContextDescriptor).equals = function (other) {
    var tmp0_elvis_lhs = other instanceof ContextDescriptor ? other : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var another = tmp;
    return equals(this.al_1, another.al_1) && another.bl_1.equals(this.bl_1);
  };
  protoOf(ContextDescriptor).hashCode = function () {
    var result = this.bl_1.hashCode();
    result = imul(31, result) + getStringHashCode(this.cl_1) | 0;
    return result;
  };
  protoOf(ContextDescriptor).toString = function () {
    return 'ContextDescriptor(kClass: ' + toString(this.bl_1) + ', original: ' + toString(this.al_1) + ')';
  };
  protoOf(ContextDescriptor).el = function () {
    return this.al_1.el();
  };
  protoOf(ContextDescriptor).zk = function () {
    return this.al_1.zk();
  };
  protoOf(ContextDescriptor).fl = function () {
    return this.al_1.fl();
  };
  protoOf(ContextDescriptor).gl = function () {
    return this.al_1.gl();
  };
  protoOf(ContextDescriptor).hl = function () {
    return this.al_1.hl();
  };
  protoOf(ContextDescriptor).il = function (index) {
    return this.al_1.il(index);
  };
  protoOf(ContextDescriptor).jl = function (name) {
    return this.al_1.jl(name);
  };
  protoOf(ContextDescriptor).kl = function (index) {
    return this.al_1.kl(index);
  };
  protoOf(ContextDescriptor).ll = function (index) {
    return this.al_1.ll(index);
  };
  protoOf(ContextDescriptor).ml = function (index) {
    return this.al_1.ml(index);
  };
  function getContextualDescriptor(_this__u8e3s4, descriptor) {
    var tmp0_safe_receiver = get_capturedKClass(descriptor);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      var tmp0_safe_receiver_0 = _this__u8e3s4.vk(tmp0_safe_receiver);
      tmp = tmp0_safe_receiver_0 == null ? null : tmp0_safe_receiver_0.zj();
    }
    return tmp;
  }
  function get_capturedKClass(_this__u8e3s4) {
    var tmp;
    if (_this__u8e3s4 instanceof ContextDescriptor) {
      tmp = _this__u8e3s4.bl_1;
    } else {
      if (_this__u8e3s4 instanceof SerialDescriptorForNullable) {
        tmp = get_capturedKClass(_this__u8e3s4.nl_1);
      } else {
        tmp = null;
      }
    }
    return tmp;
  }
  function SerialDescriptor() {
  }
  function get_elementDescriptors(_this__u8e3s4) {
    // Inline function 'kotlin.collections.Iterable' call
    return new elementDescriptors$$inlined$Iterable$1(_this__u8e3s4);
  }
  function elementDescriptors$1($this_elementDescriptors) {
    this.rl_1 = $this_elementDescriptors;
    this.ql_1 = $this_elementDescriptors.gl();
  }
  protoOf(elementDescriptors$1).h = function () {
    return this.ql_1 > 0;
  };
  protoOf(elementDescriptors$1).i = function () {
    var tmp = this.rl_1.gl();
    var _unary__edvuaz = this.ql_1;
    this.ql_1 = _unary__edvuaz - 1 | 0;
    return this.rl_1.ll(tmp - _unary__edvuaz | 0);
  };
  function elementDescriptors$$inlined$Iterable$1($this_elementDescriptors) {
    this.sl_1 = $this_elementDescriptors;
  }
  protoOf(elementDescriptors$$inlined$Iterable$1).g = function () {
    return new elementDescriptors$1(this.sl_1);
  };
  function buildSerialDescriptor(serialName, kind, typeParameters, builder) {
    var tmp;
    if (builder === VOID) {
      tmp = buildSerialDescriptor$lambda;
    } else {
      tmp = builder;
    }
    builder = tmp;
    // Inline function 'kotlin.text.isNotBlank' call
    // Inline function 'kotlin.require' call
    if (!!isBlank(serialName)) {
      var message = 'Blank serial names are prohibited';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!!equals(kind, CLASS_getInstance())) {
      var message_0 = "For StructureKind.CLASS please use 'buildClassSerialDescriptor' instead";
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    var sdBuilder = new ClassSerialDescriptorBuilder(serialName);
    builder(sdBuilder);
    return new SerialDescriptorImpl(serialName, kind, sdBuilder.fk_1.j(), toList(typeParameters), sdBuilder);
  }
  function ClassSerialDescriptorBuilder(serialName) {
    this.ck_1 = serialName;
    this.dk_1 = false;
    this.ek_1 = emptyList();
    this.fk_1 = ArrayList_init_$Create$_0();
    this.gk_1 = HashSet_init_$Create$();
    this.hk_1 = ArrayList_init_$Create$_0();
    this.ik_1 = ArrayList_init_$Create$_0();
    this.jk_1 = ArrayList_init_$Create$_0();
  }
  protoOf(ClassSerialDescriptorBuilder).tl = function (elementName, descriptor, annotations, isOptional) {
    // Inline function 'kotlin.require' call
    if (!this.gk_1.e(elementName)) {
      var message = "Element with name '" + elementName + "' is already registered in " + this.ck_1;
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.collections.plusAssign' call
    this.fk_1.e(elementName);
    // Inline function 'kotlin.collections.plusAssign' call
    this.hk_1.e(descriptor);
    // Inline function 'kotlin.collections.plusAssign' call
    this.ik_1.e(annotations);
    // Inline function 'kotlin.collections.plusAssign' call
    this.jk_1.e(isOptional);
  };
  protoOf(ClassSerialDescriptorBuilder).kk = function (elementName, descriptor, annotations, isOptional, $super) {
    annotations = annotations === VOID ? emptyList() : annotations;
    isOptional = isOptional === VOID ? false : isOptional;
    var tmp;
    if ($super === VOID) {
      this.tl(elementName, descriptor, annotations, isOptional);
      tmp = Unit_instance;
    } else {
      tmp = $super.tl.call(this, elementName, descriptor, annotations, isOptional);
    }
    return tmp;
  };
  function _get__hashCode__tgwhef($this) {
    var tmp0 = $this.fm_1;
    var tmp = KProperty1;
    // Inline function 'kotlin.getValue' call
    getPropertyCallableRef('_hashCode', 1, tmp, SerialDescriptorImpl$_get__hashCode_$ref_2v7wzp(), null);
    return tmp0.v1();
  }
  function SerialDescriptorImpl$_hashCode$delegate$lambda(this$0) {
    return function () {
      return hashCodeImpl(this$0, this$0.em_1);
    };
  }
  function SerialDescriptorImpl$_get__hashCode_$ref_2v7wzp() {
    return function (p0) {
      return _get__hashCode__tgwhef(p0);
    };
  }
  function SerialDescriptorImpl(serialName, kind, elementsCount, typeParameters, builder) {
    this.ul_1 = serialName;
    this.vl_1 = kind;
    this.wl_1 = elementsCount;
    this.xl_1 = builder.ek_1;
    this.yl_1 = toHashSet(builder.fk_1);
    var tmp = this;
    // Inline function 'kotlin.collections.toTypedArray' call
    var this_0 = builder.fk_1;
    tmp.zl_1 = copyToArray(this_0);
    this.am_1 = compactArray(builder.hk_1);
    var tmp_0 = this;
    // Inline function 'kotlin.collections.toTypedArray' call
    var this_1 = builder.ik_1;
    tmp_0.bm_1 = copyToArray(this_1);
    this.cm_1 = toBooleanArray(builder.jk_1);
    var tmp_1 = this;
    // Inline function 'kotlin.collections.map' call
    var this_2 = withIndex(this.zl_1);
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_2, 10));
    var _iterator__ex2g4s = this_2.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      var tmp$ret$2 = to(item.nd_1, item.md_1);
      destination.e(tmp$ret$2);
    }
    tmp_1.dm_1 = toMap(destination);
    this.em_1 = compactArray(typeParameters);
    var tmp_2 = this;
    tmp_2.fm_1 = lazy_0(SerialDescriptorImpl$_hashCode$delegate$lambda(this));
  }
  protoOf(SerialDescriptorImpl).dl = function () {
    return this.ul_1;
  };
  protoOf(SerialDescriptorImpl).el = function () {
    return this.vl_1;
  };
  protoOf(SerialDescriptorImpl).gl = function () {
    return this.wl_1;
  };
  protoOf(SerialDescriptorImpl).hl = function () {
    return this.xl_1;
  };
  protoOf(SerialDescriptorImpl).gm = function () {
    return this.yl_1;
  };
  protoOf(SerialDescriptorImpl).il = function (index) {
    return getChecked(this.zl_1, index);
  };
  protoOf(SerialDescriptorImpl).jl = function (name) {
    var tmp0_elvis_lhs = this.dm_1.y1(name);
    return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
  };
  protoOf(SerialDescriptorImpl).kl = function (index) {
    return getChecked(this.bm_1, index);
  };
  protoOf(SerialDescriptorImpl).ll = function (index) {
    return getChecked(this.am_1, index);
  };
  protoOf(SerialDescriptorImpl).ml = function (index) {
    return getChecked_0(this.cm_1, index);
  };
  protoOf(SerialDescriptorImpl).equals = function (other) {
    var tmp$ret$0;
    $l$block_5: {
      // Inline function 'kotlinx.serialization.internal.equalsImpl' call
      if (this === other) {
        tmp$ret$0 = true;
        break $l$block_5;
      }
      if (!(other instanceof SerialDescriptorImpl)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.dl() === other.dl())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!contentEquals(this.em_1, other.em_1)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.gl() === other.gl())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.gl();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.ll(index).dl() === other.ll(index).dl())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.ll(index).el(), other.ll(index).el())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
        }
         while (inductionVariable < last);
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  };
  protoOf(SerialDescriptorImpl).hashCode = function () {
    return _get__hashCode__tgwhef(this);
  };
  protoOf(SerialDescriptorImpl).toString = function () {
    return toStringImpl(this);
  };
  function buildClassSerialDescriptor(serialName, typeParameters, builderAction) {
    var tmp;
    if (builderAction === VOID) {
      tmp = buildClassSerialDescriptor$lambda;
    } else {
      tmp = builderAction;
    }
    builderAction = tmp;
    // Inline function 'kotlin.text.isNotBlank' call
    // Inline function 'kotlin.require' call
    if (!!isBlank(serialName)) {
      var message = 'Blank serial names are prohibited';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var sdBuilder = new ClassSerialDescriptorBuilder(serialName);
    builderAction(sdBuilder);
    return new SerialDescriptorImpl(serialName, CLASS_getInstance(), sdBuilder.fk_1.j(), toList(typeParameters), sdBuilder);
  }
  function PrimitiveSerialDescriptor(serialName, kind) {
    // Inline function 'kotlin.text.isNotBlank' call
    // Inline function 'kotlin.require' call
    if (!!isBlank(serialName)) {
      var message = 'Blank serial names are prohibited';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return PrimitiveDescriptorSafe(serialName, kind);
  }
  function buildSerialDescriptor$lambda(_this__u8e3s4) {
    return Unit_instance;
  }
  function buildClassSerialDescriptor$lambda(_this__u8e3s4) {
    return Unit_instance;
  }
  function ENUM() {
    ENUM_instance = this;
    SerialKind.call(this);
  }
  var ENUM_instance;
  function ENUM_getInstance() {
    if (ENUM_instance == null)
      new ENUM();
    return ENUM_instance;
  }
  function CONTEXTUAL() {
    CONTEXTUAL_instance = this;
    SerialKind.call(this);
  }
  var CONTEXTUAL_instance;
  function CONTEXTUAL_getInstance() {
    if (CONTEXTUAL_instance == null)
      new CONTEXTUAL();
    return CONTEXTUAL_instance;
  }
  function SerialKind() {
  }
  protoOf(SerialKind).toString = function () {
    return ensureNotNull(getKClassFromExpression(this).m9());
  };
  protoOf(SerialKind).hashCode = function () {
    return getStringHashCode(this.toString());
  };
  function SEALED() {
    SEALED_instance = this;
    PolymorphicKind.call(this);
  }
  var SEALED_instance;
  function SEALED_getInstance() {
    if (SEALED_instance == null)
      new SEALED();
    return SEALED_instance;
  }
  function OPEN() {
    OPEN_instance = this;
    PolymorphicKind.call(this);
  }
  var OPEN_instance;
  function OPEN_getInstance() {
    if (OPEN_instance == null)
      new OPEN();
    return OPEN_instance;
  }
  function PolymorphicKind() {
    SerialKind.call(this);
  }
  function BOOLEAN() {
    BOOLEAN_instance = this;
    PrimitiveKind.call(this);
  }
  var BOOLEAN_instance;
  function BOOLEAN_getInstance() {
    if (BOOLEAN_instance == null)
      new BOOLEAN();
    return BOOLEAN_instance;
  }
  function BYTE() {
    BYTE_instance = this;
    PrimitiveKind.call(this);
  }
  var BYTE_instance;
  function BYTE_getInstance() {
    if (BYTE_instance == null)
      new BYTE();
    return BYTE_instance;
  }
  function CHAR() {
    CHAR_instance = this;
    PrimitiveKind.call(this);
  }
  var CHAR_instance;
  function CHAR_getInstance() {
    if (CHAR_instance == null)
      new CHAR();
    return CHAR_instance;
  }
  function SHORT() {
    SHORT_instance = this;
    PrimitiveKind.call(this);
  }
  var SHORT_instance;
  function SHORT_getInstance() {
    if (SHORT_instance == null)
      new SHORT();
    return SHORT_instance;
  }
  function INT() {
    INT_instance = this;
    PrimitiveKind.call(this);
  }
  var INT_instance;
  function INT_getInstance() {
    if (INT_instance == null)
      new INT();
    return INT_instance;
  }
  function LONG() {
    LONG_instance = this;
    PrimitiveKind.call(this);
  }
  var LONG_instance;
  function LONG_getInstance() {
    if (LONG_instance == null)
      new LONG();
    return LONG_instance;
  }
  function FLOAT() {
    FLOAT_instance = this;
    PrimitiveKind.call(this);
  }
  var FLOAT_instance;
  function FLOAT_getInstance() {
    if (FLOAT_instance == null)
      new FLOAT();
    return FLOAT_instance;
  }
  function DOUBLE() {
    DOUBLE_instance = this;
    PrimitiveKind.call(this);
  }
  var DOUBLE_instance;
  function DOUBLE_getInstance() {
    if (DOUBLE_instance == null)
      new DOUBLE();
    return DOUBLE_instance;
  }
  function STRING() {
    STRING_instance = this;
    PrimitiveKind.call(this);
  }
  var STRING_instance;
  function STRING_getInstance() {
    if (STRING_instance == null)
      new STRING();
    return STRING_instance;
  }
  function PrimitiveKind() {
    SerialKind.call(this);
  }
  function CLASS() {
    CLASS_instance = this;
    StructureKind.call(this);
  }
  var CLASS_instance;
  function CLASS_getInstance() {
    if (CLASS_instance == null)
      new CLASS();
    return CLASS_instance;
  }
  function LIST() {
    LIST_instance = this;
    StructureKind.call(this);
  }
  var LIST_instance;
  function LIST_getInstance() {
    if (LIST_instance == null)
      new LIST();
    return LIST_instance;
  }
  function MAP() {
    MAP_instance = this;
    StructureKind.call(this);
  }
  var MAP_instance;
  function MAP_getInstance() {
    if (MAP_instance == null)
      new MAP();
    return MAP_instance;
  }
  function OBJECT() {
    OBJECT_instance = this;
    StructureKind.call(this);
  }
  var OBJECT_instance;
  function OBJECT_getInstance() {
    if (OBJECT_instance == null)
      new OBJECT();
    return OBJECT_instance;
  }
  function StructureKind() {
    SerialKind.call(this);
  }
  function AbstractDecoder() {
  }
  protoOf(AbstractDecoder).hm = function () {
    throw SerializationException_init_$Create$_0(toString(getKClassFromExpression(this)) + " can't retrieve untyped values");
  };
  protoOf(AbstractDecoder).im = function () {
    return true;
  };
  protoOf(AbstractDecoder).jm = function () {
    return null;
  };
  protoOf(AbstractDecoder).km = function () {
    var tmp = this.hm();
    return typeof tmp === 'boolean' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).lm = function () {
    var tmp = this.hm();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).mm = function () {
    var tmp = this.hm();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).nm = function () {
    var tmp = this.hm();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).om = function () {
    var tmp = this.hm();
    return tmp instanceof Long ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).pm = function () {
    var tmp = this.hm();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).qm = function () {
    var tmp = this.hm();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).rm = function () {
    var tmp = this.hm();
    return tmp instanceof Char ? tmp.g1_1 : THROW_CCE();
  };
  protoOf(AbstractDecoder).sm = function () {
    var tmp = this.hm();
    return typeof tmp === 'string' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).tm = function (descriptor) {
    return this;
  };
  protoOf(AbstractDecoder).um = function (deserializer, previousValue) {
    return this.vm(deserializer);
  };
  protoOf(AbstractDecoder).wm = function (descriptor) {
    return this;
  };
  protoOf(AbstractDecoder).xm = function (descriptor) {
  };
  protoOf(AbstractDecoder).ym = function (descriptor, index) {
    return this.km();
  };
  protoOf(AbstractDecoder).zm = function (descriptor, index) {
    return this.lm();
  };
  protoOf(AbstractDecoder).an = function (descriptor, index) {
    return this.mm();
  };
  protoOf(AbstractDecoder).bn = function (descriptor, index) {
    return this.nm();
  };
  protoOf(AbstractDecoder).cn = function (descriptor, index) {
    return this.om();
  };
  protoOf(AbstractDecoder).dn = function (descriptor, index) {
    return this.pm();
  };
  protoOf(AbstractDecoder).en = function (descriptor, index) {
    return this.qm();
  };
  protoOf(AbstractDecoder).fn = function (descriptor, index) {
    return this.rm();
  };
  protoOf(AbstractDecoder).gn = function (descriptor, index) {
    return this.sm();
  };
  protoOf(AbstractDecoder).hn = function (descriptor, index) {
    return this.tm(descriptor.ll(index));
  };
  protoOf(AbstractDecoder).in = function (descriptor, index, deserializer, previousValue) {
    return this.um(deserializer, previousValue);
  };
  function AbstractEncoder() {
  }
  protoOf(AbstractEncoder).wm = function (descriptor) {
    return this;
  };
  protoOf(AbstractEncoder).xm = function (descriptor) {
  };
  protoOf(AbstractEncoder).on = function (descriptor, index) {
    return true;
  };
  protoOf(AbstractEncoder).pn = function (value) {
    throw SerializationException_init_$Create$_0('Non-serializable ' + toString(getKClassFromExpression(value)) + ' is not supported by ' + toString(getKClassFromExpression(this)) + ' encoder');
  };
  protoOf(AbstractEncoder).qn = function () {
    throw SerializationException_init_$Create$_0("'null' is not supported by default");
  };
  protoOf(AbstractEncoder).rn = function (value) {
    return this.pn(value);
  };
  protoOf(AbstractEncoder).sn = function (value) {
    return this.pn(value);
  };
  protoOf(AbstractEncoder).tn = function (value) {
    return this.pn(value);
  };
  protoOf(AbstractEncoder).un = function (value) {
    return this.pn(value);
  };
  protoOf(AbstractEncoder).vn = function (value) {
    return this.pn(value);
  };
  protoOf(AbstractEncoder).wn = function (value) {
    return this.pn(value);
  };
  protoOf(AbstractEncoder).xn = function (value) {
    return this.pn(value);
  };
  protoOf(AbstractEncoder).yn = function (value) {
    return this.pn(new Char(value));
  };
  protoOf(AbstractEncoder).zn = function (value) {
    return this.pn(value);
  };
  protoOf(AbstractEncoder).ao = function (descriptor) {
    return this;
  };
  protoOf(AbstractEncoder).bo = function (descriptor, index, value) {
    if (this.on(descriptor, index)) {
      this.rn(value);
    }
  };
  protoOf(AbstractEncoder).co = function (descriptor, index, value) {
    if (this.on(descriptor, index)) {
      this.sn(value);
    }
  };
  protoOf(AbstractEncoder).do = function (descriptor, index, value) {
    if (this.on(descriptor, index)) {
      this.tn(value);
    }
  };
  protoOf(AbstractEncoder).eo = function (descriptor, index, value) {
    if (this.on(descriptor, index)) {
      this.un(value);
    }
  };
  protoOf(AbstractEncoder).fo = function (descriptor, index, value) {
    if (this.on(descriptor, index)) {
      this.vn(value);
    }
  };
  protoOf(AbstractEncoder).go = function (descriptor, index, value) {
    if (this.on(descriptor, index)) {
      this.wn(value);
    }
  };
  protoOf(AbstractEncoder).ho = function (descriptor, index, value) {
    if (this.on(descriptor, index)) {
      this.xn(value);
    }
  };
  protoOf(AbstractEncoder).io = function (descriptor, index, value) {
    if (this.on(descriptor, index)) {
      this.yn(value);
    }
  };
  protoOf(AbstractEncoder).jo = function (descriptor, index, value) {
    if (this.on(descriptor, index)) {
      this.zn(value);
    }
  };
  protoOf(AbstractEncoder).ko = function (descriptor, index) {
    return this.on(descriptor, index) ? this.ao(descriptor.ll(index)) : NoOpEncoder_getInstance();
  };
  protoOf(AbstractEncoder).lo = function (descriptor, index, serializer, value) {
    if (this.on(descriptor, index)) {
      this.mo(serializer, value);
    }
  };
  function Decoder() {
  }
  function CompositeDecoder() {
  }
  function Encoder() {
  }
  function decodeSequentially_0($this, compositeDecoder) {
    var klassName = compositeDecoder.gn($this.zj(), 0);
    var serializer = findPolymorphicSerializer_0($this, compositeDecoder, klassName);
    return compositeDecoder.jn($this.zj(), 1, serializer);
  }
  function AbstractPolymorphicSerializer() {
  }
  protoOf(AbstractPolymorphicSerializer).pk = function (encoder, value) {
    var actualSerializer = findPolymorphicSerializer(this, encoder, value);
    // Inline function 'kotlinx.serialization.encoding.encodeStructure' call
    var descriptor = this.zj();
    var composite = encoder.wm(descriptor);
    composite.jo(this.zj(), 0, actualSerializer.zj().dl());
    var tmp = this.zj();
    // Inline function 'kotlinx.serialization.internal.cast' call
    var tmp$ret$0 = isInterface(actualSerializer, SerializationStrategy) ? actualSerializer : THROW_CCE();
    composite.lo(tmp, 1, tmp$ret$0, value);
    composite.xm(descriptor);
  };
  protoOf(AbstractPolymorphicSerializer).ak = function (encoder, value) {
    return this.pk(encoder, !(value == null) ? value : THROW_CCE());
  };
  protoOf(AbstractPolymorphicSerializer).bk = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.zj();
    var composite = decoder.wm(descriptor);
    var tmp$ret$0;
    $l$block: {
      var klassName = null;
      var value = null;
      if (composite.ln()) {
        tmp$ret$0 = decodeSequentially_0(this, composite);
        break $l$block;
      }
      mainLoop: while (true) {
        var index = composite.mn(this.zj());
        switch (index) {
          case -1:
            break mainLoop;
          case 0:
            klassName = composite.gn(this.zj(), index);
            break;
          case 1:
            var tmp0 = klassName;
            var tmp$ret$2;
            $l$block_0: {
              // Inline function 'kotlin.requireNotNull' call
              if (tmp0 == null) {
                var message = 'Cannot read polymorphic value before its type token';
                throw IllegalArgumentException_init_$Create$(toString(message));
              } else {
                tmp$ret$2 = tmp0;
                break $l$block_0;
              }
            }

            klassName = tmp$ret$2;
            var serializer = findPolymorphicSerializer_0(this, composite, klassName);
            value = composite.jn(this.zj(), index, serializer);
            break;
          default:
            var tmp0_elvis_lhs = klassName;
            throw SerializationException_init_$Create$_0('Invalid index in polymorphic deserialization of ' + (tmp0_elvis_lhs == null ? 'unknown class' : tmp0_elvis_lhs) + ('\n Expected 0, 1 or DECODE_DONE(-1), but found ' + index));
        }
      }
      var tmp0_0 = value;
      var tmp$ret$4;
      $l$block_1: {
        // Inline function 'kotlin.requireNotNull' call
        if (tmp0_0 == null) {
          var message_0 = 'Polymorphic value has not been read for class ' + klassName;
          throw IllegalArgumentException_init_$Create$(toString(message_0));
        } else {
          tmp$ret$4 = tmp0_0;
          break $l$block_1;
        }
      }
      var tmp = tmp$ret$4;
      tmp$ret$0 = !(tmp == null) ? tmp : THROW_CCE();
    }
    var result = tmp$ret$0;
    composite.xm(descriptor);
    return result;
  };
  protoOf(AbstractPolymorphicSerializer).qk = function (decoder, klassName) {
    return decoder.kn().po(this.ok(), klassName);
  };
  protoOf(AbstractPolymorphicSerializer).rk = function (encoder, value) {
    return encoder.kn().qo(this.ok(), value);
  };
  function throwSubtypeNotRegistered(subClass, baseClass) {
    var tmp0_elvis_lhs = subClass.m9();
    throwSubtypeNotRegistered_0(tmp0_elvis_lhs == null ? toString(subClass) : tmp0_elvis_lhs, baseClass);
  }
  function throwSubtypeNotRegistered_0(subClassName, baseClass) {
    var scope = "in the polymorphic scope of '" + baseClass.m9() + "'";
    throw SerializationException_init_$Create$_0(subClassName == null ? 'Class discriminator was missing and no default serializers were registered ' + scope + '.' : "Serializer for subclass '" + subClassName + "' is not found " + scope + '.\n' + ("Check if class with serial name '" + subClassName + "' exists and serializer is registered in a corresponding SerializersModule.\n") + ("To be registered automatically, class '" + subClassName + "' has to be '@Serializable', and the base class '" + baseClass.m9() + "' has to be sealed and '@Serializable'."));
  }
  function NothingSerializer_0() {
    NothingSerializer_instance = this;
    this.ro_1 = NothingSerialDescriptor_getInstance();
  }
  protoOf(NothingSerializer_0).zj = function () {
    return this.ro_1;
  };
  protoOf(NothingSerializer_0).so = function (encoder, value) {
    throw SerializationException_init_$Create$_0("'kotlin.Nothing' cannot be serialized");
  };
  protoOf(NothingSerializer_0).ak = function (encoder, value) {
    var tmp;
    if (false) {
      tmp = value;
    } else {
      tmp = THROW_CCE();
    }
    return this.so(encoder, tmp);
  };
  protoOf(NothingSerializer_0).bk = function (decoder) {
    throw SerializationException_init_$Create$_0("'kotlin.Nothing' does not have instances");
  };
  var NothingSerializer_instance;
  function NothingSerializer_getInstance() {
    if (NothingSerializer_instance == null)
      new NothingSerializer_0();
    return NothingSerializer_instance;
  }
  function DurationSerializer() {
    DurationSerializer_instance = this;
    this.to_1 = new PrimitiveSerialDescriptor_0('kotlin.time.Duration', STRING_getInstance());
  }
  protoOf(DurationSerializer).zj = function () {
    return this.to_1;
  };
  protoOf(DurationSerializer).uo = function (encoder, value) {
    encoder.zn(Duration__toIsoString_impl_9h6wsm(value));
  };
  protoOf(DurationSerializer).ak = function (encoder, value) {
    return this.uo(encoder, value instanceof Duration ? value.dc_1 : THROW_CCE());
  };
  protoOf(DurationSerializer).vo = function (decoder) {
    return Companion_getInstance().qg(decoder.sm());
  };
  protoOf(DurationSerializer).bk = function (decoder) {
    return new Duration(this.vo(decoder));
  };
  var DurationSerializer_instance;
  function DurationSerializer_getInstance() {
    if (DurationSerializer_instance == null)
      new DurationSerializer();
    return DurationSerializer_instance;
  }
  function InstantSerializer() {
    InstantSerializer_instance = this;
    this.wo_1 = new PrimitiveSerialDescriptor_0('kotlin.time.Instant', STRING_getInstance());
  }
  protoOf(InstantSerializer).zj = function () {
    return this.wo_1;
  };
  protoOf(InstantSerializer).xo = function (encoder, value) {
    encoder.zn(value.toString());
  };
  protoOf(InstantSerializer).ak = function (encoder, value) {
    return this.xo(encoder, value instanceof Instant ? value : THROW_CCE());
  };
  protoOf(InstantSerializer).bk = function (decoder) {
    return Companion_getInstance_0().wg(decoder.sm());
  };
  var InstantSerializer_instance;
  function InstantSerializer_getInstance() {
    if (InstantSerializer_instance == null)
      new InstantSerializer();
    return InstantSerializer_instance;
  }
  function UuidSerializer() {
    UuidSerializer_instance = this;
    this.yo_1 = new PrimitiveSerialDescriptor_0('kotlin.uuid.Uuid', STRING_getInstance());
  }
  protoOf(UuidSerializer).zj = function () {
    return this.yo_1;
  };
  protoOf(UuidSerializer).zo = function (encoder, value) {
    encoder.zn(value.toString());
  };
  protoOf(UuidSerializer).ak = function (encoder, value) {
    return this.zo(encoder, value instanceof Uuid ? value : THROW_CCE());
  };
  protoOf(UuidSerializer).bk = function (decoder) {
    return Companion_getInstance_1().gi(decoder.sm());
  };
  var UuidSerializer_instance;
  function UuidSerializer_getInstance() {
    if (UuidSerializer_instance == null)
      new UuidSerializer();
    return UuidSerializer_instance;
  }
  function CachedNames() {
  }
  function ArrayListClassDesc(elementDesc) {
    ListLikeDescriptor.call(this, elementDesc);
  }
  protoOf(ArrayListClassDesc).dl = function () {
    return 'kotlin.collections.ArrayList';
  };
  function HashSetClassDesc(elementDesc) {
    ListLikeDescriptor.call(this, elementDesc);
  }
  protoOf(HashSetClassDesc).dl = function () {
    return 'kotlin.collections.HashSet';
  };
  function LinkedHashSetClassDesc(elementDesc) {
    ListLikeDescriptor.call(this, elementDesc);
  }
  protoOf(LinkedHashSetClassDesc).dl = function () {
    return 'kotlin.collections.LinkedHashSet';
  };
  function HashMapClassDesc(keyDesc, valueDesc) {
    MapLikeDescriptor.call(this, 'kotlin.collections.HashMap', keyDesc, valueDesc);
  }
  function LinkedHashMapClassDesc(keyDesc, valueDesc) {
    MapLikeDescriptor.call(this, 'kotlin.collections.LinkedHashMap', keyDesc, valueDesc);
  }
  function ArrayClassDesc(elementDesc) {
    ListLikeDescriptor.call(this, elementDesc);
  }
  protoOf(ArrayClassDesc).dl = function () {
    return 'kotlin.Array';
  };
  function ListLikeDescriptor(elementDescriptor) {
    this.cp_1 = elementDescriptor;
    this.dp_1 = 1;
  }
  protoOf(ListLikeDescriptor).el = function () {
    return LIST_getInstance();
  };
  protoOf(ListLikeDescriptor).gl = function () {
    return this.dp_1;
  };
  protoOf(ListLikeDescriptor).il = function (index) {
    return index.toString();
  };
  protoOf(ListLikeDescriptor).jl = function (name) {
    var tmp0_elvis_lhs = toIntOrNull(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalArgumentException_init_$Create$(name + ' is not a valid list index');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(ListLikeDescriptor).ml = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.dl() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return false;
  };
  protoOf(ListLikeDescriptor).kl = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.dl() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return emptyList();
  };
  protoOf(ListLikeDescriptor).ll = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.dl() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return this.cp_1;
  };
  protoOf(ListLikeDescriptor).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ListLikeDescriptor))
      return false;
    if (equals(this.cp_1, other.cp_1) && this.dl() === other.dl())
      return true;
    return false;
  };
  protoOf(ListLikeDescriptor).hashCode = function () {
    return imul(hashCode(this.cp_1), 31) + getStringHashCode(this.dl()) | 0;
  };
  protoOf(ListLikeDescriptor).toString = function () {
    return this.dl() + '(' + toString(this.cp_1) + ')';
  };
  function MapLikeDescriptor(serialName, keyDescriptor, valueDescriptor) {
    this.ip_1 = serialName;
    this.jp_1 = keyDescriptor;
    this.kp_1 = valueDescriptor;
    this.lp_1 = 2;
  }
  protoOf(MapLikeDescriptor).dl = function () {
    return this.ip_1;
  };
  protoOf(MapLikeDescriptor).el = function () {
    return MAP_getInstance();
  };
  protoOf(MapLikeDescriptor).gl = function () {
    return this.lp_1;
  };
  protoOf(MapLikeDescriptor).il = function (index) {
    return index.toString();
  };
  protoOf(MapLikeDescriptor).jl = function (name) {
    var tmp0_elvis_lhs = toIntOrNull(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalArgumentException_init_$Create$(name + ' is not a valid map index');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(MapLikeDescriptor).ml = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.dl() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return false;
  };
  protoOf(MapLikeDescriptor).kl = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.dl() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return emptyList();
  };
  protoOf(MapLikeDescriptor).ll = function (index) {
    // Inline function 'kotlin.require' call
    if (!(index >= 0)) {
      var message = 'Illegal index ' + index + ', ' + this.dl() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var tmp;
    switch (index % 2 | 0) {
      case 0:
        tmp = this.jp_1;
        break;
      case 1:
        tmp = this.kp_1;
        break;
      default:
        var message_0 = 'Unreached';
        throw IllegalStateException_init_$Create$(toString(message_0));
    }
    return tmp;
  };
  protoOf(MapLikeDescriptor).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof MapLikeDescriptor))
      return false;
    if (!(this.dl() === other.dl()))
      return false;
    if (!equals(this.jp_1, other.jp_1))
      return false;
    if (!equals(this.kp_1, other.kp_1))
      return false;
    return true;
  };
  protoOf(MapLikeDescriptor).hashCode = function () {
    var result = getStringHashCode(this.dl());
    result = imul(31, result) + hashCode(this.jp_1) | 0;
    result = imul(31, result) + hashCode(this.kp_1) | 0;
    return result;
  };
  protoOf(MapLikeDescriptor).toString = function () {
    return this.dl() + '(' + toString(this.jp_1) + ', ' + toString(this.kp_1) + ')';
  };
  function PrimitiveArrayDescriptor(primitive) {
    ListLikeDescriptor.call(this, primitive);
    this.qp_1 = primitive.dl() + 'Array';
  }
  protoOf(PrimitiveArrayDescriptor).dl = function () {
    return this.qp_1;
  };
  function ArrayListSerializer(element) {
    CollectionSerializer.call(this, element);
    this.sp_1 = new ArrayListClassDesc(element.zj());
  }
  protoOf(ArrayListSerializer).zj = function () {
    return this.sp_1;
  };
  protoOf(ArrayListSerializer).tp = function () {
    // Inline function 'kotlin.collections.arrayListOf' call
    return ArrayList_init_$Create$_0();
  };
  protoOf(ArrayListSerializer).up = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(ArrayListSerializer).vp = function (_this__u8e3s4) {
    return this.up(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).wp = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(ArrayListSerializer).xp = function (_this__u8e3s4) {
    return this.wp(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).yp = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? ArrayList_init_$Create$_1(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(ArrayListSerializer).zp = function (_this__u8e3s4) {
    return this.yp((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtList) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).aq = function (_this__u8e3s4, size) {
    return _this__u8e3s4.e5(size);
  };
  protoOf(ArrayListSerializer).bq = function (_this__u8e3s4, size) {
    return this.aq(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(ArrayListSerializer).cq = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.e2(index, element);
  };
  protoOf(ArrayListSerializer).dq = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE();
    return this.cq(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function HashSetSerializer(eSerializer) {
    CollectionSerializer.call(this, eSerializer);
    this.oq_1 = new HashSetClassDesc(eSerializer.zj());
  }
  protoOf(HashSetSerializer).zj = function () {
    return this.oq_1;
  };
  protoOf(HashSetSerializer).tp = function () {
    return HashSet_init_$Create$();
  };
  protoOf(HashSetSerializer).pq = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(HashSetSerializer).vp = function (_this__u8e3s4) {
    return this.pq(_this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashSetSerializer).qq = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(HashSetSerializer).xp = function (_this__u8e3s4) {
    return this.qq(_this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashSetSerializer).rq = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? HashSet_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(HashSetSerializer).zp = function (_this__u8e3s4) {
    return this.rq((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtSet) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashSetSerializer).sq = function (_this__u8e3s4, size) {
  };
  protoOf(HashSetSerializer).bq = function (_this__u8e3s4, size) {
    return this.sq(_this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(HashSetSerializer).tq = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.e(element);
  };
  protoOf(HashSetSerializer).dq = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE();
    return this.tq(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function LinkedHashSetSerializer(eSerializer) {
    CollectionSerializer.call(this, eSerializer);
    this.vq_1 = new LinkedHashSetClassDesc(eSerializer.zj());
  }
  protoOf(LinkedHashSetSerializer).zj = function () {
    return this.vq_1;
  };
  protoOf(LinkedHashSetSerializer).tp = function () {
    // Inline function 'kotlin.collections.linkedSetOf' call
    return LinkedHashSet_init_$Create$();
  };
  protoOf(LinkedHashSetSerializer).wq = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(LinkedHashSetSerializer).vp = function (_this__u8e3s4) {
    return this.wq(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).xq = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(LinkedHashSetSerializer).xp = function (_this__u8e3s4) {
    return this.xq(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).rq = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? LinkedHashSet_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(LinkedHashSetSerializer).zp = function (_this__u8e3s4) {
    return this.rq((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtSet) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).yq = function (_this__u8e3s4, size) {
  };
  protoOf(LinkedHashSetSerializer).bq = function (_this__u8e3s4, size) {
    return this.yq(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(LinkedHashSetSerializer).zq = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.e(element);
  };
  protoOf(LinkedHashSetSerializer).dq = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE();
    return this.zq(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function HashMapSerializer(kSerializer, vSerializer) {
    MapLikeSerializer.call(this, kSerializer, vSerializer);
    this.cr_1 = new HashMapClassDesc(kSerializer.zj(), vSerializer.zj());
  }
  protoOf(HashMapSerializer).zj = function () {
    return this.cr_1;
  };
  protoOf(HashMapSerializer).dr = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(HashMapSerializer).er = function (_this__u8e3s4) {
    return this.dr((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).fr = function (_this__u8e3s4) {
    // Inline function 'kotlin.collections.iterator' call
    return _this__u8e3s4.b2().g();
  };
  protoOf(HashMapSerializer).gr = function (_this__u8e3s4) {
    return this.fr((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).tp = function () {
    return HashMap_init_$Create$();
  };
  protoOf(HashMapSerializer).hr = function (_this__u8e3s4) {
    return imul(_this__u8e3s4.j(), 2);
  };
  protoOf(HashMapSerializer).vp = function (_this__u8e3s4) {
    return this.hr(_this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).ir = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(HashMapSerializer).xp = function (_this__u8e3s4) {
    return this.ir(_this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).jr = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? HashMap_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(HashMapSerializer).zp = function (_this__u8e3s4) {
    return this.jr((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).kr = function (_this__u8e3s4, size) {
  };
  protoOf(HashMapSerializer).bq = function (_this__u8e3s4, size) {
    return this.kr(_this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : THROW_CCE(), size);
  };
  function LinkedHashMapSerializer(kSerializer, vSerializer) {
    MapLikeSerializer.call(this, kSerializer, vSerializer);
    this.rr_1 = new LinkedHashMapClassDesc(kSerializer.zj(), vSerializer.zj());
  }
  protoOf(LinkedHashMapSerializer).zj = function () {
    return this.rr_1;
  };
  protoOf(LinkedHashMapSerializer).dr = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(LinkedHashMapSerializer).er = function (_this__u8e3s4) {
    return this.dr((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).fr = function (_this__u8e3s4) {
    // Inline function 'kotlin.collections.iterator' call
    return _this__u8e3s4.b2().g();
  };
  protoOf(LinkedHashMapSerializer).gr = function (_this__u8e3s4) {
    return this.fr((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).tp = function () {
    return LinkedHashMap_init_$Create$();
  };
  protoOf(LinkedHashMapSerializer).sr = function (_this__u8e3s4) {
    return imul(_this__u8e3s4.j(), 2);
  };
  protoOf(LinkedHashMapSerializer).vp = function (_this__u8e3s4) {
    return this.sr(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).tr = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(LinkedHashMapSerializer).xp = function (_this__u8e3s4) {
    return this.tr(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).jr = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? LinkedHashMap_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(LinkedHashMapSerializer).zp = function (_this__u8e3s4) {
    return this.jr((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).ur = function (_this__u8e3s4, size) {
  };
  protoOf(LinkedHashMapSerializer).bq = function (_this__u8e3s4, size) {
    return this.ur(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE(), size);
  };
  function ReferenceArraySerializer(kClass, eSerializer) {
    CollectionLikeSerializer.call(this, eSerializer);
    this.wr_1 = kClass;
    this.xr_1 = new ArrayClassDesc(eSerializer.zj());
  }
  protoOf(ReferenceArraySerializer).zj = function () {
    return this.xr_1;
  };
  protoOf(ReferenceArraySerializer).yr = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(ReferenceArraySerializer).er = function (_this__u8e3s4) {
    return this.yr((!(_this__u8e3s4 == null) ? isArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).zr = function (_this__u8e3s4) {
    return arrayIterator(_this__u8e3s4);
  };
  protoOf(ReferenceArraySerializer).gr = function (_this__u8e3s4) {
    return this.zr((!(_this__u8e3s4 == null) ? isArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).tp = function () {
    // Inline function 'kotlin.collections.arrayListOf' call
    return ArrayList_init_$Create$_0();
  };
  protoOf(ReferenceArraySerializer).as = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(ReferenceArraySerializer).vp = function (_this__u8e3s4) {
    return this.as(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).bs = function (_this__u8e3s4) {
    return toNativeArrayImpl(_this__u8e3s4, this.wr_1);
  };
  protoOf(ReferenceArraySerializer).xp = function (_this__u8e3s4) {
    return this.bs(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).cs = function (_this__u8e3s4) {
    return ArrayList_init_$Create$_1(asList(_this__u8e3s4));
  };
  protoOf(ReferenceArraySerializer).zp = function (_this__u8e3s4) {
    return this.cs((!(_this__u8e3s4 == null) ? isArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).ds = function (_this__u8e3s4, size) {
    return _this__u8e3s4.e5(size);
  };
  protoOf(ReferenceArraySerializer).bq = function (_this__u8e3s4, size) {
    return this.ds(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(ReferenceArraySerializer).es = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.e2(index, element);
  };
  protoOf(ReferenceArraySerializer).dq = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE();
    return this.es(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function CollectionSerializer(element) {
    CollectionLikeSerializer.call(this, element);
  }
  protoOf(CollectionSerializer).fq = function (_this__u8e3s4) {
    return _this__u8e3s4.j();
  };
  protoOf(CollectionSerializer).er = function (_this__u8e3s4) {
    return this.fq((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Collection) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(CollectionSerializer).gq = function (_this__u8e3s4) {
    return _this__u8e3s4.g();
  };
  protoOf(CollectionSerializer).gr = function (_this__u8e3s4) {
    return this.gq((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Collection) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  function MapLikeSerializer(keySerializer, valueSerializer) {
    AbstractCollectionSerializer.call(this);
    this.lr_1 = keySerializer;
    this.mr_1 = valueSerializer;
  }
  protoOf(MapLikeSerializer).nr = function (decoder, builder, startIndex, size) {
    // Inline function 'kotlin.require' call
    if (!(size >= 0)) {
      var message = 'Size must be known in advance when using READ_ALL';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var progression = step(until(0, imul(size, 2)), 2);
    var inductionVariable = progression.t_1;
    var last = progression.u_1;
    var step_0 = progression.v_1;
    if (step_0 > 0 && inductionVariable <= last || (step_0 < 0 && last <= inductionVariable))
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + step_0 | 0;
        this.or(decoder, startIndex + index | 0, builder, false);
      }
       while (!(index === last));
  };
  protoOf(MapLikeSerializer).jq = function (decoder, builder, startIndex, size) {
    return this.nr(decoder, (!(builder == null) ? isInterface(builder, KtMutableMap) : false) ? builder : THROW_CCE(), startIndex, size);
  };
  protoOf(MapLikeSerializer).or = function (decoder, index, builder, checkIndex) {
    var key = decoder.jn(this.zj(), index, this.lr_1);
    var tmp;
    if (checkIndex) {
      // Inline function 'kotlin.also' call
      var this_0 = decoder.mn(this.zj());
      // Inline function 'kotlin.require' call
      if (!(this_0 === (index + 1 | 0))) {
        var message = 'Value must follow key in a map, index for key: ' + index + ', returned index for value: ' + this_0;
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
      tmp = this_0;
    } else {
      tmp = index + 1 | 0;
    }
    var vIndex = tmp;
    var tmp_0;
    var tmp_1;
    if (builder.w1(key)) {
      var tmp_2 = this.mr_1.zj().el();
      tmp_1 = !(tmp_2 instanceof PrimitiveKind);
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = decoder.in(this.zj(), vIndex, this.mr_1, getValue(builder, key));
    } else {
      tmp_0 = decoder.jn(this.zj(), vIndex, this.mr_1);
    }
    var value = tmp_0;
    // Inline function 'kotlin.collections.set' call
    builder.g2(key, value);
  };
  protoOf(MapLikeSerializer).kq = function (decoder, index, builder, checkIndex) {
    return this.or(decoder, index, (!(builder == null) ? isInterface(builder, KtMutableMap) : false) ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(MapLikeSerializer).iq = function (encoder, value) {
    var size = this.er(value);
    // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
    var descriptor = this.zj();
    var composite = encoder.oo(descriptor, size);
    var iterator = this.gr(value);
    var index = 0;
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = iterator;
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      // Inline function 'kotlin.collections.component1' call
      var k = element.u1();
      // Inline function 'kotlin.collections.component2' call
      var v = element.v1();
      var tmp = this.zj();
      var _unary__edvuaz = index;
      index = _unary__edvuaz + 1 | 0;
      composite.lo(tmp, _unary__edvuaz, this.lr_1, k);
      var tmp_0 = this.zj();
      var _unary__edvuaz_0 = index;
      index = _unary__edvuaz_0 + 1 | 0;
      composite.lo(tmp_0, _unary__edvuaz_0, this.mr_1, v);
    }
    composite.xm(descriptor);
  };
  protoOf(MapLikeSerializer).ak = function (encoder, value) {
    return this.iq(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  function CollectionLikeSerializer(elementSerializer) {
    AbstractCollectionSerializer.call(this);
    this.hq_1 = elementSerializer;
  }
  protoOf(CollectionLikeSerializer).iq = function (encoder, value) {
    var size = this.er(value);
    // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
    var descriptor = this.zj();
    var composite = encoder.oo(descriptor, size);
    var iterator = this.gr(value);
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        composite.lo(this.zj(), index, this.hq_1, iterator.i());
      }
       while (inductionVariable < size);
    composite.xm(descriptor);
  };
  protoOf(CollectionLikeSerializer).ak = function (encoder, value) {
    return this.iq(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(CollectionLikeSerializer).jq = function (decoder, builder, startIndex, size) {
    // Inline function 'kotlin.require' call
    if (!(size >= 0)) {
      var message = 'Size must be known in advance when using READ_ALL';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        this.kq(decoder, startIndex + index | 0, builder, false);
      }
       while (inductionVariable < size);
  };
  protoOf(CollectionLikeSerializer).kq = function (decoder, index, builder, checkIndex) {
    this.dq(builder, index, decoder.jn(this.zj(), index, this.hq_1));
  };
  function readSize($this, decoder, builder) {
    var size = decoder.nn($this.zj());
    $this.bq(builder, size);
    return size;
  }
  function AbstractCollectionSerializer() {
  }
  protoOf(AbstractCollectionSerializer).mq = function (decoder, previous) {
    var tmp1_elvis_lhs = previous == null ? null : this.zp(previous);
    var builder = tmp1_elvis_lhs == null ? this.tp() : tmp1_elvis_lhs;
    var startIndex = this.vp(builder);
    var compositeDecoder = decoder.wm(this.zj());
    if (compositeDecoder.ln()) {
      this.jq(compositeDecoder, builder, startIndex, readSize(this, compositeDecoder, builder));
    } else {
      $l$loop: while (true) {
        var index = compositeDecoder.mn(this.zj());
        if (index === -1)
          break $l$loop;
        this.lq(compositeDecoder, startIndex + index | 0, builder);
      }
    }
    compositeDecoder.xm(this.zj());
    return this.xp(builder);
  };
  protoOf(AbstractCollectionSerializer).bk = function (decoder) {
    return this.mq(decoder, null);
  };
  protoOf(AbstractCollectionSerializer).lq = function (decoder, index, builder, checkIndex, $super) {
    checkIndex = checkIndex === VOID ? true : checkIndex;
    var tmp;
    if ($super === VOID) {
      this.kq(decoder, index, builder, checkIndex);
      tmp = Unit_instance;
    } else {
      tmp = $super.kq.call(this, decoder, index, builder, checkIndex);
    }
    return tmp;
  };
  function PrimitiveArraySerializer(primitiveSerializer) {
    CollectionLikeSerializer.call(this, primitiveSerializer);
    this.gs_1 = new PrimitiveArrayDescriptor(primitiveSerializer.zj());
  }
  protoOf(PrimitiveArraySerializer).zj = function () {
    return this.gs_1;
  };
  protoOf(PrimitiveArraySerializer).hs = function (_this__u8e3s4) {
    return _this__u8e3s4.is();
  };
  protoOf(PrimitiveArraySerializer).vp = function (_this__u8e3s4) {
    return this.hs(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).js = function (_this__u8e3s4) {
    return _this__u8e3s4.ks();
  };
  protoOf(PrimitiveArraySerializer).xp = function (_this__u8e3s4) {
    return this.js(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).ls = function (_this__u8e3s4, size) {
    return _this__u8e3s4.ms(size);
  };
  protoOf(PrimitiveArraySerializer).bq = function (_this__u8e3s4, size) {
    return this.ls(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(PrimitiveArraySerializer).ns = function (_this__u8e3s4) {
    var message = 'This method lead to boxing and must not be used, use writeContents instead';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(PrimitiveArraySerializer).gr = function (_this__u8e3s4) {
    return this.ns((_this__u8e3s4 == null ? true : !(_this__u8e3s4 == null)) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).os = function (_this__u8e3s4, index, element) {
    var message = 'This method lead to boxing and must not be used, use Builder.append instead';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(PrimitiveArraySerializer).dq = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE();
    return this.os(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).tp = function () {
    return this.zp(this.ps());
  };
  protoOf(PrimitiveArraySerializer).ss = function (encoder, value) {
    var size = this.er(value);
    // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
    var descriptor = this.gs_1;
    var composite = encoder.oo(descriptor, size);
    this.rs(composite, value, size);
    composite.xm(descriptor);
  };
  protoOf(PrimitiveArraySerializer).ak = function (encoder, value) {
    return this.ss(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).iq = function (encoder, value) {
    return this.ss(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).bk = function (decoder) {
    return this.mq(decoder, null);
  };
  function PrimitiveArrayBuilder() {
  }
  protoOf(PrimitiveArrayBuilder).ts = function (requiredCapacity, $super) {
    requiredCapacity = requiredCapacity === VOID ? this.is() + 1 | 0 : requiredCapacity;
    var tmp;
    if ($super === VOID) {
      this.ms(requiredCapacity);
      tmp = Unit_instance;
    } else {
      tmp = $super.ms.call(this, requiredCapacity);
    }
    return tmp;
  };
  function Companion() {
    Companion_instance_0 = this;
    this.us_1 = longArray(0);
  }
  var Companion_instance_0;
  function Companion_getInstance_8() {
    if (Companion_instance_0 == null)
      new Companion();
    return Companion_instance_0;
  }
  function prepareHighMarksArray($this, elementsCount) {
    var slotsCount = (elementsCount - 1 | 0) >>> 6 | 0;
    var elementsInLastSlot = elementsCount & 63;
    var highMarks = longArray(slotsCount);
    if (!(elementsInLastSlot === 0)) {
      highMarks[get_lastIndex(highMarks)] = (new Long(-1, -1)).z2(elementsCount);
    }
    return highMarks;
  }
  function markHigh($this, index) {
    var slot = (index >>> 6 | 0) - 1 | 0;
    var offsetInSlot = index & 63;
    $this.ys_1[slot] = $this.ys_1[slot].d3((new Long(1, 0)).z2(offsetInSlot));
  }
  function nextUnmarkedHighIndex($this) {
    var inductionVariable = 0;
    var last = $this.ys_1.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var slot = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var slotOffset = imul(slot + 1 | 0, 64);
        var slotMarks = $this.ys_1[slot];
        while (!slotMarks.equals(new Long(-1, -1))) {
          var indexInSlot = countTrailingZeroBits(slotMarks.x2());
          slotMarks = slotMarks.d3((new Long(1, 0)).z2(indexInSlot));
          var index = slotOffset + indexInSlot | 0;
          if ($this.ws_1($this.vs_1, index)) {
            $this.ys_1[slot] = slotMarks;
            return index;
          }
        }
        $this.ys_1[slot] = slotMarks;
      }
       while (inductionVariable <= last);
    return -1;
  }
  function ElementMarker(descriptor, readIfAbsent) {
    Companion_getInstance_8();
    this.vs_1 = descriptor;
    this.ws_1 = readIfAbsent;
    var elementsCount = this.vs_1.gl();
    if (elementsCount <= 64) {
      var tmp = this;
      var tmp_0;
      if (elementsCount === 64) {
        tmp_0 = new Long(0, 0);
      } else {
        tmp_0 = (new Long(-1, -1)).z2(elementsCount);
      }
      tmp.xs_1 = tmp_0;
      this.ys_1 = Companion_getInstance_8().us_1;
    } else {
      this.xs_1 = new Long(0, 0);
      this.ys_1 = prepareHighMarksArray(this, elementsCount);
    }
  }
  protoOf(ElementMarker).zs = function (index) {
    if (index < 64) {
      this.xs_1 = this.xs_1.d3((new Long(1, 0)).z2(index));
    } else {
      markHigh(this, index);
    }
  };
  protoOf(ElementMarker).at = function () {
    var elementsCount = this.vs_1.gl();
    while (!this.xs_1.equals(new Long(-1, -1))) {
      var index = countTrailingZeroBits(this.xs_1.x2());
      this.xs_1 = this.xs_1.d3((new Long(1, 0)).z2(index));
      if (this.ws_1(this.vs_1, index)) {
        return index;
      }
    }
    if (elementsCount > 64) {
      return nextUnmarkedHighIndex(this);
    }
    return -1;
  };
  function InlinePrimitiveDescriptor(name, primitiveSerializer) {
    return new InlineClassDescriptor(name, new InlinePrimitiveDescriptor$1(primitiveSerializer));
  }
  function InlineClassDescriptor(name, generatedSerializer) {
    PluginGeneratedSerialDescriptor.call(this, name, generatedSerializer, 1);
    this.nt_1 = true;
  }
  protoOf(InlineClassDescriptor).fl = function () {
    return this.nt_1;
  };
  protoOf(InlineClassDescriptor).hashCode = function () {
    return imul(protoOf(PluginGeneratedSerialDescriptor).hashCode.call(this), 31);
  };
  protoOf(InlineClassDescriptor).equals = function (other) {
    var tmp$ret$0;
    $l$block_5: {
      // Inline function 'kotlinx.serialization.internal.equalsImpl' call
      if (this === other) {
        tmp$ret$0 = true;
        break $l$block_5;
      }
      if (!(other instanceof InlineClassDescriptor)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.dl() === other.dl())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(other.nt_1 && contentEquals(this.au(), other.au()))) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.gl() === other.gl())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.gl();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.ll(index).dl() === other.ll(index).dl())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.ll(index).el(), other.ll(index).el())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
        }
         while (inductionVariable < last);
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  };
  function InlinePrimitiveDescriptor$1($primitiveSerializer) {
    this.bu_1 = $primitiveSerializer;
  }
  protoOf(InlinePrimitiveDescriptor$1).cu = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [this.bu_1];
  };
  protoOf(InlinePrimitiveDescriptor$1).zj = function () {
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(InlinePrimitiveDescriptor$1).ak = function (encoder, value) {
    // Inline function 'kotlin.error' call
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(InlinePrimitiveDescriptor$1).bk = function (decoder) {
    // Inline function 'kotlin.error' call
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  function jsonCachedSerialNames(_this__u8e3s4) {
    return cachedSerialNames(_this__u8e3s4);
  }
  function NoOpEncoder() {
    NoOpEncoder_instance = this;
    AbstractEncoder.call(this);
    this.eu_1 = EmptySerializersModule_0();
  }
  protoOf(NoOpEncoder).kn = function () {
    return this.eu_1;
  };
  protoOf(NoOpEncoder).pn = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).qn = function () {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).rn = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).sn = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).tn = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).un = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).vn = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).wn = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).xn = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).yn = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).zn = function (value) {
    return Unit_instance;
  };
  var NoOpEncoder_instance;
  function NoOpEncoder_getInstance() {
    if (NoOpEncoder_instance == null)
      new NoOpEncoder();
    return NoOpEncoder_instance;
  }
  function error($this) {
    throw IllegalStateException_init_$Create$('Descriptor for type `kotlin.Nothing` does not have elements');
  }
  function NothingSerialDescriptor() {
    NothingSerialDescriptor_instance = this;
    this.fu_1 = OBJECT_getInstance();
    this.gu_1 = 'kotlin.Nothing';
  }
  protoOf(NothingSerialDescriptor).el = function () {
    return this.fu_1;
  };
  protoOf(NothingSerialDescriptor).dl = function () {
    return this.gu_1;
  };
  protoOf(NothingSerialDescriptor).gl = function () {
    return 0;
  };
  protoOf(NothingSerialDescriptor).il = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).jl = function (name) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).ml = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).ll = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).kl = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).toString = function () {
    return 'NothingSerialDescriptor';
  };
  protoOf(NothingSerialDescriptor).equals = function (other) {
    return this === other;
  };
  protoOf(NothingSerialDescriptor).hashCode = function () {
    return getStringHashCode(this.gu_1) + imul(31, this.fu_1.hashCode()) | 0;
  };
  var NothingSerialDescriptor_instance;
  function NothingSerialDescriptor_getInstance() {
    if (NothingSerialDescriptor_instance == null)
      new NothingSerialDescriptor();
    return NothingSerialDescriptor_instance;
  }
  function NullableSerializer(serializer) {
    this.hu_1 = serializer;
    this.iu_1 = new SerialDescriptorForNullable(this.hu_1.zj());
  }
  protoOf(NullableSerializer).zj = function () {
    return this.iu_1;
  };
  protoOf(NullableSerializer).ju = function (encoder, value) {
    if (!(value == null)) {
      encoder.no();
      encoder.mo(this.hu_1, value);
    } else {
      encoder.qn();
    }
  };
  protoOf(NullableSerializer).ak = function (encoder, value) {
    return this.ju(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(NullableSerializer).bk = function (decoder) {
    return decoder.im() ? decoder.vm(this.hu_1) : decoder.jm();
  };
  protoOf(NullableSerializer).equals = function (other) {
    if (this === other)
      return true;
    if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
      return false;
    if (!(other instanceof NullableSerializer))
      THROW_CCE();
    if (!equals(this.hu_1, other.hu_1))
      return false;
    return true;
  };
  protoOf(NullableSerializer).hashCode = function () {
    return hashCode(this.hu_1);
  };
  function SerialDescriptorForNullable(original) {
    this.nl_1 = original;
    this.ol_1 = this.nl_1.dl() + '?';
    this.pl_1 = cachedSerialNames(this.nl_1);
  }
  protoOf(SerialDescriptorForNullable).dl = function () {
    return this.ol_1;
  };
  protoOf(SerialDescriptorForNullable).gm = function () {
    return this.pl_1;
  };
  protoOf(SerialDescriptorForNullable).zk = function () {
    return true;
  };
  protoOf(SerialDescriptorForNullable).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SerialDescriptorForNullable))
      return false;
    if (!equals(this.nl_1, other.nl_1))
      return false;
    return true;
  };
  protoOf(SerialDescriptorForNullable).toString = function () {
    return toString(this.nl_1) + '?';
  };
  protoOf(SerialDescriptorForNullable).hashCode = function () {
    return imul(hashCode(this.nl_1), 31);
  };
  protoOf(SerialDescriptorForNullable).el = function () {
    return this.nl_1.el();
  };
  protoOf(SerialDescriptorForNullable).fl = function () {
    return this.nl_1.fl();
  };
  protoOf(SerialDescriptorForNullable).gl = function () {
    return this.nl_1.gl();
  };
  protoOf(SerialDescriptorForNullable).hl = function () {
    return this.nl_1.hl();
  };
  protoOf(SerialDescriptorForNullable).il = function (index) {
    return this.nl_1.il(index);
  };
  protoOf(SerialDescriptorForNullable).jl = function (name) {
    return this.nl_1.jl(name);
  };
  protoOf(SerialDescriptorForNullable).kl = function (index) {
    return this.nl_1.kl(index);
  };
  protoOf(SerialDescriptorForNullable).ll = function (index) {
    return this.nl_1.ll(index);
  };
  protoOf(SerialDescriptorForNullable).ml = function (index) {
    return this.nl_1.ml(index);
  };
  function ObjectSerializer$descriptor$delegate$lambda$lambda(this$0) {
    return function ($this$buildSerialDescriptor) {
      $this$buildSerialDescriptor.ek_1 = this$0.lu_1;
      return Unit_instance;
    };
  }
  function ObjectSerializer$descriptor$delegate$lambda($serialName, this$0) {
    return function () {
      var tmp = OBJECT_getInstance();
      return buildSerialDescriptor($serialName, tmp, [], ObjectSerializer$descriptor$delegate$lambda$lambda(this$0));
    };
  }
  function ObjectSerializer$_get_descriptor_$ref_7z4xb6() {
    return function (p0) {
      return p0.zj();
    };
  }
  function ObjectSerializer(serialName, objectInstance) {
    this.ku_1 = objectInstance;
    this.lu_1 = emptyList();
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.mu_1 = lazy(tmp_0, ObjectSerializer$descriptor$delegate$lambda(serialName, this));
  }
  protoOf(ObjectSerializer).zj = function () {
    var tmp0 = this.mu_1;
    var tmp = KProperty1;
    // Inline function 'kotlin.getValue' call
    getPropertyCallableRef('descriptor', 1, tmp, ObjectSerializer$_get_descriptor_$ref_7z4xb6(), null);
    return tmp0.v1();
  };
  protoOf(ObjectSerializer).pk = function (encoder, value) {
    encoder.wm(this.zj()).xm(this.zj());
  };
  protoOf(ObjectSerializer).ak = function (encoder, value) {
    return this.pk(encoder, !(value == null) ? value : THROW_CCE());
  };
  protoOf(ObjectSerializer).bk = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.zj();
    var composite = decoder.wm(descriptor);
    var tmp$ret$0;
    $l$block_0: {
      if (composite.ln()) {
        tmp$ret$0 = Unit_instance;
        break $l$block_0;
      }
      var index = composite.mn(this.zj());
      if (index === -1) {
        tmp$ret$0 = Unit_instance;
        break $l$block_0;
      } else
        throw SerializationException_init_$Create$_0('Unexpected index ' + index);
    }
    var result = tmp$ret$0;
    composite.xm(descriptor);
    return this.ku_1;
  };
  function get_EMPTY_DESCRIPTOR_ARRAY() {
    _init_properties_Platform_common_kt__3qzecs();
    return EMPTY_DESCRIPTOR_ARRAY;
  }
  var EMPTY_DESCRIPTOR_ARRAY;
  function cachedSerialNames(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    if (isInterface(_this__u8e3s4, CachedNames))
      return _this__u8e3s4.gm();
    var result = HashSet_init_$Create$_1(_this__u8e3s4.gl());
    var inductionVariable = 0;
    var last = _this__u8e3s4.gl();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.plusAssign' call
        var element = _this__u8e3s4.il(i);
        result.e(element);
      }
       while (inductionVariable < last);
    return result;
  }
  function kclass(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    var t = _this__u8e3s4.y9();
    var tmp;
    if (!(t == null) ? isInterface(t, KClass) : false) {
      tmp = t;
    } else {
      if (!(t == null) ? isInterface(t, KTypeParameter) : false) {
        throw IllegalArgumentException_init_$Create$('Captured type parameter ' + toString(t) + ' from generic non-reified function. ' + ('Such functionality cannot be supported because ' + toString(t) + ' is erased, either specify serializer explicitly or make ') + ('calling function inline with reified ' + toString(t) + '.'));
      } else {
        throw IllegalArgumentException_init_$Create$('Only KClass supported as classifier, got ' + toString_0(t));
      }
    }
    var tmp_0 = tmp;
    return isInterface(tmp_0, KClass) ? tmp_0 : THROW_CCE();
  }
  function typeOrThrow(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    var tmp0 = _this__u8e3s4.ou_1;
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.requireNotNull' call
      if (tmp0 == null) {
        var message = 'Star projections in type arguments are not allowed, but had ' + toString_0(_this__u8e3s4.ou_1);
        throw IllegalArgumentException_init_$Create$(toString(message));
      } else {
        tmp$ret$1 = tmp0;
        break $l$block;
      }
    }
    return tmp$ret$1;
  }
  function notRegisteredMessage(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    var tmp0_elvis_lhs = _this__u8e3s4.m9();
    return notRegisteredMessage_0(tmp0_elvis_lhs == null ? '<local class name not available>' : tmp0_elvis_lhs);
  }
  function compactArray(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    // Inline function 'kotlin.takeUnless' call
    var tmp;
    // Inline function 'kotlin.collections.isNullOrEmpty' call
    if (!(_this__u8e3s4 == null || _this__u8e3s4.p())) {
      tmp = _this__u8e3s4;
    } else {
      tmp = null;
    }
    var tmp0_safe_receiver = tmp;
    var tmp_0;
    if (tmp0_safe_receiver == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlin.collections.toTypedArray' call
      tmp_0 = copyToArray(tmp0_safe_receiver);
    }
    var tmp1_elvis_lhs = tmp_0;
    return tmp1_elvis_lhs == null ? get_EMPTY_DESCRIPTOR_ARRAY() : tmp1_elvis_lhs;
  }
  function notRegisteredMessage_0(className) {
    _init_properties_Platform_common_kt__3qzecs();
    return "Serializer for class '" + className + "' is not found.\n" + "Please ensure that class is marked as '@Serializable' and that the serialization compiler plugin is applied.\n";
  }
  var properties_initialized_Platform_common_kt_i7q4ty;
  function _init_properties_Platform_common_kt__3qzecs() {
    if (!properties_initialized_Platform_common_kt_i7q4ty) {
      properties_initialized_Platform_common_kt_i7q4ty = true;
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      EMPTY_DESCRIPTOR_ARRAY = [];
    }
  }
  function hashCodeImpl(_this__u8e3s4, typeParams) {
    var result = getStringHashCode(_this__u8e3s4.dl());
    result = imul(31, result) + contentHashCode(typeParams) | 0;
    var elementDescriptors = get_elementDescriptors(_this__u8e3s4);
    // Inline function 'kotlinx.serialization.internal.elementsHashCodeBy' call
    // Inline function 'kotlin.collections.fold' call
    var accumulator = 1;
    var _iterator__ex2g4s = elementDescriptors.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      var hash = accumulator;
      var tmp = imul(31, hash);
      // Inline function 'kotlin.hashCode' call
      var tmp0_safe_receiver = element.dl();
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
      accumulator = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
    }
    var namesHash = accumulator;
    // Inline function 'kotlinx.serialization.internal.elementsHashCodeBy' call
    // Inline function 'kotlin.collections.fold' call
    var accumulator_0 = 1;
    var _iterator__ex2g4s_0 = elementDescriptors.g();
    while (_iterator__ex2g4s_0.h()) {
      var element_0 = _iterator__ex2g4s_0.i();
      var hash_0 = accumulator_0;
      var tmp_0 = imul(31, hash_0);
      // Inline function 'kotlin.hashCode' call
      var tmp0_safe_receiver_0 = element_0.el();
      var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode(tmp0_safe_receiver_0);
      accumulator_0 = tmp_0 + (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0) | 0;
    }
    var kindHash = accumulator_0;
    result = imul(31, result) + namesHash | 0;
    result = imul(31, result) + kindHash | 0;
    return result;
  }
  function toStringImpl(_this__u8e3s4) {
    var tmp = until(0, _this__u8e3s4.gl());
    var tmp_0 = _this__u8e3s4.dl() + '(';
    return joinToString(tmp, ', ', tmp_0, ')', VOID, VOID, toStringImpl$lambda(_this__u8e3s4));
  }
  function _get_childSerializers__7vnyfa($this) {
    var tmp0 = $this.xt_1;
    var tmp = KProperty1;
    // Inline function 'kotlin.getValue' call
    getPropertyCallableRef('childSerializers', 1, tmp, PluginGeneratedSerialDescriptor$_get_childSerializers_$ref_e7suca(), null);
    return tmp0.v1();
  }
  function _get__hashCode__tgwhef_0($this) {
    var tmp0 = $this.zt_1;
    var tmp = KProperty1;
    // Inline function 'kotlin.getValue' call
    getPropertyCallableRef('_hashCode', 1, tmp, PluginGeneratedSerialDescriptor$_get__hashCode_$ref_cmj4vz(), null);
    return tmp0.v1();
  }
  function PluginGeneratedSerialDescriptor$childSerializers$delegate$lambda(this$0) {
    return function () {
      var tmp0_safe_receiver = this$0.pt_1;
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.cu();
      return tmp1_elvis_lhs == null ? get_EMPTY_SERIALIZER_ARRAY() : tmp1_elvis_lhs;
    };
  }
  function PluginGeneratedSerialDescriptor$_get_childSerializers_$ref_e7suca() {
    return function (p0) {
      return _get_childSerializers__7vnyfa(p0);
    };
  }
  function PluginGeneratedSerialDescriptor$typeParameterDescriptors$delegate$lambda(this$0) {
    return function () {
      var tmp0_safe_receiver = this$0.pt_1;
      var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.du();
      var tmp;
      if (tmp1_safe_receiver == null) {
        tmp = null;
      } else {
        // Inline function 'kotlin.collections.map' call
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList_init_$Create$(tmp1_safe_receiver.length);
        var inductionVariable = 0;
        var last = tmp1_safe_receiver.length;
        while (inductionVariable < last) {
          var item = tmp1_safe_receiver[inductionVariable];
          inductionVariable = inductionVariable + 1 | 0;
          var tmp$ret$0 = item.zj();
          destination.e(tmp$ret$0);
        }
        tmp = destination;
      }
      return compactArray(tmp);
    };
  }
  function PluginGeneratedSerialDescriptor$_get_typeParameterDescriptors_$ref_jk3pka() {
    return function (p0) {
      return p0.au();
    };
  }
  function PluginGeneratedSerialDescriptor$_hashCode$delegate$lambda(this$0) {
    return function () {
      return hashCodeImpl(this$0, this$0.au());
    };
  }
  function PluginGeneratedSerialDescriptor$_get__hashCode_$ref_cmj4vz() {
    return function (p0) {
      return _get__hashCode__tgwhef_0(p0);
    };
  }
  function PluginGeneratedSerialDescriptor(serialName, generatedSerializer, elementsCount) {
    generatedSerializer = generatedSerializer === VOID ? null : generatedSerializer;
    this.ot_1 = serialName;
    this.pt_1 = generatedSerializer;
    this.qt_1 = elementsCount;
    this.rt_1 = -1;
    var tmp = this;
    var tmp_0 = 0;
    var tmp_1 = this.qt_1;
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_2 = Array(tmp_1);
    while (tmp_0 < tmp_1) {
      tmp_2[tmp_0] = '[UNINITIALIZED]';
      tmp_0 = tmp_0 + 1 | 0;
    }
    tmp.st_1 = tmp_2;
    var tmp_3 = this;
    // Inline function 'kotlin.arrayOfNulls' call
    var size = this.qt_1;
    tmp_3.tt_1 = Array(size);
    this.ut_1 = null;
    this.vt_1 = booleanArray(this.qt_1);
    this.wt_1 = emptyMap();
    var tmp_4 = this;
    var tmp_5 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_4.xt_1 = lazy(tmp_5, PluginGeneratedSerialDescriptor$childSerializers$delegate$lambda(this));
    var tmp_6 = this;
    var tmp_7 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_6.yt_1 = lazy(tmp_7, PluginGeneratedSerialDescriptor$typeParameterDescriptors$delegate$lambda(this));
    var tmp_8 = this;
    var tmp_9 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_8.zt_1 = lazy(tmp_9, PluginGeneratedSerialDescriptor$_hashCode$delegate$lambda(this));
  }
  protoOf(PluginGeneratedSerialDescriptor).dl = function () {
    return this.ot_1;
  };
  protoOf(PluginGeneratedSerialDescriptor).gl = function () {
    return this.qt_1;
  };
  protoOf(PluginGeneratedSerialDescriptor).el = function () {
    return CLASS_getInstance();
  };
  protoOf(PluginGeneratedSerialDescriptor).hl = function () {
    var tmp0_elvis_lhs = this.ut_1;
    return tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
  };
  protoOf(PluginGeneratedSerialDescriptor).gm = function () {
    return this.wt_1.z1();
  };
  protoOf(PluginGeneratedSerialDescriptor).au = function () {
    var tmp0 = this.yt_1;
    var tmp = KProperty1;
    // Inline function 'kotlin.getValue' call
    getPropertyCallableRef('typeParameterDescriptors', 1, tmp, PluginGeneratedSerialDescriptor$_get_typeParameterDescriptors_$ref_jk3pka(), null);
    return tmp0.v1();
  };
  protoOf(PluginGeneratedSerialDescriptor).ll = function (index) {
    return getChecked(_get_childSerializers__7vnyfa(this), index).zj();
  };
  protoOf(PluginGeneratedSerialDescriptor).ml = function (index) {
    return getChecked_0(this.vt_1, index);
  };
  protoOf(PluginGeneratedSerialDescriptor).kl = function (index) {
    var tmp0_elvis_lhs = getChecked(this.tt_1, index);
    return tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
  };
  protoOf(PluginGeneratedSerialDescriptor).il = function (index) {
    return getChecked(this.st_1, index);
  };
  protoOf(PluginGeneratedSerialDescriptor).jl = function (name) {
    var tmp0_elvis_lhs = this.wt_1.y1(name);
    return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
  };
  protoOf(PluginGeneratedSerialDescriptor).equals = function (other) {
    var tmp$ret$0;
    $l$block_5: {
      // Inline function 'kotlinx.serialization.internal.equalsImpl' call
      if (this === other) {
        tmp$ret$0 = true;
        break $l$block_5;
      }
      if (!(other instanceof PluginGeneratedSerialDescriptor)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.dl() === other.dl())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!contentEquals(this.au(), other.au())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.gl() === other.gl())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.gl();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.ll(index).dl() === other.ll(index).dl())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.ll(index).el(), other.ll(index).el())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
        }
         while (inductionVariable < last);
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  };
  protoOf(PluginGeneratedSerialDescriptor).hashCode = function () {
    return _get__hashCode__tgwhef_0(this);
  };
  protoOf(PluginGeneratedSerialDescriptor).toString = function () {
    return toStringImpl(this);
  };
  function toStringImpl$lambda($this_toStringImpl) {
    return function (i) {
      return $this_toStringImpl.il(i) + ': ' + $this_toStringImpl.ll(i).dl();
    };
  }
  function get_EMPTY_SERIALIZER_ARRAY() {
    _init_properties_PluginHelperInterfaces_kt__xgvzfp();
    return EMPTY_SERIALIZER_ARRAY;
  }
  var EMPTY_SERIALIZER_ARRAY;
  function SerializerFactory() {
  }
  function GeneratedSerializer() {
  }
  var properties_initialized_PluginHelperInterfaces_kt_ap8in1;
  function _init_properties_PluginHelperInterfaces_kt__xgvzfp() {
    if (!properties_initialized_PluginHelperInterfaces_kt_ap8in1) {
      properties_initialized_PluginHelperInterfaces_kt_ap8in1 = true;
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      EMPTY_SERIALIZER_ARRAY = [];
    }
  }
  function CharArraySerializer_0() {
    CharArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_1(Companion_getInstance_2()));
  }
  protoOf(CharArraySerializer_0).su = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(CharArraySerializer_0).er = function (_this__u8e3s4) {
    return this.su((!(_this__u8e3s4 == null) ? isCharArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(CharArraySerializer_0).tu = function (_this__u8e3s4) {
    return new CharArrayBuilder(_this__u8e3s4);
  };
  protoOf(CharArraySerializer_0).zp = function (_this__u8e3s4) {
    return this.tu((!(_this__u8e3s4 == null) ? isCharArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(CharArraySerializer_0).ps = function () {
    return charArray(0);
  };
  protoOf(CharArraySerializer_0).uu = function (decoder, index, builder, checkIndex) {
    builder.xu(decoder.fn(this.gs_1, index));
  };
  protoOf(CharArraySerializer_0).kq = function (decoder, index, builder, checkIndex) {
    return this.uu(decoder, index, builder instanceof CharArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(CharArraySerializer_0).qs = function (decoder, index, builder, checkIndex) {
    return this.uu(decoder, index, builder instanceof CharArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(CharArraySerializer_0).yu = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.io(this.gs_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(CharArraySerializer_0).rs = function (encoder, content, size) {
    return this.yu(encoder, (!(content == null) ? isCharArray(content) : false) ? content : THROW_CCE(), size);
  };
  var CharArraySerializer_instance;
  function CharArraySerializer_getInstance() {
    if (CharArraySerializer_instance == null)
      new CharArraySerializer_0();
    return CharArraySerializer_instance;
  }
  function DoubleArraySerializer_0() {
    DoubleArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_2(DoubleCompanionObject_instance));
  }
  protoOf(DoubleArraySerializer_0).bv = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(DoubleArraySerializer_0).er = function (_this__u8e3s4) {
    return this.bv((!(_this__u8e3s4 == null) ? isDoubleArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(DoubleArraySerializer_0).cv = function (_this__u8e3s4) {
    return new DoubleArrayBuilder(_this__u8e3s4);
  };
  protoOf(DoubleArraySerializer_0).zp = function (_this__u8e3s4) {
    return this.cv((!(_this__u8e3s4 == null) ? isDoubleArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(DoubleArraySerializer_0).ps = function () {
    return new Float64Array(0);
  };
  protoOf(DoubleArraySerializer_0).dv = function (decoder, index, builder, checkIndex) {
    builder.gv(decoder.en(this.gs_1, index));
  };
  protoOf(DoubleArraySerializer_0).kq = function (decoder, index, builder, checkIndex) {
    return this.dv(decoder, index, builder instanceof DoubleArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(DoubleArraySerializer_0).qs = function (decoder, index, builder, checkIndex) {
    return this.dv(decoder, index, builder instanceof DoubleArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(DoubleArraySerializer_0).hv = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.ho(this.gs_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(DoubleArraySerializer_0).rs = function (encoder, content, size) {
    return this.hv(encoder, (!(content == null) ? isDoubleArray(content) : false) ? content : THROW_CCE(), size);
  };
  var DoubleArraySerializer_instance;
  function DoubleArraySerializer_getInstance() {
    if (DoubleArraySerializer_instance == null)
      new DoubleArraySerializer_0();
    return DoubleArraySerializer_instance;
  }
  function FloatArraySerializer_0() {
    FloatArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_3(FloatCompanionObject_instance));
  }
  protoOf(FloatArraySerializer_0).kv = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(FloatArraySerializer_0).er = function (_this__u8e3s4) {
    return this.kv((!(_this__u8e3s4 == null) ? isFloatArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(FloatArraySerializer_0).lv = function (_this__u8e3s4) {
    return new FloatArrayBuilder(_this__u8e3s4);
  };
  protoOf(FloatArraySerializer_0).zp = function (_this__u8e3s4) {
    return this.lv((!(_this__u8e3s4 == null) ? isFloatArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(FloatArraySerializer_0).ps = function () {
    return new Float32Array(0);
  };
  protoOf(FloatArraySerializer_0).mv = function (decoder, index, builder, checkIndex) {
    builder.pv(decoder.dn(this.gs_1, index));
  };
  protoOf(FloatArraySerializer_0).kq = function (decoder, index, builder, checkIndex) {
    return this.mv(decoder, index, builder instanceof FloatArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(FloatArraySerializer_0).qs = function (decoder, index, builder, checkIndex) {
    return this.mv(decoder, index, builder instanceof FloatArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(FloatArraySerializer_0).qv = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.go(this.gs_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(FloatArraySerializer_0).rs = function (encoder, content, size) {
    return this.qv(encoder, (!(content == null) ? isFloatArray(content) : false) ? content : THROW_CCE(), size);
  };
  var FloatArraySerializer_instance;
  function FloatArraySerializer_getInstance() {
    if (FloatArraySerializer_instance == null)
      new FloatArraySerializer_0();
    return FloatArraySerializer_instance;
  }
  function LongArraySerializer_0() {
    LongArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_4(Companion_getInstance_3()));
  }
  protoOf(LongArraySerializer_0).tv = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(LongArraySerializer_0).er = function (_this__u8e3s4) {
    return this.tv((!(_this__u8e3s4 == null) ? isLongArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LongArraySerializer_0).uv = function (_this__u8e3s4) {
    return new LongArrayBuilder(_this__u8e3s4);
  };
  protoOf(LongArraySerializer_0).zp = function (_this__u8e3s4) {
    return this.uv((!(_this__u8e3s4 == null) ? isLongArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LongArraySerializer_0).ps = function () {
    return longArray(0);
  };
  protoOf(LongArraySerializer_0).vv = function (decoder, index, builder, checkIndex) {
    builder.yv(decoder.cn(this.gs_1, index));
  };
  protoOf(LongArraySerializer_0).kq = function (decoder, index, builder, checkIndex) {
    return this.vv(decoder, index, builder instanceof LongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(LongArraySerializer_0).qs = function (decoder, index, builder, checkIndex) {
    return this.vv(decoder, index, builder instanceof LongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(LongArraySerializer_0).zv = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.fo(this.gs_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(LongArraySerializer_0).rs = function (encoder, content, size) {
    return this.zv(encoder, (!(content == null) ? isLongArray(content) : false) ? content : THROW_CCE(), size);
  };
  var LongArraySerializer_instance;
  function LongArraySerializer_getInstance() {
    if (LongArraySerializer_instance == null)
      new LongArraySerializer_0();
    return LongArraySerializer_instance;
  }
  function ULongArraySerializer_0() {
    ULongArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_5(Companion_getInstance_4()));
  }
  protoOf(ULongArraySerializer_0).cw = function (_this__u8e3s4) {
    return _ULongArray___get_size__impl__ju6dtr(_this__u8e3s4);
  };
  protoOf(ULongArraySerializer_0).er = function (_this__u8e3s4) {
    return this.cw(_this__u8e3s4 instanceof ULongArray ? _this__u8e3s4.oj_1 : THROW_CCE());
  };
  protoOf(ULongArraySerializer_0).dw = function (_this__u8e3s4) {
    return new ULongArrayBuilder(_this__u8e3s4);
  };
  protoOf(ULongArraySerializer_0).zp = function (_this__u8e3s4) {
    return this.dw(_this__u8e3s4 instanceof ULongArray ? _this__u8e3s4.oj_1 : THROW_CCE());
  };
  protoOf(ULongArraySerializer_0).ew = function () {
    return _ULongArray___init__impl__twm1l3(0);
  };
  protoOf(ULongArraySerializer_0).ps = function () {
    return new ULongArray(this.ew());
  };
  protoOf(ULongArraySerializer_0).fw = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toULong' call
    var this_0 = decoder.hn(this.gs_1, index).om();
    var tmp$ret$0 = _ULong___init__impl__c78o9k(this_0);
    builder.iw(tmp$ret$0);
  };
  protoOf(ULongArraySerializer_0).kq = function (decoder, index, builder, checkIndex) {
    return this.fw(decoder, index, builder instanceof ULongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ULongArraySerializer_0).qs = function (decoder, index, builder, checkIndex) {
    return this.fw(decoder, index, builder instanceof ULongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ULongArraySerializer_0).jw = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.ko(this.gs_1, i);
        // Inline function 'kotlin.ULong.toLong' call
        var this_0 = ULongArray__get_impl_pr71q9(content, i);
        var tmp$ret$0 = _ULong___get_data__impl__fggpzb(this_0);
        tmp.vn(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(ULongArraySerializer_0).rs = function (encoder, content, size) {
    return this.jw(encoder, content instanceof ULongArray ? content.oj_1 : THROW_CCE(), size);
  };
  var ULongArraySerializer_instance;
  function ULongArraySerializer_getInstance() {
    if (ULongArraySerializer_instance == null)
      new ULongArraySerializer_0();
    return ULongArraySerializer_instance;
  }
  function IntArraySerializer_0() {
    IntArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_6(IntCompanionObject_instance));
  }
  protoOf(IntArraySerializer_0).mw = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(IntArraySerializer_0).er = function (_this__u8e3s4) {
    return this.mw((!(_this__u8e3s4 == null) ? isIntArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(IntArraySerializer_0).nw = function (_this__u8e3s4) {
    return new IntArrayBuilder(_this__u8e3s4);
  };
  protoOf(IntArraySerializer_0).zp = function (_this__u8e3s4) {
    return this.nw((!(_this__u8e3s4 == null) ? isIntArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(IntArraySerializer_0).ps = function () {
    return new Int32Array(0);
  };
  protoOf(IntArraySerializer_0).ow = function (decoder, index, builder, checkIndex) {
    builder.rw(decoder.bn(this.gs_1, index));
  };
  protoOf(IntArraySerializer_0).kq = function (decoder, index, builder, checkIndex) {
    return this.ow(decoder, index, builder instanceof IntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(IntArraySerializer_0).qs = function (decoder, index, builder, checkIndex) {
    return this.ow(decoder, index, builder instanceof IntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(IntArraySerializer_0).sw = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.eo(this.gs_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(IntArraySerializer_0).rs = function (encoder, content, size) {
    return this.sw(encoder, (!(content == null) ? isIntArray(content) : false) ? content : THROW_CCE(), size);
  };
  var IntArraySerializer_instance;
  function IntArraySerializer_getInstance() {
    if (IntArraySerializer_instance == null)
      new IntArraySerializer_0();
    return IntArraySerializer_instance;
  }
  function UIntArraySerializer_0() {
    UIntArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_7(Companion_getInstance_5()));
  }
  protoOf(UIntArraySerializer_0).vw = function (_this__u8e3s4) {
    return _UIntArray___get_size__impl__r6l8ci(_this__u8e3s4);
  };
  protoOf(UIntArraySerializer_0).er = function (_this__u8e3s4) {
    return this.vw(_this__u8e3s4 instanceof UIntArray ? _this__u8e3s4.ej_1 : THROW_CCE());
  };
  protoOf(UIntArraySerializer_0).ww = function (_this__u8e3s4) {
    return new UIntArrayBuilder(_this__u8e3s4);
  };
  protoOf(UIntArraySerializer_0).zp = function (_this__u8e3s4) {
    return this.ww(_this__u8e3s4 instanceof UIntArray ? _this__u8e3s4.ej_1 : THROW_CCE());
  };
  protoOf(UIntArraySerializer_0).xw = function () {
    return _UIntArray___init__impl__ghjpc6(0);
  };
  protoOf(UIntArraySerializer_0).ps = function () {
    return new UIntArray(this.xw());
  };
  protoOf(UIntArraySerializer_0).yw = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUInt' call
    var this_0 = decoder.hn(this.gs_1, index).nm();
    var tmp$ret$0 = _UInt___init__impl__l7qpdl(this_0);
    builder.bx(tmp$ret$0);
  };
  protoOf(UIntArraySerializer_0).kq = function (decoder, index, builder, checkIndex) {
    return this.yw(decoder, index, builder instanceof UIntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UIntArraySerializer_0).qs = function (decoder, index, builder, checkIndex) {
    return this.yw(decoder, index, builder instanceof UIntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UIntArraySerializer_0).cx = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.ko(this.gs_1, i);
        // Inline function 'kotlin.UInt.toInt' call
        var this_0 = UIntArray__get_impl_gp5kza(content, i);
        var tmp$ret$0 = _UInt___get_data__impl__f0vqqw(this_0);
        tmp.un(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(UIntArraySerializer_0).rs = function (encoder, content, size) {
    return this.cx(encoder, content instanceof UIntArray ? content.ej_1 : THROW_CCE(), size);
  };
  var UIntArraySerializer_instance;
  function UIntArraySerializer_getInstance() {
    if (UIntArraySerializer_instance == null)
      new UIntArraySerializer_0();
    return UIntArraySerializer_instance;
  }
  function ShortArraySerializer_0() {
    ShortArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_8(ShortCompanionObject_instance));
  }
  protoOf(ShortArraySerializer_0).fx = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(ShortArraySerializer_0).er = function (_this__u8e3s4) {
    return this.fx((!(_this__u8e3s4 == null) ? isShortArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ShortArraySerializer_0).gx = function (_this__u8e3s4) {
    return new ShortArrayBuilder(_this__u8e3s4);
  };
  protoOf(ShortArraySerializer_0).zp = function (_this__u8e3s4) {
    return this.gx((!(_this__u8e3s4 == null) ? isShortArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ShortArraySerializer_0).ps = function () {
    return new Int16Array(0);
  };
  protoOf(ShortArraySerializer_0).hx = function (decoder, index, builder, checkIndex) {
    builder.kx(decoder.an(this.gs_1, index));
  };
  protoOf(ShortArraySerializer_0).kq = function (decoder, index, builder, checkIndex) {
    return this.hx(decoder, index, builder instanceof ShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ShortArraySerializer_0).qs = function (decoder, index, builder, checkIndex) {
    return this.hx(decoder, index, builder instanceof ShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ShortArraySerializer_0).lx = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.do(this.gs_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(ShortArraySerializer_0).rs = function (encoder, content, size) {
    return this.lx(encoder, (!(content == null) ? isShortArray(content) : false) ? content : THROW_CCE(), size);
  };
  var ShortArraySerializer_instance;
  function ShortArraySerializer_getInstance() {
    if (ShortArraySerializer_instance == null)
      new ShortArraySerializer_0();
    return ShortArraySerializer_instance;
  }
  function UShortArraySerializer_0() {
    UShortArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_9(Companion_getInstance_6()));
  }
  protoOf(UShortArraySerializer_0).ox = function (_this__u8e3s4) {
    return _UShortArray___get_size__impl__jqto1b(_this__u8e3s4);
  };
  protoOf(UShortArraySerializer_0).er = function (_this__u8e3s4) {
    return this.ox(_this__u8e3s4 instanceof UShortArray ? _this__u8e3s4.yj_1 : THROW_CCE());
  };
  protoOf(UShortArraySerializer_0).px = function (_this__u8e3s4) {
    return new UShortArrayBuilder(_this__u8e3s4);
  };
  protoOf(UShortArraySerializer_0).zp = function (_this__u8e3s4) {
    return this.px(_this__u8e3s4 instanceof UShortArray ? _this__u8e3s4.yj_1 : THROW_CCE());
  };
  protoOf(UShortArraySerializer_0).qx = function () {
    return _UShortArray___init__impl__9b26ef(0);
  };
  protoOf(UShortArraySerializer_0).ps = function () {
    return new UShortArray(this.qx());
  };
  protoOf(UShortArraySerializer_0).rx = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUShort' call
    var this_0 = decoder.hn(this.gs_1, index).mm();
    var tmp$ret$0 = _UShort___init__impl__jigrne(this_0);
    builder.ux(tmp$ret$0);
  };
  protoOf(UShortArraySerializer_0).kq = function (decoder, index, builder, checkIndex) {
    return this.rx(decoder, index, builder instanceof UShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UShortArraySerializer_0).qs = function (decoder, index, builder, checkIndex) {
    return this.rx(decoder, index, builder instanceof UShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UShortArraySerializer_0).vx = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.ko(this.gs_1, i);
        // Inline function 'kotlin.UShort.toShort' call
        var this_0 = UShortArray__get_impl_fnbhmx(content, i);
        var tmp$ret$0 = _UShort___get_data__impl__g0245(this_0);
        tmp.tn(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(UShortArraySerializer_0).rs = function (encoder, content, size) {
    return this.vx(encoder, content instanceof UShortArray ? content.yj_1 : THROW_CCE(), size);
  };
  var UShortArraySerializer_instance;
  function UShortArraySerializer_getInstance() {
    if (UShortArraySerializer_instance == null)
      new UShortArraySerializer_0();
    return UShortArraySerializer_instance;
  }
  function ByteArraySerializer_0() {
    ByteArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_10(ByteCompanionObject_instance));
  }
  protoOf(ByteArraySerializer_0).yx = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(ByteArraySerializer_0).er = function (_this__u8e3s4) {
    return this.yx((!(_this__u8e3s4 == null) ? isByteArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ByteArraySerializer_0).zx = function (_this__u8e3s4) {
    return new ByteArrayBuilder(_this__u8e3s4);
  };
  protoOf(ByteArraySerializer_0).zp = function (_this__u8e3s4) {
    return this.zx((!(_this__u8e3s4 == null) ? isByteArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ByteArraySerializer_0).ps = function () {
    return new Int8Array(0);
  };
  protoOf(ByteArraySerializer_0).ay = function (decoder, index, builder, checkIndex) {
    builder.dy(decoder.zm(this.gs_1, index));
  };
  protoOf(ByteArraySerializer_0).kq = function (decoder, index, builder, checkIndex) {
    return this.ay(decoder, index, builder instanceof ByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ByteArraySerializer_0).qs = function (decoder, index, builder, checkIndex) {
    return this.ay(decoder, index, builder instanceof ByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ByteArraySerializer_0).ey = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.co(this.gs_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(ByteArraySerializer_0).rs = function (encoder, content, size) {
    return this.ey(encoder, (!(content == null) ? isByteArray(content) : false) ? content : THROW_CCE(), size);
  };
  var ByteArraySerializer_instance;
  function ByteArraySerializer_getInstance() {
    if (ByteArraySerializer_instance == null)
      new ByteArraySerializer_0();
    return ByteArraySerializer_instance;
  }
  function UByteArraySerializer_0() {
    UByteArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_11(Companion_getInstance_7()));
  }
  protoOf(UByteArraySerializer_0).hy = function (_this__u8e3s4) {
    return _UByteArray___get_size__impl__h6pkdv(_this__u8e3s4);
  };
  protoOf(UByteArraySerializer_0).er = function (_this__u8e3s4) {
    return this.hy(_this__u8e3s4 instanceof UByteArray ? _this__u8e3s4.ui_1 : THROW_CCE());
  };
  protoOf(UByteArraySerializer_0).iy = function (_this__u8e3s4) {
    return new UByteArrayBuilder(_this__u8e3s4);
  };
  protoOf(UByteArraySerializer_0).zp = function (_this__u8e3s4) {
    return this.iy(_this__u8e3s4 instanceof UByteArray ? _this__u8e3s4.ui_1 : THROW_CCE());
  };
  protoOf(UByteArraySerializer_0).jy = function () {
    return _UByteArray___init__impl__ip4y9n(0);
  };
  protoOf(UByteArraySerializer_0).ps = function () {
    return new UByteArray(this.jy());
  };
  protoOf(UByteArraySerializer_0).ky = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUByte' call
    var this_0 = decoder.hn(this.gs_1, index).lm();
    var tmp$ret$0 = _UByte___init__impl__g9hnc4(this_0);
    builder.ny(tmp$ret$0);
  };
  protoOf(UByteArraySerializer_0).kq = function (decoder, index, builder, checkIndex) {
    return this.ky(decoder, index, builder instanceof UByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UByteArraySerializer_0).qs = function (decoder, index, builder, checkIndex) {
    return this.ky(decoder, index, builder instanceof UByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UByteArraySerializer_0).oy = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.ko(this.gs_1, i);
        // Inline function 'kotlin.UByte.toByte' call
        var this_0 = UByteArray__get_impl_t5f3hv(content, i);
        var tmp$ret$0 = _UByte___get_data__impl__jof9qr(this_0);
        tmp.sn(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(UByteArraySerializer_0).rs = function (encoder, content, size) {
    return this.oy(encoder, content instanceof UByteArray ? content.ui_1 : THROW_CCE(), size);
  };
  var UByteArraySerializer_instance;
  function UByteArraySerializer_getInstance() {
    if (UByteArraySerializer_instance == null)
      new UByteArraySerializer_0();
    return UByteArraySerializer_instance;
  }
  function BooleanArraySerializer_0() {
    BooleanArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_12(BooleanCompanionObject_instance));
  }
  protoOf(BooleanArraySerializer_0).ry = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(BooleanArraySerializer_0).er = function (_this__u8e3s4) {
    return this.ry((!(_this__u8e3s4 == null) ? isBooleanArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(BooleanArraySerializer_0).sy = function (_this__u8e3s4) {
    return new BooleanArrayBuilder(_this__u8e3s4);
  };
  protoOf(BooleanArraySerializer_0).zp = function (_this__u8e3s4) {
    return this.sy((!(_this__u8e3s4 == null) ? isBooleanArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(BooleanArraySerializer_0).ps = function () {
    return booleanArray(0);
  };
  protoOf(BooleanArraySerializer_0).ty = function (decoder, index, builder, checkIndex) {
    builder.wy(decoder.ym(this.gs_1, index));
  };
  protoOf(BooleanArraySerializer_0).kq = function (decoder, index, builder, checkIndex) {
    return this.ty(decoder, index, builder instanceof BooleanArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(BooleanArraySerializer_0).qs = function (decoder, index, builder, checkIndex) {
    return this.ty(decoder, index, builder instanceof BooleanArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(BooleanArraySerializer_0).xy = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.bo(this.gs_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(BooleanArraySerializer_0).rs = function (encoder, content, size) {
    return this.xy(encoder, (!(content == null) ? isBooleanArray(content) : false) ? content : THROW_CCE(), size);
  };
  var BooleanArraySerializer_instance;
  function BooleanArraySerializer_getInstance() {
    if (BooleanArraySerializer_instance == null)
      new BooleanArraySerializer_0();
    return BooleanArraySerializer_instance;
  }
  function CharArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.vu_1 = bufferWithData;
    this.wu_1 = bufferWithData.length;
    this.ms(10);
  }
  protoOf(CharArrayBuilder).is = function () {
    return this.wu_1;
  };
  protoOf(CharArrayBuilder).ms = function (requiredCapacity) {
    if (this.vu_1.length < requiredCapacity)
      this.vu_1 = copyOf(this.vu_1, coerceAtLeast(requiredCapacity, imul(this.vu_1.length, 2)));
  };
  protoOf(CharArrayBuilder).xu = function (c) {
    this.ts();
    var tmp = this.vu_1;
    var _unary__edvuaz = this.wu_1;
    this.wu_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(CharArrayBuilder).ks = function () {
    return copyOf(this.vu_1, this.wu_1);
  };
  function DoubleArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.ev_1 = bufferWithData;
    this.fv_1 = bufferWithData.length;
    this.ms(10);
  }
  protoOf(DoubleArrayBuilder).is = function () {
    return this.fv_1;
  };
  protoOf(DoubleArrayBuilder).ms = function (requiredCapacity) {
    if (this.ev_1.length < requiredCapacity)
      this.ev_1 = copyOf_0(this.ev_1, coerceAtLeast(requiredCapacity, imul(this.ev_1.length, 2)));
  };
  protoOf(DoubleArrayBuilder).gv = function (c) {
    this.ts();
    var tmp = this.ev_1;
    var _unary__edvuaz = this.fv_1;
    this.fv_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(DoubleArrayBuilder).ks = function () {
    return copyOf_0(this.ev_1, this.fv_1);
  };
  function FloatArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.nv_1 = bufferWithData;
    this.ov_1 = bufferWithData.length;
    this.ms(10);
  }
  protoOf(FloatArrayBuilder).is = function () {
    return this.ov_1;
  };
  protoOf(FloatArrayBuilder).ms = function (requiredCapacity) {
    if (this.nv_1.length < requiredCapacity)
      this.nv_1 = copyOf_1(this.nv_1, coerceAtLeast(requiredCapacity, imul(this.nv_1.length, 2)));
  };
  protoOf(FloatArrayBuilder).pv = function (c) {
    this.ts();
    var tmp = this.nv_1;
    var _unary__edvuaz = this.ov_1;
    this.ov_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(FloatArrayBuilder).ks = function () {
    return copyOf_1(this.nv_1, this.ov_1);
  };
  function LongArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.wv_1 = bufferWithData;
    this.xv_1 = bufferWithData.length;
    this.ms(10);
  }
  protoOf(LongArrayBuilder).is = function () {
    return this.xv_1;
  };
  protoOf(LongArrayBuilder).ms = function (requiredCapacity) {
    if (this.wv_1.length < requiredCapacity)
      this.wv_1 = copyOf_2(this.wv_1, coerceAtLeast(requiredCapacity, imul(this.wv_1.length, 2)));
  };
  protoOf(LongArrayBuilder).yv = function (c) {
    this.ts();
    var tmp = this.wv_1;
    var _unary__edvuaz = this.xv_1;
    this.xv_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(LongArrayBuilder).ks = function () {
    return copyOf_2(this.wv_1, this.xv_1);
  };
  function ULongArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.gw_1 = bufferWithData;
    this.hw_1 = _ULongArray___get_size__impl__ju6dtr(bufferWithData);
    this.ms(10);
  }
  protoOf(ULongArrayBuilder).is = function () {
    return this.hw_1;
  };
  protoOf(ULongArrayBuilder).ms = function (requiredCapacity) {
    if (_ULongArray___get_size__impl__ju6dtr(this.gw_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.gw_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_ULongArray___get_size__impl__ju6dtr(this.gw_1), 2));
      tmp.gw_1 = _ULongArray___init__impl__twm1l3_0(copyOf_2(_ULongArray___get_storage__impl__28e64j(tmp0), newSize));
    }
  };
  protoOf(ULongArrayBuilder).iw = function (c) {
    this.ts();
    var tmp = this.gw_1;
    var _unary__edvuaz = this.hw_1;
    this.hw_1 = _unary__edvuaz + 1 | 0;
    ULongArray__set_impl_z19mvh(tmp, _unary__edvuaz, c);
  };
  protoOf(ULongArrayBuilder).yy = function () {
    var tmp0 = this.gw_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.hw_1;
    return _ULongArray___init__impl__twm1l3_0(copyOf_2(_ULongArray___get_storage__impl__28e64j(tmp0), newSize));
  };
  protoOf(ULongArrayBuilder).ks = function () {
    return new ULongArray(this.yy());
  };
  function IntArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.pw_1 = bufferWithData;
    this.qw_1 = bufferWithData.length;
    this.ms(10);
  }
  protoOf(IntArrayBuilder).is = function () {
    return this.qw_1;
  };
  protoOf(IntArrayBuilder).ms = function (requiredCapacity) {
    if (this.pw_1.length < requiredCapacity)
      this.pw_1 = copyOf_3(this.pw_1, coerceAtLeast(requiredCapacity, imul(this.pw_1.length, 2)));
  };
  protoOf(IntArrayBuilder).rw = function (c) {
    this.ts();
    var tmp = this.pw_1;
    var _unary__edvuaz = this.qw_1;
    this.qw_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(IntArrayBuilder).ks = function () {
    return copyOf_3(this.pw_1, this.qw_1);
  };
  function UIntArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.zw_1 = bufferWithData;
    this.ax_1 = _UIntArray___get_size__impl__r6l8ci(bufferWithData);
    this.ms(10);
  }
  protoOf(UIntArrayBuilder).is = function () {
    return this.ax_1;
  };
  protoOf(UIntArrayBuilder).ms = function (requiredCapacity) {
    if (_UIntArray___get_size__impl__r6l8ci(this.zw_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.zw_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_UIntArray___get_size__impl__r6l8ci(this.zw_1), 2));
      tmp.zw_1 = _UIntArray___init__impl__ghjpc6_0(copyOf_3(_UIntArray___get_storage__impl__92a0v0(tmp0), newSize));
    }
  };
  protoOf(UIntArrayBuilder).bx = function (c) {
    this.ts();
    var tmp = this.zw_1;
    var _unary__edvuaz = this.ax_1;
    this.ax_1 = _unary__edvuaz + 1 | 0;
    UIntArray__set_impl_7f2zu2(tmp, _unary__edvuaz, c);
  };
  protoOf(UIntArrayBuilder).zy = function () {
    var tmp0 = this.zw_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.ax_1;
    return _UIntArray___init__impl__ghjpc6_0(copyOf_3(_UIntArray___get_storage__impl__92a0v0(tmp0), newSize));
  };
  protoOf(UIntArrayBuilder).ks = function () {
    return new UIntArray(this.zy());
  };
  function ShortArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.ix_1 = bufferWithData;
    this.jx_1 = bufferWithData.length;
    this.ms(10);
  }
  protoOf(ShortArrayBuilder).is = function () {
    return this.jx_1;
  };
  protoOf(ShortArrayBuilder).ms = function (requiredCapacity) {
    if (this.ix_1.length < requiredCapacity)
      this.ix_1 = copyOf_4(this.ix_1, coerceAtLeast(requiredCapacity, imul(this.ix_1.length, 2)));
  };
  protoOf(ShortArrayBuilder).kx = function (c) {
    this.ts();
    var tmp = this.ix_1;
    var _unary__edvuaz = this.jx_1;
    this.jx_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(ShortArrayBuilder).ks = function () {
    return copyOf_4(this.ix_1, this.jx_1);
  };
  function UShortArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.sx_1 = bufferWithData;
    this.tx_1 = _UShortArray___get_size__impl__jqto1b(bufferWithData);
    this.ms(10);
  }
  protoOf(UShortArrayBuilder).is = function () {
    return this.tx_1;
  };
  protoOf(UShortArrayBuilder).ms = function (requiredCapacity) {
    if (_UShortArray___get_size__impl__jqto1b(this.sx_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.sx_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_UShortArray___get_size__impl__jqto1b(this.sx_1), 2));
      tmp.sx_1 = _UShortArray___init__impl__9b26ef_0(copyOf_4(_UShortArray___get_storage__impl__t2jpv5(tmp0), newSize));
    }
  };
  protoOf(UShortArrayBuilder).ux = function (c) {
    this.ts();
    var tmp = this.sx_1;
    var _unary__edvuaz = this.tx_1;
    this.tx_1 = _unary__edvuaz + 1 | 0;
    UShortArray__set_impl_6d8whp(tmp, _unary__edvuaz, c);
  };
  protoOf(UShortArrayBuilder).az = function () {
    var tmp0 = this.sx_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.tx_1;
    return _UShortArray___init__impl__9b26ef_0(copyOf_4(_UShortArray___get_storage__impl__t2jpv5(tmp0), newSize));
  };
  protoOf(UShortArrayBuilder).ks = function () {
    return new UShortArray(this.az());
  };
  function ByteArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.by_1 = bufferWithData;
    this.cy_1 = bufferWithData.length;
    this.ms(10);
  }
  protoOf(ByteArrayBuilder).is = function () {
    return this.cy_1;
  };
  protoOf(ByteArrayBuilder).ms = function (requiredCapacity) {
    if (this.by_1.length < requiredCapacity)
      this.by_1 = copyOf_5(this.by_1, coerceAtLeast(requiredCapacity, imul(this.by_1.length, 2)));
  };
  protoOf(ByteArrayBuilder).dy = function (c) {
    this.ts();
    var tmp = this.by_1;
    var _unary__edvuaz = this.cy_1;
    this.cy_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(ByteArrayBuilder).ks = function () {
    return copyOf_5(this.by_1, this.cy_1);
  };
  function UByteArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.ly_1 = bufferWithData;
    this.my_1 = _UByteArray___get_size__impl__h6pkdv(bufferWithData);
    this.ms(10);
  }
  protoOf(UByteArrayBuilder).is = function () {
    return this.my_1;
  };
  protoOf(UByteArrayBuilder).ms = function (requiredCapacity) {
    if (_UByteArray___get_size__impl__h6pkdv(this.ly_1) < requiredCapacity) {
      var tmp = this;
      var tmp0 = this.ly_1;
      // Inline function 'kotlin.collections.copyOf' call
      var newSize = coerceAtLeast(requiredCapacity, imul(_UByteArray___get_size__impl__h6pkdv(this.ly_1), 2));
      tmp.ly_1 = _UByteArray___init__impl__ip4y9n_0(copyOf_5(_UByteArray___get_storage__impl__d4kctt(tmp0), newSize));
    }
  };
  protoOf(UByteArrayBuilder).ny = function (c) {
    this.ts();
    var tmp = this.ly_1;
    var _unary__edvuaz = this.my_1;
    this.my_1 = _unary__edvuaz + 1 | 0;
    UByteArray__set_impl_jvcicn(tmp, _unary__edvuaz, c);
  };
  protoOf(UByteArrayBuilder).bz = function () {
    var tmp0 = this.ly_1;
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.my_1;
    return _UByteArray___init__impl__ip4y9n_0(copyOf_5(_UByteArray___get_storage__impl__d4kctt(tmp0), newSize));
  };
  protoOf(UByteArrayBuilder).ks = function () {
    return new UByteArray(this.bz());
  };
  function BooleanArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.uy_1 = bufferWithData;
    this.vy_1 = bufferWithData.length;
    this.ms(10);
  }
  protoOf(BooleanArrayBuilder).is = function () {
    return this.vy_1;
  };
  protoOf(BooleanArrayBuilder).ms = function (requiredCapacity) {
    if (this.uy_1.length < requiredCapacity)
      this.uy_1 = copyOf_6(this.uy_1, coerceAtLeast(requiredCapacity, imul(this.uy_1.length, 2)));
  };
  protoOf(BooleanArrayBuilder).wy = function (c) {
    this.ts();
    var tmp = this.uy_1;
    var _unary__edvuaz = this.vy_1;
    this.vy_1 = _unary__edvuaz + 1 | 0;
    tmp[_unary__edvuaz] = c;
  };
  protoOf(BooleanArrayBuilder).ks = function () {
    return copyOf_6(this.uy_1, this.vy_1);
  };
  function get_BUILTIN_SERIALIZERS() {
    _init_properties_Primitives_kt__k0eto4();
    return BUILTIN_SERIALIZERS;
  }
  var BUILTIN_SERIALIZERS;
  function builtinSerializerOrNull(_this__u8e3s4) {
    _init_properties_Primitives_kt__k0eto4();
    var tmp = get_BUILTIN_SERIALIZERS().y1(_this__u8e3s4);
    return (tmp == null ? true : isInterface(tmp, KSerializer)) ? tmp : THROW_CCE();
  }
  function StringSerializer() {
    StringSerializer_instance = this;
    this.cz_1 = new PrimitiveSerialDescriptor_0('kotlin.String', STRING_getInstance());
  }
  protoOf(StringSerializer).zj = function () {
    return this.cz_1;
  };
  protoOf(StringSerializer).dz = function (encoder, value) {
    return encoder.zn(value);
  };
  protoOf(StringSerializer).ak = function (encoder, value) {
    return this.dz(encoder, (!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE());
  };
  protoOf(StringSerializer).bk = function (decoder) {
    return decoder.sm();
  };
  var StringSerializer_instance;
  function StringSerializer_getInstance() {
    if (StringSerializer_instance == null)
      new StringSerializer();
    return StringSerializer_instance;
  }
  function CharSerializer() {
    CharSerializer_instance = this;
    this.ez_1 = new PrimitiveSerialDescriptor_0('kotlin.Char', CHAR_getInstance());
  }
  protoOf(CharSerializer).zj = function () {
    return this.ez_1;
  };
  protoOf(CharSerializer).fz = function (encoder, value) {
    return encoder.yn(value);
  };
  protoOf(CharSerializer).ak = function (encoder, value) {
    return this.fz(encoder, value instanceof Char ? value.g1_1 : THROW_CCE());
  };
  protoOf(CharSerializer).gz = function (decoder) {
    return decoder.rm();
  };
  protoOf(CharSerializer).bk = function (decoder) {
    return new Char(this.gz(decoder));
  };
  var CharSerializer_instance;
  function CharSerializer_getInstance() {
    if (CharSerializer_instance == null)
      new CharSerializer();
    return CharSerializer_instance;
  }
  function DoubleSerializer() {
    DoubleSerializer_instance = this;
    this.hz_1 = new PrimitiveSerialDescriptor_0('kotlin.Double', DOUBLE_getInstance());
  }
  protoOf(DoubleSerializer).zj = function () {
    return this.hz_1;
  };
  protoOf(DoubleSerializer).iz = function (encoder, value) {
    return encoder.xn(value);
  };
  protoOf(DoubleSerializer).ak = function (encoder, value) {
    return this.iz(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(DoubleSerializer).bk = function (decoder) {
    return decoder.qm();
  };
  var DoubleSerializer_instance;
  function DoubleSerializer_getInstance() {
    if (DoubleSerializer_instance == null)
      new DoubleSerializer();
    return DoubleSerializer_instance;
  }
  function FloatSerializer() {
    FloatSerializer_instance = this;
    this.jz_1 = new PrimitiveSerialDescriptor_0('kotlin.Float', FLOAT_getInstance());
  }
  protoOf(FloatSerializer).zj = function () {
    return this.jz_1;
  };
  protoOf(FloatSerializer).kz = function (encoder, value) {
    return encoder.wn(value);
  };
  protoOf(FloatSerializer).ak = function (encoder, value) {
    return this.kz(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(FloatSerializer).bk = function (decoder) {
    return decoder.pm();
  };
  var FloatSerializer_instance;
  function FloatSerializer_getInstance() {
    if (FloatSerializer_instance == null)
      new FloatSerializer();
    return FloatSerializer_instance;
  }
  function LongSerializer() {
    LongSerializer_instance = this;
    this.lz_1 = new PrimitiveSerialDescriptor_0('kotlin.Long', LONG_getInstance());
  }
  protoOf(LongSerializer).zj = function () {
    return this.lz_1;
  };
  protoOf(LongSerializer).mz = function (encoder, value) {
    return encoder.vn(value);
  };
  protoOf(LongSerializer).ak = function (encoder, value) {
    return this.mz(encoder, value instanceof Long ? value : THROW_CCE());
  };
  protoOf(LongSerializer).bk = function (decoder) {
    return decoder.om();
  };
  var LongSerializer_instance;
  function LongSerializer_getInstance() {
    if (LongSerializer_instance == null)
      new LongSerializer();
    return LongSerializer_instance;
  }
  function IntSerializer() {
    IntSerializer_instance = this;
    this.nz_1 = new PrimitiveSerialDescriptor_0('kotlin.Int', INT_getInstance());
  }
  protoOf(IntSerializer).zj = function () {
    return this.nz_1;
  };
  protoOf(IntSerializer).oz = function (encoder, value) {
    return encoder.un(value);
  };
  protoOf(IntSerializer).ak = function (encoder, value) {
    return this.oz(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(IntSerializer).bk = function (decoder) {
    return decoder.nm();
  };
  var IntSerializer_instance;
  function IntSerializer_getInstance() {
    if (IntSerializer_instance == null)
      new IntSerializer();
    return IntSerializer_instance;
  }
  function ShortSerializer() {
    ShortSerializer_instance = this;
    this.pz_1 = new PrimitiveSerialDescriptor_0('kotlin.Short', SHORT_getInstance());
  }
  protoOf(ShortSerializer).zj = function () {
    return this.pz_1;
  };
  protoOf(ShortSerializer).qz = function (encoder, value) {
    return encoder.tn(value);
  };
  protoOf(ShortSerializer).ak = function (encoder, value) {
    return this.qz(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(ShortSerializer).bk = function (decoder) {
    return decoder.mm();
  };
  var ShortSerializer_instance;
  function ShortSerializer_getInstance() {
    if (ShortSerializer_instance == null)
      new ShortSerializer();
    return ShortSerializer_instance;
  }
  function ByteSerializer() {
    ByteSerializer_instance = this;
    this.rz_1 = new PrimitiveSerialDescriptor_0('kotlin.Byte', BYTE_getInstance());
  }
  protoOf(ByteSerializer).zj = function () {
    return this.rz_1;
  };
  protoOf(ByteSerializer).sz = function (encoder, value) {
    return encoder.sn(value);
  };
  protoOf(ByteSerializer).ak = function (encoder, value) {
    return this.sz(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(ByteSerializer).bk = function (decoder) {
    return decoder.lm();
  };
  var ByteSerializer_instance;
  function ByteSerializer_getInstance() {
    if (ByteSerializer_instance == null)
      new ByteSerializer();
    return ByteSerializer_instance;
  }
  function BooleanSerializer() {
    BooleanSerializer_instance = this;
    this.tz_1 = new PrimitiveSerialDescriptor_0('kotlin.Boolean', BOOLEAN_getInstance());
  }
  protoOf(BooleanSerializer).zj = function () {
    return this.tz_1;
  };
  protoOf(BooleanSerializer).uz = function (encoder, value) {
    return encoder.rn(value);
  };
  protoOf(BooleanSerializer).ak = function (encoder, value) {
    return this.uz(encoder, (!(value == null) ? typeof value === 'boolean' : false) ? value : THROW_CCE());
  };
  protoOf(BooleanSerializer).bk = function (decoder) {
    return decoder.km();
  };
  var BooleanSerializer_instance;
  function BooleanSerializer_getInstance() {
    if (BooleanSerializer_instance == null)
      new BooleanSerializer();
    return BooleanSerializer_instance;
  }
  function UnitSerializer() {
    UnitSerializer_instance = this;
    this.vz_1 = new ObjectSerializer('kotlin.Unit', Unit_instance);
  }
  protoOf(UnitSerializer).zj = function () {
    return this.vz_1.zj();
  };
  protoOf(UnitSerializer).wz = function (encoder, value) {
    this.vz_1.pk(encoder, Unit_instance);
  };
  protoOf(UnitSerializer).ak = function (encoder, value) {
    return this.wz(encoder, value instanceof Unit ? value : THROW_CCE());
  };
  protoOf(UnitSerializer).xz = function (decoder) {
    this.vz_1.bk(decoder);
  };
  protoOf(UnitSerializer).bk = function (decoder) {
    this.xz(decoder);
    return Unit_instance;
  };
  var UnitSerializer_instance;
  function UnitSerializer_getInstance() {
    if (UnitSerializer_instance == null)
      new UnitSerializer();
    return UnitSerializer_instance;
  }
  function error_0($this) {
    throw IllegalStateException_init_$Create$('Primitive descriptor ' + $this.yz_1 + ' does not have elements');
  }
  function PrimitiveSerialDescriptor_0(serialName, kind) {
    this.yz_1 = serialName;
    this.zz_1 = kind;
  }
  protoOf(PrimitiveSerialDescriptor_0).dl = function () {
    return this.yz_1;
  };
  protoOf(PrimitiveSerialDescriptor_0).el = function () {
    return this.zz_1;
  };
  protoOf(PrimitiveSerialDescriptor_0).gl = function () {
    return 0;
  };
  protoOf(PrimitiveSerialDescriptor_0).il = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).jl = function (name) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).ml = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).ll = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).kl = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).toString = function () {
    return 'PrimitiveDescriptor(' + this.yz_1 + ')';
  };
  protoOf(PrimitiveSerialDescriptor_0).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof PrimitiveSerialDescriptor_0))
      return false;
    if (this.yz_1 === other.yz_1 && equals(this.zz_1, other.zz_1))
      return true;
    return false;
  };
  protoOf(PrimitiveSerialDescriptor_0).hashCode = function () {
    return getStringHashCode(this.yz_1) + imul(31, this.zz_1.hashCode()) | 0;
  };
  function PrimitiveDescriptorSafe(serialName, kind) {
    _init_properties_Primitives_kt__k0eto4();
    checkNameIsNotAPrimitive(serialName);
    return new PrimitiveSerialDescriptor_0(serialName, kind);
  }
  function checkNameIsNotAPrimitive(serialName) {
    _init_properties_Primitives_kt__k0eto4();
    var values = get_BUILTIN_SERIALIZERS().a2();
    var _iterator__ex2g4s = values.g();
    while (_iterator__ex2g4s.h()) {
      var primitive = _iterator__ex2g4s.i();
      var primitiveName = primitive.zj().dl();
      if (serialName === primitiveName) {
        throw IllegalArgumentException_init_$Create$(trimIndent('\n                The name of serial descriptor should uniquely identify associated serializer.\n                For serial name ' + serialName + ' there already exists ' + getKClassFromExpression(primitive).m9() + '.\n                Please refer to SerialDescriptor documentation for additional information.\n            '));
      }
    }
  }
  var properties_initialized_Primitives_kt_6dpii6;
  function _init_properties_Primitives_kt__k0eto4() {
    if (!properties_initialized_Primitives_kt_6dpii6) {
      properties_initialized_Primitives_kt_6dpii6 = true;
      BUILTIN_SERIALIZERS = initBuiltins();
    }
  }
  function NamedValueDecoder() {
    TaggedDecoder.call(this);
  }
  protoOf(NamedValueDecoder).c10 = function (_this__u8e3s4, index) {
    return this.e10(this.d10(_this__u8e3s4, index));
  };
  protoOf(NamedValueDecoder).e10 = function (nestedName) {
    var tmp0_elvis_lhs = this.h10();
    return this.i10(tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs, nestedName);
  };
  protoOf(NamedValueDecoder).d10 = function (descriptor, index) {
    return descriptor.il(index);
  };
  protoOf(NamedValueDecoder).i10 = function (parentName, childName) {
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(parentName) === 0) {
      tmp = childName;
    } else {
      tmp = parentName + '.' + childName;
    }
    return tmp;
  };
  protoOf(NamedValueDecoder).j10 = function () {
    return this.f10_1.p() ? '$' : joinToString(this.f10_1, '.', '$.');
  };
  function tagBlock($this, tag, block) {
    $this.w10(tag);
    var r = block();
    if (!$this.g10_1) {
      $this.x10();
    }
    $this.g10_1 = false;
    return r;
  }
  function TaggedDecoder$decodeSerializableElement$lambda(this$0, $deserializer, $previousValue) {
    return function () {
      return this$0.um($deserializer, $previousValue);
    };
  }
  function TaggedDecoder() {
    var tmp = this;
    // Inline function 'kotlin.collections.arrayListOf' call
    tmp.f10_1 = ArrayList_init_$Create$_0();
    this.g10_1 = false;
  }
  protoOf(TaggedDecoder).kn = function () {
    return EmptySerializersModule_0();
  };
  protoOf(TaggedDecoder).k10 = function (tag) {
    throw SerializationException_init_$Create$_0(toString(getKClassFromExpression(this)) + " can't retrieve untyped values");
  };
  protoOf(TaggedDecoder).l10 = function (tag) {
    return true;
  };
  protoOf(TaggedDecoder).m10 = function (tag) {
    var tmp = this.k10(tag);
    return typeof tmp === 'boolean' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).n10 = function (tag) {
    var tmp = this.k10(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).o10 = function (tag) {
    var tmp = this.k10(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).p10 = function (tag) {
    var tmp = this.k10(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).q10 = function (tag) {
    var tmp = this.k10(tag);
    return tmp instanceof Long ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).r10 = function (tag) {
    var tmp = this.k10(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).s10 = function (tag) {
    var tmp = this.k10(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).t10 = function (tag) {
    var tmp = this.k10(tag);
    return tmp instanceof Char ? tmp.g1_1 : THROW_CCE();
  };
  protoOf(TaggedDecoder).u10 = function (tag) {
    var tmp = this.k10(tag);
    return typeof tmp === 'string' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).v10 = function (tag, inlineDescriptor) {
    // Inline function 'kotlin.apply' call
    this.w10(tag);
    return this;
  };
  protoOf(TaggedDecoder).um = function (deserializer, previousValue) {
    return this.vm(deserializer);
  };
  protoOf(TaggedDecoder).tm = function (descriptor) {
    return this.v10(this.x10(), descriptor);
  };
  protoOf(TaggedDecoder).im = function () {
    var tmp0_elvis_lhs = this.h10();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var currentTag = tmp;
    return this.l10(currentTag);
  };
  protoOf(TaggedDecoder).jm = function () {
    return null;
  };
  protoOf(TaggedDecoder).km = function () {
    return this.m10(this.x10());
  };
  protoOf(TaggedDecoder).lm = function () {
    return this.n10(this.x10());
  };
  protoOf(TaggedDecoder).mm = function () {
    return this.o10(this.x10());
  };
  protoOf(TaggedDecoder).nm = function () {
    return this.p10(this.x10());
  };
  protoOf(TaggedDecoder).om = function () {
    return this.q10(this.x10());
  };
  protoOf(TaggedDecoder).pm = function () {
    return this.r10(this.x10());
  };
  protoOf(TaggedDecoder).qm = function () {
    return this.s10(this.x10());
  };
  protoOf(TaggedDecoder).rm = function () {
    return this.t10(this.x10());
  };
  protoOf(TaggedDecoder).sm = function () {
    return this.u10(this.x10());
  };
  protoOf(TaggedDecoder).wm = function (descriptor) {
    return this;
  };
  protoOf(TaggedDecoder).xm = function (descriptor) {
  };
  protoOf(TaggedDecoder).ym = function (descriptor, index) {
    return this.m10(this.c10(descriptor, index));
  };
  protoOf(TaggedDecoder).zm = function (descriptor, index) {
    return this.n10(this.c10(descriptor, index));
  };
  protoOf(TaggedDecoder).an = function (descriptor, index) {
    return this.o10(this.c10(descriptor, index));
  };
  protoOf(TaggedDecoder).bn = function (descriptor, index) {
    return this.p10(this.c10(descriptor, index));
  };
  protoOf(TaggedDecoder).cn = function (descriptor, index) {
    return this.q10(this.c10(descriptor, index));
  };
  protoOf(TaggedDecoder).dn = function (descriptor, index) {
    return this.r10(this.c10(descriptor, index));
  };
  protoOf(TaggedDecoder).en = function (descriptor, index) {
    return this.s10(this.c10(descriptor, index));
  };
  protoOf(TaggedDecoder).fn = function (descriptor, index) {
    return this.t10(this.c10(descriptor, index));
  };
  protoOf(TaggedDecoder).gn = function (descriptor, index) {
    return this.u10(this.c10(descriptor, index));
  };
  protoOf(TaggedDecoder).hn = function (descriptor, index) {
    return this.v10(this.c10(descriptor, index), descriptor.ll(index));
  };
  protoOf(TaggedDecoder).in = function (descriptor, index, deserializer, previousValue) {
    var tmp = this.c10(descriptor, index);
    return tagBlock(this, tmp, TaggedDecoder$decodeSerializableElement$lambda(this, deserializer, previousValue));
  };
  protoOf(TaggedDecoder).h10 = function () {
    return lastOrNull(this.f10_1);
  };
  protoOf(TaggedDecoder).w10 = function (name) {
    this.f10_1.e(name);
  };
  protoOf(TaggedDecoder).x10 = function () {
    var r = this.f10_1.f2(get_lastIndex_0(this.f10_1));
    this.g10_1 = true;
    return r;
  };
  function get_NULL() {
    _init_properties_Tuples_kt__dz0qyd();
    return NULL;
  }
  var NULL;
  function MapEntry(key, value) {
    this.y10_1 = key;
    this.z10_1 = value;
  }
  protoOf(MapEntry).u1 = function () {
    return this.y10_1;
  };
  protoOf(MapEntry).v1 = function () {
    return this.z10_1;
  };
  protoOf(MapEntry).toString = function () {
    return 'MapEntry(key=' + toString_0(this.y10_1) + ', value=' + toString_0(this.z10_1) + ')';
  };
  protoOf(MapEntry).hashCode = function () {
    var result = this.y10_1 == null ? 0 : hashCode(this.y10_1);
    result = imul(result, 31) + (this.z10_1 == null ? 0 : hashCode(this.z10_1)) | 0;
    return result;
  };
  protoOf(MapEntry).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof MapEntry))
      return false;
    var tmp0_other_with_cast = other instanceof MapEntry ? other : THROW_CCE();
    if (!equals(this.y10_1, tmp0_other_with_cast.y10_1))
      return false;
    if (!equals(this.z10_1, tmp0_other_with_cast.z10_1))
      return false;
    return true;
  };
  function MapEntrySerializer$descriptor$lambda($keySerializer, $valueSerializer) {
    return function ($this$buildSerialDescriptor) {
      $this$buildSerialDescriptor.kk('key', $keySerializer.zj());
      $this$buildSerialDescriptor.kk('value', $valueSerializer.zj());
      return Unit_instance;
    };
  }
  function MapEntrySerializer_0(keySerializer, valueSerializer) {
    KeyValueSerializer.call(this, keySerializer, valueSerializer);
    var tmp = this;
    var tmp_0 = MAP_getInstance();
    tmp.c11_1 = buildSerialDescriptor('kotlin.collections.Map.Entry', tmp_0, [], MapEntrySerializer$descriptor$lambda(keySerializer, valueSerializer));
  }
  protoOf(MapEntrySerializer_0).zj = function () {
    return this.c11_1;
  };
  protoOf(MapEntrySerializer_0).d11 = function (_this__u8e3s4) {
    return _this__u8e3s4.u1();
  };
  protoOf(MapEntrySerializer_0).e11 = function (_this__u8e3s4) {
    return this.d11((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Entry) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(MapEntrySerializer_0).f11 = function (_this__u8e3s4) {
    return _this__u8e3s4.v1();
  };
  protoOf(MapEntrySerializer_0).g11 = function (_this__u8e3s4) {
    return this.f11((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Entry) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(MapEntrySerializer_0).h11 = function (key, value) {
    return new MapEntry(key, value);
  };
  function PairSerializer$descriptor$lambda($keySerializer, $valueSerializer) {
    return function ($this$buildClassSerialDescriptor) {
      $this$buildClassSerialDescriptor.kk('first', $keySerializer.zj());
      $this$buildClassSerialDescriptor.kk('second', $valueSerializer.zj());
      return Unit_instance;
    };
  }
  function PairSerializer_0(keySerializer, valueSerializer) {
    KeyValueSerializer.call(this, keySerializer, valueSerializer);
    var tmp = this;
    tmp.n11_1 = buildClassSerialDescriptor('kotlin.Pair', [], PairSerializer$descriptor$lambda(keySerializer, valueSerializer));
  }
  protoOf(PairSerializer_0).zj = function () {
    return this.n11_1;
  };
  protoOf(PairSerializer_0).o11 = function (_this__u8e3s4) {
    return _this__u8e3s4.vd_1;
  };
  protoOf(PairSerializer_0).e11 = function (_this__u8e3s4) {
    return this.o11(_this__u8e3s4 instanceof Pair ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PairSerializer_0).p11 = function (_this__u8e3s4) {
    return _this__u8e3s4.wd_1;
  };
  protoOf(PairSerializer_0).g11 = function (_this__u8e3s4) {
    return this.p11(_this__u8e3s4 instanceof Pair ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PairSerializer_0).h11 = function (key, value) {
    return to(key, value);
  };
  function decodeSequentially_1($this, composite) {
    var a = composite.jn($this.t11_1, 0, $this.q11_1);
    var b = composite.jn($this.t11_1, 1, $this.r11_1);
    var c = composite.jn($this.t11_1, 2, $this.s11_1);
    composite.xm($this.t11_1);
    return new Triple(a, b, c);
  }
  function decodeStructure($this, composite) {
    var a = get_NULL();
    var b = get_NULL();
    var c = get_NULL();
    mainLoop: while (true) {
      var index = composite.mn($this.t11_1);
      switch (index) {
        case -1:
          break mainLoop;
        case 0:
          a = composite.jn($this.t11_1, 0, $this.q11_1);
          break;
        case 1:
          b = composite.jn($this.t11_1, 1, $this.r11_1);
          break;
        case 2:
          c = composite.jn($this.t11_1, 2, $this.s11_1);
          break;
        default:
          throw SerializationException_init_$Create$_0('Unexpected index ' + index);
      }
    }
    composite.xm($this.t11_1);
    if (a === get_NULL())
      throw SerializationException_init_$Create$_0("Element 'first' is missing");
    if (b === get_NULL())
      throw SerializationException_init_$Create$_0("Element 'second' is missing");
    if (c === get_NULL())
      throw SerializationException_init_$Create$_0("Element 'third' is missing");
    var tmp = (a == null ? true : !(a == null)) ? a : THROW_CCE();
    var tmp_0 = (b == null ? true : !(b == null)) ? b : THROW_CCE();
    return new Triple(tmp, tmp_0, (c == null ? true : !(c == null)) ? c : THROW_CCE());
  }
  function TripleSerializer$descriptor$lambda(this$0) {
    return function ($this$buildClassSerialDescriptor) {
      $this$buildClassSerialDescriptor.kk('first', this$0.q11_1.zj());
      $this$buildClassSerialDescriptor.kk('second', this$0.r11_1.zj());
      $this$buildClassSerialDescriptor.kk('third', this$0.s11_1.zj());
      return Unit_instance;
    };
  }
  function TripleSerializer_0(aSerializer, bSerializer, cSerializer) {
    this.q11_1 = aSerializer;
    this.r11_1 = bSerializer;
    this.s11_1 = cSerializer;
    var tmp = this;
    tmp.t11_1 = buildClassSerialDescriptor('kotlin.Triple', [], TripleSerializer$descriptor$lambda(this));
  }
  protoOf(TripleSerializer_0).zj = function () {
    return this.t11_1;
  };
  protoOf(TripleSerializer_0).u11 = function (encoder, value) {
    var structuredEncoder = encoder.wm(this.t11_1);
    structuredEncoder.lo(this.t11_1, 0, this.q11_1, value.di_1);
    structuredEncoder.lo(this.t11_1, 1, this.r11_1, value.ei_1);
    structuredEncoder.lo(this.t11_1, 2, this.s11_1, value.fi_1);
    structuredEncoder.xm(this.t11_1);
  };
  protoOf(TripleSerializer_0).ak = function (encoder, value) {
    return this.u11(encoder, value instanceof Triple ? value : THROW_CCE());
  };
  protoOf(TripleSerializer_0).bk = function (decoder) {
    var composite = decoder.wm(this.t11_1);
    if (composite.ln()) {
      return decodeSequentially_1(this, composite);
    }
    return decodeStructure(this, composite);
  };
  function KeyValueSerializer(keySerializer, valueSerializer) {
    this.i11_1 = keySerializer;
    this.j11_1 = valueSerializer;
  }
  protoOf(KeyValueSerializer).k11 = function (encoder, value) {
    var structuredEncoder = encoder.wm(this.zj());
    structuredEncoder.lo(this.zj(), 0, this.i11_1, this.e11(value));
    structuredEncoder.lo(this.zj(), 1, this.j11_1, this.g11(value));
    structuredEncoder.xm(this.zj());
  };
  protoOf(KeyValueSerializer).ak = function (encoder, value) {
    return this.k11(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(KeyValueSerializer).bk = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.zj();
    var composite = decoder.wm(descriptor);
    var tmp$ret$0;
    $l$block: {
      if (composite.ln()) {
        var key = composite.jn(this.zj(), 0, this.i11_1);
        var value = composite.jn(this.zj(), 1, this.j11_1);
        tmp$ret$0 = this.h11(key, value);
        break $l$block;
      }
      var key_0 = get_NULL();
      var value_0 = get_NULL();
      mainLoop: while (true) {
        var idx = composite.mn(this.zj());
        switch (idx) {
          case -1:
            break mainLoop;
          case 0:
            key_0 = composite.jn(this.zj(), 0, this.i11_1);
            break;
          case 1:
            value_0 = composite.jn(this.zj(), 1, this.j11_1);
            break;
          default:
            throw SerializationException_init_$Create$_0('Invalid index: ' + idx);
        }
      }
      if (key_0 === get_NULL())
        throw SerializationException_init_$Create$_0("Element 'key' is missing");
      if (value_0 === get_NULL())
        throw SerializationException_init_$Create$_0("Element 'value' is missing");
      var tmp = (key_0 == null ? true : !(key_0 == null)) ? key_0 : THROW_CCE();
      tmp$ret$0 = this.h11(tmp, (value_0 == null ? true : !(value_0 == null)) ? value_0 : THROW_CCE());
    }
    var result = tmp$ret$0;
    composite.xm(descriptor);
    return result;
  };
  var properties_initialized_Tuples_kt_3vs7ar;
  function _init_properties_Tuples_kt__dz0qyd() {
    if (!properties_initialized_Tuples_kt_3vs7ar) {
      properties_initialized_Tuples_kt_3vs7ar = true;
      NULL = new Object();
    }
  }
  function ULongSerializer() {
    ULongSerializer_instance = this;
    this.v11_1 = InlinePrimitiveDescriptor('kotlin.ULong', serializer_4(Companion_getInstance_3()));
  }
  protoOf(ULongSerializer).zj = function () {
    return this.v11_1;
  };
  protoOf(ULongSerializer).w11 = function (encoder, value) {
    var tmp = encoder.ao(this.v11_1);
    // Inline function 'kotlin.ULong.toLong' call
    var tmp$ret$0 = _ULong___get_data__impl__fggpzb(value);
    tmp.vn(tmp$ret$0);
  };
  protoOf(ULongSerializer).ak = function (encoder, value) {
    return this.w11(encoder, value instanceof ULong ? value.jj_1 : THROW_CCE());
  };
  protoOf(ULongSerializer).x11 = function (decoder) {
    // Inline function 'kotlin.toULong' call
    var this_0 = decoder.tm(this.v11_1).om();
    return _ULong___init__impl__c78o9k(this_0);
  };
  protoOf(ULongSerializer).bk = function (decoder) {
    return new ULong(this.x11(decoder));
  };
  var ULongSerializer_instance;
  function ULongSerializer_getInstance() {
    if (ULongSerializer_instance == null)
      new ULongSerializer();
    return ULongSerializer_instance;
  }
  function UIntSerializer() {
    UIntSerializer_instance = this;
    this.y11_1 = InlinePrimitiveDescriptor('kotlin.UInt', serializer_6(IntCompanionObject_instance));
  }
  protoOf(UIntSerializer).zj = function () {
    return this.y11_1;
  };
  protoOf(UIntSerializer).z11 = function (encoder, value) {
    var tmp = encoder.ao(this.y11_1);
    // Inline function 'kotlin.UInt.toInt' call
    var tmp$ret$0 = _UInt___get_data__impl__f0vqqw(value);
    tmp.un(tmp$ret$0);
  };
  protoOf(UIntSerializer).ak = function (encoder, value) {
    return this.z11(encoder, value instanceof UInt ? value.zi_1 : THROW_CCE());
  };
  protoOf(UIntSerializer).a12 = function (decoder) {
    // Inline function 'kotlin.toUInt' call
    var this_0 = decoder.tm(this.y11_1).nm();
    return _UInt___init__impl__l7qpdl(this_0);
  };
  protoOf(UIntSerializer).bk = function (decoder) {
    return new UInt(this.a12(decoder));
  };
  var UIntSerializer_instance;
  function UIntSerializer_getInstance() {
    if (UIntSerializer_instance == null)
      new UIntSerializer();
    return UIntSerializer_instance;
  }
  function UShortSerializer() {
    UShortSerializer_instance = this;
    this.b12_1 = InlinePrimitiveDescriptor('kotlin.UShort', serializer_8(ShortCompanionObject_instance));
  }
  protoOf(UShortSerializer).zj = function () {
    return this.b12_1;
  };
  protoOf(UShortSerializer).c12 = function (encoder, value) {
    var tmp = encoder.ao(this.b12_1);
    // Inline function 'kotlin.UShort.toShort' call
    var tmp$ret$0 = _UShort___get_data__impl__g0245(value);
    tmp.tn(tmp$ret$0);
  };
  protoOf(UShortSerializer).ak = function (encoder, value) {
    return this.c12(encoder, value instanceof UShort ? value.tj_1 : THROW_CCE());
  };
  protoOf(UShortSerializer).d12 = function (decoder) {
    // Inline function 'kotlin.toUShort' call
    var this_0 = decoder.tm(this.b12_1).mm();
    return _UShort___init__impl__jigrne(this_0);
  };
  protoOf(UShortSerializer).bk = function (decoder) {
    return new UShort(this.d12(decoder));
  };
  var UShortSerializer_instance;
  function UShortSerializer_getInstance() {
    if (UShortSerializer_instance == null)
      new UShortSerializer();
    return UShortSerializer_instance;
  }
  function UByteSerializer() {
    UByteSerializer_instance = this;
    this.e12_1 = InlinePrimitiveDescriptor('kotlin.UByte', serializer_10(ByteCompanionObject_instance));
  }
  protoOf(UByteSerializer).zj = function () {
    return this.e12_1;
  };
  protoOf(UByteSerializer).f12 = function (encoder, value) {
    var tmp = encoder.ao(this.e12_1);
    // Inline function 'kotlin.UByte.toByte' call
    var tmp$ret$0 = _UByte___get_data__impl__jof9qr(value);
    tmp.sn(tmp$ret$0);
  };
  protoOf(UByteSerializer).ak = function (encoder, value) {
    return this.f12(encoder, value instanceof UByte ? value.pi_1 : THROW_CCE());
  };
  protoOf(UByteSerializer).g12 = function (decoder) {
    // Inline function 'kotlin.toUByte' call
    var this_0 = decoder.tm(this.e12_1).lm();
    return _UByte___init__impl__g9hnc4(this_0);
  };
  protoOf(UByteSerializer).bk = function (decoder) {
    return new UByte(this.g12(decoder));
  };
  var UByteSerializer_instance;
  function UByteSerializer_getInstance() {
    if (UByteSerializer_instance == null)
      new UByteSerializer();
    return UByteSerializer_instance;
  }
  function get_EmptySerializersModuleLegacyJs() {
    _init_properties_SerializersModule_kt__u78ha3();
    return EmptySerializersModule;
  }
  var EmptySerializersModule;
  function SerializersModule() {
  }
  protoOf(SerializersModule).vk = function (kClass, typeArgumentsSerializers, $super) {
    typeArgumentsSerializers = typeArgumentsSerializers === VOID ? emptyList() : typeArgumentsSerializers;
    return $super === VOID ? this.wk(kClass, typeArgumentsSerializers) : $super.wk.call(this, kClass, typeArgumentsSerializers);
  };
  function SerialModuleImpl(class2ContextualFactory, polyBase2Serializers, polyBase2DefaultSerializerProvider, polyBase2NamedSerializers, polyBase2DefaultDeserializerProvider, hasInterfaceContextualSerializers) {
    SerializersModule.call(this);
    this.i12_1 = class2ContextualFactory;
    this.j12_1 = polyBase2Serializers;
    this.k12_1 = polyBase2DefaultSerializerProvider;
    this.l12_1 = polyBase2NamedSerializers;
    this.m12_1 = polyBase2DefaultDeserializerProvider;
    this.n12_1 = hasInterfaceContextualSerializers;
  }
  protoOf(SerialModuleImpl).uk = function () {
    return this.n12_1;
  };
  protoOf(SerialModuleImpl).qo = function (baseClass, value) {
    if (!baseClass.n9(value))
      return null;
    var tmp0_safe_receiver = this.j12_1.y1(baseClass);
    var tmp = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.y1(getKClassFromExpression(value));
    var registered = (!(tmp == null) ? isInterface(tmp, SerializationStrategy) : false) ? tmp : null;
    if (!(registered == null))
      return registered;
    var tmp_0 = this.k12_1.y1(baseClass);
    var tmp1_safe_receiver = (!(tmp_0 == null) ? typeof tmp_0 === 'function' : false) ? tmp_0 : null;
    return tmp1_safe_receiver == null ? null : tmp1_safe_receiver(value);
  };
  protoOf(SerialModuleImpl).po = function (baseClass, serializedClassName) {
    var tmp0_safe_receiver = this.l12_1.y1(baseClass);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.collections.get' call
      tmp = (isInterface(tmp0_safe_receiver, KtMap) ? tmp0_safe_receiver : THROW_CCE()).y1(serializedClassName);
    }
    var tmp_0 = tmp;
    var registered = (!(tmp_0 == null) ? isInterface(tmp_0, KSerializer) : false) ? tmp_0 : null;
    if (!(registered == null))
      return registered;
    var tmp_1 = this.m12_1.y1(baseClass);
    var tmp1_safe_receiver = (!(tmp_1 == null) ? typeof tmp_1 === 'function' : false) ? tmp_1 : null;
    return tmp1_safe_receiver == null ? null : tmp1_safe_receiver(serializedClassName);
  };
  protoOf(SerialModuleImpl).wk = function (kClass, typeArgumentsSerializers) {
    var tmp0_safe_receiver = this.i12_1.y1(kClass);
    var tmp = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.o12(typeArgumentsSerializers);
    return (tmp == null ? true : isInterface(tmp, KSerializer)) ? tmp : null;
  };
  protoOf(SerialModuleImpl).h12 = function (collector) {
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = this.i12_1.b2().g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      // Inline function 'kotlin.collections.component1' call
      var kclass = element.u1();
      // Inline function 'kotlin.collections.component2' call
      var serial = element.v1();
      if (serial instanceof Argless) {
        var tmp = isInterface(kclass, KClass) ? kclass : THROW_CCE();
        var tmp_0 = serial.r12_1;
        collector.s12(tmp, isInterface(tmp_0, KSerializer) ? tmp_0 : THROW_CCE());
      } else {
        if (serial instanceof WithTypeArguments) {
          collector.q12(kclass, serial.p12_1);
        } else {
          noWhenBranchMatchedException();
        }
      }
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_0 = this.j12_1.b2().g();
    while (_iterator__ex2g4s_0.h()) {
      var element_0 = _iterator__ex2g4s_0.i();
      // Inline function 'kotlin.collections.component1' call
      var baseClass = element_0.u1();
      // Inline function 'kotlin.collections.component2' call
      var classMap = element_0.v1();
      // Inline function 'kotlin.collections.forEach' call
      // Inline function 'kotlin.collections.iterator' call
      var _iterator__ex2g4s_1 = classMap.b2().g();
      while (_iterator__ex2g4s_1.h()) {
        var element_1 = _iterator__ex2g4s_1.i();
        // Inline function 'kotlin.collections.component1' call
        var actualClass = element_1.u1();
        // Inline function 'kotlin.collections.component2' call
        var serializer = element_1.v1();
        var tmp_1 = isInterface(baseClass, KClass) ? baseClass : THROW_CCE();
        var tmp_2 = isInterface(actualClass, KClass) ? actualClass : THROW_CCE();
        // Inline function 'kotlinx.serialization.internal.cast' call
        var tmp$ret$11 = isInterface(serializer, KSerializer) ? serializer : THROW_CCE();
        collector.t12(tmp_1, tmp_2, tmp$ret$11);
      }
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_2 = this.k12_1.b2().g();
    while (_iterator__ex2g4s_2.h()) {
      var element_2 = _iterator__ex2g4s_2.i();
      // Inline function 'kotlin.collections.component1' call
      var baseClass_0 = element_2.u1();
      // Inline function 'kotlin.collections.component2' call
      var provider = element_2.v1();
      var tmp_3 = isInterface(baseClass_0, KClass) ? baseClass_0 : THROW_CCE();
      collector.u12(tmp_3, typeof provider === 'function' ? provider : THROW_CCE());
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_3 = this.m12_1.b2().g();
    while (_iterator__ex2g4s_3.h()) {
      var element_3 = _iterator__ex2g4s_3.i();
      // Inline function 'kotlin.collections.component1' call
      var baseClass_1 = element_3.u1();
      // Inline function 'kotlin.collections.component2' call
      var provider_0 = element_3.v1();
      var tmp_4 = isInterface(baseClass_1, KClass) ? baseClass_1 : THROW_CCE();
      collector.v12(tmp_4, typeof provider_0 === 'function' ? provider_0 : THROW_CCE());
    }
  };
  function Argless() {
  }
  function WithTypeArguments() {
  }
  function ContextualProvider() {
  }
  var properties_initialized_SerializersModule_kt_fjigjn;
  function _init_properties_SerializersModule_kt__u78ha3() {
    if (!properties_initialized_SerializersModule_kt_fjigjn) {
      properties_initialized_SerializersModule_kt_fjigjn = true;
      EmptySerializersModule = new SerialModuleImpl(emptyMap(), emptyMap(), emptyMap(), emptyMap(), emptyMap(), false);
    }
  }
  function EmptySerializersModule_0() {
    return get_EmptySerializersModuleLegacyJs();
  }
  function SerializersModuleCollector$contextual$lambda($serializer) {
    return function (it) {
      return $serializer;
    };
  }
  function SerializersModuleCollector() {
  }
  function SerializableWith(serializer) {
    this.w12_1 = serializer;
  }
  protoOf(SerializableWith).equals = function (other) {
    if (!(other instanceof SerializableWith))
      return false;
    var tmp0_other_with_cast = other instanceof SerializableWith ? other : THROW_CCE();
    if (!this.w12_1.equals(tmp0_other_with_cast.w12_1))
      return false;
    return true;
  };
  protoOf(SerializableWith).hashCode = function () {
    return imul(getStringHashCode('serializer'), 127) ^ this.w12_1.hashCode();
  };
  protoOf(SerializableWith).toString = function () {
    return '@kotlinx.serialization.SerializableWith(' + 'serializer=' + toString(this.w12_1) + ')';
  };
  function createCache(factory) {
    return new createCache$1(factory);
  }
  function createParametrizedCache(factory) {
    return new createParametrizedCache$1(factory);
  }
  function isInterface_0(_this__u8e3s4) {
    return get_isInterfaceHack(_this__u8e3s4);
  }
  function initBuiltins() {
    return mapOf([to(PrimitiveClasses_getInstance().la(), serializer_0(StringCompanionObject_instance)), to(getKClass(Char), serializer_1(Companion_getInstance_2())), to(PrimitiveClasses_getInstance().oa(), CharArraySerializer()), to(PrimitiveClasses_getInstance().ja(), serializer_2(DoubleCompanionObject_instance)), to(PrimitiveClasses_getInstance().ua(), DoubleArraySerializer()), to(PrimitiveClasses_getInstance().ia(), serializer_3(FloatCompanionObject_instance)), to(PrimitiveClasses_getInstance().ta(), FloatArraySerializer()), to(getKClass(Long), serializer_4(Companion_getInstance_3())), to(PrimitiveClasses_getInstance().sa(), LongArraySerializer()), to(getKClass(ULong), serializer_5(Companion_getInstance_4())), to(getKClass(ULongArray), ULongArraySerializer()), to(PrimitiveClasses_getInstance().ha(), serializer_6(IntCompanionObject_instance)), to(PrimitiveClasses_getInstance().ra(), IntArraySerializer()), to(getKClass(UInt), serializer_7(Companion_getInstance_5())), to(getKClass(UIntArray), UIntArraySerializer()), to(PrimitiveClasses_getInstance().ga(), serializer_8(ShortCompanionObject_instance)), to(PrimitiveClasses_getInstance().qa(), ShortArraySerializer()), to(getKClass(UShort), serializer_9(Companion_getInstance_6())), to(getKClass(UShortArray), UShortArraySerializer()), to(PrimitiveClasses_getInstance().fa(), serializer_10(ByteCompanionObject_instance)), to(PrimitiveClasses_getInstance().pa(), ByteArraySerializer()), to(getKClass(UByte), serializer_11(Companion_getInstance_7())), to(getKClass(UByteArray), UByteArraySerializer()), to(PrimitiveClasses_getInstance().ea(), serializer_12(BooleanCompanionObject_instance)), to(PrimitiveClasses_getInstance().na(), BooleanArraySerializer()), to(getKClass(Unit), serializer_13(Unit_instance)), to(PrimitiveClasses_getInstance().da(), NothingSerializer()), to(getKClass(Duration), serializer_14(Companion_getInstance())), to(getKClass(Instant), serializer_15(Companion_getInstance_0())), to(getKClass(Uuid), serializer_16(Companion_getInstance_1()))]);
  }
  function get_isInterfaceHack(_this__u8e3s4) {
    if (_this__u8e3s4 === PrimitiveClasses_getInstance().da())
      return false;
    // Inline function 'kotlin.js.asDynamic' call
    var tmp0_safe_receiver = get_js(_this__u8e3s4).$metadata$;
    return (tmp0_safe_receiver == null ? null : tmp0_safe_receiver.kind) == 'interface';
  }
  function compiledSerializerImpl(_this__u8e3s4) {
    var tmp0_elvis_lhs = constructSerializerForGivenTypeArgs(_this__u8e3s4, []);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      var tmp_0;
      if (_this__u8e3s4 === PrimitiveClasses_getInstance().da()) {
        tmp_0 = NothingSerializer_getInstance();
      } else {
        // Inline function 'kotlin.js.asDynamic' call
        var tmp1_safe_receiver = get_js(_this__u8e3s4).Companion;
        tmp_0 = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.serializer();
      }
      var tmp_1 = tmp_0;
      tmp = (!(tmp_1 == null) ? isInterface(tmp_1, KSerializer) : false) ? tmp_1 : null;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function platformSpecificSerializerNotRegistered(_this__u8e3s4) {
    throw SerializationException_init_$Create$_0(notRegisteredMessage(_this__u8e3s4) + 'To get enum serializer on Kotlin/JS, it should be annotated with @Serializable annotation.');
  }
  function isReferenceArray(rootClass) {
    return rootClass.equals(PrimitiveClasses_getInstance().ka());
  }
  function constructSerializerForGivenTypeArgs(_this__u8e3s4, args) {
    var tmp;
    try {
      // Inline function 'kotlin.reflect.findAssociatedObject' call
      var assocObject = findAssociatedObject(_this__u8e3s4, getKClass(SerializableWith));
      var tmp_0;
      if (!(assocObject == null) ? isInterface(assocObject, KSerializer) : false) {
        tmp_0 = isInterface(assocObject, KSerializer) ? assocObject : THROW_CCE();
      } else {
        if (!(assocObject == null) ? isInterface(assocObject, SerializerFactory) : false) {
          var tmp_1 = assocObject.pu(args.slice());
          tmp_0 = isInterface(tmp_1, KSerializer) ? tmp_1 : THROW_CCE();
        } else {
          tmp_0 = null;
        }
      }
      tmp = tmp_0;
    } catch ($p) {
      var tmp_2;
      var e = $p;
      tmp_2 = null;
      tmp = tmp_2;
    }
    return tmp;
  }
  function toNativeArrayImpl(_this__u8e3s4, eClass) {
    // Inline function 'kotlin.collections.toTypedArray' call
    return copyToArray(_this__u8e3s4);
  }
  function getChecked(_this__u8e3s4, index) {
    if (!(0 <= index ? index <= (_this__u8e3s4.length - 1 | 0) : false))
      throw IndexOutOfBoundsException_init_$Create$('Index ' + index + ' out of bounds ' + get_indices(_this__u8e3s4).toString());
    return _this__u8e3s4[index];
  }
  function getChecked_0(_this__u8e3s4, index) {
    if (!(0 <= index ? index <= (_this__u8e3s4.length - 1 | 0) : false))
      throw IndexOutOfBoundsException_init_$Create$('Index ' + index + ' out of bounds ' + get_indices_0(_this__u8e3s4).toString());
    return _this__u8e3s4[index];
  }
  function createCache$1($factory) {
    this.x12_1 = $factory;
  }
  protoOf(createCache$1).xk = function (key) {
    return this.x12_1(key);
  };
  function createParametrizedCache$1($factory) {
    this.y12_1 = $factory;
  }
  protoOf(createParametrizedCache$1).yk = function (key, types) {
    // Inline function 'kotlin.runCatching' call
    var tmp;
    try {
      // Inline function 'kotlin.Companion.success' call
      var value = this.y12_1(key, types);
      tmp = _Result___init__impl__xyqfz8(value);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Error) {
        var e = $p;
        // Inline function 'kotlin.Companion.failure' call
        tmp_0 = _Result___init__impl__xyqfz8(createFailure(e));
      } else {
        throw $p;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  //region block: post-declaration
  protoOf(SerialDescriptorImpl).zk = get_isNullable;
  protoOf(SerialDescriptorImpl).fl = get_isInline;
  protoOf(AbstractDecoder).jn = decodeSerializableElement$default;
  protoOf(AbstractDecoder).vm = decodeSerializableValue;
  protoOf(AbstractDecoder).ln = decodeSequentially;
  protoOf(AbstractDecoder).nn = decodeCollectionSize;
  protoOf(AbstractEncoder).no = encodeNotNullMark;
  protoOf(AbstractEncoder).oo = beginCollection;
  protoOf(AbstractEncoder).mo = encodeSerializableValue;
  protoOf(ListLikeDescriptor).zk = get_isNullable;
  protoOf(ListLikeDescriptor).fl = get_isInline;
  protoOf(ListLikeDescriptor).hl = get_annotations;
  protoOf(MapLikeDescriptor).zk = get_isNullable;
  protoOf(MapLikeDescriptor).fl = get_isInline;
  protoOf(MapLikeDescriptor).hl = get_annotations;
  protoOf(PluginGeneratedSerialDescriptor).zk = get_isNullable;
  protoOf(PluginGeneratedSerialDescriptor).fl = get_isInline;
  protoOf(InlinePrimitiveDescriptor$1).du = typeParametersSerializers;
  protoOf(NothingSerialDescriptor).zk = get_isNullable;
  protoOf(NothingSerialDescriptor).fl = get_isInline;
  protoOf(NothingSerialDescriptor).hl = get_annotations;
  protoOf(PrimitiveSerialDescriptor_0).zk = get_isNullable;
  protoOf(PrimitiveSerialDescriptor_0).fl = get_isInline;
  protoOf(PrimitiveSerialDescriptor_0).hl = get_annotations;
  protoOf(TaggedDecoder).jn = decodeSerializableElement$default;
  protoOf(TaggedDecoder).vm = decodeSerializableValue;
  protoOf(TaggedDecoder).ln = decodeSequentially;
  protoOf(TaggedDecoder).nn = decodeCollectionSize;
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = SerializationException_init_$Init$_0;
  _.$_$.b = SEALED_getInstance;
  _.$_$.c = STRING_getInstance;
  _.$_$.d = CONTEXTUAL_getInstance;
  _.$_$.e = ENUM_getInstance;
  _.$_$.f = CLASS_getInstance;
  _.$_$.g = LIST_getInstance;
  _.$_$.h = MAP_getInstance;
  _.$_$.i = OBJECT_getInstance;
  _.$_$.j = ListSerializer;
  _.$_$.k = MapSerializer;
  _.$_$.l = serializer_0;
  _.$_$.m = serializer_9;
  _.$_$.n = serializer_7;
  _.$_$.o = serializer_11;
  _.$_$.p = serializer_5;
  _.$_$.q = PolymorphicKind;
  _.$_$.r = PrimitiveKind;
  _.$_$.s = PrimitiveSerialDescriptor;
  _.$_$.t = get_annotations;
  _.$_$.u = get_isInline;
  _.$_$.v = get_isNullable;
  _.$_$.w = SerialDescriptor;
  _.$_$.x = ENUM;
  _.$_$.y = buildSerialDescriptor;
  _.$_$.z = getContextualDescriptor;
  _.$_$.a1 = AbstractDecoder;
  _.$_$.b1 = AbstractEncoder;
  _.$_$.c1 = CompositeDecoder;
  _.$_$.d1 = Decoder;
  _.$_$.e1 = Encoder;
  _.$_$.f1 = AbstractPolymorphicSerializer;
  _.$_$.g1 = ElementMarker;
  _.$_$.h1 = InlinePrimitiveDescriptor;
  _.$_$.i1 = NamedValueDecoder;
  _.$_$.j1 = SerializerFactory;
  _.$_$.k1 = jsonCachedSerialNames;
  _.$_$.l1 = EmptySerializersModule_0;
  _.$_$.m1 = contextual;
  _.$_$.n1 = SerializersModuleCollector;
  _.$_$.o1 = DeserializationStrategy;
  _.$_$.p1 = KSerializer;
  _.$_$.q1 = MissingFieldException;
  _.$_$.r1 = SealedClassSerializer;
  _.$_$.s1 = SerializationException;
  _.$_$.t1 = SerializationStrategy;
  _.$_$.u1 = findPolymorphicSerializer_0;
  _.$_$.v1 = findPolymorphicSerializer;
  _.$_$.w1 = serializer;
  //endregion
  return _;
}));

//# sourceMappingURL=kotlinx-serialization-kotlinx-serialization-core.js.map
