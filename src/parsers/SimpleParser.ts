import { LogParser } from "./LogParser";
import { LogEntry } from "../logEntry";
import { LogLevel } from "../types";

export class SimpleParser implements LogParser {
  parse(line: string): LogEntry {
    const match = line.match(/\b(DEBUG|INFO|WARN|ERROR|FATAL)\b/);
    return {
      raw: line,
      level: match ? (match[1] as LogLevel) : null
    };
  }
}
