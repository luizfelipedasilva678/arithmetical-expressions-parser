import Lexer from "../lexer";
import Token from "../lexer/token";
import Stack from "../data-structures/stack";
import Operator, { Associativity } from "../lexer/operator";
import Parenthesis, { ParenthesisType } from "../lexer/parenthesis";
import ParserException from "./parser-error";

class Parser {
  private stack: Stack<Token> = new Stack();
  private output: Token[] = [];
  private lexer: Lexer;

  constructor(lexer: Lexer) {
    this.lexer = lexer;
  }

  private handleOperator(token: Operator) {
    const operator1 = token as Operator;

    while (!this.stack.isEmpty() && this.stack.peek() instanceof Operator) {
      const operator2 = this.stack.peek() as Operator;

      if (
        (operator1.getAssociativity() === Associativity.LEFT &&
          operator1.getPrecedence() <= operator2.getPrecedence()) ||
        (operator1.getAssociativity() === Associativity.RIGHT &&
          operator1.getPrecedence() < operator2.getPrecedence())
      ) {
        this.output.push(this.stack.pop()!);
      } else {
        break;
      }
    }

    this.stack.push(operator1);
  }

  private handleParenthesis(token: Parenthesis) {
    if (token.getType() === ParenthesisType.LEFT) {
      this.stack.push(token);
    } else {
      let operator = this.stack.pop();
      while (
        operator &&
        !(
          operator instanceof Parenthesis &&
          operator.getType() === ParenthesisType.LEFT
        )
      ) {
        this.output.push(operator);
        operator = this.stack.pop();

        if (
          this.stack.isEmpty() &&
          !(
            operator instanceof Parenthesis &&
            operator.getType() === ParenthesisType.LEFT
          )
        ) {
          throw new ParserException("Missing parenthesis");
        }
      }
    }
  }

  public parse(): Token[] {
    this.stack.clear();
    this.output = [];

    let token = this.lexer.getToken();
    while (token !== undefined) {
      if (token instanceof Operator) {
        this.handleOperator(token);
      } else if (token instanceof Parenthesis) {
        this.handleParenthesis(token);
      } else {
        this.output.push(token);
      }

      token = this.lexer.getToken();
    }

    while (!this.stack.isEmpty()) {
      this.output.push(this.stack.pop()!);
    }

    return this.output;
  }
}

export default Parser;
