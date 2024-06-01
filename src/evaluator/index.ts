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

  getOperands(quantity: 1 | 2) {
    if (quantity === 1) {
      const operand = this.stack.pop();

      if (!operand) {
        throw new EvaluatorException("Invalid expression");
      }

      return operand;
    }

    if (quantity === 2) {
      const operand2 = this.stack.pop();
      const operand1 = this.stack.pop();

      if (!operand1 || !operand2) {
        throw new EvaluatorException("Invalid expression");
      }

      return [operand1, operand2];
    }
  }

  private handleOperator(token: Token) {
    const operator = token as Operator;

    switch (operator.getValue()) {
      case "#": {
        const operand = this.getOperands(1) as number;
        this.stack.push(-operand);
        break;
      }
      case "+": {
        const [operand1, operand2] = this.getOperands(2) as number[];
        this.stack.push(operand1 + operand2);
        break;
      }
      case "-": {
        const [operand1, operand2] = this.getOperands(2) as number[];
        this.stack.push(operand1 - operand2);
        break;
      }
      case "*": {
        const [operand1, operand2] = this.getOperands(2) as number[];
        this.stack.push(operand1 * operand2);
        break;
      }
      case "/": {
        const [operand1, operand2] = this.getOperands(2) as number[];
        this.stack.push(operand1 / operand2);
        break;
      }
      case "^": {
        const [operand1, operand2] = this.getOperands(2) as number[];
        this.stack.push(Math.pow(operand1, operand2));
        break;
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
