import Token from "./token";

class NumberLiteral extends Token {
  constructor(value: string) {
    super(value);
  }
}

export default NumberLiteral;
