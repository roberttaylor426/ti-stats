const notUndefined = <T>(x: T | undefined): x is T => x !== undefined;

const range = (n: number) => (n <= 0 ? [] : [...Array(n).keys()]);

const not =
    <T>(p: (x: T) => boolean): ((x: T) => boolean) =>
    (x: T) =>
        !p(x);

const capitalise = (s: string): string => `${s[0].toUpperCase()}${s.slice(1)}`;

export { capitalise,not, notUndefined, range };
