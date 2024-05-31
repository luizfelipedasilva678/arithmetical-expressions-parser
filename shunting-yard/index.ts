import Stack from "../stack";
import * as constants from "../constants";

export default class ShuntingYard {
  private operatorsStack = new Stack<string>();
  private operandsStack = new Stack<number>();
  private precedenceTable: Record<string, number> = {
    [constants.CARET]: 3,
    [constants.ASTERISK]: 2,
    [constants.SLASH]: 2,
    [constants.MINUS]: 1,
    [constants.PLUS]: 1,
  };

  private tokenizeUserInput(expression: string) {
    const pattern = new RegExp(/(\d)+|-|\*|\(|\)|\^|\+|\||\?|\//, "g");
    return expression.trim().match(pattern) ?? [];
  }

  private tokenizePostfixExp(expression: string) {
    const pattern = new RegExp(/;|(\d)+|-|\*|\^|\+|\||\?|\//, "g");
    return expression.match(pattern)?.filter((tok) => tok !== ";") ?? [];
  }

  private isOperator(token: string) {
    return [
      constants.ASTERISK,
      constants.CARET,
      constants.MINUS,
      constants.PLUS,
      constants.SLASH,
    ].includes(token);
  }

  private handleOperator(token: string, outputList: string[]) {
    let operator = this.operatorsStack.peek();

    while (
      operator &&
      this.precedenceTable[operator] >= this.precedenceTable[token]
    ) {
      outputList.push(this.operatorsStack.pop() ?? "");
      operator = this.operatorsStack.peek();
    }

    this.operatorsStack.push(token);
  }

  private handleRightParenthesis(outputList: string[]) {
    let operator = this.operatorsStack.pop();

    while (operator !== constants.LEFT_PARENTHESIS) {
      outputList.push(operator ?? "");
      operator = this.operatorsStack.pop();
    }
  }

  public transform(expression: string) {
    this.operatorsStack.clear();
    const tokens = this.tokenizeUserInput(expression);
    const outputList: string[] = [];

    for (const token of tokens) {
      if (this.isOperator(token)) {
        this.handleOperator(token, outputList);
        continue;
      }

      if (token === constants.RIGHT_PARENTHESIS) {
        this.handleRightParenthesis(outputList);
        continue;
      }

      if (token === constants.LEFT_PARENTHESIS) {
        this.operatorsStack.push(token);
        continue;
      }

      outputList.push(`${token};`);
    }

    while (!this.operatorsStack.isEmpty()) {
      outputList.push(this.operatorsStack.pop() ?? "");
    }

    return outputList.join("");
  }

  private resolveOperation(token: string) {
    const operand2 = this.operandsStack.pop();
    const operand1 = this.operandsStack.pop();

    if (!operand1 || !operand2) return 0;

    switch (token) {
      case constants.ASTERISK: {
        this.operandsStack.push(operand1 * operand2);
        break;
      }
      case constants.CARET: {
        this.operandsStack.push(Math.pow(operand1, operand2));
        break;
      }
      case constants.PLUS: {
        this.operandsStack.push(operand1 + operand2);
        break;
      }
      case constants.MINUS: {
        this.operandsStack.push(operand1 - operand2);
        break;
      }
      case constants.SLASH: {
        this.operandsStack.push(operand1 / operand2);
        break;
      }
    }
  }

  public resolve(expression: string) {
    this.operandsStack.clear();
    const tokens = this.tokenizePostfixExp(expression);

    for (const token of tokens) {
      if (!this.isOperator(token)) {
        this.operandsStack.push(Number(token));
        continue;
      }

      this.resolveOperation(token);
    }

    return this.operandsStack.pop() ?? null;
  }
}
