import fs from "fs";
import { LOG_LEVELS, LogLevel } from "./types";

interface CleanOptions {
  level: LogLevel;
  context: number;
}

export function cleanLog(
  filePath: string,
  options: CleanOptions
): string[] {
  const lines = fs.readFileSync(filePath, "utf-8").split("\n");
  const minLevelIndex = LOG_LEVELS.indexOf(options.level);

  const output: string[] = [];
  const addedLines = new Set<number>();

  lines.forEach((line, index) => {
    const isTrigger = LOG_LEVELS
      .slice(minLevelIndex)
      .some((lvl) => line.includes(` ${lvl} `));

    if (!isTrigger) return;

    const start = Math.max(0, index - options.context);
    const end = Math.min(lines.length, index + options.context + 1);

    for (let i = start; i < end; i++) {
      if (addedLines.has(i)) continue;

      const contextLine = lines[i];

      const allowedContext = LOG_LEVELS
        .slice(minLevelIndex)
        .some((lvl) => contextLine.includes(` ${lvl} `));

      if (i === index || allowedContext) {
        output.push(contextLine);
        addedLines.add(i);
      }
    }

    output.push("");
  });

  return output;
}
