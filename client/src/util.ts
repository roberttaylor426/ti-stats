import { PlayerColor } from './playerColors';

const hexColor = (pc: PlayerColor): string => {
    switch (pc) {
        case 'Black':
            return '#ffffff';
        case 'Red':
            return '#f81204';
        case 'Blue':
            return '#1751e8';
        case 'Green':
            return '#099f35';
        case 'Yellow':
            return '#fde414';
        case 'Orange':
            return '#f07f0b';
        case 'Pink':
            return '#f212c1';
        case 'Purple':
            return '#c57fef';
    }
};

const notUndefined = <T>(x: T | undefined): x is T => x !== undefined;

const range = (n: number) => [...Array(n).keys()];

export { hexColor, notUndefined, range };
