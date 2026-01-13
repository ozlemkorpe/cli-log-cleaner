import { LogParser } from "./LogParser";
import { SimpleParser } from "./SimpleParser";
import { PipeParser } from "./PipeParser";
import { LogEntry } from "../logEntry";

export class AutoParser implements LogParser {
  private parsers = [
    new PipeParser(),
    new SimpleParser()
  ];

  parse(line: string): LogEntry {
    for (const parser of this.parsers) {
      const entry = parser.parse(line);
      if (entry.level) return entry;
    }
    return { raw: line, level: null };
  }
}
