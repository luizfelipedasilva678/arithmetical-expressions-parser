import Stack from "../data-structures/stack";
import EvaluatorException from "./evaluator-error";
import NumberLiteral from "../lexer/number-literal";
import Operator from "../lexer/operator";
import Token from "../lexer/token";
import Parser from "../parser";

class Evaluator {
  private stack: Stack<number> = new Stack();
  private parser: Parser;

  constructor(parser: Parser) {
    this.parser = parser;
  }

  private handleOperator(token: Token) {
    const operator = token as Operator;
    let operand1: number | undefined = undefined;
    let operand2: number | undefined = undefined;

    if (operator.getValue() === "#") {
      operand2 = this.stack.pop();

      if (!operand2) {
        throw new EvaluatorException("Invalid expression");
      }

      this.stack.push(-operand2);
    } else {
      operand2 = this.stack.pop();
      operand1 = this.stack.pop();

      if (operand1 === undefined || operand2 === undefined) {
        throw new EvaluatorException("Invalid expression");
      }

      switch (operator.getValue()) {
        case "+": {
          this.stack.push(operand1 + operand2);
          break;
        }
        case "-": {
          this.stack.push(operand1 - operand2);
          break;
        }
        case "*": {
          this.stack.push(operand1 * operand2);
          break;
        }
        case "/": {
          this.stack.push(operand1 / operand2);
          break;
        }
        case "^": {
          this.stack.push(Math.pow(operand1, operand2));
          break;
        }
      }
    }
  }

  public evaluate(): number {
    this.stack.clear();
    const tokens = this.parser.parse();

    for (const token of tokens) {
      if (token instanceof NumberLiteral) {
        this.stack.push(Number(token.getValue()));
        continue;
      }

      this.handleOperator(token);
    }

    if (this.stack.size() > 1) {
      throw new EvaluatorException("Invalid expression");
    }

    return this.stack.pop() as number;
  }
}

export default Evaluator;
