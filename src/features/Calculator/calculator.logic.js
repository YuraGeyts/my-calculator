import { Parser } from 'expr-eval';

export const calculateExpression = (input) => {
  try {
    const prepared = input
      .replace(/÷/g, '/')
      .replace(/%/g, '/100');

    const parser = new Parser();
    const result = parser.evaluate(prepared);
    return result.toString();
  } catch (e) {
    return 'Error';
  }
};