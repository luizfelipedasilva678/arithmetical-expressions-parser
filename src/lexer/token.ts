class Token {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }

  toString(): string {
    return JSON.stringify(this);
  }
}

export default Token;
