import { sum } from '../calculator.js';
 
describe("calculator sum", () => {
  test("it should sum two positive values", () => {
    const result = sum(2, 2);
 
    expect(result).toBe(4);
  });
});