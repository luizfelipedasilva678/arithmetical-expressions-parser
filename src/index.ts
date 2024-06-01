import Lexer from "./lexer";

const lexer = new Lexer("-2.333+2^2-2*3d+(2 + -2) + (-3)-3");

console.log(lexer.tokens);
