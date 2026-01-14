---
title: String Standard Library
---

# Strings

Conversions and text helpers for parsing and formatting.

## Functions
- `STRING(x)` → convert to string.
- `NUMBER(x)` → convert to number.
- `BOOLEAN(x)` → convert to boolean.
- `TRIM(text)` → trim whitespace.
- `UPPER(text)` / `LOWER(text)` → case transforms.
- `CONTAINS(text, substring)` → boolean.
- `MATCH(text, pattern)` → regex match.
- `REPLACE(text, pattern, replacement)` → regex replace.
- `SPLIT(text, delimiter)` / `JOIN(list, delimiter)`.
- `SUBSTRING(text, start, length)`.
- `FORMAT(template, data)` → format with named or indexed placeholders.

## Examples
- [stdlib-strings-casts](../playground.md?example=stdlib-strings-casts)
- [stdlib-strings-text](../playground.md?example=stdlib-strings-text)
- [stdlib-strings-format](../playground.md?example=stdlib-strings-format)

## Notes
- Regex functions use standard patterns; invalid regex may error.

## Related
- [Core](std-core.md)
- [Aggregation](std-agg.md)
