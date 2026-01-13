# CLI Log Cleaner 🧹

A small but powerful **TypeScript-based CLI tool** to clean noisy log files and keep only meaningful entries.

Designed with **QA engineers** in mind: simple usage, multiple log formats, and sane defaults for real-world debugging.

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

### 3️⃣ Enterprise / pipe log format (auto-detected)

Input:
```text
2026-01-13 21:58:26.4614 | Info | TEST | ... | Message
```

Command:
```bash
log-clean enterprise.log --level INFO
```

No configuration needed — format is detected automatically.

---

## 🧠 Supported Log Formats

### ✔ Simple format

```text
2026-01-12 ERROR Payment failed
```

### ✔ Pipe / enterprise format

```text
2026-01-13 21:59:26.3566 | Info | TEST | ... | Response status: OK
```

The tool uses **pluggable parsers** and an **auto-detection strategy**.
Adding new formats requires only a new parser.

---

## 🧱 Architecture Overview

```text
CLI
 ↓
Log Cleaner (format-agnostic)
 ↓
Log Parsers
   ├─ SimpleParser
   ├─ PipeParser
   └─ AutoParser
```

- Cleaner logic is **independent of log format**
- Parsers are **extensible and isolated**


---

Happy log cleaning 🧘‍♀️

