type Faction =
    | 'Sardakk N’orr'
    | 'The Arborec'
    | 'The Argent Flight'
    | 'The Barony of Letnev'
    | 'The Clan of Saar'
    | 'The Embers of Muaat'
    | 'The Emirates of Hacan'
    | 'The Empyrean'
    | 'The Federation of Sol'
    | 'The Ghosts of Creuss'
    | 'The L1Z1X Mindnet'
    | 'The Mahact Gene-Sorcerers'
    | 'The Mentak Coalition'
    | 'The Naalu Collective'
    | 'The Naaz-Rokha Alliance'
    | 'The Nekro Virus'
    | 'The Nomad'
    | 'The Titans of Ul'
    | 'The Universities of Jol-Nar'
    | "The Vuil'Raith Cabal"
    | 'The Winnu'
    | 'The Xxcha Kingdom'
    | 'The Yin Brotherhood'
    | 'The Yssaril Tribes';

type PlayerColor =
    | 'Black'
    | 'Red'
    | 'Blue'
    | 'Green'
    | 'Yellow'
    | 'Orange'
    | 'Pink'
    | 'Purple';

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

export { Faction, hexColor, notUndefined,PlayerColor };
