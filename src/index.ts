import Lexer from "./lexer";
import Parser from "./parser";
import Evaluator from "./evaluator";

const lexer = new Lexer("(10.222336 + 5.133 + (2.44 ^ 2 + (2))) * 1 -1 * -2");
const parser = new Parser(lexer);
const evaluator = new Evaluator(parser);

console.log(evaluator.evaluate());
