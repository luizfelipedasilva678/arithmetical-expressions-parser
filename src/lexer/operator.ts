import Token from "./token";

export enum Associativity {
  LEFT = "left",
  RIGHT = "right",
}

export enum Precedence {
  PLUS = 1,
  MINUS = 1,
  ASTERISK = 2,
  SLASH = 2,
  CARET = 3,
  NEG = 4,
}

class Operator extends Token {
  private precedence: number;
  private associativity: Associativity;

  constructor(
    value: string,
    precedence: Precedence,
    associativity: Associativity
  ) {
    super(value);

    this.precedence = precedence;
    this.associativity = associativity;
  }

  getPrecedence(): number {
    return this.precedence;
  }

  getAssociativity(): Associativity {
    return this.associativity;
  }
}

export default Operator;
