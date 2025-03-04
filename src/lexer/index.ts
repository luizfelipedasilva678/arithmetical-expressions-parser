import Token from "./token";
import LexerException from "./lexer-error";
import Parenthesis, { ParenthesisType } from "./parenthesis";
import Operator, { Associativity, Precedence } from "./operator";
import NumberLiteral from "./number-literal";

class Lexer {
  private input: string;
  public tokens: Token[] = [];
  private inputPos = 0;
  private inputLen = 0;

  constructor(input: string) {
    this.input = input.replace(/\s/g, "");
    this.inputLen = this.input.length;
    this.tokenize();
  }

  public getToken(): Token | undefined {
    return this.tokens.shift();
  }

  private isDigit(char: string): boolean {
    return !isNaN(Number(char));
  }

  private isOperator(char: string): boolean {
    return ["+", "-", "*", "/", "^"].includes(char);
  }

  private isParenthesis(char: string): boolean {
    return ["(", ")"].includes(char);
  }

  private tokenize() {
    while (this.inputPos < this.inputLen) {
      const symbol = this.input[this.inputPos];

      if (this.isDigit(symbol)) {
        this.makeNumber();
        continue;
      }

      if (this.isOperator(symbol)) {
        this.makeOperator();
        continue;
      }

      if (this.isParenthesis(symbol)) {
        this.makeParenthesis();
        continue;
      }

      throw new LexerException(`Uknown symbol: ${symbol}`);
    }
  }

  private makeParenthesis() {
    switch (this.input[this.inputPos]) {
      case "(": {
        this.tokens.push(
          new Parenthesis(this.input[this.inputPos], ParenthesisType.LEFT)
        );
        break;
      }
      case ")": {
        this.tokens.push(
          new Parenthesis(this.input[this.inputPos], ParenthesisType.RIGHT)
        );
        break;
      }
    }

    this.inputPos++;
  }

  private makeOperator() {
    switch (this.input[this.inputPos]) {
      case "+": {
        this.tokens.push(
          new Operator(
            this.input[this.inputPos],
            Precedence.PLUS,
            Associativity.LEFT
          )
        );
        break;
      }
      case "-": {
        if (
          (this.input[this.inputPos + 1] === "(" &&
            !this.isDigit(this.input[this.inputPos - 1]) &&
            this.input[this.inputPos - 1] !== ")") ||
          (this.isDigit(this.input[this.inputPos + 1]) &&
            !this.isDigit(this.input[this.inputPos - 1]) &&
            this.input[this.inputPos - 1] !== ")")
        ) {
          this.tokens.push(
            new Operator("#", Precedence.NEG, Associativity.RIGHT)
          );
          break;
        }

        this.tokens.push(
          new Operator(
            this.input[this.inputPos],
            Precedence.MINUS,
            Associativity.RIGHT
          )
        );
        break;
      }
      case "*": {
        this.tokens.push(
          new Operator(
            this.input[this.inputPos],
            Precedence.ASTERISK,
            Associativity.LEFT
          )
        );
        break;
      }
      case "/": {
        this.tokens.push(
          new Operator(
            this.input[this.inputPos],
            Precedence.SLASH,
            Associativity.LEFT
          )
        );
        break;
      }
      case "^": {
        this.tokens.push(
          new Operator(
            this.input[this.inputPos],
            Precedence.CARET,
            Associativity.RIGHT
          )
        );
        break;
      }
    }

    this.inputPos++;
  }

  private makeNumber() {
    let number = "";

    while (
      this.inputPos < this.inputLen &&
      (this.isDigit(this.input[this.inputPos]) ||
        this.input[this.inputPos] === ".")
    ) {
      number += this.input[this.inputPos];
      this.inputPos++;
    }

    this.tokens.push(new NumberLiteral(number));
  }
}

export default Lexer;
