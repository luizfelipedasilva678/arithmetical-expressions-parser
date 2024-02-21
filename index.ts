import ShuntingYard from "./shunting-yard";

const parser = new ShuntingYard();

const parsedExpression = parser.transform("3 + 4 * 2 / ( 1 - 5 ) ^ 2");

console.log(parser.resolve(parsedExpression));
