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

type Planet = {
    name: PlanetName;
    resources: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    influence: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

type PlanetName =
    | 'Jord'
    | 'Moll Primus'
    | 'Darien'
    | 'Muaat'
    | 'Nestphar'
    | '[0.0.0]'
    | 'Winnu'
    | 'Mordai II'
    | 'Maaluuk'
    | 'Druaa'
    | 'Wren Terra'
    | 'Arc Prime'
    | 'Lisis II'
    | 'Ragh'
    | 'Jol'
    | 'Nar'
    | "Tren'lak"
    | 'Quinarra'
    | 'Archon Ren'
    | 'Archon Tau'
    | 'Retillion'
    | 'Shalloq'
    | 'Arretze'
    | 'Hercant'
    | 'Kamdorn'
    | 'Mecatol Rex'
    | 'Wellon'
    | 'Vefut II'
    | 'Thibah'
    | "Tar'mann"
    | 'Saudor'
    | 'Mehar Xull'
    | 'Quann'
    | 'Lodor'
    | 'New Albion'
    | 'Starpoint'
    | "Tequ'ran"
    | 'Torkan'
    | "Qucen'n"
    | 'Rarron'
    | 'Mellon'
    | 'Zohbat'
    | 'Lazar'
    | 'Sakulag'
    | 'Dal Bootha'
    | 'Xxehan'
    | 'Corneeq'
    | 'Resculon'
    | 'Centauri'
    | 'Gral'
    | 'Bereg'
    | 'Lirta IV'
    | 'Arnor'
    | 'Lor'
    | 'Arinam'
    | 'Meer'
    | 'Abyz'
    | 'Fria'
    | 'Creuss'
    | 'Ixth'
    | 'Arcturus'
    | 'Acheron'
    | 'Elysium'
    | 'The Dark'
    | 'Naazir'
    | 'Rohka'
    | 'Yur'
    | 'Valk'
    | 'Avar'
    | 'Archon Vail'
    | 'Perimeter'
    | 'Ang'
    | 'Sem-lore'
    | 'Vorhal'
    | 'Atlas'
    | 'Primor'
    | "Hope's End"
    | 'Cormund'
    | 'Everra'
    | 'Accoen'
    | 'Jeol Ir'
    | 'Kraag'
    | 'Siig'
    | "Ba'kal"
    | 'Alio Prima'
    | 'Lisis'
    | 'Velnor'
    | 'Cealdri'
    | 'Xanhact'
    | 'Vega Major'
    | 'Vega Minor'
    | 'Abaddon'
    | 'Loki'
    | 'Ashtroth'
    | 'Rigel II'
    | 'Rigel III'
    | 'Rigel I'
    | 'Mallice';

const planets: Planet[] = [
    {
        name: 'Jord',
        resources: 4,
        influence: 2,
    },
    {
        name: 'Moll Primus',
        resources: 4,
        influence: 1,
    },
    {
        name: 'Darien',
        resources: 4,
        influence: 4,
    },
    {
        name: 'Muaat',
        resources: 4,
        influence: 1,
    },
    {
        name: 'Nestphar',
        resources: 3,
        influence: 2,
    },
    {
        name: '[0.0.0]',
        resources: 5,
        influence: 0,
    },
    {
        name: 'Winnu',
        resources: 3,
        influence: 4,
    },
    {
        name: 'Mordai II',
        resources: 4,
        influence: 0,
    },
    {
        name: 'Maaluuk',
        resources: 0,
        influence: 2,
    },
    {
        name: 'Druaa',
        resources: 3,
        influence: 1,
    },
    {
        name: 'Arc Prime',
        resources: 4,
        influence: 0,
    },
    {
        name: 'Wren Terra',
        resources: 2,
        influence: 1,
    },
    {
        name: 'Lisis II',
        resources: 1,
        influence: 0,
    },
    {
        name: 'Ragh',
        resources: 2,
        influence: 1,
    },
    {
        name: 'Jol',
        resources: 1,
        influence: 2,
    },
    {
        name: 'Nar',
        resources: 2,
        influence: 3,
    },
    {
        name: 'Quinarra',
        resources: 3,
        influence: 1,
    },
    {
        name: "Tren'lak",
        resources: 1,
        influence: 0,
    },
    {
        name: 'Archon Ren',
        resources: 2,
        influence: 3,
    },
    {
        name: 'Archon Tau',
        resources: 1,
        influence: 1,
    },
    {
        name: 'Retillion',
        resources: 2,
        influence: 3,
    },
    {
        name: 'Shalloq',
        resources: 1,
        influence: 2,
    },
    {
        name: 'Arretze',
        resources: 2,
        influence: 0,
    },
    {
        name: 'Kamdorn',
        resources: 2,
        influence: 0,
    },
    {
        name: 'Hercant',
        resources: 1,
        influence: 1,
    },
    {
        name: 'Mecatol Rex',
        resources: 1,
        influence: 6,
    },
    {
        name: 'Wellon',
        resources: 1,
        influence: 2,
    },
    {
        name: 'Vefut II',
        resources: 2,
        influence: 2,
    },
    {
        name: 'Thibah',
        resources: 1,
        influence: 1,
    },
    {
        name: "Tar'mann",
        resources: 1,
        influence: 1,
    },
    {
        name: 'Saudor',
        resources: 2,
        influence: 2,
    },
    {
        name: 'Mehar Xull',
        resources: 1,
        influence: 3,
    },
    {
        name: 'Quann',
        resources: 2,
        influence: 1,
    },
    {
        name: 'Lodor',
        resources: 3,
        influence: 1,
    },
    {
        name: 'New Albion',
        resources: 1,
        influence: 1,
    },
    {
        name: 'Starpoint',
        resources: 3,
        influence: 1,
    },
    {
        name: "Tequ'ran",
        resources: 2,
        influence: 0,
    },
    {
        name: 'Torkan',
        resources: 0,
        influence: 3,
    },
    {
        name: "Qucen'n",
        resources: 1,
        influence: 2,
    },
    {
        name: 'Rarron',
        resources: 0,
        influence: 3,
    },
    {
        name: 'Mellon',
        resources: 0,
        influence: 2,
    },
    {
        name: 'Zohbat',
        resources: 3,
        influence: 1,
    },
    {
        name: 'Lazar',
        resources: 1,
        influence: 0,
    },
    {
        name: 'Sakulag',
        resources: 2,
        influence: 1,
    },
    {
        name: 'Dal Bootha',
        resources: 0,
        influence: 2,
    },
    {
        name: 'Xxehan',
        resources: 1,
        influence: 1,
    },
    {
        name: 'Corneeq',
        resources: 1,
        influence: 2,
    },
    {
        name: 'Resculon',
        resources: 2,
        influence: 0,
    },
    {
        name: 'Centauri',
        resources: 1,
        influence: 3,
    },
    {
        name: 'Gral',
        resources: 1,
        influence: 1,
    },
    {
        name: 'Bereg',
        resources: 3,
        influence: 1,
    },
    {
        name: 'Lirta IV',
        resources: 2,
        influence: 3,
    },
    {
        name: 'Xxehan',
        resources: 1,
        influence: 1,
    },
    {
        name: 'Arnor',
        resources: 2,
        influence: 1,
    },
    {
        name: 'Lor',
        resources: 1,
        influence: 2,
    },
    {
        name: 'Arinam',
        resources: 1,
        influence: 2,
    },
    {
        name: 'Meer',
        resources: 0,
        influence: 4,
    },
    {
        name: 'Abyz',
        resources: 3,
        influence: 0,
    },
    {
        name: 'Fria',
        resources: 2,
        influence: 0,
    },
    {
        name: 'Creuss',
        resources: 4,
        influence: 2,
    },
    {
        name: 'Ixth',
        resources: 3,
        influence: 5,
    },
    {
        name: 'Arcturus',
        resources: 4,
        influence: 4,
    },
    {
        name: 'Acheron',
        resources: 4,
        influence: 0,
    },
    {
        name: 'Elysium',
        resources: 4,
        influence: 1,
    },
    {
        name: 'The Dark',
        resources: 3,
        influence: 4,
    },
    {
        name: 'Naazir',
        resources: 2,
        influence: 1,
    },
    {
        name: 'Rohka',
        resources: 1,
        influence: 2,
    },
    {
        name: 'Yur',
        resources: 0,
        influence: 2,
    },
    {
        name: 'Avar',
        resources: 1,
        influence: 1,
    },
    {
        name: 'Valk',
        resources: 2,
        influence: 0,
    },
    {
        name: 'Archon Vail',
        resources: 1,
        influence: 3,
    },
    {
        name: 'Perimeter',
        resources: 2,
        influence: 1,
    },
    {
        name: 'Ang',
        resources: 2,
        influence: 0,
    },
    {
        name: 'Sem-lore',
        resources: 3,
        influence: 2,
    },
    {
        name: 'Vorhal',
        resources: 0,
        influence: 2,
    },
    {
        name: 'Atlas',
        resources: 3,
        influence: 1,
    },
    {
        name: 'Primor',
        resources: 2,
        influence: 1,
    },
    {
        name: "Hope's End",
        resources: 3,
        influence: 0,
    },
    {
        name: 'Cormund',
        resources: 2,
        influence: 0,
    },
    {
        name: 'Everra',
        resources: 3,
        influence: 1,
    },
    {
        name: 'Accoen',
        resources: 2,
        influence: 3,
    },
    {
        name: 'Jeol Ir',
        resources: 2,
        influence: 3,
    },
    {
        name: 'Kraag',
        resources: 2,
        influence: 1,
    },
    {
        name: 'Siig',
        resources: 0,
        influence: 2,
    },
    {
        name: "Ba'kal",
        resources: 3,
        influence: 2,
    },
    {
        name: 'Alio Prima',
        resources: 1,
        influence: 1,
    },
    {
        name: "Ba'kal",
        resources: 3,
        influence: 2,
    },
    {
        name: 'Lisis',
        resources: 2,
        influence: 2,
    },
    {
        name: 'Velnor',
        resources: 2,
        influence: 1,
    },
    {
        name: 'Cealdri',
        resources: 0,
        influence: 2,
    },
    {
        name: 'Xanhact',
        resources: 0,
        influence: 1,
    },
    {
        name: 'Vega Major',
        resources: 2,
        influence: 1,
    },
    {
        name: 'Vega Minor',
        resources: 1,
        influence: 2,
    },
    {
        name: 'Abaddon',
        resources: 1,
        influence: 0,
    },
    {
        name: 'Loki',
        resources: 1,
        influence: 2,
    },
    {
        name: 'Ashtroth',
        resources: 2,
        influence: 0,
    },
    {
        name: 'Rigel I',
        resources: 0,
        influence: 1,
    },
    {
        name: 'Rigel II',
        resources: 1,
        influence: 2,
    },
    {
        name: 'Rigel III',
        resources: 1,
        influence: 1,
    },
    {
        name: 'Mallice',
        resources: 0,
        influence: 3,
    },
];

export { Faction, hexColor, PlayerColor };
