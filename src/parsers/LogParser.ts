import { LogEntry } from "../logEntry";

export interface LogParser {
  parse(line: string): LogEntry;
}
