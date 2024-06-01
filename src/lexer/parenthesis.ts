import Token from "./token";

export enum ParenthesisType {
  LEFT = "(",
  RIGHT = ")",
}

class Parenthesis extends Token {
  private type: ParenthesisType;

  constructor(value: string, type: ParenthesisType) {
    super(value);

    this.type = type;
  }
}

export default Parenthesis;
