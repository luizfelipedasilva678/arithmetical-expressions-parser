import Lexer from "./lexer";
import Parser from "./parser";

const lexer = new Lexer("-2.333+2^2-2*3+(2 + -2) + (-3)-3");
const parser = new Parser(lexer);
console.log(parser.parse());
