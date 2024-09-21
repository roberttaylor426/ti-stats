const planetNames = [
    'Jord',
    'Moll Primus',
    'Darien',
    'Muaat',
    'Nestphar',
    '[0.0.0]',
    'Winnu',
    'Mordai II',
    'Maaluuk',
    'Druaa',
    'Wren Terra',
    'Arc Prime',
    'Lisis II',
    'Ragh',
    'Jol',
    'Nar',
    "Tren'lak",
    'Quinarra',
    'Archon Ren',
    'Archon Tau',
    'Retillion',
    'Shalloq',
    'Arretze',
    'Hercant',
    'Kamdorn',
    'Mecatol Rex',
    'Wellon',
    'Vefut II',
    'Thibah',
    "Tar'mann",
    'Saudor',
    'Mehar Xull',
    'Quann',
    'Lodor',
    'New Albion',
    'Starpoint',
    "Tequ'ran",
    'Torkan',
    "Qucen'n",
    'Rarron',
    'Mellon',
    'Zohbat',
    'Lazar',
    'Sakulag',
    'Dal Bootha',
    'Xxehan',
    'Corneeq',
    'Resculon',
    'Centauri',
    'Gral',
    'Bereg',
    'Lirta IV',
    'Arnor',
    'Lor',
    'Arinam',
    'Meer',
    'Abyz',
    'Fria',
    'Creuss',
    'Ixth',
    'Arcturus',
    'Acheron',
    'Elysium',
    'The Dark',
    'Naazir',
    'Rohka',
    'Ylir',
    'Valk',
    'Avar',
    'Archon Vail',
    'Perimeter',
    'Ang',
    'Sem-lore',
    'Vorhal',
    'Atlas',
    'Primor',
    "Hope's End",
    'Cormund',
    'Everra',
    'Accoen',
    'Jeol Ir',
    'Kraag',
    'Siig',
    "Ba'kal",
    'Alio Prima',
    'Lisis',
    'Velnor',
    'Cealdri',
    'Xanhact',
    'Vega Major',
    'Vega Minor',
    'Abaddon',
    'Loki',
    'Ashtroth',
    'Rigel II',
    'Rigel III',
    'Rigel I',
    'Mallice',
    'Custodia Vigilia',
] as const;

type PlanetName = (typeof planetNames)[number];

type ResourcesAndInfluence = {
    resources: number;
    influence: number;
};

