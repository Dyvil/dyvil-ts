import {CharStreams, CommonTokenStream} from 'antlr4ts';
import {classNode} from './ast/cst2ast';
import {DyvilLexer} from './parser/DyvilLexer';
import {DyvilParser} from './parser/DyvilParser';

const text = `
class Main {
  var x: int

  func main(args: string): void {
  }
}
`;
const inputStream = CharStreams.fromString(text);
const lexer = new DyvilLexer(inputStream);
const tokenStream = new CommonTokenStream(lexer);
const parser = new DyvilParser(tokenStream);
const file = parser.file();
const class1 = classNode(file.class());
console.dir(class1, {depth: null});
