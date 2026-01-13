import { LogLevel } from "./types";

export interface LogEntry {
  raw: string;
  level: LogLevel | null;
}
