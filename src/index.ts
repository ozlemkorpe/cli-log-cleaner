#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import fs from "fs";
import { cleanLog } from "./cleaner";
import { LOG_LEVELS, LogLevel } from "./types";
import { AutoParser } from "./parsers/AutoParser";

const program = new Command();

program
  .name("log-clean")
  .description("Kill noisy logs, keep meaningful ones 🧘‍♀️")
  .argument("<file>", "log file to clean")
  .option("-l, --level <level>", "minimum log level", "ERROR")
  .option("-c, --context <number>", "lines before/after", "0")
  .option("-o, --output <file>", "output file", "cleaned.log")
  .parse();

const opts = program.opts();
const file = program.args[0];

// ---- validations ----
if (!fs.existsSync(file)) {
  console.log(chalk.red(`File not found: ${file}`));
  process.exit(1);
}

const level = opts.level.toUpperCase();

if (!LOG_LEVELS.includes(level)) {
  console.log(
    chalk.red(
      `Invalid level "${opts.level}". Choose from: ${LOG_LEVELS.join(", ")}`
    )
  );
  process.exit(1);
}

const context = Number(opts.context);
if (isNaN(context) || context < 0) {
  console.log(chalk.red("Context must be a non-negative number"));
  process.exit(1);
}

// ---- parser (auto-detect) ----
const parser = new AutoParser();

// ---- clean ----
const cleaned = cleanLog(file, {
  level: level as LogLevel,
  context,
  parser
});

// ---- write output ----
fs.writeFileSync(opts.output, cleaned.join("\n"));

console.log(
  chalk.green(`✔ Clean log written to ${opts.output}`)
);
