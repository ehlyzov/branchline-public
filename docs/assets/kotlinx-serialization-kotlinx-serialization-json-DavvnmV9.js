(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlinx-serialization-kotlinx-serialization-core.js', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlinx-serialization-kotlinx-serialization-core.js'), require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlinx-serialization-kotlinx-serialization-core'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-serialization-kotlinx-serialization-json'. Its dependency 'kotlinx-serialization-kotlinx-serialization-core' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-core' is loaded prior to 'kotlinx-serialization-kotlinx-serialization-json'.");
    }
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-serialization-kotlinx-serialization-json'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kotlinx-serialization-kotlinx-serialization-json'.");
    }
    globalThis['kotlinx-serialization-kotlinx-serialization-json'] = factory(typeof globalThis['kotlinx-serialization-kotlinx-serialization-json'] === 'undefined' ? {} : globalThis['kotlinx-serialization-kotlinx-serialization-json'], globalThis['kotlinx-serialization-kotlinx-serialization-core'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var EmptySerializersModule = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l1;
  var protoOf = kotlin_kotlin.$_$.o8;
  var initMetadataForObject = kotlin_kotlin.$_$.t7;
  var VOID = kotlin_kotlin.$_$.e;
  var Unit_instance = kotlin_kotlin.$_$.y3;
  var initMetadataForClass = kotlin_kotlin.$_$.o7;
  var toString = kotlin_kotlin.$_$.r8;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.b1;
  var charSequenceLength = kotlin_kotlin.$_$.f7;
  var charSequenceGet = kotlin_kotlin.$_$.e7;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.o1;
  var equals = kotlin_kotlin.$_$.j7;
  var toString_0 = kotlin_kotlin.$_$.ac;
  var Enum = kotlin_kotlin.$_$.wa;
  var Decoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.d1;
  var CompositeDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c1;
  var initMetadataForInterface = kotlin_kotlin.$_$.r7;
  var initMetadataForCompanion = kotlin_kotlin.$_$.p7;
  var SerializerFactory = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j1;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.y;
  var hashCode = kotlin_kotlin.$_$.n7;
  var joinToString = kotlin_kotlin.$_$.r5;
  var THROW_CCE = kotlin_kotlin.$_$.db;
  var KtMap = kotlin_kotlin.$_$.i4;
  var KtList = kotlin_kotlin.$_$.g4;
  var toDoubleOrNull = kotlin_kotlin.$_$.aa;
  var getKClassFromExpression = kotlin_kotlin.$_$.c;
  var getBooleanHashCode = kotlin_kotlin.$_$.k7;
  var getStringHashCode = kotlin_kotlin.$_$.m7;
  var toDouble = kotlin_kotlin.$_$.ba;
  var StringCompanionObject_instance = kotlin_kotlin.$_$.l3;
  var serializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l;
  var InlinePrimitiveDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.h1;
  var SEALED_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b;
  var buildSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.y;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.yb;
  var KSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.p1;
  var ENUM_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e;
  var STRING_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c;
  var MapSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k;
  var SerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.w;
  var ListSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j;
  var PrimitiveSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.s;
  var toLongOrNull = kotlin_kotlin.$_$.ea;
  var toULongOrNull = kotlin_kotlin.$_$.ia;
  var ULong = kotlin_kotlin.$_$.kb;
  var Companion_getInstance = kotlin_kotlin.$_$.w3;
  var serializer_0 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.p;
  var _ULong___get_data__impl__fggpzb = kotlin_kotlin.$_$.o2;
  var toBooleanStrictOrNull = kotlin_kotlin.$_$.z9;
  var isInterface = kotlin_kotlin.$_$.c8;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.d1;
  var KProperty1 = kotlin_kotlin.$_$.z8;
  var getPropertyCallableRef = kotlin_kotlin.$_$.l7;
  var lazy = kotlin_kotlin.$_$.xb;
  var get_isNullable = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.v;
  var get_isInline = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.u;
  var get_annotations = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.t;
  var Encoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e1;
  var toLong = kotlin_kotlin.$_$.q8;
  var _UInt___init__impl__l7qpdl = kotlin_kotlin.$_$.e2;
  var UInt__toString_impl_dbgl21 = kotlin_kotlin.$_$.g2;
  var _ULong___init__impl__c78o9k = kotlin_kotlin.$_$.n2;
  var ULong__toString_impl_f9au7k = kotlin_kotlin.$_$.p2;
  var _UByte___init__impl__g9hnc4 = kotlin_kotlin.$_$.v1;
  var UByte__toString_impl_v72jg = kotlin_kotlin.$_$.x1;
  var _UShort___init__impl__jigrne = kotlin_kotlin.$_$.w2;
  var UShort__toString_impl_edaoee = kotlin_kotlin.$_$.y2;
  var ElementMarker = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.g1;
  var captureStack = kotlin_kotlin.$_$.a7;
  var charSequenceSubSequence = kotlin_kotlin.$_$.g7;
  var coerceAtLeast = kotlin_kotlin.$_$.t8;
  var coerceAtMost = kotlin_kotlin.$_$.u8;
  var SerializationException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.s1;
  var SerializationException_init_$Init$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.a;
  var Collection = kotlin_kotlin.$_$.a4;
  var CLASS_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.f;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.s;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.j;
  var singleOrNull = kotlin_kotlin.$_$.g6;
  var emptyMap = kotlin_kotlin.$_$.i5;
  var getValue = kotlin_kotlin.$_$.n5;
  var copyOf = kotlin_kotlin.$_$.c5;
  var arrayCopy = kotlin_kotlin.$_$.o4;
  var LIST_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.g;
  var CONTEXTUAL_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.d;
  var PolymorphicKind = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.q;
  var PrimitiveKind = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.r;
  var MAP_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.h;
  var ENUM = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.x;
  var contextual = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.m1;
  var SerializersModuleCollector = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.n1;
  var DeepRecursiveFunction = kotlin_kotlin.$_$.ua;
  var invoke = kotlin_kotlin.$_$.tb;
  var CoroutineImpl = kotlin_kotlin.$_$.v6;
  var DeepRecursiveScope = kotlin_kotlin.$_$.va;
  var Unit = kotlin_kotlin.$_$.nb;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.u6;
  var initMetadataForLambda = kotlin_kotlin.$_$.s7;
  var initMetadataForCoroutine = kotlin_kotlin.$_$.q7;
  var SealedClassSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.r1;
  var jsonCachedSerialNames = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k1;
  var AbstractDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.a1;
  var AbstractPolymorphicSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.f1;
  var DeserializationStrategy = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.o1;
  var getKClass = kotlin_kotlin.$_$.d;
  var findPolymorphicSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.u1;
  var ensureNotNull = kotlin_kotlin.$_$.sb;
  var substringBefore = kotlin_kotlin.$_$.x9;
  var removeSuffix = kotlin_kotlin.$_$.s9;
  var substringAfter = kotlin_kotlin.$_$.w9;
  var contains = kotlin_kotlin.$_$.g9;
  var plus = kotlin_kotlin.$_$.zb;
  var MissingFieldException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.q1;
  var IllegalArgumentException = kotlin_kotlin.$_$.ya;
  var isFinite = kotlin_kotlin.$_$.vb;
  var isFinite_0 = kotlin_kotlin.$_$.ub;
  var charCodeAt = kotlin_kotlin.$_$.d7;
  var toUInt = kotlin_kotlin.$_$.ha;
  var _UInt___get_data__impl__f0vqqw = kotlin_kotlin.$_$.f2;
  var toULong = kotlin_kotlin.$_$.ja;
  var toUByte = kotlin_kotlin.$_$.ga;
  var _UByte___get_data__impl__jof9qr = kotlin_kotlin.$_$.w1;
  var toUShort = kotlin_kotlin.$_$.ka;
  var _UShort___get_data__impl__g0245 = kotlin_kotlin.$_$.x2;
  var objectCreate = kotlin_kotlin.$_$.n8;
  var AbstractEncoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b1;
  var OBJECT_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.i;
  var findPolymorphicSerializer_0 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.v1;
  var SerializationStrategy = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.t1;
  var toString_1 = kotlin_kotlin.$_$.r1;
  var Companion_getInstance_0 = kotlin_kotlin.$_$.v3;
  var serializer_1 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.n;
  var Companion_getInstance_1 = kotlin_kotlin.$_$.u3;
  var serializer_2 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.o;
  var Companion_getInstance_2 = kotlin_kotlin.$_$.x3;
  var serializer_3 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.m;
  var setOf = kotlin_kotlin.$_$.f6;
  var Char__toInt_impl_vasixd = kotlin_kotlin.$_$.q1;
  var numberToChar = kotlin_kotlin.$_$.j8;
  var equals_0 = kotlin_kotlin.$_$.i9;
  var toByte = kotlin_kotlin.$_$.p8;
  var startsWith = kotlin_kotlin.$_$.v9;
  var NamedValueDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.i1;
  var numberRangeToNumber = kotlin_kotlin.$_$.i8;
  var ClosedRange = kotlin_kotlin.$_$.s8;
  var contains_0 = kotlin_kotlin.$_$.v8;
  var single = kotlin_kotlin.$_$.u9;
  var Char = kotlin_kotlin.$_$.sa;
  var emptySet = kotlin_kotlin.$_$.j5;
  var plus_0 = kotlin_kotlin.$_$.b6;
  var toInt = kotlin_kotlin.$_$.da;
  var toList = kotlin_kotlin.$_$.m6;
  var enumEntries = kotlin_kotlin.$_$.w6;
  var getContextualDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.z;
  var last = kotlin_kotlin.$_$.v5;
  var removeLast = kotlin_kotlin.$_$.d6;
  var lastIndexOf = kotlin_kotlin.$_$.q9;
  var Long = kotlin_kotlin.$_$.za;
  var Char__minus_impl_a2frrh = kotlin_kotlin.$_$.p1;
  var numberToLong = kotlin_kotlin.$_$.m8;
  var charArray = kotlin_kotlin.$_$.c7;
  var indexOf = kotlin_kotlin.$_$.k9;
  var indexOf_0 = kotlin_kotlin.$_$.l9;
  var substring = kotlin_kotlin.$_$.y9;
  var StringBuilder_init_$Create$_0 = kotlin_kotlin.$_$.x;
  var HashMap_init_$Create$ = kotlin_kotlin.$_$.l;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(Json, 'Json');
  initMetadataForObject(Default, 'Default', VOID, Json);
  initMetadataForClass(JsonBuilder, 'JsonBuilder');
  initMetadataForClass(JsonImpl, 'JsonImpl', VOID, Json);
  initMetadataForClass(JsonClassDiscriminator, 'JsonClassDiscriminator');
  initMetadataForClass(JsonIgnoreUnknownKeys, 'JsonIgnoreUnknownKeys');
  initMetadataForClass(JsonNames, 'JsonNames');
  initMetadataForClass(JsonConfiguration, 'JsonConfiguration');
  initMetadataForClass(ClassDiscriminatorMode, 'ClassDiscriminatorMode', VOID, Enum);
  initMetadataForInterface(JsonDecoder, 'JsonDecoder', VOID, VOID, [Decoder, CompositeDecoder]);
  initMetadataForCompanion(Companion);
  initMetadataForClass(JsonElement, 'JsonElement', VOID, VOID, VOID, VOID, VOID, {0: JsonElementSerializer_getInstance});
  initMetadataForClass(JsonPrimitive, 'JsonPrimitive', VOID, JsonElement, VOID, VOID, VOID, {0: JsonPrimitiveSerializer_getInstance});
  initMetadataForObject(JsonNull, 'JsonNull', VOID, JsonPrimitive, [JsonPrimitive, SerializerFactory], VOID, VOID, {0: JsonNullSerializer_getInstance});
  initMetadataForCompanion(Companion_0);
  initMetadataForCompanion(Companion_1);
  initMetadataForClass(JsonObject, 'JsonObject', VOID, JsonElement, [JsonElement, KtMap], VOID, VOID, {0: JsonObjectSerializer_getInstance});
  initMetadataForCompanion(Companion_2);
  initMetadataForClass(JsonArray, 'JsonArray', VOID, JsonElement, [JsonElement, KtList], VOID, VOID, {0: JsonArraySerializer_getInstance});
  initMetadataForClass(JsonLiteral, 'JsonLiteral', VOID, JsonPrimitive);
  initMetadataForObject(JsonElementSerializer, 'JsonElementSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(JsonNullSerializer, 'JsonNullSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(JsonPrimitiveSerializer, 'JsonPrimitiveSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(JsonObjectDescriptor, 'JsonObjectDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForObject(JsonObjectSerializer, 'JsonObjectSerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(JsonArrayDescriptor, 'JsonArrayDescriptor', VOID, VOID, [SerialDescriptor]);
  initMetadataForObject(JsonArraySerializer, 'JsonArraySerializer', VOID, VOID, [KSerializer]);
  initMetadataForObject(JsonLiteralSerializer, 'JsonLiteralSerializer', VOID, VOID, [KSerializer]);
  initMetadataForClass(defer$1, VOID, VOID, VOID, [SerialDescriptor]);
  initMetadataForInterface(JsonEncoder, 'JsonEncoder', VOID, VOID, [Encoder]);
  initMetadataForClass(Composer, 'Composer');
  initMetadataForClass(ComposerForUnsignedNumbers, 'ComposerForUnsignedNumbers', VOID, Composer);
  initMetadataForClass(ComposerForUnquotedLiterals, 'ComposerForUnquotedLiterals', VOID, Composer);
  initMetadataForClass(ComposerWithPrettyPrint, 'ComposerWithPrettyPrint', VOID, Composer);
  initMetadataForClass(JsonElementMarker, 'JsonElementMarker');
  initMetadataForClass(JsonException, 'JsonException', VOID, SerializationException);
  initMetadataForClass(JsonDecodingException, 'JsonDecodingException', VOID, JsonException);
  initMetadataForClass(JsonEncodingException, 'JsonEncodingException', VOID, JsonException);
  initMetadataForObject(Tombstone, 'Tombstone');
  initMetadataForClass(JsonPath, 'JsonPath', JsonPath);
  initMetadataForClass(JsonSerializersModuleValidator, 'JsonSerializersModuleValidator', VOID, VOID, [SerializersModuleCollector]);
  initMetadataForLambda(JsonTreeReader$readDeepRecursive$slambda, CoroutineImpl, VOID, [2]);
  initMetadataForCoroutine($readObjectCOROUTINE$, CoroutineImpl);
  initMetadataForClass(JsonTreeReader, 'JsonTreeReader', VOID, VOID, VOID, [1]);
  initMetadataForClass(Key, 'Key', Key);
  initMetadataForClass(DescriptorSchemaCache, 'DescriptorSchemaCache', DescriptorSchemaCache);
  initMetadataForClass(DiscriminatorHolder, 'DiscriminatorHolder');
  initMetadataForClass(StreamingJsonDecoder, 'StreamingJsonDecoder', VOID, AbstractDecoder, [JsonDecoder, AbstractDecoder]);
  initMetadataForClass(JsonDecoderForUnsignedTypes, 'JsonDecoderForUnsignedTypes', VOID, AbstractDecoder);
  initMetadataForClass(StreamingJsonEncoder, 'StreamingJsonEncoder', VOID, AbstractEncoder, [JsonEncoder, AbstractEncoder]);
  initMetadataForClass(AbstractJsonTreeDecoder, 'AbstractJsonTreeDecoder', VOID, NamedValueDecoder, [NamedValueDecoder, JsonDecoder]);
  initMetadataForClass(JsonTreeDecoder, 'JsonTreeDecoder', VOID, AbstractJsonTreeDecoder);
  initMetadataForClass(JsonTreeListDecoder, 'JsonTreeListDecoder', VOID, AbstractJsonTreeDecoder);
  initMetadataForClass(JsonPrimitiveDecoder, 'JsonPrimitiveDecoder', VOID, AbstractJsonTreeDecoder);
  initMetadataForClass(JsonTreeMapDecoder, 'JsonTreeMapDecoder', VOID, JsonTreeDecoder);
  initMetadataForClass(WriteMode, 'WriteMode', VOID, Enum);
  initMetadataForClass(AbstractJsonLexer, 'AbstractJsonLexer');
  initMetadataForObject(CharMappings, 'CharMappings');
  initMetadataForClass(StringJsonLexer, 'StringJsonLexer', VOID, AbstractJsonLexer);
  initMetadataForClass(StringJsonLexerWithComments, 'StringJsonLexerWithComments', VOID, StringJsonLexer);
  initMetadataForClass(JsonToStringWriter, 'JsonToStringWriter', JsonToStringWriter);
  //endregion
  function Default() {
    Default_instance = this;
    Json.call(this, new JsonConfiguration(), EmptySerializersModule());
  }
  var Default_instance;
  function Default_getInstance() {
    if (Default_instance == null)
      new Default();
    return Default_instance;
  }
  function Json(configuration, serializersModule) {
    Default_getInstance();
    this.z12_1 = configuration;
    this.a13_1 = serializersModule;
    this.b13_1 = new DescriptorSchemaCache();
  }
  protoOf(Json).kn = function () {
    return this.a13_1;
  };
  protoOf(Json).c13 = function (serializer, value) {
    var result = new JsonToStringWriter();
    try {
      encodeByWriter(this, result, serializer, value);
      return result.toString();
    }finally {
      result.g13();
    }
  };
  protoOf(Json).d13 = function (deserializer, string) {
    var lexer = StringJsonLexer_0(this, string);
    var input = new StreamingJsonDecoder(this, WriteMode_OBJ_getInstance(), lexer, deserializer.zj(), null);
    var result = input.vm(deserializer);
    lexer.t13();
    return result;
  };
  protoOf(Json).e13 = function (string) {
    return this.d13(JsonElementSerializer_getInstance(), string);
  };
  function Json_0(from, builderAction) {
    from = from === VOID ? Default_getInstance() : from;
    var builder = new JsonBuilder(from);
    builderAction(builder);
    var conf = builder.m14();
    return new JsonImpl(conf, builder.l14_1);
  }
  function JsonBuilder(json) {
    this.u13_1 = json.z12_1.n14_1;
    this.v13_1 = json.z12_1.s14_1;
    this.w13_1 = json.z12_1.o14_1;
    this.x13_1 = json.z12_1.p14_1;
    this.y13_1 = json.z12_1.r14_1;
    this.z13_1 = json.z12_1.t14_1;
    this.a14_1 = json.z12_1.u14_1;
    this.b14_1 = json.z12_1.w14_1;
    this.c14_1 = json.z12_1.d15_1;
    this.d14_1 = json.z12_1.y14_1;
    this.e14_1 = json.z12_1.z14_1;
    this.f14_1 = json.z12_1.a15_1;
    this.g14_1 = json.z12_1.b15_1;
    this.h14_1 = json.z12_1.c15_1;
    this.i14_1 = json.z12_1.x14_1;
    this.j14_1 = json.z12_1.q14_1;
    this.k14_1 = json.z12_1.v14_1;
    this.l14_1 = json.kn();
  }
  protoOf(JsonBuilder).m14 = function () {
    if (this.k14_1) {
      // Inline function 'kotlin.require' call
      if (!(this.b14_1 === 'type')) {
        var message = 'Class discriminator should not be specified when array polymorphism is specified';
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
      // Inline function 'kotlin.require' call
      if (!this.c14_1.equals(ClassDiscriminatorMode_POLYMORPHIC_getInstance())) {
        var message_0 = 'useArrayPolymorphism option can only be used if classDiscriminatorMode in a default POLYMORPHIC state.';
        throw IllegalArgumentException_init_$Create$(toString(message_0));
      }
    }
    if (!this.y13_1) {
      // Inline function 'kotlin.require' call
      if (!(this.z13_1 === '    ')) {
        var message_1 = 'Indent should not be specified when default printing mode is used';
        throw IllegalArgumentException_init_$Create$(toString(message_1));
      }
    } else if (!(this.z13_1 === '    ')) {
      var tmp0 = this.z13_1;
      var tmp$ret$7;
      $l$block: {
        // Inline function 'kotlin.text.all' call
        var inductionVariable = 0;
        while (inductionVariable < charSequenceLength(tmp0)) {
          var element = charSequenceGet(tmp0, inductionVariable);
          inductionVariable = inductionVariable + 1 | 0;
          if (!(element === _Char___init__impl__6a9atx(32) || element === _Char___init__impl__6a9atx(9) || element === _Char___init__impl__6a9atx(13) || element === _Char___init__impl__6a9atx(10))) {
            tmp$ret$7 = false;
            break $l$block;
          }
        }
        tmp$ret$7 = true;
      }
      var allWhitespaces = tmp$ret$7;
      // Inline function 'kotlin.require' call
      if (!allWhitespaces) {
        var message_2 = 'Only whitespace, tab, newline and carriage return are allowed as pretty print symbols. Had ' + this.z13_1;
        throw IllegalArgumentException_init_$Create$(toString(message_2));
      }
    }
    return new JsonConfiguration(this.u13_1, this.w13_1, this.x13_1, this.j14_1, this.y13_1, this.v13_1, this.z13_1, this.a14_1, this.k14_1, this.b14_1, this.i14_1, this.d14_1, this.e14_1, this.f14_1, this.g14_1, this.h14_1, this.c14_1);
  };
  function validateConfiguration($this) {
    if (equals($this.kn(), EmptySerializersModule()))
      return Unit_instance;
    var collector = new JsonSerializersModuleValidator($this.z12_1);
    $this.kn().h12(collector);
  }
  function JsonImpl(configuration, module_0) {
    Json.call(this, configuration, module_0);
    validateConfiguration(this);
  }
  function JsonClassDiscriminator() {
  }
  function JsonIgnoreUnknownKeys() {
  }
  function JsonNames() {
  }
  function JsonConfiguration(encodeDefaults, ignoreUnknownKeys, isLenient, allowStructuredMapKeys, prettyPrint, explicitNulls, prettyPrintIndent, coerceInputValues, useArrayPolymorphism, classDiscriminator, allowSpecialFloatingPointValues, useAlternativeNames, namingStrategy, decodeEnumsCaseInsensitive, allowTrailingComma, allowComments, classDiscriminatorMode) {
    encodeDefaults = encodeDefaults === VOID ? false : encodeDefaults;
    ignoreUnknownKeys = ignoreUnknownKeys === VOID ? false : ignoreUnknownKeys;
    isLenient = isLenient === VOID ? false : isLenient;
    allowStructuredMapKeys = allowStructuredMapKeys === VOID ? false : allowStructuredMapKeys;
    prettyPrint = prettyPrint === VOID ? false : prettyPrint;
    explicitNulls = explicitNulls === VOID ? true : explicitNulls;
    prettyPrintIndent = prettyPrintIndent === VOID ? '    ' : prettyPrintIndent;
    coerceInputValues = coerceInputValues === VOID ? false : coerceInputValues;
    useArrayPolymorphism = useArrayPolymorphism === VOID ? false : useArrayPolymorphism;
    classDiscriminator = classDiscriminator === VOID ? 'type' : classDiscriminator;
    allowSpecialFloatingPointValues = allowSpecialFloatingPointValues === VOID ? false : allowSpecialFloatingPointValues;
    useAlternativeNames = useAlternativeNames === VOID ? true : useAlternativeNames;
    namingStrategy = namingStrategy === VOID ? null : namingStrategy;
    decodeEnumsCaseInsensitive = decodeEnumsCaseInsensitive === VOID ? false : decodeEnumsCaseInsensitive;
    allowTrailingComma = allowTrailingComma === VOID ? false : allowTrailingComma;
    allowComments = allowComments === VOID ? false : allowComments;
    classDiscriminatorMode = classDiscriminatorMode === VOID ? ClassDiscriminatorMode_POLYMORPHIC_getInstance() : classDiscriminatorMode;
    this.n14_1 = encodeDefaults;
    this.o14_1 = ignoreUnknownKeys;
    this.p14_1 = isLenient;
    this.q14_1 = allowStructuredMapKeys;
    this.r14_1 = prettyPrint;
    this.s14_1 = explicitNulls;
    this.t14_1 = prettyPrintIndent;
    this.u14_1 = coerceInputValues;
    this.v14_1 = useArrayPolymorphism;
    this.w14_1 = classDiscriminator;
    this.x14_1 = allowSpecialFloatingPointValues;
    this.y14_1 = useAlternativeNames;
    this.z14_1 = namingStrategy;
    this.a15_1 = decodeEnumsCaseInsensitive;
    this.b15_1 = allowTrailingComma;
    this.c15_1 = allowComments;
    this.d15_1 = classDiscriminatorMode;
  }
  protoOf(JsonConfiguration).toString = function () {
    return 'JsonConfiguration(encodeDefaults=' + this.n14_1 + ', ignoreUnknownKeys=' + this.o14_1 + ', isLenient=' + this.p14_1 + ', ' + ('allowStructuredMapKeys=' + this.q14_1 + ', prettyPrint=' + this.r14_1 + ', explicitNulls=' + this.s14_1 + ', ') + ("prettyPrintIndent='" + this.t14_1 + "', coerceInputValues=" + this.u14_1 + ', useArrayPolymorphism=' + this.v14_1 + ', ') + ("classDiscriminator='" + this.w14_1 + "', allowSpecialFloatingPointValues=" + this.x14_1 + ', ') + ('useAlternativeNames=' + this.y14_1 + ', namingStrategy=' + toString_0(this.z14_1) + ', decodeEnumsCaseInsensitive=' + this.a15_1 + ', ') + ('allowTrailingComma=' + this.b15_1 + ', allowComments=' + this.c15_1 + ', classDiscriminatorMode=' + this.d15_1.toString() + ')');
  };
  var ClassDiscriminatorMode_NONE_instance;
  var ClassDiscriminatorMode_ALL_JSON_OBJECTS_instance;
  var ClassDiscriminatorMode_POLYMORPHIC_instance;
  var ClassDiscriminatorMode_entriesInitialized;
  function ClassDiscriminatorMode_initEntries() {
    if (ClassDiscriminatorMode_entriesInitialized)
      return Unit_instance;
    ClassDiscriminatorMode_entriesInitialized = true;
    ClassDiscriminatorMode_NONE_instance = new ClassDiscriminatorMode('NONE', 0);
    ClassDiscriminatorMode_ALL_JSON_OBJECTS_instance = new ClassDiscriminatorMode('ALL_JSON_OBJECTS', 1);
    ClassDiscriminatorMode_POLYMORPHIC_instance = new ClassDiscriminatorMode('POLYMORPHIC', 2);
  }
  function ClassDiscriminatorMode(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function ClassDiscriminatorMode_NONE_getInstance() {
    ClassDiscriminatorMode_initEntries();
    return ClassDiscriminatorMode_NONE_instance;
  }
  function ClassDiscriminatorMode_POLYMORPHIC_getInstance() {
    ClassDiscriminatorMode_initEntries();
    return ClassDiscriminatorMode_POLYMORPHIC_instance;
  }
  function JsonDecoder() {
  }
  function get_jsonUnquotedLiteralDescriptor() {
    _init_properties_JsonElement_kt__7cbdc2();
    return jsonUnquotedLiteralDescriptor;
  }
  var jsonUnquotedLiteralDescriptor;
  function Companion() {
  }
  var Companion_instance;
  function Companion_getInstance_3() {
    return Companion_instance;
  }
  function JsonElement() {
  }
  function JsonNull() {
    JsonNull_instance = this;
    JsonPrimitive.call(this);
    this.g15_1 = 'null';
  }
  protoOf(JsonNull).h15 = function () {
    return this.g15_1;
  };
  protoOf(JsonNull).i15 = function () {
    return JsonNullSerializer_getInstance();
  };
  protoOf(JsonNull).pu = function (typeParamsSerializers) {
    return this.i15();
  };
  var JsonNull_instance;
  function JsonNull_getInstance() {
    if (JsonNull_instance == null)
      new JsonNull();
    return JsonNull_instance;
  }
  function Companion_0() {
  }
  var Companion_instance_0;
  function Companion_getInstance_4() {
    return Companion_instance_0;
  }
  function JsonPrimitive() {
    JsonElement.call(this);
  }
  protoOf(JsonPrimitive).toString = function () {
    return this.h15();
  };
  function Companion_1() {
  }
  var Companion_instance_1;
  function Companion_getInstance_5() {
    return Companion_instance_1;
  }
  function JsonObject$toString$lambda(_destruct__k2r9zo) {
    // Inline function 'kotlin.collections.component1' call
    var k = _destruct__k2r9zo.u1();
    // Inline function 'kotlin.collections.component2' call
    var v = _destruct__k2r9zo.v1();
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    printQuoted(this_0, k);
    this_0.x7(_Char___init__impl__6a9atx(58));
    this_0.v7(v);
    return this_0.toString();
  }
  function JsonObject(content) {
    JsonElement.call(this);
    this.j15_1 = content;
  }
  protoOf(JsonObject).equals = function (other) {
    return equals(this.j15_1, other);
  };
  protoOf(JsonObject).hashCode = function () {
    return hashCode(this.j15_1);
  };
  protoOf(JsonObject).toString = function () {
    var tmp = this.j15_1.b2();
    return joinToString(tmp, ',', '{', '}', VOID, VOID, JsonObject$toString$lambda);
  };
  protoOf(JsonObject).p = function () {
    return this.j15_1.p();
  };
  protoOf(JsonObject).k15 = function (key) {
    return this.j15_1.w1(key);
  };
  protoOf(JsonObject).w1 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return false;
    return this.k15((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(JsonObject).l15 = function (key) {
    return this.j15_1.y1(key);
  };
  protoOf(JsonObject).y1 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return null;
    return this.l15((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(JsonObject).j = function () {
    return this.j15_1.j();
  };
  protoOf(JsonObject).z1 = function () {
    return this.j15_1.z1();
  };
  protoOf(JsonObject).a2 = function () {
    return this.j15_1.a2();
  };
  protoOf(JsonObject).b2 = function () {
    return this.j15_1.b2();
  };
  function Companion_2() {
  }
  var Companion_instance_2;
  function Companion_getInstance_6() {
    return Companion_instance_2;
  }
  function JsonArray(content) {
    JsonElement.call(this);
    this.m15_1 = content;
  }
  protoOf(JsonArray).equals = function (other) {
    return equals(this.m15_1, other);
  };
  protoOf(JsonArray).hashCode = function () {
    return hashCode(this.m15_1);
  };
  protoOf(JsonArray).toString = function () {
    return joinToString(this.m15_1, ',', '[', ']');
  };
  protoOf(JsonArray).p = function () {
    return this.m15_1.p();
  };
  protoOf(JsonArray).g = function () {
    return this.m15_1.g();
  };
  protoOf(JsonArray).o = function (index) {
    return this.m15_1.o(index);
  };
  protoOf(JsonArray).q = function (index) {
    return this.m15_1.q(index);
  };
  protoOf(JsonArray).j = function () {
    return this.m15_1.j();
  };
  function get_booleanOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    return toBooleanStrictOrNull_0(_this__u8e3s4.h15());
  }
  function get_longOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlinx.serialization.json.exceptionToNull' call
    var tmp;
    try {
      tmp = parseLongImpl(_this__u8e3s4);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof JsonDecodingException) {
        var e = $p;
        tmp_0 = null;
      } else {
        throw $p;
      }
      tmp = tmp_0;
    }
    return tmp;
  }
  function get_doubleOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    return toDoubleOrNull(_this__u8e3s4.h15());
  }
  function JsonPrimitive_0(value) {
    _init_properties_JsonElement_kt__7cbdc2();
    if (value == null)
      return JsonNull_getInstance();
    return new JsonLiteral(value, true);
  }
  function JsonPrimitive_1(value) {
    _init_properties_JsonElement_kt__7cbdc2();
    if (value == null)
      return JsonNull_getInstance();
    return new JsonLiteral(value, false);
  }
  function JsonPrimitive_2(value) {
    _init_properties_JsonElement_kt__7cbdc2();
    if (value == null)
      return JsonNull_getInstance();
    return new JsonLiteral(value, false);
  }
  function parseLongImpl(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    return (new StringJsonLexer(_this__u8e3s4.h15())).n15();
  }
  function JsonLiteral(body, isString, coerceToInlineType) {
    coerceToInlineType = coerceToInlineType === VOID ? null : coerceToInlineType;
    JsonPrimitive.call(this);
    this.o15_1 = isString;
    this.p15_1 = coerceToInlineType;
    this.q15_1 = toString(body);
    if (!(this.p15_1 == null)) {
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.require' call
      if (!this.p15_1.fl()) {
        var message = 'Failed requirement.';
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
    }
  }
  protoOf(JsonLiteral).h15 = function () {
    return this.q15_1;
  };
  protoOf(JsonLiteral).toString = function () {
    var tmp;
    if (this.o15_1) {
      // Inline function 'kotlin.text.buildString' call
      // Inline function 'kotlin.apply' call
      var this_0 = StringBuilder_init_$Create$();
      printQuoted(this_0, this.q15_1);
      tmp = this_0.toString();
    } else {
      tmp = this.q15_1;
    }
    return tmp;
  };
  protoOf(JsonLiteral).equals = function (other) {
    if (this === other)
      return true;
    if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
      return false;
    if (!(other instanceof JsonLiteral))
      THROW_CCE();
    if (!(this.o15_1 === other.o15_1))
      return false;
    if (!(this.q15_1 === other.q15_1))
      return false;
    return true;
  };
  protoOf(JsonLiteral).hashCode = function () {
    var result = getBooleanHashCode(this.o15_1);
    result = imul(31, result) + getStringHashCode(this.q15_1) | 0;
    return result;
  };
  function get_float(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlin.text.toFloat' call
    var this_0 = _this__u8e3s4.h15();
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return toDouble(this_0);
  }
  function get_double(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    return toDouble(_this__u8e3s4.h15());
  }
  function get_contentOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    var tmp;
    if (_this__u8e3s4 instanceof JsonNull) {
      tmp = null;
    } else {
      tmp = _this__u8e3s4.h15();
    }
    return tmp;
  }
  function get_jsonPrimitive(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof JsonPrimitive ? _this__u8e3s4 : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      error(_this__u8e3s4, 'JsonPrimitive');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function error(_this__u8e3s4, element) {
    _init_properties_JsonElement_kt__7cbdc2();
    throw IllegalArgumentException_init_$Create$('Element ' + toString(getKClassFromExpression(_this__u8e3s4)) + ' is not a ' + element);
  }
  var properties_initialized_JsonElement_kt_abxy8s;
  function _init_properties_JsonElement_kt__7cbdc2() {
    if (!properties_initialized_JsonElement_kt_abxy8s) {
      properties_initialized_JsonElement_kt_abxy8s = true;
      jsonUnquotedLiteralDescriptor = InlinePrimitiveDescriptor('kotlinx.serialization.json.JsonUnquotedLiteral', serializer(StringCompanionObject_instance));
    }
  }
  function JsonElementSerializer$descriptor$lambda($this$buildSerialDescriptor) {
    $this$buildSerialDescriptor.kk('JsonPrimitive', defer(JsonElementSerializer$descriptor$lambda$lambda));
    $this$buildSerialDescriptor.kk('JsonNull', defer(JsonElementSerializer$descriptor$lambda$lambda_0));
    $this$buildSerialDescriptor.kk('JsonLiteral', defer(JsonElementSerializer$descriptor$lambda$lambda_1));
    $this$buildSerialDescriptor.kk('JsonObject', defer(JsonElementSerializer$descriptor$lambda$lambda_2));
    $this$buildSerialDescriptor.kk('JsonArray', defer(JsonElementSerializer$descriptor$lambda$lambda_3));
    return Unit_instance;
  }
  function JsonElementSerializer$descriptor$lambda$lambda() {
    return JsonPrimitiveSerializer_getInstance().r15_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_0() {
    return JsonNullSerializer_getInstance().s15_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_1() {
    return JsonLiteralSerializer_getInstance().t15_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_2() {
    return JsonObjectSerializer_getInstance().u15_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_3() {
    return JsonArraySerializer_getInstance().v15_1;
  }
  function JsonElementSerializer() {
    JsonElementSerializer_instance = this;
    var tmp = this;
    var tmp_0 = SEALED_getInstance();
    tmp.w15_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonElement', tmp_0, [], JsonElementSerializer$descriptor$lambda);
  }
  protoOf(JsonElementSerializer).zj = function () {
    return this.w15_1;
  };
  protoOf(JsonElementSerializer).x15 = function (encoder, value) {
    verify(encoder);
    if (value instanceof JsonPrimitive) {
      encoder.mo(JsonPrimitiveSerializer_getInstance(), value);
    } else {
      if (value instanceof JsonObject) {
        encoder.mo(JsonObjectSerializer_getInstance(), value);
      } else {
        if (value instanceof JsonArray) {
          encoder.mo(JsonArraySerializer_getInstance(), value);
        } else {
          noWhenBranchMatchedException();
        }
      }
    }
  };
  protoOf(JsonElementSerializer).ak = function (encoder, value) {
    return this.x15(encoder, value instanceof JsonElement ? value : THROW_CCE());
  };
  protoOf(JsonElementSerializer).bk = function (decoder) {
    var input = asJsonDecoder(decoder);
    return input.f15();
  };
  var JsonElementSerializer_instance;
  function JsonElementSerializer_getInstance() {
    if (JsonElementSerializer_instance == null)
      new JsonElementSerializer();
    return JsonElementSerializer_instance;
  }
  function JsonNullSerializer() {
    JsonNullSerializer_instance = this;
    this.s15_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonNull', ENUM_getInstance(), []);
  }
  protoOf(JsonNullSerializer).zj = function () {
    return this.s15_1;
  };
  protoOf(JsonNullSerializer).y15 = function (encoder, value) {
    verify(encoder);
    encoder.qn();
  };
  protoOf(JsonNullSerializer).ak = function (encoder, value) {
    return this.y15(encoder, value instanceof JsonNull ? value : THROW_CCE());
  };
  protoOf(JsonNullSerializer).bk = function (decoder) {
    verify_0(decoder);
    if (decoder.im()) {
      throw new JsonDecodingException("Expected 'null' literal");
    }
    decoder.jm();
    return JsonNull_getInstance();
  };
  var JsonNullSerializer_instance;
  function JsonNullSerializer_getInstance() {
    if (JsonNullSerializer_instance == null)
      new JsonNullSerializer();
    return JsonNullSerializer_instance;
  }
  function JsonPrimitiveSerializer() {
    JsonPrimitiveSerializer_instance = this;
    this.r15_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonPrimitive', STRING_getInstance(), []);
  }
  protoOf(JsonPrimitiveSerializer).zj = function () {
    return this.r15_1;
  };
  protoOf(JsonPrimitiveSerializer).z15 = function (encoder, value) {
    verify(encoder);
    var tmp;
    if (value instanceof JsonNull) {
      encoder.mo(JsonNullSerializer_getInstance(), JsonNull_getInstance());
      tmp = Unit_instance;
    } else {
      var tmp_0 = JsonLiteralSerializer_getInstance();
      encoder.mo(tmp_0, value instanceof JsonLiteral ? value : THROW_CCE());
      tmp = Unit_instance;
    }
    return tmp;
  };
  protoOf(JsonPrimitiveSerializer).ak = function (encoder, value) {
    return this.z15(encoder, value instanceof JsonPrimitive ? value : THROW_CCE());
  };
  protoOf(JsonPrimitiveSerializer).bk = function (decoder) {
    var result = asJsonDecoder(decoder).f15();
    if (!(result instanceof JsonPrimitive))
      throw JsonDecodingException_0(-1, 'Unexpected JSON element, expected JsonPrimitive, had ' + toString(getKClassFromExpression(result)), toString(result));
    return result;
  };
  var JsonPrimitiveSerializer_instance;
  function JsonPrimitiveSerializer_getInstance() {
    if (JsonPrimitiveSerializer_instance == null)
      new JsonPrimitiveSerializer();
    return JsonPrimitiveSerializer_instance;
  }
  function JsonObjectDescriptor() {
    JsonObjectDescriptor_instance = this;
    this.a16_1 = MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).zj();
    this.b16_1 = 'kotlinx.serialization.json.JsonObject';
  }
  protoOf(JsonObjectDescriptor).dl = function () {
    return this.b16_1;
  };
  protoOf(JsonObjectDescriptor).il = function (index) {
    return this.a16_1.il(index);
  };
  protoOf(JsonObjectDescriptor).jl = function (name) {
    return this.a16_1.jl(name);
  };
  protoOf(JsonObjectDescriptor).kl = function (index) {
    return this.a16_1.kl(index);
  };
  protoOf(JsonObjectDescriptor).ll = function (index) {
    return this.a16_1.ll(index);
  };
  protoOf(JsonObjectDescriptor).ml = function (index) {
    return this.a16_1.ml(index);
  };
  protoOf(JsonObjectDescriptor).el = function () {
    return this.a16_1.el();
  };
  protoOf(JsonObjectDescriptor).zk = function () {
    return this.a16_1.zk();
  };
  protoOf(JsonObjectDescriptor).fl = function () {
    return this.a16_1.fl();
  };
  protoOf(JsonObjectDescriptor).gl = function () {
    return this.a16_1.gl();
  };
  protoOf(JsonObjectDescriptor).hl = function () {
    return this.a16_1.hl();
  };
  var JsonObjectDescriptor_instance;
  function JsonObjectDescriptor_getInstance() {
    if (JsonObjectDescriptor_instance == null)
      new JsonObjectDescriptor();
    return JsonObjectDescriptor_instance;
  }
  function JsonObjectSerializer() {
    JsonObjectSerializer_instance = this;
    this.u15_1 = JsonObjectDescriptor_getInstance();
  }
  protoOf(JsonObjectSerializer).zj = function () {
    return this.u15_1;
  };
  protoOf(JsonObjectSerializer).c16 = function (encoder, value) {
    verify(encoder);
    MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).ak(encoder, value);
  };
  protoOf(JsonObjectSerializer).ak = function (encoder, value) {
    return this.c16(encoder, value instanceof JsonObject ? value : THROW_CCE());
  };
  protoOf(JsonObjectSerializer).bk = function (decoder) {
    verify_0(decoder);
    return new JsonObject(MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).bk(decoder));
  };
  var JsonObjectSerializer_instance;
  function JsonObjectSerializer_getInstance() {
    if (JsonObjectSerializer_instance == null)
      new JsonObjectSerializer();
    return JsonObjectSerializer_instance;
  }
  function JsonArrayDescriptor() {
    JsonArrayDescriptor_instance = this;
    this.d16_1 = ListSerializer(JsonElementSerializer_getInstance()).zj();
    this.e16_1 = 'kotlinx.serialization.json.JsonArray';
  }
  protoOf(JsonArrayDescriptor).dl = function () {
    return this.e16_1;
  };
  protoOf(JsonArrayDescriptor).il = function (index) {
    return this.d16_1.il(index);
  };
  protoOf(JsonArrayDescriptor).jl = function (name) {
    return this.d16_1.jl(name);
  };
  protoOf(JsonArrayDescriptor).kl = function (index) {
    return this.d16_1.kl(index);
  };
  protoOf(JsonArrayDescriptor).ll = function (index) {
    return this.d16_1.ll(index);
  };
  protoOf(JsonArrayDescriptor).ml = function (index) {
    return this.d16_1.ml(index);
  };
  protoOf(JsonArrayDescriptor).el = function () {
    return this.d16_1.el();
  };
  protoOf(JsonArrayDescriptor).zk = function () {
    return this.d16_1.zk();
  };
  protoOf(JsonArrayDescriptor).fl = function () {
    return this.d16_1.fl();
  };
  protoOf(JsonArrayDescriptor).gl = function () {
    return this.d16_1.gl();
  };
  protoOf(JsonArrayDescriptor).hl = function () {
    return this.d16_1.hl();
  };
  var JsonArrayDescriptor_instance;
  function JsonArrayDescriptor_getInstance() {
    if (JsonArrayDescriptor_instance == null)
      new JsonArrayDescriptor();
    return JsonArrayDescriptor_instance;
  }
  function JsonArraySerializer() {
    JsonArraySerializer_instance = this;
    this.v15_1 = JsonArrayDescriptor_getInstance();
  }
  protoOf(JsonArraySerializer).zj = function () {
    return this.v15_1;
  };
  protoOf(JsonArraySerializer).f16 = function (encoder, value) {
    verify(encoder);
    ListSerializer(JsonElementSerializer_getInstance()).ak(encoder, value);
  };
  protoOf(JsonArraySerializer).ak = function (encoder, value) {
    return this.f16(encoder, value instanceof JsonArray ? value : THROW_CCE());
  };
  protoOf(JsonArraySerializer).bk = function (decoder) {
    verify_0(decoder);
    return new JsonArray(ListSerializer(JsonElementSerializer_getInstance()).bk(decoder));
  };
  var JsonArraySerializer_instance;
  function JsonArraySerializer_getInstance() {
    if (JsonArraySerializer_instance == null)
      new JsonArraySerializer();
    return JsonArraySerializer_instance;
  }
  function defer(deferred) {
    return new defer$1(deferred);
  }
  function JsonLiteralSerializer() {
    JsonLiteralSerializer_instance = this;
    this.t15_1 = PrimitiveSerialDescriptor('kotlinx.serialization.json.JsonLiteral', STRING_getInstance());
  }
  protoOf(JsonLiteralSerializer).zj = function () {
    return this.t15_1;
  };
  protoOf(JsonLiteralSerializer).g16 = function (encoder, value) {
    verify(encoder);
    if (value.o15_1) {
      return encoder.zn(value.q15_1);
    }
    if (!(value.p15_1 == null)) {
      return encoder.ao(value.p15_1).zn(value.q15_1);
    }
    var tmp0_safe_receiver = toLongOrNull(value.q15_1);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return encoder.vn(tmp0_safe_receiver);
    }
    var tmp1_safe_receiver = toULongOrNull(value.q15_1);
    var tmp = tmp1_safe_receiver;
    if ((tmp == null ? null : new ULong(tmp)) == null)
      null;
    else {
      var tmp_0 = tmp1_safe_receiver;
      // Inline function 'kotlin.let' call
      var it = (tmp_0 == null ? null : new ULong(tmp_0)).jj_1;
      var tmp_1 = encoder.ao(serializer_0(Companion_getInstance()).zj());
      // Inline function 'kotlin.ULong.toLong' call
      var tmp$ret$1 = _ULong___get_data__impl__fggpzb(it);
      tmp_1.vn(tmp$ret$1);
      return Unit_instance;
    }
    var tmp2_safe_receiver = toDoubleOrNull(value.q15_1);
    if (tmp2_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return encoder.xn(tmp2_safe_receiver);
    }
    var tmp3_safe_receiver = toBooleanStrictOrNull(value.q15_1);
    if (tmp3_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return encoder.rn(tmp3_safe_receiver);
    }
    encoder.zn(value.q15_1);
  };
  protoOf(JsonLiteralSerializer).ak = function (encoder, value) {
    return this.g16(encoder, value instanceof JsonLiteral ? value : THROW_CCE());
  };
  protoOf(JsonLiteralSerializer).bk = function (decoder) {
    var result = asJsonDecoder(decoder).f15();
    if (!(result instanceof JsonLiteral))
      throw JsonDecodingException_0(-1, 'Unexpected JSON element, expected JsonLiteral, had ' + toString(getKClassFromExpression(result)), toString(result));
    return result;
  };
  var JsonLiteralSerializer_instance;
  function JsonLiteralSerializer_getInstance() {
    if (JsonLiteralSerializer_instance == null)
      new JsonLiteralSerializer();
    return JsonLiteralSerializer_instance;
  }
  function verify(encoder) {
    asJsonEncoder(encoder);
  }
  function asJsonDecoder(_this__u8e3s4) {
    var tmp0_elvis_lhs = isInterface(_this__u8e3s4, JsonDecoder) ? _this__u8e3s4 : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalStateException_init_$Create$('This serializer can be used only with Json format.' + ('Expected Decoder to be JsonDecoder, got ' + toString(getKClassFromExpression(_this__u8e3s4))));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function verify_0(decoder) {
    asJsonDecoder(decoder);
  }
  function asJsonEncoder(_this__u8e3s4) {
    var tmp0_elvis_lhs = isInterface(_this__u8e3s4, JsonEncoder) ? _this__u8e3s4 : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalStateException_init_$Create$('This serializer can be used only with Json format.' + ('Expected Encoder to be JsonEncoder, got ' + toString(getKClassFromExpression(_this__u8e3s4))));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function _get_original__l7ku1m($this) {
    var tmp0 = $this.h16_1;
    var tmp = KProperty1;
    // Inline function 'kotlin.getValue' call
    getPropertyCallableRef('original', 1, tmp, defer$o$_get_original_$ref_3cje7k(), null);
    return tmp0.v1();
  }
  function defer$o$_get_original_$ref_3cje7k() {
    return function (p0) {
      return _get_original__l7ku1m(p0);
    };
  }
  function defer$1($deferred) {
    this.h16_1 = lazy($deferred);
  }
  protoOf(defer$1).dl = function () {
    return _get_original__l7ku1m(this).dl();
  };
  protoOf(defer$1).el = function () {
    return _get_original__l7ku1m(this).el();
  };
  protoOf(defer$1).gl = function () {
    return _get_original__l7ku1m(this).gl();
  };
  protoOf(defer$1).il = function (index) {
    return _get_original__l7ku1m(this).il(index);
  };
  protoOf(defer$1).jl = function (name) {
    return _get_original__l7ku1m(this).jl(name);
  };
  protoOf(defer$1).kl = function (index) {
    return _get_original__l7ku1m(this).kl(index);
  };
  protoOf(defer$1).ll = function (index) {
    return _get_original__l7ku1m(this).ll(index);
  };
  protoOf(defer$1).ml = function (index) {
    return _get_original__l7ku1m(this).ml(index);
  };
  function JsonEncoder() {
  }
  function Composer(writer) {
    this.i16_1 = writer;
    this.j16_1 = true;
  }
  protoOf(Composer).k16 = function () {
    this.j16_1 = true;
  };
  protoOf(Composer).l16 = function () {
    return Unit_instance;
  };
  protoOf(Composer).m16 = function () {
    this.j16_1 = false;
  };
  protoOf(Composer).n16 = function () {
    this.j16_1 = false;
  };
  protoOf(Composer).o16 = function () {
    return Unit_instance;
  };
  protoOf(Composer).p16 = function (v) {
    return this.i16_1.q16(v);
  };
  protoOf(Composer).r16 = function (v) {
    return this.i16_1.s16(v);
  };
  protoOf(Composer).t16 = function (v) {
    return this.i16_1.s16(v.toString());
  };
  protoOf(Composer).u16 = function (v) {
    return this.i16_1.s16(v.toString());
  };
  protoOf(Composer).v16 = function (v) {
    return this.i16_1.w16(toLong(v));
  };
  protoOf(Composer).x16 = function (v) {
    return this.i16_1.w16(toLong(v));
  };
  protoOf(Composer).y16 = function (v) {
    return this.i16_1.w16(toLong(v));
  };
  protoOf(Composer).z16 = function (v) {
    return this.i16_1.w16(v);
  };
  protoOf(Composer).a17 = function (v) {
    return this.i16_1.s16(v.toString());
  };
  protoOf(Composer).b17 = function (value) {
    return this.i16_1.c17(value);
  };
  function Composer_0(sb, json) {
    return json.z12_1.r14_1 ? new ComposerWithPrettyPrint(sb, json) : new Composer(sb);
  }
  function ComposerForUnsignedNumbers(writer, forceQuoting) {
    Composer.call(this, writer);
    this.f17_1 = forceQuoting;
  }
  protoOf(ComposerForUnsignedNumbers).y16 = function (v) {
    if (this.f17_1) {
      // Inline function 'kotlin.toUInt' call
      var tmp$ret$0 = _UInt___init__impl__l7qpdl(v);
      this.b17(UInt__toString_impl_dbgl21(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUInt' call
      var tmp$ret$1 = _UInt___init__impl__l7qpdl(v);
      this.r16(UInt__toString_impl_dbgl21(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).z16 = function (v) {
    if (this.f17_1) {
      // Inline function 'kotlin.toULong' call
      var tmp$ret$0 = _ULong___init__impl__c78o9k(v);
      this.b17(ULong__toString_impl_f9au7k(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toULong' call
      var tmp$ret$1 = _ULong___init__impl__c78o9k(v);
      this.r16(ULong__toString_impl_f9au7k(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).v16 = function (v) {
    if (this.f17_1) {
      // Inline function 'kotlin.toUByte' call
      var tmp$ret$0 = _UByte___init__impl__g9hnc4(v);
      this.b17(UByte__toString_impl_v72jg(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUByte' call
      var tmp$ret$1 = _UByte___init__impl__g9hnc4(v);
      this.r16(UByte__toString_impl_v72jg(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).x16 = function (v) {
    if (this.f17_1) {
      // Inline function 'kotlin.toUShort' call
      var tmp$ret$0 = _UShort___init__impl__jigrne(v);
      this.b17(UShort__toString_impl_edaoee(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUShort' call
      var tmp$ret$1 = _UShort___init__impl__jigrne(v);
      this.r16(UShort__toString_impl_edaoee(tmp$ret$1));
    }
  };
  function ComposerForUnquotedLiterals(writer, forceQuoting) {
    Composer.call(this, writer);
    this.i17_1 = forceQuoting;
  }
  protoOf(ComposerForUnquotedLiterals).b17 = function (value) {
    if (this.i17_1) {
      protoOf(Composer).b17.call(this, value);
    } else {
      protoOf(Composer).r16.call(this, value);
    }
  };
  function ComposerWithPrettyPrint(writer, json) {
    Composer.call(this, writer);
    this.l17_1 = json;
    this.m17_1 = 0;
  }
  protoOf(ComposerWithPrettyPrint).k16 = function () {
    this.j16_1 = true;
    this.m17_1 = this.m17_1 + 1 | 0;
  };
  protoOf(ComposerWithPrettyPrint).l16 = function () {
    this.m17_1 = this.m17_1 - 1 | 0;
  };
  protoOf(ComposerWithPrettyPrint).m16 = function () {
    this.j16_1 = false;
    this.r16('\n');
    // Inline function 'kotlin.repeat' call
    var times = this.m17_1;
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        this.r16(this.l17_1.z12_1.t14_1);
      }
       while (inductionVariable < times);
  };
  protoOf(ComposerWithPrettyPrint).n16 = function () {
    if (this.j16_1)
      this.j16_1 = false;
    else {
      this.m16();
    }
  };
  protoOf(ComposerWithPrettyPrint).o16 = function () {
    this.p16(_Char___init__impl__6a9atx(32));
  };
  function readIfAbsent($this, descriptor, index) {
    $this.o17_1 = (!descriptor.ml(index) && descriptor.ll(index).zk());
    return $this.o17_1;
  }
  function JsonElementMarker$readIfAbsent$ref(p0) {
    var l = function (_this__u8e3s4, p0_0) {
      var tmp0 = p0;
      return readIfAbsent(tmp0, _this__u8e3s4, p0_0);
    };
    l.callableName = 'readIfAbsent';
    return l;
  }
  function JsonElementMarker(descriptor) {
    var tmp = this;
    tmp.n17_1 = new ElementMarker(descriptor, JsonElementMarker$readIfAbsent$ref(this));
    this.o17_1 = false;
  }
  protoOf(JsonElementMarker).p17 = function (index) {
    this.n17_1.zs(index);
  };
  protoOf(JsonElementMarker).q17 = function () {
    return this.n17_1.at();
  };
  function JsonDecodingException(message) {
    JsonException.call(this, message);
    captureStack(this, JsonDecodingException);
  }
  function invalidTrailingComma(_this__u8e3s4, entity) {
    entity = entity === VOID ? 'object' : entity;
    _this__u8e3s4.r17('Trailing comma before the end of JSON ' + entity, _this__u8e3s4.p13_1 - 1 | 0, "Trailing commas are non-complaint JSON and not allowed by default. Use 'allowTrailingComma = true' in 'Json {}' builder to support them.");
  }
  function throwInvalidFloatingPointDecoded(_this__u8e3s4, result) {
    _this__u8e3s4.s17('Unexpected special floating-point value ' + toString(result) + '. By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification', VOID, "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'");
  }
  function JsonEncodingException(message) {
    JsonException.call(this, message);
    captureStack(this, JsonEncodingException);
  }
  function InvalidKeyKindException(keyDescriptor) {
    return new JsonEncodingException("Value of type '" + keyDescriptor.dl() + "' can't be used in JSON as a key in the map. " + ("It should have either primitive or enum kind, but its kind is '" + keyDescriptor.el().toString() + "'.\n") + "Use 'allowStructuredMapKeys = true' in 'Json {}' builder to convert such maps to [key1, value1, key2, value2,...] arrays.");
  }
  function JsonDecodingException_0(offset, message, input) {
    return JsonDecodingException_1(offset, message + '\nJSON input: ' + toString(minify(input, offset)));
  }
  function InvalidFloatingPointDecoded(value, key, output) {
    return JsonDecodingException_1(-1, unexpectedFpErrorMessage(value, key, output));
  }
  function JsonDecodingException_1(offset, message) {
    return new JsonDecodingException(offset >= 0 ? 'Unexpected JSON token at offset ' + offset + ': ' + message : message);
  }
  function minify(_this__u8e3s4, offset) {
    offset = offset === VOID ? -1 : offset;
    if (charSequenceLength(_this__u8e3s4) < 200)
      return _this__u8e3s4;
    if (offset === -1) {
      var start = charSequenceLength(_this__u8e3s4) - 60 | 0;
      if (start <= 0)
        return _this__u8e3s4;
      // Inline function 'kotlin.text.substring' call
      var endIndex = charSequenceLength(_this__u8e3s4);
      return '.....' + toString(charSequenceSubSequence(_this__u8e3s4, start, endIndex));
    }
    var start_0 = offset - 30 | 0;
    var end = offset + 30 | 0;
    var prefix = start_0 <= 0 ? '' : '.....';
    var suffix = end >= charSequenceLength(_this__u8e3s4) ? '' : '.....';
    var tmp2 = coerceAtLeast(start_0, 0);
    // Inline function 'kotlin.text.substring' call
    var endIndex_0 = coerceAtMost(end, charSequenceLength(_this__u8e3s4));
    return prefix + toString(charSequenceSubSequence(_this__u8e3s4, tmp2, endIndex_0)) + suffix;
  }
  function JsonException(message) {
    SerializationException_init_$Init$(message, this);
    captureStack(this, JsonException);
  }
  function unexpectedFpErrorMessage(value, key, output) {
    return 'Unexpected special floating-point value ' + toString(value) + ' with key ' + key + '. By default, ' + "non-finite floating point values are prohibited because they do not conform JSON specification. It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'\n" + ('Current output: ' + toString(minify(output)));
  }
  function InvalidFloatingPointEncoded(value, output) {
    return new JsonEncodingException('Unexpected special floating-point value ' + toString(value) + '. By default, ' + "non-finite floating point values are prohibited because they do not conform JSON specification. It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'\n" + ('Current output: ' + toString(minify(output))));
  }
  function get_JsonDeserializationNamesKey() {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return JsonDeserializationNamesKey;
  }
  var JsonDeserializationNamesKey;
  function get_JsonSerializationNamesKey() {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return JsonSerializationNamesKey;
  }
  var JsonSerializationNamesKey;
  function ignoreUnknownKeys(_this__u8e3s4, json) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp;
    if (json.z12_1.o14_1) {
      tmp = true;
    } else {
      var tmp0 = _this__u8e3s4.hl();
      var tmp$ret$0;
      $l$block_0: {
        // Inline function 'kotlin.collections.any' call
        var tmp_0;
        if (isInterface(tmp0, Collection)) {
          tmp_0 = tmp0.p();
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp$ret$0 = false;
          break $l$block_0;
        }
        var _iterator__ex2g4s = tmp0.g();
        while (_iterator__ex2g4s.h()) {
          var element = _iterator__ex2g4s.i();
          if (element instanceof JsonIgnoreUnknownKeys) {
            tmp$ret$0 = true;
            break $l$block_0;
          }
        }
        tmp$ret$0 = false;
      }
      tmp = tmp$ret$0;
    }
    return tmp;
  }
  function getJsonNameIndex(_this__u8e3s4, json, name) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    if (decodeCaseInsensitive(json, _this__u8e3s4)) {
      // Inline function 'kotlin.text.lowercase' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp$ret$1 = name.toLowerCase();
      return getJsonNameIndexSlowPath(_this__u8e3s4, json, tmp$ret$1);
    }
    var strategy = namingStrategy(_this__u8e3s4, json);
    if (!(strategy == null))
      return getJsonNameIndexSlowPath(_this__u8e3s4, json, name);
    var index = _this__u8e3s4.jl(name);
    if (!(index === -3))
      return index;
    if (!json.z12_1.y14_1)
      return index;
    return getJsonNameIndexSlowPath(_this__u8e3s4, json, name);
  }
  function getJsonElementName(_this__u8e3s4, json, index) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var strategy = namingStrategy(_this__u8e3s4, json);
    return strategy == null ? _this__u8e3s4.il(index) : serializationNamesIndices(_this__u8e3s4, json, strategy)[index];
  }
  function namingStrategy(_this__u8e3s4, json) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return equals(_this__u8e3s4.el(), CLASS_getInstance()) ? json.z12_1.z14_1 : null;
  }
  function deserializationNamesMap(_this__u8e3s4, descriptor) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp = get_schemaCache(_this__u8e3s4);
    var tmp_0 = get_JsonDeserializationNamesKey();
    return tmp.u17(descriptor, tmp_0, deserializationNamesMap$lambda(descriptor, _this__u8e3s4));
  }
  function decodeCaseInsensitive(_this__u8e3s4, descriptor) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return _this__u8e3s4.z12_1.a15_1 && equals(descriptor.el(), ENUM_getInstance());
  }
  function getJsonNameIndexSlowPath(_this__u8e3s4, json, name) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp0_elvis_lhs = deserializationNamesMap(json, _this__u8e3s4).y1(name);
    return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
  }
  function serializationNamesIndices(_this__u8e3s4, json, strategy) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp = get_schemaCache(json);
    var tmp_0 = get_JsonSerializationNamesKey();
    return tmp.u17(_this__u8e3s4, tmp_0, serializationNamesIndices$lambda(_this__u8e3s4, strategy));
  }
  function buildDeserializationNamesMap(_this__u8e3s4, json) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    // Inline function 'kotlin.collections.mutableMapOf' call
    var builder = LinkedHashMap_init_$Create$();
    var useLowercaseEnums = decodeCaseInsensitive(json, _this__u8e3s4);
    var strategyForClasses = namingStrategy(_this__u8e3s4, json);
    var inductionVariable = 0;
    var last = _this__u8e3s4.gl();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.filterIsInstance' call
        var tmp0 = _this__u8e3s4.kl(i);
        // Inline function 'kotlin.collections.filterIsInstanceTo' call
        var destination = ArrayList_init_$Create$();
        var _iterator__ex2g4s = tmp0.g();
        while (_iterator__ex2g4s.h()) {
          var element = _iterator__ex2g4s.i();
          if (element instanceof JsonNames) {
            destination.e(element);
          }
        }
        var tmp0_safe_receiver = singleOrNull(destination);
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.v17_1;
        if (tmp1_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.collections.forEach' call
          var inductionVariable_0 = 0;
          var last_0 = tmp1_safe_receiver.length;
          while (inductionVariable_0 < last_0) {
            var element_0 = tmp1_safe_receiver[inductionVariable_0];
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            var tmp;
            if (useLowercaseEnums) {
              // Inline function 'kotlin.text.lowercase' call
              // Inline function 'kotlin.js.asDynamic' call
              tmp = element_0.toLowerCase();
            } else {
              tmp = element_0;
            }
            buildDeserializationNamesMap$putOrThrow(builder, _this__u8e3s4, tmp, i);
          }
        }
        var tmp_0;
        if (useLowercaseEnums) {
          // Inline function 'kotlin.text.lowercase' call
          // Inline function 'kotlin.js.asDynamic' call
          tmp_0 = _this__u8e3s4.il(i).toLowerCase();
        } else if (!(strategyForClasses == null)) {
          tmp_0 = strategyForClasses.w17(_this__u8e3s4, i, _this__u8e3s4.il(i));
        } else {
          tmp_0 = null;
        }
        var nameToPut = tmp_0;
        if (nameToPut == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          buildDeserializationNamesMap$putOrThrow(builder, _this__u8e3s4, nameToPut, i);
        }
      }
       while (inductionVariable < last);
    // Inline function 'kotlin.collections.ifEmpty' call
    var tmp_1;
    if (builder.p()) {
      tmp_1 = emptyMap();
    } else {
      tmp_1 = builder;
    }
    return tmp_1;
  }
  function buildDeserializationNamesMap$putOrThrow(_this__u8e3s4, $this_buildDeserializationNamesMap, name, index) {
    var entity = equals($this_buildDeserializationNamesMap.el(), ENUM_getInstance()) ? 'enum value' : 'property';
    // Inline function 'kotlin.collections.contains' call
    // Inline function 'kotlin.collections.containsKey' call
    if ((isInterface(_this__u8e3s4, KtMap) ? _this__u8e3s4 : THROW_CCE()).w1(name)) {
      throw new JsonException("The suggested name '" + name + "' for " + entity + ' ' + $this_buildDeserializationNamesMap.il(index) + ' is already one of the names for ' + entity + ' ' + ($this_buildDeserializationNamesMap.il(getValue(_this__u8e3s4, name)) + ' in ' + toString($this_buildDeserializationNamesMap)));
    }
    // Inline function 'kotlin.collections.set' call
    _this__u8e3s4.g2(name, index);
  }
  function deserializationNamesMap$lambda($descriptor, $this_deserializationNamesMap) {
    return function () {
      return buildDeserializationNamesMap($descriptor, $this_deserializationNamesMap);
    };
  }
  function serializationNamesIndices$lambda($this_serializationNamesIndices, $strategy) {
    return function () {
      var tmp = 0;
      var tmp_0 = $this_serializationNamesIndices.gl();
      // Inline function 'kotlin.arrayOfNulls' call
      var tmp_1 = Array(tmp_0);
      while (tmp < tmp_0) {
        var tmp_2 = tmp;
        var baseName = $this_serializationNamesIndices.il(tmp_2);
        tmp_1[tmp_2] = $strategy.w17($this_serializationNamesIndices, tmp_2, baseName);
        tmp = tmp + 1 | 0;
      }
      return tmp_1;
    };
  }
  var properties_initialized_JsonNamesMap_kt_ljpf42;
  function _init_properties_JsonNamesMap_kt__cbbp0k() {
    if (!properties_initialized_JsonNamesMap_kt_ljpf42) {
      properties_initialized_JsonNamesMap_kt_ljpf42 = true;
      JsonDeserializationNamesKey = new Key();
      JsonSerializationNamesKey = new Key();
    }
  }
  function Tombstone() {
  }
  var Tombstone_instance;
  function Tombstone_getInstance() {
    return Tombstone_instance;
  }
  function resize($this) {
    var newSize = imul($this.z17_1, 2);
    $this.x17_1 = copyOf($this.x17_1, newSize);
    var tmp = 0;
    var tmp_0 = new Int32Array(newSize);
    while (tmp < newSize) {
      tmp_0[tmp] = -1;
      tmp = tmp + 1 | 0;
    }
    var newIndices = tmp_0;
    // Inline function 'kotlin.collections.copyInto' call
    var this_0 = $this.y17_1;
    var endIndex = this_0.length;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_1 = this_0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    arrayCopy(tmp_1, newIndices, 0, 0, endIndex);
    $this.y17_1 = newIndices;
  }
  function JsonPath() {
    var tmp = this;
    // Inline function 'kotlin.arrayOfNulls' call
    tmp.x17_1 = Array(8);
    var tmp_0 = this;
    var tmp_1 = 0;
    var tmp_2 = new Int32Array(8);
    while (tmp_1 < 8) {
      tmp_2[tmp_1] = -1;
      tmp_1 = tmp_1 + 1 | 0;
    }
    tmp_0.y17_1 = tmp_2;
    this.z17_1 = -1;
  }
  protoOf(JsonPath).a18 = function (sd) {
    this.z17_1 = this.z17_1 + 1 | 0;
    var depth = this.z17_1;
    if (depth === this.x17_1.length) {
      resize(this);
    }
    this.x17_1[depth] = sd;
  };
  protoOf(JsonPath).b18 = function (index) {
    this.y17_1[this.z17_1] = index;
  };
  protoOf(JsonPath).c18 = function (key) {
    var tmp;
    if (!(this.y17_1[this.z17_1] === -2)) {
      this.z17_1 = this.z17_1 + 1 | 0;
      tmp = this.z17_1 === this.x17_1.length;
    } else {
      tmp = false;
    }
    if (tmp) {
      resize(this);
    }
    this.x17_1[this.z17_1] = key;
    this.y17_1[this.z17_1] = -2;
  };
  protoOf(JsonPath).d18 = function () {
    if (this.y17_1[this.z17_1] === -2) {
      this.x17_1[this.z17_1] = Tombstone_instance;
    }
  };
  protoOf(JsonPath).e18 = function () {
    var depth = this.z17_1;
    if (this.y17_1[depth] === -2) {
      this.y17_1[depth] = -1;
      this.z17_1 = this.z17_1 - 1 | 0;
    }
    if (!(this.z17_1 === -1)) {
      this.z17_1 = this.z17_1 - 1 | 0;
    }
  };
  protoOf(JsonPath).f18 = function () {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    this_0.w7('$');
    // Inline function 'kotlin.repeat' call
    var times = this.z17_1 + 1 | 0;
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var element = this.x17_1[index];
        if (!(element == null) ? isInterface(element, SerialDescriptor) : false) {
          if (equals(element.el(), LIST_getInstance())) {
            if (!(this.y17_1[index] === -1)) {
              this_0.w7('[');
              this_0.ya(this.y17_1[index]);
              this_0.w7(']');
            }
          } else {
            var idx = this.y17_1[index];
            if (idx >= 0) {
              this_0.w7('.');
              this_0.w7(element.il(idx));
            }
          }
        } else {
          if (!(element === Tombstone_instance)) {
            this_0.w7('[');
            this_0.w7("'");
            this_0.v7(element);
            this_0.w7("'");
            this_0.w7(']');
          }
        }
      }
       while (inductionVariable < times);
    return this_0.toString();
  };
  protoOf(JsonPath).toString = function () {
    return this.f18();
  };
  function checkKind($this, descriptor, actualClass) {
    var kind = descriptor.el();
    var tmp;
    if (kind instanceof PolymorphicKind) {
      tmp = true;
    } else {
      tmp = equals(kind, CONTEXTUAL_getInstance());
    }
    if (tmp) {
      throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.m9() + " can't be registered as a subclass for polymorphic serialization " + ('because its kind ' + kind.toString() + ' is not concrete. To work with multiple hierarchies, register it as a base class.'));
    }
    if ($this.h18_1)
      return Unit_instance;
    if (!$this.i18_1)
      return Unit_instance;
    var tmp_0;
    var tmp_1;
    if (equals(kind, LIST_getInstance()) || equals(kind, MAP_getInstance())) {
      tmp_1 = true;
    } else {
      tmp_1 = kind instanceof PrimitiveKind;
    }
    if (tmp_1) {
      tmp_0 = true;
    } else {
      tmp_0 = kind instanceof ENUM;
    }
    if (tmp_0) {
      throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.m9() + ' of kind ' + kind.toString() + ' cannot be serialized polymorphically with class discriminator.');
    }
  }
  function checkDiscriminatorCollisions($this, descriptor, actualClass) {
    var inductionVariable = 0;
    var last = descriptor.gl();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var name = descriptor.il(i);
        if (name === $this.g18_1) {
          throw IllegalArgumentException_init_$Create$('Polymorphic serializer for ' + toString(actualClass) + " has property '" + name + "' that conflicts " + 'with JSON class discriminator. You can either change class discriminator in JsonConfiguration, rename property with @SerialName annotation or fall back to array polymorphism');
        }
      }
       while (inductionVariable < last);
  }
  function JsonSerializersModuleValidator(configuration) {
    this.g18_1 = configuration.w14_1;
    this.h18_1 = configuration.v14_1;
    this.i18_1 = !configuration.d15_1.equals(ClassDiscriminatorMode_NONE_getInstance());
  }
  protoOf(JsonSerializersModuleValidator).q12 = function (kClass, provider) {
  };
  protoOf(JsonSerializersModuleValidator).t12 = function (baseClass, actualClass, actualSerializer) {
    var descriptor = actualSerializer.zj();
    checkKind(this, descriptor, actualClass);
    if (!this.h18_1 && this.i18_1) {
      checkDiscriminatorCollisions(this, descriptor, actualClass);
    }
  };
  protoOf(JsonSerializersModuleValidator).u12 = function (baseClass, defaultSerializerProvider) {
  };
  protoOf(JsonSerializersModuleValidator).v12 = function (baseClass, defaultDeserializerProvider) {
  };
  function encodeByWriter(json, writer, serializer, value) {
    var tmp = WriteMode_OBJ_getInstance();
    // Inline function 'kotlin.arrayOfNulls' call
    var size = get_entries().j();
    var tmp$ret$0 = Array(size);
    var encoder = StreamingJsonEncoder_init_$Create$(writer, json, tmp, tmp$ret$0);
    encoder.mo(serializer, value);
  }
  function readObject($this) {
    // Inline function 'kotlinx.serialization.json.internal.JsonTreeReader.readObjectImpl' call
    var lastToken = $this.s18_1.w18(6);
    if ($this.s18_1.x18() === 4) {
      $this.s18_1.s17('Unexpected leading comma');
    }
    // Inline function 'kotlin.collections.linkedMapOf' call
    var result = LinkedHashMap_init_$Create$();
    $l$loop: while ($this.s18_1.y18()) {
      var key = $this.t18_1 ? $this.s18_1.a19() : $this.s18_1.z18();
      $this.s18_1.w18(5);
      var element = $this.b19();
      // Inline function 'kotlin.collections.set' call
      result.g2(key, element);
      lastToken = $this.s18_1.c19();
      var tmp0_subject = lastToken;
      if (tmp0_subject !== 4)
        if (tmp0_subject === 7)
          break $l$loop;
        else {
          $this.s18_1.s17('Expected end of the object or comma');
        }
    }
    if (lastToken === 6) {
      $this.s18_1.w18(7);
    } else if (lastToken === 4) {
      if (!$this.u18_1) {
        invalidTrailingComma($this.s18_1);
      }
      $this.s18_1.w18(7);
    }
    return new JsonObject(result);
  }
  function readObject_0($this, _this__u8e3s4, $completion) {
    var tmp = new $readObjectCOROUTINE$($this, _this__u8e3s4, $completion);
    tmp.n8_1 = Unit_instance;
    tmp.o8_1 = null;
    return tmp.t8();
  }
  function readArray($this) {
    var lastToken = $this.s18_1.c19();
    if ($this.s18_1.x18() === 4) {
      $this.s18_1.s17('Unexpected leading comma');
    }
    // Inline function 'kotlin.collections.arrayListOf' call
    var result = ArrayList_init_$Create$();
    while ($this.s18_1.y18()) {
      var element = $this.b19();
      result.e(element);
      lastToken = $this.s18_1.c19();
      if (!(lastToken === 4)) {
        var tmp0 = $this.s18_1;
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
        var condition = lastToken === 9;
        var position = tmp0.p13_1;
        if (!condition) {
          var tmp$ret$1 = 'Expected end of the array or comma';
          tmp0.s17(tmp$ret$1, position);
        }
      }
    }
    if (lastToken === 8) {
      $this.s18_1.w18(9);
    } else if (lastToken === 4) {
      if (!$this.u18_1) {
        invalidTrailingComma($this.s18_1, 'array');
      }
      $this.s18_1.w18(9);
    }
    return new JsonArray(result);
  }
  function readValue($this, isString) {
    var tmp;
    if ($this.t18_1 || !isString) {
      tmp = $this.s18_1.a19();
    } else {
      tmp = $this.s18_1.z18();
    }
    var string = tmp;
    if (!isString && string === 'null')
      return JsonNull_getInstance();
    return new JsonLiteral(string, isString);
  }
  function readDeepRecursive($this) {
    return invoke(new DeepRecursiveFunction(JsonTreeReader$readDeepRecursive$slambda_0($this, null)), Unit_instance);
  }
  function JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation) {
    this.a1a_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(JsonTreeReader$readDeepRecursive$slambda).f1a = function ($this$DeepRecursiveFunction, it, $completion) {
    var tmp = this.g1a($this$DeepRecursiveFunction, it, $completion);
    tmp.n8_1 = Unit_instance;
    tmp.o8_1 = null;
    return tmp.t8();
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).z8 = function (p1, p2, $completion) {
    var tmp = p1 instanceof DeepRecursiveScope ? p1 : THROW_CCE();
    return this.f1a(tmp, p2 instanceof Unit ? p2 : THROW_CCE(), $completion);
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).t8 = function () {
    var suspendResult = this.n8_1;
    $sm: do
      try {
        var tmp = this.l8_1;
        switch (tmp) {
          case 0:
            this.m8_1 = 3;
            this.d1a_1 = this.a1a_1.s18_1.x18();
            if (this.d1a_1 === 1) {
              this.e1a_1 = readValue(this.a1a_1, true);
              this.l8_1 = 2;
              continue $sm;
            } else {
              if (this.d1a_1 === 0) {
                this.e1a_1 = readValue(this.a1a_1, false);
                this.l8_1 = 2;
                continue $sm;
              } else {
                if (this.d1a_1 === 6) {
                  this.l8_1 = 1;
                  suspendResult = readObject_0(this.a1a_1, this.b1a_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  if (this.d1a_1 === 8) {
                    this.e1a_1 = readArray(this.a1a_1);
                    this.l8_1 = 2;
                    continue $sm;
                  } else {
                    var tmp_0 = this;
                    this.a1a_1.s18_1.s17("Can't begin reading element, unexpected token");
                  }
                }
              }
            }

            break;
          case 1:
            this.e1a_1 = suspendResult;
            this.l8_1 = 2;
            continue $sm;
          case 2:
            return this.e1a_1;
          case 3:
            throw this.o8_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.m8_1 === 3) {
          throw e;
        } else {
          this.l8_1 = this.m8_1;
          this.o8_1 = e;
        }
      }
     while (true);
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).g1a = function ($this$DeepRecursiveFunction, it, completion) {
    var i = new JsonTreeReader$readDeepRecursive$slambda(this.a1a_1, completion);
    i.b1a_1 = $this$DeepRecursiveFunction;
    i.c1a_1 = it;
    return i;
  };
  function JsonTreeReader$readDeepRecursive$slambda_0(this$0, resultContinuation) {
    var i = new JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation);
    var l = function ($this$DeepRecursiveFunction, it, $completion) {
      return i.f1a($this$DeepRecursiveFunction, it, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function $readObjectCOROUTINE$(_this__u8e3s4, _this__u8e3s4_0, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.l19_1 = _this__u8e3s4;
    this.m19_1 = _this__u8e3s4_0;
  }
  protoOf($readObjectCOROUTINE$).t8 = function () {
    var suspendResult = this.n8_1;
    $sm: do
      try {
        var tmp = this.l8_1;
        switch (tmp) {
          case 0:
            this.m8_1 = 5;
            var tmp_0 = this;
            tmp_0.n19_1 = this.l19_1;
            this.o19_1 = this.n19_1;
            this.p19_1 = this.o19_1.s18_1.w18(6);
            if (this.o19_1.s18_1.x18() === 4) {
              this.o19_1.s18_1.s17('Unexpected leading comma');
            }

            var tmp_1 = this;
            tmp_1.q19_1 = LinkedHashMap_init_$Create$();
            this.l8_1 = 1;
            continue $sm;
          case 1:
            if (!this.o19_1.s18_1.y18()) {
              this.l8_1 = 4;
              continue $sm;
            }

            this.r19_1 = this.o19_1.t18_1 ? this.o19_1.s18_1.a19() : this.o19_1.s18_1.z18();
            this.o19_1.s18_1.w18(5);
            this.l8_1 = 2;
            suspendResult = this.m19_1.qh(Unit_instance, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            var element = suspendResult;
            var tmp0 = this.q19_1;
            var key = this.r19_1;
            tmp0.g2(key, element);
            this.p19_1 = this.o19_1.s18_1.c19();
            var tmp0_subject = this.p19_1;
            if (tmp0_subject === 4) {
              this.l8_1 = 3;
              continue $sm;
            } else {
              if (tmp0_subject === 7) {
                this.l8_1 = 4;
                continue $sm;
              } else {
                this.o19_1.s18_1.s17('Expected end of the object or comma');
              }
            }

            break;
          case 3:
            this.l8_1 = 1;
            continue $sm;
          case 4:
            if (this.p19_1 === 6) {
              this.o19_1.s18_1.w18(7);
            } else if (this.p19_1 === 4) {
              if (!this.o19_1.u18_1) {
                invalidTrailingComma(this.o19_1.s18_1);
              }
              this.o19_1.s18_1.w18(7);
            }

            return new JsonObject(this.q19_1);
          case 5:
            throw this.o8_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.m8_1 === 5) {
          throw e;
        } else {
          this.l8_1 = this.m8_1;
          this.o8_1 = e;
        }
      }
     while (true);
  };
  function JsonTreeReader(configuration, lexer) {
    this.s18_1 = lexer;
    this.t18_1 = configuration.p14_1;
    this.u18_1 = configuration.b15_1;
    this.v18_1 = 0;
  }
  protoOf(JsonTreeReader).b19 = function () {
    var token = this.s18_1.x18();
    var tmp;
    if (token === 1) {
      tmp = readValue(this, true);
    } else if (token === 0) {
      tmp = readValue(this, false);
    } else if (token === 6) {
      var tmp_0;
      this.v18_1 = this.v18_1 + 1 | 0;
      if (this.v18_1 === 200) {
        tmp_0 = readDeepRecursive(this);
      } else {
        tmp_0 = readObject(this);
      }
      var result = tmp_0;
      this.v18_1 = this.v18_1 - 1 | 0;
      tmp = result;
    } else if (token === 8) {
      tmp = readArray(this);
    } else {
      this.s18_1.s17('Cannot read Json element because of unexpected ' + tokenDescription(token));
    }
    return tmp;
  };
  function classDiscriminator(_this__u8e3s4, json) {
    var _iterator__ex2g4s = _this__u8e3s4.hl().g();
    while (_iterator__ex2g4s.h()) {
      var annotation = _iterator__ex2g4s.i();
      if (annotation instanceof JsonClassDiscriminator)
        return annotation.h1a_1;
    }
    return json.z12_1.w14_1;
  }
  function validateIfSealed(serializer, actualSerializer, classDiscriminator) {
    if (!(serializer instanceof SealedClassSerializer))
      return Unit_instance;
    if (jsonCachedSerialNames(actualSerializer.zj()).s1(classDiscriminator)) {
      var baseName = serializer.zj().dl();
      var actualName = actualSerializer.zj().dl();
      // Inline function 'kotlin.error' call
      var message = "Sealed class '" + actualName + "' cannot be serialized as base class '" + baseName + "' because" + (" it has property name that conflicts with JSON class discriminator '" + classDiscriminator + "'. ") + 'You can either change class discriminator in JsonConfiguration, rename property with @SerialName annotation or fall back to array polymorphism';
      throw IllegalStateException_init_$Create$(toString(message));
    }
  }
  function checkKind_0(kind) {
    if (kind instanceof ENUM) {
      // Inline function 'kotlin.error' call
      var message = "Enums cannot be serialized polymorphically with 'type' parameter. You can use 'JsonBuilder.useArrayPolymorphism' instead";
      throw IllegalStateException_init_$Create$(toString(message));
    }
    if (kind instanceof PrimitiveKind) {
      // Inline function 'kotlin.error' call
      var message_0 = "Primitives cannot be serialized polymorphically with 'type' parameter. You can use 'JsonBuilder.useArrayPolymorphism' instead";
      throw IllegalStateException_init_$Create$(toString(message_0));
    }
    if (kind instanceof PolymorphicKind) {
      // Inline function 'kotlin.error' call
      var message_1 = 'Actual serializer for polymorphic cannot be polymorphic itself';
      throw IllegalStateException_init_$Create$(toString(message_1));
    }
  }
  function access$validateIfSealed$tPolymorphicKt(serializer, actualSerializer, classDiscriminator) {
    return validateIfSealed(serializer, actualSerializer, classDiscriminator);
  }
  function Key() {
  }
  function DescriptorSchemaCache() {
    this.t17_1 = createMapForCache(16);
  }
  protoOf(DescriptorSchemaCache).i1a = function (descriptor, key, value) {
    // Inline function 'kotlin.collections.getOrPut' call
    var this_0 = this.t17_1;
    var value_0 = this_0.y1(descriptor);
    var tmp;
    if (value_0 == null) {
      var answer = createMapForCache(2);
      this_0.g2(descriptor, answer);
      tmp = answer;
    } else {
      tmp = value_0;
    }
    var tmp0 = tmp;
    var tmp2 = key instanceof Key ? key : THROW_CCE();
    // Inline function 'kotlin.collections.set' call
    var value_1 = !(value == null) ? value : THROW_CCE();
    tmp0.g2(tmp2, value_1);
  };
  protoOf(DescriptorSchemaCache).u17 = function (descriptor, key, defaultValue) {
    var tmp0_safe_receiver = this.j1a(descriptor, key);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return tmp0_safe_receiver;
    }
    var value = defaultValue();
    this.i1a(descriptor, key, value);
    return value;
  };
  protoOf(DescriptorSchemaCache).j1a = function (descriptor, key) {
    var tmp0_safe_receiver = this.t17_1.y1(descriptor);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      tmp = tmp0_safe_receiver.y1(key instanceof Key ? key : THROW_CCE());
    }
    var tmp_0 = tmp;
    return !(tmp_0 == null) ? tmp_0 : null;
  };
  function DiscriminatorHolder(discriminatorToSkip) {
    this.k1a_1 = discriminatorToSkip;
  }
  function trySkip($this, _this__u8e3s4, unknownKey) {
    if (_this__u8e3s4 == null)
      return false;
    if (_this__u8e3s4.k1a_1 === unknownKey) {
      _this__u8e3s4.k1a_1 = null;
      return true;
    }
    return false;
  }
  function skipLeftoverElements($this, descriptor) {
    while (!($this.mn(descriptor) === -1)) {
    }
  }
  function checkLeadingComma($this) {
    if ($this.j13_1.x18() === 4) {
      $this.j13_1.s17('Unexpected leading comma');
    }
  }
  function decodeMapIndex($this) {
    var hasComma = false;
    var decodingKey = !(($this.l13_1 % 2 | 0) === 0);
    if (decodingKey) {
      if (!($this.l13_1 === -1)) {
        hasComma = $this.j13_1.m1a();
      }
    } else {
      $this.j13_1.l1a(_Char___init__impl__6a9atx(58));
    }
    var tmp;
    if ($this.j13_1.y18()) {
      if (decodingKey) {
        if ($this.l13_1 === -1) {
          var tmp0 = $this.j13_1;
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
          var condition = !hasComma;
          var position = tmp0.p13_1;
          if (!condition) {
            var tmp$ret$0 = 'Unexpected leading comma';
            tmp0.s17(tmp$ret$0, position);
          }
        } else {
          var tmp0_0 = $this.j13_1;
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
          var condition_0 = hasComma;
          var position_0 = tmp0_0.p13_1;
          if (!condition_0) {
            var tmp$ret$2 = 'Expected comma after the key-value pair';
            tmp0_0.s17(tmp$ret$2, position_0);
          }
        }
      }
      $this.l13_1 = $this.l13_1 + 1 | 0;
      tmp = $this.l13_1;
    } else {
      if (hasComma && !$this.h13_1.z12_1.b15_1) {
        invalidTrailingComma($this.j13_1);
      }
      tmp = -1;
    }
    return tmp;
  }
  function coerceInputValue($this, descriptor, index) {
    var tmp0 = $this.h13_1;
    var tmp$ret$1;
    $l$block_2: {
      // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
      var isOptional = descriptor.ml(index);
      var elementDescriptor = descriptor.ll(index);
      var tmp;
      if (isOptional && !elementDescriptor.zk()) {
        tmp = $this.j13_1.n1a(true);
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$1 = true;
        break $l$block_2;
      }
      if (equals(elementDescriptor.el(), ENUM_getInstance())) {
        var tmp_0;
        if (elementDescriptor.zk()) {
          tmp_0 = $this.j13_1.n1a(false);
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp$ret$1 = false;
          break $l$block_2;
        }
        var tmp0_elvis_lhs = $this.j13_1.o1a($this.n13_1.p14_1);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          tmp$ret$1 = false;
          break $l$block_2;
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        var enumValue = tmp_1;
        var enumIndex = getJsonNameIndex(elementDescriptor, tmp0, enumValue);
        var coerceToNull = !tmp0.z12_1.s14_1 && elementDescriptor.zk();
        if (enumIndex === -3 && (isOptional || coerceToNull)) {
          $this.j13_1.z18();
          tmp$ret$1 = true;
          break $l$block_2;
        }
      }
      tmp$ret$1 = false;
    }
    return tmp$ret$1;
  }
  function decodeObjectIndex($this, descriptor) {
    var hasComma = $this.j13_1.m1a();
    while ($this.j13_1.y18()) {
      hasComma = false;
      var key = decodeStringKey($this);
      $this.j13_1.l1a(_Char___init__impl__6a9atx(58));
      var index = getJsonNameIndex(descriptor, $this.h13_1, key);
      var tmp;
      if (!(index === -3)) {
        var tmp_0;
        if ($this.n13_1.u14_1 && coerceInputValue($this, descriptor, index)) {
          hasComma = $this.j13_1.m1a();
          tmp_0 = false;
        } else {
          var tmp0_safe_receiver = $this.o13_1;
          if (tmp0_safe_receiver == null)
            null;
          else {
            tmp0_safe_receiver.p17(index);
          }
          return index;
        }
        tmp = tmp_0;
      } else {
        tmp = true;
      }
      var isUnknown = tmp;
      if (isUnknown) {
        hasComma = handleUnknown($this, descriptor, key);
      }
    }
    if (hasComma && !$this.h13_1.z12_1.b15_1) {
      invalidTrailingComma($this.j13_1);
    }
    var tmp1_safe_receiver = $this.o13_1;
    var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.q17();
    return tmp2_elvis_lhs == null ? -1 : tmp2_elvis_lhs;
  }
  function handleUnknown($this, descriptor, key) {
    if (ignoreUnknownKeys(descriptor, $this.h13_1) || trySkip($this, $this.m13_1, key)) {
      $this.j13_1.q1a($this.n13_1.p14_1);
    } else {
      $this.j13_1.q13_1.e18();
      $this.j13_1.p1a(key);
    }
    return $this.j13_1.m1a();
  }
  function decodeListIndex($this) {
    var hasComma = $this.j13_1.m1a();
    var tmp;
    if ($this.j13_1.y18()) {
      if (!($this.l13_1 === -1) && !hasComma) {
        $this.j13_1.s17('Expected end of the array or comma');
      }
      $this.l13_1 = $this.l13_1 + 1 | 0;
      tmp = $this.l13_1;
    } else {
      if (hasComma && !$this.h13_1.z12_1.b15_1) {
        invalidTrailingComma($this.j13_1, 'array');
      }
      tmp = -1;
    }
    return tmp;
  }
  function decodeStringKey($this) {
    var tmp;
    if ($this.n13_1.p14_1) {
      tmp = $this.j13_1.s1a();
    } else {
      tmp = $this.j13_1.r1a();
    }
    return tmp;
  }
  function StreamingJsonDecoder(json, mode, lexer, descriptor, discriminatorHolder) {
    AbstractDecoder.call(this);
    this.h13_1 = json;
    this.i13_1 = mode;
    this.j13_1 = lexer;
    this.k13_1 = this.h13_1.kn();
    this.l13_1 = -1;
    this.m13_1 = discriminatorHolder;
    this.n13_1 = this.h13_1.z12_1;
    this.o13_1 = this.n13_1.s14_1 ? null : new JsonElementMarker(descriptor);
  }
  protoOf(StreamingJsonDecoder).e15 = function () {
    return this.h13_1;
  };
  protoOf(StreamingJsonDecoder).kn = function () {
    return this.k13_1;
  };
  protoOf(StreamingJsonDecoder).f15 = function () {
    return (new JsonTreeReader(this.h13_1.z12_1, this.j13_1)).b19();
  };
  protoOf(StreamingJsonDecoder).vm = function (deserializer) {
    try {
      var tmp;
      if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
        tmp = true;
      } else {
        tmp = this.h13_1.z12_1.v14_1;
      }
      if (tmp) {
        return deserializer.bk(this);
      }
      var discriminator = classDiscriminator(deserializer.zj(), this.h13_1);
      var tmp0_elvis_lhs = this.j13_1.t1a(discriminator, this.n13_1.p14_1);
      var tmp_0;
      if (tmp0_elvis_lhs == null) {
        var tmp2 = isInterface(deserializer, DeserializationStrategy) ? deserializer : THROW_CCE();
        var tmp$ret$0;
        $l$block: {
          // Inline function 'kotlinx.serialization.json.internal.decodeSerializableValuePolymorphic' call
          var tmp_1;
          if (!(tmp2 instanceof AbstractPolymorphicSerializer)) {
            tmp_1 = true;
          } else {
            tmp_1 = this.e15().z12_1.v14_1;
          }
          if (tmp_1) {
            tmp$ret$0 = tmp2.bk(this);
            break $l$block;
          }
          var discriminator_0 = classDiscriminator(tmp2.zj(), this.e15());
          var tmp0 = this.f15();
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var serialName = tmp2.zj().dl();
          if (!(tmp0 instanceof JsonObject)) {
            var tmp_2 = getKClass(JsonObject).m9();
            var tmp_3 = getKClassFromExpression(tmp0).m9();
            var tmp$ret$1 = this.j13_1.q13_1.f18();
            throw JsonDecodingException_0(-1, 'Expected ' + tmp_2 + ', but had ' + tmp_3 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$1, toString(tmp0));
          }
          var jsonTree = tmp0;
          var tmp0_safe_receiver = jsonTree.l15(discriminator_0);
          var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
          var type = tmp1_safe_receiver == null ? null : get_contentOrNull(tmp1_safe_receiver);
          var tmp_4;
          try {
            tmp_4 = findPolymorphicSerializer(tmp2, this, type);
          } catch ($p) {
            var tmp_5;
            if ($p instanceof SerializationException) {
              var it = $p;
              throw JsonDecodingException_0(-1, ensureNotNull(it.message), jsonTree.toString());
            } else {
              throw $p;
            }
          }
          var tmp_6 = tmp_4;
          var actualSerializer = isInterface(tmp_6, DeserializationStrategy) ? tmp_6 : THROW_CCE();
          tmp$ret$0 = readPolymorphicJson(this.e15(), discriminator_0, jsonTree, actualSerializer);
        }
        return tmp$ret$0;
      } else {
        tmp_0 = tmp0_elvis_lhs;
      }
      var type_0 = tmp_0;
      var tmp_7;
      try {
        tmp_7 = findPolymorphicSerializer(deserializer, this, type_0);
      } catch ($p) {
        var tmp_8;
        if ($p instanceof SerializationException) {
          var it_0 = $p;
          var message = removeSuffix(substringBefore(ensureNotNull(it_0.message), _Char___init__impl__6a9atx(10)), '.');
          var hint = substringAfter(ensureNotNull(it_0.message), _Char___init__impl__6a9atx(10), '');
          this.j13_1.s17(message, VOID, hint);
        } else {
          throw $p;
        }
        tmp_7 = tmp_8;
      }
      var tmp_9 = tmp_7;
      var actualSerializer_0 = isInterface(tmp_9, DeserializationStrategy) ? tmp_9 : THROW_CCE();
      this.m13_1 = new DiscriminatorHolder(discriminator);
      return actualSerializer_0.bk(this);
    } catch ($p) {
      if ($p instanceof MissingFieldException) {
        var e = $p;
        if (contains(ensureNotNull(e.message), 'at path'))
          throw e;
        throw new MissingFieldException(e.tk_1, plus(e.message, ' at path: ') + this.j13_1.q13_1.f18(), e);
      } else {
        throw $p;
      }
    }
  };
  protoOf(StreamingJsonDecoder).wm = function (descriptor) {
    var newMode = switchMode(this.h13_1, descriptor);
    this.j13_1.q13_1.a18(descriptor);
    this.j13_1.l1a(newMode.w1a_1);
    checkLeadingComma(this);
    var tmp;
    switch (newMode.k2_1) {
      case 1:
      case 2:
      case 3:
        tmp = new StreamingJsonDecoder(this.h13_1, newMode, this.j13_1, descriptor, this.m13_1);
        break;
      default:
        var tmp_0;
        if (this.i13_1.equals(newMode) && this.h13_1.z12_1.s14_1) {
          tmp_0 = this;
        } else {
          tmp_0 = new StreamingJsonDecoder(this.h13_1, newMode, this.j13_1, descriptor, this.m13_1);
        }

        tmp = tmp_0;
        break;
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).xm = function (descriptor) {
    if (descriptor.gl() === 0 && ignoreUnknownKeys(descriptor, this.h13_1)) {
      skipLeftoverElements(this, descriptor);
    }
    if (this.j13_1.m1a() && !this.h13_1.z12_1.b15_1) {
      invalidTrailingComma(this.j13_1, '');
    }
    this.j13_1.l1a(this.i13_1.x1a_1);
    this.j13_1.q13_1.e18();
  };
  protoOf(StreamingJsonDecoder).im = function () {
    var tmp;
    var tmp0_safe_receiver = this.o13_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.o17_1;
    if (!(tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs)) {
      tmp = !this.j13_1.y1a();
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).jm = function () {
    return null;
  };
  protoOf(StreamingJsonDecoder).in = function (descriptor, index, deserializer, previousValue) {
    var isMapKey = this.i13_1.equals(WriteMode_MAP_getInstance()) && (index & 1) === 0;
    if (isMapKey) {
      this.j13_1.q13_1.d18();
    }
    var value = protoOf(AbstractDecoder).in.call(this, descriptor, index, deserializer, previousValue);
    if (isMapKey) {
      this.j13_1.q13_1.c18(value);
    }
    return value;
  };
  protoOf(StreamingJsonDecoder).mn = function (descriptor) {
    var index;
    switch (this.i13_1.k2_1) {
      case 0:
        index = decodeObjectIndex(this, descriptor);
        break;
      case 2:
        index = decodeMapIndex(this);
        break;
      default:
        index = decodeListIndex(this);
        break;
    }
    if (!this.i13_1.equals(WriteMode_MAP_getInstance())) {
      this.j13_1.q13_1.b18(index);
    }
    return index;
  };
  protoOf(StreamingJsonDecoder).km = function () {
    return this.j13_1.z1a();
  };
  protoOf(StreamingJsonDecoder).lm = function () {
    var value = this.j13_1.a1b();
    if (!value.equals(toLong(value.f3()))) {
      this.j13_1.s17("Failed to parse byte for input '" + value.toString() + "'");
    }
    return value.f3();
  };
  protoOf(StreamingJsonDecoder).mm = function () {
    var value = this.j13_1.a1b();
    if (!value.equals(toLong(value.g3()))) {
      this.j13_1.s17("Failed to parse short for input '" + value.toString() + "'");
    }
    return value.g3();
  };
  protoOf(StreamingJsonDecoder).nm = function () {
    var value = this.j13_1.a1b();
    if (!value.equals(toLong(value.e1()))) {
      this.j13_1.s17("Failed to parse int for input '" + value.toString() + "'");
    }
    return value.e1();
  };
  protoOf(StreamingJsonDecoder).om = function () {
    return this.j13_1.a1b();
  };
  protoOf(StreamingJsonDecoder).pm = function () {
    var tmp0 = this.j13_1;
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.a19();
      try {
        // Inline function 'kotlin.text.toFloat' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp$ret$4 = toDouble(input);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.s17("Failed to parse type '" + 'float' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$4;
    var specialFp = this.h13_1.z12_1.x14_1;
    if (specialFp || isFinite(result))
      return result;
    throwInvalidFloatingPointDecoded(this.j13_1, result);
  };
  protoOf(StreamingJsonDecoder).qm = function () {
    var tmp0 = this.j13_1;
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.a19();
      try {
        tmp$ret$1 = toDouble(input);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.s17("Failed to parse type '" + 'double' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$1;
    var specialFp = this.h13_1.z12_1.x14_1;
    if (specialFp || isFinite_0(result))
      return result;
    throwInvalidFloatingPointDecoded(this.j13_1, result);
  };
  protoOf(StreamingJsonDecoder).rm = function () {
    var string = this.j13_1.a19();
    if (!(string.length === 1)) {
      this.j13_1.s17("Expected single char, but got '" + string + "'");
    }
    return charCodeAt(string, 0);
  };
  protoOf(StreamingJsonDecoder).sm = function () {
    var tmp;
    if (this.n13_1.p14_1) {
      tmp = this.j13_1.s1a();
    } else {
      tmp = this.j13_1.z18();
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).tm = function (descriptor) {
    return get_isUnsignedNumber(descriptor) ? new JsonDecoderForUnsignedTypes(this.j13_1, this.h13_1) : protoOf(AbstractDecoder).tm.call(this, descriptor);
  };
  function JsonDecoderForUnsignedTypes(lexer, json) {
    AbstractDecoder.call(this);
    this.b1b_1 = lexer;
    this.c1b_1 = json.kn();
  }
  protoOf(JsonDecoderForUnsignedTypes).kn = function () {
    return this.c1b_1;
  };
  protoOf(JsonDecoderForUnsignedTypes).mn = function (descriptor) {
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(JsonDecoderForUnsignedTypes).nm = function () {
    var tmp0 = this.b1b_1;
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.a19();
      try {
        // Inline function 'kotlin.UInt.toInt' call
        var this_0 = toUInt(input);
        tmp$ret$2 = _UInt___get_data__impl__f0vqqw(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.s17("Failed to parse type '" + 'UInt' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(JsonDecoderForUnsignedTypes).om = function () {
    var tmp0 = this.b1b_1;
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.a19();
      try {
        // Inline function 'kotlin.ULong.toLong' call
        var this_0 = toULong(input);
        tmp$ret$2 = _ULong___get_data__impl__fggpzb(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.s17("Failed to parse type '" + 'ULong' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(JsonDecoderForUnsignedTypes).lm = function () {
    var tmp0 = this.b1b_1;
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.a19();
      try {
        // Inline function 'kotlin.UByte.toByte' call
        var this_0 = toUByte(input);
        tmp$ret$2 = _UByte___get_data__impl__jof9qr(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.s17("Failed to parse type '" + 'UByte' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(JsonDecoderForUnsignedTypes).mm = function () {
    var tmp0 = this.b1b_1;
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var input = tmp0.a19();
      try {
        // Inline function 'kotlin.UShort.toShort' call
        var this_0 = toUShort(input);
        tmp$ret$2 = _UShort___get_data__impl__g0245(this_0);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          tmp0.s17("Failed to parse type '" + 'UShort' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  function get_unsignedNumberDescriptors() {
    _init_properties_StreamingJsonEncoder_kt__pn1bsi();
    return unsignedNumberDescriptors;
  }
  var unsignedNumberDescriptors;
  function StreamingJsonEncoder_init_$Init$(output, json, mode, modeReuseCache, $this) {
    StreamingJsonEncoder.call($this, Composer_0(output, json), json, mode, modeReuseCache);
    return $this;
  }
  function StreamingJsonEncoder_init_$Create$(output, json, mode, modeReuseCache) {
    return StreamingJsonEncoder_init_$Init$(output, json, mode, modeReuseCache, objectCreate(protoOf(StreamingJsonEncoder)));
  }
  function encodeTypeInfo($this, discriminator, serialName) {
    $this.j18_1.m16();
    $this.zn(discriminator);
    $this.j18_1.p16(_Char___init__impl__6a9atx(58));
    $this.j18_1.o16();
    $this.zn(serialName);
  }
  function StreamingJsonEncoder(composer, json, mode, modeReuseCache) {
    AbstractEncoder.call(this);
    this.j18_1 = composer;
    this.k18_1 = json;
    this.l18_1 = mode;
    this.m18_1 = modeReuseCache;
    this.n18_1 = this.k18_1.kn();
    this.o18_1 = this.k18_1.z12_1;
    this.p18_1 = false;
    this.q18_1 = null;
    this.r18_1 = null;
    var i = this.l18_1.k2_1;
    if (!(this.m18_1 == null)) {
      if (!(this.m18_1[i] === null) || !(this.m18_1[i] === this)) {
        this.m18_1[i] = this;
      }
    }
  }
  protoOf(StreamingJsonEncoder).e15 = function () {
    return this.k18_1;
  };
  protoOf(StreamingJsonEncoder).kn = function () {
    return this.n18_1;
  };
  protoOf(StreamingJsonEncoder).mo = function (serializer, value) {
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.encodePolymorphically' call
      if (this.e15().z12_1.v14_1) {
        serializer.ak(this, value);
        break $l$block;
      }
      var isPolymorphicSerializer = serializer instanceof AbstractPolymorphicSerializer;
      var tmp;
      if (isPolymorphicSerializer) {
        tmp = !this.e15().z12_1.d15_1.equals(ClassDiscriminatorMode_NONE_getInstance());
      } else {
        var tmp_0;
        switch (this.e15().z12_1.d15_1.k2_1) {
          case 0:
          case 2:
            tmp_0 = false;
            break;
          case 1:
            // Inline function 'kotlin.let' call

            var it = serializer.zj().el();
            tmp_0 = equals(it, CLASS_getInstance()) || equals(it, OBJECT_getInstance());
            break;
          default:
            noWhenBranchMatchedException();
            break;
        }
        tmp = tmp_0;
      }
      var needDiscriminator = tmp;
      var baseClassDiscriminator = needDiscriminator ? classDiscriminator(serializer.zj(), this.e15()) : null;
      var tmp_1;
      if (isPolymorphicSerializer) {
        var casted = serializer instanceof AbstractPolymorphicSerializer ? serializer : THROW_CCE();
        $l$block_0: {
          // Inline function 'kotlin.requireNotNull' call
          if (value == null) {
            var message = 'Value for serializer ' + toString(serializer.zj()) + ' should always be non-null. Please report issue to the kotlinx.serialization tracker.';
            throw IllegalArgumentException_init_$Create$(toString(message));
          } else {
            break $l$block_0;
          }
        }
        var actual = findPolymorphicSerializer_0(casted, this, value);
        if (!(baseClassDiscriminator == null)) {
          access$validateIfSealed$tPolymorphicKt(serializer, actual, baseClassDiscriminator);
          checkKind_0(actual.zj().el());
        }
        tmp_1 = isInterface(actual, SerializationStrategy) ? actual : THROW_CCE();
      } else {
        tmp_1 = serializer;
      }
      var actualSerializer = tmp_1;
      if (!(baseClassDiscriminator == null)) {
        var serialName = actualSerializer.zj().dl();
        this.q18_1 = baseClassDiscriminator;
        this.r18_1 = serialName;
      }
      actualSerializer.ak(this, value);
    }
  };
  protoOf(StreamingJsonEncoder).wm = function (descriptor) {
    var newMode = switchMode(this.k18_1, descriptor);
    if (!(newMode.w1a_1 === _Char___init__impl__6a9atx(0))) {
      this.j18_1.p16(newMode.w1a_1);
      this.j18_1.k16();
    }
    var discriminator = this.q18_1;
    if (!(discriminator == null)) {
      var tmp0_elvis_lhs = this.r18_1;
      encodeTypeInfo(this, discriminator, tmp0_elvis_lhs == null ? descriptor.dl() : tmp0_elvis_lhs);
      this.q18_1 = null;
      this.r18_1 = null;
    }
    if (this.l18_1.equals(newMode)) {
      return this;
    }
    var tmp1_safe_receiver = this.m18_1;
    var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver[newMode.k2_1];
    return tmp2_elvis_lhs == null ? new StreamingJsonEncoder(this.j18_1, this.k18_1, newMode, this.m18_1) : tmp2_elvis_lhs;
  };
  protoOf(StreamingJsonEncoder).xm = function (descriptor) {
    if (!(this.l18_1.x1a_1 === _Char___init__impl__6a9atx(0))) {
      this.j18_1.l16();
      this.j18_1.n16();
      this.j18_1.p16(this.l18_1.x1a_1);
    }
  };
  protoOf(StreamingJsonEncoder).on = function (descriptor, index) {
    switch (this.l18_1.k2_1) {
      case 1:
        if (!this.j18_1.j16_1) {
          this.j18_1.p16(_Char___init__impl__6a9atx(44));
        }

        this.j18_1.m16();
        break;
      case 2:
        if (!this.j18_1.j16_1) {
          var tmp = this;
          var tmp_0;
          if ((index % 2 | 0) === 0) {
            this.j18_1.p16(_Char___init__impl__6a9atx(44));
            this.j18_1.m16();
            tmp_0 = true;
          } else {
            this.j18_1.p16(_Char___init__impl__6a9atx(58));
            this.j18_1.o16();
            tmp_0 = false;
          }
          tmp.p18_1 = tmp_0;
        } else {
          this.p18_1 = true;
          this.j18_1.m16();
        }

        break;
      case 3:
        if (index === 0)
          this.p18_1 = true;
        if (index === 1) {
          this.j18_1.p16(_Char___init__impl__6a9atx(44));
          this.j18_1.o16();
          this.p18_1 = false;
        }

        break;
      default:
        if (!this.j18_1.j16_1) {
          this.j18_1.p16(_Char___init__impl__6a9atx(44));
        }

        this.j18_1.m16();
        this.zn(getJsonElementName(descriptor, this.k18_1, index));
        this.j18_1.p16(_Char___init__impl__6a9atx(58));
        this.j18_1.o16();
        break;
    }
    return true;
  };
  protoOf(StreamingJsonEncoder).ao = function (descriptor) {
    var tmp;
    if (get_isUnsignedNumber(descriptor)) {
      // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
      var tmp_0;
      var tmp_1 = this.j18_1;
      if (tmp_1 instanceof ComposerForUnsignedNumbers) {
        tmp_0 = this.j18_1;
      } else {
        var tmp0 = this.j18_1.i16_1;
        var p1 = this.p18_1;
        tmp_0 = new ComposerForUnsignedNumbers(tmp0, p1);
      }
      var tmp$ret$1 = tmp_0;
      tmp = new StreamingJsonEncoder(tmp$ret$1, this.k18_1, this.l18_1, null);
    } else if (get_isUnquotedLiteral(descriptor)) {
      // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
      var tmp_2;
      var tmp_3 = this.j18_1;
      if (tmp_3 instanceof ComposerForUnquotedLiterals) {
        tmp_2 = this.j18_1;
      } else {
        var tmp0_0 = this.j18_1.i16_1;
        var p1_0 = this.p18_1;
        tmp_2 = new ComposerForUnquotedLiterals(tmp0_0, p1_0);
      }
      var tmp$ret$3 = tmp_2;
      tmp = new StreamingJsonEncoder(tmp$ret$3, this.k18_1, this.l18_1, null);
    } else if (!(this.q18_1 == null)) {
      // Inline function 'kotlin.apply' call
      this.r18_1 = descriptor.dl();
      tmp = this;
    } else {
      tmp = protoOf(AbstractEncoder).ao.call(this, descriptor);
    }
    return tmp;
  };
  protoOf(StreamingJsonEncoder).qn = function () {
    this.j18_1.r16('null');
  };
  protoOf(StreamingJsonEncoder).rn = function (value) {
    if (this.p18_1) {
      this.zn(value.toString());
    } else {
      this.j18_1.a17(value);
    }
  };
  protoOf(StreamingJsonEncoder).sn = function (value) {
    if (this.p18_1) {
      this.zn(value.toString());
    } else {
      this.j18_1.v16(value);
    }
  };
  protoOf(StreamingJsonEncoder).tn = function (value) {
    if (this.p18_1) {
      this.zn(value.toString());
    } else {
      this.j18_1.x16(value);
    }
  };
  protoOf(StreamingJsonEncoder).un = function (value) {
    if (this.p18_1) {
      this.zn(value.toString());
    } else {
      this.j18_1.y16(value);
    }
  };
  protoOf(StreamingJsonEncoder).vn = function (value) {
    if (this.p18_1) {
      this.zn(value.toString());
    } else {
      this.j18_1.z16(value);
    }
  };
  protoOf(StreamingJsonEncoder).wn = function (value) {
    if (this.p18_1) {
      this.zn(value.toString());
    } else {
      this.j18_1.t16(value);
    }
    if (!this.o18_1.x14_1 && !isFinite(value)) {
      throw InvalidFloatingPointEncoded(value, toString(this.j18_1.i16_1));
    }
  };
  protoOf(StreamingJsonEncoder).xn = function (value) {
    if (this.p18_1) {
      this.zn(value.toString());
    } else {
      this.j18_1.u16(value);
    }
    if (!this.o18_1.x14_1 && !isFinite_0(value)) {
      throw InvalidFloatingPointEncoded(value, toString(this.j18_1.i16_1));
    }
  };
  protoOf(StreamingJsonEncoder).yn = function (value) {
    this.zn(toString_1(value));
  };
  protoOf(StreamingJsonEncoder).zn = function (value) {
    return this.j18_1.b17(value);
  };
  function get_isUnsignedNumber(_this__u8e3s4) {
    _init_properties_StreamingJsonEncoder_kt__pn1bsi();
    return _this__u8e3s4.fl() && get_unsignedNumberDescriptors().s1(_this__u8e3s4);
  }
  function get_isUnquotedLiteral(_this__u8e3s4) {
    _init_properties_StreamingJsonEncoder_kt__pn1bsi();
    return _this__u8e3s4.fl() && equals(_this__u8e3s4, get_jsonUnquotedLiteralDescriptor());
  }
  var properties_initialized_StreamingJsonEncoder_kt_6ifwwk;
  function _init_properties_StreamingJsonEncoder_kt__pn1bsi() {
    if (!properties_initialized_StreamingJsonEncoder_kt_6ifwwk) {
      properties_initialized_StreamingJsonEncoder_kt_6ifwwk = true;
      unsignedNumberDescriptors = setOf([serializer_1(Companion_getInstance_0()).zj(), serializer_0(Companion_getInstance()).zj(), serializer_2(Companion_getInstance_1()).zj(), serializer_3(Companion_getInstance_2()).zj()]);
    }
  }
  function get_ESCAPE_STRINGS() {
    _init_properties_StringOps_kt__fcy1db();
    return ESCAPE_STRINGS;
  }
  var ESCAPE_STRINGS;
  var ESCAPE_MARKERS;
  function toHexChar(i) {
    _init_properties_StringOps_kt__fcy1db();
    var d = i & 15;
    var tmp;
    if (d < 10) {
      // Inline function 'kotlin.code' call
      var this_0 = _Char___init__impl__6a9atx(48);
      var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
      tmp = numberToChar(d + tmp$ret$0 | 0);
    } else {
      var tmp_0 = d - 10 | 0;
      // Inline function 'kotlin.code' call
      var this_1 = _Char___init__impl__6a9atx(97);
      var tmp$ret$1 = Char__toInt_impl_vasixd(this_1);
      tmp = numberToChar(tmp_0 + tmp$ret$1 | 0);
    }
    return tmp;
  }
  function printQuoted(_this__u8e3s4, value) {
    _init_properties_StringOps_kt__fcy1db();
    _this__u8e3s4.x7(_Char___init__impl__6a9atx(34));
    var lastPos = 0;
    var inductionVariable = 0;
    var last = charSequenceLength(value) - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.code' call
        var this_0 = charCodeAt(value, i);
        var c = Char__toInt_impl_vasixd(this_0);
        if (c < get_ESCAPE_STRINGS().length && !(get_ESCAPE_STRINGS()[c] == null)) {
          _this__u8e3s4.va(value, lastPos, i);
          _this__u8e3s4.w7(get_ESCAPE_STRINGS()[c]);
          lastPos = i + 1 | 0;
        }
      }
       while (inductionVariable <= last);
    if (!(lastPos === 0))
      _this__u8e3s4.va(value, lastPos, value.length);
    else
      _this__u8e3s4.w7(value);
    _this__u8e3s4.x7(_Char___init__impl__6a9atx(34));
  }
  function toBooleanStrictOrNull_0(_this__u8e3s4) {
    _init_properties_StringOps_kt__fcy1db();
    return equals_0(_this__u8e3s4, 'true', true) ? true : equals_0(_this__u8e3s4, 'false', true) ? false : null;
  }
  var properties_initialized_StringOps_kt_wzaea7;
  function _init_properties_StringOps_kt__fcy1db() {
    if (!properties_initialized_StringOps_kt_wzaea7) {
      properties_initialized_StringOps_kt_wzaea7 = true;
      // Inline function 'kotlin.arrayOfNulls' call
      // Inline function 'kotlin.apply' call
      var this_0 = Array(93);
      var inductionVariable = 0;
      if (inductionVariable <= 31)
        do {
          var c = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var c1 = toHexChar(c >> 12);
          var c2 = toHexChar(c >> 8);
          var c3 = toHexChar(c >> 4);
          var c4 = toHexChar(c);
          this_0[c] = '\\u' + toString_1(c1) + toString_1(c2) + toString_1(c3) + toString_1(c4);
        }
         while (inductionVariable <= 31);
      // Inline function 'kotlin.code' call
      var this_1 = _Char___init__impl__6a9atx(34);
      this_0[Char__toInt_impl_vasixd(this_1)] = '\\"';
      // Inline function 'kotlin.code' call
      var this_2 = _Char___init__impl__6a9atx(92);
      this_0[Char__toInt_impl_vasixd(this_2)] = '\\\\';
      // Inline function 'kotlin.code' call
      var this_3 = _Char___init__impl__6a9atx(9);
      this_0[Char__toInt_impl_vasixd(this_3)] = '\\t';
      // Inline function 'kotlin.code' call
      var this_4 = _Char___init__impl__6a9atx(8);
      this_0[Char__toInt_impl_vasixd(this_4)] = '\\b';
      // Inline function 'kotlin.code' call
      var this_5 = _Char___init__impl__6a9atx(10);
      this_0[Char__toInt_impl_vasixd(this_5)] = '\\n';
      // Inline function 'kotlin.code' call
      var this_6 = _Char___init__impl__6a9atx(13);
      this_0[Char__toInt_impl_vasixd(this_6)] = '\\r';
      this_0[12] = '\\f';
      ESCAPE_STRINGS = this_0;
      // Inline function 'kotlin.apply' call
      var this_7 = new Int8Array(93);
      var inductionVariable_0 = 0;
      if (inductionVariable_0 <= 31)
        do {
          var c_0 = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          this_7[c_0] = 1;
        }
         while (inductionVariable_0 <= 31);
      // Inline function 'kotlin.code' call
      var this_8 = _Char___init__impl__6a9atx(34);
      var tmp = Char__toInt_impl_vasixd(this_8);
      // Inline function 'kotlin.code' call
      var this_9 = _Char___init__impl__6a9atx(34);
      var tmp$ret$1 = Char__toInt_impl_vasixd(this_9);
      this_7[tmp] = toByte(tmp$ret$1);
      // Inline function 'kotlin.code' call
      var this_10 = _Char___init__impl__6a9atx(92);
      var tmp_0 = Char__toInt_impl_vasixd(this_10);
      // Inline function 'kotlin.code' call
      var this_11 = _Char___init__impl__6a9atx(92);
      var tmp$ret$3 = Char__toInt_impl_vasixd(this_11);
      this_7[tmp_0] = toByte(tmp$ret$3);
      // Inline function 'kotlin.code' call
      var this_12 = _Char___init__impl__6a9atx(9);
      var tmp_1 = Char__toInt_impl_vasixd(this_12);
      // Inline function 'kotlin.code' call
      var this_13 = _Char___init__impl__6a9atx(116);
      var tmp$ret$5 = Char__toInt_impl_vasixd(this_13);
      this_7[tmp_1] = toByte(tmp$ret$5);
      // Inline function 'kotlin.code' call
      var this_14 = _Char___init__impl__6a9atx(8);
      var tmp_2 = Char__toInt_impl_vasixd(this_14);
      // Inline function 'kotlin.code' call
      var this_15 = _Char___init__impl__6a9atx(98);
      var tmp$ret$7 = Char__toInt_impl_vasixd(this_15);
      this_7[tmp_2] = toByte(tmp$ret$7);
      // Inline function 'kotlin.code' call
      var this_16 = _Char___init__impl__6a9atx(10);
      var tmp_3 = Char__toInt_impl_vasixd(this_16);
      // Inline function 'kotlin.code' call
      var this_17 = _Char___init__impl__6a9atx(110);
      var tmp$ret$9 = Char__toInt_impl_vasixd(this_17);
      this_7[tmp_3] = toByte(tmp$ret$9);
      // Inline function 'kotlin.code' call
      var this_18 = _Char___init__impl__6a9atx(13);
      var tmp_4 = Char__toInt_impl_vasixd(this_18);
      // Inline function 'kotlin.code' call
      var this_19 = _Char___init__impl__6a9atx(114);
      var tmp$ret$11 = Char__toInt_impl_vasixd(this_19);
      this_7[tmp_4] = toByte(tmp$ret$11);
      // Inline function 'kotlin.code' call
      var this_20 = _Char___init__impl__6a9atx(102);
      var tmp$ret$12 = Char__toInt_impl_vasixd(this_20);
      this_7[12] = toByte(tmp$ret$12);
      ESCAPE_MARKERS = this_7;
    }
  }
  function unparsedPrimitive($this, literal, primitive, tag) {
    var type = startsWith(primitive, 'i') ? 'an ' + primitive : 'a ' + primitive;
    throw JsonDecodingException_0(-1, "Failed to parse literal '" + literal.toString() + "' as " + type + ' value at element: ' + $this.j1b(tag), toString($this.k1b()));
  }
  function AbstractJsonTreeDecoder(json, value, polymorphicDiscriminator) {
    polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
    NamedValueDecoder.call(this);
    this.f1b_1 = json;
    this.g1b_1 = value;
    this.h1b_1 = polymorphicDiscriminator;
    this.i1b_1 = this.e15().z12_1;
  }
  protoOf(AbstractJsonTreeDecoder).e15 = function () {
    return this.f1b_1;
  };
  protoOf(AbstractJsonTreeDecoder).v1 = function () {
    return this.g1b_1;
  };
  protoOf(AbstractJsonTreeDecoder).kn = function () {
    return this.e15().kn();
  };
  protoOf(AbstractJsonTreeDecoder).k1b = function () {
    var tmp0_safe_receiver = this.h10();
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp = this.l1b(tmp0_safe_receiver);
    }
    var tmp1_elvis_lhs = tmp;
    return tmp1_elvis_lhs == null ? this.v1() : tmp1_elvis_lhs;
  };
  protoOf(AbstractJsonTreeDecoder).j1b = function (currentTag) {
    return this.j10() + ('.' + currentTag);
  };
  protoOf(AbstractJsonTreeDecoder).f15 = function () {
    return this.k1b();
  };
  protoOf(AbstractJsonTreeDecoder).vm = function (deserializer) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.decodeSerializableValuePolymorphic' call
      var tmp;
      if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
        tmp = true;
      } else {
        tmp = this.e15().z12_1.v14_1;
      }
      if (tmp) {
        tmp$ret$0 = deserializer.bk(this);
        break $l$block;
      }
      var discriminator = classDiscriminator(deserializer.zj(), this.e15());
      var tmp0 = this.f15();
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = deserializer.zj().dl();
      if (!(tmp0 instanceof JsonObject)) {
        var tmp_0 = getKClass(JsonObject).m9();
        var tmp_1 = getKClassFromExpression(tmp0).m9();
        var tmp$ret$1 = this.j10();
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$1, toString(tmp0));
      }
      var jsonTree = tmp0;
      var tmp0_safe_receiver = jsonTree.l15(discriminator);
      var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
      var type = tmp1_safe_receiver == null ? null : get_contentOrNull(tmp1_safe_receiver);
      var tmp_2;
      try {
        tmp_2 = findPolymorphicSerializer(deserializer, this, type);
      } catch ($p) {
        var tmp_3;
        if ($p instanceof SerializationException) {
          var it = $p;
          throw JsonDecodingException_0(-1, ensureNotNull(it.message), jsonTree.toString());
        } else {
          throw $p;
        }
      }
      var tmp_4 = tmp_2;
      var actualSerializer = isInterface(tmp_4, DeserializationStrategy) ? tmp_4 : THROW_CCE();
      tmp$ret$0 = readPolymorphicJson(this.e15(), discriminator, jsonTree, actualSerializer);
    }
    return tmp$ret$0;
  };
  protoOf(AbstractJsonTreeDecoder).i10 = function (parentName, childName) {
    return childName;
  };
  protoOf(AbstractJsonTreeDecoder).wm = function (descriptor) {
    var currentObject = this.k1b();
    var tmp0_subject = descriptor.el();
    var tmp;
    var tmp_0;
    if (equals(tmp0_subject, LIST_getInstance())) {
      tmp_0 = true;
    } else {
      tmp_0 = tmp0_subject instanceof PolymorphicKind;
    }
    if (tmp_0) {
      var tmp_1 = this.e15();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = descriptor.dl();
      if (!(currentObject instanceof JsonArray)) {
        var tmp_2 = getKClass(JsonArray).m9();
        var tmp_3 = getKClassFromExpression(currentObject).m9();
        var tmp$ret$0 = this.j10();
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_2 + ', but had ' + tmp_3 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(currentObject));
      }
      tmp = new JsonTreeListDecoder(tmp_1, currentObject);
    } else {
      if (equals(tmp0_subject, MAP_getInstance())) {
        // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
        var this_0 = this.e15();
        var keyDescriptor = carrierDescriptor(descriptor.ll(0), this_0.kn());
        var keyKind = keyDescriptor.el();
        var tmp_4;
        var tmp_5;
        if (keyKind instanceof PrimitiveKind) {
          tmp_5 = true;
        } else {
          tmp_5 = equals(keyKind, ENUM_getInstance());
        }
        if (tmp_5) {
          var tmp_6 = this.e15();
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var serialName_0 = descriptor.dl();
          if (!(currentObject instanceof JsonObject)) {
            var tmp_7 = getKClass(JsonObject).m9();
            var tmp_8 = getKClassFromExpression(currentObject).m9();
            var tmp$ret$3 = this.j10();
            throw JsonDecodingException_0(-1, 'Expected ' + tmp_7 + ', but had ' + tmp_8 + ' as the serialized body of ' + serialName_0 + ' at element: ' + tmp$ret$3, toString(currentObject));
          }
          tmp_4 = new JsonTreeMapDecoder(tmp_6, currentObject);
        } else {
          if (this_0.z12_1.q14_1) {
            var tmp_9 = this.e15();
            // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
            // Inline function 'kotlinx.serialization.json.internal.cast' call
            var serialName_1 = descriptor.dl();
            if (!(currentObject instanceof JsonArray)) {
              var tmp_10 = getKClass(JsonArray).m9();
              var tmp_11 = getKClassFromExpression(currentObject).m9();
              var tmp$ret$7 = this.j10();
              throw JsonDecodingException_0(-1, 'Expected ' + tmp_10 + ', but had ' + tmp_11 + ' as the serialized body of ' + serialName_1 + ' at element: ' + tmp$ret$7, toString(currentObject));
            }
            tmp_4 = new JsonTreeListDecoder(tmp_9, currentObject);
          } else {
            throw InvalidKeyKindException(keyDescriptor);
          }
        }
        tmp = tmp_4;
      } else {
        var tmp_12 = this.e15();
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
        // Inline function 'kotlinx.serialization.json.internal.cast' call
        var serialName_2 = descriptor.dl();
        if (!(currentObject instanceof JsonObject)) {
          var tmp_13 = getKClass(JsonObject).m9();
          var tmp_14 = getKClassFromExpression(currentObject).m9();
          var tmp$ret$12 = this.j10();
          throw JsonDecodingException_0(-1, 'Expected ' + tmp_13 + ', but had ' + tmp_14 + ' as the serialized body of ' + serialName_2 + ' at element: ' + tmp$ret$12, toString(currentObject));
        }
        tmp = new JsonTreeDecoder(tmp_12, currentObject, this.h1b_1);
      }
    }
    return tmp;
  };
  protoOf(AbstractJsonTreeDecoder).xm = function (descriptor) {
  };
  protoOf(AbstractJsonTreeDecoder).im = function () {
    var tmp = this.k1b();
    return !(tmp instanceof JsonNull);
  };
  protoOf(AbstractJsonTreeDecoder).m1b = function (tag) {
    return !(this.l1b(tag) === JsonNull_getInstance());
  };
  protoOf(AbstractJsonTreeDecoder).l10 = function (tag) {
    return this.m1b((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).n1b = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.l1b(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).m9();
        var tmp_0 = getKClassFromExpression(value).m9();
        var tmp$ret$0 = this.j1b(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'boolean' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        var tmp0_elvis_lhs = get_booleanOrNull(literal);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'boolean', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$4 = tmp_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'boolean', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$4;
  };
  protoOf(AbstractJsonTreeDecoder).m10 = function (tag) {
    return this.n1b((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).o1b = function (tag) {
    var tmp$ret$5;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.l1b(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).m9();
        var tmp_0 = getKClassFromExpression(value).m9();
        var tmp$ret$0 = this.j1b(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'byte' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        var result = parseLongImpl(literal);
        var tmp_1;
        // Inline function 'kotlin.ranges.contains' call
        var this_0 = numberRangeToNumber(-128, 127);
        if (contains_0(isInterface(this_0, ClosedRange) ? this_0 : THROW_CCE(), result)) {
          tmp_1 = result.f3();
        } else {
          tmp_1 = null;
        }
        var tmp0_elvis_lhs = tmp_1;
        var tmp_2;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'byte', tag);
        } else {
          tmp_2 = tmp0_elvis_lhs;
        }
        tmp$ret$5 = tmp_2;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'byte', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$5;
  };
  protoOf(AbstractJsonTreeDecoder).n10 = function (tag) {
    return this.o1b((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).p1b = function (tag) {
    var tmp$ret$5;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.l1b(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).m9();
        var tmp_0 = getKClassFromExpression(value).m9();
        var tmp$ret$0 = this.j1b(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'short' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        var result = parseLongImpl(literal);
        var tmp_1;
        // Inline function 'kotlin.ranges.contains' call
        var this_0 = numberRangeToNumber(-32768, 32767);
        if (contains_0(isInterface(this_0, ClosedRange) ? this_0 : THROW_CCE(), result)) {
          tmp_1 = result.g3();
        } else {
          tmp_1 = null;
        }
        var tmp0_elvis_lhs = tmp_1;
        var tmp_2;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'short', tag);
        } else {
          tmp_2 = tmp0_elvis_lhs;
        }
        tmp$ret$5 = tmp_2;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'short', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$5;
  };
  protoOf(AbstractJsonTreeDecoder).o10 = function (tag) {
    return this.p1b((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).q1b = function (tag) {
    var tmp$ret$5;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.l1b(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).m9();
        var tmp_0 = getKClassFromExpression(value).m9();
        var tmp$ret$0 = this.j1b(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'int' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        var result = parseLongImpl(literal);
        var tmp_1;
        // Inline function 'kotlin.ranges.contains' call
        var this_0 = numberRangeToNumber(-2147483648, 2147483647);
        if (contains_0(isInterface(this_0, ClosedRange) ? this_0 : THROW_CCE(), result)) {
          tmp_1 = result.e1();
        } else {
          tmp_1 = null;
        }
        var tmp0_elvis_lhs = tmp_1;
        var tmp_2;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'int', tag);
        } else {
          tmp_2 = tmp0_elvis_lhs;
        }
        tmp$ret$5 = tmp_2;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'int', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$5;
  };
  protoOf(AbstractJsonTreeDecoder).p10 = function (tag) {
    return this.q1b((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).r1b = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.l1b(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).m9();
        var tmp_0 = getKClassFromExpression(value).m9();
        var tmp$ret$0 = this.j1b(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'long' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        var tmp0_elvis_lhs = parseLongImpl(literal);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'long', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$4 = tmp_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'long', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$4;
  };
  protoOf(AbstractJsonTreeDecoder).q10 = function (tag) {
    return this.r1b((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).s1b = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.l1b(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).m9();
        var tmp_0 = getKClassFromExpression(value).m9();
        var tmp$ret$0 = this.j1b(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'float' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        var tmp0_elvis_lhs = get_float(literal);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'float', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$4 = tmp_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'float', tag);
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$4;
    var specialFp = this.e15().z12_1.x14_1;
    if (specialFp || isFinite(result))
      return result;
    throw InvalidFloatingPointDecoded(result, tag, toString(this.k1b()));
  };
  protoOf(AbstractJsonTreeDecoder).r10 = function (tag) {
    return this.s1b((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).t1b = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.l1b(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).m9();
        var tmp_0 = getKClassFromExpression(value).m9();
        var tmp$ret$0 = this.j1b(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'double' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        var tmp0_elvis_lhs = get_double(literal);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'double', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$4 = tmp_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'double', tag);
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$4;
    var specialFp = this.e15().z12_1.x14_1;
    if (specialFp || isFinite_0(result))
      return result;
    throw InvalidFloatingPointDecoded(result, tag, toString(this.k1b()));
  };
  protoOf(AbstractJsonTreeDecoder).s10 = function (tag) {
    return this.t1b((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).u1b = function (tag) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.l1b(tag);
      if (!(value instanceof JsonPrimitive)) {
        var tmp = getKClass(JsonPrimitive).m9();
        var tmp_0 = getKClassFromExpression(value).m9();
        var tmp$ret$0 = this.j1b(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'char' + ' at element: ' + tmp$ret$0, toString(value));
      }
      var literal = value;
      try {
        var tmp0_elvis_lhs = new Char(single(literal.h15()));
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, literal, 'char', tag);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp$ret$4 = tmp_1.g1_1;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, literal, 'char', tag);
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$4;
  };
  protoOf(AbstractJsonTreeDecoder).t10 = function (tag) {
    return this.u1b((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).v1b = function (tag) {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.l1b(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).m9();
      var tmp_0 = getKClassFromExpression(value).m9();
      var tmp$ret$0 = this.j1b(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'string' + ' at element: ' + tmp$ret$0, toString(value));
    }
    var value_0 = value;
    if (!(value_0 instanceof JsonLiteral))
      throw JsonDecodingException_0(-1, "Expected string value for a non-null key '" + tag + "', got null literal instead at element: " + this.j1b(tag), toString(this.k1b()));
    if (!value_0.o15_1 && !this.e15().z12_1.p14_1) {
      throw JsonDecodingException_0(-1, "String literal for key '" + tag + "' should be quoted at element: " + this.j1b(tag) + ".\nUse 'isLenient = true' in 'Json {}' builder to accept non-compliant JSON.", toString(this.k1b()));
    }
    return value_0.q15_1;
  };
  protoOf(AbstractJsonTreeDecoder).u10 = function (tag) {
    return this.v1b((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).w1b = function (tag, inlineDescriptor) {
    var tmp;
    if (get_isUnsignedNumber(inlineDescriptor)) {
      var tmp_0 = this.e15();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
      var tmp2 = this.l1b(tag);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = inlineDescriptor.dl();
      if (!(tmp2 instanceof JsonPrimitive)) {
        var tmp_1 = getKClass(JsonPrimitive).m9();
        var tmp_2 = getKClassFromExpression(tmp2).m9();
        var tmp$ret$0 = this.j1b(tag);
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_1 + ', but had ' + tmp_2 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp2));
      }
      var lexer = StringJsonLexer_0(tmp_0, tmp2.h15());
      tmp = new JsonDecoderForUnsignedTypes(lexer, this.e15());
    } else {
      tmp = protoOf(NamedValueDecoder).v10.call(this, tag, inlineDescriptor);
    }
    return tmp;
  };
  protoOf(AbstractJsonTreeDecoder).v10 = function (tag, inlineDescriptor) {
    return this.w1b((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), inlineDescriptor);
  };
  protoOf(AbstractJsonTreeDecoder).tm = function (descriptor) {
    return !(this.h10() == null) ? protoOf(NamedValueDecoder).tm.call(this, descriptor) : (new JsonPrimitiveDecoder(this.e15(), this.v1(), this.h1b_1)).tm(descriptor);
  };
  function setForceNull($this, descriptor, index) {
    $this.g1c_1 = (!$this.e15().z12_1.s14_1 && !descriptor.ml(index) && descriptor.ll(index).zk());
    return $this.g1c_1;
  }
  function JsonTreeDecoder(json, value, polymorphicDiscriminator, polyDescriptor) {
    polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
    polyDescriptor = polyDescriptor === VOID ? null : polyDescriptor;
    AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
    this.d1c_1 = value;
    this.e1c_1 = polyDescriptor;
    this.f1c_1 = 0;
    this.g1c_1 = false;
  }
  protoOf(JsonTreeDecoder).v1 = function () {
    return this.d1c_1;
  };
  protoOf(JsonTreeDecoder).mn = function (descriptor) {
    $l$loop: while (this.f1c_1 < descriptor.gl()) {
      var _unary__edvuaz = this.f1c_1;
      this.f1c_1 = _unary__edvuaz + 1 | 0;
      var name = this.c10(descriptor, _unary__edvuaz);
      var index = this.f1c_1 - 1 | 0;
      this.g1c_1 = false;
      var tmp;
      // Inline function 'kotlin.collections.contains' call
      // Inline function 'kotlin.collections.containsKey' call
      var this_0 = this.v1();
      if ((isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).w1(name)) {
        tmp = true;
      } else {
        tmp = setForceNull(this, descriptor, index);
      }
      if (tmp) {
        if (!this.i1b_1.u14_1)
          return index;
        var tmp0 = this.e15();
        var tmp$ret$3;
        $l$block_2: {
          // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
          var isOptional = descriptor.ml(index);
          var elementDescriptor = descriptor.ll(index);
          var tmp_0;
          if (isOptional && !elementDescriptor.zk()) {
            var tmp_1 = this.h1c(name);
            tmp_0 = tmp_1 instanceof JsonNull;
          } else {
            tmp_0 = false;
          }
          if (tmp_0) {
            tmp$ret$3 = true;
            break $l$block_2;
          }
          if (equals(elementDescriptor.el(), ENUM_getInstance())) {
            var tmp_2;
            if (elementDescriptor.zk()) {
              var tmp_3 = this.h1c(name);
              tmp_2 = tmp_3 instanceof JsonNull;
            } else {
              tmp_2 = false;
            }
            if (tmp_2) {
              tmp$ret$3 = false;
              break $l$block_2;
            }
            var tmp_4 = this.h1c(name);
            var tmp0_safe_receiver = tmp_4 instanceof JsonPrimitive ? tmp_4 : null;
            var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : get_contentOrNull(tmp0_safe_receiver);
            var tmp_5;
            if (tmp0_elvis_lhs == null) {
              tmp$ret$3 = false;
              break $l$block_2;
            } else {
              tmp_5 = tmp0_elvis_lhs;
            }
            var enumValue = tmp_5;
            var enumIndex = getJsonNameIndex(elementDescriptor, tmp0, enumValue);
            var coerceToNull = !tmp0.z12_1.s14_1 && elementDescriptor.zk();
            if (enumIndex === -3 && (isOptional || coerceToNull)) {
              if (setForceNull(this, descriptor, index))
                return index;
              tmp$ret$3 = true;
              break $l$block_2;
            }
          }
          tmp$ret$3 = false;
        }
        if (tmp$ret$3)
          continue $l$loop;
        return index;
      }
    }
    return -1;
  };
  protoOf(JsonTreeDecoder).im = function () {
    return !this.g1c_1 && protoOf(AbstractJsonTreeDecoder).im.call(this);
  };
  protoOf(JsonTreeDecoder).d10 = function (descriptor, index) {
    var strategy = namingStrategy(descriptor, this.e15());
    var baseName = descriptor.il(index);
    if (strategy == null) {
      if (!this.i1b_1.y14_1)
        return baseName;
      if (this.v1().z1().s1(baseName))
        return baseName;
    }
    var deserializationNamesMap_0 = deserializationNamesMap(this.e15(), descriptor);
    // Inline function 'kotlin.collections.find' call
    var tmp0 = this.v1().z1();
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var _iterator__ex2g4s = tmp0.g();
      while (_iterator__ex2g4s.h()) {
        var element = _iterator__ex2g4s.i();
        if (deserializationNamesMap_0.y1(element) === index) {
          tmp$ret$1 = element;
          break $l$block;
        }
      }
      tmp$ret$1 = null;
    }
    var tmp0_safe_receiver = tmp$ret$1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return tmp0_safe_receiver;
    }
    var fallbackName = strategy == null ? null : strategy.w17(descriptor, index, baseName);
    return fallbackName == null ? baseName : fallbackName;
  };
  protoOf(JsonTreeDecoder).l1b = function (tag) {
    return getValue(this.v1(), tag);
  };
  protoOf(JsonTreeDecoder).h1c = function (tag) {
    return this.v1().l15(tag);
  };
  protoOf(JsonTreeDecoder).wm = function (descriptor) {
    if (descriptor === this.e1c_1) {
      var tmp = this.e15();
      var tmp2 = this.k1b();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName = this.e1c_1.dl();
      if (!(tmp2 instanceof JsonObject)) {
        var tmp_0 = getKClass(JsonObject).m9();
        var tmp_1 = getKClassFromExpression(tmp2).m9();
        var tmp$ret$0 = this.j10();
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp2));
      }
      return new JsonTreeDecoder(tmp, tmp2, this.h1b_1, this.e1c_1);
    }
    return protoOf(AbstractJsonTreeDecoder).wm.call(this, descriptor);
  };
  protoOf(JsonTreeDecoder).xm = function (descriptor) {
    var tmp;
    if (ignoreUnknownKeys(descriptor, this.e15())) {
      tmp = true;
    } else {
      var tmp_0 = descriptor.el();
      tmp = tmp_0 instanceof PolymorphicKind;
    }
    if (tmp)
      return Unit_instance;
    var strategy = namingStrategy(descriptor, this.e15());
    var tmp_1;
    if (strategy == null && !this.i1b_1.y14_1) {
      tmp_1 = jsonCachedSerialNames(descriptor);
    } else if (!(strategy == null)) {
      tmp_1 = deserializationNamesMap(this.e15(), descriptor).z1();
    } else {
      var tmp_2 = jsonCachedSerialNames(descriptor);
      var tmp0_safe_receiver = get_schemaCache(this.e15()).j1a(descriptor, get_JsonDeserializationNamesKey());
      // Inline function 'kotlin.collections.orEmpty' call
      var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.z1();
      var tmp$ret$0 = tmp0_elvis_lhs == null ? emptySet() : tmp0_elvis_lhs;
      tmp_1 = plus_0(tmp_2, tmp$ret$0);
    }
    var names = tmp_1;
    var _iterator__ex2g4s = this.v1().z1().g();
    while (_iterator__ex2g4s.h()) {
      var key = _iterator__ex2g4s.i();
      if (!names.s1(key) && !(key === this.h1b_1)) {
        throw JsonDecodingException_1(-1, "Encountered an unknown key '" + key + "' at element: " + this.j10() + '\n' + "Use 'ignoreUnknownKeys = true' in 'Json {}' builder or '@JsonIgnoreUnknownKeys' annotation to ignore unknown keys.\n" + ('JSON input: ' + toString(minify(this.v1().toString()))));
      }
    }
  };
  function JsonTreeListDecoder(json, value) {
    AbstractJsonTreeDecoder.call(this, json, value);
    this.o1c_1 = value;
    this.p1c_1 = this.o1c_1.j();
    this.q1c_1 = -1;
  }
  protoOf(JsonTreeListDecoder).v1 = function () {
    return this.o1c_1;
  };
  protoOf(JsonTreeListDecoder).d10 = function (descriptor, index) {
    return index.toString();
  };
  protoOf(JsonTreeListDecoder).l1b = function (tag) {
    return this.o1c_1.o(toInt(tag));
  };
  protoOf(JsonTreeListDecoder).mn = function (descriptor) {
    while (this.q1c_1 < (this.p1c_1 - 1 | 0)) {
      this.q1c_1 = this.q1c_1 + 1 | 0;
      return this.q1c_1;
    }
    return -1;
  };
  function JsonPrimitiveDecoder(json, value, polymorphicDiscriminator) {
    polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
    AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
    this.x1c_1 = value;
    this.w10('primitive');
  }
  protoOf(JsonPrimitiveDecoder).v1 = function () {
    return this.x1c_1;
  };
  protoOf(JsonPrimitiveDecoder).mn = function (descriptor) {
    return 0;
  };
  protoOf(JsonPrimitiveDecoder).l1b = function (tag) {
    // Inline function 'kotlin.require' call
    if (!(tag === 'primitive')) {
      var message = "This input can only handle primitives with 'primitive' tag";
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return this.x1c_1;
  };
  function JsonTreeMapDecoder(json, value) {
    JsonTreeDecoder.call(this, json, value);
    this.i1d_1 = value;
    this.j1d_1 = toList(this.i1d_1.z1());
    this.k1d_1 = imul(this.j1d_1.j(), 2);
    this.l1d_1 = -1;
  }
  protoOf(JsonTreeMapDecoder).v1 = function () {
    return this.i1d_1;
  };
  protoOf(JsonTreeMapDecoder).d10 = function (descriptor, index) {
    var i = index / 2 | 0;
    return this.j1d_1.o(i);
  };
  protoOf(JsonTreeMapDecoder).mn = function (descriptor) {
    while (this.l1d_1 < (this.k1d_1 - 1 | 0)) {
      this.l1d_1 = this.l1d_1 + 1 | 0;
      return this.l1d_1;
    }
    return -1;
  };
  protoOf(JsonTreeMapDecoder).l1b = function (tag) {
    return (this.l1d_1 % 2 | 0) === 0 ? JsonPrimitive_0(tag) : getValue(this.i1d_1, tag);
  };
  protoOf(JsonTreeMapDecoder).xm = function (descriptor) {
  };
  function readPolymorphicJson(_this__u8e3s4, discriminator, element, deserializer) {
    return (new JsonTreeDecoder(_this__u8e3s4, element, discriminator, deserializer.zj())).vm(deserializer);
  }
  var WriteMode_OBJ_instance;
  var WriteMode_LIST_instance;
  var WriteMode_MAP_instance;
  var WriteMode_POLY_OBJ_instance;
  function values() {
    return [WriteMode_OBJ_getInstance(), WriteMode_LIST_getInstance(), WriteMode_MAP_getInstance(), WriteMode_POLY_OBJ_getInstance()];
  }
  function get_entries() {
    if ($ENTRIES == null)
      $ENTRIES = enumEntries(values());
    return $ENTRIES;
  }
  var WriteMode_entriesInitialized;
  function WriteMode_initEntries() {
    if (WriteMode_entriesInitialized)
      return Unit_instance;
    WriteMode_entriesInitialized = true;
    WriteMode_OBJ_instance = new WriteMode('OBJ', 0, _Char___init__impl__6a9atx(123), _Char___init__impl__6a9atx(125));
    WriteMode_LIST_instance = new WriteMode('LIST', 1, _Char___init__impl__6a9atx(91), _Char___init__impl__6a9atx(93));
    WriteMode_MAP_instance = new WriteMode('MAP', 2, _Char___init__impl__6a9atx(123), _Char___init__impl__6a9atx(125));
    WriteMode_POLY_OBJ_instance = new WriteMode('POLY_OBJ', 3, _Char___init__impl__6a9atx(91), _Char___init__impl__6a9atx(93));
  }
  var $ENTRIES;
  function WriteMode(name, ordinal, begin, end) {
    Enum.call(this, name, ordinal);
    this.w1a_1 = begin;
    this.x1a_1 = end;
  }
  function switchMode(_this__u8e3s4, desc) {
    var tmp0_subject = desc.el();
    var tmp;
    if (tmp0_subject instanceof PolymorphicKind) {
      tmp = WriteMode_POLY_OBJ_getInstance();
    } else {
      if (equals(tmp0_subject, LIST_getInstance())) {
        tmp = WriteMode_LIST_getInstance();
      } else {
        if (equals(tmp0_subject, MAP_getInstance())) {
          // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
          var keyDescriptor = carrierDescriptor(desc.ll(0), _this__u8e3s4.kn());
          var keyKind = keyDescriptor.el();
          var tmp_0;
          var tmp_1;
          if (keyKind instanceof PrimitiveKind) {
            tmp_1 = true;
          } else {
            tmp_1 = equals(keyKind, ENUM_getInstance());
          }
          if (tmp_1) {
            tmp_0 = WriteMode_MAP_getInstance();
          } else {
            if (_this__u8e3s4.z12_1.q14_1) {
              tmp_0 = WriteMode_LIST_getInstance();
            } else {
              throw InvalidKeyKindException(keyDescriptor);
            }
          }
          tmp = tmp_0;
        } else {
          tmp = WriteMode_OBJ_getInstance();
        }
      }
    }
    return tmp;
  }
  function carrierDescriptor(_this__u8e3s4, module_0) {
    var tmp;
    if (equals(_this__u8e3s4.el(), CONTEXTUAL_getInstance())) {
      var tmp0_safe_receiver = getContextualDescriptor(module_0, _this__u8e3s4);
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : carrierDescriptor(tmp0_safe_receiver, module_0);
      tmp = tmp1_elvis_lhs == null ? _this__u8e3s4 : tmp1_elvis_lhs;
    } else if (_this__u8e3s4.fl()) {
      tmp = carrierDescriptor(_this__u8e3s4.ll(0), module_0);
    } else {
      tmp = _this__u8e3s4;
    }
    return tmp;
  }
  function WriteMode_OBJ_getInstance() {
    WriteMode_initEntries();
    return WriteMode_OBJ_instance;
  }
  function WriteMode_LIST_getInstance() {
    WriteMode_initEntries();
    return WriteMode_LIST_instance;
  }
  function WriteMode_MAP_getInstance() {
    WriteMode_initEntries();
    return WriteMode_MAP_instance;
  }
  function WriteMode_POLY_OBJ_getInstance() {
    WriteMode_initEntries();
    return WriteMode_POLY_OBJ_instance;
  }
  function appendEscape($this, lastPosition, current) {
    $this.m1d(lastPosition, current);
    return appendEsc($this, current + 1 | 0);
  }
  function decodedString($this, lastPosition, currentPosition) {
    $this.m1d(lastPosition, currentPosition);
    var result = $this.s13_1.toString();
    $this.s13_1.bb(0);
    return result;
  }
  function takePeeked($this) {
    // Inline function 'kotlin.also' call
    var this_0 = ensureNotNull($this.r13_1);
    $this.r13_1 = null;
    return this_0;
  }
  function wasUnquotedString($this) {
    return !(charSequenceGet($this.n1d(), $this.p13_1 - 1 | 0) === _Char___init__impl__6a9atx(34));
  }
  function appendEsc($this, startPosition) {
    var currentPosition = startPosition;
    currentPosition = $this.o1d(currentPosition);
    if (currentPosition === -1) {
      $this.s17('Expected escape sequence to continue, got EOF');
    }
    var tmp = $this.n1d();
    var _unary__edvuaz = currentPosition;
    currentPosition = _unary__edvuaz + 1 | 0;
    var currentChar = charSequenceGet(tmp, _unary__edvuaz);
    if (currentChar === _Char___init__impl__6a9atx(117)) {
      return appendHex($this, $this.n1d(), currentPosition);
    }
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(currentChar);
    var c = escapeToChar(tmp$ret$0);
    if (c === _Char___init__impl__6a9atx(0)) {
      $this.s17("Invalid escaped char '" + toString_1(currentChar) + "'");
    }
    $this.s13_1.x7(c);
    return currentPosition;
  }
  function appendHex($this, source, startPos) {
    if ((startPos + 4 | 0) >= charSequenceLength(source)) {
      $this.p13_1 = startPos;
      $this.p1d();
      if (($this.p13_1 + 4 | 0) >= charSequenceLength(source)) {
        $this.s17('Unexpected EOF during unicode escape');
      }
      return appendHex($this, source, $this.p13_1);
    }
    $this.s13_1.x7(numberToChar((((fromHexChar($this, source, startPos) << 12) + (fromHexChar($this, source, startPos + 1 | 0) << 8) | 0) + (fromHexChar($this, source, startPos + 2 | 0) << 4) | 0) + fromHexChar($this, source, startPos + 3 | 0) | 0));
    return startPos + 4 | 0;
  }
  function fromHexChar($this, source, currentPosition) {
    var character = charSequenceGet(source, currentPosition);
    var tmp;
    if (_Char___init__impl__6a9atx(48) <= character ? character <= _Char___init__impl__6a9atx(57) : false) {
      // Inline function 'kotlin.code' call
      var tmp_0 = Char__toInt_impl_vasixd(character);
      // Inline function 'kotlin.code' call
      var this_0 = _Char___init__impl__6a9atx(48);
      tmp = tmp_0 - Char__toInt_impl_vasixd(this_0) | 0;
    } else if (_Char___init__impl__6a9atx(97) <= character ? character <= _Char___init__impl__6a9atx(102) : false) {
      // Inline function 'kotlin.code' call
      var tmp_1 = Char__toInt_impl_vasixd(character);
      // Inline function 'kotlin.code' call
      var this_1 = _Char___init__impl__6a9atx(97);
      tmp = (tmp_1 - Char__toInt_impl_vasixd(this_1) | 0) + 10 | 0;
    } else if (_Char___init__impl__6a9atx(65) <= character ? character <= _Char___init__impl__6a9atx(70) : false) {
      // Inline function 'kotlin.code' call
      var tmp_2 = Char__toInt_impl_vasixd(character);
      // Inline function 'kotlin.code' call
      var this_2 = _Char___init__impl__6a9atx(65);
      tmp = (tmp_2 - Char__toInt_impl_vasixd(this_2) | 0) + 10 | 0;
    } else {
      $this.s17("Invalid toHexChar char '" + toString_1(character) + "' in unicode escape");
    }
    return tmp;
  }
  function consumeBoolean2($this, start) {
    var current = $this.o1d(start);
    if (current >= charSequenceLength($this.n1d()) || current === -1) {
      $this.s17('EOF');
    }
    var tmp = $this.n1d();
    var _unary__edvuaz = current;
    current = _unary__edvuaz + 1 | 0;
    // Inline function 'kotlin.code' call
    var this_0 = charSequenceGet(tmp, _unary__edvuaz);
    var tmp0_subject = Char__toInt_impl_vasixd(this_0) | 32;
    var tmp_0;
    // Inline function 'kotlin.code' call
    var this_1 = _Char___init__impl__6a9atx(116);
    if (tmp0_subject === Char__toInt_impl_vasixd(this_1)) {
      consumeBooleanLiteral($this, 'rue', current);
      tmp_0 = true;
    } else {
      // Inline function 'kotlin.code' call
      var this_2 = _Char___init__impl__6a9atx(102);
      if (tmp0_subject === Char__toInt_impl_vasixd(this_2)) {
        consumeBooleanLiteral($this, 'alse', current);
        tmp_0 = false;
      } else {
        $this.s17("Expected valid boolean literal prefix, but had '" + $this.a19() + "'");
      }
    }
    return tmp_0;
  }
  function consumeBooleanLiteral($this, literalSuffix, current) {
    if ((charSequenceLength($this.n1d()) - current | 0) < literalSuffix.length) {
      $this.s17('Unexpected end of boolean literal');
    }
    var inductionVariable = 0;
    var last = charSequenceLength(literalSuffix) - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var expected = charCodeAt(literalSuffix, i);
        var actual = charSequenceGet($this.n1d(), current + i | 0);
        // Inline function 'kotlin.code' call
        var tmp = Char__toInt_impl_vasixd(expected);
        // Inline function 'kotlin.code' call
        if (!(tmp === (Char__toInt_impl_vasixd(actual) | 32))) {
          $this.s17("Expected valid boolean literal prefix, but had '" + $this.a19() + "'");
        }
      }
       while (inductionVariable <= last);
    $this.p13_1 = current + literalSuffix.length | 0;
  }
  function consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive) {
    var tmp;
    switch (isExponentPositive) {
      case false:
        // Inline function 'kotlin.math.pow' call

        var x = -exponentAccumulator.h3();
        tmp = Math.pow(10.0, x);
        break;
      case true:
        // Inline function 'kotlin.math.pow' call

        var x_0 = exponentAccumulator.h3();
        tmp = Math.pow(10.0, x_0);
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function AbstractJsonLexer() {
    this.p13_1 = 0;
    this.q13_1 = new JsonPath();
    this.r13_1 = null;
    this.s13_1 = StringBuilder_init_$Create$();
  }
  protoOf(AbstractJsonLexer).p1d = function () {
  };
  protoOf(AbstractJsonLexer).m1a = function () {
    var current = this.q1d();
    var source = this.n1d();
    if (current >= charSequenceLength(source) || current === -1)
      return false;
    if (charSequenceGet(source, current) === _Char___init__impl__6a9atx(44)) {
      this.p13_1 = this.p13_1 + 1 | 0;
      return true;
    }
    return false;
  };
  protoOf(AbstractJsonLexer).r1d = function (c) {
    return c === _Char___init__impl__6a9atx(125) || c === _Char___init__impl__6a9atx(93) || (c === _Char___init__impl__6a9atx(58) || c === _Char___init__impl__6a9atx(44)) ? false : true;
  };
  protoOf(AbstractJsonLexer).t13 = function () {
    var nextToken = this.c19();
    if (!(nextToken === 10)) {
      this.s17('Expected EOF after parsing, but had ' + toString_1(charSequenceGet(this.n1d(), this.p13_1 - 1 | 0)) + ' instead');
    }
  };
  protoOf(AbstractJsonLexer).w18 = function (expected) {
    var token = this.c19();
    if (!(token === expected)) {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
      var expected_0 = tokenDescription(expected);
      var position = true ? this.p13_1 - 1 | 0 : this.p13_1;
      var s = this.p13_1 === charSequenceLength(this.n1d()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.n1d(), position));
      var tmp$ret$0 = 'Expected ' + expected_0 + ", but had '" + s + "' instead";
      this.s17(tmp$ret$0, position);
    }
    return token;
  };
  protoOf(AbstractJsonLexer).s1d = function (expected) {
    if (this.p13_1 > 0 && expected === _Char___init__impl__6a9atx(34)) {
      var tmp$ret$1;
      $l$block: {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.withPositionRollback' call
        var snapshot = this.p13_1;
        try {
          this.p13_1 = this.p13_1 - 1 | 0;
          tmp$ret$1 = this.a19();
          break $l$block;
        }finally {
          this.p13_1 = snapshot;
        }
      }
      var inputLiteral = tmp$ret$1;
      if (inputLiteral === 'null') {
        this.r17("Expected string literal but 'null' literal was found", this.p13_1 - 1 | 0, "Use 'coerceInputValues = true' in 'Json {}' builder to coerce nulls if property has a default value.");
      }
    }
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
    var expectedToken = charToTokenClass(expected);
    var expected_0 = tokenDescription(expectedToken);
    var position = true ? this.p13_1 - 1 | 0 : this.p13_1;
    var s = this.p13_1 === charSequenceLength(this.n1d()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.n1d(), position));
    var tmp$ret$2 = 'Expected ' + expected_0 + ", but had '" + s + "' instead";
    this.s17(tmp$ret$2, position);
  };
  protoOf(AbstractJsonLexer).x18 = function () {
    var source = this.n1d();
    var cpos = this.p13_1;
    $l$loop_0: while (true) {
      cpos = this.o1d(cpos);
      if (cpos === -1)
        break $l$loop_0;
      var ch = charSequenceGet(source, cpos);
      if (ch === _Char___init__impl__6a9atx(32) || ch === _Char___init__impl__6a9atx(10) || ch === _Char___init__impl__6a9atx(13) || ch === _Char___init__impl__6a9atx(9)) {
        cpos = cpos + 1 | 0;
        continue $l$loop_0;
      }
      this.p13_1 = cpos;
      return charToTokenClass(ch);
    }
    this.p13_1 = cpos;
    return 10;
  };
  protoOf(AbstractJsonLexer).n1a = function (doConsume) {
    var current = this.q1d();
    current = this.o1d(current);
    var len = charSequenceLength(this.n1d()) - current | 0;
    if (len < 4 || current === -1)
      return false;
    var inductionVariable = 0;
    if (inductionVariable <= 3)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (!(charCodeAt('null', i) === charSequenceGet(this.n1d(), current + i | 0)))
          return false;
      }
       while (inductionVariable <= 3);
    if (len > 4 && charToTokenClass(charSequenceGet(this.n1d(), current + 4 | 0)) === 0)
      return false;
    if (doConsume) {
      this.p13_1 = current + 4 | 0;
    }
    return true;
  };
  protoOf(AbstractJsonLexer).y1a = function (doConsume, $super) {
    doConsume = doConsume === VOID ? true : doConsume;
    return $super === VOID ? this.n1a(doConsume) : $super.n1a.call(this, doConsume);
  };
  protoOf(AbstractJsonLexer).o1a = function (isLenient) {
    var token = this.x18();
    var tmp;
    if (isLenient) {
      if (!(token === 1) && !(token === 0))
        return null;
      tmp = this.a19();
    } else {
      if (!(token === 1))
        return null;
      tmp = this.z18();
    }
    var string = tmp;
    this.r13_1 = string;
    return string;
  };
  protoOf(AbstractJsonLexer).t1d = function () {
    this.r13_1 = null;
  };
  protoOf(AbstractJsonLexer).u1d = function (startPos, endPos) {
    // Inline function 'kotlin.text.substring' call
    var this_0 = this.n1d();
    return toString(charSequenceSubSequence(this_0, startPos, endPos));
  };
  protoOf(AbstractJsonLexer).z18 = function () {
    if (!(this.r13_1 == null)) {
      return takePeeked(this);
    }
    return this.r1a();
  };
  protoOf(AbstractJsonLexer).consumeString2 = function (source, startPosition, current) {
    var currentPosition = current;
    var lastPosition = startPosition;
    var char = charSequenceGet(source, currentPosition);
    var usedAppend = false;
    while (!(char === _Char___init__impl__6a9atx(34))) {
      if (char === _Char___init__impl__6a9atx(92)) {
        usedAppend = true;
        currentPosition = this.o1d(appendEscape(this, lastPosition, currentPosition));
        if (currentPosition === -1) {
          this.s17('Unexpected EOF', currentPosition);
        }
        lastPosition = currentPosition;
      } else {
        currentPosition = currentPosition + 1 | 0;
        if (currentPosition >= charSequenceLength(source)) {
          usedAppend = true;
          this.m1d(lastPosition, currentPosition);
          currentPosition = this.o1d(currentPosition);
          if (currentPosition === -1) {
            this.s17('Unexpected EOF', currentPosition);
          }
          lastPosition = currentPosition;
        }
      }
      char = charSequenceGet(source, currentPosition);
    }
    var tmp;
    if (!usedAppend) {
      tmp = this.u1d(lastPosition, currentPosition);
    } else {
      tmp = decodedString(this, lastPosition, currentPosition);
    }
    var string = tmp;
    this.p13_1 = currentPosition + 1 | 0;
    return string;
  };
  protoOf(AbstractJsonLexer).s1a = function () {
    var result = this.a19();
    if (result === 'null' && wasUnquotedString(this)) {
      this.s17("Unexpected 'null' value instead of string literal");
    }
    return result;
  };
  protoOf(AbstractJsonLexer).a19 = function () {
    if (!(this.r13_1 == null)) {
      return takePeeked(this);
    }
    var current = this.q1d();
    if (current >= charSequenceLength(this.n1d()) || current === -1) {
      this.s17('EOF', current);
    }
    var token = charToTokenClass(charSequenceGet(this.n1d(), current));
    if (token === 1) {
      return this.z18();
    }
    if (!(token === 0)) {
      this.s17('Expected beginning of the string, but got ' + toString_1(charSequenceGet(this.n1d(), current)));
    }
    var usedAppend = false;
    while (charToTokenClass(charSequenceGet(this.n1d(), current)) === 0) {
      current = current + 1 | 0;
      if (current >= charSequenceLength(this.n1d())) {
        usedAppend = true;
        this.m1d(this.p13_1, current);
        var eof = this.o1d(current);
        if (eof === -1) {
          this.p13_1 = current;
          return decodedString(this, 0, 0);
        } else {
          current = eof;
        }
      }
    }
    var tmp;
    if (!usedAppend) {
      tmp = this.u1d(this.p13_1, current);
    } else {
      tmp = decodedString(this, this.p13_1, current);
    }
    var result = tmp;
    this.p13_1 = current;
    return result;
  };
  protoOf(AbstractJsonLexer).m1d = function (fromIndex, toIndex) {
    this.s13_1.va(this.n1d(), fromIndex, toIndex);
  };
  protoOf(AbstractJsonLexer).q1a = function (allowLenientStrings) {
    // Inline function 'kotlin.collections.mutableListOf' call
    var tokenStack = ArrayList_init_$Create$();
    var lastToken = this.x18();
    if (!(lastToken === 8) && !(lastToken === 6)) {
      this.a19();
      return Unit_instance;
    }
    $l$loop: while (true) {
      lastToken = this.x18();
      if (lastToken === 1) {
        if (allowLenientStrings)
          this.a19();
        else
          this.r1a();
        continue $l$loop;
      }
      var tmp0_subject = lastToken;
      if (tmp0_subject === 8 || tmp0_subject === 6) {
        tokenStack.e(lastToken);
      } else if (tmp0_subject === 9) {
        if (!(last(tokenStack) === 8))
          throw JsonDecodingException_0(this.p13_1, 'found ] instead of } at path: ' + this.q13_1.toString(), this.n1d());
        removeLast(tokenStack);
      } else if (tmp0_subject === 7) {
        if (!(last(tokenStack) === 6))
          throw JsonDecodingException_0(this.p13_1, 'found } instead of ] at path: ' + this.q13_1.toString(), this.n1d());
        removeLast(tokenStack);
      } else if (tmp0_subject === 10) {
        this.s17('Unexpected end of input due to malformed JSON during ignoring unknown keys');
      }
      this.c19();
      if (tokenStack.j() === 0)
        return Unit_instance;
    }
  };
  protoOf(AbstractJsonLexer).toString = function () {
    return "JsonReader(source='" + toString(this.n1d()) + "', currentPosition=" + this.p13_1 + ')';
  };
  protoOf(AbstractJsonLexer).p1a = function (key) {
    var processed = this.u1d(0, this.p13_1);
    var lastIndexOf_0 = lastIndexOf(processed, key);
    throw new JsonDecodingException("Encountered an unknown key '" + key + "' at offset " + lastIndexOf_0 + ' at path: ' + this.q13_1.f18() + "\nUse 'ignoreUnknownKeys = true' in 'Json {}' builder or '@JsonIgnoreUnknownKeys' annotation to ignore unknown keys.\n" + ('JSON input: ' + toString(minify(this.n1d(), lastIndexOf_0))));
  };
  protoOf(AbstractJsonLexer).r17 = function (message, position, hint) {
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(hint) === 0) {
      tmp = '';
    } else {
      tmp = '\n' + hint;
    }
    var hintMessage = tmp;
    throw JsonDecodingException_0(position, message + ' at path: ' + this.q13_1.f18() + hintMessage, this.n1d());
  };
  protoOf(AbstractJsonLexer).s17 = function (message, position, hint, $super) {
    position = position === VOID ? this.p13_1 : position;
    hint = hint === VOID ? '' : hint;
    return $super === VOID ? this.r17(message, position, hint) : $super.r17.call(this, message, position, hint);
  };
  protoOf(AbstractJsonLexer).a1b = function () {
    var current = this.q1d();
    current = this.o1d(current);
    if (current >= charSequenceLength(this.n1d()) || current === -1) {
      this.s17('EOF');
    }
    var tmp;
    if (charSequenceGet(this.n1d(), current) === _Char___init__impl__6a9atx(34)) {
      current = current + 1 | 0;
      if (current === charSequenceLength(this.n1d())) {
        this.s17('EOF');
      }
      tmp = true;
    } else {
      tmp = false;
    }
    var hasQuotation = tmp;
    var accumulator = new Long(0, 0);
    var exponentAccumulator = new Long(0, 0);
    var isNegative = false;
    var isExponentPositive = false;
    var hasExponent = false;
    var start = current;
    $l$loop_4: while (!(current === charSequenceLength(this.n1d()))) {
      var ch = charSequenceGet(this.n1d(), current);
      if ((ch === _Char___init__impl__6a9atx(101) || ch === _Char___init__impl__6a9atx(69)) && !hasExponent) {
        if (current === start) {
          this.s17('Unexpected symbol ' + toString_1(ch) + ' in numeric literal');
        }
        isExponentPositive = true;
        hasExponent = true;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(45) && hasExponent) {
        if (current === start) {
          this.s17("Unexpected symbol '-' in numeric literal");
        }
        isExponentPositive = false;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(43) && hasExponent) {
        if (current === start) {
          this.s17("Unexpected symbol '+' in numeric literal");
        }
        isExponentPositive = true;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(45)) {
        if (!(current === start)) {
          this.s17("Unexpected symbol '-' in numeric literal");
        }
        isNegative = true;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      var token = charToTokenClass(ch);
      if (!(token === 0))
        break $l$loop_4;
      current = current + 1 | 0;
      var digit = Char__minus_impl_a2frrh(ch, _Char___init__impl__6a9atx(48));
      if (!(0 <= digit ? digit <= 9 : false)) {
        this.s17("Unexpected symbol '" + toString_1(ch) + "' in numeric literal");
      }
      if (hasExponent) {
        // Inline function 'kotlin.Long.times' call
        // Inline function 'kotlin.Long.plus' call
        exponentAccumulator = exponentAccumulator.s2(toLong(10)).q2(toLong(digit));
        continue $l$loop_4;
      }
      // Inline function 'kotlin.Long.times' call
      // Inline function 'kotlin.Long.minus' call
      accumulator = accumulator.s2(toLong(10)).r2(toLong(digit));
      if (accumulator.z(new Long(0, 0)) > 0) {
        this.s17('Numeric value overflow');
      }
    }
    var hasChars = !(current === start);
    if (start === current || (isNegative && start === (current - 1 | 0))) {
      this.s17('Expected numeric literal');
    }
    if (hasQuotation) {
      if (!hasChars) {
        this.s17('EOF');
      }
      if (!(charSequenceGet(this.n1d(), current) === _Char___init__impl__6a9atx(34))) {
        this.s17('Expected closing quotation mark');
      }
      current = current + 1 | 0;
    }
    this.p13_1 = current;
    if (hasExponent) {
      var doubleAccumulator = accumulator.h3() * consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive);
      if (doubleAccumulator > (new Long(-1, 2147483647)).h3() || doubleAccumulator < (new Long(0, -2147483648)).h3()) {
        this.s17('Numeric value overflow');
      }
      // Inline function 'kotlin.math.floor' call
      if (!(Math.floor(doubleAccumulator) === doubleAccumulator)) {
        this.s17("Can't convert " + doubleAccumulator + ' to Long');
      }
      accumulator = numberToLong(doubleAccumulator);
    }
    var tmp_0;
    if (isNegative) {
      tmp_0 = accumulator;
    } else if (!accumulator.equals(new Long(0, -2147483648))) {
      tmp_0 = accumulator.w2();
    } else {
      this.s17('Numeric value overflow');
    }
    return tmp_0;
  };
  protoOf(AbstractJsonLexer).n15 = function () {
    var result = this.a1b();
    var next = this.c19();
    if (!(next === 10)) {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
      var expected = tokenDescription(10);
      var position = true ? this.p13_1 - 1 | 0 : this.p13_1;
      var s = this.p13_1 === charSequenceLength(this.n1d()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.n1d(), position));
      var tmp$ret$0 = "Expected input to contain a single valid number, but got '" + s + "' after it";
      this.s17(tmp$ret$0, position);
    }
    return result;
  };
  protoOf(AbstractJsonLexer).z1a = function () {
    var current = this.q1d();
    if (current === charSequenceLength(this.n1d())) {
      this.s17('EOF');
    }
    var tmp;
    if (charSequenceGet(this.n1d(), current) === _Char___init__impl__6a9atx(34)) {
      current = current + 1 | 0;
      tmp = true;
    } else {
      tmp = false;
    }
    var hasQuotation = tmp;
    var result = consumeBoolean2(this, current);
    if (hasQuotation) {
      if (this.p13_1 === charSequenceLength(this.n1d())) {
        this.s17('EOF');
      }
      if (!(charSequenceGet(this.n1d(), this.p13_1) === _Char___init__impl__6a9atx(34))) {
        this.s17('Expected closing quotation mark');
      }
      this.p13_1 = this.p13_1 + 1 | 0;
    }
    return result;
  };
  function charToTokenClass(c) {
    var tmp;
    // Inline function 'kotlin.code' call
    if (Char__toInt_impl_vasixd(c) < 126) {
      var tmp_0 = CharMappings_getInstance().w1d_1;
      // Inline function 'kotlin.code' call
      tmp = tmp_0[Char__toInt_impl_vasixd(c)];
    } else {
      tmp = 0;
    }
    return tmp;
  }
  function tokenDescription(token) {
    return token === 1 ? "quotation mark '\"'" : token === 2 ? "string escape sequence '\\'" : token === 4 ? "comma ','" : token === 5 ? "colon ':'" : token === 6 ? "start of the object '{'" : token === 7 ? "end of the object '}'" : token === 8 ? "start of the array '['" : token === 9 ? "end of the array ']'" : token === 10 ? 'end of the input' : token === 127 ? 'invalid token' : 'valid token';
  }
  function escapeToChar(c) {
    return c < 117 ? CharMappings_getInstance().v1d_1[c] : _Char___init__impl__6a9atx(0);
  }
  function initEscape($this) {
    var inductionVariable = 0;
    if (inductionVariable <= 31)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        initC2ESC($this, i, _Char___init__impl__6a9atx(117));
      }
       while (inductionVariable <= 31);
    initC2ESC($this, 8, _Char___init__impl__6a9atx(98));
    initC2ESC($this, 9, _Char___init__impl__6a9atx(116));
    initC2ESC($this, 10, _Char___init__impl__6a9atx(110));
    initC2ESC($this, 12, _Char___init__impl__6a9atx(102));
    initC2ESC($this, 13, _Char___init__impl__6a9atx(114));
    initC2ESC_0($this, _Char___init__impl__6a9atx(47), _Char___init__impl__6a9atx(47));
    initC2ESC_0($this, _Char___init__impl__6a9atx(34), _Char___init__impl__6a9atx(34));
    initC2ESC_0($this, _Char___init__impl__6a9atx(92), _Char___init__impl__6a9atx(92));
  }
  function initCharToToken($this) {
    var inductionVariable = 0;
    if (inductionVariable <= 32)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        initC2TC($this, i, 127);
      }
       while (inductionVariable <= 32);
    initC2TC($this, 9, 3);
    initC2TC($this, 10, 3);
    initC2TC($this, 13, 3);
    initC2TC($this, 32, 3);
    initC2TC_0($this, _Char___init__impl__6a9atx(44), 4);
    initC2TC_0($this, _Char___init__impl__6a9atx(58), 5);
    initC2TC_0($this, _Char___init__impl__6a9atx(123), 6);
    initC2TC_0($this, _Char___init__impl__6a9atx(125), 7);
    initC2TC_0($this, _Char___init__impl__6a9atx(91), 8);
    initC2TC_0($this, _Char___init__impl__6a9atx(93), 9);
    initC2TC_0($this, _Char___init__impl__6a9atx(34), 1);
    initC2TC_0($this, _Char___init__impl__6a9atx(92), 2);
  }
  function initC2ESC($this, c, esc) {
    if (!(esc === _Char___init__impl__6a9atx(117))) {
      // Inline function 'kotlin.code' call
      var tmp$ret$0 = Char__toInt_impl_vasixd(esc);
      $this.v1d_1[tmp$ret$0] = numberToChar(c);
    }
  }
  function initC2ESC_0($this, c, esc) {
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(c);
    return initC2ESC($this, tmp$ret$0, esc);
  }
  function initC2TC($this, c, cl) {
    $this.w1d_1[c] = cl;
  }
  function initC2TC_0($this, c, cl) {
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(c);
    return initC2TC($this, tmp$ret$0, cl);
  }
  function CharMappings() {
    CharMappings_instance = this;
    this.v1d_1 = charArray(117);
    this.w1d_1 = new Int8Array(126);
    initEscape(this);
    initCharToToken(this);
  }
  var CharMappings_instance;
  function CharMappings_getInstance() {
    if (CharMappings_instance == null)
      new CharMappings();
    return CharMappings_instance;
  }
  function StringJsonLexerWithComments(source) {
    StringJsonLexer.call(this, source);
  }
  protoOf(StringJsonLexerWithComments).c19 = function () {
    var source = this.n1d();
    var cpos = this.q1d();
    if (cpos >= source.length || cpos === -1)
      return 10;
    this.p13_1 = cpos + 1 | 0;
    return charToTokenClass(charCodeAt(source, cpos));
  };
  protoOf(StringJsonLexerWithComments).y18 = function () {
    var current = this.q1d();
    if (current >= this.n1d().length || current === -1)
      return false;
    return this.r1d(charCodeAt(this.n1d(), current));
  };
  protoOf(StringJsonLexerWithComments).l1a = function (expected) {
    var source = this.n1d();
    var current = this.q1d();
    if (current >= source.length || current === -1) {
      this.p13_1 = -1;
      this.s1d(expected);
    }
    var c = charCodeAt(source, current);
    this.p13_1 = current + 1 | 0;
    if (c === expected)
      return Unit_instance;
    else {
      this.s1d(expected);
    }
  };
  protoOf(StringJsonLexerWithComments).x18 = function () {
    var source = this.n1d();
    var cpos = this.q1d();
    if (cpos >= source.length || cpos === -1)
      return 10;
    this.p13_1 = cpos;
    return charToTokenClass(charCodeAt(source, cpos));
  };
  protoOf(StringJsonLexerWithComments).q1d = function () {
    var current = this.p13_1;
    if (current === -1)
      return current;
    var source = this.n1d();
    $l$loop_1: while (current < source.length) {
      var c = charCodeAt(source, current);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
        continue $l$loop_1;
      }
      if (c === _Char___init__impl__6a9atx(47) && (current + 1 | 0) < source.length) {
        var tmp0_subject = charCodeAt(source, current + 1 | 0);
        if (tmp0_subject === _Char___init__impl__6a9atx(47)) {
          current = indexOf_0(source, _Char___init__impl__6a9atx(10), current + 2 | 0);
          if (current === -1) {
            current = source.length;
          } else {
            current = current + 1 | 0;
          }
          continue $l$loop_1;
        } else if (tmp0_subject === _Char___init__impl__6a9atx(42)) {
          current = indexOf(source, '*/', current + 2 | 0);
          if (current === -1) {
            this.p13_1 = source.length;
            this.s17('Expected end of the block comment: "*/", but had EOF instead');
          } else {
            current = current + 2 | 0;
          }
          continue $l$loop_1;
        }
      }
      break $l$loop_1;
    }
    this.p13_1 = current;
    return current;
  };
  function StringJsonLexer(source) {
    AbstractJsonLexer.call(this);
    this.g1e_1 = source;
  }
  protoOf(StringJsonLexer).n1d = function () {
    return this.g1e_1;
  };
  protoOf(StringJsonLexer).o1d = function (position) {
    return position < this.n1d().length ? position : -1;
  };
  protoOf(StringJsonLexer).c19 = function () {
    var source = this.n1d();
    var cpos = this.p13_1;
    $l$loop: while (!(cpos === -1) && cpos < source.length) {
      var _unary__edvuaz = cpos;
      cpos = _unary__edvuaz + 1 | 0;
      var c = charCodeAt(source, _unary__edvuaz);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
        continue $l$loop;
      this.p13_1 = cpos;
      return charToTokenClass(c);
    }
    this.p13_1 = source.length;
    return 10;
  };
  protoOf(StringJsonLexer).y18 = function () {
    var current = this.p13_1;
    if (current === -1)
      return false;
    var source = this.n1d();
    $l$loop: while (current < source.length) {
      var c = charCodeAt(source, current);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
        continue $l$loop;
      }
      this.p13_1 = current;
      return this.r1d(c);
    }
    this.p13_1 = current;
    return false;
  };
  protoOf(StringJsonLexer).q1d = function () {
    var current = this.p13_1;
    if (current === -1)
      return current;
    var source = this.n1d();
    $l$loop: while (current < source.length) {
      var c = charCodeAt(source, current);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
      } else {
        break $l$loop;
      }
    }
    this.p13_1 = current;
    return current;
  };
  protoOf(StringJsonLexer).l1a = function (expected) {
    if (this.p13_1 === -1) {
      this.s1d(expected);
    }
    var source = this.n1d();
    var cpos = this.p13_1;
    $l$loop: while (cpos < source.length) {
      var _unary__edvuaz = cpos;
      cpos = _unary__edvuaz + 1 | 0;
      var c = charCodeAt(source, _unary__edvuaz);
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
      if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
        continue $l$loop;
      this.p13_1 = cpos;
      if (c === expected)
        return Unit_instance;
      this.s1d(expected);
    }
    this.p13_1 = -1;
    this.s1d(expected);
  };
  protoOf(StringJsonLexer).r1a = function () {
    this.l1a(_Char___init__impl__6a9atx(34));
    var current = this.p13_1;
    var closingQuote = indexOf_0(this.n1d(), _Char___init__impl__6a9atx(34), current);
    if (closingQuote === -1) {
      this.a19();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
      var expected = tokenDescription(1);
      var position = false ? this.p13_1 - 1 | 0 : this.p13_1;
      var s = this.p13_1 === charSequenceLength(this.n1d()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.n1d(), position));
      var tmp$ret$0 = 'Expected ' + expected + ", but had '" + s + "' instead";
      this.s17(tmp$ret$0, position);
    }
    var inductionVariable = current;
    if (inductionVariable < closingQuote)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (charCodeAt(this.n1d(), i) === _Char___init__impl__6a9atx(92)) {
          return this.consumeString2(this.n1d(), this.p13_1, i);
        }
      }
       while (inductionVariable < closingQuote);
    this.p13_1 = closingQuote + 1 | 0;
    return substring(this.n1d(), current, closingQuote);
  };
  protoOf(StringJsonLexer).t1a = function (keyToMatch, isLenient) {
    var positionSnapshot = this.p13_1;
    try {
      if (!(this.c19() === 6))
        return null;
      var firstKey = this.o1a(isLenient);
      if (!(firstKey === keyToMatch))
        return null;
      this.t1d();
      if (!(this.c19() === 5))
        return null;
      return this.o1a(isLenient);
    }finally {
      this.p13_1 = positionSnapshot;
      this.t1d();
    }
  };
  function StringJsonLexer_0(json, source) {
    return !json.z12_1.c15_1 ? new StringJsonLexer(source) : new StringJsonLexerWithComments(source);
  }
  function get_schemaCache(_this__u8e3s4) {
    return _this__u8e3s4.b13_1;
  }
  function JsonToStringWriter() {
    this.f13_1 = StringBuilder_init_$Create$_0(128);
  }
  protoOf(JsonToStringWriter).w16 = function (value) {
    this.f13_1.za(value);
  };
  protoOf(JsonToStringWriter).q16 = function (char) {
    this.f13_1.x7(char);
  };
  protoOf(JsonToStringWriter).s16 = function (text) {
    this.f13_1.w7(text);
  };
  protoOf(JsonToStringWriter).c17 = function (text) {
    printQuoted(this.f13_1, text);
  };
  protoOf(JsonToStringWriter).g13 = function () {
    this.f13_1.cb();
  };
  protoOf(JsonToStringWriter).toString = function () {
    return this.f13_1.toString();
  };
  function createMapForCache(initialCapacity) {
    return HashMap_init_$Create$(initialCapacity);
  }
  //region block: post-declaration
  protoOf(defer$1).zk = get_isNullable;
  protoOf(defer$1).fl = get_isInline;
  protoOf(defer$1).hl = get_annotations;
  protoOf(JsonSerializersModuleValidator).s12 = contextual;
  //endregion
  //region block: init
  Companion_instance = new Companion();
  Companion_instance_0 = new Companion_0();
  Companion_instance_1 = new Companion_1();
  Companion_instance_2 = new Companion_2();
  Tombstone_instance = new Tombstone();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = JsonNull_getInstance;
  _.$_$.b = JsonArray;
  _.$_$.c = JsonElement;
  _.$_$.d = JsonNull;
  _.$_$.e = JsonObject;
  _.$_$.f = JsonPrimitive_0;
  _.$_$.g = JsonPrimitive_2;
  _.$_$.h = JsonPrimitive_1;
  _.$_$.i = JsonPrimitive;
  _.$_$.j = Json_0;
  _.$_$.k = get_booleanOrNull;
  _.$_$.l = get_doubleOrNull;
  _.$_$.m = get_longOrNull;
  //endregion
  return _;
}));

//# sourceMappingURL=kotlinx-serialization-kotlinx-serialization-json.js.map
