import {CompilationUnit} from './ast';
import {Node} from './ast';
import {Scope} from './scope';

export class Position {
  constructor(
    public readonly line: number,
    public readonly column: number,
  ) {
  }
}

export class Range {
  constructor(
    public readonly start: Position,
    public readonly end: Position,
  ) {
  }

  includes(position: Position): boolean {
    return this.start.line <= position.line && position.line <= this.end.line
      && (this.start.line < position.line || this.start.column <= position.column)
      && (position.line < this.end.line || position.column <= this.end.column)
    ;
  }

  distance(position: Position) {
    if (position.line < this.start.line) {
      return position.line - this.start.line; // negative sign = before
    }
    if (position.line > this.end.line) {
      return position.line - this.end.line;
    }
    if (position.column < this.start.column) {
      return (position.column - this.start.column) / 1000;
    }
    if (position.column > this.end.column) {
      return (position.column - this.end.column) / 1000;
    }
    return 0; // inside
  }

  encloses(range: Range) {
    return this.includes(range.start) && this.includes(range.end);
  }
}

export interface CompletionItem {
  kind: string;
  label: string;
  /** displayed on the right */
  description?: string;
  /** displayed next to the label */
  signature?: string;
  /** snippet using cursor placeholders like ${1:placeholder} */
  snippet?: string;
}

export class Diagnostic {
  constructor(
    public readonly path: string | undefined,
    public readonly location: Range,
    public readonly message: string,
    public readonly severity: Severity = 'error',
    public readonly expected?: CompletionItem[],
    public readonly replacement?: Node<string>,
  ) {
    if (!location) {
      throw new Error('location is required');
    }
  }
}

export type Severity = 'error' | 'warning' | 'note';

export function log(diagnostic: Diagnostic): void {
  const {path, location: {start: {line, column}}, message, severity} = diagnostic;
  switch (severity) {
    case 'error':
      console.error(`${path}:${line}:${column}: error: ${message}`);
      break;
    case 'warning':
      console.warn(`${path}:${line}:${column}: warning: ${message}`);
      break;
    case 'note':
      console.info(`${path}:${line}:${column}: note: ${message}`);
      break;
  }
  if (diagnostic.expected) {
    for (let completionItem of diagnostic.expected) {
      console.log(`- [${completionItem.kind}] ${completionItem.label} ${completionItem.signature || ''} - ${completionItem.description || ''}`);
    }
  }
}

export function report(scope: Scope, location: Range, message: string, severity: Severity = 'error',
                       expectedOrReplacement?: CompletionItem[] | Node<string>): undefined {
  const unit = scope.lookup(CompilationUnit.enclosing, CompilationUnit);
  const expected = Array.isArray(expectedOrReplacement) ? expectedOrReplacement : undefined;
  const replacement = Array.isArray(expectedOrReplacement) ? undefined : expectedOrReplacement;
  const diagnostic = new Diagnostic(undefined, location, message, severity, expected, replacement);
  if (unit) {
    unit.report(diagnostic);
  } else {
    log(diagnostic);
  }
  return;
}

export function autocomplete(scope: Scope, location: Range, id: string, {
  lookup,
  kind,
  extra,
}: { lookup?: Scope, kind?: string, extra?: CompletionItem[] } = {}): boolean {
  if (!id.includes('§')) {
    return false;
  }
  const prefix = id.slice(0, -1);
  const fromLookup = (lookup || scope).list()
    .filter((n): n is Node<any> & { name: string } => 'name' in n)
    .filter(n => !kind || n.kind === kind)
    .map((item): CompletionItem => 'asCompletion' in item ? (item as any).asCompletion() : ({
      kind: item.kind,
      label: item.name,
    }))
  ;
  const expected = (extra ? [...fromLookup, ...extra] : fromLookup).filter(d => d.label.startsWith(prefix));
  report(scope, location, 'input \'§\' expecting', 'error', expected);
  return true;
}
