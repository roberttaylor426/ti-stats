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
    'Mirage',
    'Custodia Vigilia',
    'Silence',
    'Echo',
    'Tarrock',
    'Prism',
    'Troac',
    'Etir V',
    'Vioss',
    'Fakrenn',
    'San-vit',
    'Lodran',
    'Dorvok',
    'Derbrae',
    'Moln',
    'Rysaa',
    'Salin',
    'Gwiyun',
    'Inan',
    'Swog',
    'Detic',
    'Lliot',
    'Qaak',
    'Larred',
    'Nairb',
    'Sierpen',
    'Mandle',
    'Regnem',
    'Domna',
    'Rhune',
    'Kroll',
    'Cyrra',
    'Idyn',
    'Pax',
    'Kyr',
    'Vess',
    'Ogdun',
    'Brthkul',
    'Drah',
    'Trykk',
    'Vadarian',
    'Norvus',
    'Biaheo',
    'Empero',
    'Demis',
    'Chrion',
    'Axis',
    'Sanctuary',
    'Shi-Halaum',
    'Discordia',
    'Cymiae',
    'Prind',
    'Gen',
    'Zelian',
    'Vaylar',
    'Delmor',
    'Kyd',
    'Abyssus',
    'Louk',
    'Auldane',
    'Ellas',
    'Aldra',
    'Beata',
    'Bohl-Dhur',
    'Susuros',
    'Poh',
    'Orad',
    'Kjalengard',
    'Hulgade',
    'Benc',
    'Hau',
    'Zarr',
    'Nokk',
    'Last Stop',
    "Aysis' Rest",
    'Solitude',
    'Avicenna',
    'Alesna',
    'Azle',
    'Arche',
    'Gghurn Theta',
    'Ekko',
    'Edyn',
    'Okke',
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
    Mirage: {
        resources: 1,
        influence: 2,
    },
    'Custodia Vigilia': {
        resources: 2,
        influence: 3,
    },
    'Etir V': {
        resources: 4,
        influence: 0,
    },
    Echo: {
        resources: 1,
        influence: 2,
    },
    Fakrenn: {
        resources: 2,
        influence: 2,
    },
    Prism: {
        resources: 0,
        influence: 3,
    },
    Silence: {
        resources: 2,
        influence: 2,
    },
    Tarrock: {
        resources: 3,
        influence: 0,
    },
    Troac: {
        resources: 0,
        influence: 4,
    },
    Vioss: {
        resources: 3,
        influence: 3,
    },
    'San-vit': {
        resources: 3,
        influence: 1,
    },
    Lodran: {
        resources: 0,
        influence: 2,
    },
    Dorvok: {
        resources: 1,
        influence: 2,
    },
    Derbrae: {
        resources: 2,
        influence: 3,
    },
    Moln: {
        resources: 1,
        influence: 2,
    },
    Rysaa: {
        resources: 2,
        influence: 0,
    },
    Salin: {
        resources: 1,
        influence: 2,
    },
    Gwiyun: {
        resources: 2,
        influence: 2,
    },
    Inan: {
        resources: 1,
        influence: 2,
    },
    Swog: {
        resources: 1,
        influence: 0,
    },
    Detic: {
        resources: 3,
        influence: 2,
    },
    Lliot: {
        resources: 0,
        influence: 1,
    },
    Qaak: {
        resources: 1,
        influence: 1,
    },
    Larred: {
        resources: 1,
        influence: 1,
    },
    Nairb: {
        resources: 1,
        influence: 1,
    },
    Sierpen: {
        resources: 2,
        influence: 0,
    },
    Mandle: {
        resources: 1,
        influence: 1,
    },
    Regnem: {
        resources: 0,
        influence: 2,
    },
    Domna: {
        resources: 2,
        influence: 1,
    },
    Rhune: {
        resources: 3,
        influence: 4,
    },
    Kroll: {
        resources: 1,
        influence: 1,
    },
    Cyrra: {
        resources: 0,
        influence: 1,
    },
    Idyn: {
        resources: 1,
        influence: 0,
    },
    Pax: {
        resources: 1,
        influence: 2,
    },
    Kyr: {
        resources: 2,
        influence: 0,
    },
    Vess: {
        resources: 0,
        influence: 1,
    },
    Ogdun: {
        resources: 2,
        influence: 0,
    },
    Brthkul: {
        resources: 1,
        influence: 3,
    },
    Drah: {
        resources: 1,
        influence: 2,
    },
    Trykk: {
        resources: 2,
        influence: 1,
    },
    Vadarian: {
        resources: 3,
        influence: 0,
    },
    Norvus: {
        resources: 1,
        influence: 2,
    },
    Biaheo: {
        resources: 3,
        influence: 0,
    },
    Empero: {
        resources: 0,
        influence: 3,
    },
    Demis: {
        resources: 2,
        influence: 2,
    },
    Chrion: {
        resources: 2,
        influence: 3,
    },
    Axis: {
        resources: 5,
        influence: 0,
    },
    Sanctuary: {
        resources: 3,
        influence: 4,
    },
    'Shi-Halaum': {
        resources: 4,
        influence: 0,
    },
    Discordia: {
        resources: 4,
        influence: 1,
    },
    Cymiae: {
        resources: 3,
        influence: 1,
    },
    Prind: {
        resources: 3,
        influence: 3,
    },
    Gen: {
        resources: 2,
        influence: 0,
    },
    Zelian: {
        resources: 3,
        influence: 3,
    },
    Vaylar: {
        resources: 3,
        influence: 2,
    },
    Delmor: {
        resources: 2,
        influence: 1,
    },
    Kyd: {
        resources: 1,
        influence: 2,
    },
    Abyssus: {
        resources: 4,
        influence: 2,
    },
    Louk: {
        resources: 2,
        influence: 1,
    },
    Auldane: {
        resources: 1,
        influence: 3,
    },
    Ellas: {
        resources: 3,
        influence: 3,
    },
    Aldra: {
        resources: 2,
        influence: 3,
    },
    Beata: {
        resources: 2,
        influence: 1,
    },
    'Bohl-Dhur': {
        resources: 3,
        influence: 4,
    },
    Susuros: {
        resources: 4,
        influence: 4,
    },
    Poh: {
        resources: 2,
        influence: 0,
    },
    Orad: {
        resources: 3,
        influence: 1,
    },
    Kjalengard: {
        resources: 3,
        influence: 2,
    },
    Hulgade: {
        resources: 1,
        influence: 0,
    },
    Benc: {
        resources: 2,
        influence: 0,
    },
    Hau: {
        resources: 1,
        influence: 2,
    },
    Zarr: {
        resources: 2,
        influence: 1,
    },
    Nokk: {
        resources: 1,
        influence: 1,
    },
    'Last Stop': {
        resources: 3,
        influence: 0,
    },
    "Aysis' Rest": {
        resources: 4,
        influence: 3,
    },
    Solitude: {
        resources: 0,
        influence: 1,
    },
    Avicenna: {
        resources: 4,
        influence: 0,
    },
    Alesna: {
        resources: 2,
        influence: 0,
    },
    Azle: {
        resources: 2,
        influence: 0,
    },
    Arche: {
        resources: 2,
        influence: 2,
    },
    'Gghurn Theta': {
        resources: 2,
        influence: 1,
    },
    Ekko: {
        resources: 0,
        influence: 1,
    },
    Edyn: {
        resources: 3,
        influence: 3,
    },
    Okke: {
        resources: 0,
        influence: 1,
    },
};

export { PlanetName, planetNames, planets, ResourcesAndInfluence };
