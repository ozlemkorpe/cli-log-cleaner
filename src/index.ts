#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import fs from "fs";
import { cleanLog } from "./cleaner";
import { LOG_LEVELS, LogLevel } from "./types";

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

if (!LOG_LEVELS.includes(opts.level)) {
  console.log(
    chalk.red(`Invalid level. Choose from: ${LOG_LEVELS.join(", ")}`)
  );
  process.exit(1);
}

const cleaned = cleanLog(file, {
  level: opts.level as LogLevel,
  context: Number(opts.context)
});

fs.writeFileSync(opts.output, cleaned.join("\n"));

console.log(
  chalk.green(`✔ Clean log written to ${opts.output}`)
);
