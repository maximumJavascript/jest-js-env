// type of function signature, we're telling what the arguments are and what we return
type FactorialFnType = (n: number, recursiveFn: FactorialFnType) => number;

export default function factorial(n: number, recursiveFn: FactorialFnType = factorial): number {
  if (n <= 1) return 1;
  return recursiveFn(n - 1, recursiveFn) * n;
}
