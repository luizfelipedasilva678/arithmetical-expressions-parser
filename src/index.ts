import Lexer from "./lexer";

const lexer = new Lexer("-2.333+2^2*3+(2 + 2)");

console.log(lexer.tokens);
