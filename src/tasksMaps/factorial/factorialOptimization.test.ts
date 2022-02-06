import AssertionError from 'lib/assertionError';
import {factorialToTest, calculatedTimesByArg} from './index';

// 0. Read all test cases and factorial.ts implementation
//  try to figure out what does the types mean, use it as documentation
// 1. Wrap well working function factorial.ts with additional logic:
//  it must throw AssertionError if argument is lower than 0
//  it must update defined calculatedTimesByArg collection for tests in every call
// 2. Modify your wrap function, so it could cache already calculated values and not calculate it again
//  if your tests works separately, but does not work together in describe block, think what you map need to clear before each test
// 3. Add your own test cases to ensure performance was increased
//  you can use performance.now() or Date.now() to check how long it took to call your function

describe('factorial function', () => {
  // cleaning collection before each test
  beforeEach(() => {
    calculatedTimesByArg.clear();
  });

  test('works as expected', () => {
    expect(calculatedTimesByArg.size).toBe(0);

    expect(factorialToTest(5)).toBe(1 * 2 * 3 * 4 * 5);
    expect(calculatedTimesByArg.size).toBe(5);
    expect(calculatedTimesByArg.get(5)).toBe(1);

    expect(factorialToTest(0)).toBe(1);
    expect(calculatedTimesByArg.size).toBe(6);

    expect(() => factorialToTest(-1)).toThrow(AssertionError);
    expect(calculatedTimesByArg.size).toBe(6);
  });

  test('works optimized', () => {
    expect(calculatedTimesByArg.size).toBe(0);

    factorialToTest(50);
    expect(calculatedTimesByArg.size).toBe(50);
    expect(calculatedTimesByArg.get(50)).toBe(1);

    factorialToTest(50);
    expect(calculatedTimesByArg.get(50)).toBe(1);

    factorialToTest(51);
    expect(calculatedTimesByArg.size).toBe(51);
    expect(calculatedTimesByArg.get(50)).toBe(1);
    expect(calculatedTimesByArg.get(51)).toBe(1);

  });

  // test('measure performance improvements with cache', () => {
  //
  // });
});
