const playerColors = [
    'Black',
    'Red',
    'Blue',
    'Green',
    'Yellow',
    'Orange',
    'Pink',
    'Purple',
] as const;

type PlayerColor = (typeof playerColors)[number];

export { PlayerColor, playerColors };
