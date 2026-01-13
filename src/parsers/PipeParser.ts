import { LogParser } from "./LogParser";
import { LogEntry } from "../logEntry";
import { LogLevel } from "../types";

export class PipeParser implements LogParser {
  parse(line: string): LogEntry {
    const match = line.match(/\|\s*(Info|Warn|Error|Fatal|Debug)\s*\|/i);
    return {
      raw: line,
      level: match ? (match[1].toUpperCase() as LogLevel) : null
    };
  }
}
