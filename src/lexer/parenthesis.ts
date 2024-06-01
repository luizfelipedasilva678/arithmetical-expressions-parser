import Token from "./token";

export enum ParenthesisType {
  LEFT = 1,
  RIGHT = 2,
}

class Parenthesis extends Token {
  private type: ParenthesisType;

  constructor(value: string, type: ParenthesisType) {
    super(value);

    this.type = type;
  }

  getType(): ParenthesisType {
    return this.type;
  }
}

export default Parenthesis;