const planets: Record<PlanetName, ResourcesAndInfluence> = {
    Jord: {
        resources: 4,
        influence: 2,
    },
    'Moll Primus': {
        resources: 4,
        influence: 1,
    },
    Darien: {
        resources: 4,
        influence: 4,
    },
    Muaat: {
        resources: 4,
        influence: 1,
    },
    Nestphar: {
        resources: 3,
        influence: 2,
    },
    '[0.0.0]': {
        resources: 5,
        influence: 0,
    },
    Winnu: {
        resources: 3,
        influence: 4,
    },
    'Mordai II': {
        resources: 4,
        influence: 0,
    },
    Maaluuk: {
        resources: 0,
        influence: 2,
    },
    Druaa: {
        resources: 3,
        influence: 1,
    },
    'Arc Prime': {
        resources: 4,
        influence: 0,
    },
    'Wren Terra': {
        resources: 2,
        influence: 1,
    },
    'Lisis II': {
        resources: 1,
        influence: 0,
    },
    Ragh: {
        resources: 2,
        influence: 1,
    },
    Jol: {
        resources: 1,
        influence: 2,
    },
    Nar: {
        resources: 2,
        influence: 3,
    },
    Quinarra: {
        resources: 3,
        influence: 1,
    },
    "Tren'lak": {
        resources: 1,
        influence: 0,
    },
    'Archon Ren': {
        resources: 2,
        influence: 3,
    },
    'Archon Tau': {
        resources: 1,
        influence: 1,
    },
    Retillion: {
        resources: 2,
        influence: 3,
    },
    Shalloq: {
        resources: 1,
        influence: 2,
    },
    Arretze: {
        resources: 2,
        influence: 0,
    },
    Kamdorn: {
        resources: 2,
        influence: 0,
    },
    Hercant: {
        resources: 1,
        influence: 1,
    },
    'Mecatol Rex': {
        resources: 1,
        influence: 6,
    },
    Wellon: {
        resources: 1,
        influence: 2,
    },
    'Vefut II': {
        resources: 2,
        influence: 2,
    },
    Thibah: {
        resources: 1,
        influence: 1,
    },
    "Tar'mann": {
        resources: 1,
        influence: 1,
    },
    Saudor: {
        resources: 2,
        influence: 2,
    },
    'Mehar Xull': {
        resources: 1,
        influence: 3,
    },
    Quann: {
        resources: 2,
        influence: 1,
    },
    Lodor: {
        resources: 3,
        influence: 1,
    },
    'New Albion': {
        resources: 1,
        influence: 1,
    },
    Starpoint: {
        resources: 3,
        influence: 1,
    },
    "Tequ'ran": {
        resources: 2,
        influence: 0,
    },
    Torkan: {
        resources: 0,
        influence: 3,
    },
    "Qucen'n": {
        resources: 1,
        influence: 2,
    },
    Rarron: {
        resources: 0,
        influence: 3,
    },
    Mellon: {
        resources: 0,
        influence: 2,
    },
    Zohbat: {
        resources: 3,
        influence: 1,
    },
    Lazar: {
        resources: 1,
        influence: 0,
    },
    Sakulag: {
        resources: 2,
        influence: 1,
    },
    'Dal Bootha': {
        resources: 0,
        influence: 2,
    },
    Xxehan: {
        resources: 1,
        influence: 1,
    },
    Corneeq: {
        resources: 1,
        influence: 2,
    },
    Resculon: {
        resources: 2,
        influence: 0,
    },
    Centauri: {
        resources: 1,
        influence: 3,
    },
    Gral: {
        resources: 1,
        influence: 1,
    },
    Bereg: {
        resources: 3,
        influence: 1,
    },
    'Lirta IV': {
        resources: 2,
        influence: 3,
    },
    Arnor: {
        resources: 2,
        influence: 1,
    },
    Lor: {
        resources: 1,
        influence: 2,
    },
    Arinam: {
        resources: 1,
        influence: 2,
    },
    Meer: {
        resources: 0,
        influence: 4,
    },
    Abyz: {
        resources: 3,
        influence: 0,
    },
    Fria: {
        resources: 2,
        influence: 0,
    },
    Creuss: {
        resources: 4,
        influence: 2,
    },
    Ixth: {
        resources: 3,
        influence: 5,
    },
    Arcturus: {
        resources: 4,
        influence: 4,
    },
    Acheron: {
        resources: 4,
        influence: 0,
    },
    Elysium: {
        resources: 4,
        influence: 1,
    },
    'The Dark': {
        resources: 3,
        influence: 4,
    },
    Naazir: {
        resources: 2,
        influence: 1,
    },
    Rohka: {
        resources: 1,
        influence: 2,
    },
    Ylir: {
        resources: 0,
        influence: 2,
    },
    Avar: {
        resources: 1,
        influence: 1,
    },
    Valk: {
        resources: 2,
        influence: 0,
    },
    'Archon Vail': {
        resources: 1,
        influence: 3,
    },
    Perimeter: {
        resources: 2,
        influence: 1,
    },
    Ang: {
        resources: 2,
        influence: 0,
    },
    'Sem-lore': {
        resources: 3,
        influence: 2,
    },
    Vorhal: {
        resources: 0,
        influence: 2,
    },
    Atlas: {
        resources: 3,
        influence: 1,
    },
    Primor: {
        resources: 2,
        influence: 1,
    },
    "Hope's End": {
        resources: 3,
        influence: 0,
    },
    Cormund: {
        resources: 2,
        influence: 0,
    },
    Everra: {
        resources: 3,
        influence: 1,
    },
    Accoen: {
        resources: 2,
        influence: 3,
    },
    'Jeol Ir': {
        resources: 2,
        influence: 3,
    },
    Kraag: {
        resources: 2,
        influence: 1,
    },
    Siig: {
        resources: 0,
        influence: 2,
    },
    "Ba'kal": {
        resources: 3,
        influence: 2,
    },
    'Alio Prima': {
        resources: 1,
        influence: 1,
    },
    Lisis: {
        resources: 2,
        influence: 2,
    },
    Velnor: {
        resources: 2,
        influence: 1,
    },
    Cealdri: {
        resources: 0,
        influence: 2,
    },
    Xanhact: {
        resources: 0,
        influence: 1,
    },
    'Vega Major': {
        resources: 2,
        influence: 1,
    },
    'Vega Minor': {
        resources: 1,
        influence: 2,
    },
    Abaddon: {
        resources: 1,
        influence: 0,
    },
    Loki: {
        resources: 1,
        influence: 2,
    },
    Ashtroth: {
        resources: 2,
        influence: 0,
    },
    'Rigel I': {
        resources: 0,
        influence: 1,
    },
    'Rigel II': {
        resources: 1,
        influence: 2,
    },
    'Rigel III': {
        resources: 1,
        influence: 1,
    },
    Mallice: {
        resources: 0,
        influence: 3,
    },
    'Custodia Vigilia': {
        resources: 2,
        influence: 3,
    },
};

export { PlanetName, planetNames, planets, ResourcesAndInfluence };
