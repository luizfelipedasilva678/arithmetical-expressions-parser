import Lexer from "./lexer";
import Parser from "./parser";
import Evaluator from "./evaluator";

const lexer = new Lexer("1 - --2");
const parser = new Parser(lexer);
const evaluator = new Evaluator(parser);

console.log(evaluator.evaluate());
