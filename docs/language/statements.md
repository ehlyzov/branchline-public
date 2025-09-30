---
title: Statements
---

# Statements

Statements control execution and side effects within blocks.

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

