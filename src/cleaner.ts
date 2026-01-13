import fs from "fs";
import { LogLevel, LOG_LEVELS } from "./types";
import { LogParser } from "./parsers/LogParser";

interface CleanOptions {
  level: LogLevel;
  context: number;
  parser: LogParser;
}

export function cleanLog(
  filePath: string,
  options: CleanOptions
): string[] {
  const lines = fs.readFileSync(filePath, "utf-8").split("\n");
  const entries = lines.map(line => options.parser.parse(line));

  const minIndex = LOG_LEVELS.indexOf(options.level);
  const output: string[] = [];
  const added = new Set<number>();

  entries.forEach((entry, index) => {
    if (!entry.level) return;

    if (LOG_LEVELS.indexOf(entry.level) < minIndex) return;

    const start = Math.max(0, index - options.context);
    const end = Math.min(entries.length, index + options.context + 1);

    for (let i = start; i < end; i++) {
      if (added.has(i)) continue;

      const e = entries[i];
      if (
        i === index ||
        (e.level && LOG_LEVELS.indexOf(e.level) >= minIndex)
      ) {
        output.push(e.raw);
        added.add(i);
      }
    }

    output.push("");
  });

  return output;
}
