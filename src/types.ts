export type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR" | "FATAL";

export const LOG_LEVELS: LogLevel[] = [
  "DEBUG",
  "INFO",
  "WARN",
  "ERROR",
  "FATAL"
];

export function extractLogLevel(line: string): LogLevel | null {
  const match = line.match(/\|\s*(Info|Warn|Error|Fatal|Debug)\s*\|/i);
  if (!match) return null;

  return match[1].toUpperCase() as LogLevel;
}
