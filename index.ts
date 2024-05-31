import ShuntingYard from "./shunting-yard";

const parser = new ShuntingYard();

try {
  console.log(parser.resolve("3 + 4 * 2 / ( 1 - 5 ) ^ 2"));
} catch (e: any) {
  console.log(e.message);
}
