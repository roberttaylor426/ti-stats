const numberOfPlayersInGame = 6;

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

const hexPlayerColor = (pc: PlayerColor): string => {
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
            return '#7b00c5';
    }
};

export { hexPlayerColor, numberOfPlayersInGame, PlayerColor, playerColors };
