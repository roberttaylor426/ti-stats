const notUndefined = <T>(x: T | undefined): x is T => x !== undefined;

const range = (n: number) => [...Array(n).keys()];

export { notUndefined, range };
