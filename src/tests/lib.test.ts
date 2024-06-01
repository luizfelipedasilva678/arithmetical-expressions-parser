import { describe, it } from "node:test";
import assert from "node:assert";
import Lexer from "../lexer";
import Parser from "../parser";
import Evaluator from "../evaluator";

describe("lib", () => {
  it("should result in 6", () => {
    const lexer = new Lexer("4 + 2");
    const parser = new Parser(lexer);
    const evaluator = new Evaluator(parser);

    assert.equal(evaluator.evaluate(), 6);
  });

  it("should result in 8", () => {
    const lexer = new Lexer("10 - 2");
    const parser = new Parser(lexer);
    const evaluator = new Evaluator(parser);

    assert.equal(evaluator.evaluate(), 8);
  });

  it("should result in 15", () => {
    const lexer = new Lexer("3 * 5");
    const parser = new Parser(lexer);
    const evaluator = new Evaluator(parser);

    assert.equal(evaluator.evaluate(), 15);
  });

  it("should result in 5", () => {
    const lexer = new Lexer("10 / 2");
    const parser = new Parser(lexer);
    const evaluator = new Evaluator(parser);

    assert.equal(evaluator.evaluate(), 5);
  });

  it("should result in 7", () => {
    const lexer = new Lexer("3 + 4");
    const parser = new Parser(lexer);
    const evaluator = new Evaluator(parser);

    assert.equal(evaluator.evaluate(), 7);
  });

  it("should result in -1", () => {
    const lexer = new Lexer("2 - 3");
    const parser = new Parser(lexer);
    const evaluator = new Evaluator(parser);

    assert.equal(evaluator.evaluate(), -1);
  });

  it("should result in 9", () => {
    const lexer = new Lexer("3 * 3");
    const parser = new Parser(lexer);
    const evaluator = new Evaluator(parser);

    assert.equal(evaluator.evaluate(), 9);
  });

  it("should result in 2", () => {
    const lexer = new Lexer("8 / 4");
    const parser = new Parser(lexer);
    const evaluator = new Evaluator(parser);

    assert.equal(evaluator.evaluate(), 2);
  });

  it("should result in 7", () => {
    const lexer = new Lexer("2 + 3 * (2 - 1) + 2");
    const parser = new Parser(lexer);
    const evaluator = new Evaluator(parser);

    assert.equal(evaluator.evaluate(), 7);
  });

  it("should result in 14", () => {
    const lexer = new Lexer("2 * (3 + 4) - 2");
    const parser = new Parser(lexer);
    const evaluator = new Evaluator(parser);

    assert.equal(evaluator.evaluate(), 12);
  });

  it("should result in 25", () => {
    const lexer = new Lexer("(2 + 3) * (4 + 1)");
    const parser = new Parser(lexer);
    const evaluator = new Evaluator(parser);

    assert.equal(evaluator.evaluate(), 25);
  });

  it("should result in 16", () => {
    const lexer = new Lexer("2^3 + 8");
    const parser = new Parser(lexer);
    const evaluator = new Evaluator(parser);

    assert.equal(evaluator.evaluate(), 16);
  });

  it("should result in 18", () => {
    const lexer = new Lexer("(2 + 1) * (5 + 1)");
    const parser = new Parser(lexer);
    const evaluator = new Evaluator(parser);

    assert.equal(evaluator.evaluate(), 18);
  });

  it("should result in 27", () => {
    const lexer = new Lexer("3^3");
    const parser = new Parser(lexer);
    const evaluator = new Evaluator(parser);

    assert.equal(evaluator.evaluate(), 27);
  });

  it("should result in 9.5", () => {
    const lexer = new Lexer("10 / 2 + 4.5");
    const parser = new Parser(lexer);
    const evaluator = new Evaluator(parser);

    assert.equal(evaluator.evaluate(), 9.5);
  });

  it("should result in 3.5", () => {
    const lexer = new Lexer("7 / 2");
    const parser = new Parser(lexer);
    const evaluator = new Evaluator(parser);

    assert.equal(evaluator.evaluate(), 3.5);
  });

  it("should result in 30", () => {
    const lexer = new Lexer("10 + 2 * 10");
    const parser = new Parser(lexer);
    const evaluator = new Evaluator(parser);

    assert.equal(evaluator.evaluate(), 30);
  });

  it("should result in 15", () => {
    const lexer = new Lexer("(10 + 5) * 1");
    const parser = new Parser(lexer);
    const evaluator = new Evaluator(parser);

    assert.equal(evaluator.evaluate(), 15);
  });

  it("should result in 17.7", () => {
    const lexer = new Lexer("(10.6 + 5.1) * 1 -1 * -2");
    const parser = new Parser(lexer);
    const evaluator = new Evaluator(parser);

    assert.equal(evaluator.evaluate(), 17.7);
  });

  it("should result in 23.7", () => {
    const lexer = new Lexer("(10.6 + 5.1 + (2 ^ 2 + (2))) * 1 -1 * -2");
    const parser = new Parser(lexer);
    const evaluator = new Evaluator(parser);

    assert.equal(evaluator.evaluate(), 23.7);
  });

  it("should result in 25.308936000000003", () => {
    const lexer = new Lexer(
      "(10.222336 + 5.133 + (2.44 ^ 2 + (2))) * 1 -1 * -2"
    );
    const parser = new Parser(lexer);
    const evaluator = new Evaluator(parser);

    assert.equal(evaluator.evaluate(), 25.308936000000003);
  });

  it("should result in 5000", () => {
    const lexer = new Lexer("1000 * 5");
    const parser = new Parser(lexer);
    const evaluator = new Evaluator(parser);

    assert.equal(evaluator.evaluate(), 5000);
  });

  it("should result in 32100", () => {
    const lexer = new Lexer("1000 + 1000 + 100 + 30000");
    const parser = new Parser(lexer);
    const evaluator = new Evaluator(parser);

    assert.equal(evaluator.evaluate(), 32100);
  });

  it("should result in 31900", () => {
    const lexer = new Lexer("1000 + 1000 + -100 + 30000");
    const parser = new Parser(lexer);
    const evaluator = new Evaluator(parser);

    assert.equal(evaluator.evaluate(), 31900);
  });
});
