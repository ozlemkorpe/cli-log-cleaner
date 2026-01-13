# CLI Log Cleaner 🧹

A lightweight **TypeScript-based CLI tool** to clean noisy log files and keep only meaningful entries. Simple usage, multiple log formats, and sane defaults for real-world debugging.

---

## ✨ Features

- 🔍 **Log level filtering** (`INFO`, `WARN`, `ERROR`, `FATAL`, etc.)
- 🧠 **Severity-based matching**  
  `ERROR` shows `ERROR + FATAL`, `WARN` shows `WARN + ERROR + FATAL`
- 📄 **Multiple log formats supported** (auto-detected)
  - Simple logs (`2026-01-12 ERROR something broke`)
  - Pipe/enterprise logs (`| Info | Service | ...`)
- 🔄 **Context lines** before/after matching logs
- 🪄 **Auto-detect log format** (no flags needed)
- 🖥️ Works on **Windows / macOS / Linux**

---

## 📦 Installation

### Prerequisites

- Node.js **v18+**
- npm

### Install dependencies

```bash
npm install
```

### Run locally (dev mode)

```bash
npm run dev -- your.log -- --level ERROR --context 1
```

> ⚠️ Note for Windows users: when using `npm run`, you must add a second `--` before CLI flags.

### Build

```bash
npm run build
```

### Link as global CLI

```bash
npm link
```

Then you can run:

```bash
log-clean your.log --level ERROR
```

---

## 🚀 Usage

### Basic usage

```bash
log-clean <file> [options]
```

### Options

| Option | Description | Default |
|------|------------|---------|
| `-l, --level <level>` | Minimum log level | `ERROR` |
| `-c, --context <n>` | Lines before/after the matched log | `0` |
| `-o, --output <file>` | Output file name | `cleaned.log` |

---

## 🧪 Examples

### 1️⃣ Only ERROR and above

```bash
log-clean app.log --level ERROR
```

Output includes:
```
ERROR
FATAL
```

---

### 2️⃣ WARN and above with context

```bash
log-clean app.log --level WARN --context 1
```

Shows `WARN`, `ERROR`, `FATAL` logs plus surrounding lines **that also match severity rules**.

---

## 🧠 Supported Log Formats

The tool supports multiple log formats **implicitly**, without requiring explicit configuration. As long as a log line contains a recognizable **log level**, it can be filtered.

Below are the officially supported formats with example log lines for **each log level**.

---

### 1️⃣ Simple Timestamp + Level Logs

Common in many backend services and scripts.

```text
2026-01-12 DEBUG Token refreshed
2026-01-12 INFO App started
2026-01-12 WARN Slow response
2026-01-12 ERROR Payment failed
2026-01-12 FATAL System crashed
```

---

### 2️⃣ Pipe / Enterprise Logs

Often seen in enterprise or agent-based systems.

```text
2026-01-13 21:58:26.4614 | DEBUG | TEST | Debug message
2026-01-13 21:58:26.4614 | INFO  | TEST | Information message
2026-01-13 21:58:26.4614 | WARN  | TEST | Warning message
2026-01-13 21:58:26.4614 | ERROR | TEST | Error message
2026-01-13 21:58:26.4614 | FATAL | TEST | Fatal error message
```

---

### 3️⃣ Bracketed Structured Logs (Go / log4go-style)

Common in Go applications with structured logging and caller information.

```text
[2023/10/12 22:06:47 +03] [DEBUG] (pkg/logger.Debug:12) Debugging startup sequence
[2023/10/12 22:06:47 +03] [INFO]  (pkg/logger.Info:34) Application started
[2023/10/12 22:06:47 +03] [WARN]  (pkg/logger.Warn:56) Configuration file missing, using defaults
[2023/10/12 22:06:52 +03] [ERROR] (pkg/logger.Error:78) Failed to connect to database
[2023/10/12 22:06:52 +03] [FATAL] (pkg/logger.Fatal:91) Unrecoverable error, shutting down
```

Nested logs inside pipe sections are also supported:

```text
[2023/10/12 22:06:52 +03] [ERROR] (pkg/logger.Error:78) ENGINE | [10/12/23 22:06:52] [ERROR] inner component failure
```

---

### 4️⃣ Java / Log4j / Logback Logs

Widely used in Java and JVM-based applications.

```text
2026-01-12 21:58:26,461 DEBUG [main] com.app.Service - Debug message
2026-01-12 21:58:26,461 INFO  [main] com.app.Service - Application started
2026-01-12 21:58:26,461 WARN  [main] com.app.Service - Deprecated API usage
2026-01-12 21:58:26,461 ERROR [main] com.app.Service - Payment failed
2026-01-12 21:58:26,461 FATAL [main] com.app.Service - JVM crash detected
```

---

### 5️⃣ Python Logging

Default or customized Python `logging` module output.

```text
2026-01-12 21:58:26,461 - DEBUG - worker - Debug message
2026-01-12 21:58:26,461 - INFO  - worker - Task started
2026-01-12 21:58:26,461 - WARN  - worker - Retry attempt
2026-01-12 21:58:26,461 - ERROR - worker - Task failed
2026-01-12 21:58:26,461 - FATAL - worker - Worker crashed
```

---

### 6️⃣ Syslog (Linux / Infrastructure)

Common in Linux servers and infrastructure logs.

```text
Jan 12 21:58:26 server1 DEBUG sshd[1234]: Debugging SSH key exchange
Jan 12 21:58:27 server1 INFO  sshd[1234]: Accepted password for user from 192.168.1.10
Jan 12 21:58:28 server1 WARN  sshd[1234]: Authentication attempt failed for invalid user
Jan 12 21:58:29 server1 ERROR sshd[1234]: Failed to read authorized_keys file
Jan 12 21:58:30 server1 FATAL sshd[1234]: Critical failure, sshd shutting down
```

- Cleaner logic is **independent of log format**
- Parsers are **extensible and isolated**

---

## 🧑‍💻 Development

```bash
npm run dev
npm run build
```

Project structure:

```text
src/
├─ index.ts        # CLI entry point
├─ cleaner.ts      # Core filtering logic
├─ logEntry.ts     # Shared log model
├─ types.ts        # Log levels & enums
└─ parsers/
   ├─ AutoParser.ts
   ├─ SimpleParser.ts
   ├─ PipeParser.ts
   └─ LogParser.ts
```

Happy log cleaning 🧘‍♀️

