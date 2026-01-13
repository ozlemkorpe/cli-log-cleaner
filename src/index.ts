#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { Command } from "commander";

type LogEntry = {
  raw: string;
  level: string;
};

const program = new Command();

program
  .argument("<logfile>", "Log file to clean")
  .option("--level <level>", "Minimum log level (INFO, WARN, ERROR, FATAL)")
  .option("--context <lines>", "Number of context lines", "0");

program.parse();

const filePath = program.args[0];
const options = program.opts();

const CONTEXT = Number(options.context || 0);
const LEVEL = options.level?.toUpperCase();

const LOG_LEVELS = ["DEBUG", "INFO", "WARN", "ERROR", "FATAL"];

function extractLevel(line: string): string {
  // Common formats: INFO | [INFO] | | Info |
  const match = line.match(/\b(DEBUG|INFO|WARN|ERROR|FATAL)\b/i);
  return match ? match[1].toUpperCase() : "UNKNOWN";
}

// 1️⃣ Read file
const content = fs.readFileSync(filePath, "utf-8");
const lines = content.split(/\r?\n/);

// 2️⃣ Parse logs
const entries: LogEntry[] = lines.map(line => ({
  raw: line,
  level: extractLevel(line),
}));

// 3️⃣ Find matching indexes
let matchIndexes: number[] = [];

if (LEVEL) {
  const minIndex = LOG_LEVELS.indexOf(LEVEL);

  matchIndexes = entries
    .map((e, i) =>
      LOG_LEVELS.indexOf(e.level) >= minIndex ? i : -1
    )
    .filter(i => i !== -1);
} else {
  // no level filter → everything is a match
  matchIndexes = entries.map((_, i) => i);
}

// 4️⃣ Collect output with context (LEVEL IGNORED HERE)
const output = new Set<string>();

for (const index of matchIndexes) {
  const start = Math.max(0, index - CONTEXT);
  const end = Math.min(entries.length - 1, index + CONTEXT);

  for (let i = start; i <= end; i++) {
    output.add(entries[i].raw);
  }
}

// 5️⃣ Stats
const cleanedLines = Array.from(output);
const header = [
  `# Log Cleaner Summary`,
  `# Level filter: ${LEVEL ?? "NONE"}`,
  `# Context lines: ${CONTEXT}`,
  `# Matched entries: ${matchIndexes.length}`,
  `# Output lines: ${cleanedLines.length}`,
  ``,
].join("\n");

// 6️⃣ Write output
const outputFile = "cleaned.log";
fs.writeFileSync(outputFile, header + cleanedLines.join("\n"));

console.log(`✔ Cleaned log written to ${outputFile}`);
