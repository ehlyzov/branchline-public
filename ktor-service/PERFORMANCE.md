# PERFORMANCE

## Intention
Документ фиксирует реальные результаты нагрузочного теста `ktor-service` и способ их воспроизведения.

## Environment
- Date (UTC): 2026-02-27T11:01:53Z
- Host CPU: Apple M4 Pro
- Logical cores: 14
- Java: OpenJDK 25.0.1 LTS
- Service run mode: `./gradlew -Pbranchline.interpreter.jarPath=/Users/eugene/repo/research/branchline-public/interpreter/build/libs/interpreter-jvm-v0.11.0-SNAPSHOT.jar run`
- Base URL: `http://127.0.0.1:8080`

## Load test implementation
- Script: `/Users/eugene/repo/research/branchline-public/ktor-service/perf/load_test.py`
- Raw output: `/Users/eugene/repo/research/branchline-public/ktor-service/perf/latest-results.json`
- Previous baseline snapshot: `/Users/eugene/repo/research/branchline-public/ktor-service/perf/latest-results.before-branchline-update.json`
- Tooling: Python standard library (`ThreadPoolExecutor` + `urllib`), без внешних зависимостей

## Scenarios and results

| Scenario | Endpoint | Requests | Concurrency | Throughput (req/s) | p50 (ms) | p95 (ms) | p99 (ms) | max (ms) | Failures |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|
| single-price-change | `POST /api/v1/price-change` | 2500 | 40 | 2050.48 | 8.210 | 20.694 | 500.981 | 504.911 | 0 |
| batch-price-change | `POST /api/v1/price-change/batch` | 400 | 20 | 2458.39 | 6.932 | 18.236 | 22.010 | 29.885 | 0 |

## Comparison with previous run

Baseline file: `perf/latest-results.before-branchline-update.json` (timestamp `2026-02-26T21:44:38.569754+00:00`).

| Scenario | Throughput delta | Mean latency delta | p95 latency delta | p99 latency delta |
|---|---:|---:|---:|---:|
| single-price-change | `+7.06%` (`1915.26 -> 2050.48`) | `-6.65%` (`20.788 -> 19.406`) | `-6.21%` (`22.065 -> 20.694`) | `-7.63%` (`542.341 -> 500.981`) |
| batch-price-change | `-4.93%` (`2585.83 -> 2458.39`) | `+6.96%` (`7.396 -> 7.911`) | `-4.15%` (`19.025 -> 18.236`) | `-23.78%` (`28.878 -> 22.010`) |

## Notes
- Ошибок HTTP не зафиксировано (0 failures в обоих сценариях).
- Для `single-price-change` на новых jar наблюдается стабильное улучшение и по throughput, и по latency.
- Для `batch-price-change` просадка по throughput и средним latency сочетается с заметно лучшим tail (`p99`), что указывает на сдвиг профиля задержек, а не на общий отказоустойчивостный регресс.
- Метрики получены на локальной машине, поэтому их нельзя напрямую переносить на production-инфраструктуру без отдельного прогона.

## Reproduce
1. Запустить сервис:
   ```bash
   cd /Users/eugene/repo/research/branchline-public/ktor-service
   ./gradlew -Pbranchline.interpreter.jarPath=/Users/eugene/repo/research/branchline-public/interpreter/build/libs/interpreter-jvm-v0.11.0-SNAPSHOT.jar run
   ```
2. В отдельном терминале выполнить тест:
   ```bash
   python3 /Users/eugene/repo/research/branchline-public/ktor-service/perf/load_test.py | tee /Users/eugene/repo/research/branchline-public/ktor-service/perf/latest-results.json
   ```
