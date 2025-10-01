(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './kotlinx-serialization-kotlinx-serialization-json.js', './kotlinx-serialization-kotlinx-serialization-core.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./kotlinx-serialization-kotlinx-serialization-json.js'), require('./kotlinx-serialization-kotlinx-serialization-core.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'io.github.ehlyzov.branchline-public:interpreter'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'io.github.ehlyzov.branchline-public:interpreter'.");
    }
    if (typeof globalThis['kotlinx-serialization-kotlinx-serialization-json'] === 'undefined') {
      throw new Error("Error loading module 'io.github.ehlyzov.branchline-public:interpreter'. Its dependency 'kotlinx-serialization-kotlinx-serialization-json' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-json' is loaded prior to 'io.github.ehlyzov.branchline-public:interpreter'.");
    }
    if (typeof globalThis['kotlinx-serialization-kotlinx-serialization-core'] === 'undefined') {
      throw new Error("Error loading module 'io.github.ehlyzov.branchline-public:interpreter'. Its dependency 'kotlinx-serialization-kotlinx-serialization-core' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-core' is loaded prior to 'io.github.ehlyzov.branchline-public:interpreter'.");
    }
    globalThis['io.github.ehlyzov.branchline-public:interpreter'] = factory(typeof globalThis['io.github.ehlyzov.branchline-public:interpreter'] === 'undefined' ? {} : globalThis['io.github.ehlyzov.branchline-public:interpreter'], globalThis['kotlin-kotlin-stdlib'], globalThis['kotlinx-serialization-kotlinx-serialization-json'], globalThis['kotlinx-serialization-kotlinx-serialization-core']);
  }
}(function (_, kotlin_kotlin, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var RuntimeException = kotlin_kotlin.$_$.cb;
  var VOID = kotlin_kotlin.$_$.e;
  var RuntimeException_init_$Init$ = kotlin_kotlin.$_$.f1;
  var captureStack = kotlin_kotlin.$_$.a7;
  var protoOf = kotlin_kotlin.$_$.o8;
  var initMetadataForClass = kotlin_kotlin.$_$.o7;
  var Unit_instance = kotlin_kotlin.$_$.y3;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.j;
  var emptyList = kotlin_kotlin.$_$.h5;
  var Collection = kotlin_kotlin.$_$.a4;
  var isInterface = kotlin_kotlin.$_$.c8;
  var toString = kotlin_kotlin.$_$.r8;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.d1;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.o1;
  var charArrayOf = kotlin_kotlin.$_$.b7;
  var trim = kotlin_kotlin.$_$.na;
  var toInt = kotlin_kotlin.$_$.da;
  var THROW_CCE = kotlin_kotlin.$_$.db;
  var toList = kotlin_kotlin.$_$.m6;
  var startsWith = kotlin_kotlin.$_$.v9;
  var contains = kotlin_kotlin.$_$.h9;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.b1;
  var toIntOrNull = kotlin_kotlin.$_$.ca;
  var toLongOrNull = kotlin_kotlin.$_$.ea;
  var lines = kotlin_kotlin.$_$.r9;
  var joinToString = kotlin_kotlin.$_$.r5;
  var coerceAtLeast = kotlin_kotlin.$_$.t8;
  var repeat = kotlin_kotlin.$_$.t9;
  var getOrNull = kotlin_kotlin.$_$.m5;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.y;
  var RegexOption_IGNORE_CASE_getInstance = kotlin_kotlin.$_$.f;
  var Regex_init_$Create$ = kotlin_kotlin.$_$.w;
  var isCharSequence = kotlin_kotlin.$_$.y7;
  var trim_0 = kotlin_kotlin.$_$.oa;
  var trimIndent = kotlin_kotlin.$_$.ma;
  var emptyMap = kotlin_kotlin.$_$.i5;
  var isBlank = kotlin_kotlin.$_$.m9;
  var KtMap = kotlin_kotlin.$_$.i4;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.yb;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.i;
  var JsonArray = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json.$_$.b;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.s;
  var JsonObject = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json.$_$.e;
  var JsonPrimitive = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json.$_$.i;
  var JsonNull = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json.$_$.d;
  var get_booleanOrNull = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json.$_$.k;
  var get_longOrNull = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json.$_$.m;
  var get_doubleOrNull = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json.$_$.l;
  var JsonPrimitive_0 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json.$_$.f;
  var map = kotlin_kotlin.$_$.d9;
  var toList_0 = kotlin_kotlin.$_$.e9;
  var Sequence = kotlin_kotlin.$_$.b9;
  var isArray = kotlin_kotlin.$_$.u7;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.s4;
  var Iterable = kotlin_kotlin.$_$.d4;
  var JsonPrimitive_1 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json.$_$.g;
  var Long = kotlin_kotlin.$_$.za;
  var JsonPrimitive_2 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json.$_$.h;
  var JsonElement = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json.$_$.c;
  var JsonNull_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json.$_$.a;
  var to = kotlin_kotlin.$_$.bc;
  var mapOf = kotlin_kotlin.$_$.z5;
  var Json = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json.$_$.j;
  var mapOf_0 = kotlin_kotlin.$_$.y5;
  var equals = kotlin_kotlin.$_$.i9;
  var firstOrNull = kotlin_kotlin.$_$.k5;
  var mapCapacity = kotlin_kotlin.$_$.x5;
  var LinkedHashMap_init_$Create$_0 = kotlin_kotlin.$_$.r;
  var toMap = kotlin_kotlin.$_$.p6;
  var HashMap_init_$Create$ = kotlin_kotlin.$_$.m;
  var getKClass = kotlin_kotlin.$_$.d;
  var arrayOf = kotlin_kotlin.$_$.ob;
  var createKType = kotlin_kotlin.$_$.a;
  var serializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.w1;
  var KSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.p1;
  var initMetadataForObject = kotlin_kotlin.$_$.t7;
  var getBooleanHashCode = kotlin_kotlin.$_$.k7;
  var getStringHashCode = kotlin_kotlin.$_$.m7;
  var defineProp = kotlin_kotlin.$_$.i7;
  var hashCode = kotlin_kotlin.$_$.n7;
  var equals_0 = kotlin_kotlin.$_$.j7;
  var toString_0 = kotlin_kotlin.$_$.ac;
  var Enum = kotlin_kotlin.$_$.wa;
  var charCodeAt = kotlin_kotlin.$_$.d7;
  var Char = kotlin_kotlin.$_$.sa;
  var isDigit = kotlin_kotlin.$_$.n9;
  var getOrNull_0 = kotlin_kotlin.$_$.j9;
  var isLetter = kotlin_kotlin.$_$.p9;
  var toString_1 = kotlin_kotlin.$_$.r1;
  var emptySet = kotlin_kotlin.$_$.j5;
  var Duration__toString_impl_8d916b = kotlin_kotlin.$_$.m1;
  var Duration__hashCode_impl_u4exz6 = kotlin_kotlin.$_$.i1;
  var ArrayDeque_init_$Create$ = kotlin_kotlin.$_$.h;
  var listOf = kotlin_kotlin.$_$.w5;
  var getKClassFromExpression = kotlin_kotlin.$_$.c;
  var charSequenceLength = kotlin_kotlin.$_$.f7;
  var StringBuilder = kotlin_kotlin.$_$.f9;
  var charSequenceGet = kotlin_kotlin.$_$.e7;
  var isLetterOrDigit = kotlin_kotlin.$_$.o9;
  var LinkedHashSet_init_$Create$ = kotlin_kotlin.$_$.u;
  var KtList = kotlin_kotlin.$_$.g4;
  var take = kotlin_kotlin.$_$.j6;
  var lastOrNull = kotlin_kotlin.$_$.u5;
  var toSet = kotlin_kotlin.$_$.q6;
  var sorted = kotlin_kotlin.$_$.i6;
  var sortedWith = kotlin_kotlin.$_$.h6;
  var Pair = kotlin_kotlin.$_$.ab;
  var isNumber = kotlin_kotlin.$_$.e8;
  var FunctionAdapter = kotlin_kotlin.$_$.x6;
  var Comparator = kotlin_kotlin.$_$.ta;
  var compareValues = kotlin_kotlin.$_$.t6;
  var Monotonic_instance = kotlin_kotlin.$_$.p3;
  var ValueTimeMark__elapsedNow_impl_eonqvs = kotlin_kotlin.$_$.n1;
  var ensureNotNull = kotlin_kotlin.$_$.sb;
  var asReversed = kotlin_kotlin.$_$.q4;
  var get_lastIndex = kotlin_kotlin.$_$.t5;
  var reversed = kotlin_kotlin.$_$.e6;
  var trimEnd = kotlin_kotlin.$_$.la;
  var get_indices = kotlin_kotlin.$_$.q5;
  var Companion_getInstance = kotlin_kotlin.$_$.n3;
  var Duration = kotlin_kotlin.$_$.pa;
  var last = kotlin_kotlin.$_$.v5;
  var Duration__minus_impl_q5cfm7 = kotlin_kotlin.$_$.j1;
  var Duration__plus_impl_yu9v8f = kotlin_kotlin.$_$.k1;
  var Duration__div_impl_dknbf4 = kotlin_kotlin.$_$.h1;
  var toMap_0 = kotlin_kotlin.$_$.o6;
  var numberToLong = kotlin_kotlin.$_$.m8;
  var toLong = kotlin_kotlin.$_$.q8;
  var numberToInt = kotlin_kotlin.$_$.l8;
  var numberToDouble = kotlin_kotlin.$_$.k8;
  var HashMap_init_$Create$_0 = kotlin_kotlin.$_$.n;
  var zip = kotlin_kotlin.$_$.s6;
  var compareTo = kotlin_kotlin.$_$.h7;
  var asIterable = kotlin_kotlin.$_$.c9;
  var UnsupportedOperationException_init_$Create$ = kotlin_kotlin.$_$.g1;
  var asSequence = kotlin_kotlin.$_$.r4;
  var plus = kotlin_kotlin.$_$.c6;
  var first = kotlin_kotlin.$_$.l5;
  var drop = kotlin_kotlin.$_$.g5;
  var Exception = kotlin_kotlin.$_$.xa;
  var addAll = kotlin_kotlin.$_$.n4;
  var mutableSetOf = kotlin_kotlin.$_$.a6;
  var HashSet_init_$Create$ = kotlin_kotlin.$_$.p;
  var dropLast = kotlin_kotlin.$_$.f5;
  var toLong_0 = kotlin_kotlin.$_$.fa;
  var countLeadingZeroBits = kotlin_kotlin.$_$.pb;
  var toDouble = kotlin_kotlin.$_$.ba;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(ParseException, 'ParseException', VOID, RuntimeException);
  initMetadataForClass(Parser, 'Parser');
  initMetadataForObject(PlaygroundFacade, 'PlaygroundFacade');
  initMetadataForClass(PlaygroundResult, 'PlaygroundResult');
  initMetadataForClass(Static, 'Static');
  initMetadataForClass(Dynamic, 'Dynamic');
  initMetadataForClass(NodeDecl, 'NodeDecl');
  initMetadataForClass(Connection, 'Connection');
  initMetadataForClass(GraphOutput, 'GraphOutput');
  initMetadataForClass(Program, 'Program');
  initMetadataForClass(SharedDecl, 'SharedDecl');
  initMetadataForClass(SharedKind, 'SharedKind', VOID, Enum);
  initMetadataForClass(FuncDecl, 'FuncDecl');
  initMetadataForClass(ExprBody, 'ExprBody');
  initMetadataForClass(BlockBody, 'BlockBody');
  initMetadataForClass(TypeDecl, 'TypeDecl');
  initMetadataForClass(TypeKind, 'TypeKind', VOID, Enum);
  initMetadataForClass(SourceDecl, 'SourceDecl');
  initMetadataForClass(OutputDecl, 'OutputDecl');
  initMetadataForClass(TransformDecl, 'TransformDecl');
  initMetadataForClass(Mode, 'Mode', VOID, Enum);
  initMetadataForClass(AdapterSpec, 'AdapterSpec');
  initMetadataForClass(Property, 'Property');
  initMetadataForClass(LiteralProperty, 'LiteralProperty', VOID, Property);
  initMetadataForClass(ComputedProperty, 'ComputedProperty', VOID, Property);
  initMetadataForClass(LetStmt, 'LetStmt');
  initMetadataForClass(SetStmt, 'SetStmt');
  initMetadataForClass(SetVarStmt, 'SetVarStmt');
  initMetadataForClass(AppendToStmt, 'AppendToStmt');
  initMetadataForClass(AppendToVarStmt, 'AppendToVarStmt');
  initMetadataForClass(ModifyStmt, 'ModifyStmt');
  initMetadataForClass(OutputStmt, 'OutputStmt');
  initMetadataForClass(IfStmt, 'IfStmt');
  initMetadataForClass(ForEachStmt, 'ForEachStmt');
  initMetadataForClass(TryCatchStmt, 'TryCatchStmt');
  initMetadataForClass(CodeBlock, 'CodeBlock');
  initMetadataForClass(ReturnStmt, 'ReturnStmt');
  initMetadataForClass(AbortStmt, 'AbortStmt');
  initMetadataForClass(ExprStmt, 'ExprStmt');
  initMetadataForClass(IdentifierExpr, 'IdentifierExpr');
  initMetadataForClass(StringExpr, 'StringExpr');
  initMetadataForClass(AccessExpr, 'AccessExpr');
  initMetadataForClass(NumberLiteral, 'NumberLiteral');
  initMetadataForClass(NullLiteral, 'NullLiteral');
  initMetadataForClass(ObjectExpr, 'ObjectExpr');
  initMetadataForClass(CallExpr, 'CallExpr');
  initMetadataForClass(InvokeExpr, 'InvokeExpr');
  initMetadataForClass(BinaryExpr, 'BinaryExpr');
  initMetadataForClass(UnaryExpr, 'UnaryExpr');
  initMetadataForClass(BoolExpr, 'BoolExpr');
  initMetadataForClass(LambdaExpr, 'LambdaExpr');
  initMetadataForClass(ArrayExpr, 'ArrayExpr');
  initMetadataForClass(ArrayCompExpr, 'ArrayCompExpr');
  initMetadataForClass(IfElseExpr, 'IfElseExpr');
  initMetadataForClass(SharedStateAwaitExpr, 'SharedStateAwaitExpr');
  initMetadataForClass(Lexer, 'Lexer');
  initMetadataForClass(Token, 'Token');
  initMetadataForClass(TokenType, 'TokenType', VOID, Enum);
  initMetadataForClass(I32, 'I32');
  initMetadataForClass(I64, 'I64');
  initMetadataForClass(IBig, 'IBig');
  initMetadataForClass(Dec, 'Dec');
  initMetadataForClass(Name, 'Name');
  initMetadataForClass(TraceOptions, 'TraceOptions', TraceOptions);
  initMetadataForClass(CalcStep, 'CalcStep');
  initMetadataForClass(Enter, 'Enter');
  initMetadataForClass(Exit, 'Exit');
  initMetadataForClass(Let, 'Let');
  initMetadataForClass(PathWrite, 'PathWrite');
  initMetadataForClass(Output, 'Output');
  initMetadataForClass(Call, 'Call');
  initMetadataForClass(Return, 'Return');
  initMetadataForClass(Read, 'Read');
  initMetadataForClass(EvalEnter, 'EvalEnter');
  initMetadataForClass(EvalExit, 'EvalExit');
  initMetadataForClass(Error_0, 'Error');
  initMetadataForClass(Timed, 'Timed');
  initMetadataForClass(CaptureFrame, 'CaptureFrame');
  initMetadataForClass(ProvStep, 'ProvStep');
  initMetadataForClass(sam$kotlin_Comparator$0, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
  initMetadataForClass(CollectingTracer, 'CollectingTracer', CollectingTracer);
  initMetadataForObject(Debug, 'Debug');
  initMetadataForClass(TimelineEntry, 'TimelineEntry');
  initMetadataForClass(Hotspot, 'Hotspot');
  initMetadataForClass(WatchInfo, 'WatchInfo');
  initMetadataForClass(Checkpoint, 'Checkpoint');
  initMetadataForClass(TraceReportData, 'TraceReportData');
  initMetadataForClass(sam$kotlin_Comparator$0_0, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
  initMetadataForClass(TraceReport$from$Frame, 'Frame');
  initMetadataForClass(TraceReport$from$Agg, 'Agg');
  initMetadataForObject(TraceReport, 'TraceReport');
  initMetadataForClass(ExecResult, 'ExecResult');
  initMetadataForClass(Evaluator, 'Evaluator');
  initMetadataForClass(Frame, 'Frame');
  initMetadataForClass(CKind, 'CKind', VOID, Enum);
  initMetadataForClass(LeafAddress, 'LeafAddress');
  initMetadataForClass(PathContext, 'PathContext');
  initMetadataForClass(Exec, 'Exec');
  initMetadataForClass(IRLet, 'IRLet');
  initMetadataForClass(IRModify, 'IRModify');
  initMetadataForClass(IROutput, 'IROutput');
  initMetadataForClass(IRForEach, 'IRForEach');
  initMetadataForClass(IRIf, 'IRIf');
  initMetadataForClass(IRSet, 'IRSet');
  initMetadataForClass(IRAppendTo, 'IRAppendTo');
  initMetadataForClass(IRTryCatch, 'IRTryCatch');
  initMetadataForClass(IRReturn, 'IRReturn');
  initMetadataForClass(IRAbort, 'IRAbort');
  initMetadataForClass(IRExprOutput, 'IRExprOutput');
  initMetadataForClass(IRExprStmt, 'IRExprStmt');
  initMetadataForClass(IRSetVar, 'IRSetVar');
  initMetadataForClass(IRAppendVar, 'IRAppendVar');
  initMetadataForClass(ToIR, 'ToIR');
  initMetadataForClass(SemanticException, 'SemanticException', VOID, RuntimeException);
  initMetadataForClass(SemanticAnalyzer, 'SemanticAnalyzer', SemanticAnalyzer);
  initMetadataForClass(TransformRegistry, 'TransformRegistry');
  initMetadataForClass(BLBigInt, 'BLBigInt');
  initMetadataForClass(BLBigDec, 'BLBigDec');
  //endregion
  function ParseException(msg, token, snippet) {
    snippet = snippet === VOID ? null : snippet;
    var tmp = '[' + token.j1e_1 + ':' + token.k1e_1 + '] ' + msg + " near '" + token.i1e_1 + "'";
    var tmp_0;
    if (snippet == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp_0 = '\n' + snippet;
    }
    var tmp1_elvis_lhs = tmp_0;
    RuntimeException_init_$Init$(tmp + (tmp1_elvis_lhs == null ? '' : tmp1_elvis_lhs), this);
    captureStack(this, ParseException);
    this.l1e_1 = token;
    this.m1e_1 = snippet;
  }
  function parseSource($this) {
    var start = advance($this);
    var nameTok = consume($this, TokenType_IDENTIFIER_getInstance(), 'Expect source identifier');
    var adapter = match($this, [TokenType_USING_getInstance()]) ? parseAdapter($this) : null;
    consume($this, TokenType_SEMICOLON_getInstance(), "Expect ';' after SOURCE declaration");
    return new SourceDecl(nameTok.i1e_1, adapter, start);
  }
  function parseOutput($this) {
    var start = advance($this);
    var adapter = match($this, [TokenType_USING_getInstance()]) ? parseAdapter($this) : null;
    var template = parseExpression($this);
    return new OutputDecl(adapter, template, start);
  }
  function parseTransform($this) {
    var start = advance($this);
    var nameTok = check($this, TokenType_IDENTIFIER_getInstance()) ? advance($this) : null;
    // Inline function 'kotlin.collections.mutableListOf' call
    var params = ArrayList_init_$Create$();
    if (!(nameTok == null) && match($this, [TokenType_LEFT_PAREN_getInstance()])) {
      if (!check($this, TokenType_RIGHT_PAREN_getInstance())) {
        do {
          var pTok = consume($this, TokenType_IDENTIFIER_getInstance(), 'Expect parameter name');
          // Inline function 'kotlin.collections.plusAssign' call
          var element = pTok.i1e_1;
          params.e(element);
        }
         while (match($this, [TokenType_COMMA_getInstance()]));
      }
      consume($this, TokenType_RIGHT_PAREN_getInstance(), "Expect ')' after transform parameters");
    }
    consume($this, TokenType_LEFT_BRACE_getInstance(), "Expect '{' before mode");
    var modeTok = advance($this);
    var tmp;
    switch (modeTok.h1e_1.k2_1) {
      case 39:
        tmp = Mode_STREAM_getInstance();
        break;
      case 40:
        tmp = Mode_BUFFER_getInstance();
        break;
      default:
        error($this, modeTok, 'Expect STREAM or BUFFER');
        break;
    }
    var mode = tmp;
    consume($this, TokenType_RIGHT_BRACE_getInstance(), "Expect '}' after mode");
    var body = parseBlock($this);
    return new TransformDecl(nameTok == null ? null : nameTok.i1e_1, params, mode, body, start);
  }
  function parseAdapter($this) {
    var nameTok = consume($this, TokenType_IDENTIFIER_getInstance(), 'Expect adapter name after USING');
    // Inline function 'kotlin.collections.mutableListOf' call
    var args = ArrayList_init_$Create$();
    if (match($this, [TokenType_LEFT_PAREN_getInstance()])) {
      if (!check($this, TokenType_RIGHT_PAREN_getInstance())) {
        do {
          // Inline function 'kotlin.collections.plusAssign' call
          var element = parseExpression($this);
          args.e(element);
        }
         while (match($this, [TokenType_COMMA_getInstance()]));
      }
      consume($this, TokenType_RIGHT_PAREN_getInstance(), "Expect ')' after adapter args");
    }
    return new AdapterSpec(nameTok.i1e_1, args, nameTok);
  }
  function parseShared($this) {
    var sharedTok = consume($this, TokenType_SHARED_getInstance(), "Expect 'SHARED'.");
    var nameTok = consume($this, TokenType_IDENTIFIER_getInstance(), 'Expect shared memory name.');
    var tmp;
    if (match($this, [TokenType_SINGLE_getInstance()])) {
      tmp = SharedKind_SINGLE_getInstance();
    } else if (match($this, [TokenType_MANY_getInstance()])) {
      tmp = SharedKind_MANY_getInstance();
    } else {
      error($this, peek($this), 'Expect SINGLE or MANY after shared name');
    }
    var kind = tmp;
    consume($this, TokenType_SEMICOLON_getInstance(), "Expect ';' after SHARED declaration.");
    return new SharedDecl(nameTok.i1e_1, kind, sharedTok);
  }
  function parseFunc($this) {
    var funcTok = consume($this, TokenType_FUNC_getInstance(), "Expect 'FUNC'.");
    var nameTok = consume($this, TokenType_IDENTIFIER_getInstance(), 'Expect function name.');
    consume($this, TokenType_LEFT_PAREN_getInstance(), "Expect '(' after function name.");
    // Inline function 'kotlin.collections.mutableListOf' call
    var params = ArrayList_init_$Create$();
    if (!check($this, TokenType_RIGHT_PAREN_getInstance())) {
      do {
        // Inline function 'kotlin.collections.plusAssign' call
        var element = consume($this, TokenType_IDENTIFIER_getInstance(), 'Expect parameter name.').i1e_1;
        params.e(element);
      }
       while (match($this, [TokenType_COMMA_getInstance()]));
    }
    consume($this, TokenType_RIGHT_PAREN_getInstance(), "Expect ')' after parameters.");
    var tmp;
    if (match($this, [TokenType_ASSIGN_getInstance()])) {
      var expr = parseExpression($this);
      consume($this, TokenType_SEMICOLON_getInstance(), "Expect ';' after function expression body.");
      tmp = new ExprBody(expr, funcTok);
    } else {
      var block = parseBlock($this);
      tmp = new BlockBody(block, funcTok);
    }
    var body = tmp;
    return new FuncDecl(nameTok.i1e_1, params, body, funcTok);
  }
  function parseType($this) {
    var typeTok = consume($this, TokenType_TYPE_getInstance(), "Expect 'TYPE'.");
    var nameTok = consume($this, TokenType_IDENTIFIER_getInstance(), 'Expect type name.');
    consume($this, TokenType_ASSIGN_getInstance(), "Expect '=' after type name.");
    // Inline function 'kotlin.collections.mutableListOf' call
    var defs = ArrayList_init_$Create$();
    var tmp;
    if (match($this, [TokenType_ENUM_getInstance()])) {
      consume($this, TokenType_LEFT_BRACE_getInstance(), "Expect '{' after 'enum'.");
      do {
        // Inline function 'kotlin.collections.plusAssign' call
        var element = consume($this, TokenType_IDENTIFIER_getInstance(), 'Expect enum label.').i1e_1;
        defs.e(element);
      }
       while (match($this, [TokenType_COMMA_getInstance()]));
      consume($this, TokenType_RIGHT_BRACE_getInstance(), "Expect '}' after enum body.");
      tmp = TypeKind_ENUM_getInstance();
    } else if (match($this, [TokenType_UNION_getInstance()])) {
      do {
        // Inline function 'kotlin.collections.plusAssign' call
        var element_0 = consume($this, TokenType_IDENTIFIER_getInstance(), 'Expect union member type.').i1e_1;
        defs.e(element_0);
      }
       while (match($this, [TokenType_PIPE_getInstance()]));
      tmp = TypeKind_UNION_getInstance();
    } else {
      error($this, peek($this), "Expect 'enum' or 'union' after '='");
    }
    var kind = tmp;
    consume($this, TokenType_SEMICOLON_getInstance(), "Expect ';' after TYPE declaration.");
    return new TypeDecl(nameTok.i1e_1, kind, defs, typeTok);
  }
  function parseBlock($this) {
    var lbrace = consume($this, TokenType_LEFT_BRACE_getInstance(), "Expect '{' to start block");
    // Inline function 'kotlin.collections.mutableListOf' call
    var stmts = ArrayList_init_$Create$();
    while (!check($this, TokenType_RIGHT_BRACE_getInstance()) && !isAtEnd($this)) {
      // Inline function 'kotlin.collections.plusAssign' call
      var element = parseStatement($this);
      stmts.e(element);
    }
    consume($this, TokenType_RIGHT_BRACE_getInstance(), "Expect '}' after block");
    return new CodeBlock(stmts, lbrace);
  }
  function parseStatement($this) {
    var tmp;
    if (match($this, [TokenType_LET_getInstance()])) {
      tmp = parseLet($this);
    } else if (match($this, [TokenType_MODIFY_getInstance()])) {
      tmp = parseModify($this);
    } else if (match($this, [TokenType_SET_getInstance()])) {
      tmp = parseSet($this);
    } else if (match($this, [TokenType_APPEND_getInstance()])) {
      tmp = parseAppendTo($this);
    } else if (match($this, [TokenType_OUTPUT_getInstance()])) {
      tmp = parseOutputStmt($this);
    } else if (match($this, [TokenType_IF_getInstance()])) {
      tmp = parseIf($this, previous($this));
    } else if (match($this, [TokenType_FOR_getInstance()])) {
      tmp = parseForEach($this, previous($this));
    } else if (match($this, [TokenType_TRY_getInstance()])) {
      tmp = parseTryCatch($this, previous($this));
    } else if (match($this, [TokenType_RETURN_getInstance()])) {
      tmp = parseReturn($this);
    } else if (match($this, [TokenType_ABORT_getInstance()])) {
      tmp = parseAbort($this);
    } else {
      var start = peek($this);
      var expr = parseExpression($this);
      consume($this, TokenType_SEMICOLON_getInstance(), "Expect ';' after expression.");
      tmp = new ExprStmt(expr, start);
    }
    return tmp;
  }
  function parseLet($this) {
    var nameTok = consume($this, TokenType_IDENTIFIER_getInstance(), 'Expect identifier after LET');
    consume($this, TokenType_ASSIGN_getInstance(), "Expect '=' in LET statement");
    var expr = parseExpression($this);
    consume($this, TokenType_SEMICOLON_getInstance(), "Expect ';' after LET");
    return new LetStmt(nameTok.i1e_1, expr, nameTok);
  }
  function parseModify($this) {
    var targetExpr = parsePrimaryPostfix$default($this);
    var tmp;
    if (targetExpr instanceof IdentifierExpr) {
      tmp = new AccessExpr(targetExpr, emptyList(), targetExpr.o1e_1);
    } else {
      if (targetExpr instanceof AccessExpr) {
        tmp = targetExpr;
      } else {
        error($this, previous($this), "Expect static object path after MODIFY (identifier or dotted path without '[ ]')");
      }
    }
    var targetPath = tmp;
    var tmp0 = targetPath.q1e_1;
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlin.collections.all' call
      var tmp_0;
      if (isInterface(tmp0, Collection)) {
        tmp_0 = tmp0.p();
      } else {
        tmp_0 = false;
      }
      if (tmp_0) {
        tmp$ret$0 = true;
        break $l$block_0;
      }
      var _iterator__ex2g4s = tmp0.g();
      while (_iterator__ex2g4s.h()) {
        var element = _iterator__ex2g4s.i();
        if (!(element instanceof Static)) {
          tmp$ret$0 = false;
          break $l$block_0;
        }
      }
      tmp$ret$0 = true;
    }
    // Inline function 'kotlin.check' call
    if (!tmp$ret$0) {
      var message = "Expect static object path after MODIFY (identifier or dotted path without '[ ]')";
      throw IllegalStateException_init_$Create$(toString(message));
    }
    var lbrace = consume($this, TokenType_LEFT_BRACE_getInstance(), "Expect '{' after MODIFY target");
    // Inline function 'kotlin.collections.mutableListOf' call
    var updates = ArrayList_init_$Create$();
    if (!check($this, TokenType_RIGHT_BRACE_getInstance())) {
      do {
        if (match($this, [TokenType_LEFT_BRACKET_getInstance()])) {
          var keyExpr = parseExpression($this);
          consume($this, TokenType_RIGHT_BRACKET_getInstance(), "Expect ']' after computed property name");
          consume($this, TokenType_COLON_getInstance(), "Expect ':' after computed property name");
          var valueExpr = parseExpression($this);
          // Inline function 'kotlin.collections.plusAssign' call
          var element_0 = new ComputedProperty(keyExpr, valueExpr);
          updates.e(element_0);
        } else {
          var tmp_1;
          if (match($this, [TokenType_STRING_getInstance()])) {
            tmp_1 = previous($this);
          } else if (match($this, [TokenType_IDENTIFIER_getInstance()])) {
            tmp_1 = previous($this);
          } else if (match($this, [TokenType_NUMBER_getInstance()])) {
            tmp_1 = previous($this);
          } else if (check($this, TokenType_MINUS_getInstance())) {
            advance($this);
            var nTok = consume($this, TokenType_NUMBER_getInstance(), 'Numeric field key must be a non-negative integer');
            error($this, nTok, "Numeric field key must be a non-negative integer, got '-" + nTok.i1e_1 + "'");
          } else {
            error($this, peek($this), 'Expect field key in MODIFY');
          }
          var keyTok = tmp_1;
          var tmp_2;
          switch (keyTok.h1e_1.k2_1) {
            case 33:
              tmp_2 = new Name(_Name___init__impl__o4q07e(trim(keyTok.i1e_1, charArrayOf([_Char___init__impl__6a9atx(34)]))));
              break;
            case 32:
              tmp_2 = new Name(_Name___init__impl__o4q07e(keyTok.i1e_1));
              break;
            case 34:
              tmp_2 = parseIntKey($this, keyTok.i1e_1);
              break;
            default:
              error($this, keyTok, 'Invalid field key in MODIFY');
              break;
          }
          var key = tmp_2;
          consume($this, TokenType_COLON_getInstance(), "Expect ':' after field key");
          var valueExpr_0 = parseExpression($this);
          // Inline function 'kotlin.collections.plusAssign' call
          var element_1 = new LiteralProperty(key, valueExpr_0);
          updates.e(element_1);
        }
      }
       while (match($this, [TokenType_COMMA_getInstance()]) || match($this, [TokenType_SEMICOLON_getInstance()]));
    }
    consume($this, TokenType_RIGHT_BRACE_getInstance(), "Expect '}' after MODIFY block");
    return new ModifyStmt(targetPath, updates, lbrace);
  }
  function parseAppendTo($this) {
    var start = previous($this);
    consume($this, TokenType_TO_getInstance(), 'Expect TO after APPEND');
    var target = parsePrimaryPostfix($this, false);
    var value = parseExpression($this);
    var initExpr = match($this, [TokenType_INIT_getInstance()]) ? parseExpression($this) : null;
    consume($this, TokenType_SEMICOLON_getInstance(), "Expect ';' after APPEND TO");
    var tmp;
    if (target instanceof IdentifierExpr) {
      tmp = new AppendToVarStmt(target.n1e_1, value, initExpr, start);
    } else {
      if (target instanceof AccessExpr) {
        tmp = new AppendToStmt(target, value, initExpr, start);
      } else {
        error($this, start, 'APPEND TO target must be identifier or path');
      }
    }
    return tmp;
  }
  function parseSet($this) {
    var start = previous($this);
    var target = parsePrimaryPostfix$default($this);
    consume($this, TokenType_ASSIGN_getInstance(), "Expect '=' after SET target");
    var value = parseExpression($this);
    consume($this, TokenType_SEMICOLON_getInstance(), "Expect ';'");
    var tmp;
    if (target instanceof IdentifierExpr) {
      tmp = new SetVarStmt(target.n1e_1, value, start);
    } else {
      if (target instanceof AccessExpr) {
        tmp = new SetStmt(target, value, start);
      } else {
        error($this, start, 'SET target must be identifier or path');
      }
    }
    return tmp;
  }
  function parseOutputStmt($this) {
    var outTok = previous($this);
    var template = parseExpression($this);
    match($this, [TokenType_SEMICOLON_getInstance()]);
    return new OutputStmt(template, outTok);
  }
  function parseIf($this, ifTok) {
    var condition = parseExpression($this);
    consume($this, TokenType_THEN_getInstance(), 'Expect THEN after IF condition');
    var thenBlock = parseBlock($this);
    var elseBlock = match($this, [TokenType_ELSE_getInstance()]) ? parseBlock($this) : null;
    return new IfStmt(condition, thenBlock, elseBlock, ifTok);
  }
  function parseForEach($this, forTok) {
    match($this, [TokenType_EACH_getInstance()]);
    var varTok = consume($this, TokenType_IDENTIFIER_getInstance(), 'Expect loop variable name');
    consume($this, TokenType_IN_getInstance(), 'Expect IN after loop variable');
    var iterable = parseExpression($this);
    var whereExpr = match($this, [TokenType_WHERE_getInstance()]) ? parseExpression($this) : null;
    var body = parseBlock($this);
    return new ForEachStmt(varTok.i1e_1, iterable, body, whereExpr, forTok);
  }
  function parseTryCatch($this, tryTok) {
    var tryExpr = parseExpression($this);
    consume($this, TokenType_CATCH_getInstance(), 'Expect CATCH after TRY expression');
    consume($this, TokenType_LEFT_PAREN_getInstance(), "Expect '(' after CATCH");
    var excTok = consume($this, TokenType_IDENTIFIER_getInstance(), 'Expect exception variable');
    if (match($this, [TokenType_COLON_getInstance()])) {
      consume($this, TokenType_IDENTIFIER_getInstance(), "Expect type name after ':'");
    }
    consume($this, TokenType_RIGHT_PAREN_getInstance(), "Expect ')' after CATCH");
    var retry = null;
    var backoff = null;
    if (match($this, [TokenType_RETRY_getInstance()])) {
      var numTok = consume($this, TokenType_NUMBER_getInstance(), 'Expect retry count');
      retry = toInt(numTok.i1e_1);
      consume($this, TokenType_TIMES_getInstance(), 'Expect TIMES after retry count');
      if (match($this, [TokenType_BACKOFF_getInstance()])) {
        var strTok = consume($this, TokenType_STRING_getInstance(), 'Expect backoff string');
        backoff = trim(strTok.i1e_1, charArrayOf([_Char___init__impl__6a9atx(34)]));
      }
    }
    consume($this, TokenType_ARROW_getInstance(), "Expect '->' after TRY/CATCH block");
    var fbExpr = null;
    var fbAbort = null;
    if (match($this, [TokenType_ABORT_getInstance()])) {
      fbAbort = parseAbort($this);
    } else {
      fbExpr = parseExpression($this);
    }
    match($this, [TokenType_SEMICOLON_getInstance()]);
    return new TryCatchStmt(tryExpr, excTok.i1e_1, retry, backoff, fbExpr, fbAbort, tryTok);
  }
  function parseReturn($this) {
    var kw = previous($this);
    var value = !check($this, TokenType_SEMICOLON_getInstance()) ? parseExpression($this) : null;
    consume($this, TokenType_SEMICOLON_getInstance(), "Expect ';' after return statement.");
    return new ReturnStmt(value, kw);
  }
  function parseAbort($this) {
    var kw = previous($this);
    var expr = !check($this, TokenType_SEMICOLON_getInstance()) ? parseExpression($this) : null;
    consume($this, TokenType_SEMICOLON_getInstance(), "Expect ';' after ABORT");
    return new AbortStmt(expr, kw);
  }
  function parseExpression($this) {
    return parseIfElse($this);
  }
  function parseIfElse($this) {
    if (!match($this, [TokenType_IF_getInstance()]))
      return parseCoalesce($this);
    var ifTok = previous($this);
    var cond = parseExpression($this);
    consume($this, TokenType_THEN_getInstance(), 'expect THEN');
    var thenE = parseExpression($this);
    consume($this, TokenType_ELSE_getInstance(), 'expect ELSE');
    var elseE = parseExpression($this);
    return new IfElseExpr(cond, thenE, elseE, ifTok);
  }
  function parseCoalesce($this) {
    var expr = parseOr($this);
    while (match($this, [TokenType_COALESCE_getInstance()])) {
      var op = previous($this);
      var right = parseOr($this);
      expr = new BinaryExpr(expr, op, right);
    }
    return expr;
  }
  function parseOr($this) {
    var expr = parseAnd($this);
    while (match($this, [TokenType_OR_getInstance()])) {
      var op = previous($this);
      var right = parseAnd($this);
      expr = new BinaryExpr(expr, op, right);
    }
    return expr;
  }
  function parseAnd($this) {
    var expr = parseEquality($this);
    while (match($this, [TokenType_AND_getInstance()])) {
      var op = previous($this);
      var right = parseEquality($this);
      expr = new BinaryExpr(expr, op, right);
    }
    return expr;
  }
  function parseEquality($this) {
    var expr = parseComparison($this);
    while (match($this, [TokenType_EQ_getInstance(), TokenType_NEQ_getInstance()])) {
      var op = previous($this);
      var right = parseComparison($this);
      expr = new BinaryExpr(expr, op, right);
    }
    return expr;
  }
  function parseComparison($this) {
    var expr = parseConcat($this);
    while (match($this, [TokenType_LT_getInstance(), TokenType_LE_getInstance(), TokenType_GT_getInstance(), TokenType_GE_getInstance()])) {
      var op = previous($this);
      var right = parseConcat($this);
      expr = new BinaryExpr(expr, op, right);
    }
    return expr;
  }
  function parseConcat($this) {
    var expr = parseTerm($this);
    while (match($this, [TokenType_CONCAT_getInstance()])) {
      var op = previous($this);
      var right = parseTerm($this);
      expr = new BinaryExpr(expr, op, right);
    }
    return expr;
  }
  function parseTerm($this) {
    var expr = parseFactor($this);
    while (match($this, [TokenType_PLUS_getInstance(), TokenType_MINUS_getInstance()])) {
      var op = previous($this);
      var right = parseFactor($this);
      expr = new BinaryExpr(expr, op, right);
    }
    return expr;
  }
  function parseFactor($this) {
    var expr = parseUnary($this);
    while (match($this, [TokenType_STAR_getInstance(), TokenType_SLASH_getInstance(), TokenType_PERCENT_getInstance()])) {
      var op = previous($this);
      var right = parseUnary($this);
      expr = new BinaryExpr(expr, op, right);
    }
    return expr;
  }
  function parseUnary($this) {
    if (match($this, [TokenType_AWAIT_getInstance()])) {
      var awaitTok = previous($this);
      var right = parsePrimaryPostfix$default($this);
      var tmp;
      var tmp_0;
      var tmp_1;
      var tmp_2;
      var tmp_3;
      if (right instanceof AccessExpr) {
        var tmp_4 = right.p1e_1;
        tmp_3 = tmp_4 instanceof IdentifierExpr;
      } else {
        tmp_3 = false;
      }
      if (tmp_3) {
        tmp_2 = right.q1e_1.j() === 1;
      } else {
        tmp_2 = false;
      }
      if (tmp_2) {
        var tmp_5 = right.q1e_1.o(0);
        tmp_1 = tmp_5 instanceof Static;
      } else {
        tmp_1 = false;
      }
      if (tmp_1) {
        var tmp_6 = right.q1e_1.o(0);
        var tmp_7 = (tmp_6 instanceof Static ? tmp_6 : THROW_CCE()).s1e_1;
        tmp_0 = tmp_7 instanceof Name;
      } else {
        tmp_0 = false;
      }
      if (tmp_0) {
        var tmp_8 = right.p1e_1;
        var resourceName = (tmp_8 instanceof IdentifierExpr ? tmp_8 : THROW_CCE()).n1e_1;
        var tmp_9 = right.q1e_1.o(0);
        var tmp_10 = (tmp_9 instanceof Static ? tmp_9 : THROW_CCE()).s1e_1;
        var keyName = _Name___get_v__impl__vuc4w5(tmp_10 instanceof Name ? tmp_10.t1e_1 : THROW_CCE());
        tmp = new SharedStateAwaitExpr(resourceName, keyName, awaitTok);
      } else {
        tmp = new UnaryExpr(right, awaitTok);
      }
      return tmp;
    }
    if (match($this, [TokenType_MINUS_getInstance(), TokenType_BANG_getInstance(), TokenType_SUSPEND_getInstance()])) {
      var op = previous($this);
      var right_0 = parseUnary($this);
      return new UnaryExpr(right_0, op);
    }
    return parsePrimaryPostfix$default($this);
  }
  function parsePrimaryPostfix($this, allowCall) {
    var expr = {_v: parsePrimary($this)};
    // Inline function 'kotlin.collections.mutableListOf' call
    var segs = ArrayList_init_$Create$();
    var tokenForNode = {_v: expr._v.u1e()};
    loop: while (true) {
      if (check($this, TokenType_DOT_getInstance()) && checkNext($this, TokenType_LEFT_BRACKET_getInstance())) {
        advance($this);
        var lbr = consume($this, TokenType_LEFT_BRACKET_getInstance(), "Expect '[' after '.'");
        var first = consume($this, TokenType_IDENTIFIER_getInstance(), "Expect identifier after '.['");
        var keyExpr = new IdentifierExpr(first.i1e_1, first);
        // Inline function 'kotlin.collections.mutableListOf' call
        var keySegs = ArrayList_init_$Create$();
        while (match($this, [TokenType_DOT_getInstance()])) {
          var tmp;
          if (match($this, [TokenType_IDENTIFIER_getInstance()])) {
            tmp = previous($this);
          } else if (match($this, [TokenType_NUMBER_getInstance()])) {
            tmp = previous($this);
          } else {
            error($this, peek($this), "Expect name or index inside '.[' \u2026 ']'");
          }
          var segTok = tmp;
          var tmp_0;
          switch (segTok.h1e_1.k2_1) {
            case 32:
              tmp_0 = new Static(new Name(_Name___init__impl__o4q07e(segTok.i1e_1)));
              break;
            case 34:
              tmp_0 = new Static(parseIntKey($this, segTok.i1e_1));
              break;
            default:
              error($this, segTok, "Invalid segment inside '.[' \u2026 ']'");
              break;
          }
          var seg = tmp_0;
          // Inline function 'kotlin.collections.plusAssign' call
          keySegs.e(seg);
        }
        consume($this, TokenType_RIGHT_BRACKET_getInstance(), "Expect ']' after .[ \u2026 ]");
        // Inline function 'kotlin.collections.isNotEmpty' call
        if (!keySegs.p()) {
          keyExpr = new AccessExpr(keyExpr, toList(keySegs), first);
        }
        // Inline function 'kotlin.collections.plusAssign' call
        var element = new Dynamic(keyExpr);
        segs.e(element);
        tokenForNode._v = lbr;
      } else if (match($this, [TokenType_DOT_getInstance()])) {
        var tmp_1;
        if (match($this, [TokenType_IDENTIFIER_getInstance()])) {
          tmp_1 = previous($this);
        } else if (match($this, [TokenType_NUMBER_getInstance()])) {
          tmp_1 = previous($this);
        } else {
          error($this, peek($this), "Expect property name or index after '.'");
        }
        var segTok_0 = tmp_1;
        var tmp_2;
        switch (segTok_0.h1e_1.k2_1) {
          case 32:
            tmp_2 = new Static(new Name(_Name___init__impl__o4q07e(segTok_0.i1e_1)));
            break;
          case 34:
            tmp_2 = new Static(parseIntKey($this, segTok_0.i1e_1));
            break;
          default:
            error($this, segTok_0, "Invalid path segment after '.'");
            break;
        }
        // Inline function 'kotlin.collections.plusAssign' call
        var element_0 = tmp_2;
        segs.e(element_0);
        tokenForNode._v = segTok_0;
      } else if (match($this, [TokenType_LEFT_BRACKET_getInstance()])) {
        var keyExpr_0 = parseExpression($this);
        consume($this, TokenType_RIGHT_BRACKET_getInstance(), "Expect ']' after index");
        // Inline function 'kotlin.collections.plusAssign' call
        var element_1 = new Dynamic(keyExpr_0);
        segs.e(element_1);
        tokenForNode._v = keyExpr_0.u1e();
      } else if (check($this, TokenType_LEFT_PAREN_getInstance()) && !allowCall) {
        break loop;
      } else if (match($this, [TokenType_LEFT_PAREN_getInstance()])) {
        expr._v = parsePrimaryPostfix$flush(segs, expr, tokenForNode);
        var lpar = previous($this);
        // Inline function 'kotlin.collections.mutableListOf' call
        var args = ArrayList_init_$Create$();
        if (!check($this, TokenType_RIGHT_PAREN_getInstance())) {
          do {
            // Inline function 'kotlin.collections.plusAssign' call
            var element_2 = parseExpression($this);
            args.e(element_2);
          }
           while (match($this, [TokenType_COMMA_getInstance()]));
        }
        consume($this, TokenType_RIGHT_PAREN_getInstance(), "Expect ')' after arguments");
        var tmp_3;
        if (expr._v instanceof IdentifierExpr) {
          tmp_3 = new CallExpr(expr._v, args, lpar);
        } else {
          tmp_3 = new InvokeExpr(expr._v, args, lpar);
        }
        var callee = tmp_3;
        expr._v = callee;
        segs.c2();
        tokenForNode._v = callee.u1e();
      } else
        break loop;
    }
    return parsePrimaryPostfix$flush(segs, expr, tokenForNode);
  }
  function parsePrimaryPostfix$default($this, allowCall, $super) {
    allowCall = allowCall === VOID ? true : allowCall;
    return parsePrimaryPostfix($this, allowCall);
  }
  function parsePrimary($this) {
    var tok = advance($this);
    var tmp;
    switch (tok.h1e_1.k2_1) {
      case 21:
        var t = previous($this);
        if (!check($this, TokenType_LEFT_PAREN_getInstance())) {
          error($this, t, "Expect '(' to call function APPEND");
        }

        tmp = new IdentifierExpr('APPEND', t);
        break;
      case 32:
        tmp = new IdentifierExpr(tok.i1e_1, tok);
        break;
      case 33:
        tmp = new StringExpr(trim(tok.i1e_1, charArrayOf([_Char___init__impl__6a9atx(34)])), tok);
        break;
      case 34:
        var tok_0 = previous($this);
        tmp = new NumberLiteral(parseNumValue($this, tok_0.i1e_1), tok_0);
        break;
      case 55:
        tmp = new NullLiteral(tok);
        break;
      case 53:
        tmp = new BoolExpr(true, tok);
        break;
      case 54:
        tmp = new BoolExpr(false, tok);
        break;
      case 2:
        tmp = parseObject($this, tok);
        break;
      case 4:
        tmp = parseArray($this, tok);
        break;
      case 0:
        var tmp_0;
        if (looksLikeLambdaAt($this, $this.x1e_1)) {
          tmp_0 = parseLambdaAfterLParen($this);
        } else {
          var inner = parseExpression($this);
          consume($this, TokenType_RIGHT_PAREN_getInstance(), "Expect ')' after expression");
          tmp_0 = inner;
        }

        tmp = tmp_0;
        break;
      default:
        error($this, tok, 'Unexpected token in expression');
        break;
    }
    return tmp;
  }
  function looksLikeLambdaAt($this, idxStart) {
    var i = idxStart;
    if (i >= $this.w1e_1.j())
      return false;
    if ($this.w1e_1.o(i).h1e_1.equals(TokenType_RIGHT_PAREN_getInstance())) {
      i = i + 1 | 0;
      return i < $this.w1e_1.j() && $this.w1e_1.o(i).h1e_1.equals(TokenType_ARROW_getInstance());
    }
    if (!$this.w1e_1.o(i).h1e_1.equals(TokenType_IDENTIFIER_getInstance()))
      return false;
    i = i + 1 | 0;
    while (i < $this.w1e_1.j() && $this.w1e_1.o(i).h1e_1.equals(TokenType_COMMA_getInstance())) {
      i = i + 1 | 0;
      if (i >= $this.w1e_1.j() || !$this.w1e_1.o(i).h1e_1.equals(TokenType_IDENTIFIER_getInstance()))
        return false;
      i = i + 1 | 0;
    }
    if (i >= $this.w1e_1.j() || !$this.w1e_1.o(i).h1e_1.equals(TokenType_RIGHT_PAREN_getInstance()))
      return false;
    i = i + 1 | 0;
    return i < $this.w1e_1.j() && $this.w1e_1.o(i).h1e_1.equals(TokenType_ARROW_getInstance());
  }
  function parseLambdaAfterLParen($this) {
    var lparen = previous($this);
    // Inline function 'kotlin.collections.mutableListOf' call
    var params = ArrayList_init_$Create$();
    if (!check($this, TokenType_RIGHT_PAREN_getInstance())) {
      do {
        // Inline function 'kotlin.collections.plusAssign' call
        var element = consume($this, TokenType_IDENTIFIER_getInstance(), 'Expect parameter name').i1e_1;
        params.e(element);
      }
       while (match($this, [TokenType_COMMA_getInstance()]));
    }
    consume($this, TokenType_RIGHT_PAREN_getInstance(), "Expect ')' after parameters");
    var arrow = consume($this, TokenType_ARROW_getInstance(), "Expect '->' after parameters");
    var tmp;
    if (check($this, TokenType_LEFT_BRACE_getInstance())) {
      var block = parseBlock($this);
      tmp = new BlockBody(block, arrow);
    } else {
      var expr = parseExpression($this);
      tmp = new ExprBody(expr, arrow);
    }
    var body = tmp;
    return new LambdaExpr(params, body, lparen);
  }
  function parseIntKey($this, lex) {
    // Inline function 'kotlin.require' call
    if (!(!startsWith(lex, '-') && !contains(lex, _Char___init__impl__6a9atx(46)) && !contains(lex, _Char___init__impl__6a9atx(101), true))) {
      var message = "Numeric field key must be a non-negative integer, got '" + lex + "'";
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var tmp0_safe_receiver = toIntOrNull(lex);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return new I32(_I32___init__impl__i0ber5(tmp0_safe_receiver));
    }
    var tmp1_safe_receiver = toLongOrNull(lex);
    if (tmp1_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return new I64(_I64___init__impl__6ix60e(tmp1_safe_receiver));
    }
    return new IBig(_IBig___init__impl__6dvmei(blBigIntParse(lex)));
  }
  function parseNumValue($this, lex) {
    var tmp;
    if (contains(lex, _Char___init__impl__6a9atx(46)) || contains(lex, _Char___init__impl__6a9atx(101), true)) {
      tmp = new Dec(_Dec___init__impl__ubet8p(blBigDecParse(lex)));
    } else {
      var tmp0_safe_receiver = toIntOrNull(lex);
      var tmp_0;
      if (tmp0_safe_receiver == null) {
        tmp_0 = null;
      } else {
        // Inline function 'kotlin.let' call
        tmp_0 = _I32___init__impl__i0ber5(tmp0_safe_receiver);
      }
      var tmp1_elvis_lhs = tmp_0;
      var tmp_1;
      var tmp_2 = tmp1_elvis_lhs;
      if ((tmp_2 == null ? null : new I32(tmp_2)) == null) {
        var tmp2_safe_receiver = toLongOrNull(lex);
        var tmp_3;
        if (tmp2_safe_receiver == null) {
          tmp_3 = null;
        } else {
          // Inline function 'kotlin.let' call
          tmp_3 = _I64___init__impl__6ix60e(tmp2_safe_receiver);
        }
        var tmp_4 = tmp_3;
        tmp_1 = tmp_4 == null ? null : new I64(tmp_4);
      } else {
        var tmp_5 = tmp1_elvis_lhs;
        tmp_1 = tmp_5 == null ? null : new I32(tmp_5);
      }
      var tmp3_elvis_lhs = tmp_1;
      tmp = tmp3_elvis_lhs == null ? new IBig(_IBig___init__impl__6dvmei(blBigIntParse(lex))) : tmp3_elvis_lhs;
    }
    return tmp;
  }
  function parseArray($this, lbr) {
    if (match($this, [TokenType_RIGHT_BRACKET_getInstance()])) {
      return new ArrayExpr(emptyList(), lbr);
    }
    var firstExpr = parseExpression($this);
    var tmp;
    if (match($this, [TokenType_FOR_getInstance()])) {
      consume($this, TokenType_EACH_getInstance(), 'Expect EACH after FOR');
      var varTok = consume($this, TokenType_IDENTIFIER_getInstance(), 'Expect loop variable');
      consume($this, TokenType_IN_getInstance(), 'Expect IN after loop variable');
      var iter = parseExpression($this);
      var whereExpr = match($this, [TokenType_WHERE_getInstance()]) ? parseExpression($this) : null;
      consume($this, TokenType_RIGHT_BRACKET_getInstance(), "Expect ']' after array comprehension");
      tmp = new ArrayCompExpr(varTok.i1e_1, iter, firstExpr, whereExpr, lbr);
    } else {
      // Inline function 'kotlin.collections.mutableListOf' call
      // Inline function 'kotlin.apply' call
      var this_0 = ArrayList_init_$Create$();
      this_0.e(firstExpr);
      var elems = this_0;
      while (match($this, [TokenType_COMMA_getInstance()])) {
        // Inline function 'kotlin.collections.plusAssign' call
        var element = parseExpression($this);
        elems.e(element);
      }
      consume($this, TokenType_RIGHT_BRACKET_getInstance(), "Expect ']' after array literal");
      tmp = new ArrayExpr(elems, lbr);
    }
    return tmp;
  }
  function parseObject($this, lbrace) {
    // Inline function 'kotlin.collections.mutableListOf' call
    var fields = ArrayList_init_$Create$();
    if (!check($this, TokenType_RIGHT_BRACE_getInstance())) {
      do {
        if (match($this, [TokenType_LEFT_BRACKET_getInstance()])) {
          var keyExpr = parseExpression($this);
          consume($this, TokenType_RIGHT_BRACKET_getInstance(), "Expect ']' after computed property name");
          consume($this, TokenType_COLON_getInstance(), "Expect ':' after property name");
          var valueExpr = parseExpression($this);
          // Inline function 'kotlin.collections.plusAssign' call
          var element = new ComputedProperty(keyExpr, valueExpr);
          fields.e(element);
        } else {
          var tmp;
          if (match($this, [TokenType_STRING_getInstance()])) {
            tmp = previous($this);
          } else if (match($this, [TokenType_IDENTIFIER_getInstance()])) {
            tmp = previous($this);
          } else if (match($this, [TokenType_NUMBER_getInstance()])) {
            tmp = previous($this);
          } else if (check($this, TokenType_MINUS_getInstance())) {
            advance($this);
            var nTok = consume($this, TokenType_NUMBER_getInstance(), 'Numeric field key must be a non-negative integer');
            error($this, nTok, "Numeric field key must be a non-negative integer, got '-" + nTok.i1e_1 + "'");
          } else {
            error($this, peek($this), 'Expect field key in object literal');
          }
          var keyTok = tmp;
          var tmp_0;
          switch (keyTok.h1e_1.k2_1) {
            case 33:
              tmp_0 = new Name(_Name___init__impl__o4q07e(trim(keyTok.i1e_1, charArrayOf([_Char___init__impl__6a9atx(34)]))));
              break;
            case 32:
              tmp_0 = new Name(_Name___init__impl__o4q07e(keyTok.i1e_1));
              break;
            case 34:
              tmp_0 = parseIntKey($this, keyTok.i1e_1);
              break;
            default:
              error($this, keyTok, 'Invalid object key');
              break;
          }
          var key = tmp_0;
          consume($this, TokenType_COLON_getInstance(), "Expect ':' after field key");
          var valueExpr_0 = parseExpression($this);
          // Inline function 'kotlin.collections.plusAssign' call
          var element_0 = new LiteralProperty(key, valueExpr_0);
          fields.e(element_0);
        }
      }
       while (match($this, [TokenType_COMMA_getInstance()]));
    }
    consume($this, TokenType_RIGHT_BRACE_getInstance(), "Expect '}' after object literal");
    return new ObjectExpr(fields, lbrace);
  }
  function match($this, types) {
    var inductionVariable = 0;
    var last = types.length;
    while (inductionVariable < last) {
      var type = types[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      if (check($this, type)) {
        advance($this);
        return true;
      }
    }
    return false;
  }
  function check($this, type) {
    return peek($this).h1e_1.equals(type);
  }
  function checkNext($this, type) {
    return peekNext($this).h1e_1.equals(type);
  }
  function advance($this) {
    if (!isAtEnd($this)) {
      $this.x1e_1 = $this.x1e_1 + 1 | 0;
    }
    return previous($this);
  }
  function consume($this, type, message) {
    if (check($this, type))
      return advance($this);
    error($this, peek($this), message);
  }
  function error($this, token, message) {
    var line = token.j1e_1;
    var col = token.k1e_1;
    var tmp0_safe_receiver = $this.v1e_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : lines(tmp0_safe_receiver);
    var tmp;
    if (tmp1_elvis_lhs == null) {
      tmp = lines(joinToString($this.w1e_1, '\n', VOID, VOID, VOID, VOID, Parser$error$lambda));
    } else {
      tmp = tmp1_elvis_lhs;
    }
    var lines_0 = tmp;
    var pointer = repeat(' ', coerceAtLeast(col - 1 | 0, 0)) + '^';
    var tmp_0;
    if (!($this.v1e_1 == null)) {
      var before = (line - 2 | 0) >= 0 ? lines_0.o(line - 2 | 0) : null;
      var tmp2_elvis_lhs = getOrNull(lines_0, line - 1 | 0);
      var at = tmp2_elvis_lhs == null ? '' : tmp2_elvis_lhs;
      var tmp3_elvis_lhs = getOrNull(lines_0, line);
      var after = tmp3_elvis_lhs == null ? '' : tmp3_elvis_lhs;
      // Inline function 'kotlin.text.buildString' call
      // Inline function 'kotlin.apply' call
      var this_0 = StringBuilder_init_$Create$();
      // Inline function 'kotlin.text.appendLine' call
      // Inline function 'kotlin.text.appendLine' call
      this_0.w7(message).x7(_Char___init__impl__6a9atx(10));
      if (!(before == null)) {
        // Inline function 'kotlin.text.appendLine' call
        // Inline function 'kotlin.text.appendLine' call
        this_0.w7(before).x7(_Char___init__impl__6a9atx(10));
      }
      // Inline function 'kotlin.text.appendLine' call
      // Inline function 'kotlin.text.appendLine' call
      this_0.w7(at).x7(_Char___init__impl__6a9atx(10));
      // Inline function 'kotlin.text.appendLine' call
      // Inline function 'kotlin.text.appendLine' call
      this_0.w7(pointer).x7(_Char___init__impl__6a9atx(10));
      // Inline function 'kotlin.text.appendLine' call
      // Inline function 'kotlin.text.appendLine' call
      this_0.w7(after).x7(_Char___init__impl__6a9atx(10));
      tmp_0 = this_0.toString();
    } else {
      tmp_0 = pointer;
    }
    var snippet = tmp_0;
    throw new ParseException(message, token, snippet);
  }
  function isAtEnd($this) {
    return peek($this).h1e_1.equals(TokenType_EOF_getInstance());
  }
  function peek($this) {
    return $this.w1e_1.o($this.x1e_1);
  }
  function previous($this) {
    return $this.w1e_1.o($this.x1e_1 - 1 | 0);
  }
  function peekNext($this) {
    return ($this.x1e_1 + 1 | 0) < $this.w1e_1.j() ? $this.w1e_1.o($this.x1e_1 + 1 | 0) : new Token(TokenType_EOF_getInstance(), '', 0, 0);
  }
  function parsePrimaryPostfix$flush(segs, expr, tokenForNode) {
    return segs.p() ? expr._v : new AccessExpr(expr._v, toList(segs), tokenForNode._v);
  }
  function Parser$error$lambda(it) {
    return it.i1e_1;
  }
  function Parser(tokens, source) {
    source = source === VOID ? null : source;
    this.v1e_1 = source;
    this.w1e_1 = tokens;
    this.x1e_1 = 0;
  }
  protoOf(Parser).a1f = function () {
    var version = null;
    // Inline function 'kotlin.collections.mutableListOf' call
    var decls = ArrayList_init_$Create$();
    $l$loop: while (!isAtEnd(this)) {
      if (check(this, TokenType_SOURCE_getInstance())) {
        // Inline function 'kotlin.collections.plusAssign' call
        var element = parseSource(this);
        decls.e(element);
      } else if (check(this, TokenType_TRANSFORM_getInstance())) {
        // Inline function 'kotlin.collections.plusAssign' call
        var element_0 = parseTransform(this);
        decls.e(element_0);
      } else if (check(this, TokenType_OUTPUT_getInstance())) {
        // Inline function 'kotlin.collections.plusAssign' call
        var element_1 = parseOutput(this);
        decls.e(element_1);
      } else if (check(this, TokenType_SHARED_getInstance())) {
        // Inline function 'kotlin.collections.plusAssign' call
        var element_2 = parseShared(this);
        decls.e(element_2);
      } else if (check(this, TokenType_FUNC_getInstance())) {
        // Inline function 'kotlin.collections.plusAssign' call
        var element_3 = parseFunc(this);
        decls.e(element_3);
      } else if (check(this, TokenType_TYPE_getInstance())) {
        // Inline function 'kotlin.collections.plusAssign' call
        var element_4 = parseType(this);
        decls.e(element_4);
      } else if (check(this, TokenType_EOF_getInstance()))
        break $l$loop;
      else {
        error(this, peek(this), 'Unexpected token at top-level');
      }
    }
    consume(this, TokenType_EOF_getInstance(), 'Expect end of file');
    return new Program(version, decls);
  };
  function wrapProgramIfNeeded($this, body) {
    var hasTransformKeyword = Regex_init_$Create$('\\bTRANSFORM\\b', RegexOption_IGNORE_CASE_getInstance()).nb(body);
    if (hasTransformKeyword)
      return body;
    // Inline function 'kotlin.text.trim' call
    var tmp$ret$0 = toString(trim_0(isCharSequence(body) ? body : THROW_CCE()));
    var trimmed = lines(tmp$ret$0);
    var indented = joinToString(trimmed, '\n', VOID, VOID, VOID, VOID, PlaygroundFacade$wrapProgramIfNeeded$lambda);
    return trimIndent('\n            SOURCE msg;\n\n            TRANSFORM Playground { stream } {\n        ' + indented + '\n            }\n        ');
  }
  function parseInput($this, inputJson) {
    if (isBlank(inputJson))
      return emptyMap();
    var element = $this.d1f_1.e13(inputJson);
    var parsed = fromJsonElement($this, element);
    var tmp0_elvis_lhs = (!(parsed == null) ? isInterface(parsed, KtMap) : false) ? parsed : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      var message = 'Input JSON must be an object at the top level.';
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function fromJsonElement($this, element) {
    var tmp;
    if (element instanceof JsonNull) {
      tmp = null;
    } else {
      if (element instanceof JsonPrimitive) {
        tmp = fromPrimitive($this, element);
      } else {
        if (element instanceof JsonObject) {
          // Inline function 'kotlin.apply' call
          var this_0 = LinkedHashMap_init_$Create$();
          // Inline function 'kotlin.collections.iterator' call
          var _iterator__ex2g4s = element.b2().g();
          while (_iterator__ex2g4s.h()) {
            var _destruct__k2r9zo = _iterator__ex2g4s.i();
            // Inline function 'kotlin.collections.component1' call
            var k = _destruct__k2r9zo.u1();
            // Inline function 'kotlin.collections.component2' call
            var v = _destruct__k2r9zo.v1();
            // Inline function 'kotlin.collections.set' call
            var value = fromJsonElement(PlaygroundFacade_getInstance(), v);
            this_0.g2(k, value);
          }
          tmp = this_0;
        } else {
          if (element instanceof JsonArray) {
            // Inline function 'kotlin.apply' call
            var this_1 = ArrayList_init_$Create$_0(element.j());
            // Inline function 'kotlin.collections.forEach' call
            var _iterator__ex2g4s_0 = element.g();
            while (_iterator__ex2g4s_0.h()) {
              var element_0 = _iterator__ex2g4s_0.i();
              this_1.e(fromJsonElement(PlaygroundFacade_getInstance(), element_0));
            }
            tmp = this_1;
          } else {
            noWhenBranchMatchedException();
          }
        }
      }
    }
    return tmp;
  }
  function fromPrimitive($this, primitive) {
    var tmp0_safe_receiver = get_booleanOrNull(primitive);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return tmp0_safe_receiver;
    }
    var tmp1_safe_receiver = get_longOrNull(primitive);
    if (tmp1_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return tmp1_safe_receiver;
    }
    var tmp2_safe_receiver = get_doubleOrNull(primitive);
    if (tmp2_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return tmp2_safe_receiver;
    }
    return primitive.h15();
  }
  function toJsonElement($this, value) {
    var tmp;
    if (value == null) {
      tmp = JsonNull_getInstance();
    } else {
      if (value instanceof JsonElement) {
        tmp = value;
      } else {
        if (!(value == null) ? typeof value === 'string' : false) {
          tmp = JsonPrimitive_0(value);
        } else {
          if (!(value == null) ? typeof value === 'boolean' : false) {
            tmp = JsonPrimitive_2(value);
          } else {
            if (!(value == null) ? typeof value === 'number' : false) {
              tmp = JsonPrimitive_1(value);
            } else {
              if (!(value == null) ? typeof value === 'number' : false) {
                tmp = JsonPrimitive_1(value);
              } else {
                if (!(value == null) ? typeof value === 'number' : false) {
                  tmp = JsonPrimitive_1(value);
                } else {
                  if (value instanceof Long) {
                    tmp = JsonPrimitive_1(value);
                  } else {
                    if (!(value == null) ? typeof value === 'number' : false) {
                      tmp = JsonPrimitive_1(value);
                    } else {
                      if (!(value == null) ? typeof value === 'number' : false) {
                        tmp = JsonPrimitive_1(value);
                      } else {
                        if (value instanceof BLBigInt) {
                          tmp = JsonPrimitive_0(toString(value));
                        } else {
                          if (value instanceof BLBigDec) {
                            tmp = JsonPrimitive_0(toString(value));
                          } else {
                            if (value instanceof I32) {
                              tmp = JsonPrimitive_1(_I32___get_v__impl__4258ps(value.y1e_1));
                            } else {
                              if (value instanceof I64) {
                                tmp = JsonPrimitive_1(_I64___get_v__impl__gpphb3(value.z1e_1));
                              } else {
                                if (value instanceof IBig) {
                                  tmp = JsonPrimitive_0(toString(_IBig___get_v__impl__986dq1(value.g1f_1)));
                                } else {
                                  if (value instanceof Dec) {
                                    tmp = JsonPrimitive_0(toString(_Dec___get_v__impl__aicz3a(value.f1f_1)));
                                  } else {
                                    if (!(value == null) ? isInterface(value, KtMap) : false) {
                                      // Inline function 'kotlin.collections.buildMap' call
                                      // Inline function 'kotlin.collections.buildMapInternal' call
                                      // Inline function 'kotlin.apply' call
                                      var this_0 = LinkedHashMap_init_$Create$();
                                      // Inline function 'kotlin.collections.forEach' call
                                      var _iterator__ex2g4s = value.b2().g();
                                      while (_iterator__ex2g4s.h()) {
                                        var element = _iterator__ex2g4s.i();
                                        // Inline function 'kotlin.collections.component1' call
                                        var k = element.u1();
                                        // Inline function 'kotlin.collections.component2' call
                                        var v = element.v1();
                                        var tmp1_elvis_lhs = k == null ? null : toString(k);
                                        var key = tmp1_elvis_lhs == null ? 'null' : tmp1_elvis_lhs;
                                        this_0.g2(key, toJsonElement(PlaygroundFacade_getInstance(), v));
                                      }
                                      var tmp$ret$7 = this_0.h8();
                                      tmp = new JsonObject(tmp$ret$7);
                                    } else {
                                      if (!(value == null) ? isInterface(value, Iterable) : false) {
                                        // Inline function 'kotlin.collections.map' call
                                        // Inline function 'kotlin.collections.mapTo' call
                                        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(value, 10));
                                        var _iterator__ex2g4s_0 = value.g();
                                        while (_iterator__ex2g4s_0.h()) {
                                          var item = _iterator__ex2g4s_0.i();
                                          var tmp$ret$8 = toJsonElement(PlaygroundFacade_getInstance(), item);
                                          destination.e(tmp$ret$8);
                                        }
                                        tmp = new JsonArray(destination);
                                      } else {
                                        if (!(value == null) ? isArray(value) : false) {
                                          // Inline function 'kotlin.collections.map' call
                                          // Inline function 'kotlin.collections.mapTo' call
                                          var destination_0 = ArrayList_init_$Create$_0(value.length);
                                          var inductionVariable = 0;
                                          var last = value.length;
                                          while (inductionVariable < last) {
                                            var item_0 = value[inductionVariable];
                                            inductionVariable = inductionVariable + 1 | 0;
                                            var tmp$ret$11 = toJsonElement(PlaygroundFacade_getInstance(), item_0);
                                            destination_0.e(tmp$ret$11);
                                          }
                                          tmp = new JsonArray(destination_0);
                                        } else {
                                          if (!(value == null) ? isInterface(value, Sequence) : false) {
                                            tmp = new JsonArray(toList_0(map(value, PlaygroundFacade$toJsonElement$lambda)));
                                          } else {
                                            tmp = JsonPrimitive_0(toString(value));
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return tmp;
  }
  function PlaygroundFacade$prettyJson$lambda($this$Json) {
    $this$Json.y13_1 = true;
    return Unit_instance;
  }
  function PlaygroundFacade$compactJson$lambda($this$Json) {
    return Unit_instance;
  }
  function PlaygroundFacade$debugHostFns$lambda(args) {
    var tmp;
    if (args.j() === 1) {
      var tmp_0 = args.o(0);
      tmp = !(tmp_0 == null) ? typeof tmp_0 === 'string' : false;
    } else {
      tmp = false;
    }
    // Inline function 'kotlin.require' call
    if (!tmp) {
      var message = 'EXPLAIN(varName)';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var tmp_1 = args.o(0);
    var name = (!(tmp_1 == null) ? typeof tmp_1 === 'string' : false) ? tmp_1 : THROW_CCE();
    var tmp0_elvis_lhs = Debug_instance.i1f(name);
    return tmp0_elvis_lhs == null ? mapOf([to('variable', name), to('info', 'Tracing disabled or no provenance recorded')]) : tmp0_elvis_lhs;
  }
  function PlaygroundFacade$wrapProgramIfNeeded$lambda(line) {
    return isBlank(line) ? line : '    ' + line;
  }
  function PlaygroundFacade$toJsonElement$lambda(it) {
    return toJsonElement(PlaygroundFacade_getInstance(), it);
  }
  function PlaygroundFacade() {
    PlaygroundFacade_instance = this;
    this.b1f_1 = 'msg';
    var tmp = this;
    tmp.c1f_1 = Json(VOID, PlaygroundFacade$prettyJson$lambda);
    var tmp_0 = this;
    tmp_0.d1f_1 = Json(VOID, PlaygroundFacade$compactJson$lambda);
    var tmp_1 = this;
    tmp_1.e1f_1 = mapOf_0(to('EXPLAIN', PlaygroundFacade$debugHostFns$lambda));
  }
  protoOf(PlaygroundFacade).j1f = function (program, inputJson, enableTracing) {
    var tmp;
    if (enableTracing) {
      tmp = new CollectingTracer(new TraceOptions(true, VOID, VOID, VOID, false, true));
    } else {
      tmp = null;
    }
    var tracer = tmp;
    var priorTracer = Debug_instance.h1f_1;
    var tmp_0;
    try {
      Debug_instance.h1f_1 = tracer;
      var effectiveProgram = wrapProgramIfNeeded(this, program);
      var tokens = (new Lexer(effectiveProgram)).q1f();
      var parsed = (new Parser(tokens, effectiveProgram)).a1f();
      // Inline function 'kotlin.collections.filterIsInstance' call
      var tmp0 = parsed.s1f_1;
      // Inline function 'kotlin.collections.filterIsInstanceTo' call
      var destination = ArrayList_init_$Create$();
      var _iterator__ex2g4s = tmp0.g();
      while (_iterator__ex2g4s.h()) {
        var element = _iterator__ex2g4s.i();
        if (element instanceof TransformDecl) {
          destination.e(element);
        }
      }
      var transforms = destination;
      // Inline function 'kotlin.collections.find' call
      var tmp$ret$3;
      $l$block: {
        // Inline function 'kotlin.collections.firstOrNull' call
        var _iterator__ex2g4s_0 = transforms.g();
        while (_iterator__ex2g4s_0.h()) {
          var element_0 = _iterator__ex2g4s_0.i();
          if (equals(element_0.t1f_1, 'PLAYGROUND', true)) {
            tmp$ret$3 = element_0;
            break $l$block;
          }
        }
        tmp$ret$3 = null;
      }
      var tmp0_elvis_lhs = tmp$ret$3;
      var tmp1_elvis_lhs = tmp0_elvis_lhs == null ? firstOrNull(transforms) : tmp0_elvis_lhs;
      var tmp_1;
      if (tmp1_elvis_lhs == null) {
        return new PlaygroundResult(false, null, 'Program must declare at least one TRANSFORM block.', null, null, null, null);
      } else {
        tmp_1 = tmp1_elvis_lhs;
      }
      var transform = tmp_1;
      var hostFns = this.e1f_1;
      // Inline function 'kotlin.collections.filterIsInstance' call
      var tmp0_0 = parsed.s1f_1;
      // Inline function 'kotlin.collections.filterIsInstanceTo' call
      var destination_0 = ArrayList_init_$Create$();
      var _iterator__ex2g4s_1 = tmp0_0.g();
      while (_iterator__ex2g4s_1.h()) {
        var element_1 = _iterator__ex2g4s_1.i();
        if (element_1 instanceof FuncDecl) {
          destination_0.e(element_1);
        }
      }
      // Inline function 'kotlin.collections.associateBy' call
      var capacity = coerceAtLeast(mapCapacity(collectionSizeOrDefault(destination_0, 10)), 16);
      // Inline function 'kotlin.collections.associateByTo' call
      var destination_1 = LinkedHashMap_init_$Create$_0(capacity);
      var _iterator__ex2g4s_2 = destination_0.g();
      while (_iterator__ex2g4s_2.h()) {
        var element_2 = _iterator__ex2g4s_2.i();
        var tmp$ret$7 = element_2.y1f_1;
        destination_1.g2(tmp$ret$7, element_2);
      }
      var funcs = destination_1;
      (new SemanticAnalyzer(hostFns.z1())).g1g(parsed);
      var ir = (new ToIR(funcs, hostFns)).k1g(transform.w1f_1.h1g());
      // Inline function 'kotlin.collections.mapNotNull' call
      // Inline function 'kotlin.collections.mapNotNullTo' call
      var destination_2 = ArrayList_init_$Create$();
      // Inline function 'kotlin.collections.forEach' call
      var _iterator__ex2g4s_3 = transforms.g();
      while (_iterator__ex2g4s_3.h()) {
        var element_3 = _iterator__ex2g4s_3.i();
        var tmp0_safe_receiver = element_3.t1f_1;
        var tmp_2;
        if (tmp0_safe_receiver == null) {
          tmp_2 = null;
        } else {
          // Inline function 'kotlin.let' call
          tmp_2 = to(tmp0_safe_receiver, element_3);
        }
        var tmp0_safe_receiver_0 = tmp_2;
        if (tmp0_safe_receiver_0 == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          destination_2.e(tmp0_safe_receiver_0);
        }
      }
      var registry = new TransformRegistry(funcs, hostFns, toMap(destination_2));
      var eval_0 = makeEval(hostFns, funcs, registry, tracer);
      var exec = new Exec(ir, eval_0, tracer);
      var msg = parseInput(this, inputJson);
      // Inline function 'kotlin.apply' call
      var this_0 = HashMap_init_$Create$();
      // Inline function 'kotlin.collections.set' call
      this_0.g2('msg', msg);
      if (isInterface(msg, KtMap)) {
        this_0.i2(isInterface(msg, KtMap) ? msg : THROW_CCE());
      }
      var env = this_0;
      var result = exec.o1g(env, true);
      var jsonElement = toJsonElement(this, result);
      // Inline function 'kotlinx.serialization.json.Json.encodeToString' call
      var this_1 = this.c1f_1;
      // Inline function 'kotlinx.serialization.serializer' call
      var this_2 = this_1.kn();
      // Inline function 'kotlinx.serialization.internal.cast' call
      var this_3 = serializer(this_2, createKType(getKClass(JsonElement), arrayOf([]), false));
      var tmp$ret$23 = isInterface(this_3, KSerializer) ? this_3 : THROW_CCE();
      var output = this_1.c13(tmp$ret$23, jsonElement);
      var tmp_3;
      if (tracer == null) {
        tmp_3 = null;
      } else {
        // Inline function 'kotlin.let' call
        tmp_3 = Debug_instance.p1g(result);
      }
      var explanationMap = tmp_3;
      var tmp_4;
      if (explanationMap == null) {
        tmp_4 = null;
      } else {
        // Inline function 'kotlin.let' call
        var tmp0_1 = PlaygroundFacade_getInstance().c1f_1;
        // Inline function 'kotlinx.serialization.json.Json.encodeToString' call
        var value = toJsonElement(PlaygroundFacade_getInstance(), explanationMap);
        // Inline function 'kotlinx.serialization.serializer' call
        var this_4 = tmp0_1.kn();
        // Inline function 'kotlinx.serialization.internal.cast' call
        var this_5 = serializer(this_4, createKType(getKClass(JsonElement), arrayOf([]), false));
        var tmp$ret$28 = isInterface(this_5, KSerializer) ? this_5 : THROW_CCE();
        tmp_4 = tmp0_1.c13(tmp$ret$28, value);
      }
      var explainJson = tmp_4;
      var tmp_5;
      if (tracer == null) {
        tmp_5 = null;
      } else {
        // Inline function 'kotlin.let' call
        var lines = TraceReport_instance.y1g(tracer).w1g_1;
        // Inline function 'kotlin.text.ifBlank' call
        var this_6 = joinToString(lines, '\n\n');
        var tmp_6;
        if (isBlank(this_6)) {
          tmp_6 = null;
        } else {
          tmp_6 = this_6;
        }
        tmp_5 = tmp_6;
      }
      var explainHuman = tmp_5;
      tmp_0 = new PlaygroundResult(true, output, null, null, null, explainJson, explainHuman);
    } catch ($p) {
      var tmp_7;
      if ($p instanceof ParseException) {
        var ex = $p;
        var tmp5_elvis_lhs = ex.message;
        tmp_7 = new PlaygroundResult(false, null, tmp5_elvis_lhs == null ? 'Parser error' : tmp5_elvis_lhs, ex.l1e_1.j1e_1, ex.l1e_1.k1e_1, null, null);
      } else {
        if ($p instanceof SemanticException) {
          var ex_0 = $p;
          var tmp6_elvis_lhs = ex_0.message;
          tmp_7 = new PlaygroundResult(false, null, tmp6_elvis_lhs == null ? 'Semantic error' : tmp6_elvis_lhs, ex_0.z1g_1.j1e_1, ex_0.z1g_1.k1e_1, null, null);
        } else {
          if ($p instanceof Error) {
            var ex_1 = $p;
            var tmp7_elvis_lhs = ex_1.message;
            tmp_7 = new PlaygroundResult(false, null, tmp7_elvis_lhs == null ? ex_1.toString() : tmp7_elvis_lhs, null, null, null, null);
          } else {
            throw $p;
          }
        }
      }
      tmp_0 = tmp_7;
    }
    finally {
      Debug_instance.h1f_1 = priorTracer;
    }
    return tmp_0;
  };
  protoOf(PlaygroundFacade).run = function (program, inputJson, enableTracing, $super) {
    enableTracing = enableTracing === VOID ? false : enableTracing;
    return $super === VOID ? this.j1f(program, inputJson, enableTracing) : $super.j1f.call(this, program, inputJson, enableTracing);
  };
  var PlaygroundFacade_instance;
  function PlaygroundFacade_getInstance() {
    if (PlaygroundFacade_instance == null)
      new PlaygroundFacade();
    return PlaygroundFacade_instance;
  }
  function PlaygroundResult(success, outputJson, errorMessage, line, column, explainJson, explainHuman) {
    this.success = success;
    this.outputJson = outputJson;
    this.errorMessage = errorMessage;
    this.line = line;
    this.column = column;
    this.explainJson = explainJson;
    this.explainHuman = explainHuman;
  }
  protoOf(PlaygroundResult).a1h = function () {
    return this.success;
  };
  protoOf(PlaygroundResult).b1h = function () {
    return this.outputJson;
  };
  protoOf(PlaygroundResult).c1h = function () {
    return this.errorMessage;
  };
  protoOf(PlaygroundResult).d1h = function () {
    return this.line;
  };
  protoOf(PlaygroundResult).e1h = function () {
    return this.column;
  };
  protoOf(PlaygroundResult).f1h = function () {
    return this.explainJson;
  };
  protoOf(PlaygroundResult).g1h = function () {
    return this.explainHuman;
  };
  protoOf(PlaygroundResult).xd = function () {
    return this.success;
  };
  protoOf(PlaygroundResult).yd = function () {
    return this.outputJson;
  };
  protoOf(PlaygroundResult).h1h = function () {
    return this.errorMessage;
  };
  protoOf(PlaygroundResult).i1h = function () {
    return this.line;
  };
  protoOf(PlaygroundResult).j1h = function () {
    return this.column;
  };
  protoOf(PlaygroundResult).k1h = function () {
    return this.explainJson;
  };
  protoOf(PlaygroundResult).l1h = function () {
    return this.explainHuman;
  };
  protoOf(PlaygroundResult).m1h = function (success, outputJson, errorMessage, line, column, explainJson, explainHuman) {
    return new PlaygroundResult(success, outputJson, errorMessage, line, column, explainJson, explainHuman);
  };
  protoOf(PlaygroundResult).copy = function (success, outputJson, errorMessage, line, column, explainJson, explainHuman, $super) {
    success = success === VOID ? this.success : success;
    outputJson = outputJson === VOID ? this.outputJson : outputJson;
    errorMessage = errorMessage === VOID ? this.errorMessage : errorMessage;
    line = line === VOID ? this.line : line;
    column = column === VOID ? this.column : column;
    explainJson = explainJson === VOID ? this.explainJson : explainJson;
    explainHuman = explainHuman === VOID ? this.explainHuman : explainHuman;
    return $super === VOID ? this.m1h(success, outputJson, errorMessage, line, column, explainJson, explainHuman) : $super.m1h.call(this, success, outputJson, errorMessage, line, column, explainJson, explainHuman);
  };
  protoOf(PlaygroundResult).toString = function () {
    return 'PlaygroundResult(success=' + this.success + ', outputJson=' + this.outputJson + ', errorMessage=' + this.errorMessage + ', line=' + this.line + ', column=' + this.column + ', explainJson=' + this.explainJson + ', explainHuman=' + this.explainHuman + ')';
  };
  protoOf(PlaygroundResult).hashCode = function () {
    var result = getBooleanHashCode(this.success);
    result = imul(result, 31) + (this.outputJson == null ? 0 : getStringHashCode(this.outputJson)) | 0;
    result = imul(result, 31) + (this.errorMessage == null ? 0 : getStringHashCode(this.errorMessage)) | 0;
    result = imul(result, 31) + (this.line == null ? 0 : this.line) | 0;
    result = imul(result, 31) + (this.column == null ? 0 : this.column) | 0;
    result = imul(result, 31) + (this.explainJson == null ? 0 : getStringHashCode(this.explainJson)) | 0;
    result = imul(result, 31) + (this.explainHuman == null ? 0 : getStringHashCode(this.explainHuman)) | 0;
    return result;
  };
  protoOf(PlaygroundResult).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof PlaygroundResult))
      return false;
    var tmp0_other_with_cast = other instanceof PlaygroundResult ? other : THROW_CCE();
    if (!(this.success === tmp0_other_with_cast.success))
      return false;
    if (!(this.outputJson == tmp0_other_with_cast.outputJson))
      return false;
    if (!(this.errorMessage == tmp0_other_with_cast.errorMessage))
      return false;
    if (!(this.line == tmp0_other_with_cast.line))
      return false;
    if (!(this.column == tmp0_other_with_cast.column))
      return false;
    if (!(this.explainJson == tmp0_other_with_cast.explainJson))
      return false;
    if (!(this.explainHuman == tmp0_other_with_cast.explainHuman))
      return false;
    return true;
  };
  function Static(key) {
    this.s1e_1 = key;
  }
  protoOf(Static).toString = function () {
    return 'Static(key=' + toString(this.s1e_1) + ')';
  };
  protoOf(Static).hashCode = function () {
    return hashCode(this.s1e_1);
  };
  protoOf(Static).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Static))
      return false;
    var tmp0_other_with_cast = other instanceof Static ? other : THROW_CCE();
    if (!equals_0(this.s1e_1, tmp0_other_with_cast.s1e_1))
      return false;
    return true;
  };
  function Dynamic(keyExpr) {
    this.n1h_1 = keyExpr;
  }
  protoOf(Dynamic).toString = function () {
    return 'Dynamic(keyExpr=' + toString(this.n1h_1) + ')';
  };
  protoOf(Dynamic).hashCode = function () {
    return hashCode(this.n1h_1);
  };
  protoOf(Dynamic).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Dynamic))
      return false;
    var tmp0_other_with_cast = other instanceof Dynamic ? other : THROW_CCE();
    if (!equals_0(this.n1h_1, tmp0_other_with_cast.n1h_1))
      return false;
    return true;
  };
  function NodeDecl() {
  }
  function Connection() {
  }
  function GraphOutput() {
  }
  function Program(version, decls) {
    this.r1f_1 = version;
    this.s1f_1 = decls;
  }
  protoOf(Program).toString = function () {
    return 'Program(version=' + toString_0(this.r1f_1) + ', decls=' + toString(this.s1f_1) + ')';
  };
  protoOf(Program).hashCode = function () {
    var result = this.r1f_1 == null ? 0 : this.r1f_1.hashCode();
    result = imul(result, 31) + hashCode(this.s1f_1) | 0;
    return result;
  };
  protoOf(Program).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Program))
      return false;
    var tmp0_other_with_cast = other instanceof Program ? other : THROW_CCE();
    if (!equals_0(this.r1f_1, tmp0_other_with_cast.r1f_1))
      return false;
    if (!equals_0(this.s1f_1, tmp0_other_with_cast.s1f_1))
      return false;
    return true;
  };
  function SharedDecl(name, kind, token) {
    this.o1h_1 = name;
    this.p1h_1 = kind;
    this.q1h_1 = token;
  }
  protoOf(SharedDecl).toString = function () {
    return 'SharedDecl(name=' + this.o1h_1 + ', kind=' + this.p1h_1.toString() + ', token=' + this.q1h_1.toString() + ')';
  };
  protoOf(SharedDecl).hashCode = function () {
    var result = getStringHashCode(this.o1h_1);
    result = imul(result, 31) + this.p1h_1.hashCode() | 0;
    result = imul(result, 31) + this.q1h_1.hashCode() | 0;
    return result;
  };
  protoOf(SharedDecl).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SharedDecl))
      return false;
    var tmp0_other_with_cast = other instanceof SharedDecl ? other : THROW_CCE();
    if (!(this.o1h_1 === tmp0_other_with_cast.o1h_1))
      return false;
    if (!this.p1h_1.equals(tmp0_other_with_cast.p1h_1))
      return false;
    if (!this.q1h_1.equals(tmp0_other_with_cast.q1h_1))
      return false;
    return true;
  };
  var SharedKind_SINGLE_instance;
  var SharedKind_MANY_instance;
  var SharedKind_entriesInitialized;
  function SharedKind_initEntries() {
    if (SharedKind_entriesInitialized)
      return Unit_instance;
    SharedKind_entriesInitialized = true;
    SharedKind_SINGLE_instance = new SharedKind('SINGLE', 0);
    SharedKind_MANY_instance = new SharedKind('MANY', 1);
  }
  function SharedKind(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function FuncDecl(name, params, body, token) {
    this.y1f_1 = name;
    this.z1f_1 = params;
    this.a1g_1 = body;
    this.b1g_1 = token;
  }
  protoOf(FuncDecl).toString = function () {
    return 'FuncDecl(name=' + this.y1f_1 + ', params=' + toString(this.z1f_1) + ', body=' + toString(this.a1g_1) + ', token=' + this.b1g_1.toString() + ')';
  };
  protoOf(FuncDecl).hashCode = function () {
    var result = getStringHashCode(this.y1f_1);
    result = imul(result, 31) + hashCode(this.z1f_1) | 0;
    result = imul(result, 31) + hashCode(this.a1g_1) | 0;
    result = imul(result, 31) + this.b1g_1.hashCode() | 0;
    return result;
  };
  protoOf(FuncDecl).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof FuncDecl))
      return false;
    var tmp0_other_with_cast = other instanceof FuncDecl ? other : THROW_CCE();
    if (!(this.y1f_1 === tmp0_other_with_cast.y1f_1))
      return false;
    if (!equals_0(this.z1f_1, tmp0_other_with_cast.z1f_1))
      return false;
    if (!equals_0(this.a1g_1, tmp0_other_with_cast.a1g_1))
      return false;
    if (!this.b1g_1.equals(tmp0_other_with_cast.b1g_1))
      return false;
    return true;
  };
  function ExprBody(expr, token) {
    this.r1h_1 = expr;
    this.s1h_1 = token;
  }
  protoOf(ExprBody).toString = function () {
    return 'ExprBody(expr=' + toString(this.r1h_1) + ', token=' + this.s1h_1.toString() + ')';
  };
  protoOf(ExprBody).hashCode = function () {
    var result = hashCode(this.r1h_1);
    result = imul(result, 31) + this.s1h_1.hashCode() | 0;
    return result;
  };
  protoOf(ExprBody).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ExprBody))
      return false;
    var tmp0_other_with_cast = other instanceof ExprBody ? other : THROW_CCE();
    if (!equals_0(this.r1h_1, tmp0_other_with_cast.r1h_1))
      return false;
    if (!this.s1h_1.equals(tmp0_other_with_cast.s1h_1))
      return false;
    return true;
  };
  function BlockBody(block, token) {
    this.t1h_1 = block;
    this.u1h_1 = token;
  }
  protoOf(BlockBody).toString = function () {
    return 'BlockBody(block=' + this.t1h_1.toString() + ', token=' + this.u1h_1.toString() + ')';
  };
  protoOf(BlockBody).hashCode = function () {
    var result = this.t1h_1.hashCode();
    result = imul(result, 31) + this.u1h_1.hashCode() | 0;
    return result;
  };
  protoOf(BlockBody).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof BlockBody))
      return false;
    var tmp0_other_with_cast = other instanceof BlockBody ? other : THROW_CCE();
    if (!this.t1h_1.equals(tmp0_other_with_cast.t1h_1))
      return false;
    if (!this.u1h_1.equals(tmp0_other_with_cast.u1h_1))
      return false;
    return true;
  };
  function TypeDecl(name, kind, defs, token) {
    this.v1h_1 = name;
    this.w1h_1 = kind;
    this.x1h_1 = defs;
    this.y1h_1 = token;
  }
  protoOf(TypeDecl).toString = function () {
    return 'TypeDecl(name=' + this.v1h_1 + ', kind=' + this.w1h_1.toString() + ', defs=' + toString(this.x1h_1) + ', token=' + this.y1h_1.toString() + ')';
  };
  protoOf(TypeDecl).hashCode = function () {
    var result = getStringHashCode(this.v1h_1);
    result = imul(result, 31) + this.w1h_1.hashCode() | 0;
    result = imul(result, 31) + hashCode(this.x1h_1) | 0;
    result = imul(result, 31) + this.y1h_1.hashCode() | 0;
    return result;
  };
  protoOf(TypeDecl).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TypeDecl))
      return false;
    var tmp0_other_with_cast = other instanceof TypeDecl ? other : THROW_CCE();
    if (!(this.v1h_1 === tmp0_other_with_cast.v1h_1))
      return false;
    if (!this.w1h_1.equals(tmp0_other_with_cast.w1h_1))
      return false;
    if (!equals_0(this.x1h_1, tmp0_other_with_cast.x1h_1))
      return false;
    if (!this.y1h_1.equals(tmp0_other_with_cast.y1h_1))
      return false;
    return true;
  };
  var TypeKind_ENUM_instance;
  var TypeKind_UNION_instance;
  var TypeKind_entriesInitialized;
  function TypeKind_initEntries() {
    if (TypeKind_entriesInitialized)
      return Unit_instance;
    TypeKind_entriesInitialized = true;
    TypeKind_ENUM_instance = new TypeKind('ENUM', 0);
    TypeKind_UNION_instance = new TypeKind('UNION', 1);
  }
  function TypeKind(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function SourceDecl(name, adapter, token) {
    this.z1h_1 = name;
    this.a1i_1 = adapter;
    this.b1i_1 = token;
  }
  protoOf(SourceDecl).toString = function () {
    return 'SourceDecl(name=' + this.z1h_1 + ', adapter=' + toString_0(this.a1i_1) + ', token=' + this.b1i_1.toString() + ')';
  };
  protoOf(SourceDecl).hashCode = function () {
    var result = getStringHashCode(this.z1h_1);
    result = imul(result, 31) + (this.a1i_1 == null ? 0 : this.a1i_1.hashCode()) | 0;
    result = imul(result, 31) + this.b1i_1.hashCode() | 0;
    return result;
  };
  protoOf(SourceDecl).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SourceDecl))
      return false;
    var tmp0_other_with_cast = other instanceof SourceDecl ? other : THROW_CCE();
    if (!(this.z1h_1 === tmp0_other_with_cast.z1h_1))
      return false;
    if (!equals_0(this.a1i_1, tmp0_other_with_cast.a1i_1))
      return false;
    if (!this.b1i_1.equals(tmp0_other_with_cast.b1i_1))
      return false;
    return true;
  };
  function OutputDecl(adapter, template, token) {
    this.c1i_1 = adapter;
    this.d1i_1 = template;
    this.e1i_1 = token;
  }
  protoOf(OutputDecl).toString = function () {
    return 'OutputDecl(adapter=' + toString_0(this.c1i_1) + ', template=' + toString(this.d1i_1) + ', token=' + this.e1i_1.toString() + ')';
  };
  protoOf(OutputDecl).hashCode = function () {
    var result = this.c1i_1 == null ? 0 : this.c1i_1.hashCode();
    result = imul(result, 31) + hashCode(this.d1i_1) | 0;
    result = imul(result, 31) + this.e1i_1.hashCode() | 0;
    return result;
  };
  protoOf(OutputDecl).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof OutputDecl))
      return false;
    var tmp0_other_with_cast = other instanceof OutputDecl ? other : THROW_CCE();
    if (!equals_0(this.c1i_1, tmp0_other_with_cast.c1i_1))
      return false;
    if (!equals_0(this.d1i_1, tmp0_other_with_cast.d1i_1))
      return false;
    if (!this.e1i_1.equals(tmp0_other_with_cast.e1i_1))
      return false;
    return true;
  };
  function TransformDecl(name, params, mode, body, token) {
    this.t1f_1 = name;
    this.u1f_1 = params;
    this.v1f_1 = mode;
    this.w1f_1 = body;
    this.x1f_1 = token;
  }
  protoOf(TransformDecl).toString = function () {
    return 'TransformDecl(name=' + this.t1f_1 + ', params=' + toString(this.u1f_1) + ', mode=' + this.v1f_1.toString() + ', body=' + toString(this.w1f_1) + ', token=' + this.x1f_1.toString() + ')';
  };
  protoOf(TransformDecl).hashCode = function () {
    var result = this.t1f_1 == null ? 0 : getStringHashCode(this.t1f_1);
    result = imul(result, 31) + hashCode(this.u1f_1) | 0;
    result = imul(result, 31) + this.v1f_1.hashCode() | 0;
    result = imul(result, 31) + hashCode(this.w1f_1) | 0;
    result = imul(result, 31) + this.x1f_1.hashCode() | 0;
    return result;
  };
  protoOf(TransformDecl).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TransformDecl))
      return false;
    var tmp0_other_with_cast = other instanceof TransformDecl ? other : THROW_CCE();
    if (!(this.t1f_1 == tmp0_other_with_cast.t1f_1))
      return false;
    if (!equals_0(this.u1f_1, tmp0_other_with_cast.u1f_1))
      return false;
    if (!this.v1f_1.equals(tmp0_other_with_cast.v1f_1))
      return false;
    if (!equals_0(this.w1f_1, tmp0_other_with_cast.w1f_1))
      return false;
    if (!this.x1f_1.equals(tmp0_other_with_cast.x1f_1))
      return false;
    return true;
  };
  var Mode_STREAM_instance;
  var Mode_BUFFER_instance;
  var Mode_entriesInitialized;
  function Mode_initEntries() {
    if (Mode_entriesInitialized)
      return Unit_instance;
    Mode_entriesInitialized = true;
    Mode_STREAM_instance = new Mode('STREAM', 0);
    Mode_BUFFER_instance = new Mode('BUFFER', 1);
  }
  function Mode(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function AdapterSpec(name, args, token) {
    this.f1i_1 = name;
    this.g1i_1 = args;
    this.h1i_1 = token;
  }
  protoOf(AdapterSpec).toString = function () {
    return 'AdapterSpec(name=' + this.f1i_1 + ', args=' + toString(this.g1i_1) + ', token=' + this.h1i_1.toString() + ')';
  };
  protoOf(AdapterSpec).hashCode = function () {
    var result = getStringHashCode(this.f1i_1);
    result = imul(result, 31) + hashCode(this.g1i_1) | 0;
    result = imul(result, 31) + this.h1i_1.hashCode() | 0;
    return result;
  };
  protoOf(AdapterSpec).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof AdapterSpec))
      return false;
    var tmp0_other_with_cast = other instanceof AdapterSpec ? other : THROW_CCE();
    if (!(this.f1i_1 === tmp0_other_with_cast.f1i_1))
      return false;
    if (!equals_0(this.g1i_1, tmp0_other_with_cast.g1i_1))
      return false;
    if (!this.h1i_1.equals(tmp0_other_with_cast.h1i_1))
      return false;
    return true;
  };
  function Property() {
  }
  function LiteralProperty(key, value) {
    Property.call(this);
    this.i1i_1 = key;
    this.j1i_1 = value;
  }
  protoOf(LiteralProperty).toString = function () {
    return 'LiteralProperty(key=' + toString(this.i1i_1) + ', value=' + toString(this.j1i_1) + ')';
  };
  protoOf(LiteralProperty).hashCode = function () {
    var result = hashCode(this.i1i_1);
    result = imul(result, 31) + hashCode(this.j1i_1) | 0;
    return result;
  };
  protoOf(LiteralProperty).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof LiteralProperty))
      return false;
    var tmp0_other_with_cast = other instanceof LiteralProperty ? other : THROW_CCE();
    if (!equals_0(this.i1i_1, tmp0_other_with_cast.i1i_1))
      return false;
    if (!equals_0(this.j1i_1, tmp0_other_with_cast.j1i_1))
      return false;
    return true;
  };
  function ComputedProperty(keyExpr, value) {
    Property.call(this);
    this.k1i_1 = keyExpr;
    this.l1i_1 = value;
  }
  protoOf(ComputedProperty).toString = function () {
    return 'ComputedProperty(keyExpr=' + toString(this.k1i_1) + ', value=' + toString(this.l1i_1) + ')';
  };
  protoOf(ComputedProperty).hashCode = function () {
    var result = hashCode(this.k1i_1);
    result = imul(result, 31) + hashCode(this.l1i_1) | 0;
    return result;
  };
  protoOf(ComputedProperty).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ComputedProperty))
      return false;
    var tmp0_other_with_cast = other instanceof ComputedProperty ? other : THROW_CCE();
    if (!equals_0(this.k1i_1, tmp0_other_with_cast.k1i_1))
      return false;
    if (!equals_0(this.l1i_1, tmp0_other_with_cast.l1i_1))
      return false;
    return true;
  };
  function LetStmt(name, expr, token) {
    this.m1i_1 = name;
    this.n1i_1 = expr;
    this.o1i_1 = token;
  }
  protoOf(LetStmt).toString = function () {
    return 'LetStmt(name=' + this.m1i_1 + ', expr=' + toString(this.n1i_1) + ', token=' + this.o1i_1.toString() + ')';
  };
  protoOf(LetStmt).hashCode = function () {
    var result = getStringHashCode(this.m1i_1);
    result = imul(result, 31) + hashCode(this.n1i_1) | 0;
    result = imul(result, 31) + this.o1i_1.hashCode() | 0;
    return result;
  };
  protoOf(LetStmt).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof LetStmt))
      return false;
    var tmp0_other_with_cast = other instanceof LetStmt ? other : THROW_CCE();
    if (!(this.m1i_1 === tmp0_other_with_cast.m1i_1))
      return false;
    if (!equals_0(this.n1i_1, tmp0_other_with_cast.n1i_1))
      return false;
    if (!this.o1i_1.equals(tmp0_other_with_cast.o1i_1))
      return false;
    return true;
  };
  function SetStmt(target, value, token) {
    this.p1i_1 = target;
    this.q1i_1 = value;
    this.r1i_1 = token;
  }
  protoOf(SetStmt).toString = function () {
    return 'SetStmt(target=' + this.p1i_1.toString() + ', value=' + toString(this.q1i_1) + ', token=' + this.r1i_1.toString() + ')';
  };
  protoOf(SetStmt).hashCode = function () {
    var result = this.p1i_1.hashCode();
    result = imul(result, 31) + hashCode(this.q1i_1) | 0;
    result = imul(result, 31) + this.r1i_1.hashCode() | 0;
    return result;
  };
  protoOf(SetStmt).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SetStmt))
      return false;
    var tmp0_other_with_cast = other instanceof SetStmt ? other : THROW_CCE();
    if (!this.p1i_1.equals(tmp0_other_with_cast.p1i_1))
      return false;
    if (!equals_0(this.q1i_1, tmp0_other_with_cast.q1i_1))
      return false;
    if (!this.r1i_1.equals(tmp0_other_with_cast.r1i_1))
      return false;
    return true;
  };
  function SetVarStmt(name, value, token) {
    this.s1i_1 = name;
    this.t1i_1 = value;
    this.u1i_1 = token;
  }
  protoOf(SetVarStmt).toString = function () {
    return 'SetVarStmt(name=' + this.s1i_1 + ', value=' + toString(this.t1i_1) + ', token=' + this.u1i_1.toString() + ')';
  };
  protoOf(SetVarStmt).hashCode = function () {
    var result = getStringHashCode(this.s1i_1);
    result = imul(result, 31) + hashCode(this.t1i_1) | 0;
    result = imul(result, 31) + this.u1i_1.hashCode() | 0;
    return result;
  };
  protoOf(SetVarStmt).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SetVarStmt))
      return false;
    var tmp0_other_with_cast = other instanceof SetVarStmt ? other : THROW_CCE();
    if (!(this.s1i_1 === tmp0_other_with_cast.s1i_1))
      return false;
    if (!equals_0(this.t1i_1, tmp0_other_with_cast.t1i_1))
      return false;
    if (!this.u1i_1.equals(tmp0_other_with_cast.u1i_1))
      return false;
    return true;
  };
  function AppendToStmt(target, value, init, token) {
    this.v1i_1 = target;
    this.w1i_1 = value;
    this.x1i_1 = init;
    this.y1i_1 = token;
  }
  protoOf(AppendToStmt).toString = function () {
    return 'AppendToStmt(target=' + this.v1i_1.toString() + ', value=' + toString(this.w1i_1) + ', init=' + toString_0(this.x1i_1) + ', token=' + this.y1i_1.toString() + ')';
  };
  protoOf(AppendToStmt).hashCode = function () {
    var result = this.v1i_1.hashCode();
    result = imul(result, 31) + hashCode(this.w1i_1) | 0;
    result = imul(result, 31) + (this.x1i_1 == null ? 0 : hashCode(this.x1i_1)) | 0;
    result = imul(result, 31) + this.y1i_1.hashCode() | 0;
    return result;
  };
  protoOf(AppendToStmt).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof AppendToStmt))
      return false;
    var tmp0_other_with_cast = other instanceof AppendToStmt ? other : THROW_CCE();
    if (!this.v1i_1.equals(tmp0_other_with_cast.v1i_1))
      return false;
    if (!equals_0(this.w1i_1, tmp0_other_with_cast.w1i_1))
      return false;
    if (!equals_0(this.x1i_1, tmp0_other_with_cast.x1i_1))
      return false;
    if (!this.y1i_1.equals(tmp0_other_with_cast.y1i_1))
      return false;
    return true;
  };
  function AppendToVarStmt(name, value, init, token) {
    this.z1i_1 = name;
    this.a1j_1 = value;
    this.b1j_1 = init;
    this.c1j_1 = token;
  }
  protoOf(AppendToVarStmt).toString = function () {
    return 'AppendToVarStmt(name=' + this.z1i_1 + ', value=' + toString(this.a1j_1) + ', init=' + toString_0(this.b1j_1) + ', token=' + this.c1j_1.toString() + ')';
  };
  protoOf(AppendToVarStmt).hashCode = function () {
    var result = getStringHashCode(this.z1i_1);
    result = imul(result, 31) + hashCode(this.a1j_1) | 0;
    result = imul(result, 31) + (this.b1j_1 == null ? 0 : hashCode(this.b1j_1)) | 0;
    result = imul(result, 31) + this.c1j_1.hashCode() | 0;
    return result;
  };
  protoOf(AppendToVarStmt).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof AppendToVarStmt))
      return false;
    var tmp0_other_with_cast = other instanceof AppendToVarStmt ? other : THROW_CCE();
    if (!(this.z1i_1 === tmp0_other_with_cast.z1i_1))
      return false;
    if (!equals_0(this.a1j_1, tmp0_other_with_cast.a1j_1))
      return false;
    if (!equals_0(this.b1j_1, tmp0_other_with_cast.b1j_1))
      return false;
    if (!this.c1j_1.equals(tmp0_other_with_cast.c1j_1))
      return false;
    return true;
  };
  function ModifyStmt(target, updates, token) {
    this.d1j_1 = target;
    this.e1j_1 = updates;
    this.f1j_1 = token;
  }
  protoOf(ModifyStmt).toString = function () {
    return 'ModifyStmt(target=' + this.d1j_1.toString() + ', updates=' + toString(this.e1j_1) + ', token=' + this.f1j_1.toString() + ')';
  };
  protoOf(ModifyStmt).hashCode = function () {
    var result = this.d1j_1.hashCode();
    result = imul(result, 31) + hashCode(this.e1j_1) | 0;
    result = imul(result, 31) + this.f1j_1.hashCode() | 0;
    return result;
  };
  protoOf(ModifyStmt).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ModifyStmt))
      return false;
    var tmp0_other_with_cast = other instanceof ModifyStmt ? other : THROW_CCE();
    if (!this.d1j_1.equals(tmp0_other_with_cast.d1j_1))
      return false;
    if (!equals_0(this.e1j_1, tmp0_other_with_cast.e1j_1))
      return false;
    if (!this.f1j_1.equals(tmp0_other_with_cast.f1j_1))
      return false;
    return true;
  };
  function OutputStmt(template, token) {
    this.g1j_1 = template;
    this.h1j_1 = token;
  }
  protoOf(OutputStmt).toString = function () {
    return 'OutputStmt(template=' + toString(this.g1j_1) + ', token=' + this.h1j_1.toString() + ')';
  };
  protoOf(OutputStmt).hashCode = function () {
    var result = hashCode(this.g1j_1);
    result = imul(result, 31) + this.h1j_1.hashCode() | 0;
    return result;
  };
  protoOf(OutputStmt).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof OutputStmt))
      return false;
    var tmp0_other_with_cast = other instanceof OutputStmt ? other : THROW_CCE();
    if (!equals_0(this.g1j_1, tmp0_other_with_cast.g1j_1))
      return false;
    if (!this.h1j_1.equals(tmp0_other_with_cast.h1j_1))
      return false;
    return true;
  };
  function IfStmt(condition, thenBlock, elseBlock, token) {
    this.i1j_1 = condition;
    this.j1j_1 = thenBlock;
    this.k1j_1 = elseBlock;
    this.l1j_1 = token;
  }
  protoOf(IfStmt).toString = function () {
    return 'IfStmt(condition=' + toString(this.i1j_1) + ', thenBlock=' + this.j1j_1.toString() + ', elseBlock=' + toString_0(this.k1j_1) + ', token=' + this.l1j_1.toString() + ')';
  };
  protoOf(IfStmt).hashCode = function () {
    var result = hashCode(this.i1j_1);
    result = imul(result, 31) + this.j1j_1.hashCode() | 0;
    result = imul(result, 31) + (this.k1j_1 == null ? 0 : this.k1j_1.hashCode()) | 0;
    result = imul(result, 31) + this.l1j_1.hashCode() | 0;
    return result;
  };
  protoOf(IfStmt).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof IfStmt))
      return false;
    var tmp0_other_with_cast = other instanceof IfStmt ? other : THROW_CCE();
    if (!equals_0(this.i1j_1, tmp0_other_with_cast.i1j_1))
      return false;
    if (!this.j1j_1.equals(tmp0_other_with_cast.j1j_1))
      return false;
    if (!equals_0(this.k1j_1, tmp0_other_with_cast.k1j_1))
      return false;
    if (!this.l1j_1.equals(tmp0_other_with_cast.l1j_1))
      return false;
    return true;
  };
  function ForEachStmt(varName, iterable, body, where, token) {
    this.m1j_1 = varName;
    this.n1j_1 = iterable;
    this.o1j_1 = body;
    this.p1j_1 = where;
    this.q1j_1 = token;
  }
  protoOf(ForEachStmt).toString = function () {
    return 'ForEachStmt(varName=' + this.m1j_1 + ', iterable=' + toString(this.n1j_1) + ', body=' + this.o1j_1.toString() + ', where=' + toString_0(this.p1j_1) + ', token=' + this.q1j_1.toString() + ')';
  };
  protoOf(ForEachStmt).hashCode = function () {
    var result = getStringHashCode(this.m1j_1);
    result = imul(result, 31) + hashCode(this.n1j_1) | 0;
    result = imul(result, 31) + this.o1j_1.hashCode() | 0;
    result = imul(result, 31) + (this.p1j_1 == null ? 0 : hashCode(this.p1j_1)) | 0;
    result = imul(result, 31) + this.q1j_1.hashCode() | 0;
    return result;
  };
  protoOf(ForEachStmt).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ForEachStmt))
      return false;
    var tmp0_other_with_cast = other instanceof ForEachStmt ? other : THROW_CCE();
    if (!(this.m1j_1 === tmp0_other_with_cast.m1j_1))
      return false;
    if (!equals_0(this.n1j_1, tmp0_other_with_cast.n1j_1))
      return false;
    if (!this.o1j_1.equals(tmp0_other_with_cast.o1j_1))
      return false;
    if (!equals_0(this.p1j_1, tmp0_other_with_cast.p1j_1))
      return false;
    if (!this.q1j_1.equals(tmp0_other_with_cast.q1j_1))
      return false;
    return true;
  };
  function TryCatchStmt(tryExpr, exceptionName, retry, backoff, fallbackExpr, fallbackAbort, token) {
    this.r1j_1 = tryExpr;
    this.s1j_1 = exceptionName;
    this.t1j_1 = retry;
    this.u1j_1 = backoff;
    this.v1j_1 = fallbackExpr;
    this.w1j_1 = fallbackAbort;
    this.x1j_1 = token;
  }
  protoOf(TryCatchStmt).toString = function () {
    return 'TryCatchStmt(tryExpr=' + toString(this.r1j_1) + ', exceptionName=' + this.s1j_1 + ', retry=' + this.t1j_1 + ', backoff=' + this.u1j_1 + ', fallbackExpr=' + toString_0(this.v1j_1) + ', fallbackAbort=' + toString_0(this.w1j_1) + ', token=' + this.x1j_1.toString() + ')';
  };
  protoOf(TryCatchStmt).hashCode = function () {
    var result = hashCode(this.r1j_1);
    result = imul(result, 31) + getStringHashCode(this.s1j_1) | 0;
    result = imul(result, 31) + (this.t1j_1 == null ? 0 : this.t1j_1) | 0;
    result = imul(result, 31) + (this.u1j_1 == null ? 0 : getStringHashCode(this.u1j_1)) | 0;
    result = imul(result, 31) + (this.v1j_1 == null ? 0 : hashCode(this.v1j_1)) | 0;
    result = imul(result, 31) + (this.w1j_1 == null ? 0 : this.w1j_1.hashCode()) | 0;
    result = imul(result, 31) + this.x1j_1.hashCode() | 0;
    return result;
  };
  protoOf(TryCatchStmt).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TryCatchStmt))
      return false;
    var tmp0_other_with_cast = other instanceof TryCatchStmt ? other : THROW_CCE();
    if (!equals_0(this.r1j_1, tmp0_other_with_cast.r1j_1))
      return false;
    if (!(this.s1j_1 === tmp0_other_with_cast.s1j_1))
      return false;
    if (!(this.t1j_1 == tmp0_other_with_cast.t1j_1))
      return false;
    if (!(this.u1j_1 == tmp0_other_with_cast.u1j_1))
      return false;
    if (!equals_0(this.v1j_1, tmp0_other_with_cast.v1j_1))
      return false;
    if (!equals_0(this.w1j_1, tmp0_other_with_cast.w1j_1))
      return false;
    if (!this.x1j_1.equals(tmp0_other_with_cast.x1j_1))
      return false;
    return true;
  };
  function CodeBlock(statements, token) {
    this.y1j_1 = statements;
    this.z1j_1 = token;
  }
  protoOf(CodeBlock).h1g = function () {
    return this.y1j_1;
  };
  protoOf(CodeBlock).toString = function () {
    return 'CodeBlock(statements=' + toString(this.y1j_1) + ', token=' + this.z1j_1.toString() + ')';
  };
  protoOf(CodeBlock).hashCode = function () {
    var result = hashCode(this.y1j_1);
    result = imul(result, 31) + this.z1j_1.hashCode() | 0;
    return result;
  };
  protoOf(CodeBlock).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof CodeBlock))
      return false;
    var tmp0_other_with_cast = other instanceof CodeBlock ? other : THROW_CCE();
    if (!equals_0(this.y1j_1, tmp0_other_with_cast.y1j_1))
      return false;
    if (!this.z1j_1.equals(tmp0_other_with_cast.z1j_1))
      return false;
    return true;
  };
  function ReturnStmt(value, token) {
    this.a1k_1 = value;
    this.b1k_1 = token;
  }
  protoOf(ReturnStmt).toString = function () {
    return 'ReturnStmt(value=' + toString_0(this.a1k_1) + ', token=' + this.b1k_1.toString() + ')';
  };
  protoOf(ReturnStmt).hashCode = function () {
    var result = this.a1k_1 == null ? 0 : hashCode(this.a1k_1);
    result = imul(result, 31) + this.b1k_1.hashCode() | 0;
    return result;
  };
  protoOf(ReturnStmt).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ReturnStmt))
      return false;
    var tmp0_other_with_cast = other instanceof ReturnStmt ? other : THROW_CCE();
    if (!equals_0(this.a1k_1, tmp0_other_with_cast.a1k_1))
      return false;
    if (!this.b1k_1.equals(tmp0_other_with_cast.b1k_1))
      return false;
    return true;
  };
  function AbortStmt(value, token) {
    this.c1k_1 = value;
    this.d1k_1 = token;
  }
  protoOf(AbortStmt).toString = function () {
    return 'AbortStmt(value=' + toString_0(this.c1k_1) + ', token=' + this.d1k_1.toString() + ')';
  };
  protoOf(AbortStmt).hashCode = function () {
    var result = this.c1k_1 == null ? 0 : hashCode(this.c1k_1);
    result = imul(result, 31) + this.d1k_1.hashCode() | 0;
    return result;
  };
  protoOf(AbortStmt).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof AbortStmt))
      return false;
    var tmp0_other_with_cast = other instanceof AbortStmt ? other : THROW_CCE();
    if (!equals_0(this.c1k_1, tmp0_other_with_cast.c1k_1))
      return false;
    if (!this.d1k_1.equals(tmp0_other_with_cast.d1k_1))
      return false;
    return true;
  };
  function ExprStmt(expr, token) {
    this.e1k_1 = expr;
    this.f1k_1 = token;
  }
  protoOf(ExprStmt).toString = function () {
    return 'ExprStmt(expr=' + toString(this.e1k_1) + ', token=' + this.f1k_1.toString() + ')';
  };
  protoOf(ExprStmt).hashCode = function () {
    var result = hashCode(this.e1k_1);
    result = imul(result, 31) + this.f1k_1.hashCode() | 0;
    return result;
  };
  protoOf(ExprStmt).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ExprStmt))
      return false;
    var tmp0_other_with_cast = other instanceof ExprStmt ? other : THROW_CCE();
    if (!equals_0(this.e1k_1, tmp0_other_with_cast.e1k_1))
      return false;
    if (!this.f1k_1.equals(tmp0_other_with_cast.f1k_1))
      return false;
    return true;
  };
  function IdentifierExpr(name, token) {
    this.n1e_1 = name;
    this.o1e_1 = token;
  }
  protoOf(IdentifierExpr).u1e = function () {
    return this.o1e_1;
  };
  protoOf(IdentifierExpr).toString = function () {
    return 'IdentifierExpr(name=' + this.n1e_1 + ', token=' + this.o1e_1.toString() + ')';
  };
  protoOf(IdentifierExpr).hashCode = function () {
    var result = getStringHashCode(this.n1e_1);
    result = imul(result, 31) + this.o1e_1.hashCode() | 0;
    return result;
  };
  protoOf(IdentifierExpr).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof IdentifierExpr))
      return false;
    var tmp0_other_with_cast = other instanceof IdentifierExpr ? other : THROW_CCE();
    if (!(this.n1e_1 === tmp0_other_with_cast.n1e_1))
      return false;
    if (!this.o1e_1.equals(tmp0_other_with_cast.o1e_1))
      return false;
    return true;
  };
  function StringExpr(value, token) {
    this.g1k_1 = value;
    this.h1k_1 = token;
  }
  protoOf(StringExpr).u1e = function () {
    return this.h1k_1;
  };
  protoOf(StringExpr).toString = function () {
    return 'StringExpr(value=' + this.g1k_1 + ', token=' + this.h1k_1.toString() + ')';
  };
  protoOf(StringExpr).hashCode = function () {
    var result = getStringHashCode(this.g1k_1);
    result = imul(result, 31) + this.h1k_1.hashCode() | 0;
    return result;
  };
  protoOf(StringExpr).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof StringExpr))
      return false;
    var tmp0_other_with_cast = other instanceof StringExpr ? other : THROW_CCE();
    if (!(this.g1k_1 === tmp0_other_with_cast.g1k_1))
      return false;
    if (!this.h1k_1.equals(tmp0_other_with_cast.h1k_1))
      return false;
    return true;
  };
  function AccessExpr(base, segs, token) {
    this.p1e_1 = base;
    this.q1e_1 = segs;
    this.r1e_1 = token;
  }
  protoOf(AccessExpr).u1e = function () {
    return this.r1e_1;
  };
  protoOf(AccessExpr).toString = function () {
    return 'AccessExpr(base=' + toString(this.p1e_1) + ', segs=' + toString(this.q1e_1) + ', token=' + this.r1e_1.toString() + ')';
  };
  protoOf(AccessExpr).hashCode = function () {
    var result = hashCode(this.p1e_1);
    result = imul(result, 31) + hashCode(this.q1e_1) | 0;
    result = imul(result, 31) + this.r1e_1.hashCode() | 0;
    return result;
  };
  protoOf(AccessExpr).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof AccessExpr))
      return false;
    var tmp0_other_with_cast = other instanceof AccessExpr ? other : THROW_CCE();
    if (!equals_0(this.p1e_1, tmp0_other_with_cast.p1e_1))
      return false;
    if (!equals_0(this.q1e_1, tmp0_other_with_cast.q1e_1))
      return false;
    if (!this.r1e_1.equals(tmp0_other_with_cast.r1e_1))
      return false;
    return true;
  };
  function NumberLiteral(value, token) {
    this.i1k_1 = value;
    this.j1k_1 = token;
  }
  protoOf(NumberLiteral).u1e = function () {
    return this.j1k_1;
  };
  protoOf(NumberLiteral).toString = function () {
    return 'NumberLiteral(value=' + toString(this.i1k_1) + ', token=' + this.j1k_1.toString() + ')';
  };
  protoOf(NumberLiteral).hashCode = function () {
    var result = hashCode(this.i1k_1);
    result = imul(result, 31) + this.j1k_1.hashCode() | 0;
    return result;
  };
  protoOf(NumberLiteral).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof NumberLiteral))
      return false;
    var tmp0_other_with_cast = other instanceof NumberLiteral ? other : THROW_CCE();
    if (!equals_0(this.i1k_1, tmp0_other_with_cast.i1k_1))
      return false;
    if (!this.j1k_1.equals(tmp0_other_with_cast.j1k_1))
      return false;
    return true;
  };
  function NullLiteral(token) {
    this.k1k_1 = token;
  }
  protoOf(NullLiteral).u1e = function () {
    return this.k1k_1;
  };
  protoOf(NullLiteral).toString = function () {
    return 'NullLiteral(token=' + this.k1k_1.toString() + ')';
  };
  protoOf(NullLiteral).hashCode = function () {
    return this.k1k_1.hashCode();
  };
  protoOf(NullLiteral).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof NullLiteral))
      return false;
    var tmp0_other_with_cast = other instanceof NullLiteral ? other : THROW_CCE();
    if (!this.k1k_1.equals(tmp0_other_with_cast.k1k_1))
      return false;
    return true;
  };
  function ObjectExpr(fields, token) {
    this.l1k_1 = fields;
    this.m1k_1 = token;
  }
  protoOf(ObjectExpr).u1e = function () {
    return this.m1k_1;
  };
  protoOf(ObjectExpr).toString = function () {
    return 'ObjectExpr(fields=' + toString(this.l1k_1) + ', token=' + this.m1k_1.toString() + ')';
  };
  protoOf(ObjectExpr).hashCode = function () {
    var result = hashCode(this.l1k_1);
    result = imul(result, 31) + this.m1k_1.hashCode() | 0;
    return result;
  };
  protoOf(ObjectExpr).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ObjectExpr))
      return false;
    var tmp0_other_with_cast = other instanceof ObjectExpr ? other : THROW_CCE();
    if (!equals_0(this.l1k_1, tmp0_other_with_cast.l1k_1))
      return false;
    if (!this.m1k_1.equals(tmp0_other_with_cast.m1k_1))
      return false;
    return true;
  };
  function CallExpr(callee, args, token) {
    this.n1k_1 = callee;
    this.o1k_1 = args;
    this.p1k_1 = token;
  }
  protoOf(CallExpr).u1e = function () {
    return this.p1k_1;
  };
  protoOf(CallExpr).toString = function () {
    return 'CallExpr(callee=' + this.n1k_1.toString() + ', args=' + toString(this.o1k_1) + ', token=' + this.p1k_1.toString() + ')';
  };
  protoOf(CallExpr).hashCode = function () {
    var result = this.n1k_1.hashCode();
    result = imul(result, 31) + hashCode(this.o1k_1) | 0;
    result = imul(result, 31) + this.p1k_1.hashCode() | 0;
    return result;
  };
  protoOf(CallExpr).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof CallExpr))
      return false;
    var tmp0_other_with_cast = other instanceof CallExpr ? other : THROW_CCE();
    if (!this.n1k_1.equals(tmp0_other_with_cast.n1k_1))
      return false;
    if (!equals_0(this.o1k_1, tmp0_other_with_cast.o1k_1))
      return false;
    if (!this.p1k_1.equals(tmp0_other_with_cast.p1k_1))
      return false;
    return true;
  };
  function InvokeExpr(target, args, token) {
    this.q1k_1 = target;
    this.r1k_1 = args;
    this.s1k_1 = token;
  }
  protoOf(InvokeExpr).u1e = function () {
    return this.s1k_1;
  };
  protoOf(InvokeExpr).toString = function () {
    return 'InvokeExpr(target=' + toString(this.q1k_1) + ', args=' + toString(this.r1k_1) + ', token=' + this.s1k_1.toString() + ')';
  };
  protoOf(InvokeExpr).hashCode = function () {
    var result = hashCode(this.q1k_1);
    result = imul(result, 31) + hashCode(this.r1k_1) | 0;
    result = imul(result, 31) + this.s1k_1.hashCode() | 0;
    return result;
  };
  protoOf(InvokeExpr).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof InvokeExpr))
      return false;
    var tmp0_other_with_cast = other instanceof InvokeExpr ? other : THROW_CCE();
    if (!equals_0(this.q1k_1, tmp0_other_with_cast.q1k_1))
      return false;
    if (!equals_0(this.r1k_1, tmp0_other_with_cast.r1k_1))
      return false;
    if (!this.s1k_1.equals(tmp0_other_with_cast.s1k_1))
      return false;
    return true;
  };
  function BinaryExpr(left, token, right) {
    this.t1k_1 = left;
    this.u1k_1 = token;
    this.v1k_1 = right;
  }
  protoOf(BinaryExpr).u1e = function () {
    return this.u1k_1;
  };
  protoOf(BinaryExpr).toString = function () {
    return 'BinaryExpr(left=' + toString(this.t1k_1) + ', token=' + this.u1k_1.toString() + ', right=' + toString(this.v1k_1) + ')';
  };
  protoOf(BinaryExpr).hashCode = function () {
    var result = hashCode(this.t1k_1);
    result = imul(result, 31) + this.u1k_1.hashCode() | 0;
    result = imul(result, 31) + hashCode(this.v1k_1) | 0;
    return result;
  };
  protoOf(BinaryExpr).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof BinaryExpr))
      return false;
    var tmp0_other_with_cast = other instanceof BinaryExpr ? other : THROW_CCE();
    if (!equals_0(this.t1k_1, tmp0_other_with_cast.t1k_1))
      return false;
    if (!this.u1k_1.equals(tmp0_other_with_cast.u1k_1))
      return false;
    if (!equals_0(this.v1k_1, tmp0_other_with_cast.v1k_1))
      return false;
    return true;
  };
  function UnaryExpr(expr, token) {
    this.w1k_1 = expr;
    this.x1k_1 = token;
  }
  protoOf(UnaryExpr).u1e = function () {
    return this.x1k_1;
  };
  protoOf(UnaryExpr).toString = function () {
    return 'UnaryExpr(expr=' + toString(this.w1k_1) + ', token=' + this.x1k_1.toString() + ')';
  };
  protoOf(UnaryExpr).hashCode = function () {
    var result = hashCode(this.w1k_1);
    result = imul(result, 31) + this.x1k_1.hashCode() | 0;
    return result;
  };
  protoOf(UnaryExpr).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof UnaryExpr))
      return false;
    var tmp0_other_with_cast = other instanceof UnaryExpr ? other : THROW_CCE();
    if (!equals_0(this.w1k_1, tmp0_other_with_cast.w1k_1))
      return false;
    if (!this.x1k_1.equals(tmp0_other_with_cast.x1k_1))
      return false;
    return true;
  };
  function BoolExpr(value, token) {
    this.y1k_1 = value;
    this.z1k_1 = token;
  }
  protoOf(BoolExpr).u1e = function () {
    return this.z1k_1;
  };
  protoOf(BoolExpr).toString = function () {
    return 'BoolExpr(value=' + this.y1k_1 + ', token=' + this.z1k_1.toString() + ')';
  };
  protoOf(BoolExpr).hashCode = function () {
    var result = getBooleanHashCode(this.y1k_1);
    result = imul(result, 31) + this.z1k_1.hashCode() | 0;
    return result;
  };
  protoOf(BoolExpr).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof BoolExpr))
      return false;
    var tmp0_other_with_cast = other instanceof BoolExpr ? other : THROW_CCE();
    if (!(this.y1k_1 === tmp0_other_with_cast.y1k_1))
      return false;
    if (!this.z1k_1.equals(tmp0_other_with_cast.z1k_1))
      return false;
    return true;
  };
  function LambdaExpr(params, body, token) {
    this.a1l_1 = params;
    this.b1l_1 = body;
    this.c1l_1 = token;
  }
  protoOf(LambdaExpr).u1e = function () {
    return this.c1l_1;
  };
  protoOf(LambdaExpr).toString = function () {
    return 'LambdaExpr(params=' + toString(this.a1l_1) + ', body=' + toString(this.b1l_1) + ', token=' + this.c1l_1.toString() + ')';
  };
  protoOf(LambdaExpr).hashCode = function () {
    var result = hashCode(this.a1l_1);
    result = imul(result, 31) + hashCode(this.b1l_1) | 0;
    result = imul(result, 31) + this.c1l_1.hashCode() | 0;
    return result;
  };
  protoOf(LambdaExpr).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof LambdaExpr))
      return false;
    var tmp0_other_with_cast = other instanceof LambdaExpr ? other : THROW_CCE();
    if (!equals_0(this.a1l_1, tmp0_other_with_cast.a1l_1))
      return false;
    if (!equals_0(this.b1l_1, tmp0_other_with_cast.b1l_1))
      return false;
    if (!this.c1l_1.equals(tmp0_other_with_cast.c1l_1))
      return false;
    return true;
  };
  function ArrayExpr(elements, token) {
    this.d1l_1 = elements;
    this.e1l_1 = token;
  }
  protoOf(ArrayExpr).u1e = function () {
    return this.e1l_1;
  };
  protoOf(ArrayExpr).toString = function () {
    return 'ArrayExpr(elements=' + toString(this.d1l_1) + ', token=' + this.e1l_1.toString() + ')';
  };
  protoOf(ArrayExpr).hashCode = function () {
    var result = hashCode(this.d1l_1);
    result = imul(result, 31) + this.e1l_1.hashCode() | 0;
    return result;
  };
  protoOf(ArrayExpr).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ArrayExpr))
      return false;
    var tmp0_other_with_cast = other instanceof ArrayExpr ? other : THROW_CCE();
    if (!equals_0(this.d1l_1, tmp0_other_with_cast.d1l_1))
      return false;
    if (!this.e1l_1.equals(tmp0_other_with_cast.e1l_1))
      return false;
    return true;
  };
  function ArrayCompExpr(varName, iterable, mapExpr, where, token) {
    this.f1l_1 = varName;
    this.g1l_1 = iterable;
    this.h1l_1 = mapExpr;
    this.i1l_1 = where;
    this.j1l_1 = token;
  }
  protoOf(ArrayCompExpr).u1e = function () {
    return this.j1l_1;
  };
  protoOf(ArrayCompExpr).toString = function () {
    return 'ArrayCompExpr(varName=' + this.f1l_1 + ', iterable=' + toString(this.g1l_1) + ', mapExpr=' + toString(this.h1l_1) + ', where=' + toString_0(this.i1l_1) + ', token=' + this.j1l_1.toString() + ')';
  };
  protoOf(ArrayCompExpr).hashCode = function () {
    var result = getStringHashCode(this.f1l_1);
    result = imul(result, 31) + hashCode(this.g1l_1) | 0;
    result = imul(result, 31) + hashCode(this.h1l_1) | 0;
    result = imul(result, 31) + (this.i1l_1 == null ? 0 : hashCode(this.i1l_1)) | 0;
    result = imul(result, 31) + this.j1l_1.hashCode() | 0;
    return result;
  };
  protoOf(ArrayCompExpr).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ArrayCompExpr))
      return false;
    var tmp0_other_with_cast = other instanceof ArrayCompExpr ? other : THROW_CCE();
    if (!(this.f1l_1 === tmp0_other_with_cast.f1l_1))
      return false;
    if (!equals_0(this.g1l_1, tmp0_other_with_cast.g1l_1))
      return false;
    if (!equals_0(this.h1l_1, tmp0_other_with_cast.h1l_1))
      return false;
    if (!equals_0(this.i1l_1, tmp0_other_with_cast.i1l_1))
      return false;
    if (!this.j1l_1.equals(tmp0_other_with_cast.j1l_1))
      return false;
    return true;
  };
  function IfElseExpr(condition, thenBranch, elseBranch, token) {
    this.k1l_1 = condition;
    this.l1l_1 = thenBranch;
    this.m1l_1 = elseBranch;
    this.n1l_1 = token;
  }
  protoOf(IfElseExpr).u1e = function () {
    return this.n1l_1;
  };
  protoOf(IfElseExpr).toString = function () {
    return 'IfElseExpr(condition=' + toString(this.k1l_1) + ', thenBranch=' + toString(this.l1l_1) + ', elseBranch=' + toString(this.m1l_1) + ', token=' + this.n1l_1.toString() + ')';
  };
  protoOf(IfElseExpr).hashCode = function () {
    var result = hashCode(this.k1l_1);
    result = imul(result, 31) + hashCode(this.l1l_1) | 0;
    result = imul(result, 31) + hashCode(this.m1l_1) | 0;
    result = imul(result, 31) + this.n1l_1.hashCode() | 0;
    return result;
  };
  protoOf(IfElseExpr).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof IfElseExpr))
      return false;
    var tmp0_other_with_cast = other instanceof IfElseExpr ? other : THROW_CCE();
    if (!equals_0(this.k1l_1, tmp0_other_with_cast.k1l_1))
      return false;
    if (!equals_0(this.l1l_1, tmp0_other_with_cast.l1l_1))
      return false;
    if (!equals_0(this.m1l_1, tmp0_other_with_cast.m1l_1))
      return false;
    if (!this.n1l_1.equals(tmp0_other_with_cast.n1l_1))
      return false;
    return true;
  };
  function SharedStateAwaitExpr(resource, key, token) {
    this.o1l_1 = resource;
    this.p1l_1 = key;
    this.q1l_1 = token;
  }
  protoOf(SharedStateAwaitExpr).u1e = function () {
    return this.q1l_1;
  };
  protoOf(SharedStateAwaitExpr).toString = function () {
    return 'SharedStateAwaitExpr(resource=' + this.o1l_1 + ', key=' + this.p1l_1 + ', token=' + this.q1l_1.toString() + ')';
  };
  protoOf(SharedStateAwaitExpr).hashCode = function () {
    var result = getStringHashCode(this.o1l_1);
    result = imul(result, 31) + getStringHashCode(this.p1l_1) | 0;
    result = imul(result, 31) + this.q1l_1.hashCode() | 0;
    return result;
  };
  protoOf(SharedStateAwaitExpr).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SharedStateAwaitExpr))
      return false;
    var tmp0_other_with_cast = other instanceof SharedStateAwaitExpr ? other : THROW_CCE();
    if (!(this.o1l_1 === tmp0_other_with_cast.o1l_1))
      return false;
    if (!(this.p1l_1 === tmp0_other_with_cast.p1l_1))
      return false;
    if (!this.q1l_1.equals(tmp0_other_with_cast.q1l_1))
      return false;
    return true;
  };
  function SharedKind_SINGLE_getInstance() {
    SharedKind_initEntries();
    return SharedKind_SINGLE_instance;
  }
  function SharedKind_MANY_getInstance() {
    SharedKind_initEntries();
    return SharedKind_MANY_instance;
  }
  function TypeKind_ENUM_getInstance() {
    TypeKind_initEntries();
    return TypeKind_ENUM_instance;
  }
  function TypeKind_UNION_getInstance() {
    TypeKind_initEntries();
    return TypeKind_UNION_instance;
  }
  function Mode_STREAM_getInstance() {
    Mode_initEntries();
    return Mode_STREAM_instance;
  }
  function Mode_BUFFER_getInstance() {
    Mode_initEntries();
    return Mode_BUFFER_instance;
  }
  function add($this, type, lexeme, l, c) {
    var tmp0 = $this.o1f_1;
    // Inline function 'kotlin.collections.plusAssign' call
    var element = new Token(type, lexeme, l, c);
    tmp0.e(element);
  }
  function errorToken($this, message, l, c) {
    throw IllegalArgumentException_init_$Create$('[Line ' + l + ', Col ' + c + '] ' + message);
  }
  function advance_0($this) {
    var _unary__edvuaz = $this.l1f_1;
    $this.l1f_1 = _unary__edvuaz + 1 | 0;
    var ch = charCodeAt($this.k1f_1, _unary__edvuaz);
    $this.n1f_1 = $this.n1f_1 + 1 | 0;
    return ch;
  }
  function match_0($this, expected) {
    if (isAtEnd_0($this))
      return false;
    if (!(charCodeAt($this.k1f_1, $this.l1f_1) === expected))
      return false;
    $this.l1f_1 = $this.l1f_1 + 1 | 0;
    $this.n1f_1 = $this.n1f_1 + 1 | 0;
    return true;
  }
  function peek_0($this) {
    return isAtEnd_0($this) ? _Char___init__impl__6a9atx(0) : charCodeAt($this.k1f_1, $this.l1f_1);
  }
  function peekNext_0($this) {
    return ($this.l1f_1 + 1 | 0) >= $this.k1f_1.length ? _Char___init__impl__6a9atx(0) : charCodeAt($this.k1f_1, $this.l1f_1 + 1 | 0);
  }
  function peekPrev($this) {
    return $this.l1f_1 < 2 ? _Char___init__impl__6a9atx(0) : charCodeAt($this.k1f_1, $this.l1f_1 - 2 | 0);
  }
  function isAtEnd_0($this) {
    return $this.l1f_1 >= $this.k1f_1.length;
  }
  function blockComment($this, startLine, startCol) {
    while (!isAtEnd_0($this)) {
      var tmp0_subject = peek_0($this);
      if (tmp0_subject === _Char___init__impl__6a9atx(10)) {
        advance_0($this);
        $this.m1f_1 = $this.m1f_1 + 1 | 0;
        $this.n1f_1 = 1;
      } else if (tmp0_subject === _Char___init__impl__6a9atx(42)) {
        var tmp;
        if (peekNext_0($this) === _Char___init__impl__6a9atx(47)) {
          advance_0($this);
          advance_0($this);
          return Unit_instance;
        } else {
          tmp = advance_0($this);
        }
        new Char(tmp);
      } else
        new Char(advance_0($this));
    }
    errorToken($this, 'Unterminated block comment', startLine, startCol);
  }
  function string($this, startLine, startCol) {
    var sb = StringBuilder_init_$Create$();
    while (!isAtEnd_0($this) && !(peek_0($this) === _Char___init__impl__6a9atx(34))) {
      if (peek_0($this) === _Char___init__impl__6a9atx(10)) {
        errorToken($this, 'Unterminated string', startLine, startCol);
      }
      if (peek_0($this) === _Char___init__impl__6a9atx(92)) {
        advance_0($this);
        sb.x7(_Char___init__impl__6a9atx(92)).x7(advance_0($this));
      } else
        sb.x7(advance_0($this));
    }
    if (isAtEnd_0($this)) {
      errorToken($this, 'Unterminated string', startLine, startCol);
    }
    advance_0($this);
    add($this, TokenType_STRING_getInstance(), '"' + sb.toString() + '"', startLine, startCol);
  }
  function number($this, first, startLine, startCol) {
    var sb = StringBuilder_init_$Create$().x7(first);
    while (!isAtEnd_0($this) && isDigit(peek_0($this))) {
      sb.x7(advance_0($this));
    }
    var tmp;
    if (!isAtEnd_0($this) && peek_0($this) === _Char___init__impl__6a9atx(46)) {
      var tmp0_safe_receiver = getOrNull_0($this.k1f_1, $this.l1f_1 + 1 | 0);
      var tmp_0;
      var tmp_1 = tmp0_safe_receiver;
      if ((tmp_1 == null ? null : new Char(tmp_1)) == null) {
        tmp_0 = null;
      } else {
        tmp_0 = isDigit(tmp0_safe_receiver);
      }
      tmp = tmp_0 === true;
    } else {
      tmp = false;
    }
    if (tmp) {
      sb.x7(advance_0($this));
      while (!isAtEnd_0($this) && isDigit(peek_0($this))) {
        sb.x7(advance_0($this));
      }
    }
    add($this, TokenType_NUMBER_getInstance(), sb.toString(), startLine, startCol);
  }
  function identifier($this, first, startLine, startCol) {
    var sb = StringBuilder_init_$Create$().x7(first);
    while (!isAtEnd_0($this) && isIdentifierPart($this, peek_0($this))) {
      sb.x7(advance_0($this));
    }
    var text = sb.toString();
    // Inline function 'kotlin.text.uppercase' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$1 = text.toUpperCase();
    var tmp0_elvis_lhs = $this.p1f_1.y1(tmp$ret$1);
    var type = tmp0_elvis_lhs == null ? TokenType_IDENTIFIER_getInstance() : tmp0_elvis_lhs;
    add($this, type, text, startLine, startCol);
  }
  function isIdentifierStart($this, _this__u8e3s4) {
    return _this__u8e3s4 === _Char___init__impl__6a9atx(95) || isLetter(_this__u8e3s4);
  }
  function isIdentifierPart($this, _this__u8e3s4) {
    return isIdentifierStart($this, _this__u8e3s4) || isDigit(_this__u8e3s4);
  }
  function Lexer(source) {
    this.k1f_1 = source;
    this.l1f_1 = 0;
    this.m1f_1 = 1;
    this.n1f_1 = 1;
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.o1f_1 = ArrayList_init_$Create$();
    this.p1f_1 = mapOf([to('SOURCE', TokenType_SOURCE_getInstance()), to('OUTPUT', TokenType_OUTPUT_getInstance()), to('USING', TokenType_USING_getInstance()), to('TRANSFORM', TokenType_TRANSFORM_getInstance()), to('STREAM', TokenType_STREAM_getInstance()), to('BUFFER', TokenType_BUFFER_getInstance()), to('FOR', TokenType_FOR_getInstance()), to('EACH', TokenType_EACH_getInstance()), to('IF', TokenType_IF_getInstance()), to('THEN', TokenType_THEN_getInstance()), to('ELSE', TokenType_ELSE_getInstance()), to('AS', TokenType_AS_getInstance()), to('MODIFY', TokenType_MODIFY_getInstance()), to('ENUM', TokenType_ENUM_getInstance()), to('LET', TokenType_LET_getInstance()), to('IN', TokenType_IN_getInstance()), to('AWAIT', TokenType_AWAIT_getInstance()), to('SUSPEND', TokenType_SUSPEND_getInstance()), to('CALL', TokenType_CALL_getInstance()), to('TRUE', TokenType_TRUE_getInstance()), to('FALSE', TokenType_FALSE_getInstance()), to('NULL', TokenType_NULL_getInstance()), to('PARALLEL', TokenType_PARALLEL_getInstance()), to('ONBLOCK', TokenType_ONBLOCK_getInstance()), to('FOREACH', TokenType_FOREACH_getInstance()), to('INPUT', TokenType_INPUT_getInstance()), to('ABORT', TokenType_ABORT_getInstance()), to('THROW', TokenType_THROW_getInstance()), to('TRY', TokenType_TRY_getInstance()), to('CATCH', TokenType_CATCH_getInstance()), to('RETRY', TokenType_RETRY_getInstance()), to('TIMES', TokenType_TIMES_getInstance()), to('BACKOFF', TokenType_BACKOFF_getInstance()), to('SHARED', TokenType_SHARED_getInstance()), to('SINGLE', TokenType_SINGLE_getInstance()), to('MANY', TokenType_MANY_getInstance()), to('FUNC', TokenType_FUNC_getInstance()), to('TYPE', TokenType_TYPE_getInstance()), to('RETURN', TokenType_RETURN_getInstance()), to('UNION', TokenType_UNION_getInstance()), to('WHERE', TokenType_WHERE_getInstance()), to('SET', TokenType_SET_getInstance()), to('APPEND', TokenType_APPEND_getInstance()), to('TO', TokenType_TO_getInstance()), to('INIT', TokenType_INIT_getInstance())]);
  }
  protoOf(Lexer).q1f = function () {
    while (!isAtEnd_0(this)) {
      var startLine = this.m1f_1;
      var startCol = this.n1f_1;
      var c = advance_0(this);
      if (c === _Char___init__impl__6a9atx(36)) {
        add(this, TokenType_DOLLAR_getInstance(), '$', startLine, startCol);
      } else if (c === _Char___init__impl__6a9atx(40)) {
        add(this, TokenType_LEFT_PAREN_getInstance(), '(', startLine, startCol);
      } else if (c === _Char___init__impl__6a9atx(41)) {
        add(this, TokenType_RIGHT_PAREN_getInstance(), ')', startLine, startCol);
      } else if (c === _Char___init__impl__6a9atx(123)) {
        add(this, TokenType_LEFT_BRACE_getInstance(), '{', startLine, startCol);
      } else if (c === _Char___init__impl__6a9atx(125)) {
        add(this, TokenType_RIGHT_BRACE_getInstance(), '}', startLine, startCol);
      } else if (c === _Char___init__impl__6a9atx(91)) {
        add(this, TokenType_LEFT_BRACKET_getInstance(), '[', startLine, startCol);
      } else if (c === _Char___init__impl__6a9atx(93)) {
        add(this, TokenType_RIGHT_BRACKET_getInstance(), ']', startLine, startCol);
      } else if (c === _Char___init__impl__6a9atx(44)) {
        add(this, TokenType_COMMA_getInstance(), ',', startLine, startCol);
      } else if (c === _Char___init__impl__6a9atx(46)) {
        add(this, TokenType_DOT_getInstance(), '.', startLine, startCol);
      } else if (c === _Char___init__impl__6a9atx(59)) {
        add(this, TokenType_SEMICOLON_getInstance(), ';', startLine, startCol);
      } else if (c === _Char___init__impl__6a9atx(58)) {
        add(this, TokenType_COLON_getInstance(), ':', startLine, startCol);
      } else if (c === _Char___init__impl__6a9atx(63))
        if (match_0(this, _Char___init__impl__6a9atx(63))) {
          add(this, TokenType_COALESCE_getInstance(), '??', startLine, startCol);
        } else {
          add(this, TokenType_QUESTION_getInstance(), '?', startLine, startCol);
        }
       else if (c === _Char___init__impl__6a9atx(43)) {
        if (!isAtEnd_0(this) && peek_0(this) === _Char___init__impl__6a9atx(43)) {
          advance_0(this);
          add(this, TokenType_CONCAT_getInstance(), '++', startLine, startCol);
        } else {
          add(this, TokenType_PLUS_getInstance(), '+', startLine, startCol);
        }
      } else if (c === _Char___init__impl__6a9atx(45))
        if (match_0(this, _Char___init__impl__6a9atx(62))) {
          add(this, TokenType_ARROW_getInstance(), '->', startLine, startCol);
        } else {
          add(this, TokenType_MINUS_getInstance(), '-', startLine, startCol);
        }
       else if (c === _Char___init__impl__6a9atx(42)) {
        add(this, TokenType_STAR_getInstance(), '*', startLine, startCol);
      } else if (c === _Char___init__impl__6a9atx(37)) {
        add(this, TokenType_PERCENT_getInstance(), '%', startLine, startCol);
      } else if (c === _Char___init__impl__6a9atx(33)) {
        add(this, match_0(this, _Char___init__impl__6a9atx(61)) ? TokenType_NEQ_getInstance() : TokenType_BANG_getInstance(), peekPrev(this) === _Char___init__impl__6a9atx(33) ? '!=' : '!', startLine, startCol);
      } else if (c === _Char___init__impl__6a9atx(61)) {
        add(this, match_0(this, _Char___init__impl__6a9atx(61)) ? TokenType_EQ_getInstance() : TokenType_ASSIGN_getInstance(), peekPrev(this) === _Char___init__impl__6a9atx(61) ? '==' : '=', startLine, startCol);
      } else if (c === _Char___init__impl__6a9atx(60)) {
        add(this, match_0(this, _Char___init__impl__6a9atx(61)) ? TokenType_LE_getInstance() : TokenType_LT_getInstance(), peekPrev(this) === _Char___init__impl__6a9atx(61) ? '<=' : '<', startLine, startCol);
      } else if (c === _Char___init__impl__6a9atx(62)) {
        add(this, match_0(this, _Char___init__impl__6a9atx(61)) ? TokenType_GE_getInstance() : TokenType_GT_getInstance(), peekPrev(this) === _Char___init__impl__6a9atx(61) ? '>=' : '>', startLine, startCol);
      } else if (c === _Char___init__impl__6a9atx(38))
        if (match_0(this, _Char___init__impl__6a9atx(38))) {
          add(this, TokenType_AND_getInstance(), '&&', startLine, startCol);
        } else {
          errorToken(this, "Unexpected '&'", startLine, startCol);
        }
       else if (c === _Char___init__impl__6a9atx(124)) {
        if (peek_0(this) === _Char___init__impl__6a9atx(124)) {
          advance_0(this);
          add(this, TokenType_OR_getInstance(), '||', startLine, startCol);
        } else {
          add(this, TokenType_PIPE_getInstance(), '|', startLine, startCol);
        }
      } else if (c === _Char___init__impl__6a9atx(47))
        if (match_0(this, _Char___init__impl__6a9atx(47)))
          while (!isAtEnd_0(this) && !(peek_0(this) === _Char___init__impl__6a9atx(10))) {
            advance_0(this);
          }
         else if (match_0(this, _Char___init__impl__6a9atx(42))) {
          blockComment(this, startLine, startCol);
        } else {
          add(this, TokenType_SLASH_getInstance(), '/', startLine, startCol);
        }
       else if (c === _Char___init__impl__6a9atx(34)) {
        string(this, startLine, startCol);
      } else if (c === _Char___init__impl__6a9atx(10)) {
        this.m1f_1 = this.m1f_1 + 1 | 0;
        this.n1f_1 = 1;
      } else if (c !== _Char___init__impl__6a9atx(32) && (c !== _Char___init__impl__6a9atx(13) && c !== _Char___init__impl__6a9atx(9))) {
        if (isDigit(c)) {
          number(this, c, startLine, startCol);
        } else if (isIdentifierStart(this, c)) {
          identifier(this, c, startLine, startCol);
        } else {
          errorToken(this, "Unexpected character '" + toString_1(c) + "'", startLine, startCol);
        }
      }
    }
    add(this, TokenType_EOF_getInstance(), '', this.m1f_1, this.n1f_1);
    return this.o1f_1;
  };
  function Token(type, lexeme, line, column) {
    this.h1e_1 = type;
    this.i1e_1 = lexeme;
    this.j1e_1 = line;
    this.k1e_1 = column;
  }
  protoOf(Token).toString = function () {
    return 'Token(type=' + this.h1e_1.toString() + ', lexeme=' + this.i1e_1 + ', line=' + this.j1e_1 + ', column=' + this.k1e_1 + ')';
  };
  protoOf(Token).hashCode = function () {
    var result = this.h1e_1.hashCode();
    result = imul(result, 31) + getStringHashCode(this.i1e_1) | 0;
    result = imul(result, 31) + this.j1e_1 | 0;
    result = imul(result, 31) + this.k1e_1 | 0;
    return result;
  };
  protoOf(Token).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Token))
      return false;
    var tmp0_other_with_cast = other instanceof Token ? other : THROW_CCE();
    if (!this.h1e_1.equals(tmp0_other_with_cast.h1e_1))
      return false;
    if (!(this.i1e_1 === tmp0_other_with_cast.i1e_1))
      return false;
    if (!(this.j1e_1 === tmp0_other_with_cast.j1e_1))
      return false;
    if (!(this.k1e_1 === tmp0_other_with_cast.k1e_1))
      return false;
    return true;
  };
  var TokenType_LEFT_PAREN_instance;
  var TokenType_RIGHT_PAREN_instance;
  var TokenType_LEFT_BRACE_instance;
  var TokenType_RIGHT_BRACE_instance;
  var TokenType_LEFT_BRACKET_instance;
  var TokenType_RIGHT_BRACKET_instance;
  var TokenType_COMMA_instance;
  var TokenType_DOT_instance;
  var TokenType_SEMICOLON_instance;
  var TokenType_COLON_instance;
  var TokenType_QUESTION_instance;
  var TokenType_PLUS_instance;
  var TokenType_MINUS_instance;
  var TokenType_STAR_instance;
  var TokenType_SLASH_instance;
  var TokenType_PERCENT_instance;
  var TokenType_LT_instance;
  var TokenType_GT_instance;
  var TokenType_ASSIGN_instance;
  var TokenType_BANG_instance;
  var TokenType_SET_instance;
  var TokenType_APPEND_instance;
  var TokenType_TO_instance;
  var TokenType_INIT_instance;
  var TokenType_LE_instance;
  var TokenType_GE_instance;
  var TokenType_EQ_instance;
  var TokenType_NEQ_instance;
  var TokenType_ARROW_instance;
  var TokenType_AND_instance;
  var TokenType_OR_instance;
  var TokenType_COALESCE_instance;
  var TokenType_IDENTIFIER_instance;
  var TokenType_STRING_instance;
  var TokenType_NUMBER_instance;
  var TokenType_SOURCE_instance;
  var TokenType_OUTPUT_instance;
  var TokenType_USING_instance;
  var TokenType_TRANSFORM_instance;
  var TokenType_STREAM_instance;
  var TokenType_BUFFER_instance;
  var TokenType_FOR_instance;
  var TokenType_EACH_instance;
  var TokenType_IF_instance;
  var TokenType_THEN_instance;
  var TokenType_ELSE_instance;
  var TokenType_AS_instance;
  var TokenType_ENUM_instance;
  var TokenType_LET_instance;
  var TokenType_IN_instance;
  var TokenType_AWAIT_instance;
  var TokenType_SUSPEND_instance;
  var TokenType_CALL_instance;
  var TokenType_TRUE_instance;
  var TokenType_FALSE_instance;
  var TokenType_NULL_instance;
  var TokenType_PARALLEL_instance;
  var TokenType_ONBLOCK_instance;
  var TokenType_FOREACH_instance;
  var TokenType_INPUT_instance;
  var TokenType_PIPE_instance;
  var TokenType_ABORT_instance;
  var TokenType_THROW_instance;
  var TokenType_TRY_instance;
  var TokenType_CATCH_instance;
  var TokenType_RETRY_instance;
  var TokenType_TIMES_instance;
  var TokenType_BACKOFF_instance;
  var TokenType_SHARED_instance;
  var TokenType_SINGLE_instance;
  var TokenType_MANY_instance;
  var TokenType_FUNC_instance;
  var TokenType_TYPE_instance;
  var TokenType_RETURN_instance;
  var TokenType_UNION_instance;
  var TokenType_DOLLAR_instance;
  var TokenType_MODIFY_instance;
  var TokenType_CONCAT_instance;
  var TokenType_WHERE_instance;
  var TokenType_EOF_instance;
  var TokenType_entriesInitialized;
  function TokenType_initEntries() {
    if (TokenType_entriesInitialized)
      return Unit_instance;
    TokenType_entriesInitialized = true;
    TokenType_LEFT_PAREN_instance = new TokenType('LEFT_PAREN', 0);
    TokenType_RIGHT_PAREN_instance = new TokenType('RIGHT_PAREN', 1);
    TokenType_LEFT_BRACE_instance = new TokenType('LEFT_BRACE', 2);
    TokenType_RIGHT_BRACE_instance = new TokenType('RIGHT_BRACE', 3);
    TokenType_LEFT_BRACKET_instance = new TokenType('LEFT_BRACKET', 4);
    TokenType_RIGHT_BRACKET_instance = new TokenType('RIGHT_BRACKET', 5);
    TokenType_COMMA_instance = new TokenType('COMMA', 6);
    TokenType_DOT_instance = new TokenType('DOT', 7);
    TokenType_SEMICOLON_instance = new TokenType('SEMICOLON', 8);
    TokenType_COLON_instance = new TokenType('COLON', 9);
    TokenType_QUESTION_instance = new TokenType('QUESTION', 10);
    TokenType_PLUS_instance = new TokenType('PLUS', 11);
    TokenType_MINUS_instance = new TokenType('MINUS', 12);
    TokenType_STAR_instance = new TokenType('STAR', 13);
    TokenType_SLASH_instance = new TokenType('SLASH', 14);
    TokenType_PERCENT_instance = new TokenType('PERCENT', 15);
    TokenType_LT_instance = new TokenType('LT', 16);
    TokenType_GT_instance = new TokenType('GT', 17);
    TokenType_ASSIGN_instance = new TokenType('ASSIGN', 18);
    TokenType_BANG_instance = new TokenType('BANG', 19);
    TokenType_SET_instance = new TokenType('SET', 20);
    TokenType_APPEND_instance = new TokenType('APPEND', 21);
    TokenType_TO_instance = new TokenType('TO', 22);
    TokenType_INIT_instance = new TokenType('INIT', 23);
    TokenType_LE_instance = new TokenType('LE', 24);
    TokenType_GE_instance = new TokenType('GE', 25);
    TokenType_EQ_instance = new TokenType('EQ', 26);
    TokenType_NEQ_instance = new TokenType('NEQ', 27);
    TokenType_ARROW_instance = new TokenType('ARROW', 28);
    TokenType_AND_instance = new TokenType('AND', 29);
    TokenType_OR_instance = new TokenType('OR', 30);
    TokenType_COALESCE_instance = new TokenType('COALESCE', 31);
    TokenType_IDENTIFIER_instance = new TokenType('IDENTIFIER', 32);
    TokenType_STRING_instance = new TokenType('STRING', 33);
    TokenType_NUMBER_instance = new TokenType('NUMBER', 34);
    TokenType_SOURCE_instance = new TokenType('SOURCE', 35);
    TokenType_OUTPUT_instance = new TokenType('OUTPUT', 36);
    TokenType_USING_instance = new TokenType('USING', 37);
    TokenType_TRANSFORM_instance = new TokenType('TRANSFORM', 38);
    TokenType_STREAM_instance = new TokenType('STREAM', 39);
    TokenType_BUFFER_instance = new TokenType('BUFFER', 40);
    TokenType_FOR_instance = new TokenType('FOR', 41);
    TokenType_EACH_instance = new TokenType('EACH', 42);
    TokenType_IF_instance = new TokenType('IF', 43);
    TokenType_THEN_instance = new TokenType('THEN', 44);
    TokenType_ELSE_instance = new TokenType('ELSE', 45);
    TokenType_AS_instance = new TokenType('AS', 46);
    TokenType_ENUM_instance = new TokenType('ENUM', 47);
    TokenType_LET_instance = new TokenType('LET', 48);
    TokenType_IN_instance = new TokenType('IN', 49);
    TokenType_AWAIT_instance = new TokenType('AWAIT', 50);
    TokenType_SUSPEND_instance = new TokenType('SUSPEND', 51);
    TokenType_CALL_instance = new TokenType('CALL', 52);
    TokenType_TRUE_instance = new TokenType('TRUE', 53);
    TokenType_FALSE_instance = new TokenType('FALSE', 54);
    TokenType_NULL_instance = new TokenType('NULL', 55);
    TokenType_PARALLEL_instance = new TokenType('PARALLEL', 56);
    TokenType_ONBLOCK_instance = new TokenType('ONBLOCK', 57);
    TokenType_FOREACH_instance = new TokenType('FOREACH', 58);
    TokenType_INPUT_instance = new TokenType('INPUT', 59);
    TokenType_PIPE_instance = new TokenType('PIPE', 60);
    TokenType_ABORT_instance = new TokenType('ABORT', 61);
    TokenType_THROW_instance = new TokenType('THROW', 62);
    TokenType_TRY_instance = new TokenType('TRY', 63);
    TokenType_CATCH_instance = new TokenType('CATCH', 64);
    TokenType_RETRY_instance = new TokenType('RETRY', 65);
    TokenType_TIMES_instance = new TokenType('TIMES', 66);
    TokenType_BACKOFF_instance = new TokenType('BACKOFF', 67);
    TokenType_SHARED_instance = new TokenType('SHARED', 68);
    TokenType_SINGLE_instance = new TokenType('SINGLE', 69);
    TokenType_MANY_instance = new TokenType('MANY', 70);
    TokenType_FUNC_instance = new TokenType('FUNC', 71);
    TokenType_TYPE_instance = new TokenType('TYPE', 72);
    TokenType_RETURN_instance = new TokenType('RETURN', 73);
    TokenType_UNION_instance = new TokenType('UNION', 74);
    TokenType_DOLLAR_instance = new TokenType('DOLLAR', 75);
    TokenType_MODIFY_instance = new TokenType('MODIFY', 76);
    TokenType_CONCAT_instance = new TokenType('CONCAT', 77);
    TokenType_WHERE_instance = new TokenType('WHERE', 78);
    TokenType_EOF_instance = new TokenType('EOF', 79);
  }
  function TokenType(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function TokenType_LEFT_PAREN_getInstance() {
    TokenType_initEntries();
    return TokenType_LEFT_PAREN_instance;
  }
  function TokenType_RIGHT_PAREN_getInstance() {
    TokenType_initEntries();
    return TokenType_RIGHT_PAREN_instance;
  }
  function TokenType_LEFT_BRACE_getInstance() {
    TokenType_initEntries();
    return TokenType_LEFT_BRACE_instance;
  }
  function TokenType_RIGHT_BRACE_getInstance() {
    TokenType_initEntries();
    return TokenType_RIGHT_BRACE_instance;
  }
  function TokenType_LEFT_BRACKET_getInstance() {
    TokenType_initEntries();
    return TokenType_LEFT_BRACKET_instance;
  }
  function TokenType_RIGHT_BRACKET_getInstance() {
    TokenType_initEntries();
    return TokenType_RIGHT_BRACKET_instance;
  }
  function TokenType_COMMA_getInstance() {
    TokenType_initEntries();
    return TokenType_COMMA_instance;
  }
  function TokenType_DOT_getInstance() {
    TokenType_initEntries();
    return TokenType_DOT_instance;
  }
  function TokenType_SEMICOLON_getInstance() {
    TokenType_initEntries();
    return TokenType_SEMICOLON_instance;
  }
  function TokenType_COLON_getInstance() {
    TokenType_initEntries();
    return TokenType_COLON_instance;
  }
  function TokenType_QUESTION_getInstance() {
    TokenType_initEntries();
    return TokenType_QUESTION_instance;
  }
  function TokenType_PLUS_getInstance() {
    TokenType_initEntries();
    return TokenType_PLUS_instance;
  }
  function TokenType_MINUS_getInstance() {
    TokenType_initEntries();
    return TokenType_MINUS_instance;
  }
  function TokenType_STAR_getInstance() {
    TokenType_initEntries();
    return TokenType_STAR_instance;
  }
  function TokenType_SLASH_getInstance() {
    TokenType_initEntries();
    return TokenType_SLASH_instance;
  }
  function TokenType_PERCENT_getInstance() {
    TokenType_initEntries();
    return TokenType_PERCENT_instance;
  }
  function TokenType_LT_getInstance() {
    TokenType_initEntries();
    return TokenType_LT_instance;
  }
  function TokenType_GT_getInstance() {
    TokenType_initEntries();
    return TokenType_GT_instance;
  }
  function TokenType_ASSIGN_getInstance() {
    TokenType_initEntries();
    return TokenType_ASSIGN_instance;
  }
  function TokenType_BANG_getInstance() {
    TokenType_initEntries();
    return TokenType_BANG_instance;
  }
  function TokenType_SET_getInstance() {
    TokenType_initEntries();
    return TokenType_SET_instance;
  }
  function TokenType_APPEND_getInstance() {
    TokenType_initEntries();
    return TokenType_APPEND_instance;
  }
  function TokenType_TO_getInstance() {
    TokenType_initEntries();
    return TokenType_TO_instance;
  }
  function TokenType_INIT_getInstance() {
    TokenType_initEntries();
    return TokenType_INIT_instance;
  }
  function TokenType_LE_getInstance() {
    TokenType_initEntries();
    return TokenType_LE_instance;
  }
  function TokenType_GE_getInstance() {
    TokenType_initEntries();
    return TokenType_GE_instance;
  }
  function TokenType_EQ_getInstance() {
    TokenType_initEntries();
    return TokenType_EQ_instance;
  }
  function TokenType_NEQ_getInstance() {
    TokenType_initEntries();
    return TokenType_NEQ_instance;
  }
  function TokenType_ARROW_getInstance() {
    TokenType_initEntries();
    return TokenType_ARROW_instance;
  }
  function TokenType_AND_getInstance() {
    TokenType_initEntries();
    return TokenType_AND_instance;
  }
  function TokenType_OR_getInstance() {
    TokenType_initEntries();
    return TokenType_OR_instance;
  }
  function TokenType_COALESCE_getInstance() {
    TokenType_initEntries();
    return TokenType_COALESCE_instance;
  }
  function TokenType_IDENTIFIER_getInstance() {
    TokenType_initEntries();
    return TokenType_IDENTIFIER_instance;
  }
  function TokenType_STRING_getInstance() {
    TokenType_initEntries();
    return TokenType_STRING_instance;
  }
  function TokenType_NUMBER_getInstance() {
    TokenType_initEntries();
    return TokenType_NUMBER_instance;
  }
  function TokenType_SOURCE_getInstance() {
    TokenType_initEntries();
    return TokenType_SOURCE_instance;
  }
  function TokenType_OUTPUT_getInstance() {
    TokenType_initEntries();
    return TokenType_OUTPUT_instance;
  }
  function TokenType_USING_getInstance() {
    TokenType_initEntries();
    return TokenType_USING_instance;
  }
  function TokenType_TRANSFORM_getInstance() {
    TokenType_initEntries();
    return TokenType_TRANSFORM_instance;
  }
  function TokenType_STREAM_getInstance() {
    TokenType_initEntries();
    return TokenType_STREAM_instance;
  }
  function TokenType_BUFFER_getInstance() {
    TokenType_initEntries();
    return TokenType_BUFFER_instance;
  }
  function TokenType_FOR_getInstance() {
    TokenType_initEntries();
    return TokenType_FOR_instance;
  }
  function TokenType_EACH_getInstance() {
    TokenType_initEntries();
    return TokenType_EACH_instance;
  }
  function TokenType_IF_getInstance() {
    TokenType_initEntries();
    return TokenType_IF_instance;
  }
  function TokenType_THEN_getInstance() {
    TokenType_initEntries();
    return TokenType_THEN_instance;
  }
  function TokenType_ELSE_getInstance() {
    TokenType_initEntries();
    return TokenType_ELSE_instance;
  }
  function TokenType_AS_getInstance() {
    TokenType_initEntries();
    return TokenType_AS_instance;
  }
  function TokenType_ENUM_getInstance() {
    TokenType_initEntries();
    return TokenType_ENUM_instance;
  }
  function TokenType_LET_getInstance() {
    TokenType_initEntries();
    return TokenType_LET_instance;
  }
  function TokenType_IN_getInstance() {
    TokenType_initEntries();
    return TokenType_IN_instance;
  }
  function TokenType_AWAIT_getInstance() {
    TokenType_initEntries();
    return TokenType_AWAIT_instance;
  }
  function TokenType_SUSPEND_getInstance() {
    TokenType_initEntries();
    return TokenType_SUSPEND_instance;
  }
  function TokenType_CALL_getInstance() {
    TokenType_initEntries();
    return TokenType_CALL_instance;
  }
  function TokenType_TRUE_getInstance() {
    TokenType_initEntries();
    return TokenType_TRUE_instance;
  }
  function TokenType_FALSE_getInstance() {
    TokenType_initEntries();
    return TokenType_FALSE_instance;
  }
  function TokenType_NULL_getInstance() {
    TokenType_initEntries();
    return TokenType_NULL_instance;
  }
  function TokenType_PARALLEL_getInstance() {
    TokenType_initEntries();
    return TokenType_PARALLEL_instance;
  }
  function TokenType_ONBLOCK_getInstance() {
    TokenType_initEntries();
    return TokenType_ONBLOCK_instance;
  }
  function TokenType_FOREACH_getInstance() {
    TokenType_initEntries();
    return TokenType_FOREACH_instance;
  }
  function TokenType_INPUT_getInstance() {
    TokenType_initEntries();
    return TokenType_INPUT_instance;
  }
  function TokenType_PIPE_getInstance() {
    TokenType_initEntries();
    return TokenType_PIPE_instance;
  }
  function TokenType_ABORT_getInstance() {
    TokenType_initEntries();
    return TokenType_ABORT_instance;
  }
  function TokenType_THROW_getInstance() {
    TokenType_initEntries();
    return TokenType_THROW_instance;
  }
  function TokenType_TRY_getInstance() {
    TokenType_initEntries();
    return TokenType_TRY_instance;
  }
  function TokenType_CATCH_getInstance() {
    TokenType_initEntries();
    return TokenType_CATCH_instance;
  }
  function TokenType_RETRY_getInstance() {
    TokenType_initEntries();
    return TokenType_RETRY_instance;
  }
  function TokenType_TIMES_getInstance() {
    TokenType_initEntries();
    return TokenType_TIMES_instance;
  }
  function TokenType_BACKOFF_getInstance() {
    TokenType_initEntries();
    return TokenType_BACKOFF_instance;
  }
  function TokenType_SHARED_getInstance() {
    TokenType_initEntries();
    return TokenType_SHARED_instance;
  }
  function TokenType_SINGLE_getInstance() {
    TokenType_initEntries();
    return TokenType_SINGLE_instance;
  }
  function TokenType_MANY_getInstance() {
    TokenType_initEntries();
    return TokenType_MANY_instance;
  }
  function TokenType_FUNC_getInstance() {
    TokenType_initEntries();
    return TokenType_FUNC_instance;
  }
  function TokenType_TYPE_getInstance() {
    TokenType_initEntries();
    return TokenType_TYPE_instance;
  }
  function TokenType_RETURN_getInstance() {
    TokenType_initEntries();
    return TokenType_RETURN_instance;
  }
  function TokenType_UNION_getInstance() {
    TokenType_initEntries();
    return TokenType_UNION_instance;
  }
  function TokenType_DOLLAR_getInstance() {
    TokenType_initEntries();
    return TokenType_DOLLAR_instance;
  }
  function TokenType_MODIFY_getInstance() {
    TokenType_initEntries();
    return TokenType_MODIFY_instance;
  }
  function TokenType_CONCAT_getInstance() {
    TokenType_initEntries();
    return TokenType_CONCAT_instance;
  }
  function TokenType_WHERE_getInstance() {
    TokenType_initEntries();
    return TokenType_WHERE_instance;
  }
  function TokenType_EOF_getInstance() {
    TokenType_initEntries();
    return TokenType_EOF_instance;
  }
  function _I32___init__impl__i0ber5(v) {
    return v;
  }
  function _I32___get_v__impl__4258ps($this) {
    return $this;
  }
  function I32__toString_impl_fmn2w7($this) {
    return 'I32(v=' + $this + ')';
  }
  function I32__hashCode_impl_xnb2a2($this) {
    return $this;
  }
  function I32__equals_impl_z338di($this, other) {
    if (!(other instanceof I32))
      return false;
    if (!($this === (other instanceof I32 ? other.y1e_1 : THROW_CCE())))
      return false;
    return true;
  }
  function I32(v) {
    this.y1e_1 = v;
  }
  protoOf(I32).toString = function () {
    return I32__toString_impl_fmn2w7(this.y1e_1);
  };
  protoOf(I32).hashCode = function () {
    return I32__hashCode_impl_xnb2a2(this.y1e_1);
  };
  protoOf(I32).equals = function (other) {
    return I32__equals_impl_z338di(this.y1e_1, other);
  };
  function _I64___init__impl__6ix60e(v) {
    return v;
  }
  function _I64___get_v__impl__gpphb3($this) {
    return $this;
  }
  function I64__toString_impl_ymm922($this) {
    return 'I64(v=' + $this.toString() + ')';
  }
  function I64__hashCode_impl_cvgc97($this) {
    return $this.hashCode();
  }
  function I64__equals_impl_m4nmlj($this, other) {
    if (!(other instanceof I64))
      return false;
    var tmp0_other_with_cast = other instanceof I64 ? other.z1e_1 : THROW_CCE();
    if (!$this.equals(tmp0_other_with_cast))
      return false;
    return true;
  }
  function I64(v) {
    this.z1e_1 = v;
  }
  protoOf(I64).toString = function () {
    return I64__toString_impl_ymm922(this.z1e_1);
  };
  protoOf(I64).hashCode = function () {
    return I64__hashCode_impl_cvgc97(this.z1e_1);
  };
  protoOf(I64).equals = function (other) {
    return I64__equals_impl_m4nmlj(this.z1e_1, other);
  };
  function _IBig___init__impl__6dvmei(v) {
    return v;
  }
  function _IBig___get_v__impl__986dq1($this) {
    return $this;
  }
  function IBig__toString_impl_gkc2ja($this) {
    return 'IBig(v=' + toString($this) + ')';
  }
  function IBig__hashCode_impl_wpm2mz($this) {
    return hashCode($this);
  }
  function IBig__equals_impl_32w25z($this, other) {
    if (!(other instanceof IBig))
      return false;
    var tmp0_other_with_cast = other instanceof IBig ? other.g1f_1 : THROW_CCE();
    if (!equals_0($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function IBig(v) {
    this.g1f_1 = v;
  }
  protoOf(IBig).toString = function () {
    return IBig__toString_impl_gkc2ja(this.g1f_1);
  };
  protoOf(IBig).hashCode = function () {
    return IBig__hashCode_impl_wpm2mz(this.g1f_1);
  };
  protoOf(IBig).equals = function (other) {
    return IBig__equals_impl_32w25z(this.g1f_1, other);
  };
  function _Dec___init__impl__ubet8p(v) {
    return v;
  }
  function _Dec___get_v__impl__aicz3a($this) {
    return $this;
  }
  function Dec__toString_impl_96fcip($this) {
    return 'Dec(v=' + toString($this) + ')';
  }
  function Dec__hashCode_impl_uxl9bk($this) {
    return hashCode($this);
  }
  function Dec__equals_impl_96jfv8($this, other) {
    if (!(other instanceof Dec))
      return false;
    var tmp0_other_with_cast = other instanceof Dec ? other.f1f_1 : THROW_CCE();
    if (!equals_0($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function Dec(v) {
    this.f1f_1 = v;
  }
  protoOf(Dec).toString = function () {
    return Dec__toString_impl_96fcip(this.f1f_1);
  };
  protoOf(Dec).hashCode = function () {
    return Dec__hashCode_impl_uxl9bk(this.f1f_1);
  };
  protoOf(Dec).equals = function (other) {
    return Dec__equals_impl_96jfv8(this.f1f_1, other);
  };
  function _Name___init__impl__o4q07e(v) {
    return v;
  }
  function _Name___get_v__impl__vuc4w5($this) {
    return $this;
  }
  function Name__toString_impl_61tomu($this) {
    return 'Name(v=' + $this + ')';
  }
  function Name__hashCode_impl_fpc861($this) {
    return getStringHashCode($this);
  }
  function Name__equals_impl_uazebh($this, other) {
    if (!(other instanceof Name))
      return false;
    if (!($this === (other instanceof Name ? other.t1e_1 : THROW_CCE())))
      return false;
    return true;
  }
  function Name(v) {
    this.t1e_1 = v;
  }
  protoOf(Name).toString = function () {
    return Name__toString_impl_61tomu(this.t1e_1);
  };
  protoOf(Name).hashCode = function () {
    return Name__hashCode_impl_fpc861(this.t1e_1);
  };
  protoOf(Name).equals = function (other) {
    return Name__equals_impl_uazebh(this.t1e_1, other);
  };
  function TraceOptions(step, watch, captureValues, maxEvents, includeEval, includeCalls) {
    step = step === VOID ? false : step;
    watch = watch === VOID ? emptySet() : watch;
    captureValues = captureValues === VOID ? true : captureValues;
    maxEvents = maxEvents === VOID ? 100000 : maxEvents;
    includeEval = includeEval === VOID ? true : includeEval;
    includeCalls = includeCalls === VOID ? true : includeCalls;
    this.r1l_1 = step;
    this.s1l_1 = watch;
    this.t1l_1 = captureValues;
    this.u1l_1 = maxEvents;
    this.v1l_1 = includeEval;
    this.w1l_1 = includeCalls;
  }
  protoOf(TraceOptions).toString = function () {
    return 'TraceOptions(step=' + this.r1l_1 + ', watch=' + toString(this.s1l_1) + ', captureValues=' + this.t1l_1 + ', maxEvents=' + this.u1l_1 + ', includeEval=' + this.v1l_1 + ', includeCalls=' + this.w1l_1 + ')';
  };
  protoOf(TraceOptions).hashCode = function () {
    var result = getBooleanHashCode(this.r1l_1);
    result = imul(result, 31) + hashCode(this.s1l_1) | 0;
    result = imul(result, 31) + getBooleanHashCode(this.t1l_1) | 0;
    result = imul(result, 31) + this.u1l_1 | 0;
    result = imul(result, 31) + getBooleanHashCode(this.v1l_1) | 0;
    result = imul(result, 31) + getBooleanHashCode(this.w1l_1) | 0;
    return result;
  };
  protoOf(TraceOptions).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TraceOptions))
      return false;
    var tmp0_other_with_cast = other instanceof TraceOptions ? other : THROW_CCE();
    if (!(this.r1l_1 === tmp0_other_with_cast.r1l_1))
      return false;
    if (!equals_0(this.s1l_1, tmp0_other_with_cast.s1l_1))
      return false;
    if (!(this.t1l_1 === tmp0_other_with_cast.t1l_1))
      return false;
    if (!(this.u1l_1 === tmp0_other_with_cast.u1l_1))
      return false;
    if (!(this.v1l_1 === tmp0_other_with_cast.v1l_1))
      return false;
    if (!(this.w1l_1 === tmp0_other_with_cast.w1l_1))
      return false;
    return true;
  };
  function CalcStep(kind, name, args, value) {
    this.x1l_1 = kind;
    this.y1l_1 = name;
    this.z1l_1 = args;
    this.a1m_1 = value;
  }
  protoOf(CalcStep).toString = function () {
    return 'CalcStep(kind=' + this.x1l_1 + ', name=' + this.y1l_1 + ', args=' + toString(this.z1l_1) + ', value=' + toString_0(this.a1m_1) + ')';
  };
  protoOf(CalcStep).hashCode = function () {
    var result = getStringHashCode(this.x1l_1);
    result = imul(result, 31) + (this.y1l_1 == null ? 0 : getStringHashCode(this.y1l_1)) | 0;
    result = imul(result, 31) + hashCode(this.z1l_1) | 0;
    result = imul(result, 31) + (this.a1m_1 == null ? 0 : hashCode(this.a1m_1)) | 0;
    return result;
  };
  protoOf(CalcStep).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof CalcStep))
      return false;
    var tmp0_other_with_cast = other instanceof CalcStep ? other : THROW_CCE();
    if (!(this.x1l_1 === tmp0_other_with_cast.x1l_1))
      return false;
    if (!(this.y1l_1 == tmp0_other_with_cast.y1l_1))
      return false;
    if (!equals_0(this.z1l_1, tmp0_other_with_cast.z1l_1))
      return false;
    if (!equals_0(this.a1m_1, tmp0_other_with_cast.a1m_1))
      return false;
    return true;
  };
  function Enter(node) {
    this.b1m_1 = node;
  }
  protoOf(Enter).toString = function () {
    return 'Enter(node=' + toString(this.b1m_1) + ')';
  };
  protoOf(Enter).hashCode = function () {
    return hashCode(this.b1m_1);
  };
  protoOf(Enter).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Enter))
      return false;
    var tmp0_other_with_cast = other instanceof Enter ? other : THROW_CCE();
    if (!equals_0(this.b1m_1, tmp0_other_with_cast.b1m_1))
      return false;
    return true;
  };
  function Exit(node) {
    this.c1m_1 = node;
  }
  protoOf(Exit).toString = function () {
    return 'Exit(node=' + toString(this.c1m_1) + ')';
  };
  protoOf(Exit).hashCode = function () {
    return hashCode(this.c1m_1);
  };
  protoOf(Exit).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Exit))
      return false;
    var tmp0_other_with_cast = other instanceof Exit ? other : THROW_CCE();
    if (!equals_0(this.c1m_1, tmp0_other_with_cast.c1m_1))
      return false;
    return true;
  };
  function Let(name, old, new_0) {
    this.d1m_1 = name;
    this.e1m_1 = old;
    this.f1m_1 = new_0;
  }
  protoOf(Let).toString = function () {
    return 'Let(name=' + this.d1m_1 + ', old=' + toString_0(this.e1m_1) + ', new=' + toString_0(this.f1m_1) + ')';
  };
  protoOf(Let).hashCode = function () {
    var result = getStringHashCode(this.d1m_1);
    result = imul(result, 31) + (this.e1m_1 == null ? 0 : hashCode(this.e1m_1)) | 0;
    result = imul(result, 31) + (this.f1m_1 == null ? 0 : hashCode(this.f1m_1)) | 0;
    return result;
  };
  protoOf(Let).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Let))
      return false;
    var tmp0_other_with_cast = other instanceof Let ? other : THROW_CCE();
    if (!(this.d1m_1 === tmp0_other_with_cast.d1m_1))
      return false;
    if (!equals_0(this.e1m_1, tmp0_other_with_cast.e1m_1))
      return false;
    if (!equals_0(this.f1m_1, tmp0_other_with_cast.f1m_1))
      return false;
    return true;
  };
  function PathWrite(op, root, path, old, new_0) {
    this.g1m_1 = op;
    this.h1m_1 = root;
    this.i1m_1 = path;
    this.j1m_1 = old;
    this.k1m_1 = new_0;
  }
  protoOf(PathWrite).toString = function () {
    return 'PathWrite(op=' + this.g1m_1 + ', root=' + this.h1m_1 + ', path=' + toString(this.i1m_1) + ', old=' + toString_0(this.j1m_1) + ', new=' + toString_0(this.k1m_1) + ')';
  };
  protoOf(PathWrite).hashCode = function () {
    var result = getStringHashCode(this.g1m_1);
    result = imul(result, 31) + getStringHashCode(this.h1m_1) | 0;
    result = imul(result, 31) + hashCode(this.i1m_1) | 0;
    result = imul(result, 31) + (this.j1m_1 == null ? 0 : hashCode(this.j1m_1)) | 0;
    result = imul(result, 31) + (this.k1m_1 == null ? 0 : hashCode(this.k1m_1)) | 0;
    return result;
  };
  protoOf(PathWrite).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof PathWrite))
      return false;
    var tmp0_other_with_cast = other instanceof PathWrite ? other : THROW_CCE();
    if (!(this.g1m_1 === tmp0_other_with_cast.g1m_1))
      return false;
    if (!(this.h1m_1 === tmp0_other_with_cast.h1m_1))
      return false;
    if (!equals_0(this.i1m_1, tmp0_other_with_cast.i1m_1))
      return false;
    if (!equals_0(this.j1m_1, tmp0_other_with_cast.j1m_1))
      return false;
    if (!equals_0(this.k1m_1, tmp0_other_with_cast.k1m_1))
      return false;
    return true;
  };
  function Output() {
  }
  function Call(kind, name, args, site) {
    site = site === VOID ? null : site;
    this.l1m_1 = kind;
    this.m1m_1 = name;
    this.n1m_1 = args;
    this.o1m_1 = site;
  }
  protoOf(Call).toString = function () {
    return 'Call(kind=' + this.l1m_1 + ', name=' + this.m1m_1 + ', args=' + toString(this.n1m_1) + ', site=' + toString_0(this.o1m_1) + ')';
  };
  protoOf(Call).hashCode = function () {
    var result = getStringHashCode(this.l1m_1);
    result = imul(result, 31) + (this.m1m_1 == null ? 0 : getStringHashCode(this.m1m_1)) | 0;
    result = imul(result, 31) + hashCode(this.n1m_1) | 0;
    result = imul(result, 31) + (this.o1m_1 == null ? 0 : this.o1m_1.hashCode()) | 0;
    return result;
  };
  protoOf(Call).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Call))
      return false;
    var tmp0_other_with_cast = other instanceof Call ? other : THROW_CCE();
    if (!(this.l1m_1 === tmp0_other_with_cast.l1m_1))
      return false;
    if (!(this.m1m_1 == tmp0_other_with_cast.m1m_1))
      return false;
    if (!equals_0(this.n1m_1, tmp0_other_with_cast.n1m_1))
      return false;
    if (!equals_0(this.o1m_1, tmp0_other_with_cast.o1m_1))
      return false;
    return true;
  };
  function Return(kind, name, value, site) {
    site = site === VOID ? null : site;
    this.p1m_1 = kind;
    this.q1m_1 = name;
    this.r1m_1 = value;
    this.s1m_1 = site;
  }
  protoOf(Return).toString = function () {
    return 'Return(kind=' + this.p1m_1 + ', name=' + this.q1m_1 + ', value=' + toString_0(this.r1m_1) + ', site=' + toString_0(this.s1m_1) + ')';
  };
  protoOf(Return).hashCode = function () {
    var result = getStringHashCode(this.p1m_1);
    result = imul(result, 31) + (this.q1m_1 == null ? 0 : getStringHashCode(this.q1m_1)) | 0;
    result = imul(result, 31) + (this.r1m_1 == null ? 0 : hashCode(this.r1m_1)) | 0;
    result = imul(result, 31) + (this.s1m_1 == null ? 0 : this.s1m_1.hashCode()) | 0;
    return result;
  };
  protoOf(Return).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Return))
      return false;
    var tmp0_other_with_cast = other instanceof Return ? other : THROW_CCE();
    if (!(this.p1m_1 === tmp0_other_with_cast.p1m_1))
      return false;
    if (!(this.q1m_1 == tmp0_other_with_cast.q1m_1))
      return false;
    if (!equals_0(this.r1m_1, tmp0_other_with_cast.r1m_1))
      return false;
    if (!equals_0(this.s1m_1, tmp0_other_with_cast.s1m_1))
      return false;
    return true;
  };
  function Read(name, value) {
    this.t1m_1 = name;
    this.u1m_1 = value;
  }
  protoOf(Read).toString = function () {
    return 'Read(name=' + this.t1m_1 + ', value=' + toString_0(this.u1m_1) + ')';
  };
  protoOf(Read).hashCode = function () {
    var result = getStringHashCode(this.t1m_1);
    result = imul(result, 31) + (this.u1m_1 == null ? 0 : hashCode(this.u1m_1)) | 0;
    return result;
  };
  protoOf(Read).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Read))
      return false;
    var tmp0_other_with_cast = other instanceof Read ? other : THROW_CCE();
    if (!(this.t1m_1 === tmp0_other_with_cast.t1m_1))
      return false;
    if (!equals_0(this.u1m_1, tmp0_other_with_cast.u1m_1))
      return false;
    return true;
  };
  function EvalEnter(expr, site) {
    site = site === VOID ? null : site;
    this.v1m_1 = expr;
    this.w1m_1 = site;
  }
  protoOf(EvalEnter).toString = function () {
    return 'EvalEnter(expr=' + toString(this.v1m_1) + ', site=' + toString_0(this.w1m_1) + ')';
  };
  protoOf(EvalEnter).hashCode = function () {
    var result = hashCode(this.v1m_1);
    result = imul(result, 31) + (this.w1m_1 == null ? 0 : this.w1m_1.hashCode()) | 0;
    return result;
  };
  protoOf(EvalEnter).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof EvalEnter))
      return false;
    var tmp0_other_with_cast = other instanceof EvalEnter ? other : THROW_CCE();
    if (!equals_0(this.v1m_1, tmp0_other_with_cast.v1m_1))
      return false;
    if (!equals_0(this.w1m_1, tmp0_other_with_cast.w1m_1))
      return false;
    return true;
  };
  function EvalExit(expr, value, site) {
    site = site === VOID ? null : site;
    this.x1m_1 = expr;
    this.y1m_1 = value;
    this.z1m_1 = site;
  }
  protoOf(EvalExit).toString = function () {
    return 'EvalExit(expr=' + toString(this.x1m_1) + ', value=' + toString_0(this.y1m_1) + ', site=' + toString_0(this.z1m_1) + ')';
  };
  protoOf(EvalExit).hashCode = function () {
    var result = hashCode(this.x1m_1);
    result = imul(result, 31) + (this.y1m_1 == null ? 0 : hashCode(this.y1m_1)) | 0;
    result = imul(result, 31) + (this.z1m_1 == null ? 0 : this.z1m_1.hashCode()) | 0;
    return result;
  };
  protoOf(EvalExit).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof EvalExit))
      return false;
    var tmp0_other_with_cast = other instanceof EvalExit ? other : THROW_CCE();
    if (!equals_0(this.x1m_1, tmp0_other_with_cast.x1m_1))
      return false;
    if (!equals_0(this.y1m_1, tmp0_other_with_cast.y1m_1))
      return false;
    if (!equals_0(this.z1m_1, tmp0_other_with_cast.z1m_1))
      return false;
    return true;
  };
  function Error_0(message, throwable) {
    this.a1n_1 = message;
    this.b1n_1 = throwable;
  }
  protoOf(Error_0).toString = function () {
    return 'Error(message=' + this.a1n_1 + ', throwable=' + this.b1n_1.toString() + ')';
  };
  protoOf(Error_0).hashCode = function () {
    var result = getStringHashCode(this.a1n_1);
    result = imul(result, 31) + hashCode(this.b1n_1) | 0;
    return result;
  };
  protoOf(Error_0).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Error_0))
      return false;
    var tmp0_other_with_cast = other instanceof Error_0 ? other : THROW_CCE();
    if (!(this.a1n_1 === tmp0_other_with_cast.a1n_1))
      return false;
    if (!equals_0(this.b1n_1, tmp0_other_with_cast.b1n_1))
      return false;
    return true;
  };
  function Timed(at, event) {
    this.c1n_1 = at;
    this.d1n_1 = event;
  }
  protoOf(Timed).toString = function () {
    return 'Timed(at=' + Duration__toString_impl_8d916b(this.c1n_1) + ', event=' + toString(this.d1n_1) + ')';
  };
  protoOf(Timed).hashCode = function () {
    var result = Duration__hashCode_impl_u4exz6(this.c1n_1);
    result = imul(result, 31) + hashCode(this.d1n_1) | 0;
    return result;
  };
  protoOf(Timed).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Timed))
      return false;
    var tmp0_other_with_cast = other instanceof Timed ? other : THROW_CCE();
    if (!equals_0(this.c1n_1, tmp0_other_with_cast.c1n_1))
      return false;
    if (!equals_0(this.d1n_1, tmp0_other_with_cast.d1n_1))
      return false;
    return true;
  };
  function CaptureFrame(kind, reads, callStack, calc, letName, expr) {
    var tmp;
    if (reads === VOID) {
      // Inline function 'kotlin.collections.mutableListOf' call
      tmp = ArrayList_init_$Create$();
    } else {
      tmp = reads;
    }
    reads = tmp;
    callStack = callStack === VOID ? ArrayDeque_init_$Create$() : callStack;
    var tmp_0;
    if (calc === VOID) {
      // Inline function 'kotlin.collections.mutableListOf' call
      tmp_0 = ArrayList_init_$Create$();
    } else {
      tmp_0 = calc;
    }
    calc = tmp_0;
    letName = letName === VOID ? null : letName;
    expr = expr === VOID ? null : expr;
    this.e1n_1 = kind;
    this.f1n_1 = reads;
    this.g1n_1 = callStack;
    this.h1n_1 = calc;
    this.i1n_1 = letName;
    this.j1n_1 = expr;
  }
  protoOf(CaptureFrame).toString = function () {
    return 'CaptureFrame(kind=' + this.e1n_1 + ', reads=' + toString(this.f1n_1) + ', callStack=' + this.g1n_1.toString() + ', calc=' + toString(this.h1n_1) + ', letName=' + this.i1n_1 + ', expr=' + toString_0(this.j1n_1) + ')';
  };
  protoOf(CaptureFrame).hashCode = function () {
    var result = getStringHashCode(this.e1n_1);
    result = imul(result, 31) + hashCode(this.f1n_1) | 0;
    result = imul(result, 31) + this.g1n_1.hashCode() | 0;
    result = imul(result, 31) + hashCode(this.h1n_1) | 0;
    result = imul(result, 31) + (this.i1n_1 == null ? 0 : getStringHashCode(this.i1n_1)) | 0;
    result = imul(result, 31) + (this.j1n_1 == null ? 0 : hashCode(this.j1n_1)) | 0;
    return result;
  };
  protoOf(CaptureFrame).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof CaptureFrame))
      return false;
    var tmp0_other_with_cast = other instanceof CaptureFrame ? other : THROW_CCE();
    if (!(this.e1n_1 === tmp0_other_with_cast.e1n_1))
      return false;
    if (!equals_0(this.f1n_1, tmp0_other_with_cast.f1n_1))
      return false;
    if (!this.g1n_1.equals(tmp0_other_with_cast.g1n_1))
      return false;
    if (!equals_0(this.h1n_1, tmp0_other_with_cast.h1n_1))
      return false;
    if (!(this.i1n_1 == tmp0_other_with_cast.i1n_1))
      return false;
    if (!equals_0(this.j1n_1, tmp0_other_with_cast.j1n_1))
      return false;
    return true;
  };
  function ProvStep(op, path, inputs, delta, old, new_0, calc, debug, sources) {
    calc = calc === VOID ? emptyList() : calc;
    debug = debug === VOID ? emptyList() : debug;
    sources = sources === VOID ? emptyList() : sources;
    this.k1n_1 = op;
    this.l1n_1 = path;
    this.m1n_1 = inputs;
    this.n1n_1 = delta;
    this.o1n_1 = old;
    this.p1n_1 = new_0;
    this.q1n_1 = calc;
    this.r1n_1 = debug;
    this.s1n_1 = sources;
  }
  protoOf(ProvStep).toString = function () {
    return 'ProvStep(op=' + this.k1n_1 + ', path=' + toString(this.l1n_1) + ', inputs=' + toString(this.m1n_1) + ', delta=' + toString_0(this.n1n_1) + ', old=' + toString_0(this.o1n_1) + ', new=' + toString_0(this.p1n_1) + ', calc=' + toString(this.q1n_1) + ', debug=' + toString(this.r1n_1) + ', sources=' + toString(this.s1n_1) + ')';
  };
  protoOf(ProvStep).hashCode = function () {
    var result = getStringHashCode(this.k1n_1);
    result = imul(result, 31) + hashCode(this.l1n_1) | 0;
    result = imul(result, 31) + hashCode(this.m1n_1) | 0;
    result = imul(result, 31) + (this.n1n_1 == null ? 0 : hashCode(this.n1n_1)) | 0;
    result = imul(result, 31) + (this.o1n_1 == null ? 0 : hashCode(this.o1n_1)) | 0;
    result = imul(result, 31) + (this.p1n_1 == null ? 0 : hashCode(this.p1n_1)) | 0;
    result = imul(result, 31) + hashCode(this.q1n_1) | 0;
    result = imul(result, 31) + hashCode(this.r1n_1) | 0;
    result = imul(result, 31) + hashCode(this.s1n_1) | 0;
    return result;
  };
  protoOf(ProvStep).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ProvStep))
      return false;
    var tmp0_other_with_cast = other instanceof ProvStep ? other : THROW_CCE();
    if (!(this.k1n_1 === tmp0_other_with_cast.k1n_1))
      return false;
    if (!equals_0(this.l1n_1, tmp0_other_with_cast.l1n_1))
      return false;
    if (!equals_0(this.m1n_1, tmp0_other_with_cast.m1n_1))
      return false;
    if (!equals_0(this.n1n_1, tmp0_other_with_cast.n1n_1))
      return false;
    if (!equals_0(this.o1n_1, tmp0_other_with_cast.o1n_1))
      return false;
    if (!equals_0(this.p1n_1, tmp0_other_with_cast.p1n_1))
      return false;
    if (!equals_0(this.q1n_1, tmp0_other_with_cast.q1n_1))
      return false;
    if (!equals_0(this.r1n_1, tmp0_other_with_cast.r1n_1))
      return false;
    if (!equals_0(this.s1n_1, tmp0_other_with_cast.s1n_1))
      return false;
    return true;
  };
  function pushCaptureFor($this, node) {
    var tmp;
    if (node instanceof IRSet) {
      tmp = 'SET';
    } else {
      if (node instanceof IRAppendTo) {
        tmp = 'APPEND';
      } else {
        if (node instanceof IRModify) {
          tmp = 'MODIFY';
        } else {
          return Unit_instance;
        }
      }
    }
    var kind = tmp;
    $this.v1n_1.ed(new CaptureFrame(kind));
  }
  function renderLetDebug($this, expr, directInputs, flattenedInputs, result) {
    if (expr == null)
      return emptyList();
    var valueLookup = LinkedHashMap_init_$Create$();
    var _iterator__ex2g4s = directInputs.g();
    while (_iterator__ex2g4s.h()) {
      var _destruct__k2r9zo = _iterator__ex2g4s.i();
      var k = _destruct__k2r9zo.xd();
      var v = _destruct__k2r9zo.yd();
      // Inline function 'kotlin.collections.set' call
      valueLookup.g2(k, v);
    }
    var _iterator__ex2g4s_0 = flattenedInputs.g();
    while (_iterator__ex2g4s_0.h()) {
      var _destruct__k2r9zo_0 = _iterator__ex2g4s_0.i();
      var k_0 = _destruct__k2r9zo_0.xd();
      var v_0 = _destruct__k2r9zo_0.yd();
      if (!valueLookup.w1(k_0)) {
        // Inline function 'kotlin.collections.set' call
        valueLookup.g2(k_0, v_0);
      }
    }
    var rendered = renderExprForDebug($this, expr, valueLookup);
    var rhs = formatDebugValue($this, result);
    var lines = ArrayList_init_$Create$();
    // Inline function 'kotlin.collections.ifEmpty' call
    var tmp;
    if (directInputs.p()) {
      tmp = flattenedInputs;
    } else {
      tmp = directInputs;
    }
    var direct = tmp;
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!direct.p()) {
      // Inline function 'kotlin.collections.forEach' call
      var _iterator__ex2g4s_1 = direct.g();
      while (_iterator__ex2g4s_1.h()) {
        var element = _iterator__ex2g4s_1.i();
        $l$block: {
          var n = element.xd();
          var v_1 = element.yd();
          var tmp_0;
          var tmp_1;
          if (!(v_1 == null) ? isInterface(v_1, KtMap) : false) {
            tmp_1 = true;
          } else {
            tmp_1 = !(v_1 == null) ? isInterface(v_1, Iterable) : false;
          }
          if (tmp_1) {
            tmp_0 = true;
          } else {
            tmp_0 = !(v_1 == null) ? isArray(v_1) : false;
          }
          if (tmp_0) {
            break $l$block;
          }
          // Inline function 'kotlin.collections.plusAssign' call
          var element_0 = n + ' = ' + formatDebugValue($this, v_1);
          lines.e(element_0);
        }
      }
    }
    // Inline function 'kotlin.text.isNotBlank' call
    if (!isBlank(rendered)) {
      // Inline function 'kotlin.collections.plusAssign' call
      var element_1 = rendered + ' -> ' + rhs;
      lines.e(element_1);
    }
    if (lines.p()) {
      // Inline function 'kotlin.collections.plusAssign' call
      lines.e(rhs);
    }
    return lines;
  }
  function renderOutputDebug($this, name, directInputs, flattenedInputs, result) {
    var rhs = formatDebugValue($this, result);
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var _iterator__ex2g4s = directInputs.g();
      while (_iterator__ex2g4s.h()) {
        var element = _iterator__ex2g4s.i();
        var v = element.yd();
        var tmp;
        if (!(v == null) ? isInterface(v, KtMap) : false) {
          tmp = false;
        } else {
          if (!(v == null) ? isInterface(v, Iterable) : false) {
            tmp = false;
          } else {
            if (!(v == null) ? isArray(v) : false) {
              tmp = false;
            } else {
              tmp = true;
            }
          }
        }
        if (tmp) {
          tmp$ret$1 = element;
          break $l$block;
        }
      }
      tmp$ret$1 = null;
    }
    var preferredDirect = tmp$ret$1;
    var tmp1_elvis_lhs = preferredDirect == null ? null : preferredDirect.vd_1;
    var tmp_0;
    if (tmp1_elvis_lhs == null) {
      var tmp2_safe_receiver = firstOrNull(flattenedInputs);
      tmp_0 = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.vd_1;
    } else {
      tmp_0 = tmp1_elvis_lhs;
    }
    var tmp3_elvis_lhs = tmp_0;
    var tmp_1;
    if (tmp3_elvis_lhs == null) {
      var tmp4_safe_receiver = firstOrNull(directInputs);
      tmp_1 = tmp4_safe_receiver == null ? null : tmp4_safe_receiver.vd_1;
    } else {
      tmp_1 = tmp3_elvis_lhs;
    }
    var tmp5_elvis_lhs = tmp_1;
    var primary = tmp5_elvis_lhs == null ? name : tmp5_elvis_lhs;
    return listOf(primary + ' -> ' + rhs);
  }
  function renderExprForDebug($this, expr, values) {
    var tmp;
    if (expr instanceof NumberLiteral) {
      tmp = expr.j1k_1.i1e_1;
    } else {
      if (expr instanceof StringExpr) {
        tmp = formatDebugValue($this, expr.g1k_1);
      } else {
        if (expr instanceof BoolExpr) {
          tmp = expr.y1k_1.toString();
        } else {
          if (expr instanceof NullLiteral) {
            tmp = 'null';
          } else {
            if (expr instanceof IdentifierExpr) {
              var value = lookupValueForDebug($this, expr.n1e_1, values);
              var tmp_0;
              if (value == null) {
                tmp_0 = null;
              } else {
                // Inline function 'kotlin.let' call
                tmp_0 = formatDebugValue($this, value);
              }
              var tmp2_elvis_lhs = tmp_0;
              tmp = tmp2_elvis_lhs == null ? expr.n1e_1 : tmp2_elvis_lhs;
            } else {
              if (expr instanceof AccessExpr) {
                var path = renderAccessPath($this, expr);
                var tmp_1;
                if (path == null) {
                  tmp_1 = null;
                } else {
                  // Inline function 'kotlin.let' call
                  tmp_1 = lookupValueForDebug($this, path, values);
                }
                var value_0 = tmp_1;
                var tmp_2;
                if (value_0 == null) {
                  tmp_2 = null;
                } else {
                  // Inline function 'kotlin.let' call
                  tmp_2 = formatDebugValue($this, value_0);
                }
                var tmp5_elvis_lhs = tmp_2;
                var tmp6_elvis_lhs = tmp5_elvis_lhs == null ? path : tmp5_elvis_lhs;
                tmp = tmp6_elvis_lhs == null ? '<access>' : tmp6_elvis_lhs;
              } else {
                if (expr instanceof BinaryExpr) {
                  var op = expr.u1k_1.i1e_1;
                  var left = renderExprForDebug($this, expr.t1k_1, values);
                  var right = renderExprForDebug($this, expr.v1k_1, values);
                  tmp = '(' + left + ' ' + op + ' ' + right + ')';
                } else {
                  if (expr instanceof UnaryExpr) {
                    var op_0 = expr.x1k_1.i1e_1;
                    var inner = renderExprForDebug($this, expr.w1k_1, values);
                    tmp = '(' + op_0 + ' ' + inner + ')';
                  } else {
                    if (expr instanceof CallExpr) {
                      var args = joinToString(expr.o1k_1, ' ', VOID, VOID, VOID, VOID, CollectingTracer$renderExprForDebug$lambda($this, values));
                      var tmp_3;
                      // Inline function 'kotlin.text.isNotEmpty' call
                      if (charSequenceLength(args) > 0) {
                        tmp_3 = ' ' + args;
                      } else {
                        tmp_3 = '';
                      }
                      tmp = '(' + expr.n1k_1.n1e_1 + tmp_3 + ')';
                    } else {
                      if (expr instanceof InvokeExpr) {
                        var target = renderExprForDebug($this, expr.q1k_1, values);
                        var args_0 = joinToString(expr.r1k_1, ' ', VOID, VOID, VOID, VOID, CollectingTracer$renderExprForDebug$lambda_0($this, values));
                        var tmp_4;
                        // Inline function 'kotlin.text.isNotEmpty' call
                        if (charSequenceLength(args_0) > 0) {
                          tmp_4 = ' ' + args_0;
                        } else {
                          tmp_4 = '';
                        }
                        tmp = '(invoke ' + target + tmp_4 + ')';
                      } else {
                        if (expr instanceof ArrayExpr) {
                          tmp = joinToString(expr.d1l_1, VOID, '[', ']', VOID, VOID, CollectingTracer$renderExprForDebug$lambda_1($this, values));
                        } else {
                          if (expr instanceof ObjectExpr) {
                            tmp = '{\u2026}';
                          } else {
                            if (expr instanceof ArrayCompExpr) {
                              tmp = '[for ' + expr.f1l_1 + ' in ' + renderExprForDebug($this, expr.g1l_1, values) + ' \u2026]';
                            } else {
                              if (expr instanceof IfElseExpr) {
                                var cond = renderExprForDebug($this, expr.k1l_1, values);
                                var thenBranch = renderExprForDebug($this, expr.l1l_1, values);
                                var elseBranch = renderExprForDebug($this, expr.m1l_1, values);
                                tmp = '(if ' + cond + ' ' + thenBranch + ' ' + elseBranch + ')';
                              } else {
                                if (expr instanceof LambdaExpr) {
                                  tmp = '<lambda>';
                                } else {
                                  var tmp7_elvis_lhs = getKClassFromExpression(expr).m9();
                                  tmp = tmp7_elvis_lhs == null ? '<expr>' : tmp7_elvis_lhs;
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return tmp;
  }
  function renderAccessPath($this, expr) {
    var b = expr.p1e_1;
    var tmp;
    if (b instanceof IdentifierExpr) {
      tmp = b.n1e_1;
    } else {
      if (b instanceof AccessExpr) {
        tmp = renderAccessPath($this, b);
      } else {
        tmp = renderExprForDebug($this, b, emptyMap());
      }
    }
    var tmp0_elvis_lhs = tmp;
    var tmp_0;
    if (tmp0_elvis_lhs == null) {
      return null;
    } else {
      tmp_0 = tmp0_elvis_lhs;
    }
    var base = tmp_0;
    var sb = new StringBuilder(base);
    var _iterator__ex2g4s = expr.q1e_1.g();
    while (_iterator__ex2g4s.h()) {
      var seg = _iterator__ex2g4s.i();
      if (seg instanceof Static) {
        var key = seg.s1e_1;
        if (key instanceof Name)
          sb.x7(_Char___init__impl__6a9atx(46)).w7(_Name___get_v__impl__vuc4w5(key.t1e_1));
        else {
          if (key instanceof I32)
            sb.x7(_Char___init__impl__6a9atx(91)).ya(_I32___get_v__impl__4258ps(key.y1e_1)).x7(_Char___init__impl__6a9atx(93));
          else {
            if (key instanceof I64)
              sb.x7(_Char___init__impl__6a9atx(91)).za(_I64___get_v__impl__gpphb3(key.z1e_1)).x7(_Char___init__impl__6a9atx(93));
            else {
              if (key instanceof IBig)
                sb.x7(_Char___init__impl__6a9atx(91)).v7(_IBig___get_v__impl__986dq1(key.g1f_1)).x7(_Char___init__impl__6a9atx(93));
              else {
                noWhenBranchMatchedException();
              }
            }
          }
        }
      } else {
        if (seg instanceof Dynamic) {
          var keyStr = renderExprForDebug($this, seg.n1h_1, emptyMap());
          var tmp$ret$1;
          $l$block: {
            // Inline function 'kotlin.text.all' call
            var inductionVariable = 0;
            while (inductionVariable < charSequenceLength(keyStr)) {
              var element = charSequenceGet(keyStr, inductionVariable);
              inductionVariable = inductionVariable + 1 | 0;
              if (!(isLetterOrDigit(element) || element === _Char___init__impl__6a9atx(95))) {
                tmp$ret$1 = false;
                break $l$block;
              }
            }
            tmp$ret$1 = true;
          }
          var simple = tmp$ret$1;
          if (simple)
            sb.x7(_Char___init__impl__6a9atx(46)).w7(keyStr);
          else
            sb.x7(_Char___init__impl__6a9atx(91)).w7(keyStr).x7(_Char___init__impl__6a9atx(93));
        } else {
          noWhenBranchMatchedException();
        }
      }
    }
    return sb.toString();
  }
  function lookupValueForDebug($this, name, values) {
    var tmp0_safe_receiver = values.y1(name);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return tmp0_safe_receiver;
    }
    var event = $this.i1o_1.y1(name);
    var tmp;
    if (event instanceof Let) {
      tmp = event.f1m_1;
    } else {
      if (event instanceof PathWrite) {
        tmp = event.k1m_1;
      } else {
        tmp = null;
      }
    }
    return tmp;
  }
  function formatDebugValue($this, value) {
    var tmp;
    if (!(value == null) ? typeof value === 'string' : false) {
      tmp = '"' + value + '"';
    } else {
      tmp = short($this, value);
    }
    return tmp;
  }
  function popCaptureFor($this, node) {
    var tmp;
    if (node instanceof IRSet) {
      tmp = true;
    } else {
      var tmp_0;
      if (node instanceof IRAppendTo) {
        tmp_0 = true;
      } else {
        tmp_0 = node instanceof IRModify;
      }
      tmp = tmp_0;
    }
    if (tmp) {
      // Inline function 'kotlin.collections.isNotEmpty' call
      if (!$this.v1n_1.p()) {
        $this.v1n_1.gd();
      }
    }
  }
  function currentCaptureOrNull($this) {
    return $this.v1n_1.cd();
  }
  function flattenInputs($this, baseInputs) {
    if (baseInputs.p())
      return to(emptyList(), emptyList());
    var flattened = ArrayList_init_$Create$();
    var calc = ArrayList_init_$Create$();
    var seen = LinkedHashSet_init_$Create$();
    var queue = ArrayDeque_init_$Create$();
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = baseInputs.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      queue.ed(element);
    }
    $l$loop_0: while (true) {
      // Inline function 'kotlin.collections.isNotEmpty' call
      if (!!queue.p()) {
        break $l$loop_0;
      }
      var _destruct__k2r9zo = queue.fd();
      var name = _destruct__k2r9zo.xd();
      var value = _destruct__k2r9zo.yd();
      if (!seen.e(name))
        continue $l$loop_0;
      var deps = $this.x1n_1.y1(name);
      var tmp;
      if (!(deps == null)) {
        // Inline function 'kotlin.collections.isNotEmpty' call
        tmp = !deps.p();
      } else {
        tmp = false;
      }
      if (tmp) {
        queue.n(deps);
        var tmp0_safe_receiver = $this.y1n_1.y1(name);
        if (tmp0_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          calc.n(tmp0_safe_receiver);
        }
      } else {
        // Inline function 'kotlin.collections.plusAssign' call
        var element_0 = to(name, value);
        flattened.e(element_0);
      }
    }
    return to(flattened, calc);
  }
  function computeDelta($this, op, old, new_0) {
    var tmp;
    switch (op) {
      case 'APPEND':
        var tmp_0;
        var tmp_1;
        var tmp_2;
        var tmp_3;
        if (!(new_0 == null) ? isInterface(new_0, KtList) : false) {
          tmp_3 = !(old == null) ? isInterface(old, KtList) : false;
        } else {
          tmp_3 = false;
        }

        if (tmp_3) {
          tmp_2 = new_0.j() === (old.j() + 1 | 0);
        } else {
          tmp_2 = false;
        }

        if (tmp_2) {
          tmp_1 = equals_0(take(new_0, old.j()), old);
        } else {
          tmp_1 = false;
        }

        if (tmp_1) {
          tmp_0 = lastOrNull(new_0);
        } else {
          var tmp_4;
          if (!(new_0 == null) ? isInterface(new_0, KtList) : false) {
            tmp_4 = old == null;
          } else {
            tmp_4 = false;
          }
          if (tmp_4) {
            tmp_0 = lastOrNull(new_0);
          } else {
            tmp_0 = null;
          }
        }

        tmp = tmp_0;
        break;
      case 'SET':
        tmp = new_0;
        break;
      case 'MODIFY':
        tmp = null;
        break;
      default:
        tmp = null;
        break;
    }
    return tmp;
  }
  function canonicalizeInputPairs($this, inputs) {
    // Inline function 'kotlin.collections.mapNotNull' call
    // Inline function 'kotlin.collections.mapNotNullTo' call
    var destination = ArrayList_init_$Create$();
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = inputs.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      var tmp$ret$0;
      $l$block: {
        var tmp = element.y1('name');
        var tmp0_elvis_lhs = (!(tmp == null) ? typeof tmp === 'string' : false) ? tmp : null;
        var tmp_0;
        if (tmp0_elvis_lhs == null) {
          tmp$ret$0 = null;
          break $l$block;
        } else {
          tmp_0 = tmp0_elvis_lhs;
        }
        var n = tmp_0;
        var v = element.y1('value');
        tmp$ret$0 = to(n, v);
      }
      var tmp0_safe_receiver = tmp$ret$0;
      if (tmp0_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        destination.e(tmp0_safe_receiver);
      }
    }
    var pairs = destination;
    var lastByName = LinkedHashMap_init_$Create$();
    var _iterator__ex2g4s_0 = pairs.g();
    while (_iterator__ex2g4s_0.h()) {
      var _destruct__k2r9zo = _iterator__ex2g4s_0.i();
      var n_0 = _destruct__k2r9zo.xd();
      var v_0 = _destruct__k2r9zo.yd();
      // Inline function 'kotlin.collections.set' call
      lastByName.g2(n_0, v_0);
    }
    // Inline function 'kotlin.collections.filter' call
    var tmp0 = lastByName.z1();
    // Inline function 'kotlin.collections.filterTo' call
    var destination_0 = ArrayList_init_$Create$();
    var _iterator__ex2g4s_1 = tmp0.g();
    while (_iterator__ex2g4s_1.h()) {
      var element_0 = _iterator__ex2g4s_1.i();
      if (contains(element_0, _Char___init__impl__6a9atx(46)) || contains(element_0, _Char___init__impl__6a9atx(91))) {
        destination_0.e(element_0);
      }
    }
    var dotted = toSet(destination_0);
    var result = ArrayList_init_$Create$();
    var _iterator__ex2g4s_2 = sorted(dotted).g();
    while (_iterator__ex2g4s_2.h()) {
      var n_1 = _iterator__ex2g4s_2.i();
      // Inline function 'kotlin.collections.plusAssign' call
      var element_1 = to(n_1, lastByName.y1(n_1));
      result.e(element_1);
    }
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_3 = lastByName.b2().g();
    while (_iterator__ex2g4s_3.h()) {
      var _destruct__k2r9zo_0 = _iterator__ex2g4s_3.i();
      // Inline function 'kotlin.collections.component1' call
      var n_2 = _destruct__k2r9zo_0.u1();
      // Inline function 'kotlin.collections.component2' call
      var v_1 = _destruct__k2r9zo_0.v1();
      if (!contains(n_2, _Char___init__impl__6a9atx(46)) && !contains(n_2, _Char___init__impl__6a9atx(91))) {
        var tmp$ret$15;
        $l$block_1: {
          // Inline function 'kotlin.collections.any' call
          var tmp_1;
          if (isInterface(dotted, Collection)) {
            tmp_1 = dotted.p();
          } else {
            tmp_1 = false;
          }
          if (tmp_1) {
            tmp$ret$15 = false;
            break $l$block_1;
          }
          var _iterator__ex2g4s_4 = dotted.g();
          while (_iterator__ex2g4s_4.h()) {
            var element_2 = _iterator__ex2g4s_4.i();
            if (startsWith(element_2, n_2 + '.') || startsWith(element_2, n_2 + '[')) {
              tmp$ret$15 = true;
              break $l$block_1;
            }
          }
          tmp$ret$15 = false;
        }
        var hasDotted = tmp$ret$15;
        if (!hasDotted) {
          // Inline function 'kotlin.collections.plusAssign' call
          var element_3 = to(n_2, v_1);
          result.e(element_3);
        }
      }
    }
    // Inline function 'kotlin.collections.sortedBy' call
    // Inline function 'kotlin.comparisons.compareBy' call
    var tmp_2 = CollectingTracer$canonicalizeInputPairs$lambda;
    var tmp$ret$18 = new sam$kotlin_Comparator$0(tmp_2);
    return sortedWith(result, tmp$ret$18);
  }
  function buildLetProvenance($this, name) {
    var tmp = $this.i1o_1.y1(name);
    var tmp0_elvis_lhs = tmp instanceof Let ? tmp : null;
    var tmp_0;
    if (tmp0_elvis_lhs == null) {
      return emptyList();
    } else {
      tmp_0 = tmp0_elvis_lhs;
    }
    var letEvent = tmp_0;
    var tmp1_elvis_lhs = $this.x1n_1.y1(name);
    var baseInputs = tmp1_elvis_lhs == null ? emptyList() : tmp1_elvis_lhs;
    var _destruct__k2r9zo = flattenInputs($this, baseInputs);
    var flattenedInputs = _destruct__k2r9zo.xd();
    var flattenedCalc = _destruct__k2r9zo.yd();
    // Inline function 'kotlin.collections.mutableListOf' call
    // Inline function 'kotlin.apply' call
    var this_0 = ArrayList_init_$Create$();
    this_0.n(flattenedCalc);
    var tmp0_safe_receiver = $this.y1n_1.y1(name);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      this_0.n(tmp0_safe_receiver);
    }
    var calc = this_0;
    var debugLines = renderLetDebug($this, $this.z1n_1.y1(name), baseInputs, flattenedInputs, letEvent.f1m_1);
    return listOf(new ProvStep('LET', listOf(name), flattenedInputs, letEvent.f1m_1, letEvent.e1m_1, letEvent.f1m_1, calc, debugLines, baseInputs));
  }
  function toMap_1($this, _this__u8e3s4) {
    var tmp = to('op', _this__u8e3s4.k1n_1);
    var tmp_0 = to('path', _this__u8e3s4.l1n_1);
    // Inline function 'kotlin.collections.map' call
    var this_0 = _this__u8e3s4.m1n_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      var n = item.xd();
      var v = item.yd();
      var tmp$ret$0 = mapOf([to('name', n), to('value', v)]);
      destination.e(tmp$ret$0);
    }
    var tmp_1 = to('inputs', destination);
    var tmp_2 = to('delta', _this__u8e3s4.n1n_1);
    var tmp_3 = to('old', _this__u8e3s4.o1n_1);
    var tmp_4 = to('new', _this__u8e3s4.p1n_1);
    // Inline function 'kotlin.collections.map' call
    var this_1 = _this__u8e3s4.q1n_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_1, 10));
    var _iterator__ex2g4s_0 = this_1.g();
    while (_iterator__ex2g4s_0.h()) {
      var item_0 = _iterator__ex2g4s_0.i();
      var tmp$ret$3 = mapOf([to('kind', item_0.x1l_1), to('name', item_0.y1l_1), to('args', item_0.z1l_1), to('value', item_0.a1m_1)]);
      destination_0.e(tmp$ret$3);
    }
    var tmp_5 = to('calc', destination_0);
    var tmp_6 = to('debug', _this__u8e3s4.r1n_1);
    // Inline function 'kotlin.collections.map' call
    var this_2 = _this__u8e3s4.s1n_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination_1 = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_2, 10));
    var _iterator__ex2g4s_1 = this_2.g();
    while (_iterator__ex2g4s_1.h()) {
      var item_1 = _iterator__ex2g4s_1.i();
      var n_0 = item_1.xd();
      var v_0 = item_1.yd();
      var tmp$ret$6 = mapOf([to('name', n_0), to('value', v_0)]);
      destination_1.e(tmp$ret$6);
    }
    return mapOf([tmp, tmp_0, tmp_1, tmp_2, tmp_3, tmp_4, tmp_5, tmp_6, to('sources', destination_1)]);
  }
  function short($this, v) {
    var tmp;
    if (v == null) {
      tmp = 'null';
    } else {
      if (v instanceof BLBigDec) {
        tmp = toPlainString(v);
      } else {
        if (isNumber(v)) {
          tmp = toString(v);
        } else {
          if (v instanceof Pair) {
            var second = short($this, v.wd_1);
            tmp = toString_0(v.vd_1) + '=' + second;
          } else {
            if (!(v == null) ? isInterface(v, KtMap) : false) {
              // Inline function 'kotlin.collections.get' call
              var tmp1_elvis_lhs = (isInterface(v, KtMap) ? v : THROW_CCE()).y1('id');
              var tmp_0;
              if (tmp1_elvis_lhs == null) {
                // Inline function 'kotlin.collections.get' call
                tmp_0 = (isInterface(v, KtMap) ? v : THROW_CCE()).y1('name');
              } else {
                tmp_0 = tmp1_elvis_lhs;
              }
              var tmp2_elvis_lhs = tmp_0;
              tmp = toString(tmp2_elvis_lhs == null ? 'object' : tmp2_elvis_lhs);
            } else {
              if (!(v == null) ? isInterface(v, KtList) : false) {
                tmp = 'list(' + v.j() + ')';
              } else {
                tmp = toString(v);
              }
            }
          }
        }
      }
    }
    return tmp;
  }
  function sam$kotlin_Comparator$0(function_0) {
    this.j1o_1 = function_0;
  }
  protoOf(sam$kotlin_Comparator$0).sb = function (a, b) {
    return this.j1o_1(a, b);
  };
  protoOf(sam$kotlin_Comparator$0).compare = function (a, b) {
    return this.sb(a, b);
  };
  protoOf(sam$kotlin_Comparator$0).i3 = function () {
    return this.j1o_1;
  };
  protoOf(sam$kotlin_Comparator$0).equals = function (other) {
    var tmp;
    if (!(other == null) ? isInterface(other, Comparator) : false) {
      var tmp_0;
      if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
        tmp_0 = equals_0(this.i3(), other.i3());
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(sam$kotlin_Comparator$0).hashCode = function () {
    return hashCode(this.i3());
  };
  function CollectingTracer$renderExprForDebug$lambda(this$0, $values) {
    return function (it) {
      return renderExprForDebug(this$0, it, $values);
    };
  }
  function CollectingTracer$renderExprForDebug$lambda_0(this$0, $values) {
    return function (it) {
      return renderExprForDebug(this$0, it, $values);
    };
  }
  function CollectingTracer$renderExprForDebug$lambda_1(this$0, $values) {
    return function (it) {
      return renderExprForDebug(this$0, it, $values);
    };
  }
  function CollectingTracer$canonicalizeInputPairs$lambda(a, b) {
    // Inline function 'kotlin.comparisons.compareValuesBy' call
    var tmp = a.vd_1;
    var tmp$ret$1 = b.vd_1;
    return compareValues(tmp, tmp$ret$1);
  }
  function CollectingTracer$humanize$lambda(this$0) {
    return function (_destruct__k2r9zo) {
      var n = _destruct__k2r9zo.xd();
      var v = _destruct__k2r9zo.yd();
      return n + '=' + short(this$0, v);
    };
  }
  function CollectingTracer$humanize$lambda_0(this$0) {
    return function (it) {
      return short(this$0, it);
    };
  }
  function CollectingTracer(opts) {
    opts = opts === VOID ? new TraceOptions() : opts;
    this.t1n_1 = opts;
    var tmp = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp.u1n_1 = LinkedHashMap_init_$Create$();
    this.v1n_1 = ArrayDeque_init_$Create$();
    this.w1n_1 = ArrayDeque_init_$Create$();
    var tmp_0 = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp_0.x1n_1 = LinkedHashMap_init_$Create$();
    var tmp_1 = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp_1.y1n_1 = LinkedHashMap_init_$Create$();
    var tmp_2 = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp_2.z1n_1 = LinkedHashMap_init_$Create$();
    this.a1o_1 = LinkedHashSet_init_$Create$();
    this.b1o_1 = LinkedHashMap_init_$Create$();
    this.c1o_1 = LinkedHashMap_init_$Create$();
    this.d1o_1 = emptyMap();
    this.e1o_1 = emptyMap();
    this.f1o_1 = null;
    this.g1o_1 = Monotonic_instance.xb();
    var tmp_3 = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp_3.h1o_1 = ArrayList_init_$Create$();
    var tmp_4 = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp_4.i1o_1 = LinkedHashMap_init_$Create$();
  }
  protoOf(CollectingTracer).k1o = function () {
    return this.t1n_1;
  };
  protoOf(CollectingTracer).l1o = function (event) {
    var at = ValueTimeMark__elapsedNow_impl_eonqvs(this.g1o_1);
    if (this.h1o_1.j() < this.t1n_1.u1l_1) {
      var tmp0 = this.h1o_1;
      // Inline function 'kotlin.collections.plusAssign' call
      var element = new Timed(at, event);
      tmp0.e(element);
    }
    if (event instanceof Enter) {
      pushCaptureFor(this, event.b1m_1);
      var tmp = event.b1m_1;
      if (tmp instanceof IRLet) {
        this.w1n_1.ed(new CaptureFrame('LET', VOID, VOID, VOID, event.b1m_1.m1o_1, event.b1m_1.n1o_1));
      }
    } else {
      if (event instanceof Exit) {
        popCaptureFor(this, event.c1m_1);
        var tmp_0;
        var tmp_1 = event.c1m_1;
        if (tmp_1 instanceof IRLet) {
          // Inline function 'kotlin.collections.isNotEmpty' call
          tmp_0 = !this.w1n_1.p();
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          this.w1n_1.gd();
        }
      } else {
        if (event instanceof Read) {
          var tmp1_safe_receiver = currentCaptureOrNull(this);
          var tmp2_safe_receiver = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.f1n_1;
          if (tmp2_safe_receiver == null)
            null;
          else
            tmp2_safe_receiver.e(event);
          var tmp3_safe_receiver = this.w1n_1.cd();
          var tmp4_safe_receiver = tmp3_safe_receiver == null ? null : tmp3_safe_receiver.f1n_1;
          if (tmp4_safe_receiver == null)
            null;
          else
            tmp4_safe_receiver.e(event);
        } else {
          if (event instanceof PathWrite) {
            var tmp0_0 = this.i1o_1;
            // Inline function 'kotlin.collections.set' call
            var key = event.h1m_1;
            tmp0_0.g2(key, event);
            var cap = currentCaptureOrNull(this);
            var tmp6_safe_receiver = cap == null ? null : cap.f1n_1;
            var tmp_2;
            if (tmp6_safe_receiver == null) {
              tmp_2 = null;
            } else {
              // Inline function 'kotlin.collections.map' call
              // Inline function 'kotlin.collections.mapTo' call
              var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(tmp6_safe_receiver, 10));
              var _iterator__ex2g4s = tmp6_safe_receiver.g();
              while (_iterator__ex2g4s.h()) {
                var item = _iterator__ex2g4s.i();
                var tmp$ret$3 = to(item.t1m_1, item.u1m_1);
                destination.e(tmp$ret$3);
              }
              tmp_2 = destination;
            }
            var tmp7_elvis_lhs = tmp_2;
            var baseInputs = tmp7_elvis_lhs == null ? emptyList() : tmp7_elvis_lhs;
            var _destruct__k2r9zo = flattenInputs(this, baseInputs);
            var flattenedInputs = _destruct__k2r9zo.xd();
            var flattenedCalc = _destruct__k2r9zo.yd();
            // Inline function 'kotlin.collections.mutableListOf' call
            // Inline function 'kotlin.apply' call
            var this_0 = ArrayList_init_$Create$();
            if (!(cap == null)) {
              this_0.n(cap.h1n_1);
            }
            this_0.n(flattenedCalc);
            var calcForStep = this_0;
            var step = new ProvStep(event.g1m_1, event.i1m_1, flattenedInputs, computeDelta(this, event.g1m_1, event.j1m_1, event.k1m_1), event.j1m_1, event.k1m_1, calcForStep, VOID, baseInputs);
            var tmp0_1 = this.c1o_1;
            // Inline function 'kotlin.collections.getOrPut' call
            var key_0 = event.h1m_1;
            var value = tmp0_1.y1(key_0);
            var tmp_3;
            if (value == null) {
              // Inline function 'kotlin.collections.mutableListOf' call
              var answer = ArrayList_init_$Create$();
              tmp0_1.g2(key_0, answer);
              tmp_3 = answer;
            } else {
              tmp_3 = value;
            }
            tmp_3.e(step);
          } else {
            if (event instanceof Let) {
              var tmp0_2 = this.i1o_1;
              // Inline function 'kotlin.collections.set' call
              var key_1 = event.d1m_1;
              tmp0_2.g2(key_1, event);
              var tmp0_3 = asReversed(toList(this.w1n_1));
              var tmp$ret$14;
              $l$block: {
                // Inline function 'kotlin.collections.firstOrNull' call
                var _iterator__ex2g4s_0 = tmp0_3.g();
                while (_iterator__ex2g4s_0.h()) {
                  var element_0 = _iterator__ex2g4s_0.i();
                  if (element_0.i1n_1 === event.d1m_1) {
                    tmp$ret$14 = element_0;
                    break $l$block;
                  }
                }
                tmp$ret$14 = null;
              }
              var tmp8_elvis_lhs = tmp$ret$14;
              var frame = tmp8_elvis_lhs == null ? this.w1n_1.cd() : tmp8_elvis_lhs;
              var tmp10_elvis_lhs = frame == null ? null : frame.f1n_1;
              var reads = tmp10_elvis_lhs == null ? emptyList() : tmp10_elvis_lhs;
              var tmp0_4 = this.x1n_1;
              var tmp2 = event.d1m_1;
              // Inline function 'kotlin.collections.map' call
              // Inline function 'kotlin.collections.mapTo' call
              var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(reads, 10));
              var _iterator__ex2g4s_1 = reads.g();
              while (_iterator__ex2g4s_1.h()) {
                var item_0 = _iterator__ex2g4s_1.i();
                var tmp$ret$15 = to(item_0.t1m_1, item_0.u1m_1);
                destination_0.e(tmp$ret$15);
              }
              // Inline function 'kotlin.collections.set' call
              tmp0_4.g2(tmp2, destination_0);
              var tmp0_5 = this.y1n_1;
              var tmp2_0 = event.d1m_1;
              var tmp12_safe_receiver = frame == null ? null : frame.h1n_1;
              var tmp13_elvis_lhs = tmp12_safe_receiver == null ? null : toList(tmp12_safe_receiver);
              // Inline function 'kotlin.collections.set' call
              var value_0 = tmp13_elvis_lhs == null ? emptyList() : tmp13_elvis_lhs;
              tmp0_5.g2(tmp2_0, value_0);
              var tmp15_safe_receiver = frame == null ? null : frame.j1n_1;
              if (tmp15_safe_receiver == null)
                null;
              else {
                // Inline function 'kotlin.let' call
                var tmp0_6 = this.z1n_1;
                // Inline function 'kotlin.collections.set' call
                var key_2 = event.d1m_1;
                tmp0_6.g2(key_2, tmp15_safe_receiver);
              }
            } else {
              if (event instanceof Return) {
                if (event.p1m_1 === 'HOST') {
                  var cap_0 = currentCaptureOrNull(this);
                  if (!(cap_0 == null)) {
                    var tmp0_7 = cap_0.g1n_1;
                    var tmp$ret$24;
                    $l$block_0: {
                      // Inline function 'kotlin.collections.indexOfFirst' call
                      var index = 0;
                      var _iterator__ex2g4s_2 = tmp0_7.g();
                      while (_iterator__ex2g4s_2.h()) {
                        var item_1 = _iterator__ex2g4s_2.i();
                        if (item_1.l1m_1 === event.p1m_1 && item_1.m1m_1 == event.q1m_1) {
                          tmp$ret$24 = index;
                          break $l$block_0;
                        }
                        index = index + 1 | 0;
                      }
                      tmp$ret$24 = -1;
                    }
                    var idx = tmp$ret$24;
                    var call = idx >= 0 ? cap_0.g1n_1.f2(idx) : null;
                    if (!(call == null)) {
                      var tmp0_8 = cap_0.h1n_1;
                      // Inline function 'kotlin.collections.plusAssign' call
                      var element_1 = new CalcStep(event.p1m_1, event.q1m_1, call.n1m_1, event.r1m_1);
                      tmp0_8.e(element_1);
                    }
                  }
                  var lcap = this.w1n_1.cd();
                  if (!(lcap == null)) {
                    var tmp0_9 = lcap.g1n_1;
                    var tmp$ret$27;
                    $l$block_1: {
                      // Inline function 'kotlin.collections.indexOfFirst' call
                      var index_0 = 0;
                      var _iterator__ex2g4s_3 = tmp0_9.g();
                      while (_iterator__ex2g4s_3.h()) {
                        var item_2 = _iterator__ex2g4s_3.i();
                        if (item_2.l1m_1 === event.p1m_1 && item_2.m1m_1 == event.q1m_1) {
                          tmp$ret$27 = index_0;
                          break $l$block_1;
                        }
                        index_0 = index_0 + 1 | 0;
                      }
                      tmp$ret$27 = -1;
                    }
                    var idx_0 = tmp$ret$27;
                    var call_0 = idx_0 >= 0 ? lcap.g1n_1.f2(idx_0) : null;
                    if (!(call_0 == null)) {
                      var tmp0_10 = lcap.h1n_1;
                      // Inline function 'kotlin.collections.plusAssign' call
                      var element_2 = new CalcStep(event.p1m_1, event.q1m_1, call_0.n1m_1, event.r1m_1);
                      tmp0_10.e(element_2);
                    }
                  }
                }
                if (!(event.q1m_1 == null)) {
                  var tmp0_11 = this.i1o_1;
                  // Inline function 'kotlin.collections.set' call
                  var key_3 = ensureNotNull(event.q1m_1);
                  tmp0_11.g2(key_3, event);
                }
              } else {
                if (event instanceof Call) {
                  if (event.l1m_1 === 'HOST') {
                    var tmp16_safe_receiver = currentCaptureOrNull(this);
                    var tmp17_safe_receiver = tmp16_safe_receiver == null ? null : tmp16_safe_receiver.g1n_1;
                    if (tmp17_safe_receiver == null)
                      null;
                    else {
                      tmp17_safe_receiver.ed(event);
                    }
                    var tmp18_safe_receiver = this.w1n_1.cd();
                    var tmp19_safe_receiver = tmp18_safe_receiver == null ? null : tmp18_safe_receiver.g1n_1;
                    if (tmp19_safe_receiver == null)
                      null;
                    else {
                      tmp19_safe_receiver.ed(event);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  protoOf(CollectingTracer).o1o = function (name) {
    var tmp0_elvis_lhs = this.c1o_1.y1(name);
    var rawSteps = tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
    var tmp;
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!rawSteps.p()) {
      tmp = rawSteps;
    } else {
      tmp = buildLetProvenance(this, name);
    }
    var steps = tmp;
    var tmp_0;
    if (steps.p()) {
      // Inline function 'kotlin.collections.contains' call
      // Inline function 'kotlin.collections.containsKey' call
      var this_0 = this.i1o_1;
      tmp_0 = !(isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).w1(name);
    } else {
      tmp_0 = false;
    }
    if (tmp_0)
      return null;
    var ev = this.i1o_1.y1(name);
    var tmp_1;
    if (ev instanceof Let) {
      tmp_1 = ev.f1m_1;
    } else {
      if (ev instanceof Return) {
        tmp_1 = ev.r1m_1;
      } else {
        if (ev instanceof PathWrite) {
          tmp_1 = ev.k1m_1;
        } else {
          tmp_1 = this.b1o_1.y1(name);
        }
      }
    }
    var finalValue = tmp_1;
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(steps, 10));
    var _iterator__ex2g4s = steps.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      var tmp$ret$3 = toMap_1(this, item);
      destination.e(tmp$ret$3);
    }
    var stepsOut = destination;
    return mapOf([to('var', name), to('final', finalValue), to('steps', stepsOut)]);
  };
  protoOf(CollectingTracer).p1o = function () {
    var keys = LinkedHashSet_init_$Create$();
    keys.n(this.c1o_1.z1());
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = this.i1o_1.b2().g();
    while (_iterator__ex2g4s.h()) {
      var _destruct__k2r9zo = _iterator__ex2g4s.i();
      // Inline function 'kotlin.collections.component1' call
      var name = _destruct__k2r9zo.u1();
      // Inline function 'kotlin.collections.component2' call
      var event = _destruct__k2r9zo.v1();
      var tmp;
      if (event instanceof Let) {
        tmp = true;
      } else {
        tmp = event instanceof PathWrite;
      }
      if (tmp)
        keys.e(name);
    }
    keys.n(this.b1o_1.z1());
    return keys;
  };
  protoOf(CollectingTracer).q1o = function (name) {
    var tmp0_elvis_lhs = this.c1o_1.y1(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return emptyList();
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var steps = tmp;
    var inductionVariable = get_lastIndex(steps);
    if (0 <= inductionVariable)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + -1 | 0;
        var step = steps.o(i);
        // Inline function 'kotlin.collections.isNotEmpty' call
        if (!step.s1n_1.p()) {
          var tmp_0;
          if (!(step.k1n_1 === 'OUTPUT')) {
            tmp_0 = true;
          } else {
            var tmp$ret$1;
            $l$block_0: {
              // Inline function 'kotlin.collections.all' call
              var tmp_1;
              if (isInterface(steps, Collection)) {
                tmp_1 = steps.p();
              } else {
                tmp_1 = false;
              }
              if (tmp_1) {
                tmp$ret$1 = true;
                break $l$block_0;
              }
              var _iterator__ex2g4s = steps.g();
              while (_iterator__ex2g4s.h()) {
                var element = _iterator__ex2g4s.i();
                if (!(element.k1n_1 === 'OUTPUT')) {
                  tmp$ret$1 = false;
                  break $l$block_0;
                }
              }
              tmp$ret$1 = true;
            }
            tmp_0 = tmp$ret$1;
          }
          if (tmp_0) {
            // Inline function 'kotlin.collections.map' call
            var this_0 = step.s1n_1;
            // Inline function 'kotlin.collections.mapTo' call
            var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
            var _iterator__ex2g4s_0 = this_0.g();
            while (_iterator__ex2g4s_0.h()) {
              var item = _iterator__ex2g4s_0.i();
              var tmp$ret$3 = item.vd_1;
              destination.e(tmp$ret$3);
            }
            return destination;
          }
        }
      }
       while (0 <= inductionVariable);
    return emptyList();
  };
  protoOf(CollectingTracer).r1o = function (name, evaluate) {
    var root = toString(name);
    var frame = new CaptureFrame('OUTPUT');
    var previousEvent = this.i1o_1.y1(root);
    var tmp;
    if (previousEvent instanceof Let) {
      tmp = buildLetProvenance(this, root);
    } else {
      tmp = emptyList();
    }
    var letSteps = tmp;
    this.v1n_1.ed(frame);
    var tmp_0;
    try {
      var value = evaluate();
      // Inline function 'kotlin.collections.set' call
      this.b1o_1.g2(root, value);
      // Inline function 'kotlin.collections.map' call
      var this_0 = frame.f1n_1;
      // Inline function 'kotlin.collections.mapTo' call
      var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
      var _iterator__ex2g4s = this_0.g();
      while (_iterator__ex2g4s.h()) {
        var item = _iterator__ex2g4s.i();
        var tmp$ret$1 = to(item.t1m_1, item.u1m_1);
        destination.e(tmp$ret$1);
      }
      var baseInputs = destination;
      var _destruct__k2r9zo = flattenInputs(this, baseInputs);
      var flattenedInputs = _destruct__k2r9zo.xd();
      var flattenedCalc = _destruct__k2r9zo.yd();
      var step = new ProvStep('OUTPUT', listOf(root), flattenedInputs, null, null, value, flattenedCalc, renderOutputDebug(this, root, baseInputs, flattenedInputs, value), baseInputs);
      // Inline function 'kotlin.collections.getOrPut' call
      var this_1 = this.c1o_1;
      var value_0 = this_1.y1(root);
      var tmp_1;
      if (value_0 == null) {
        // Inline function 'kotlin.collections.mutableListOf' call
        var answer = ArrayList_init_$Create$();
        this_1.g2(root, answer);
        tmp_1 = answer;
      } else {
        tmp_1 = value_0;
      }
      var stepsList = tmp_1;
      // Inline function 'kotlin.collections.isNotEmpty' call
      if (!letSteps.p()) {
        var _iterator__ex2g4s_0 = reversed(letSteps).g();
        while (_iterator__ex2g4s_0.h()) {
          var ls = _iterator__ex2g4s_0.i();
          var tmp$ret$8;
          $l$block_0: {
            // Inline function 'kotlin.collections.none' call
            var tmp_2;
            if (isInterface(stepsList, Collection)) {
              tmp_2 = stepsList.p();
            } else {
              tmp_2 = false;
            }
            if (tmp_2) {
              tmp$ret$8 = true;
              break $l$block_0;
            }
            var _iterator__ex2g4s_1 = stepsList.g();
            while (_iterator__ex2g4s_1.h()) {
              var element = _iterator__ex2g4s_1.i();
              if (element.k1n_1 === ls.k1n_1 && equals_0(element.l1n_1, ls.l1n_1)) {
                tmp$ret$8 = false;
                break $l$block_0;
              }
            }
            tmp$ret$8 = true;
          }
          if (tmp$ret$8) {
            stepsList.e2(0, ls);
          }
        }
      }
      stepsList.e(step);
      if (!(previousEvent instanceof Let)) {
        var tmp0 = this.i1o_1;
        // Inline function 'kotlin.collections.set' call
        var value_1 = new PathWrite('OUTPUT', root, listOf(root), null, value);
        tmp0.g2(root, value_1);
      }
      tmp_0 = value;
    }finally {
      var tmp_3;
      // Inline function 'kotlin.collections.isNotEmpty' call
      if (!this.v1n_1.p()) {
        tmp_3 = this.v1n_1.bd() === frame;
      } else {
        tmp_3 = false;
      }
      if (tmp_3) {
        this.v1n_1.gd();
      } else {
        this.v1n_1.hd(frame);
      }
    }
    return tmp_0;
  };
  protoOf(CollectingTracer).s1o = function () {
    return this.a1o_1;
  };
  protoOf(CollectingTracer).t1o = function (name) {
    this.a1o_1.e(name);
  };
  protoOf(CollectingTracer).u1o = function (name) {
    var tmp0_elvis_lhs = this.o1o(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return 'EXPLAIN(' + name + '): \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u0435 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E.';
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var prov = tmp;
    var tmp_0 = prov.y1('steps');
    var steps = (!(tmp_0 == null) ? isInterface(tmp_0, KtList) : false) ? tmp_0 : THROW_CCE();
    if (steps.p())
      return 'EXPLAIN(' + name + '): \u043D\u0435\u0442 \u0441\u043E\u0431\u044B\u0442\u0438\u0439 \u0437\u0430\u043F\u0438\u0441\u0438.';
    var byTop = LinkedHashMap_init_$Create$_0(8);
    var _iterator__ex2g4s = steps.g();
    while (_iterator__ex2g4s.h()) {
      var st = _iterator__ex2g4s.i();
      var tmp_1 = st.y1('path');
      var path = (!(tmp_1 == null) ? isInterface(tmp_1, KtList) : false) ? tmp_1 : THROW_CCE();
      var tmp1_elvis_lhs = firstOrNull(path);
      var top = tmp1_elvis_lhs == null ? '<root>' : tmp1_elvis_lhs;
      // Inline function 'kotlin.collections.getOrPut' call
      var value = byTop.y1(top);
      var tmp_2;
      if (value == null) {
        // Inline function 'kotlin.collections.mutableListOf' call
        var answer = ArrayList_init_$Create$();
        byTop.g2(top, answer);
        tmp_2 = answer;
      } else {
        tmp_2 = value;
      }
      tmp_2.e(st);
    }
    var sb = StringBuilder_init_$Create$();
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_0 = byTop.b2().g();
    while (_iterator__ex2g4s_0.h()) {
      var _destruct__k2r9zo = _iterator__ex2g4s_0.i();
      // Inline function 'kotlin.collections.component1' call
      var top_0 = _destruct__k2r9zo.u1();
      // Inline function 'kotlin.collections.component2' call
      var lst = _destruct__k2r9zo.v1();
      // Inline function 'kotlin.text.isNotEmpty' call
      if (charSequenceLength(sb) > 0) {
        sb.x7(_Char___init__impl__6a9atx(10));
      }
      var topLabel = toString(top_0);
      var header = topLabel === name ? name : name + '.' + topLabel;
      sb.w7('\u2022 ').w7(header).x7(_Char___init__impl__6a9atx(10));
      var _iterator__ex2g4s_1 = lst.g();
      while (_iterator__ex2g4s_1.h()) {
        var s = _iterator__ex2g4s_1.i();
        var tmp_3 = s.y1('op');
        var op = (!(tmp_3 == null) ? typeof tmp_3 === 'string' : false) ? tmp_3 : THROW_CCE();
        sb.w7('  \u2192 ').w7(op);
        switch (op) {
          case 'APPEND':
            var d = s.y1('delta');
            sb.w7('(delta=').w7(short(this, d)).x7(_Char___init__impl__6a9atx(41)).x7(_Char___init__impl__6a9atx(10));
            break;
          case 'SET':
            var v = s.y1('new');
            sb.w7('(value=').w7(short(this, v)).x7(_Char___init__impl__6a9atx(41)).x7(_Char___init__impl__6a9atx(10));
            break;
          case 'MODIFY':
            sb.x7(_Char___init__impl__6a9atx(10));
            break;
          default:
            sb.x7(_Char___init__impl__6a9atx(10));
            break;
        }
        var tmp_4 = s.y1('debug');
        var tmp3_safe_receiver = (!(tmp_4 == null) ? isInterface(tmp_4, KtList) : false) ? tmp_4 : null;
        var tmp_5;
        if (tmp3_safe_receiver == null) {
          tmp_5 = null;
        } else {
          // Inline function 'kotlin.collections.filterIsInstance' call
          // Inline function 'kotlin.collections.filterIsInstanceTo' call
          var destination = ArrayList_init_$Create$();
          var _iterator__ex2g4s_2 = tmp3_safe_receiver.g();
          while (_iterator__ex2g4s_2.h()) {
            var element = _iterator__ex2g4s_2.i();
            if (!(element == null) ? typeof element === 'string' : false) {
              destination.e(element);
            }
          }
          tmp_5 = destination;
        }
        var tmp4_elvis_lhs = tmp_5;
        var debugLines = tmp4_elvis_lhs == null ? emptyList() : tmp4_elvis_lhs;
        var tmp_6 = s.y1('inputs');
        var inputPairs = canonicalizeInputPairs(this, (!(tmp_6 == null) ? isInterface(tmp_6, KtList) : false) ? tmp_6 : THROW_CCE());
        var tmp_7;
        // Inline function 'kotlin.collections.isNotEmpty' call
        if (!inputPairs.p()) {
          tmp_7 = debugLines.p();
        } else {
          tmp_7 = false;
        }
        if (tmp_7) {
          var tmp_8 = sb.w7('    inputs: ');
          tmp_8.w7(joinToString(inputPairs, ', ', VOID, VOID, VOID, VOID, CollectingTracer$humanize$lambda(this))).x7(_Char___init__impl__6a9atx(10));
        }
        var tmp_9 = s.y1('calc');
        var tmp5_elvis_lhs = (!(tmp_9 == null) ? isInterface(tmp_9, KtList) : false) ? tmp_9 : null;
        var calc = tmp5_elvis_lhs == null ? emptyList() : tmp5_elvis_lhs;
        var tmp_10;
        // Inline function 'kotlin.collections.isNotEmpty' call
        if (!debugLines.p()) {
          tmp_10 = true;
        } else {
          // Inline function 'kotlin.collections.isNotEmpty' call
          tmp_10 = !calc.p();
        }
        if (tmp_10) {
          sb.w7('    calc:\n');
          var _iterator__ex2g4s_3 = debugLines.g();
          while (_iterator__ex2g4s_3.h()) {
            var line = _iterator__ex2g4s_3.i();
            sb.w7('      ').w7(line).x7(_Char___init__impl__6a9atx(10));
          }
          var _iterator__ex2g4s_4 = calc.g();
          while (_iterator__ex2g4s_4.h()) {
            var c = _iterator__ex2g4s_4.i();
            var tmp_11 = c.y1('kind');
            var kind = (!(tmp_11 == null) ? typeof tmp_11 === 'string' : false) ? tmp_11 : null;
            var tmp_12 = c.y1('name');
            var name_0 = (tmp_12 == null ? true : typeof tmp_12 === 'string') ? tmp_12 : THROW_CCE();
            var tmp_13 = c.y1('args');
            var tmp_14 = (!(tmp_13 == null) ? isInterface(tmp_13, KtList) : false) ? tmp_13 : THROW_CCE();
            var args = joinToString(tmp_14, ', ', VOID, VOID, VOID, VOID, CollectingTracer$humanize$lambda_0(this));
            var value_0 = short(this, c.y1('value'));
            var tmp_15 = sb.w7('      ');
            var tmp7_elvis_lhs = name_0 == null ? kind : name_0;
            tmp_15.w7(tmp7_elvis_lhs == null ? '<calc>' : tmp7_elvis_lhs).x7(_Char___init__impl__6a9atx(40)).w7(args).w7(') = ').w7(value_0).x7(_Char___init__impl__6a9atx(10));
          }
        }
      }
    }
    // Inline function 'kotlin.text.trimEnd' call
    var this_0 = sb.toString();
    return toString(trimEnd(isCharSequence(this_0) ? this_0 : THROW_CCE()));
  };
  function Debug$captureOutputField$lambda($block) {
    return function () {
      return $block();
    };
  }
  function Debug() {
    this.h1f_1 = null;
  }
  protoOf(Debug).i1f = function (name) {
    var tmp = this.h1f_1;
    var tmp0_elvis_lhs = tmp instanceof CollectingTracer ? tmp : null;
    var tmp_0;
    if (tmp0_elvis_lhs == null) {
      return null;
    } else {
      tmp_0 = tmp0_elvis_lhs;
    }
    var c = tmp_0;
    c.t1o(name);
    return c.o1o(name);
  };
  protoOf(Debug).v1o = function (name, block) {
    var tmp = this.h1f_1;
    var tmp0_elvis_lhs = tmp instanceof CollectingTracer ? tmp : null;
    var tmp_0;
    if (tmp0_elvis_lhs == null) {
      return block();
    } else {
      tmp_0 = tmp0_elvis_lhs;
    }
    var c = tmp_0;
    var tmp_1 = c.r1o(name, Debug$captureOutputField$lambda(block));
    return (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
  };
  protoOf(Debug).p1g = function (output) {
    var tmp = this.h1f_1;
    var tmp0_elvis_lhs = tmp instanceof CollectingTracer ? tmp : null;
    var tmp_0;
    if (tmp0_elvis_lhs == null) {
      return null;
    } else {
      tmp_0 = tmp0_elvis_lhs;
    }
    var c = tmp_0;
    var tmp_1;
    if (!(output == null) ? isInterface(output, KtMap) : false) {
      // Inline function 'kotlin.collections.mapNotNull' call
      var tmp0 = output.z1();
      // Inline function 'kotlin.collections.mapNotNullTo' call
      var destination = ArrayList_init_$Create$();
      // Inline function 'kotlin.collections.forEach' call
      var _iterator__ex2g4s = tmp0.g();
      while (_iterator__ex2g4s.h()) {
        var element = _iterator__ex2g4s.i();
        var tmp0_safe_receiver = element == null ? null : toString(element);
        if (tmp0_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          destination.e(tmp0_safe_receiver);
        }
      }
      tmp_1 = destination;
    } else {
      if (!(output == null) ? isInterface(output, KtList) : false) {
        // Inline function 'kotlin.collections.map' call
        var this_0 = get_indices(output);
        // Inline function 'kotlin.collections.mapTo' call
        var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
        var inductionVariable = this_0.t_1;
        var last = this_0.u_1;
        if (inductionVariable <= last)
          do {
            var item = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var tmp$ret$7 = item.toString();
            destination_0.e(tmp$ret$7);
          }
           while (!(item === last));
        tmp_1 = destination_0;
      } else {
        tmp_1 = toList(c.p1o());
      }
    }
    var keys = tmp_1;
    var results = LinkedHashMap_init_$Create$();
    var _iterator__ex2g4s_0 = keys.g();
    while (_iterator__ex2g4s_0.h()) {
      var key = _iterator__ex2g4s_0.i();
      c.t1o(key);
      var explanation = c.o1o(key);
      if (!(explanation == null)) {
        // Inline function 'kotlin.collections.set' call
        results.g2(key, explanation);
      }
    }
    return results.p() ? null : results;
  };
  var Debug_instance;
  function Debug_getInstance() {
    return Debug_instance;
  }
  function TimelineEntry(at, kind, label) {
    this.w1o_1 = at;
    this.x1o_1 = kind;
    this.y1o_1 = label;
  }
  protoOf(TimelineEntry).toString = function () {
    return 'TimelineEntry(at=' + Duration__toString_impl_8d916b(this.w1o_1) + ', kind=' + this.x1o_1 + ', label=' + this.y1o_1 + ')';
  };
  protoOf(TimelineEntry).hashCode = function () {
    var result = Duration__hashCode_impl_u4exz6(this.w1o_1);
    result = imul(result, 31) + getStringHashCode(this.x1o_1) | 0;
    result = imul(result, 31) + (this.y1o_1 == null ? 0 : getStringHashCode(this.y1o_1)) | 0;
    return result;
  };
  protoOf(TimelineEntry).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TimelineEntry))
      return false;
    var tmp0_other_with_cast = other instanceof TimelineEntry ? other : THROW_CCE();
    if (!equals_0(this.w1o_1, tmp0_other_with_cast.w1o_1))
      return false;
    if (!(this.x1o_1 === tmp0_other_with_cast.x1o_1))
      return false;
    if (!(this.y1o_1 == tmp0_other_with_cast.y1o_1))
      return false;
    return true;
  };
  function Hotspot(kind, name, calls, total, mean) {
    this.z1o_1 = kind;
    this.a1p_1 = name;
    this.b1p_1 = calls;
    this.c1p_1 = total;
    this.d1p_1 = mean;
  }
  protoOf(Hotspot).toString = function () {
    return 'Hotspot(kind=' + this.z1o_1 + ', name=' + this.a1p_1 + ', calls=' + this.b1p_1 + ', total=' + Duration__toString_impl_8d916b(this.c1p_1) + ', mean=' + Duration__toString_impl_8d916b(this.d1p_1) + ')';
  };
  protoOf(Hotspot).hashCode = function () {
    var result = getStringHashCode(this.z1o_1);
    result = imul(result, 31) + (this.a1p_1 == null ? 0 : getStringHashCode(this.a1p_1)) | 0;
    result = imul(result, 31) + this.b1p_1 | 0;
    result = imul(result, 31) + Duration__hashCode_impl_u4exz6(this.c1p_1) | 0;
    result = imul(result, 31) + Duration__hashCode_impl_u4exz6(this.d1p_1) | 0;
    return result;
  };
  protoOf(Hotspot).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Hotspot))
      return false;
    var tmp0_other_with_cast = other instanceof Hotspot ? other : THROW_CCE();
    if (!(this.z1o_1 === tmp0_other_with_cast.z1o_1))
      return false;
    if (!(this.a1p_1 == tmp0_other_with_cast.a1p_1))
      return false;
    if (!(this.b1p_1 === tmp0_other_with_cast.b1p_1))
      return false;
    if (!equals_0(this.c1p_1, tmp0_other_with_cast.c1p_1))
      return false;
    if (!equals_0(this.d1p_1, tmp0_other_with_cast.d1p_1))
      return false;
    return true;
  };
  function WatchInfo(last, changes) {
    this.e1p_1 = last;
    this.f1p_1 = changes;
  }
  protoOf(WatchInfo).toString = function () {
    return 'WatchInfo(last=' + toString_0(this.e1p_1) + ', changes=' + this.f1p_1 + ')';
  };
  protoOf(WatchInfo).hashCode = function () {
    var result = this.e1p_1 == null ? 0 : hashCode(this.e1p_1);
    result = imul(result, 31) + this.f1p_1 | 0;
    return result;
  };
  protoOf(WatchInfo).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof WatchInfo))
      return false;
    var tmp0_other_with_cast = other instanceof WatchInfo ? other : THROW_CCE();
    if (!equals_0(this.e1p_1, tmp0_other_with_cast.e1p_1))
      return false;
    if (!(this.f1p_1 === tmp0_other_with_cast.f1p_1))
      return false;
    return true;
  };
  function Checkpoint(at, label) {
    this.g1p_1 = at;
    this.h1p_1 = label;
  }
  protoOf(Checkpoint).toString = function () {
    return 'Checkpoint(at=' + Duration__toString_impl_8d916b(this.g1p_1) + ', label=' + this.h1p_1 + ')';
  };
  protoOf(Checkpoint).hashCode = function () {
    var result = Duration__hashCode_impl_u4exz6(this.g1p_1);
    result = imul(result, 31) + (this.h1p_1 == null ? 0 : getStringHashCode(this.h1p_1)) | 0;
    return result;
  };
  protoOf(Checkpoint).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Checkpoint))
      return false;
    var tmp0_other_with_cast = other instanceof Checkpoint ? other : THROW_CCE();
    if (!equals_0(this.g1p_1, tmp0_other_with_cast.g1p_1))
      return false;
    if (!(this.h1p_1 == tmp0_other_with_cast.h1p_1))
      return false;
    return true;
  };
  function TraceReportData(totalEvents, duration, timelineSample, hotspots, watches, checkpoints, explanations, instructions) {
    this.q1g_1 = totalEvents;
    this.r1g_1 = duration;
    this.s1g_1 = timelineSample;
    this.t1g_1 = hotspots;
    this.u1g_1 = watches;
    this.v1g_1 = checkpoints;
    this.w1g_1 = explanations;
    this.x1g_1 = instructions;
  }
  protoOf(TraceReportData).toString = function () {
    return 'TraceReportData(totalEvents=' + this.q1g_1 + ', duration=' + Duration__toString_impl_8d916b(this.r1g_1) + ', timelineSample=' + toString(this.s1g_1) + ', hotspots=' + toString(this.t1g_1) + ', watches=' + toString(this.u1g_1) + ', checkpoints=' + toString(this.v1g_1) + ', explanations=' + toString(this.w1g_1) + ', instructions=' + toString(this.x1g_1) + ')';
  };
  protoOf(TraceReportData).hashCode = function () {
    var result = this.q1g_1;
    result = imul(result, 31) + Duration__hashCode_impl_u4exz6(this.r1g_1) | 0;
    result = imul(result, 31) + hashCode(this.s1g_1) | 0;
    result = imul(result, 31) + hashCode(this.t1g_1) | 0;
    result = imul(result, 31) + hashCode(this.u1g_1) | 0;
    result = imul(result, 31) + hashCode(this.v1g_1) | 0;
    result = imul(result, 31) + hashCode(this.w1g_1) | 0;
    result = imul(result, 31) + hashCode(this.x1g_1) | 0;
    return result;
  };
  protoOf(TraceReportData).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TraceReportData))
      return false;
    var tmp0_other_with_cast = other instanceof TraceReportData ? other : THROW_CCE();
    if (!(this.q1g_1 === tmp0_other_with_cast.q1g_1))
      return false;
    if (!equals_0(this.r1g_1, tmp0_other_with_cast.r1g_1))
      return false;
    if (!equals_0(this.s1g_1, tmp0_other_with_cast.s1g_1))
      return false;
    if (!equals_0(this.t1g_1, tmp0_other_with_cast.t1g_1))
      return false;
    if (!equals_0(this.u1g_1, tmp0_other_with_cast.u1g_1))
      return false;
    if (!equals_0(this.v1g_1, tmp0_other_with_cast.v1g_1))
      return false;
    if (!equals_0(this.w1g_1, tmp0_other_with_cast.w1g_1))
      return false;
    if (!equals_0(this.x1g_1, tmp0_other_with_cast.x1g_1))
      return false;
    return true;
  };
  function sam$kotlin_Comparator$0_0(function_0) {
    this.i1p_1 = function_0;
  }
  protoOf(sam$kotlin_Comparator$0_0).sb = function (a, b) {
    return this.i1p_1(a, b);
  };
  protoOf(sam$kotlin_Comparator$0_0).compare = function (a, b) {
    return this.sb(a, b);
  };
  protoOf(sam$kotlin_Comparator$0_0).i3 = function () {
    return this.i1p_1;
  };
  protoOf(sam$kotlin_Comparator$0_0).equals = function (other) {
    var tmp;
    if (!(other == null) ? isInterface(other, Comparator) : false) {
      var tmp_0;
      if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
        tmp_0 = equals_0(this.i3(), other.i3());
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(sam$kotlin_Comparator$0_0).hashCode = function () {
    return hashCode(this.i3());
  };
  function from$keyOf(kind, name) {
    return new Pair(kind, name);
  }
  function from$_anonymous_$renderPath_gvo9ec(root, path) {
    if (path.p())
      return root;
    var sb = new StringBuilder(root);
    var _iterator__ex2g4s = path.g();
    while (_iterator__ex2g4s.h()) {
      var seg = _iterator__ex2g4s.i();
      var tmp;
      if (typeof seg === 'number') {
        tmp = true;
      } else {
        var tmp_0;
        if (seg instanceof Long) {
          tmp_0 = true;
        } else {
          tmp_0 = seg instanceof BLBigInt;
        }
        tmp = tmp_0;
      }
      if (tmp)
        sb.x7(_Char___init__impl__6a9atx(91)).v7(seg).x7(_Char___init__impl__6a9atx(93));
      else {
        sb.x7(_Char___init__impl__6a9atx(46)).w7(toString(seg));
      }
    }
    return sb.toString();
  }
  function TraceReport$from$Frame(kind, name, start) {
    this.j1p_1 = kind;
    this.k1p_1 = name;
    this.l1p_1 = start;
  }
  protoOf(TraceReport$from$Frame).toString = function () {
    return 'Frame(kind=' + this.j1p_1 + ', name=' + this.k1p_1 + ', start=' + Duration__toString_impl_8d916b(this.l1p_1) + ')';
  };
  protoOf(TraceReport$from$Frame).hashCode = function () {
    var result = getStringHashCode(this.j1p_1);
    result = imul(result, 31) + (this.k1p_1 == null ? 0 : getStringHashCode(this.k1p_1)) | 0;
    result = imul(result, 31) + Duration__hashCode_impl_u4exz6(this.l1p_1) | 0;
    return result;
  };
  protoOf(TraceReport$from$Frame).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TraceReport$from$Frame))
      return false;
    var tmp0_other_with_cast = other instanceof TraceReport$from$Frame ? other : THROW_CCE();
    if (!(this.j1p_1 === tmp0_other_with_cast.j1p_1))
      return false;
    if (!(this.k1p_1 == tmp0_other_with_cast.k1p_1))
      return false;
    if (!equals_0(this.l1p_1, tmp0_other_with_cast.l1p_1))
      return false;
    return true;
  };
  function TraceReport$from$Agg(calls, total) {
    calls = calls === VOID ? 0 : calls;
    total = total === VOID ? Companion_getInstance().ec_1 : total;
    this.m1p_1 = calls;
    this.n1p_1 = total;
  }
  protoOf(TraceReport$from$Agg).toString = function () {
    return 'Agg(calls=' + this.m1p_1 + ', total=' + Duration__toString_impl_8d916b(this.n1p_1) + ')';
  };
  protoOf(TraceReport$from$Agg).hashCode = function () {
    var result = this.m1p_1;
    result = imul(result, 31) + Duration__hashCode_impl_u4exz6(this.n1p_1) | 0;
    return result;
  };
  protoOf(TraceReport$from$Agg).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TraceReport$from$Agg))
      return false;
    var tmp0_other_with_cast = other instanceof TraceReport$from$Agg ? other : THROW_CCE();
    if (!(this.m1p_1 === tmp0_other_with_cast.m1p_1))
      return false;
    if (!equals_0(this.n1p_1, tmp0_other_with_cast.n1p_1))
      return false;
    return true;
  };
  function TraceReport$from$lambda(a, b) {
    // Inline function 'kotlin.comparisons.compareValuesBy' call
    var tmp = new Duration(b.c1p_1);
    var tmp$ret$1 = new Duration(a.c1p_1);
    return compareValues(tmp, tmp$ret$1);
  }
  function TraceReport() {
  }
  protoOf(TraceReport).o1p = function (t, sample, maxExplains) {
    var timed = t.h1o_1;
    var totalEvents = timed.j();
    var duration = timed.p() ? Companion_getInstance().ec_1 : last(timed).c1n_1;
    var stack = ArrayList_init_$Create$();
    var agg = LinkedHashMap_init_$Create$();
    var _iterator__ex2g4s = timed.g();
    while (_iterator__ex2g4s.h()) {
      var ev = _iterator__ex2g4s.i();
      var e = ev.d1n_1;
      if (e instanceof Call)
        stack.e(new TraceReport$from$Frame(e.l1m_1, e.m1m_1, ev.c1n_1));
      else {
        if (e instanceof Return) {
          var tmp$ret$1;
          $l$block: {
            // Inline function 'kotlin.collections.indexOfLast' call
            var iterator = stack.q(stack.j());
            while (iterator.j4()) {
              var it = iterator.l4();
              if (it.j1p_1 === e.p1m_1 && it.k1p_1 == e.q1m_1) {
                tmp$ret$1 = iterator.k4();
                break $l$block;
              }
            }
            tmp$ret$1 = -1;
          }
          var idx = tmp$ret$1;
          if (idx >= 0) {
            var fr = stack.f2(idx);
            var k = from$keyOf(fr.j1p_1, fr.k1p_1);
            // Inline function 'kotlin.collections.getOrPut' call
            var value = agg.y1(k);
            var tmp;
            if (value == null) {
              var answer = new TraceReport$from$Agg();
              agg.g2(k, answer);
              tmp = answer;
            } else {
              tmp = value;
            }
            var a = tmp;
            a.m1p_1 = a.m1p_1 + 1 | 0;
            a.n1p_1 = Duration__plus_impl_yu9v8f(a.n1p_1, Duration__minus_impl_q5cfm7(ev.c1n_1, fr.l1p_1));
          }
        }
      }
    }
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$_0(agg.j());
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_0 = agg.b2().g();
    while (_iterator__ex2g4s_0.h()) {
      var item = _iterator__ex2g4s_0.i();
      // Inline function 'kotlin.collections.component1' call
      var k_0 = item.u1();
      // Inline function 'kotlin.collections.component2' call
      var a_0 = item.v1();
      var tmp$ret$7 = new Hotspot(k_0.vd_1, k_0.wd_1, a_0.m1p_1, a_0.n1p_1, a_0.m1p_1 === 0 ? Companion_getInstance().ec_1 : Duration__div_impl_dknbf4(a_0.n1p_1, a_0.m1p_1));
      destination.e(tmp$ret$7);
    }
    // Inline function 'kotlin.collections.sortedByDescending' call
    // Inline function 'kotlin.comparisons.compareByDescending' call
    var tmp_0 = TraceReport$from$lambda;
    var tmp$ret$10 = new sam$kotlin_Comparator$0_0(tmp_0);
    var hotspots = sortedWith(destination, tmp$ret$10);
    var watches = LinkedHashMap_init_$Create$();
    var lastVal = HashMap_init_$Create$();
    var changes = HashMap_init_$Create$();
    var _iterator__ex2g4s_1 = timed.g();
    while (_iterator__ex2g4s_1.h()) {
      var ev_0 = _iterator__ex2g4s_1.i();
      var e_0 = ev_0.d1n_1;
      if (e_0 instanceof Read) {
        var name = e_0.t1m_1;
        var old = lastVal.y1(name);
        var tmp_1;
        // Inline function 'kotlin.collections.contains' call
        // Inline function 'kotlin.collections.containsKey' call
        if (!(isInterface(lastVal, KtMap) ? lastVal : THROW_CCE()).w1(name)) {
          tmp_1 = true;
        } else {
          tmp_1 = !equals_0(old, e_0.u1m_1);
        }
        if (tmp_1) {
          // Inline function 'kotlin.collections.set' call
          var value_0 = e_0.u1m_1;
          lastVal.g2(name, value_0);
          var tmp0_elvis_lhs = changes.y1(name);
          // Inline function 'kotlin.collections.set' call
          var value_1 = (tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs) + 1 | 0;
          changes.g2(name, value_1);
        }
      }
    }
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s_2 = lastVal.b2().g();
    while (_iterator__ex2g4s_2.h()) {
      var _destruct__k2r9zo = _iterator__ex2g4s_2.i();
      // Inline function 'kotlin.collections.component1' call
      var n = _destruct__k2r9zo.u1();
      // Inline function 'kotlin.collections.component2' call
      var v = _destruct__k2r9zo.v1();
      var tmp1_elvis_lhs = changes.y1(n);
      // Inline function 'kotlin.collections.set' call
      var value_2 = new WatchInfo(v, coerceAtLeast(tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs, 1));
      watches.g2(n, value_2);
    }
    // Inline function 'kotlin.collections.mapNotNull' call
    // Inline function 'kotlin.collections.mapNotNullTo' call
    var destination_0 = ArrayList_init_$Create$();
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s_3 = timed.g();
    while (_iterator__ex2g4s_3.h()) {
      var element = _iterator__ex2g4s_3.i();
      var e_1 = element.d1n_1;
      var tmp_2;
      var tmp_3;
      if (e_1 instanceof Call) {
        tmp_3 = e_1.l1m_1 === 'CHECKPOINT';
      } else {
        tmp_3 = false;
      }
      if (tmp_3) {
        tmp_2 = new Checkpoint(element.c1n_1, e_1.m1m_1);
      } else {
        tmp_2 = null;
      }
      var tmp0_safe_receiver = tmp_2;
      if (tmp0_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        destination_0.e(tmp0_safe_receiver);
      }
    }
    var checkpoints = destination_0;
    // Inline function 'kotlin.collections.map' call
    var this_0 = take(timed, sample);
    // Inline function 'kotlin.collections.mapTo' call
    var destination_1 = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s_4 = this_0.g();
    while (_iterator__ex2g4s_4.h()) {
      var item_0 = _iterator__ex2g4s_4.i();
      var e_2 = item_0.d1n_1;
      var tmp_4;
      if (e_2 instanceof Call) {
        tmp_4 = new TimelineEntry(item_0.c1n_1, 'call:' + e_2.l1m_1, e_2.m1m_1);
      } else {
        if (e_2 instanceof Return) {
          tmp_4 = new TimelineEntry(item_0.c1n_1, 'ret:' + e_2.p1m_1, e_2.q1m_1);
        } else {
          if (e_2 instanceof Let) {
            tmp_4 = new TimelineEntry(item_0.c1n_1, 'let', e_2.d1m_1);
          } else {
            if (e_2 instanceof PathWrite) {
              tmp_4 = new TimelineEntry(item_0.c1n_1, e_2.g1m_1, from$_anonymous_$renderPath_gvo9ec(e_2.h1m_1, e_2.i1m_1));
            } else {
              if (e_2 instanceof Output) {
                tmp_4 = new TimelineEntry(item_0.c1n_1, 'output', null);
              } else {
                if (e_2 instanceof Read) {
                  tmp_4 = new TimelineEntry(item_0.c1n_1, 'read', e_2.t1m_1);
                } else {
                  if (e_2 instanceof Enter) {
                    tmp_4 = new TimelineEntry(item_0.c1n_1, 'enter', getKClassFromExpression(e_2.b1m_1).m9());
                  } else {
                    if (e_2 instanceof Exit) {
                      tmp_4 = new TimelineEntry(item_0.c1n_1, 'exit', getKClassFromExpression(e_2.c1m_1).m9());
                    } else {
                      if (e_2 instanceof EvalEnter) {
                        tmp_4 = new TimelineEntry(item_0.c1n_1, 'eval-enter', getKClassFromExpression(e_2.v1m_1).m9());
                      } else {
                        if (e_2 instanceof EvalExit) {
                          tmp_4 = new TimelineEntry(item_0.c1n_1, 'eval-exit', getKClassFromExpression(e_2.x1m_1).m9());
                        } else {
                          if (e_2 instanceof Error_0) {
                            tmp_4 = new TimelineEntry(item_0.c1n_1, 'error', e_2.a1n_1);
                          } else {
                            noWhenBranchMatchedException();
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      var tmp$ret$27 = tmp_4;
      destination_1.e(tmp$ret$27);
    }
    var timelineSample = destination_1;
    // Inline function 'kotlin.run' call
    var preferred = t.s1o();
    var tmp_5;
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!preferred.p()) {
      tmp_5 = preferred;
    } else {
      tmp_5 = t.p1o();
    }
    var seed = tmp_5;
    var tmp_6;
    if (seed.p()) {
      tmp_6 = emptyList();
    } else {
      var closure = LinkedHashSet_init_$Create$();
      var queue = ArrayDeque_init_$Create$();
      queue.n(seed);
      $l$loop_0: while (true) {
        // Inline function 'kotlin.collections.isNotEmpty' call
        if (!!queue.p()) {
          break $l$loop_0;
        }
        var name_0 = queue.fd();
        if (!closure.e(name_0))
          continue $l$loop_0;
        var explanation = t.o1o(name_0);
        if (!(explanation == null)) {
          var tmp_7 = explanation.y1('steps');
          var tmp0_elvis_lhs_0 = (!(tmp_7 == null) ? isInterface(tmp_7, KtList) : false) ? tmp_7 : null;
          var steps = tmp0_elvis_lhs_0 == null ? emptyList() : tmp0_elvis_lhs_0;
          if (steps.p()) {
            var deps = t.q1o(name_0);
            var _iterator__ex2g4s_5 = deps.g();
            while (_iterator__ex2g4s_5.h()) {
              var dep = _iterator__ex2g4s_5.i();
              if (!closure.s1(dep) && t.p1o().s1(dep)) {
                queue.ed(dep);
              }
            }
          } else {
            var deps_0 = t.q1o(name_0);
            var _iterator__ex2g4s_6 = deps_0.g();
            while (_iterator__ex2g4s_6.h()) {
              var dep_0 = _iterator__ex2g4s_6.i();
              if (!closure.s1(dep_0) && t.p1o().s1(dep_0)) {
                queue.ed(dep_0);
              }
            }
          }
        }
      }
      // Inline function 'kotlin.collections.map' call
      var this_1 = take(closure, maxExplains);
      // Inline function 'kotlin.collections.mapTo' call
      var destination_2 = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_1, 10));
      var _iterator__ex2g4s_7 = this_1.g();
      while (_iterator__ex2g4s_7.h()) {
        var item_1 = _iterator__ex2g4s_7.i();
        var tmp$ret$32 = t.u1o(item_1);
        destination_2.e(tmp$ret$32);
      }
      tmp_6 = destination_2;
    }
    var explainLines = tmp_6;
    return new TraceReportData(totalEvents, duration, timelineSample, hotspots, watches, checkpoints, explainLines, toMap_0(t.u1n_1));
  };
  protoOf(TraceReport).y1g = function (t, sample, maxExplains, $super) {
    sample = sample === VOID ? 25 : sample;
    maxExplains = maxExplains === VOID ? 8 : maxExplains;
    return $super === VOID ? this.o1p(t, sample, maxExplains) : $super.o1p.call(this, t, sample, maxExplains);
  };
  var TraceReport_instance;
  function TraceReport_getInstance() {
    return TraceReport_instance;
  }
  function isNumeric(x) {
    var tmp;
    var tmp_0;
    var tmp_1;
    var tmp_2;
    if (!(x == null) ? typeof x === 'number' : false) {
      tmp_2 = true;
    } else {
      tmp_2 = x instanceof Long;
    }
    if (tmp_2) {
      tmp_1 = true;
    } else {
      tmp_1 = !(x == null) ? typeof x === 'number' : false;
    }
    if (tmp_1) {
      tmp_0 = true;
    } else {
      tmp_0 = isBigInt(x);
    }
    if (tmp_0) {
      tmp = true;
    } else {
      tmp = isBigDec(x);
    }
    return tmp;
  }
  function toBLBigInt(n) {
    var tmp;
    if (isBigInt(n)) {
      tmp = n instanceof BLBigInt ? n : THROW_CCE();
    } else {
      if (isBigDec(n)) {
        tmp = toBLBigInt_0(n instanceof BLBigDec ? n : THROW_CCE());
      } else {
        if (n instanceof Long) {
          tmp = blBigIntOfLong(n);
        } else {
          if (typeof n === 'number') {
            tmp = blBigIntOfLong(toLong(n));
          } else {
            tmp = blBigIntOfLong(numberToLong(n));
          }
        }
      }
    }
    return tmp;
  }
  function toBLBigDec(n) {
    var tmp;
    if (isBigDec(n)) {
      tmp = n instanceof BLBigDec ? n : THROW_CCE();
    } else {
      if (isBigInt(n)) {
        tmp = toBLBigDec_0(n instanceof BLBigInt ? n : THROW_CCE());
      } else {
        if (n instanceof Long) {
          tmp = blBigDecOfLong(n);
        } else {
          if (typeof n === 'number') {
            tmp = blBigDecOfLong(toLong(n));
          } else {
            if (typeof n === 'number') {
              tmp = blBigDecOfDouble(n);
            } else {
              if (typeof n === 'number') {
                tmp = blBigDecOfDouble(n);
              } else {
                tmp = blBigDecParse(toString(n));
              }
            }
          }
        }
      }
    }
    return tmp;
  }
  function addNum(a, b) {
    var tmp;
    if (isBigDec(a) || isBigDec(b)) {
      tmp = plus_1(toBLBigDec(a), toBLBigDec(b));
    } else {
      if (isBigInt(a) || isBigInt(b)) {
        tmp = plus_0(toBLBigInt(a), toBLBigInt(b));
      } else {
        var tmp_0;
        if (typeof a === 'number') {
          tmp_0 = true;
        } else {
          tmp_0 = typeof b === 'number';
        }
        if (tmp_0) {
          tmp = numberToDouble(a) + numberToDouble(b);
        } else {
          var tmp_1;
          if (a instanceof Long) {
            tmp_1 = true;
          } else {
            tmp_1 = b instanceof Long;
          }
          if (tmp_1) {
            tmp = numberToLong(a).q2(numberToLong(b));
          } else {
            tmp = numberToInt(a) + numberToInt(b) | 0;
          }
        }
      }
    }
    return tmp;
  }
  function subNum(a, b) {
    var tmp;
    if (isBigDec(a) || isBigDec(b)) {
      tmp = minus_0(toBLBigDec(a), toBLBigDec(b));
    } else {
      if (isBigInt(a) || isBigInt(b)) {
        tmp = minus(toBLBigInt(a), toBLBigInt(b));
      } else {
        var tmp_0;
        if (typeof a === 'number') {
          tmp_0 = true;
        } else {
          tmp_0 = typeof b === 'number';
        }
        if (tmp_0) {
          tmp = numberToDouble(a) - numberToDouble(b);
        } else {
          var tmp_1;
          if (a instanceof Long) {
            tmp_1 = true;
          } else {
            tmp_1 = b instanceof Long;
          }
          if (tmp_1) {
            tmp = numberToLong(a).r2(numberToLong(b));
          } else {
            tmp = numberToInt(a) - numberToInt(b) | 0;
          }
        }
      }
    }
    return tmp;
  }
  function mulNum(a, b) {
    var tmp;
    if (isBigDec(a) || isBigDec(b)) {
      tmp = times_0(toBLBigDec(a), toBLBigDec(b));
    } else {
      if (isBigInt(a) || isBigInt(b)) {
        tmp = times(toBLBigInt(a), toBLBigInt(b));
      } else {
        var tmp_0;
        if (a instanceof Long) {
          tmp_0 = true;
        } else {
          tmp_0 = b instanceof Long;
        }
        if (tmp_0) {
          tmp = numberToLong(a).s2(numberToLong(b));
        } else {
          var tmp_1;
          if (typeof a === 'number') {
            tmp_1 = true;
          } else {
            tmp_1 = typeof b === 'number';
          }
          if (tmp_1) {
            tmp = numberToDouble(a) * numberToDouble(b);
          } else {
            tmp = imul(numberToInt(a), numberToInt(b));
          }
        }
      }
    }
    return tmp;
  }
  function remNum(a, b) {
    var tmp;
    if (isBigDec(a) || isBigDec(b)) {
      tmp = rem_0(toBLBigDec(a), toBLBigDec(b));
    } else {
      if (isBigInt(a) || isBigInt(b)) {
        tmp = rem(toBLBigInt(a), toBLBigInt(b));
      } else {
        var tmp_0;
        if (a instanceof Long) {
          tmp_0 = true;
        } else {
          tmp_0 = b instanceof Long;
        }
        if (tmp_0) {
          tmp = numberToLong(a).u2(numberToLong(b));
        } else {
          tmp = numberToInt(a) % numberToInt(b) | 0;
        }
      }
    }
    return tmp;
  }
  function divNum(a, b) {
    if (isBigDec(a) || isBigDec(b))
      return div_0(toBLBigDec(a), toBLBigDec(b));
    var ai = toBLBigInt(a);
    var bi = toBLBigInt(b);
    var rem_0 = rem(ai, bi);
    var tmp;
    if (signum(rem_0) === 0) {
      var q = div(ai, bi);
      tmp = bitLength(q) <= 31 ? toInt_0(q) : bitLength(q) <= 63 ? toLong_1(q) : q;
    } else {
      tmp = div_0(toBLBigDec(a), toBLBigDec(b));
    }
    return tmp;
  }
  function asBool(_this__u8e3s4) {
    var tmp;
    if (_this__u8e3s4 == null) {
      tmp = false;
    } else {
      if (!(_this__u8e3s4 == null) ? typeof _this__u8e3s4 === 'boolean' : false) {
        tmp = _this__u8e3s4;
      } else {
        if (isNumber(_this__u8e3s4)) {
          tmp = !(numberToDouble(_this__u8e3s4) === 0.0);
        } else {
          tmp = true;
        }
      }
    }
    return tmp;
  }
  function num(x) {
    return numberToDouble(isNumber(x) ? x : THROW_CCE());
  }
  function unwrapKey(k) {
    var tmp;
    if (k instanceof Name) {
      tmp = _Name___get_v__impl__vuc4w5(k.t1e_1);
    } else {
      if (k instanceof I32) {
        tmp = _I32___get_v__impl__4258ps(k.y1e_1);
      } else {
        if (k instanceof I64) {
          tmp = _I64___get_v__impl__gpphb3(k.z1e_1);
        } else {
          if (k instanceof IBig) {
            tmp = _IBig___get_v__impl__986dq1(k.g1f_1);
          } else {
            noWhenBranchMatchedException();
          }
        }
      }
    }
    return tmp;
  }
  function unwrapNum(n) {
    var tmp;
    if (n instanceof I32) {
      tmp = _I32___get_v__impl__4258ps(n.y1e_1);
    } else {
      if (n instanceof I64) {
        tmp = _I64___get_v__impl__gpphb3(n.z1e_1);
      } else {
        if (n instanceof IBig) {
          tmp = _IBig___get_v__impl__986dq1(n.g1f_1);
        } else {
          if (n instanceof Dec) {
            tmp = _Dec___get_v__impl__aicz3a(n.f1f_1);
          } else {
            noWhenBranchMatchedException();
          }
        }
      }
    }
    return tmp;
  }
  function unwrapComputedKey(v) {
    var tmp;
    if (!(v == null) ? typeof v === 'string' : false) {
      tmp = v;
    } else {
      if (!(v == null) ? typeof v === 'number' : false) {
        // Inline function 'kotlin.require' call
        if (!(v >= 0)) {
          var message = 'Computed key must be non-negative integer';
          throw IllegalArgumentException_init_$Create$(toString(message));
        }
        tmp = v;
      } else {
        if (v instanceof Long) {
          // Inline function 'kotlin.require' call
          if (!(v.z(new Long(0, 0)) >= 0)) {
            var message_0 = 'Computed key must be non-negative integer';
            throw IllegalArgumentException_init_$Create$(toString(message_0));
          }
          tmp = v;
        } else {
          var tmp_0;
          if (isBigInt(v)) {
            var bi = v instanceof BLBigInt ? v : THROW_CCE();
            // Inline function 'kotlin.require' call
            if (!(signum(bi) >= 0)) {
              var message_1 = 'Computed key must be non-negative integer';
              throw IllegalArgumentException_init_$Create$(toString(message_1));
            }
            tmp_0 = bi;
          } else {
            var message_2 = 'Computed key must be string or non-negative integer';
            throw IllegalStateException_init_$Create$(toString(message_2));
          }
          tmp = tmp_0;
        }
      }
    }
    return tmp;
  }
  function traceRead($this, name, value) {
    var t = Debug_instance.h1f_1;
    if (!(t == null) && (t.k1o().s1l_1.p() || t.k1o().s1l_1.s1(name))) {
      t.l1o(new Read(name, value));
    }
  }
  function renderNextPathSegment($this, container, segLabel, isDynamic) {
    var tmp;
    if (!(container == null) ? isInterface(container, KtList) : false) {
      tmp = '[' + segLabel + ']';
    } else {
      var tmp_0;
      var tmp_1;
      if (isDynamic) {
        var tmp$ret$1;
        $l$block: {
          // Inline function 'kotlin.text.any' call
          var inductionVariable = 0;
          while (inductionVariable < charSequenceLength(segLabel)) {
            var element = charSequenceGet(segLabel, inductionVariable);
            inductionVariable = inductionVariable + 1 | 0;
            if (element === _Char___init__impl__6a9atx(46) || element === _Char___init__impl__6a9atx(91) || element === _Char___init__impl__6a9atx(93)) {
              tmp$ret$1 = true;
              break $l$block;
            }
          }
          tmp$ret$1 = false;
        }
        tmp_1 = tmp$ret$1;
      } else {
        tmp_1 = false;
      }
      if (tmp_1) {
        tmp_0 = '.' + segLabel;
      } else {
        tmp_0 = '.' + segLabel;
      }
      tmp = tmp_0;
    }
    return tmp;
  }
  function ExecResult(returned, value) {
    this.p1p_1 = returned;
    this.q1p_1 = value;
  }
  protoOf(ExecResult).toString = function () {
    return 'ExecResult(returned=' + this.p1p_1 + ', value=' + toString_0(this.q1p_1) + ')';
  };
  protoOf(ExecResult).hashCode = function () {
    var result = getBooleanHashCode(this.p1p_1);
    result = imul(result, 31) + (this.q1p_1 == null ? 0 : hashCode(this.q1p_1)) | 0;
    return result;
  };
  protoOf(ExecResult).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ExecResult))
      return false;
    var tmp0_other_with_cast = other instanceof ExecResult ? other : THROW_CCE();
    if (!(this.p1p_1 === tmp0_other_with_cast.p1p_1))
      return false;
    if (!equals_0(this.q1p_1, tmp0_other_with_cast.q1p_1))
      return false;
    return true;
  };
  function execFuncIR($this, ir, e) {
    var _iterator__ex2g4s = ir.g();
    while (_iterator__ex2g4s.h()) {
      var n = _iterator__ex2g4s.i();
      if (n instanceof IRLet) {
        var tmp2 = n.m1o_1;
        // Inline function 'kotlin.collections.set' call
        var value = $this.b1q(n.n1o_1, e);
        e.g2(tmp2, value);
      } else {
        if (n instanceof IRReturn) {
          var tmp1_safe_receiver = n.f1q_1;
          var tmp;
          if (tmp1_safe_receiver == null) {
            tmp = null;
          } else {
            // Inline function 'kotlin.let' call
            tmp = $this.b1q(tmp1_safe_receiver, e);
          }
          return new ExecResult(true, tmp);
        } else {
          if (n instanceof IRIf) {
            var cond = asBool($this.b1q(n.c1q_1, e));
            var tmp_0;
            if (cond) {
              tmp_0 = n.d1q_1;
            } else {
              var tmp2_elvis_lhs = n.e1q_1;
              tmp_0 = tmp2_elvis_lhs == null ? emptyList() : tmp2_elvis_lhs;
            }
            var branch = tmp_0;
            var res = execFuncIR($this, branch, e);
            if (res.p1p_1)
              return res;
          } else {
            if (n instanceof IRForEach) {
              var tmp_1 = $this.b1q(n.s1p_1, e);
              var tmp3_elvis_lhs = (!(tmp_1 == null) ? isInterface(tmp_1, Iterable) : false) ? tmp_1 : null;
              var tmp_2;
              if (tmp3_elvis_lhs == null) {
                var message = 'func FOR EACH iterable must be list';
                throw IllegalStateException_init_$Create$(toString(message));
              } else {
                tmp_2 = tmp3_elvis_lhs;
              }
              var iter = tmp_2;
              var snap = HashMap_init_$Create$_0(e);
              var _iterator__ex2g4s_0 = iter.g();
              while (_iterator__ex2g4s_0.h()) {
                var item = _iterator__ex2g4s_0.i();
                e.c2();
                e.i2(snap);
                // Inline function 'kotlin.collections.set' call
                var key = n.r1p_1;
                e.g2(key, item);
                var res_0 = execFuncIR($this, n.u1p_1, e);
                if (res_0.p1p_1)
                  return res_0;
              }
            } else {
              // Inline function 'kotlin.error' call
              var message_0 = 'Only LET/RETURN/IF/FOR in FUNC body';
              throw IllegalStateException_init_$Create$(toString(message_0));
            }
          }
        }
      }
    }
    return new ExecResult(false, null);
  }
  function handleLambda($this, e, env) {
    var captured = HashMap_init_$Create$_0(env);
    var tmp = e.b1l_1;
    var tmp0_safe_receiver = tmp instanceof BlockBody ? tmp : null;
    var tmp_0;
    if (tmp0_safe_receiver == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp_0 = (new ToIR($this.w1p_1, $this.v1p_1)).k1g(tmp0_safe_receiver.t1h_1.y1j_1);
    }
    var compiled = tmp_0;
    return Evaluator$handleLambda$lambda(captured, e, $this, compiled);
  }
  function handleFuncCall($this, c, env) {
    // Inline function 'kotlin.collections.map' call
    var this_0 = c.o1k_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      var tmp$ret$0 = $this.b1q(item, env);
      destination.e(tmp$ret$0);
    }
    var args = destination;
    var tmp0_safe_receiver = $this.v1p_1.y1(c.n1k_1.n1e_1);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'v2.ir.Evaluator.tracedCall' call
      var name = c.n1k_1.n1e_1;
      var t = Debug_instance.h1f_1;
      var tmp1_safe_receiver = t == null ? null : t.k1o();
      if ((tmp1_safe_receiver == null ? null : tmp1_safe_receiver.w1l_1) === true) {
        t.l1o(new Call('HOST', name, args));
      }
      var tmp;
      try {
        var r = tmp0_safe_receiver(args);
        var tmp3_safe_receiver = t == null ? null : t.k1o();
        if ((tmp3_safe_receiver == null ? null : tmp3_safe_receiver.w1l_1) === true) {
          t.l1o(new Return('HOST', name, r));
        }
        tmp = r;
      } catch ($p) {
        var tmp_0;
        if ($p instanceof Error) {
          var ex = $p;
          if (t == null)
            null;
          else {
            t.l1o(new Error_0('call ' + 'HOST' + ' ' + (name == null ? '<lambda>' : name), ex));
          }
          throw ex;
        } else {
          throw $p;
        }
      }
      return tmp;
    }
    var tmp_1 = env.y1(c.n1k_1.n1e_1);
    var tmp1_safe_receiver_0 = (!(tmp_1 == null) ? typeof tmp_1 === 'function' : false) ? tmp_1 : null;
    if (tmp1_safe_receiver_0 == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'v2.ir.Evaluator.tracedCall' call
      var name_0 = c.n1k_1.n1e_1;
      var t_0 = Debug_instance.h1f_1;
      var tmp1_safe_receiver_1 = t_0 == null ? null : t_0.k1o();
      if ((tmp1_safe_receiver_1 == null ? null : tmp1_safe_receiver_1.w1l_1) === true) {
        t_0.l1o(new Call('CALL', name_0, args));
      }
      var tmp_2;
      try {
        var r_0 = tmp1_safe_receiver_0(args);
        var tmp3_safe_receiver_0 = t_0 == null ? null : t_0.k1o();
        if ((tmp3_safe_receiver_0 == null ? null : tmp3_safe_receiver_0.w1l_1) === true) {
          t_0.l1o(new Return('CALL', name_0, r_0));
        }
        tmp_2 = r_0;
      } catch ($p) {
        var tmp_3;
        if ($p instanceof Error) {
          var ex_0 = $p;
          if (t_0 == null)
            null;
          else {
            t_0.l1o(new Error_0('call ' + 'CALL' + ' ' + (name_0 == null ? '<lambda>' : name_0), ex_0));
          }
          throw ex_0;
        } else {
          throw $p;
        }
      }
      return tmp_2;
    }
    var tmp2_elvis_lhs = $this.w1p_1.y1(c.n1k_1.n1e_1);
    var tmp_4;
    if (tmp2_elvis_lhs == null) {
      var message = "FUNC '" + c.n1k_1.n1e_1 + "' undefined";
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      tmp_4 = tmp2_elvis_lhs;
    }
    var fd = tmp_4;
    // Inline function 'kotlin.apply' call
    var this_1 = HashMap_init_$Create$();
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s_0 = zip(fd.z1f_1, args).g();
    while (_iterator__ex2g4s_0.h()) {
      var element = _iterator__ex2g4s_0.i();
      var p = element.xd();
      var v = element.yd();
      // Inline function 'kotlin.collections.set' call
      this_1.g2(p, v);
    }
    var local = this_1;
    // Inline function 'v2.ir.Evaluator.tracedCall' call
    var name_1 = fd.y1f_1;
    var t_1 = Debug_instance.h1f_1;
    var tmp1_safe_receiver_2 = t_1 == null ? null : t_1.k1o();
    if ((tmp1_safe_receiver_2 == null ? null : tmp1_safe_receiver_2.w1l_1) === true) {
      t_1.l1o(new Call('FUNC', name_1, args));
    }
    var tmp_5;
    try {
      var body = fd.a1g_1;
      var tmp_6;
      if (body instanceof ExprBody) {
        tmp_6 = $this.b1q(body.r1h_1, local);
      } else {
        if (body instanceof BlockBody) {
          var tmp0 = $this.a1q_1;
          // Inline function 'kotlin.collections.getOrPut' call
          var key = fd.y1f_1;
          var value = tmp0.y1(key);
          var tmp_7;
          if (value == null) {
            var answer = (new ToIR($this.w1p_1, $this.v1p_1)).k1g(body.t1h_1.y1j_1);
            tmp0.g2(key, answer);
            tmp_7 = answer;
          } else {
            tmp_7 = value;
          }
          var irFn = tmp_7;
          tmp_6 = execFuncIR($this, irFn, local).q1p_1;
        } else {
          noWhenBranchMatchedException();
        }
      }
      var r_1 = tmp_6;
      var tmp3_safe_receiver_1 = t_1 == null ? null : t_1.k1o();
      if ((tmp3_safe_receiver_1 == null ? null : tmp3_safe_receiver_1.w1l_1) === true) {
        t_1.l1o(new Return('FUNC', name_1, r_1));
      }
      tmp_5 = r_1;
    } catch ($p) {
      var tmp_8;
      if ($p instanceof Error) {
        var ex_1 = $p;
        if (t_1 == null)
          null;
        else {
          t_1.l1o(new Error_0('call ' + 'FUNC' + ' ' + (name_1 == null ? '<lambda>' : name_1), ex_1));
        }
        throw ex_1;
      } else {
        throw $p;
      }
    }
    return tmp_5;
  }
  function handleBinary($this, e, env) {
    var l = $this.b1q(e.t1k_1, env);
    var tmp;
    switch (e.u1k_1.h1e_1.k2_1) {
      case 11:
        var r = $this.b1q(e.v1k_1, env);
        var tmp_0;
        var tmp_1;
        if (!(l == null) ? typeof l === 'string' : false) {
          tmp_1 = true;
        } else {
          tmp_1 = !(r == null) ? typeof r === 'string' : false;
        }

        if (tmp_1) {
          tmp_0 = toString_0(l) + toString_0(r);
        } else {
          // Inline function 'kotlin.require' call
          if (!(isNumeric(l) && isNumeric(r))) {
            var message = "Operator '+' expects numbers or strings";
            throw IllegalArgumentException_init_$Create$(toString(message));
          }
          var tmp_2 = isNumber(l) ? l : THROW_CCE();
          tmp_0 = addNum(tmp_2, isNumber(r) ? r : THROW_CCE());
        }

        tmp = tmp_0;
        break;
      case 12:
        var r_0 = $this.b1q(e.v1k_1, env);
        // Inline function 'kotlin.require' call

        if (!(isNumeric(l) && isNumeric(r_0))) {
          var message_0 = "Operator '-' expects numbers";
          throw IllegalArgumentException_init_$Create$(toString(message_0));
        }

        var tmp_3 = isNumber(l) ? l : THROW_CCE();
        tmp = subNum(tmp_3, isNumber(r_0) ? r_0 : THROW_CCE());
        break;
      case 13:
        var r_1 = $this.b1q(e.v1k_1, env);
        // Inline function 'kotlin.require' call

        if (!(isNumeric(l) && isNumeric(r_1))) {
          var message_1 = "Operator '*' expects numbers";
          throw IllegalArgumentException_init_$Create$(toString(message_1));
        }

        var tmp_4 = isNumber(l) ? l : THROW_CCE();
        tmp = mulNum(tmp_4, isNumber(r_1) ? r_1 : THROW_CCE());
        break;
      case 14:
        var r_2 = $this.b1q(e.v1k_1, env);
        // Inline function 'kotlin.require' call

        if (!(isNumeric(l) && isNumeric(r_2))) {
          var message_2 = "Operator '/' expects numbers";
          throw IllegalArgumentException_init_$Create$(toString(message_2));
        }

        var tmp_5 = isNumber(l) ? l : THROW_CCE();
        tmp = divNum(tmp_5, isNumber(r_2) ? r_2 : THROW_CCE());
        break;
      case 15:
        var r_3 = $this.b1q(e.v1k_1, env);
        // Inline function 'kotlin.require' call

        if (!(isNumeric(l) && isNumeric(r_3))) {
          var message_3 = "Operator '%' expects numbers";
          throw IllegalArgumentException_init_$Create$(toString(message_3));
        }

        var tmp_6 = isNumber(l) ? l : THROW_CCE();
        tmp = remNum(tmp_6, isNumber(r_3) ? r_3 : THROW_CCE());
        break;
      case 16:
      case 24:
      case 17:
      case 25:
        var r_4 = $this.b1q(e.v1k_1, env);
        var tmp_7;
        if (isNumeric(l) && isNumeric(r_4)) {
          var tmp_8 = toBLBigDec(isNumber(l) ? l : THROW_CCE());
          tmp_7 = compareTo_1(tmp_8, toBLBigDec(isNumber(r_4) ? r_4 : THROW_CCE()));
        } else {
          tmp_7 = compareTo(toString_0(l), toString_0(r_4));
        }

        var cmp = tmp_7;
        switch (e.u1k_1.h1e_1.k2_1) {
          case 16:
            tmp = cmp < 0;
            break;
          case 24:
            tmp = cmp <= 0;
            break;
          case 17:
            tmp = cmp > 0;
            break;
          default:
            tmp = cmp >= 0;
            break;
        }

        break;
      case 77:
        var r_5 = $this.b1q(e.v1k_1, env);
        var tmp_9;
        if (!(l == null) ? isInterface(l, KtList) : false) {
          tmp_9 = !(r_5 == null) ? isInterface(r_5, KtList) : false;
        } else {
          tmp_9 = false;
        }

        // Inline function 'kotlin.require' call

        if (!tmp_9) {
          var message_4 = "Operator '++' expects two lists";
          throw IllegalArgumentException_init_$Create$(toString(message_4));
        }

        // Inline function 'kotlin.apply' call

        var this_0 = ArrayList_init_$Create$_0(l.j() + r_5.j() | 0);
        this_0.n(l);
        this_0.n(r_5);
        tmp = this_0;
        break;
      case 26:
        tmp = equals_0(l, $this.b1q(e.v1k_1, env));
        break;
      case 27:
        tmp = !equals_0(l, $this.b1q(e.v1k_1, env));
        break;
      case 29:
        tmp = !asBool(l) ? false : asBool($this.b1q(e.v1k_1, env));
        break;
      case 30:
        tmp = asBool(l) ? true : asBool($this.b1q(e.v1k_1, env));
        break;
      case 31:
        tmp = l == null ? $this.b1q(e.v1k_1, env) : l;
        break;
      default:
        var message_5 = 'Unknown binary op ' + e.u1k_1.i1e_1;
        throw IllegalStateException_init_$Create$(toString(message_5));
    }
    return tmp;
  }
  function stepStatic($this, container, key) {
    var tmp;
    if (!(container == null) ? isInterface(container, KtMap) : false) {
      // Inline function 'kotlin.collections.get' call
      var key_0 = unwrapKey(key);
      tmp = (isInterface(container, KtMap) ? container : THROW_CCE()).y1(key_0);
    } else {
      if (!(container == null) ? isInterface(container, KtList) : false) {
        var tmp_0;
        if (key instanceof Name) {
          var message = "Cannot use name '" + _Name___get_v__impl__vuc4w5(key.t1e_1) + "' on list";
          throw IllegalStateException_init_$Create$(toString(message));
        } else {
          if (key instanceof I32) {
            tmp_0 = _I32___get_v__impl__4258ps(key.y1e_1);
          } else {
            if (key instanceof I64) {
              var containsArg = _I64___get_v__impl__gpphb3(key.z1e_1);
              // Inline function 'kotlin.require' call
              // Inline function 'kotlin.require' call
              if (!((new Long(0, 0)).z(containsArg) <= 0 ? containsArg.z(new Long(2147483647, 0)) <= 0 : false)) {
                var message_0 = 'Failed requirement.';
                throw IllegalArgumentException_init_$Create$(toString(message_0));
              }
              tmp_0 = _I64___get_v__impl__gpphb3(key.z1e_1).e1();
            } else {
              if (key instanceof IBig) {
                var bi = _IBig___get_v__impl__986dq1(key.g1f_1);
                // Inline function 'kotlin.require' call
                // Inline function 'kotlin.require' call
                if (!(signum(bi) >= 0 && compareTo_0(bi, blBigIntOfLong(new Long(2147483647, 0))) <= 0)) {
                  var message_1 = 'Failed requirement.';
                  throw IllegalArgumentException_init_$Create$(toString(message_1));
                }
                tmp_0 = toInt_0(bi);
              } else {
                noWhenBranchMatchedException();
              }
            }
          }
        }
        var i = tmp_0;
        // Inline function 'kotlin.require' call
        if (!(0 <= i ? i < container.j() : false)) {
          var message_2 = 'Index ' + i + ' out of bounds 0..' + (container.j() - 1 | 0);
          throw IllegalArgumentException_init_$Create$(toString(message_2));
        }
        tmp = container.o(i);
      } else {
        var message_3 = 'Indexing supported only for list or object';
        throw IllegalStateException_init_$Create$(toString(message_3));
      }
    }
    return tmp;
  }
  function stepDynamic($this, container, dynKey) {
    var tmp;
    if (!(container == null) ? isInterface(container, KtMap) : false) {
      var tmp_0;
      if (!(dynKey == null) ? typeof dynKey === 'string' : false) {
        tmp_0 = dynKey;
      } else {
        if (!(dynKey == null) ? typeof dynKey === 'number' : false) {
          // Inline function 'kotlin.require' call
          // Inline function 'kotlin.require' call
          if (!(dynKey >= 0)) {
            var message = 'Failed requirement.';
            throw IllegalArgumentException_init_$Create$(toString(message));
          }
          tmp_0 = dynKey;
        } else {
          if (dynKey instanceof Long) {
            // Inline function 'kotlin.require' call
            // Inline function 'kotlin.require' call
            if (!(dynKey.z(new Long(0, 0)) >= 0)) {
              var message_0 = 'Failed requirement.';
              throw IllegalArgumentException_init_$Create$(toString(message_0));
            }
            tmp_0 = dynKey;
          } else {
            if (dynKey instanceof BLBigInt) {
              // Inline function 'kotlin.require' call
              // Inline function 'kotlin.require' call
              if (!(signum(dynKey) >= 0)) {
                var message_1 = 'Failed requirement.';
                throw IllegalArgumentException_init_$Create$(toString(message_1));
              }
              tmp_0 = dynKey;
            } else {
              var message_2 = 'Object key must be string or non-negative integer';
              throw IllegalStateException_init_$Create$(toString(message_2));
            }
          }
        }
      }
      var k = tmp_0;
      // Inline function 'kotlin.collections.get' call
      tmp = (isInterface(container, KtMap) ? container : THROW_CCE()).y1(k);
    } else {
      if (!(container == null) ? isInterface(container, KtList) : false) {
        var tmp_1;
        if (!(dynKey == null) ? typeof dynKey === 'number' : false) {
          tmp_1 = dynKey;
        } else {
          if (dynKey instanceof Long) {
            // Inline function 'kotlin.require' call
            // Inline function 'kotlin.require' call
            if (!((new Long(0, 0)).z(dynKey) <= 0 ? dynKey.z(new Long(2147483647, 0)) <= 0 : false)) {
              var message_3 = 'Failed requirement.';
              throw IllegalArgumentException_init_$Create$(toString(message_3));
            }
            tmp_1 = dynKey.e1();
          } else {
            if (dynKey instanceof BLBigInt) {
              // Inline function 'kotlin.require' call
              // Inline function 'kotlin.require' call
              if (!(signum(dynKey) >= 0 && compareTo_0(dynKey, blBigIntOfLong(new Long(2147483647, 0))) <= 0)) {
                var message_4 = 'Failed requirement.';
                throw IllegalArgumentException_init_$Create$(toString(message_4));
              }
              tmp_1 = toInt_0(dynKey);
            } else {
              var message_5 = 'Index must be integer for list';
              throw IllegalStateException_init_$Create$(toString(message_5));
            }
          }
        }
        var i = tmp_1;
        // Inline function 'kotlin.require' call
        if (!(0 <= i ? i < container.j() : false)) {
          var message_6 = 'Index ' + i + ' out of bounds 0..' + (container.j() - 1 | 0);
          throw IllegalArgumentException_init_$Create$(toString(message_6));
        }
        tmp = container.o(i);
      } else {
        var message_7 = 'Indexing supported only for list or object';
        throw IllegalStateException_init_$Create$(toString(message_7));
      }
    }
    return tmp;
  }
  function handleNumberLiteral($this, e, env) {
    return unwrapNum(e.i1k_1);
  }
  function handleString($this, e, env) {
    return e.g1k_1;
  }
  function handleBool($this, e, env) {
    return e.y1k_1;
  }
  function handleNull($this, e, env) {
    return null;
  }
  function handleIdentifier($this, e, env) {
    if (e.n1e_1 === 'fail')
      throw IllegalStateException_init_$Create$('boom');
    var value = env.y1(e.n1e_1);
    traceRead($this, e.n1e_1, value);
    return value;
  }
  function handleArray($this, e, env) {
    // Inline function 'kotlin.collections.map' call
    var this_0 = e.d1l_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      var tmp$ret$0 = $this.b1q(item, env);
      destination.e(tmp$ret$0);
    }
    return destination;
  }
  function handleArrayComp($this, e, env) {
    var iterVal = $this.b1q(e.g1l_1, env);
    var tmp;
    if (!(iterVal == null) ? isInterface(iterVal, Iterable) : false) {
      tmp = iterVal;
    } else {
      if (!(iterVal == null) ? isInterface(iterVal, Sequence) : false) {
        tmp = asIterable(iterVal);
      } else {
        var message = 'Array comprehension expects list/iterable/sequence';
        throw IllegalStateException_init_$Create$(toString(message));
      }
    }
    var iterable = tmp;
    var out = ArrayList_init_$Create$();
    var snap = HashMap_init_$Create$_0(env);
    var _iterator__ex2g4s = iterable.g();
    $l$loop: while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      env.c2();
      env.i2(snap);
      // Inline function 'kotlin.collections.set' call
      var key = e.f1l_1;
      env.g2(key, item);
      if (!(e.i1l_1 == null) && !asBool($this.b1q(e.i1l_1, env)))
        continue $l$loop;
      // Inline function 'kotlin.collections.plusAssign' call
      var element = $this.b1q(e.h1l_1, env);
      out.e(element);
    }
    return out;
  }
  function handleUnary($this, e, env) {
    var tmp;
    switch (e.x1k_1.h1e_1.k2_1) {
      case 12:
        tmp = -num($this.b1q(e.w1k_1, env));
        break;
      case 19:
        tmp = !asBool($this.b1q(e.w1k_1, env));
        break;
      case 50:
        tmp = $this.b1q(e.w1k_1, env);
        break;
      case 51:
        throw UnsupportedOperationException_init_$Create$("'suspend' not supported in stream demo");
      default:
        var message = 'unary ' + e.x1k_1.i1e_1;
        throw IllegalStateException_init_$Create$(toString(message));
    }
    return tmp;
  }
  function handleIfElse($this, e, env) {
    var chosen = asBool($this.b1q(e.k1l_1, env)) ? e.l1l_1 : e.m1l_1;
    var tmp;
    if (chosen instanceof IdentifierExpr) {
      tmp = $this.b1q(chosen, env);
    } else {
      if (chosen instanceof CallExpr) {
        tmp = handleFuncCall($this, chosen, env);
      } else {
        tmp = $this.b1q(chosen, env);
      }
    }
    return tmp;
  }
  function handleAccess($this, e, env) {
    var cur = $this.b1q(e.p1e_1, env);
    var _iterator__ex2g4s = e.q1e_1.g();
    while (_iterator__ex2g4s.h()) {
      var seg = _iterator__ex2g4s.i();
      var tmp;
      if (seg instanceof Static) {
        tmp = stepStatic($this, cur, seg.s1e_1);
      } else {
        if (seg instanceof Dynamic) {
          tmp = stepDynamic($this, cur, $this.b1q(seg.n1h_1, env));
        } else {
          noWhenBranchMatchedException();
        }
      }
      cur = tmp;
    }
    return cur;
  }
  function handleAccessTraced($this, e, env) {
    var cur = $this.b1q(e.p1e_1, env);
    var tmp = e.p1e_1;
    var tmp0_safe_receiver = tmp instanceof IdentifierExpr ? tmp : null;
    var pathSoFar = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.n1e_1;
    var _iterator__ex2g4s = e.q1e_1.g();
    while (_iterator__ex2g4s.h()) {
      var seg = _iterator__ex2g4s.i();
      if (seg instanceof Static) {
        var next = stepStatic($this, cur, seg.s1e_1);
        if (!(pathSoFar == null)) {
          var tmp2_subject = cur;
          var tmp_0;
          if (!(tmp2_subject == null) ? isInterface(tmp2_subject, KtMap) : false) {
            tmp_0 = toString(unwrapKey(seg.s1e_1));
          } else {
            if (!(tmp2_subject == null) ? isInterface(tmp2_subject, KtList) : false) {
              var tmp3_subject = seg.s1e_1;
              var tmp_1;
              if (tmp3_subject instanceof Name) {
                var message = "Cannot use name '" + _Name___get_v__impl__vuc4w5(seg.s1e_1.t1e_1) + "' on list";
                throw IllegalStateException_init_$Create$(toString(message));
              } else {
                if (tmp3_subject instanceof I32) {
                  tmp_1 = _I32___get_v__impl__4258ps(seg.s1e_1.y1e_1).toString();
                } else {
                  if (tmp3_subject instanceof I64) {
                    tmp_1 = _I64___get_v__impl__gpphb3(seg.s1e_1.z1e_1).toString();
                  } else {
                    if (tmp3_subject instanceof IBig) {
                      tmp_1 = toString(_IBig___get_v__impl__986dq1(seg.s1e_1.g1f_1));
                    } else {
                      noWhenBranchMatchedException();
                    }
                  }
                }
              }
              tmp_0 = tmp_1;
            } else {
              tmp_0 = '<non-container>';
            }
          }
          var segLabel = tmp_0;
          pathSoFar = pathSoFar + renderNextPathSegment($this, cur, segLabel, false);
          traceRead($this, pathSoFar, next);
        }
        cur = next;
      } else {
        if (seg instanceof Dynamic) {
          var dynKey = $this.b1q(seg.n1h_1, env);
          var next_0 = stepDynamic($this, cur, dynKey);
          if (!(pathSoFar == null)) {
            var tmp4_subject = cur;
            var tmp_2;
            if (!(tmp4_subject == null) ? isInterface(tmp4_subject, KtMap) : false) {
              var tmp_3;
              var tmp_4;
              if (!(dynKey == null) ? typeof dynKey === 'string' : false) {
                tmp_4 = true;
              } else {
                var tmp_5;
                if (!(dynKey == null) ? typeof dynKey === 'number' : false) {
                  tmp_5 = true;
                } else {
                  tmp_5 = dynKey instanceof Long;
                }
                tmp_4 = tmp_5;
              }
              if (tmp_4) {
                tmp_3 = toString(dynKey);
              } else {
                tmp_3 = isBigInt(dynKey) ? toString_0(dynKey) : '<key>';
              }
              tmp_2 = tmp_3;
            } else {
              if (!(tmp4_subject == null) ? isInterface(tmp4_subject, KtList) : false) {
                var tmp_6;
                var tmp_7;
                if (!(dynKey == null) ? typeof dynKey === 'number' : false) {
                  tmp_7 = true;
                } else {
                  tmp_7 = dynKey instanceof Long;
                }
                if (tmp_7) {
                  tmp_6 = toString(dynKey);
                } else {
                  tmp_6 = isBigInt(dynKey) ? toString_0(dynKey) : '<idx>';
                }
                tmp_2 = tmp_6;
              } else {
                tmp_2 = '<non-container>';
              }
            }
            var segLabel_0 = tmp_2;
            pathSoFar = pathSoFar + renderNextPathSegment($this, cur, segLabel_0, true);
            traceRead($this, pathSoFar, next_0);
          }
          cur = next_0;
        } else {
          noWhenBranchMatchedException();
        }
      }
    }
    return cur;
  }
  function handleCall($this, c, env) {
    return handleFuncCall($this, c, env);
  }
  function handleObject($this, e, env) {
    var out = LinkedHashMap_init_$Create$();
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = e.l1k_1.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      if (element instanceof ComputedProperty) {
        var fieldName = unwrapComputedKey($this.b1q(element.k1i_1, env));
        // Inline function 'kotlin.collections.set' call
        var value = $this.b1q(element.l1i_1, env);
        out.g2(fieldName, value);
      } else {
        if (element instanceof LiteralProperty) {
          var tmp2 = unwrapKey(element.i1i_1);
          // Inline function 'kotlin.collections.set' call
          var value_0 = $this.b1q(element.j1i_1, env);
          out.g2(tmp2, value_0);
        } else {
          noWhenBranchMatchedException();
        }
      }
    }
    return out;
  }
  function handleInvoke($this, e, env) {
    var tmp = $this.b1q(e.q1k_1, env);
    var tmp0_elvis_lhs = (!(tmp == null) ? typeof tmp === 'function' : false) ? tmp : null;
    var tmp_0;
    if (tmp0_elvis_lhs == null) {
      var message = 'Value is not callable';
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      tmp_0 = tmp0_elvis_lhs;
    }
    var fn = tmp_0;
    // Inline function 'kotlin.collections.map' call
    var this_0 = e.r1k_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      var tmp$ret$0 = $this.b1q(item, env);
      destination.e(tmp$ret$0);
    }
    var argv = destination;
    // Inline function 'v2.ir.Evaluator.tracedCall' call
    var t = Debug_instance.h1f_1;
    var tmp1_safe_receiver = t == null ? null : t.k1o();
    if ((tmp1_safe_receiver == null ? null : tmp1_safe_receiver.w1l_1) === true) {
      t.l1o(new Call('CALL', null, argv));
    }
    var tmp_1;
    try {
      var r = fn(argv);
      var tmp3_safe_receiver = t == null ? null : t.k1o();
      if ((tmp3_safe_receiver == null ? null : tmp3_safe_receiver.w1l_1) === true) {
        t.l1o(new Return('CALL', null, r));
      }
      tmp_1 = r;
    } catch ($p) {
      var tmp_2;
      if ($p instanceof Error) {
        var ex = $p;
        if (t == null)
          null;
        else {
          t.l1o(new Error_0('call ' + 'CALL' + ' ' + (null == null ? '<lambda>' : null), ex));
        }
        throw ex;
      } else {
        throw $p;
      }
    }
    return tmp_1;
  }
  function handleSharedStateAwait($this, e, env) {
    var tmp0_elvis_lhs = $this.z1p_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      var message = 'SharedStore not available for await operation';
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var store = tmp;
    return blockingAwait(store, e.o1l_1, e.p1l_1);
  }
  function Evaluator$handleLambda$lambda($captured, $e, this$0, $compiled) {
    return function (args) {
      // Inline function 'kotlin.apply' call
      var this_0 = HashMap_init_$Create$_0($captured);
      // Inline function 'kotlin.collections.forEach' call
      var _iterator__ex2g4s = zip($e.a1l_1, args).g();
      while (_iterator__ex2g4s.h()) {
        var element = _iterator__ex2g4s.i();
        var p = element.xd();
        var v = element.yd();
        // Inline function 'kotlin.collections.set' call
        this_0.g2(p, v);
      }
      var local = this_0;
      // Inline function 'v2.ir.Evaluator.tracedCall' call
      var t = Debug_instance.h1f_1;
      var tmp1_safe_receiver = t == null ? null : t.k1o();
      if ((tmp1_safe_receiver == null ? null : tmp1_safe_receiver.w1l_1) === true) {
        t.l1o(new Call('LAMBDA', null, args));
      }
      var tmp;
      try {
        var b = $e.b1l_1;
        var tmp_0;
        if (b instanceof ExprBody) {
          tmp_0 = this$0.b1q(b.r1h_1, local);
        } else {
          if (b instanceof BlockBody) {
            var tmp0_elvis_lhs = $compiled;
            var ir = tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
            tmp_0 = execFuncIR(this$0, ir, local).q1p_1;
          } else {
            noWhenBranchMatchedException();
          }
        }
        var r = tmp_0;
        var tmp3_safe_receiver = t == null ? null : t.k1o();
        if ((tmp3_safe_receiver == null ? null : tmp3_safe_receiver.w1l_1) === true) {
          t.l1o(new Return('LAMBDA', null, r));
        }
        tmp = r;
      } catch ($p) {
        var tmp_1;
        if ($p instanceof Error) {
          var ex = $p;
          if (t == null)
            null;
          else {
            t.l1o(new Error_0('call ' + 'LAMBDA' + ' ' + (null == null ? '<lambda>' : null), ex));
          }
          throw ex;
        } else {
          throw $p;
        }
      }
      return tmp;
    };
  }
  function Evaluator(hostFns, funcs, reg, tracer, sharedStore) {
    sharedStore = sharedStore === VOID ? null : sharedStore;
    this.v1p_1 = hostFns;
    this.w1p_1 = funcs;
    this.x1p_1 = reg;
    this.y1p_1 = tracer;
    this.z1p_1 = sharedStore;
    this.a1q_1 = HashMap_init_$Create$();
  }
  protoOf(Evaluator).b1q = function (e, env) {
    // Inline function 'v2.ir.Evaluator.tracedEval' call
    var t = Debug_instance.h1f_1;
    var tmp1_safe_receiver = t == null ? null : t.k1o();
    if ((tmp1_safe_receiver == null ? null : tmp1_safe_receiver.v1l_1) === true) {
      t.l1o(new EvalEnter(e));
    }
    var tmp;
    try {
      var tmp_0;
      if (e instanceof NumberLiteral) {
        tmp_0 = handleNumberLiteral(this, e, env);
      } else {
        if (e instanceof StringExpr) {
          tmp_0 = handleString(this, e, env);
        } else {
          if (e instanceof BoolExpr) {
            tmp_0 = handleBool(this, e, env);
          } else {
            if (e instanceof NullLiteral) {
              tmp_0 = handleNull(this, e, env);
            } else {
              if (e instanceof IdentifierExpr) {
                tmp_0 = handleIdentifier(this, e, env);
              } else {
                if (e instanceof ArrayExpr) {
                  tmp_0 = handleArray(this, e, env);
                } else {
                  if (e instanceof ArrayCompExpr) {
                    tmp_0 = handleArrayComp(this, e, env);
                  } else {
                    if (e instanceof UnaryExpr) {
                      tmp_0 = handleUnary(this, e, env);
                    } else {
                      if (e instanceof BinaryExpr) {
                        tmp_0 = handleBinary(this, e, env);
                      } else {
                        if (e instanceof IfElseExpr) {
                          tmp_0 = handleIfElse(this, e, env);
                        } else {
                          if (e instanceof AccessExpr) {
                            var tmp_1;
                            if (!(Debug_instance.h1f_1 == null)) {
                              tmp_1 = handleAccessTraced(this, e, env);
                            } else {
                              tmp_1 = handleAccess(this, e, env);
                            }
                            tmp_0 = tmp_1;
                          } else {
                            if (e instanceof CallExpr) {
                              tmp_0 = handleCall(this, e, env);
                            } else {
                              if (e instanceof InvokeExpr) {
                                tmp_0 = handleInvoke(this, e, env);
                              } else {
                                if (e instanceof ObjectExpr) {
                                  tmp_0 = handleObject(this, e, env);
                                } else {
                                  if (e instanceof LambdaExpr) {
                                    tmp_0 = handleLambda(this, e, env);
                                  } else {
                                    if (e instanceof SharedStateAwaitExpr) {
                                      tmp_0 = handleSharedStateAwait(this, e, env);
                                    } else {
                                      var message = 'Expr kind ' + getKClassFromExpression(e).m9() + ' not handled';
                                      throw IllegalStateException_init_$Create$(toString(message));
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      var v = tmp_0;
      var tmp3_safe_receiver = t == null ? null : t.k1o();
      if ((tmp3_safe_receiver == null ? null : tmp3_safe_receiver.v1l_1) === true) {
        t.l1o(new EvalExit(e, v));
      }
      tmp = v;
    } catch ($p) {
      var tmp_2;
      if ($p instanceof Error) {
        var ex = $p;
        if (t == null)
          null;
        else {
          t.l1o(new Error_0('eval ' + getKClassFromExpression(e).m9(), ex));
        }
        throw ex;
      } else {
        throw $p;
      }
    }
    return tmp;
  };
  function makeEval(hostFns, funcs, reg, tracer, sharedStore) {
    tracer = tracer === VOID ? null : tracer;
    sharedStore = sharedStore === VOID ? null : sharedStore;
    var engine = new Evaluator(hostFns, funcs, reg, tracer, sharedStore);
    return Evaluator$eval$ref(engine);
  }
  function Evaluator$eval$ref(p0) {
    var l = function (_this__u8e3s4, p0_0) {
      return p0.b1q(_this__u8e3s4, p0_0);
    };
    l.callableName = 'eval';
    return l;
  }
  var CKind_MAP_instance;
  var CKind_LIST_instance;
  var CKind_entriesInitialized;
  function CKind_initEntries() {
    if (CKind_entriesInitialized)
      return Unit_instance;
    CKind_entriesInitialized = true;
    CKind_MAP_instance = new CKind('MAP', 0);
    CKind_LIST_instance = new CKind('LIST', 1);
  }
  function Frame(container, keyOrIdx) {
    this.g1q_1 = container;
    this.h1q_1 = keyOrIdx;
  }
  protoOf(Frame).xd = function () {
    return this.g1q_1;
  };
  protoOf(Frame).yd = function () {
    return this.h1q_1;
  };
  protoOf(Frame).toString = function () {
    return 'Frame(container=' + toString_0(this.g1q_1) + ', keyOrIdx=' + toString(this.h1q_1) + ')';
  };
  protoOf(Frame).hashCode = function () {
    var result = this.g1q_1 == null ? 0 : hashCode(this.g1q_1);
    result = imul(result, 31) + hashCode(this.h1q_1) | 0;
    return result;
  };
  protoOf(Frame).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Frame))
      return false;
    var tmp0_other_with_cast = other instanceof Frame ? other : THROW_CCE();
    if (!equals_0(this.g1q_1, tmp0_other_with_cast.g1q_1))
      return false;
    if (!equals_0(this.h1q_1, tmp0_other_with_cast.h1q_1))
      return false;
    return true;
  };
  function CKind(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function LeafAddress(kind, addr) {
    this.i1q_1 = kind;
    this.j1q_1 = addr;
  }
  protoOf(LeafAddress).toString = function () {
    return 'LeafAddress(kind=' + this.i1q_1.toString() + ', addr=' + toString(this.j1q_1) + ')';
  };
  protoOf(LeafAddress).hashCode = function () {
    var result = this.i1q_1.hashCode();
    result = imul(result, 31) + hashCode(this.j1q_1) | 0;
    return result;
  };
  protoOf(LeafAddress).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof LeafAddress))
      return false;
    var tmp0_other_with_cast = other instanceof LeafAddress ? other : THROW_CCE();
    if (!this.i1q_1.equals(tmp0_other_with_cast.i1q_1))
      return false;
    if (!equals_0(this.j1q_1, tmp0_other_with_cast.j1q_1))
      return false;
    return true;
  };
  function asBool_0($this, _this__u8e3s4) {
    var tmp;
    if (_this__u8e3s4 == null) {
      tmp = false;
    } else {
      if (!(_this__u8e3s4 == null) ? typeof _this__u8e3s4 === 'boolean' : false) {
        tmp = _this__u8e3s4;
      } else {
        if (isNumber(_this__u8e3s4)) {
          tmp = !(numberToDouble(_this__u8e3s4) === 0.0);
        } else {
          tmp = true;
        }
      }
    }
    return tmp;
  }
  function unwrapKeyAny($this, k) {
    var tmp;
    if (k instanceof Name) {
      tmp = _Name___get_v__impl__vuc4w5(k.t1e_1);
    } else {
      if (k instanceof I32) {
        tmp = _I32___get_v__impl__4258ps(k.y1e_1);
      } else {
        if (k instanceof I64) {
          tmp = _I64___get_v__impl__gpphb3(k.z1e_1);
        } else {
          if (k instanceof IBig) {
            tmp = _IBig___get_v__impl__986dq1(k.g1f_1);
          } else {
            tmp = ensureNotNull(k);
          }
        }
      }
    }
    return tmp;
  }
  function unwrapKey_0($this, k) {
    var tmp;
    if (k instanceof Name) {
      tmp = _Name___get_v__impl__vuc4w5(k.t1e_1);
    } else {
      if (k instanceof I32) {
        tmp = _I32___get_v__impl__4258ps(k.y1e_1);
      } else {
        if (k instanceof I64) {
          tmp = _I64___get_v__impl__gpphb3(k.z1e_1);
        } else {
          if (k instanceof IBig) {
            tmp = _IBig___get_v__impl__986dq1(k.g1f_1);
          } else {
            noWhenBranchMatchedException();
          }
        }
      }
    }
    return tmp;
  }
  function normalizeMapKeys($this, m) {
    // Inline function 'kotlin.apply' call
    var this_0 = LinkedHashMap_init_$Create$_0(m.j());
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = m.b2().g();
    while (_iterator__ex2g4s.h()) {
      var _destruct__k2r9zo = _iterator__ex2g4s.i();
      // Inline function 'kotlin.collections.component1' call
      var k = _destruct__k2r9zo.u1();
      // Inline function 'kotlin.collections.component2' call
      var v = _destruct__k2r9zo.v1();
      this_0.g2(unwrapKeyAny($this, k), v);
    }
    return this_0;
  }
  function stringify($this, v) {
    var tmp;
    if (v == null) {
      tmp = null;
    } else {
      if (!(v == null) ? isInterface(v, KtMap) : false) {
        // Inline function 'kotlin.apply' call
        var this_0 = LinkedHashMap_init_$Create$();
        // Inline function 'kotlin.collections.iterator' call
        var _iterator__ex2g4s = v.b2().g();
        while (_iterator__ex2g4s.h()) {
          var _destruct__k2r9zo = _iterator__ex2g4s.i();
          // Inline function 'kotlin.collections.component1' call
          var k = _destruct__k2r9zo.u1();
          // Inline function 'kotlin.collections.component2' call
          var vv = _destruct__k2r9zo.v1();
          this_0.g2(toString_0(k), stringify($this, vv));
        }
        tmp = this_0;
      } else {
        if (!(v == null) ? isInterface(v, KtList) : false) {
          // Inline function 'kotlin.collections.map' call
          // Inline function 'kotlin.collections.mapTo' call
          var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(v, 10));
          var _iterator__ex2g4s_0 = v.g();
          while (_iterator__ex2g4s_0.h()) {
            var item = _iterator__ex2g4s_0.i();
            var tmp$ret$5 = stringify($this, item);
            destination.e(tmp$ret$5);
          }
          tmp = destination;
        } else {
          tmp = v;
        }
      }
    }
    return tmp;
  }
  function mapKeyFromDynamic($this, v) {
    var tmp;
    if (!(v == null) ? typeof v === 'string' : false) {
      tmp = v;
    } else {
      if (!(v == null) ? typeof v === 'number' : false) {
        // Inline function 'kotlin.require' call
        if (!(v >= 0)) {
          var message = 'Object key must be non-negative';
          throw IllegalArgumentException_init_$Create$(toString(message));
        }
        tmp = v;
      } else {
        if (v instanceof Long) {
          // Inline function 'kotlin.require' call
          if (!(v.z(new Long(0, 0)) >= 0)) {
            var message_0 = 'Object key must be non-negative';
            throw IllegalArgumentException_init_$Create$(toString(message_0));
          }
          tmp = v;
        } else {
          var tmp_0;
          if (isBigInt(v)) {
            var bi = v instanceof BLBigInt ? v : THROW_CCE();
            // Inline function 'kotlin.require' call
            if (!(signum(bi) >= 0)) {
              var message_1 = 'Object key must be non-negative';
              throw IllegalArgumentException_init_$Create$(toString(message_1));
            }
            tmp_0 = bi;
          } else {
            var message_2 = 'Object key must be string or non-negative integer';
            throw IllegalStateException_init_$Create$(toString(message_2));
          }
          tmp = tmp_0;
        }
      }
    }
    return tmp;
  }
  function listIndexFromDynamic($this, v, size) {
    var tmp;
    if (!(v == null) ? typeof v === 'number' : false) {
      tmp = v;
    } else {
      if (v instanceof Long) {
        // Inline function 'kotlin.require' call
        if (!((new Long(0, 0)).z(v) <= 0 ? v.z(new Long(2147483647, 0)) <= 0 : false)) {
          var message = 'Index ' + v.toString() + ' out of bounds';
          throw IllegalArgumentException_init_$Create$(toString(message));
        }
        tmp = v.e1();
      } else {
        var tmp_0;
        if (isBigInt(v)) {
          var bi = v instanceof BLBigInt ? v : THROW_CCE();
          // Inline function 'kotlin.require' call
          if (!(signum(bi) >= 0 && compareTo_0(bi, blBigIntOfLong(new Long(2147483647, 0))) <= 0)) {
            var message_0 = 'Index ' + toString(v) + ' out of bounds';
            throw IllegalArgumentException_init_$Create$(toString(message_0));
          }
          tmp_0 = toInt_0(bi);
        } else {
          var message_1 = 'Index must be integer for list';
          throw IllegalStateException_init_$Create$(toString(message_1));
        }
        tmp = tmp_0;
      }
    }
    return tmp;
  }
  function staticIndex($this, seg) {
    var tmp;
    if (seg instanceof Name) {
      var message = 'Cannot use name segment on list';
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      if (seg instanceof I32) {
        tmp = _I32___get_v__impl__4258ps(seg.y1e_1);
      } else {
        if (seg instanceof I64) {
          var v = _I64___get_v__impl__gpphb3(seg.z1e_1);
          // Inline function 'kotlin.require' call
          // Inline function 'kotlin.require' call
          if (!((new Long(0, 0)).z(v) <= 0 ? v.z(new Long(2147483647, 0)) <= 0 : false)) {
            var message_0 = 'Failed requirement.';
            throw IllegalArgumentException_init_$Create$(toString(message_0));
          }
          tmp = v.e1();
        } else {
          if (seg instanceof IBig) {
            var bi = _IBig___get_v__impl__986dq1(seg.g1f_1);
            // Inline function 'kotlin.require' call
            // Inline function 'kotlin.require' call
            if (!(signum(bi) >= 0 && compareTo_0(bi, blBigIntOfLong(new Long(2147483647, 0))) <= 0)) {
              var message_1 = 'Failed requirement.';
              throw IllegalArgumentException_init_$Create$(toString(message_1));
            }
            tmp = toInt_0(bi);
          } else {
            noWhenBranchMatchedException();
          }
        }
      }
    }
    return tmp;
  }
  function withUpdated($this, _this__u8e3s4, key, newChild) {
    var tmp = _this__u8e3s4.j();
    var tmp_0;
    // Inline function 'kotlin.collections.containsKey' call
    if (!(isInterface(_this__u8e3s4, KtMap) ? _this__u8e3s4 : THROW_CCE()).w1(key)) {
      tmp_0 = 1;
    } else {
      tmp_0 = 0;
    }
    // Inline function 'kotlin.apply' call
    var this_0 = LinkedHashMap_init_$Create$_0(tmp + tmp_0 | 0);
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = _this__u8e3s4.b2().g();
    while (_iterator__ex2g4s.h()) {
      var _destruct__k2r9zo = _iterator__ex2g4s.i();
      // Inline function 'kotlin.collections.component1' call
      var k = _destruct__k2r9zo.u1();
      // Inline function 'kotlin.collections.component2' call
      var v = _destruct__k2r9zo.v1();
      // Inline function 'kotlin.collections.set' call
      var key_0 = ensureNotNull(k);
      this_0.g2(key_0, v);
    }
    // Inline function 'kotlin.collections.set' call
    this_0.g2(key, newChild);
    return this_0;
  }
  function withReplaced($this, _this__u8e3s4, idx, newChild) {
    // Inline function 'kotlin.require' call
    if (!(0 <= idx ? idx < _this__u8e3s4.j() : false)) {
      var message = 'Index ' + idx + ' out of bounds 0..' + (_this__u8e3s4.j() - 1 | 0);
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.apply' call
    var this_0 = ArrayList_init_$Create$_0(_this__u8e3s4.j());
    this_0.n(_this__u8e3s4);
    this_0.d2(idx, newChild);
    return this_0;
  }
  function withAppended($this, _this__u8e3s4, value) {
    // Inline function 'kotlin.apply' call
    var this_0 = ArrayList_init_$Create$_0(_this__u8e3s4.j() + 1 | 0);
    this_0.n(_this__u8e3s4);
    this_0.e(value);
    return this_0;
  }
  function propertiesToMap($this, fields, env) {
    // Inline function 'kotlin.apply' call
    var this_0 = LinkedHashMap_init_$Create$();
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = fields.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      if (element instanceof LiteralProperty) {
        var key = unwrapKey_0($this, element.i1i_1);
        var tmp = Debug_instance;
        var tmp_0 = key == null ? '<key>' : key;
        var value = tmp.v1o(tmp_0, Exec$propertiesToMap$lambda($this, element, env));
        this_0.g2(key, value);
      } else {
        if (element instanceof ComputedProperty) {
          var keyValue = $this.m1g_1(element.k1i_1, env);
          var key_0 = mapKeyFromDynamic($this, keyValue);
          var tmp_1 = Debug_instance;
          var tmp_2 = key_0 == null ? '<key>' : key_0;
          var value_0 = tmp_1.v1o(tmp_2, Exec$propertiesToMap$lambda_0($this, element, env));
          this_0.g2(key_0, value_0);
        } else {
          noWhenBranchMatchedException();
        }
      }
    }
    return this_0;
  }
  function PathContext(rootName, frames, parent, last) {
    this.k1q_1 = rootName;
    this.l1q_1 = frames;
    this.m1q_1 = parent;
    this.n1q_1 = last;
  }
  protoOf(PathContext).toString = function () {
    return 'PathContext(rootName=' + this.k1q_1 + ', frames=' + this.l1q_1.toString() + ', parent=' + toString_0(this.m1q_1) + ', last=' + toString(this.n1q_1) + ')';
  };
  protoOf(PathContext).hashCode = function () {
    var result = getStringHashCode(this.k1q_1);
    result = imul(result, 31) + this.l1q_1.hashCode() | 0;
    result = imul(result, 31) + (this.m1q_1 == null ? 0 : hashCode(this.m1q_1)) | 0;
    result = imul(result, 31) + hashCode(this.n1q_1) | 0;
    return result;
  };
  protoOf(PathContext).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof PathContext))
      return false;
    var tmp0_other_with_cast = other instanceof PathContext ? other : THROW_CCE();
    if (!(this.k1q_1 === tmp0_other_with_cast.k1q_1))
      return false;
    if (!this.l1q_1.equals(tmp0_other_with_cast.l1q_1))
      return false;
    if (!equals_0(this.m1q_1, tmp0_other_with_cast.m1q_1))
      return false;
    if (!equals_0(this.n1q_1, tmp0_other_with_cast.n1q_1))
      return false;
    return true;
  };
  function traverseToParent($this, target, env, opName) {
    var tmp = target.p1e_1;
    var tmp0_elvis_lhs = tmp instanceof IdentifierExpr ? tmp : null;
    var tmp_0;
    if (tmp0_elvis_lhs == null) {
      var message = opName + ' target must start with identifier';
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      tmp_0 = tmp0_elvis_lhs;
    }
    var baseIdent = tmp_0;
    var rootName = baseIdent.n1e_1;
    var tmp1_elvis_lhs = env.y1(rootName);
    var tmp_1;
    if (tmp1_elvis_lhs == null) {
      var message_0 = opName + " root '" + rootName + "' not found";
      throw IllegalStateException_init_$Create$(toString(message_0));
    } else {
      tmp_1 = tmp1_elvis_lhs;
    }
    var rootVal = tmp_1;
    // Inline function 'kotlin.collections.isNotEmpty' call
    // Inline function 'kotlin.require' call
    if (!!target.q1e_1.p()) {
      var message_1 = opName + ' needs a non-empty path';
      throw IllegalArgumentException_init_$Create$(toString(message_1));
    }
    var frames = ArrayList_init_$Create$_0(target.q1e_1.j());
    var cur = rootVal;
    var inductionVariable = 0;
    var last_0 = get_lastIndex(target.q1e_1);
    if (inductionVariable < last_0)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var seg = target.q1e_1.o(i);
        var tmp_2;
        if (seg instanceof Static) {
          tmp_2 = stepStatic_0($this, cur, seg.s1e_1, frames, opName);
        } else {
          if (seg instanceof Dynamic) {
            tmp_2 = stepDynamic_0($this, cur, $this.m1g_1(seg.n1h_1, env), frames, opName);
          } else {
            noWhenBranchMatchedException();
          }
        }
        cur = tmp_2;
      }
       while (inductionVariable < last_0);
    return new PathContext(rootName, frames, cur, last(target.q1e_1));
  }
  function stepStatic_0($this, cur, key, frames, op) {
    var tmp;
    if (!(cur == null) ? isInterface(cur, KtMap) : false) {
      var k = unwrapKey_0($this, key);
      // Inline function 'kotlin.collections.get' call
      var tmp1_elvis_lhs = (isInterface(cur, KtMap) ? cur : THROW_CCE()).y1(k);
      var tmp_0;
      if (tmp1_elvis_lhs == null) {
        failAt($this, op, '<root>', frames, "segment '" + toString(k) + "' not found");
      } else {
        tmp_0 = tmp1_elvis_lhs;
      }
      var next = tmp_0;
      // Inline function 'kotlin.collections.plusAssign' call
      var element = new Frame(cur, k);
      frames.e(element);
      tmp = next;
    } else {
      if (!(cur == null) ? isInterface(cur, KtList) : false) {
        var idx = staticIndex($this, key);
        // Inline function 'kotlin.require' call
        if (!(0 <= idx ? idx < cur.j() : false)) {
          var message = 'Index ' + idx + ' out of bounds 0..' + (cur.j() - 1 | 0);
          throw IllegalArgumentException_init_$Create$(toString(message));
        }
        // Inline function 'kotlin.collections.plusAssign' call
        var element_0 = new Frame(cur, idx);
        frames.e(element_0);
        tmp = cur.o(idx);
      } else {
        var message_0 = op + ' path enters non-container value';
        throw IllegalStateException_init_$Create$(toString(message_0));
      }
    }
    return tmp;
  }
  function stepDynamic_0($this, cur, dyn, frames, op) {
    var tmp;
    if (!(cur == null) ? isInterface(cur, KtMap) : false) {
      var k = mapKeyFromDynamic($this, dyn);
      // Inline function 'kotlin.collections.get' call
      var tmp1_elvis_lhs = (isInterface(cur, KtMap) ? cur : THROW_CCE()).y1(k);
      var tmp_0;
      if (tmp1_elvis_lhs == null) {
        var message = op + " path segment '" + toString(k) + "' not found";
        throw IllegalStateException_init_$Create$(toString(message));
      } else {
        tmp_0 = tmp1_elvis_lhs;
      }
      var next = tmp_0;
      // Inline function 'kotlin.collections.plusAssign' call
      var element = new Frame(cur, k);
      frames.e(element);
      tmp = next;
    } else {
      if (!(cur == null) ? isInterface(cur, KtList) : false) {
        var idx = listIndexFromDynamic($this, dyn, cur.j());
        // Inline function 'kotlin.require' call
        if (!(0 <= idx ? idx < cur.j() : false)) {
          var message_0 = 'Index ' + idx + ' out of bounds 0..' + (cur.j() - 1 | 0);
          throw IllegalArgumentException_init_$Create$(toString(message_0));
        }
        // Inline function 'kotlin.collections.plusAssign' call
        var element_0 = new Frame(cur, idx);
        frames.e(element_0);
        tmp = cur.o(idx);
      } else {
        var message_1 = op + ' path enters non-container value';
        throw IllegalStateException_init_$Create$(toString(message_1));
      }
    }
    return tmp;
  }
  function resolveLeafAddress($this, parent, last, env) {
    var tmp;
    if (!(parent == null) ? isInterface(parent, KtMap) : false) {
      var tmp_0;
      if (last instanceof Static) {
        tmp_0 = unwrapKey_0($this, last.s1e_1);
      } else {
        if (last instanceof Dynamic) {
          tmp_0 = mapKeyFromDynamic($this, $this.m1g_1(last.n1h_1, env));
        } else {
          noWhenBranchMatchedException();
        }
      }
      var key = tmp_0;
      tmp = new LeafAddress(CKind_MAP_getInstance(), key);
    } else {
      if (!(parent == null) ? isInterface(parent, KtList) : false) {
        var tmp_1;
        if (last instanceof Static) {
          tmp_1 = staticIndex($this, last.s1e_1);
        } else {
          if (last instanceof Dynamic) {
            tmp_1 = listIndexFromDynamic($this, $this.m1g_1(last.n1h_1, env), parent.j());
          } else {
            noWhenBranchMatchedException();
          }
        }
        var idx = tmp_1;
        // Inline function 'kotlin.require' call
        if (!(0 <= idx ? idx < parent.j() : false)) {
          var message = 'Index ' + idx + ' out of bounds 0..' + (parent.j() - 1 | 0);
          throw IllegalArgumentException_init_$Create$(toString(message));
        }
        tmp = new LeafAddress(CKind_LIST_getInstance(), idx);
      } else {
        var message_0 = 'Target parent must be object or list';
        throw IllegalStateException_init_$Create$(toString(message_0));
      }
    }
    return tmp;
  }
  function readAt($this, parent, addr) {
    var tmp;
    switch (addr.i1q_1.k2_1) {
      case 0:
        var tmp0 = (!(parent == null) ? isInterface(parent, KtMap) : false) ? parent : THROW_CCE();
        // Inline function 'kotlin.collections.get' call

        var key = addr.j1q_1;
        tmp = (isInterface(tmp0, KtMap) ? tmp0 : THROW_CCE()).y1(key);
        break;
      case 1:
        var tmp_0 = (!(parent == null) ? isInterface(parent, KtList) : false) ? parent : THROW_CCE();
        var tmp_1 = addr.j1q_1;
        tmp = tmp_0.o(typeof tmp_1 === 'number' ? tmp_1 : THROW_CCE());
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function pathToString($this, root, frames, tail) {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    this_0.w7(root);
    var _iterator__ex2g4s = frames.g();
    while (_iterator__ex2g4s.h()) {
      var f = _iterator__ex2g4s.i();
      this_0.x7(_Char___init__impl__6a9atx(46)).v7(f.h1q_1);
    }
    if (!(tail == null)) {
      this_0.x7(_Char___init__impl__6a9atx(46)).v7(tail);
    }
    return this_0.toString();
  }
  function pathToString$default($this, root, frames, tail, $super) {
    tail = tail === VOID ? null : tail;
    return pathToString($this, root, frames, tail);
  }
  function failAt($this, op, root, frames, msg) {
    var where = pathToString$default($this, root, frames);
    // Inline function 'kotlin.error' call
    var message = op + ': ' + msg + ' at ' + where;
    throw IllegalStateException_init_$Create$(toString(message));
  }
  function writeReplaceAt($this, parent, addr, value) {
    var old = readAt($this, parent, addr);
    if (old === value)
      return parent;
    var tmp;
    switch (addr.i1q_1.k2_1) {
      case 0:
        tmp = withUpdated($this, (!(parent == null) ? isInterface(parent, KtMap) : false) ? parent : THROW_CCE(), addr.j1q_1, value);
        break;
      case 1:
        var tmp_0 = (!(parent == null) ? isInterface(parent, KtList) : false) ? parent : THROW_CCE();
        var tmp_1 = addr.j1q_1;
        tmp = withReplaced($this, tmp_0, typeof tmp_1 === 'number' ? tmp_1 : THROW_CCE(), value);
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function writeAppendAt($this, parent, addr, value, initList) {
    var current = readAt($this, parent, addr);
    var tmp;
    if (current == null) {
      tmp = initList;
    } else {
      if (!(current == null) ? isInterface(current, KtList) : false) {
        tmp = current;
      } else {
        var message = 'APPEND TO expects list at target path, got ' + getKClassFromExpression(current).m9();
        throw IllegalStateException_init_$Create$(toString(message));
      }
    }
    var baseList = tmp;
    var appended = withAppended($this, baseList, value);
    var tmp_0;
    switch (addr.i1q_1.k2_1) {
      case 0:
        tmp_0 = withUpdated($this, (!(parent == null) ? isInterface(parent, KtMap) : false) ? parent : THROW_CCE(), addr.j1q_1, appended);
        break;
      case 1:
        var tmp_1 = (!(parent == null) ? isInterface(parent, KtList) : false) ? parent : THROW_CCE();
        var tmp_2 = addr.j1q_1;
        tmp_0 = withReplaced($this, tmp_1, typeof tmp_2 === 'number' ? tmp_2 : THROW_CCE(), appended);
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp_0;
  }
  function bubbleUp($this, frames, bottomUpdated) {
    var acc = bottomUpdated;
    var inductionVariable = get_lastIndex(frames);
    if (0 <= inductionVariable)
      do {
        var j = inductionVariable;
        inductionVariable = inductionVariable + -1 | 0;
        var _destruct__k2r9zo = frames.o(j);
        var cont = _destruct__k2r9zo.xd();
        var key = _destruct__k2r9zo.yd();
        var tmp;
        if (!(cont == null) ? isInterface(cont, KtMap) : false) {
          tmp = withUpdated($this, cont, key, acc);
        } else {
          if (!(cont == null) ? isInterface(cont, KtList) : false) {
            tmp = withReplaced($this, cont, typeof key === 'number' ? key : THROW_CCE(), acc);
          } else {
            var message = 'internal error: not a container';
            throw IllegalStateException_init_$Create$(toString(message));
          }
        }
        acc = tmp;
      }
       while (0 <= inductionVariable);
    return acc;
  }
  function fullPath($this, _this__u8e3s4, leafAddr) {
    var tmp = asSequence(_this__u8e3s4.l1q_1);
    return plus(toList_0(map(tmp, Exec$fullPath$lambda)), leafAddr.j1q_1);
  }
  function resolveInitList($this, initExpr, env) {
    var tmp;
    if (initExpr == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp = $this.m1g_1(initExpr, env);
    }
    var tmp1_elvis_lhs = tmp;
    var iv = tmp1_elvis_lhs == null ? emptyList() : tmp1_elvis_lhs;
    // Inline function 'kotlin.require' call
    if (!isInterface(iv, KtList)) {
      var message = 'INIT for APPEND TO must evaluate to a list (got ' + getKClassFromExpression(iv).m9() + ')';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return isInterface(iv, KtList) ? iv : THROW_CCE();
  }
  function applyAt($this, base, parts, applier) {
    if (parts.p()) {
      var tmp0_elvis_lhs = (!(base == null) ? isInterface(base, KtMap) : false) ? base : null;
      var tmp;
      if (tmp0_elvis_lhs == null) {
        var message = 'MODIFY target must be object';
        throw IllegalStateException_init_$Create$(toString(message));
      } else {
        tmp = tmp0_elvis_lhs;
      }
      var obj = tmp;
      return applier(isInterface(obj, KtMap) ? obj : THROW_CCE());
    }
    var seg = first(parts);
    var rest = drop(parts, 1);
    var tmp_0;
    if (!(base == null) ? isInterface(base, KtMap) : false) {
      var rawK = unwrapKey_0($this, seg);
      // Inline function 'kotlin.collections.get' call
      var tmp2_elvis_lhs = (isInterface(base, KtMap) ? base : THROW_CCE()).y1(rawK);
      var tmp_1;
      if (tmp2_elvis_lhs == null) {
        var message_0 = "MODIFY path segment '" + toString(rawK) + "' not found";
        throw IllegalStateException_init_$Create$(toString(message_0));
      } else {
        tmp_1 = tmp2_elvis_lhs;
      }
      var child = tmp_1;
      var newChild = applyAt($this, child, rest, applier);
      tmp_0 = withUpdated($this, base, rawK, newChild);
    } else {
      if (!(base == null) ? isInterface(base, KtList) : false) {
        var idx = staticIndex($this, seg);
        // Inline function 'kotlin.require' call
        if (!(0 <= idx ? idx < base.j() : false)) {
          var message_1 = 'Index ' + idx + ' out of bounds 0..' + (base.j() - 1 | 0);
          throw IllegalArgumentException_init_$Create$(toString(message_1));
        }
        var tmp3_elvis_lhs = base.o(idx);
        var tmp_2;
        if (tmp3_elvis_lhs == null) {
          var message_2 = 'MODIFY path index ' + idx + ' is null';
          throw IllegalStateException_init_$Create$(toString(message_2));
        } else {
          tmp_2 = tmp3_elvis_lhs;
        }
        var child_0 = tmp_2;
        var newChild_0 = applyAt($this, child_0, rest, applier);
        tmp_0 = withReplaced($this, base, idx, newChild_0);
      } else {
        var message_3 = 'MODIFY path enters non-container value';
        throw IllegalStateException_init_$Create$(toString(message_3));
      }
    }
    return tmp_0;
  }
  function handleLet($this, n, env) {
    var old = env.y1(n.m1o_1);
    var new_0 = $this.m1g_1(n.n1o_1, env);
    // Inline function 'kotlin.collections.set' call
    var key = n.m1o_1;
    env.g2(key, new_0);
    // Inline function 'v2.ir.Exec.emitLet' call
    var name = n.m1o_1;
    // Inline function 'v2.ir.Exec.currentTracer' call
    var tmp0_elvis_lhs = $this.n1g_1;
    var t = tmp0_elvis_lhs == null ? Debug_instance.h1f_1 : tmp0_elvis_lhs;
    if (!(t == null) && (t.k1o().r1l_1 || t.k1o().s1l_1.s1(name))) {
      t.l1o(new Let(name, old, new_0));
    }
  }
  function handleSet($this, n, env) {
    var ctx = traverseToParent($this, n.o1q_1, env, 'SET');
    var value = $this.m1g_1(n.p1q_1, env);
    var addr = resolveLeafAddress($this, ctx.m1q_1, ctx.n1q_1, env);
    var parentUpdated = writeReplaceAt($this, ctx.m1q_1, addr, value);
    var newRoot = bubbleUp($this, ctx.l1q_1, parentUpdated);
    var tmp4 = ctx.k1q_1;
    var tmp6 = fullPath($this, ctx, addr);
    // Inline function 'v2.ir.Exec.emitPathWrite' call
    var old = readAt($this, ctx.m1q_1, addr);
    // Inline function 'v2.ir.Exec.currentTracer' call
    var tmp0_elvis_lhs = $this.n1g_1;
    var tmp0_safe_receiver = tmp0_elvis_lhs == null ? Debug_instance.h1f_1 : tmp0_elvis_lhs;
    if (tmp0_safe_receiver == null)
      null;
    else {
      tmp0_safe_receiver.l1o(new PathWrite('SET', tmp4, tmp6, old, value));
    }
    // Inline function 'kotlin.collections.set' call
    var key = ctx.k1q_1;
    env.g2(key, newRoot);
  }
  function handleSetVar($this, n, env) {
    // Inline function 'kotlin.require' call
    if (!env.w1(n.q1q_1)) {
      var message = "SET variable '" + n.q1q_1 + "' not found; declare with LET first";
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var old = env.y1(n.q1q_1);
    var new_0 = $this.m1g_1(n.r1q_1, env);
    // Inline function 'kotlin.collections.set' call
    var key = n.q1q_1;
    env.g2(key, new_0);
    // Inline function 'v2.ir.Exec.emitLet' call
    var name = n.q1q_1;
    // Inline function 'v2.ir.Exec.currentTracer' call
    var tmp0_elvis_lhs = $this.n1g_1;
    var t = tmp0_elvis_lhs == null ? Debug_instance.h1f_1 : tmp0_elvis_lhs;
    if (!(t == null) && (t.k1o().r1l_1 || t.k1o().s1l_1.s1(name))) {
      t.l1o(new Let(name, old, new_0));
    }
  }
  function handleAppendTo($this, n, env) {
    var ctx = traverseToParent($this, n.s1q_1, env, 'APPEND TO');
    var addr = resolveLeafAddress($this, ctx.m1q_1, ctx.n1q_1, env);
    var oldV = readAt($this, ctx.m1q_1, addr);
    var v = $this.m1g_1(n.t1q_1, env);
    var init = resolveInitList($this, n.u1q_1, env);
    var parentUpdated = writeAppendAt($this, ctx.m1q_1, addr, v, init);
    var newRoot = bubbleUp($this, ctx.l1q_1, parentUpdated);
    // Inline function 'kotlin.collections.set' call
    var key = ctx.k1q_1;
    env.g2(key, newRoot);
    var newV = readAt($this, parentUpdated, addr);
    var tmp4 = ctx.k1q_1;
    // Inline function 'v2.ir.Exec.emitPathWrite' call
    var path = fullPath($this, ctx, addr);
    // Inline function 'v2.ir.Exec.currentTracer' call
    var tmp0_elvis_lhs = $this.n1g_1;
    var tmp0_safe_receiver = tmp0_elvis_lhs == null ? Debug_instance.h1f_1 : tmp0_elvis_lhs;
    if (tmp0_safe_receiver == null)
      null;
    else {
      tmp0_safe_receiver.l1o(new PathWrite('APPEND', tmp4, path, oldV, newV));
    }
  }
  function handleAppendVar($this, n, env) {
    // Inline function 'kotlin.require' call
    if (!env.w1(n.v1q_1)) {
      var message = "APPEND TO variable '" + n.v1q_1 + "' not found; declare with LET first";
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var cur = env.y1(n.v1q_1);
    var tmp;
    if (cur == null) {
      var tmp1_safe_receiver = n.x1q_1;
      var tmp_0;
      if (tmp1_safe_receiver == null) {
        tmp_0 = null;
      } else {
        // Inline function 'kotlin.let' call
        tmp_0 = $this.m1g_1(tmp1_safe_receiver, env);
      }
      var tmp2_elvis_lhs = tmp_0;
      var iv = tmp2_elvis_lhs == null ? emptyList() : tmp2_elvis_lhs;
      // Inline function 'kotlin.require' call
      if (!isInterface(iv, KtList)) {
        var message_0 = 'INIT for APPEND TO must evaluate to a list';
        throw IllegalArgumentException_init_$Create$(toString(message_0));
      }
      tmp = isInterface(iv, KtList) ? iv : THROW_CCE();
    } else {
      if (!(cur == null) ? isInterface(cur, KtList) : false) {
        tmp = isInterface(cur, KtList) ? cur : THROW_CCE();
      } else {
        var message_1 = "APPEND TO expects list in variable '" + n.v1q_1 + "'";
        throw IllegalStateException_init_$Create$(toString(message_1));
      }
    }
    var base = tmp;
    // Inline function 'kotlin.apply' call
    var this_0 = ArrayList_init_$Create$_0(base.j() + 1 | 0);
    this_0.n(base);
    this_0.e($this.m1g_1(n.w1q_1, env));
    var appended = this_0;
    // Inline function 'kotlin.collections.set' call
    var key = n.v1q_1;
    env.g2(key, appended);
    var tmp4 = n.v1q_1;
    // Inline function 'v2.ir.Exec.emitPathWrite' call
    var path = listOf(n.v1q_1);
    // Inline function 'v2.ir.Exec.currentTracer' call
    var tmp0_elvis_lhs = $this.n1g_1;
    var tmp0_safe_receiver = tmp0_elvis_lhs == null ? Debug_instance.h1f_1 : tmp0_elvis_lhs;
    if (tmp0_safe_receiver == null)
      null;
    else {
      tmp0_safe_receiver.l1o(new PathWrite('APPEND', tmp4, path, cur, appended));
    }
  }
  function handleModify($this, n, env) {
    var delta = propertiesToMap($this, n.z1q_1, env);
    var tmp = n.y1q_1.p1e_1;
    var tmp0_elvis_lhs = tmp instanceof IdentifierExpr ? tmp : null;
    var tmp_0;
    if (tmp0_elvis_lhs == null) {
      var message = 'MODIFY target must start with identifier';
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      tmp_0 = tmp0_elvis_lhs;
    }
    var baseIdent = tmp_0;
    var rootName = baseIdent.n1e_1;
    var tmp1_elvis_lhs = env.y1(rootName);
    var tmp_1;
    if (tmp1_elvis_lhs == null) {
      var message_0 = "MODIFY root '" + rootName + "' not found";
      throw IllegalStateException_init_$Create$(toString(message_0));
    } else {
      tmp_1 = tmp1_elvis_lhs;
    }
    var rootVal = tmp_1;
    // Inline function 'kotlin.collections.map' call
    var this_0 = n.y1q_1.q1e_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      var tmp_2;
      if (item instanceof Static) {
        tmp_2 = item.s1e_1;
      } else {
        if (item instanceof Dynamic) {
          var message_1 = 'MODIFY target must be a static path';
          throw IllegalStateException_init_$Create$(toString(message_1));
        } else {
          noWhenBranchMatchedException();
        }
      }
      var tmp$ret$0 = tmp_2;
      destination.e(tmp$ret$0);
    }
    var parts = destination;
    var updatedRoot = applyAt($this, rootVal, parts, Exec$handleModify$lambda(delta));
    // Inline function 'kotlin.collections.set' call
    env.g2(rootName, updatedRoot);
  }
  function handleOutput($this, n, env, out) {
    // Inline function 'kotlin.collections.plusAssign' call
    var element = propertiesToMap($this, n.a1r_1, env);
    out.e(element);
  }
  function handleExprStmt($this, n, env) {
    $this.m1g_1(n.b1r_1, env);
  }
  function handleIf($this, n, env, out) {
    var tmp;
    if (asBool_0($this, $this.m1g_1(n.c1q_1, env))) {
      tmp = n.d1q_1;
    } else {
      var tmp0_elvis_lhs = n.e1q_1;
      tmp = tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
    }
    var body = tmp;
    execObject($this, body, env, out);
  }
  function handleForEach($this, n, env, out) {
    var iterVal = $this.m1g_1(n.s1p_1, env);
    var tmp;
    if (!(iterVal == null) ? isInterface(iterVal, Iterable) : false) {
      tmp = iterVal;
    } else {
      if (!(iterVal == null) ? isInterface(iterVal, Sequence) : false) {
        tmp = asIterable(iterVal);
      } else {
        var message = 'FOR EACH expects list/iterable/sequence';
        throw IllegalStateException_init_$Create$(toString(message));
      }
    }
    var iterable = tmp;
    var hadOuterVar = env.w1(n.r1p_1);
    var savedOuter = env.y1(n.r1p_1);
    var _iterator__ex2g4s = iterable.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      // Inline function 'kotlin.collections.set' call
      var key = n.r1p_1;
      env.g2(key, item);
      if (n.t1p_1 == null || asBool_0($this, $this.m1g_1(n.t1p_1, env))) {
        execObject($this, n.u1p_1, env, out);
      }
    }
    if (hadOuterVar) {
      // Inline function 'kotlin.collections.set' call
      var key_0 = n.r1p_1;
      env.g2(key_0, savedOuter);
    } else
      env.h2(n.r1p_1);
  }
  function handleTryCatch($this, n, env, out) {
    var attempts = 0;
    $l$loop: while (true) {
      try {
        $this.m1g_1(n.c1r_1, env);
        break $l$loop;
      } catch ($p) {
        if ($p instanceof Exception) {
          var _unused_var__etf5q3 = $p;
          var _unary__edvuaz = attempts;
          attempts = _unary__edvuaz + 1 | 0;
          if (_unary__edvuaz >= n.d1r_1) {
            if (!(n.f1r_1 == null)) {
              var tmp = $this.m1g_1(n.f1r_1, env);
              var obj = (!(tmp == null) ? isInterface(tmp, KtMap) : false) ? tmp : THROW_CCE();
              // Inline function 'kotlin.collections.plusAssign' call
              var element = isInterface(obj, KtMap) ? obj : THROW_CCE();
              out.e(element);
              return false;
            }
            var tmp0_safe_receiver = n.e1r_1;
            if (tmp0_safe_receiver == null)
              null;
            else {
              // Inline function 'kotlin.let' call
              appendOutFromValue($this, $this.m1g_1(tmp0_safe_receiver, env), out);
            }
            break $l$loop;
          }
        } else {
          throw $p;
        }
      }
    }
    return true;
  }
  function handleExprOutput($this, n, env, out) {
    appendOutFromValue($this, $this.m1g_1(n.g1r_1, env), out);
  }
  function handleAbort($this, n, env, out) {
    if (n.h1r_1 == null)
      throw IllegalStateException_init_$Create$('ABORT');
    var tmp = $this.m1g_1(n.h1r_1, env);
    var obj = (!(tmp == null) ? isInterface(tmp, KtMap) : false) ? tmp : THROW_CCE();
    // Inline function 'kotlin.collections.plusAssign' call
    var element = isInterface(obj, KtMap) ? obj : THROW_CCE();
    out.e(element);
  }
  function appendOutFromValue($this, v, out) {
    if (v != null) {
      if (!(v == null) ? isInterface(v, KtMap) : false) {
        // Inline function 'kotlin.collections.plusAssign' call
        var element = normalizeMapKeys($this, v);
        out.e(element);
      } else {
        if (!(v == null) ? isInterface(v, KtList) : false) {
          var _iterator__ex2g4s = v.g();
          while (_iterator__ex2g4s.h()) {
            var e = _iterator__ex2g4s.i();
            // Inline function 'kotlin.require' call
            if (!(!(e == null) ? isInterface(e, KtMap) : false)) {
              var tmp;
              if (e == null) {
                tmp = null;
              } else {
                // Inline function 'kotlin.let' call
                tmp = getKClassFromExpression(e).m9();
              }
              var tmp1_elvis_lhs = tmp;
              var message = 'Expected list of objects in OUTPUT, got ' + (tmp1_elvis_lhs == null ? 'null' : tmp1_elvis_lhs);
              throw IllegalArgumentException_init_$Create$(toString(message));
            }
            // Inline function 'kotlin.collections.plusAssign' call
            var element_0 = normalizeMapKeys($this, isInterface(e, KtMap) ? e : THROW_CCE());
            out.e(element_0);
          }
        } else {
          // Inline function 'kotlin.error' call
          var message_0 = 'Expected object or list of objects in OUTPUT, got ' + getKClassFromExpression(v).m9();
          throw IllegalStateException_init_$Create$(toString(message_0));
        }
      }
    }
  }
  function execObject($this, nodes, env, out) {
    var _iterator__ex2g4s = nodes.g();
    while (_iterator__ex2g4s.h()) {
      var n = _iterator__ex2g4s.i();
      // Inline function 'v2.ir.Exec.emitEnter' call
      // Inline function 'v2.ir.Exec.currentTracer' call
      var tmp0_elvis_lhs = $this.n1g_1;
      var t = tmp0_elvis_lhs == null ? Debug_instance.h1f_1 : tmp0_elvis_lhs;
      var tmp1_safe_receiver = t == null ? null : t.k1o();
      if ((tmp1_safe_receiver == null ? null : tmp1_safe_receiver.r1l_1) === true) {
        t.l1o(new Enter(n));
      }
      try {
        if (n instanceof IRLet) {
          handleLet($this, n, env);
        } else {
          if (n instanceof IRSet) {
            handleSet($this, n, env);
          } else {
            if (n instanceof IRAppendTo) {
              handleAppendTo($this, n, env);
            } else {
              if (n instanceof IRModify) {
                handleModify($this, n, env);
              } else {
                if (n instanceof IROutput) {
                  handleOutput($this, n, env, out);
                } else {
                  if (n instanceof IRIf) {
                    handleIf($this, n, env, out);
                  } else {
                    if (n instanceof IRForEach) {
                      handleForEach($this, n, env, out);
                    } else {
                      if (n instanceof IRTryCatch) {
                        var ok = handleTryCatch($this, n, env, out);
                        if (!ok)
                          return Unit_instance;
                      } else {
                        if (n instanceof IRExprOutput) {
                          handleExprOutput($this, n, env, out);
                        } else {
                          if (n instanceof IRAbort) {
                            handleAbort($this, n, env, out);
                            return Unit_instance;
                          } else {
                            if (n instanceof IRExprStmt) {
                              handleExprStmt($this, n, env);
                            } else {
                              if (n instanceof IRReturn)
                                return Unit_instance;
                              else {
                                if (n instanceof IRSetVar) {
                                  handleSetVar($this, n, env);
                                } else {
                                  if (n instanceof IRAppendVar) {
                                    handleAppendVar($this, n, env);
                                  } else {
                                    noWhenBranchMatchedException();
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } catch ($p) {
        if ($p instanceof Error) {
          var t_0 = $p;
          // Inline function 'v2.ir.Exec.emitError' call
          var where = 'while executing ' + getKClassFromExpression(n).m9();
          // Inline function 'v2.ir.Exec.currentTracer' call
          var tmp0_elvis_lhs_0 = $this.n1g_1;
          var tmp0_safe_receiver = tmp0_elvis_lhs_0 == null ? Debug_instance.h1f_1 : tmp0_elvis_lhs_0;
          if (tmp0_safe_receiver == null)
            null;
          else {
            tmp0_safe_receiver.l1o(new Error_0(where, t_0));
          }
          throw t_0;
        } else {
          throw $p;
        }
      }
      finally {
        // Inline function 'v2.ir.Exec.emitExit' call
        // Inline function 'v2.ir.Exec.currentTracer' call
        var tmp0_elvis_lhs_1 = $this.n1g_1;
        var t_1 = tmp0_elvis_lhs_1 == null ? Debug_instance.h1f_1 : tmp0_elvis_lhs_1;
        var tmp1_safe_receiver_0 = t_1 == null ? null : t_1.k1o();
        if ((tmp1_safe_receiver_0 == null ? null : tmp1_safe_receiver_0.r1l_1) === true) {
          t_1.l1o(new Exit(n));
        }
      }
    }
  }
  function Exec$propertiesToMap$lambda(this$0, $p, $env) {
    return function () {
      return this$0.m1g_1($p.j1i_1, $env);
    };
  }
  function Exec$propertiesToMap$lambda_0(this$0, $p, $env) {
    return function () {
      return this$0.m1g_1($p.l1i_1, $env);
    };
  }
  function Exec$fullPath$lambda(it) {
    return it.h1q_1;
  }
  function Exec$handleModify$lambda($delta) {
    return function (obj) {
      // Inline function 'kotlin.apply' call
      var this_0 = LinkedHashMap_init_$Create$_0(obj.j() + $delta.j() | 0);
      this_0.i2(obj);
      this_0.i2($delta);
      return this_0;
    };
  }
  function CKind_MAP_getInstance() {
    CKind_initEntries();
    return CKind_MAP_instance;
  }
  function CKind_LIST_getInstance() {
    CKind_initEntries();
    return CKind_LIST_instance;
  }
  function Exec(ir, eval_0, tracer) {
    tracer = tracer === VOID ? null : tracer;
    this.l1g_1 = ir;
    this.m1g_1 = eval_0;
    this.n1g_1 = tracer;
  }
  protoOf(Exec).o1g = function (env, stringifyKeys) {
    // Inline function 'kotlin.collections.mutableListOf' call
    var out = ArrayList_init_$Create$();
    execObject(this, this.l1g_1, env, out);
    var res;
    switch (out.j()) {
      case 0:
        res = null;
        break;
      case 1:
        res = first(out);
        break;
      default:
        res = out;
        break;
    }
    return !stringifyKeys ? res : stringify(this, res);
  };
  function IRLet(name, expr) {
    this.m1o_1 = name;
    this.n1o_1 = expr;
  }
  protoOf(IRLet).toString = function () {
    return 'IRLet(name=' + this.m1o_1 + ', expr=' + toString(this.n1o_1) + ')';
  };
  protoOf(IRLet).hashCode = function () {
    var result = getStringHashCode(this.m1o_1);
    result = imul(result, 31) + hashCode(this.n1o_1) | 0;
    return result;
  };
  protoOf(IRLet).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof IRLet))
      return false;
    var tmp0_other_with_cast = other instanceof IRLet ? other : THROW_CCE();
    if (!(this.m1o_1 === tmp0_other_with_cast.m1o_1))
      return false;
    if (!equals_0(this.n1o_1, tmp0_other_with_cast.n1o_1))
      return false;
    return true;
  };
  function IRModify(target, updates) {
    this.y1q_1 = target;
    this.z1q_1 = updates;
  }
  protoOf(IRModify).toString = function () {
    return 'IRModify(target=' + this.y1q_1.toString() + ', updates=' + toString(this.z1q_1) + ')';
  };
  protoOf(IRModify).hashCode = function () {
    var result = this.y1q_1.hashCode();
    result = imul(result, 31) + hashCode(this.z1q_1) | 0;
    return result;
  };
  protoOf(IRModify).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof IRModify))
      return false;
    var tmp0_other_with_cast = other instanceof IRModify ? other : THROW_CCE();
    if (!this.y1q_1.equals(tmp0_other_with_cast.y1q_1))
      return false;
    if (!equals_0(this.z1q_1, tmp0_other_with_cast.z1q_1))
      return false;
    return true;
  };
  function IROutput(fields) {
    this.a1r_1 = fields;
  }
  protoOf(IROutput).toString = function () {
    return 'IROutput(fields=' + toString(this.a1r_1) + ')';
  };
  protoOf(IROutput).hashCode = function () {
    return hashCode(this.a1r_1);
  };
  protoOf(IROutput).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof IROutput))
      return false;
    var tmp0_other_with_cast = other instanceof IROutput ? other : THROW_CCE();
    if (!equals_0(this.a1r_1, tmp0_other_with_cast.a1r_1))
      return false;
    return true;
  };
  function IRForEach(varName, iterable, where, body) {
    this.r1p_1 = varName;
    this.s1p_1 = iterable;
    this.t1p_1 = where;
    this.u1p_1 = body;
  }
  protoOf(IRForEach).toString = function () {
    return 'IRForEach(varName=' + this.r1p_1 + ', iterable=' + toString(this.s1p_1) + ', where=' + toString_0(this.t1p_1) + ', body=' + toString(this.u1p_1) + ')';
  };
  protoOf(IRForEach).hashCode = function () {
    var result = getStringHashCode(this.r1p_1);
    result = imul(result, 31) + hashCode(this.s1p_1) | 0;
    result = imul(result, 31) + (this.t1p_1 == null ? 0 : hashCode(this.t1p_1)) | 0;
    result = imul(result, 31) + hashCode(this.u1p_1) | 0;
    return result;
  };
  protoOf(IRForEach).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof IRForEach))
      return false;
    var tmp0_other_with_cast = other instanceof IRForEach ? other : THROW_CCE();
    if (!(this.r1p_1 === tmp0_other_with_cast.r1p_1))
      return false;
    if (!equals_0(this.s1p_1, tmp0_other_with_cast.s1p_1))
      return false;
    if (!equals_0(this.t1p_1, tmp0_other_with_cast.t1p_1))
      return false;
    if (!equals_0(this.u1p_1, tmp0_other_with_cast.u1p_1))
      return false;
    return true;
  };
  function IRIf(condition, thenBody, elseBody) {
    this.c1q_1 = condition;
    this.d1q_1 = thenBody;
    this.e1q_1 = elseBody;
  }
  protoOf(IRIf).toString = function () {
    return 'IRIf(condition=' + toString(this.c1q_1) + ', thenBody=' + toString(this.d1q_1) + ', elseBody=' + toString_0(this.e1q_1) + ')';
  };
  protoOf(IRIf).hashCode = function () {
    var result = hashCode(this.c1q_1);
    result = imul(result, 31) + hashCode(this.d1q_1) | 0;
    result = imul(result, 31) + (this.e1q_1 == null ? 0 : hashCode(this.e1q_1)) | 0;
    return result;
  };
  protoOf(IRIf).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof IRIf))
      return false;
    var tmp0_other_with_cast = other instanceof IRIf ? other : THROW_CCE();
    if (!equals_0(this.c1q_1, tmp0_other_with_cast.c1q_1))
      return false;
    if (!equals_0(this.d1q_1, tmp0_other_with_cast.d1q_1))
      return false;
    if (!equals_0(this.e1q_1, tmp0_other_with_cast.e1q_1))
      return false;
    return true;
  };
  function IRSet(target, value) {
    this.o1q_1 = target;
    this.p1q_1 = value;
  }
  protoOf(IRSet).toString = function () {
    return 'IRSet(target=' + this.o1q_1.toString() + ', value=' + toString(this.p1q_1) + ')';
  };
  protoOf(IRSet).hashCode = function () {
    var result = this.o1q_1.hashCode();
    result = imul(result, 31) + hashCode(this.p1q_1) | 0;
    return result;
  };
  protoOf(IRSet).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof IRSet))
      return false;
    var tmp0_other_with_cast = other instanceof IRSet ? other : THROW_CCE();
    if (!this.o1q_1.equals(tmp0_other_with_cast.o1q_1))
      return false;
    if (!equals_0(this.p1q_1, tmp0_other_with_cast.p1q_1))
      return false;
    return true;
  };
  function IRAppendTo(target, value, init) {
    this.s1q_1 = target;
    this.t1q_1 = value;
    this.u1q_1 = init;
  }
  protoOf(IRAppendTo).toString = function () {
    return 'IRAppendTo(target=' + this.s1q_1.toString() + ', value=' + toString(this.t1q_1) + ', init=' + toString_0(this.u1q_1) + ')';
  };
  protoOf(IRAppendTo).hashCode = function () {
    var result = this.s1q_1.hashCode();
    result = imul(result, 31) + hashCode(this.t1q_1) | 0;
    result = imul(result, 31) + (this.u1q_1 == null ? 0 : hashCode(this.u1q_1)) | 0;
    return result;
  };
  protoOf(IRAppendTo).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof IRAppendTo))
      return false;
    var tmp0_other_with_cast = other instanceof IRAppendTo ? other : THROW_CCE();
    if (!this.s1q_1.equals(tmp0_other_with_cast.s1q_1))
      return false;
    if (!equals_0(this.t1q_1, tmp0_other_with_cast.t1q_1))
      return false;
    if (!equals_0(this.u1q_1, tmp0_other_with_cast.u1q_1))
      return false;
    return true;
  };
  function IRTryCatch(tryExpr, retry, fallbackExpr, fallbackAbort) {
    this.c1r_1 = tryExpr;
    this.d1r_1 = retry;
    this.e1r_1 = fallbackExpr;
    this.f1r_1 = fallbackAbort;
  }
  protoOf(IRTryCatch).toString = function () {
    return 'IRTryCatch(tryExpr=' + toString(this.c1r_1) + ', retry=' + this.d1r_1 + ', fallbackExpr=' + toString_0(this.e1r_1) + ', fallbackAbort=' + toString_0(this.f1r_1) + ')';
  };
  protoOf(IRTryCatch).hashCode = function () {
    var result = hashCode(this.c1r_1);
    result = imul(result, 31) + this.d1r_1 | 0;
    result = imul(result, 31) + (this.e1r_1 == null ? 0 : hashCode(this.e1r_1)) | 0;
    result = imul(result, 31) + (this.f1r_1 == null ? 0 : hashCode(this.f1r_1)) | 0;
    return result;
  };
  protoOf(IRTryCatch).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof IRTryCatch))
      return false;
    var tmp0_other_with_cast = other instanceof IRTryCatch ? other : THROW_CCE();
    if (!equals_0(this.c1r_1, tmp0_other_with_cast.c1r_1))
      return false;
    if (!(this.d1r_1 === tmp0_other_with_cast.d1r_1))
      return false;
    if (!equals_0(this.e1r_1, tmp0_other_with_cast.e1r_1))
      return false;
    if (!equals_0(this.f1r_1, tmp0_other_with_cast.f1r_1))
      return false;
    return true;
  };
  function IRReturn(value) {
    this.f1q_1 = value;
  }
  protoOf(IRReturn).toString = function () {
    return 'IRReturn(value=' + toString_0(this.f1q_1) + ')';
  };
  protoOf(IRReturn).hashCode = function () {
    return this.f1q_1 == null ? 0 : hashCode(this.f1q_1);
  };
  protoOf(IRReturn).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof IRReturn))
      return false;
    var tmp0_other_with_cast = other instanceof IRReturn ? other : THROW_CCE();
    if (!equals_0(this.f1q_1, tmp0_other_with_cast.f1q_1))
      return false;
    return true;
  };
  function IRAbort(value) {
    this.h1r_1 = value;
  }
  protoOf(IRAbort).toString = function () {
    return 'IRAbort(value=' + toString_0(this.h1r_1) + ')';
  };
  protoOf(IRAbort).hashCode = function () {
    return this.h1r_1 == null ? 0 : hashCode(this.h1r_1);
  };
  protoOf(IRAbort).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof IRAbort))
      return false;
    var tmp0_other_with_cast = other instanceof IRAbort ? other : THROW_CCE();
    if (!equals_0(this.h1r_1, tmp0_other_with_cast.h1r_1))
      return false;
    return true;
  };
  function IRExprOutput(expr) {
    this.g1r_1 = expr;
  }
  protoOf(IRExprOutput).toString = function () {
    return 'IRExprOutput(expr=' + toString(this.g1r_1) + ')';
  };
  protoOf(IRExprOutput).hashCode = function () {
    return hashCode(this.g1r_1);
  };
  protoOf(IRExprOutput).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof IRExprOutput))
      return false;
    var tmp0_other_with_cast = other instanceof IRExprOutput ? other : THROW_CCE();
    if (!equals_0(this.g1r_1, tmp0_other_with_cast.g1r_1))
      return false;
    return true;
  };
  function IRExprStmt(expr) {
    this.b1r_1 = expr;
  }
  protoOf(IRExprStmt).toString = function () {
    return 'IRExprStmt(expr=' + toString(this.b1r_1) + ')';
  };
  protoOf(IRExprStmt).hashCode = function () {
    return hashCode(this.b1r_1);
  };
  protoOf(IRExprStmt).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof IRExprStmt))
      return false;
    var tmp0_other_with_cast = other instanceof IRExprStmt ? other : THROW_CCE();
    if (!equals_0(this.b1r_1, tmp0_other_with_cast.b1r_1))
      return false;
    return true;
  };
  function IRSetVar(name, value) {
    this.q1q_1 = name;
    this.r1q_1 = value;
  }
  protoOf(IRSetVar).toString = function () {
    return 'IRSetVar(name=' + this.q1q_1 + ', value=' + toString(this.r1q_1) + ')';
  };
  protoOf(IRSetVar).hashCode = function () {
    var result = getStringHashCode(this.q1q_1);
    result = imul(result, 31) + hashCode(this.r1q_1) | 0;
    return result;
  };
  protoOf(IRSetVar).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof IRSetVar))
      return false;
    var tmp0_other_with_cast = other instanceof IRSetVar ? other : THROW_CCE();
    if (!(this.q1q_1 === tmp0_other_with_cast.q1q_1))
      return false;
    if (!equals_0(this.r1q_1, tmp0_other_with_cast.r1q_1))
      return false;
    return true;
  };
  function IRAppendVar(name, value, init) {
    this.v1q_1 = name;
    this.w1q_1 = value;
    this.x1q_1 = init;
  }
  protoOf(IRAppendVar).toString = function () {
    return 'IRAppendVar(name=' + this.v1q_1 + ', value=' + toString(this.w1q_1) + ', init=' + toString_0(this.x1q_1) + ')';
  };
  protoOf(IRAppendVar).hashCode = function () {
    var result = getStringHashCode(this.v1q_1);
    result = imul(result, 31) + hashCode(this.w1q_1) | 0;
    result = imul(result, 31) + (this.x1q_1 == null ? 0 : hashCode(this.x1q_1)) | 0;
    return result;
  };
  protoOf(IRAppendVar).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof IRAppendVar))
      return false;
    var tmp0_other_with_cast = other instanceof IRAppendVar ? other : THROW_CCE();
    if (!(this.v1q_1 === tmp0_other_with_cast.v1q_1))
      return false;
    if (!equals_0(this.w1q_1, tmp0_other_with_cast.w1q_1))
      return false;
    if (!equals_0(this.x1q_1, tmp0_other_with_cast.x1q_1))
      return false;
    return true;
  };
  function compileStmt($this, s) {
    var tmp;
    if (s instanceof LetStmt) {
      tmp = listOf(new IRLet(s.m1i_1, s.n1i_1));
    } else {
      if (s instanceof SetStmt) {
        tmp = listOf(new IRSet(s.p1i_1, s.q1i_1));
      } else {
        if (s instanceof AppendToStmt) {
          tmp = listOf(new IRAppendTo(s.v1i_1, s.w1i_1, s.x1i_1));
        } else {
          if (s instanceof OutputStmt) {
            var tpl = s.g1j_1;
            var tmp_0;
            if (tpl instanceof ObjectExpr) {
              tmp_0 = listOf(new IROutput(tpl.l1k_1));
            } else {
              tmp_0 = listOf(new IRExprOutput(tpl));
            }
            tmp = tmp_0;
          } else {
            if (s instanceof ModifyStmt) {
              tmp = listOf(new IRModify(s.d1j_1, s.e1j_1));
            } else {
              if (s instanceof IfStmt) {
                var tmp_1 = $this.k1g(s.j1j_1.y1j_1);
                var tmp1_safe_receiver = s.k1j_1;
                var tmp_2;
                if (tmp1_safe_receiver == null) {
                  tmp_2 = null;
                } else {
                  // Inline function 'kotlin.let' call
                  tmp_2 = $this.k1g(tmp1_safe_receiver.y1j_1);
                }
                tmp = listOf(new IRIf(s.i1j_1, tmp_1, tmp_2));
              } else {
                if (s instanceof ForEachStmt) {
                  tmp = listOf(new IRForEach(s.m1j_1, s.n1j_1, s.p1j_1, $this.k1g(s.o1j_1.y1j_1)));
                } else {
                  if (s instanceof TryCatchStmt) {
                    var tmp2_elvis_lhs = s.t1j_1;
                    var tmp_3 = tmp2_elvis_lhs == null ? 0 : tmp2_elvis_lhs;
                    var tmp3_safe_receiver = s.w1j_1;
                    tmp = listOf(new IRTryCatch(s.r1j_1, tmp_3, s.v1j_1, tmp3_safe_receiver == null ? null : tmp3_safe_receiver.c1k_1));
                  } else {
                    if (s instanceof AbortStmt) {
                      tmp = listOf(new IRAbort(s.c1k_1));
                    } else {
                      if (s instanceof ReturnStmt) {
                        tmp = listOf(new IRReturn(s.a1k_1));
                      } else {
                        if (s instanceof ExprStmt) {
                          tmp = listOf(new IRExprStmt(s.e1k_1));
                        } else {
                          if (s instanceof SetVarStmt) {
                            tmp = listOf(new IRSetVar(s.s1i_1, s.t1i_1));
                          } else {
                            if (s instanceof AppendToVarStmt) {
                              tmp = listOf(new IRAppendVar(s.z1i_1, s.a1j_1, s.b1j_1));
                            } else {
                              var message = 'Stmt kind ' + getKClassFromExpression(s).m9() + ' unsupported in STREAM';
                              throw IllegalStateException_init_$Create$(toString(message));
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return tmp;
  }
  function ToIR(funcs, hostFns) {
    this.i1g_1 = funcs;
    this.j1g_1 = hostFns;
  }
  protoOf(ToIR).k1g = function (stmts) {
    // Inline function 'kotlin.collections.flatMap' call
    // Inline function 'kotlin.collections.flatMapTo' call
    var destination = ArrayList_init_$Create$();
    var _iterator__ex2g4s = stmts.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      var list = compileStmt(this, element);
      addAll(destination, list);
    }
    return destination;
  };
  function SemanticException(msg, token) {
    RuntimeException_init_$Init$('[' + token.j1e_1 + ':' + token.k1e_1 + '] ' + msg + " near '" + token.i1e_1 + "'", this);
    captureStack(this, SemanticException);
    this.z1g_1 = token;
  }
  function collectGlobals($this, prog) {
    var _iterator__ex2g4s = prog.s1f_1.g();
    $l$loop_1: while (_iterator__ex2g4s.h()) {
      var decl = _iterator__ex2g4s.i();
      var tmp;
      if (decl instanceof FuncDecl) {
        tmp = decl.y1f_1;
      } else {
        if (decl instanceof SharedDecl) {
          tmp = decl.o1h_1;
        } else {
          if (decl instanceof TypeDecl) {
            tmp = decl.v1h_1;
          } else {
            if (decl instanceof SourceDecl) {
              tmp = decl.z1h_1;
            } else {
              if (decl instanceof TransformDecl) {
                var tmp1_elvis_lhs = decl.t1f_1;
                var tmp_0;
                if (tmp1_elvis_lhs == null) {
                  continue $l$loop_1;
                } else {
                  tmp_0 = tmp1_elvis_lhs;
                }
                tmp = tmp_0;
              } else {
                if (decl instanceof OutputDecl) {
                  continue $l$loop_1;
                } else {
                  noWhenBranchMatchedException();
                }
              }
            }
          }
        }
      }
      var name = tmp;
      var prev = $this.d1g_1.y1(name);
      if (prev == null) {
        // Inline function 'kotlin.collections.set' call
        $this.d1g_1.g2(name, decl);
        continue $l$loop_1;
      }
      var tmp_1;
      if (prev instanceof FuncDecl) {
        tmp_1 = prev.b1g_1;
      } else {
        if (prev instanceof SharedDecl) {
          tmp_1 = prev.q1h_1;
        } else {
          if (prev instanceof TypeDecl) {
            tmp_1 = prev.y1h_1;
          } else {
            if (prev instanceof SourceDecl) {
              tmp_1 = prev.b1i_1;
            } else {
              if (prev instanceof TransformDecl) {
                tmp_1 = prev.x1f_1;
              } else {
                var message = 'should not be here';
                throw IllegalStateException_init_$Create$(toString(message));
              }
            }
          }
        }
      }
      var tok = tmp_1;
      throw new SemanticException("Duplicate symbol '" + name + "'", tok);
    }
  }
  function checkTopLevel($this, decl) {
    var tmp;
    if (decl instanceof TransformDecl) {
      var prev = $this.f1g_1;
      $this.f1g_1 = decl.v1f_1;
      var tmp_0 = decl.w1f_1;
      if (!(tmp_0 instanceof CodeBlock))
        THROW_CCE();
      checkBlock($this, decl.w1f_1);
      $this.f1g_1 = prev;
      tmp = Unit_instance;
    } else {
      if (decl instanceof FuncDecl) {
        var b = decl.a1g_1;
        var tmp_1;
        if (b instanceof ExprBody) {
          checkExpr($this, b.r1h_1);
          tmp_1 = Unit_instance;
        } else {
          if (b instanceof BlockBody) {
            checkBlock($this, b.t1h_1);
            tmp_1 = Unit_instance;
          } else {
            noWhenBranchMatchedException();
          }
        }
        tmp = tmp_1;
      } else {
        tmp = Unit_instance;
      }
    }
    return tmp;
  }
  function checkBlock($this, block) {
    // Inline function 'kotlin.collections.mutableSetOf' call
    var tmp$ret$0 = LinkedHashSet_init_$Create$();
    $this.e1g_1.ed(tmp$ret$0);
    var _iterator__ex2g4s = block.y1j_1.g();
    while (_iterator__ex2g4s.h()) {
      var stmt = _iterator__ex2g4s.i();
      checkStmt($this, stmt);
    }
    $this.e1g_1.gd();
  }
  function checkStmt($this, stmt) {
    var tmp;
    if (stmt instanceof LetStmt) {
      var scope = $this.e1g_1.bd();
      if (scope.s1(stmt.m1i_1)) {
        throw new SemanticException("Duplicate LET '" + stmt.m1i_1 + "' in same block", stmt.o1i_1);
      }
      var tmp0 = dropLast($this.e1g_1, 1);
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
          if (element.s1(stmt.m1i_1)) {
            tmp$ret$0 = true;
            break $l$block_0;
          }
        }
        tmp$ret$0 = false;
      }
      if (tmp$ret$0) {
        throw new SemanticException("Shadowing variable '" + stmt.m1i_1 + "' is not allowed", stmt.o1i_1);
      }
      // Inline function 'kotlin.collections.plusAssign' call
      var element_0 = stmt.m1i_1;
      scope.e(element_0);
      checkExpr($this, stmt.n1i_1);
      tmp = Unit_instance;
    } else {
      if (stmt instanceof SetStmt) {
        var tmp_1 = stmt.p1i_1.p1e_1;
        var tmp1_elvis_lhs = tmp_1 instanceof IdentifierExpr ? tmp_1 : null;
        var tmp_2;
        if (tmp1_elvis_lhs == null) {
          throw new SemanticException('SET target must start with identifier', stmt.r1i_1);
        } else {
          tmp_2 = tmp1_elvis_lhs;
        }
        var baseIdent = tmp_2;
        var tmp0_0 = $this.e1g_1;
        var tmp$ret$3;
        $l$block_2: {
          // Inline function 'kotlin.collections.any' call
          var tmp_3;
          if (isInterface(tmp0_0, Collection)) {
            tmp_3 = tmp0_0.p();
          } else {
            tmp_3 = false;
          }
          if (tmp_3) {
            tmp$ret$3 = false;
            break $l$block_2;
          }
          var _iterator__ex2g4s_0 = tmp0_0.g();
          while (_iterator__ex2g4s_0.h()) {
            var element_1 = _iterator__ex2g4s_0.i();
            if (element_1.s1(baseIdent.n1e_1)) {
              tmp$ret$3 = true;
              break $l$block_2;
            }
          }
          tmp$ret$3 = false;
        }
        var inScope = tmp$ret$3;
        if (!inScope)
          throw new SemanticException("Unknown variable '" + baseIdent.n1e_1 + "' in same block", stmt.r1i_1);
        if (stmt.p1i_1.q1e_1.p()) {
          throw new SemanticException('SET target must have at least one segment', stmt.r1i_1);
        }
        checkExpr($this, stmt.q1i_1);
        tmp = true;
      } else {
        if (stmt instanceof ModifyStmt) {
          var tmp_4 = stmt.d1j_1.p1e_1;
          var tmp2_elvis_lhs = tmp_4 instanceof IdentifierExpr ? tmp_4 : null;
          var tmp_5;
          if (tmp2_elvis_lhs == null) {
            throw new SemanticException('MODIFY required identifier', stmt.f1j_1);
          } else {
            tmp_5 = tmp2_elvis_lhs;
          }
          var targetPath = tmp_5;
          var rootName = targetPath.n1e_1;
          var tmp0_1 = $this.e1g_1;
          var tmp$ret$5;
          $l$block_4: {
            // Inline function 'kotlin.collections.none' call
            var tmp_6;
            if (isInterface(tmp0_1, Collection)) {
              tmp_6 = tmp0_1.p();
            } else {
              tmp_6 = false;
            }
            if (tmp_6) {
              tmp$ret$5 = true;
              break $l$block_4;
            }
            var _iterator__ex2g4s_1 = tmp0_1.g();
            while (_iterator__ex2g4s_1.h()) {
              var element_2 = _iterator__ex2g4s_1.i();
              if (element_2.s1(rootName)) {
                tmp$ret$5 = false;
                break $l$block_4;
              }
            }
            tmp$ret$5 = true;
          }
          var notInScope = tmp$ret$5;
          if (notInScope) {
            throw new SemanticException("Unknown variable name '" + rootName + "' in same block", stmt.f1j_1);
          }
          // Inline function 'kotlin.collections.forEach' call
          var _iterator__ex2g4s_2 = stmt.d1j_1.q1e_1.g();
          while (_iterator__ex2g4s_2.h()) {
            var element_3 = _iterator__ex2g4s_2.i();
            if (!(element_3 instanceof Static)) {
              throw new SemanticException('MODIFY target must be a static path', stmt.f1j_1);
            }
          }
          var seen = HashSet_init_$Create$();
          // Inline function 'kotlin.collections.forEach' call
          var _iterator__ex2g4s_3 = stmt.e1j_1.g();
          while (_iterator__ex2g4s_3.h()) {
            var element_4 = _iterator__ex2g4s_3.i();
            if (element_4 instanceof LiteralProperty) {
              var k = element_4.i1i_1;
              var tmp_7;
              if (k instanceof Name) {
                tmp_7 = _Name___get_v__impl__vuc4w5(k.t1e_1);
              } else {
                if (k instanceof I32) {
                  tmp_7 = _I32___get_v__impl__4258ps(k.y1e_1);
                } else {
                  if (k instanceof I64) {
                    tmp_7 = _I64___get_v__impl__gpphb3(k.z1e_1);
                  } else {
                    if (k instanceof IBig) {
                      tmp_7 = _IBig___get_v__impl__986dq1(k.g1f_1);
                    } else {
                      noWhenBranchMatchedException();
                    }
                  }
                }
              }
              var raw = tmp_7;
              if (!seen.e(raw)) {
                throw new SemanticException('Duplicate literal key in MODIFY: ' + toString(raw), stmt.f1j_1);
              }
            } else {
              if (!(element_4 instanceof ComputedProperty)) {
                noWhenBranchMatchedException();
              }
            }
          }
          tmp = true;
        } else {
          if (stmt instanceof AppendToStmt) {
            var tmp_8 = stmt.v1i_1.p1e_1;
            var tmp3_elvis_lhs = tmp_8 instanceof IdentifierExpr ? tmp_8 : null;
            var tmp_9;
            if (tmp3_elvis_lhs == null) {
              throw new SemanticException('APPEND TO target must start with identifier', stmt.y1i_1);
            } else {
              tmp_9 = tmp3_elvis_lhs;
            }
            var baseIdent_0 = tmp_9;
            var tmp0_2 = $this.e1g_1;
            var tmp$ret$11;
            $l$block_6: {
              // Inline function 'kotlin.collections.any' call
              var tmp_10;
              if (isInterface(tmp0_2, Collection)) {
                tmp_10 = tmp0_2.p();
              } else {
                tmp_10 = false;
              }
              if (tmp_10) {
                tmp$ret$11 = false;
                break $l$block_6;
              }
              var _iterator__ex2g4s_4 = tmp0_2.g();
              while (_iterator__ex2g4s_4.h()) {
                var element_5 = _iterator__ex2g4s_4.i();
                if (element_5.s1(baseIdent_0.n1e_1)) {
                  tmp$ret$11 = true;
                  break $l$block_6;
                }
              }
              tmp$ret$11 = false;
            }
            var inScope_0 = tmp$ret$11;
            if (!inScope_0)
              throw new SemanticException("Unknown variable '" + baseIdent_0.n1e_1 + "'", stmt.y1i_1);
            checkExpr($this, stmt.w1i_1);
            var tmp4_safe_receiver = stmt.x1i_1;
            if (tmp4_safe_receiver == null)
              null;
            else {
              // Inline function 'kotlin.let' call
              checkExpr($this, tmp4_safe_receiver);
            }
            tmp = true;
          } else {
            if (stmt instanceof OutputStmt) {
              checkExpr($this, stmt.g1j_1);
              tmp = Unit_instance;
            } else {
              if (stmt instanceof IfStmt) {
                checkExpr($this, stmt.i1j_1);
                checkBlock($this, stmt.j1j_1);
                var tmp5_safe_receiver = stmt.k1j_1;
                var tmp_11;
                if (tmp5_safe_receiver == null) {
                  tmp_11 = null;
                } else {
                  // Inline function 'kotlin.let' call
                  checkBlock($this, tmp5_safe_receiver);
                  tmp_11 = Unit_instance;
                }
                tmp = tmp_11;
              } else {
                if (stmt instanceof ForEachStmt) {
                  checkExpr($this, stmt.n1j_1);
                  $this.e1g_1.ed(mutableSetOf([stmt.m1j_1]));
                  var tmp6_safe_receiver = stmt.p1j_1;
                  if (tmp6_safe_receiver == null)
                    null;
                  else {
                    // Inline function 'kotlin.let' call
                    checkExpr($this, tmp6_safe_receiver);
                  }
                  checkBlock($this, stmt.o1j_1);
                  tmp = $this.e1g_1.gd();
                } else {
                  if (stmt instanceof TryCatchStmt) {
                    checkExpr($this, stmt.r1j_1);
                    if (!(stmt.v1j_1 == null)) {
                      checkExpr($this, stmt.v1j_1);
                    }
                    if (!(stmt.w1j_1 == null) && !(stmt.w1j_1.c1k_1 == null)) {
                      checkExpr($this, stmt.w1j_1.c1k_1);
                    }
                    tmp = Unit_instance;
                  } else {
                    if (stmt instanceof ReturnStmt) {
                      var tmp7_safe_receiver = stmt.a1k_1;
                      var tmp_12;
                      if (tmp7_safe_receiver == null) {
                        tmp_12 = null;
                      } else {
                        // Inline function 'kotlin.let' call
                        checkExpr($this, tmp7_safe_receiver);
                        tmp_12 = Unit_instance;
                      }
                      tmp = tmp_12;
                    } else {
                      if (stmt instanceof AbortStmt) {
                        var tmp8_safe_receiver = stmt.c1k_1;
                        var tmp_13;
                        if (tmp8_safe_receiver == null) {
                          tmp_13 = null;
                        } else {
                          // Inline function 'kotlin.let' call
                          checkExpr($this, tmp8_safe_receiver);
                          tmp_13 = Unit_instance;
                        }
                        tmp = tmp_13;
                      } else {
                        if (stmt instanceof CodeBlock) {
                          tmp = true;
                        } else {
                          if (stmt instanceof Connection) {
                            tmp = true;
                          } else {
                            if (stmt instanceof GraphOutput) {
                              tmp = true;
                            } else {
                              if (stmt instanceof NodeDecl) {
                                tmp = true;
                              } else {
                                if (stmt instanceof ExprStmt) {
                                  tmp = true;
                                } else {
                                  if (stmt instanceof AppendToVarStmt) {
                                    tmp = true;
                                  } else {
                                    if (stmt instanceof SetVarStmt) {
                                      tmp = true;
                                    } else {
                                      noWhenBranchMatchedException();
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return tmp;
  }
  function checkExpr($this, expr) {
    if (expr instanceof IdentifierExpr) {
      if (!isIdentifierVisible($this, expr.n1e_1)) {
        throw new SemanticException("Undefined identifier '" + expr.n1e_1 + "'", expr.o1e_1);
      }
    } else {
      if (expr instanceof CallExpr) {
        checkExpr($this, expr.n1k_1);
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s = expr.o1k_1.g();
        while (_iterator__ex2g4s.h()) {
          var element = _iterator__ex2g4s.i();
          checkExpr($this, element);
        }
      } else {
        if (expr instanceof BinaryExpr) {
          checkExpr($this, expr.t1k_1);
          checkExpr($this, expr.v1k_1);
        } else {
          if (expr instanceof IfElseExpr) {
            checkExpr($this, expr.k1l_1);
            checkExpr($this, expr.l1l_1);
            checkExpr($this, expr.m1l_1);
          } else {
            if (expr instanceof UnaryExpr) {
              if (expr.x1k_1.h1e_1.equals(TokenType_SUSPEND_getInstance()) && equals_0($this.f1g_1, Mode_STREAM_getInstance())) {
                throw new SemanticException("Cannot use 'suspend' inside stream transform", expr.x1k_1);
              }
              checkExpr($this, expr.w1k_1);
            } else {
              if (expr instanceof ObjectExpr) {
                // Inline function 'kotlin.collections.forEach' call
                var _iterator__ex2g4s_0 = expr.l1k_1.g();
                while (_iterator__ex2g4s_0.h()) {
                  var element_0 = _iterator__ex2g4s_0.i();
                  if (element_0 instanceof LiteralProperty) {
                    checkExpr($this, element_0.j1i_1);
                  } else {
                    if (element_0 instanceof ComputedProperty) {
                      checkExpr($this, element_0.k1i_1);
                      checkExpr($this, element_0.l1i_1);
                    } else {
                      noWhenBranchMatchedException();
                    }
                  }
                }
              } else {
                if (expr instanceof ArrayCompExpr) {
                  checkExpr($this, expr.g1l_1);
                  $this.e1g_1.e(mutableSetOf([expr.f1l_1]));
                  var tmp1_safe_receiver = expr.i1l_1;
                  if (tmp1_safe_receiver == null)
                    null;
                  else {
                    // Inline function 'kotlin.let' call
                    checkExpr($this, tmp1_safe_receiver);
                  }
                  checkExpr($this, expr.h1l_1);
                  $this.e1g_1.gd();
                }
              }
            }
          }
        }
      }
    }
  }
  function isIdentifierVisible($this, name) {
    var tmp;
    var tmp_0;
    var tmp_1;
    switch (name) {
      case '$':
      case 'row':
        tmp_1 = true;
        break;
      default:
        var tmp0 = $this.e1g_1;
        var tmp$ret$0;
        $l$block_0: {
          // Inline function 'kotlin.collections.any' call
          var tmp_2;
          if (isInterface(tmp0, Collection)) {
            tmp_2 = tmp0.p();
          } else {
            tmp_2 = false;
          }
          if (tmp_2) {
            tmp$ret$0 = false;
            break $l$block_0;
          }
          var _iterator__ex2g4s = tmp0.g();
          while (_iterator__ex2g4s.h()) {
            var element = _iterator__ex2g4s.i();
            if (element.s1(name)) {
              tmp$ret$0 = true;
              break $l$block_0;
            }
          }
          tmp$ret$0 = false;
        }

        tmp_1 = tmp$ret$0;
        break;
    }
    if (tmp_1) {
      tmp_0 = true;
    } else {
      // Inline function 'kotlin.collections.contains' call
      // Inline function 'kotlin.collections.containsKey' call
      var this_0 = $this.d1g_1;
      tmp_0 = (isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).w1(name);
    }
    if (tmp_0) {
      tmp = true;
    } else {
      tmp = $this.c1g_1.s1(name);
    }
    return tmp;
  }
  function SemanticAnalyzer(hostFns) {
    hostFns = hostFns === VOID ? emptySet() : hostFns;
    this.c1g_1 = hostFns;
    var tmp = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp.d1g_1 = LinkedHashMap_init_$Create$();
    this.e1g_1 = ArrayDeque_init_$Create$();
    this.f1g_1 = null;
  }
  protoOf(SemanticAnalyzer).g1g = function (prog) {
    collectGlobals(this, prog);
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = prog.s1f_1.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      checkTopLevel(this, element);
    }
  };
  function TransformRegistry(funcs, hostFns, transforms) {
    this.i1r_1 = funcs;
    this.j1r_1 = hostFns;
    this.k1r_1 = transforms;
    var tmp = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp.l1r_1 = LinkedHashMap_init_$Create$();
  }
  function isBigInt(x) {
    return x instanceof BLBigInt;
  }
  function isBigDec(x) {
    return x instanceof BLBigDec;
  }
  function BLBigInt(v) {
    this.m1r_1 = v;
  }
  function BLBigDec(v) {
    this.n1r_1 = v;
  }
  function blBigIntOfLong(v) {
    return new BLBigInt(v);
  }
  function blBigIntParse(s) {
    return new BLBigInt(toLong_0(s));
  }
  function plus_0(_this__u8e3s4, other) {
    return new BLBigInt(_this__u8e3s4.m1r_1.q2(other.m1r_1));
  }
  function minus(_this__u8e3s4, other) {
    return new BLBigInt(_this__u8e3s4.m1r_1.r2(other.m1r_1));
  }
  function times(_this__u8e3s4, other) {
    return new BLBigInt(_this__u8e3s4.m1r_1.s2(other.m1r_1));
  }
  function div(_this__u8e3s4, other) {
    return new BLBigInt(_this__u8e3s4.m1r_1.t2(other.m1r_1));
  }
  function rem(_this__u8e3s4, other) {
    return new BLBigInt(_this__u8e3s4.m1r_1.u2(other.m1r_1));
  }
  function compareTo_0(_this__u8e3s4, other) {
    return _this__u8e3s4.m1r_1.z(other.m1r_1);
  }
  function signum(_this__u8e3s4) {
    return _this__u8e3s4.m1r_1.z(new Long(0, 0)) > 0 ? 1 : _this__u8e3s4.m1r_1.z(new Long(0, 0)) < 0 ? -1 : 0;
  }
  function toInt_0(_this__u8e3s4) {
    return _this__u8e3s4.m1r_1.e1();
  }
  function toLong_1(_this__u8e3s4) {
    return _this__u8e3s4.m1r_1;
  }
  function bitLength(_this__u8e3s4) {
    var x = _this__u8e3s4.m1r_1;
    if (x.equals(new Long(0, 0)))
      return 0;
    var abs = x.z(new Long(0, 0)) < 0 ? x.w2() : x;
    return 64 - countLeadingZeroBits(abs) | 0;
  }
  function toBLBigDec_0(_this__u8e3s4) {
    return new BLBigDec(_this__u8e3s4.m1r_1.h3());
  }
  function blBigDecOfLong(v) {
    return new BLBigDec(v.h3());
  }
  function blBigDecOfDouble(v) {
    return new BLBigDec(v);
  }
  function blBigDecParse(s) {
    return new BLBigDec(toDouble(s));
  }
  function plus_1(_this__u8e3s4, other) {
    return new BLBigDec(_this__u8e3s4.n1r_1 + other.n1r_1);
  }
  function minus_0(_this__u8e3s4, other) {
    return new BLBigDec(_this__u8e3s4.n1r_1 - other.n1r_1);
  }
  function times_0(_this__u8e3s4, other) {
    return new BLBigDec(_this__u8e3s4.n1r_1 * other.n1r_1);
  }
  function div_0(_this__u8e3s4, other) {
    return new BLBigDec(_this__u8e3s4.n1r_1 / other.n1r_1);
  }
  function rem_0(_this__u8e3s4, other) {
    return new BLBigDec(_this__u8e3s4.n1r_1 % other.n1r_1);
  }
  function compareTo_1(_this__u8e3s4, other) {
    return compareTo(_this__u8e3s4.n1r_1, other.n1r_1);
  }
  function toPlainString(_this__u8e3s4) {
    return _this__u8e3s4.n1r_1.toString();
  }
  function toBLBigInt_0(_this__u8e3s4) {
    return new BLBigInt(numberToLong(_this__u8e3s4.n1r_1));
  }
  function blockingAwait(store, resource, key) {
    throw UnsupportedOperationException_init_$Create$('SharedStore.await is not supported in JS sync eval');
  }
  //region block: init
  Debug_instance = new Debug();
  TraceReport_instance = new TraceReport();
  //endregion
  //region block: exports
  function $jsExportAll$(_) {
    var $playground = _.playground || (_.playground = {});
    defineProp($playground, 'PlaygroundFacade', PlaygroundFacade_getInstance);
    $playground.PlaygroundResult = PlaygroundResult;
  }
  $jsExportAll$(_);
  //endregion
  return _;
}));

//# sourceMappingURL=branchline-interpreter.js.map
