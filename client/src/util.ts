const notUndefined = <T>(x: T | undefined): x is T => x !== undefined;

const range = (n: number) => (n <= 0 ? [] : [...Array(n).keys()]);

export { notUndefined, range };
