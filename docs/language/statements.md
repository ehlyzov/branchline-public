---
title: Statements
---

# Statements

Statements control execution and side effects within blocks.

## Overview {#source}

The `SOURCE` statement declares a data source for the pipeline.

## Output {#output}

The `OUTPUT` statement specifies how results are emitted from the pipeline.

## Using {#using}

The `USING` clause references adapters and external modules.

## Transform {#transform}

The `TRANSFORM` statement defines transformation steps in the pipeline.

## Stream {#stream}

The `STREAM` mode processes data as a continuous flow.

## Buffer {#buffer}

The `BUFFER` mode collects data before processing.

## For Loops {#for}

The `FOR` and `FOR EACH` statements provide iteration over collections.

## If Statements {#if}

The `IF` statement provides conditional branching.

## Enumerations {#enum}

The `ENUM` statement defines enumerated types.

## For Each {#foreach}

The `FOREACH` statement provides a shortcut for iteration.

## Input {#input}

The `INPUT` keyword references the pipeline input data.

## Parallel {#parallel}

The `PARALLEL` statement enables concurrent execution.

## Abort {#abort}

The `ABORT` statement terminates execution immediately.

## Throw {#throw}

The `THROW` statement raises an exception.

## Try {#try}

The `TRY` statement handles errors and exceptions.

## Shared {#shared}

The `SHARED` statement declares shared memory resources.

## Functions {#func}

The `FUNC` statement declares functions.

## Types {#type}

The `TYPE` statement declares custom types.

## Return {#return}

The `RETURN` statement exits from functions.

## Modify {#modify}

The `MODIFY` statement changes existing values.

## Where {#where}

The `WHERE` clause provides filtering conditions.

## Set {#set}

The `SET` statement performs assignments.

## Init {#init}

The `INIT` statement provides initial values.

```
statement ::= letStmt | ifStmt | forStmt | tryStmt | callStmt
            | sharedWrite | suspendStmt | abortStmt | throwStmt
            | nestedOutput | expressionStmt | ;
```
【F:language/src/test/kotlin/v2/ebnf.txt†L76-L94】

## Variable binding

```
letStmt ::= LET IDENTIFIER "=" expression ";"
```

`LET` introduces a new variable bound to the result of an expression【F:language/src/test/kotlin/v2/ebnf.txt†L82-L82】.

## Control flow

```
ifStmt ::= IF expression block ( ELSE block )?
forStmt ::= ( FOR EACH | FOR ) IDENTIFIER IN expression block
```

Conditionals and loops evaluate expressions to drive branching and iteration【F:language/src/test/kotlin/v2/ebnf.txt†L83-L85】.

## Error handling

```
tryStmt ::= TRY expression CATCH "(" IDENTIFIER ")" "=>" expression
```

`TRY` evaluates an expression and binds an error to the given identifier if one
occurs【F:language/src/test/kotlin/v2/ebnf.txt†L85-L85】.

## Calls and mutation

```
callStmt    ::= optAwait CALL IDENTIFIER "(" argList? ")" arrow IDENTIFIER ";"
sharedWrite ::= IDENTIFIER "[" expression? "]" "=" expression ";"
```

Call statements invoke suspended functions, while `sharedWrite` mutates shared
memory slots【F:language/src/test/kotlin/v2/ebnf.txt†L86-L90】.

## Suspension and termination

```
suspendStmt ::= SUSPEND expression ";"
abortStmt  ::= ABORT expression? ";"
throwStmt  ::= THROW expression? ";"
```

These statements pause or terminate execution, optionally carrying an
expression【F:language/src/test/kotlin/v2/ebnf.txt†L90-L92】.

## Nested output and expressions

```
nestedOutput   ::= OUTPUT templateBlock
expressionStmt ::= expression ";"
```

Nested `OUTPUT` blocks and bare expressions complete the statement set【F:language/src/test/kotlin/v2/ebnf.txt†L93-L94】.

