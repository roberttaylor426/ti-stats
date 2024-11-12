import _ from 'underscore';

import tile0 from './assets/tiles/ST_0.png';
import tile1 from './assets/tiles/ST_1.png';
import tile2 from './assets/tiles/ST_2.png';
import tile3 from './assets/tiles/ST_3.png';
import tile4 from './assets/tiles/ST_4.png';
import tile5 from './assets/tiles/ST_5.png';
import tile6 from './assets/tiles/ST_6.png';
import tile7 from './assets/tiles/ST_7.png';
import tile8 from './assets/tiles/ST_8.png';
import tile9 from './assets/tiles/ST_9.png';
import tile10 from './assets/tiles/ST_10.png';
import tile11 from './assets/tiles/ST_11.png';
import tile12 from './assets/tiles/ST_12.png';
import tile13 from './assets/tiles/ST_13.png';
import tile14 from './assets/tiles/ST_14.png';
import tile15 from './assets/tiles/ST_15.png';
import tile16 from './assets/tiles/ST_16.png';
import tile17 from './assets/tiles/ST_17.png';
import tile18 from './assets/tiles/ST_18.png';
import tile19 from './assets/tiles/ST_19.png';
import tile20 from './assets/tiles/ST_20.png';
import tile21 from './assets/tiles/ST_21.png';
import tile22 from './assets/tiles/ST_22.png';
import tile23 from './assets/tiles/ST_23.png';
import tile24 from './assets/tiles/ST_24.png';
import tile25 from './assets/tiles/ST_25.png';
import tile26 from './assets/tiles/ST_26.png';
import tile27 from './assets/tiles/ST_27.png';
import tile28 from './assets/tiles/ST_28.png';
import tile29 from './assets/tiles/ST_29.png';
import tile30 from './assets/tiles/ST_30.png';
import tile31 from './assets/tiles/ST_31.png';
import tile32 from './assets/tiles/ST_32.png';
import tile33 from './assets/tiles/ST_33.png';
import tile34 from './assets/tiles/ST_34.png';
import tile35 from './assets/tiles/ST_35.png';
import tile36 from './assets/tiles/ST_36.png';
import tile37 from './assets/tiles/ST_37.png';
import tile38 from './assets/tiles/ST_38.png';
import tile39 from './assets/tiles/ST_39.png';
import tile40 from './assets/tiles/ST_40.png';
import tile41 from './assets/tiles/ST_41.png';
import tile42 from './assets/tiles/ST_42.png';
import tile43 from './assets/tiles/ST_43.png';
import tile44 from './assets/tiles/ST_44.png';
import tile45 from './assets/tiles/ST_45.png';
import tile46 from './assets/tiles/ST_46.png';
import tile47 from './assets/tiles/ST_47.png';
import tile48 from './assets/tiles/ST_48.png';
import tile49 from './assets/tiles/ST_49.png';
import tile50 from './assets/tiles/ST_50.png';
import tile51 from './assets/tiles/ST_51.png';
import tile52 from './assets/tiles/ST_52.png';
import tile53 from './assets/tiles/ST_53.png';
import tile54 from './assets/tiles/ST_54.png';
import tile55 from './assets/tiles/ST_55.png';
import tile56 from './assets/tiles/ST_56.png';
import tile57 from './assets/tiles/ST_57.png';
import tile58 from './assets/tiles/ST_58.png';
import tile59 from './assets/tiles/ST_59.png';
import tile60 from './assets/tiles/ST_60.png';
import tile61 from './assets/tiles/ST_61.png';
import tile62 from './assets/tiles/ST_62.png';
import tile63 from './assets/tiles/ST_63.png';
import tile64 from './assets/tiles/ST_64.png';
import tile65 from './assets/tiles/ST_65.png';
import tile66 from './assets/tiles/ST_66.png';
import tile67 from './assets/tiles/ST_67.png';
import tile68 from './assets/tiles/ST_68.png';
import tile69 from './assets/tiles/ST_69.png';
import tile70 from './assets/tiles/ST_70.png';
import tile71 from './assets/tiles/ST_71.png';
import tile72 from './assets/tiles/ST_72.png';
import tile73 from './assets/tiles/ST_73.png';
import tile74 from './assets/tiles/ST_74.png';
import tile75 from './assets/tiles/ST_75.png';
import tile76 from './assets/tiles/ST_76.png';
import tile77 from './assets/tiles/ST_77.png';
import tile78 from './assets/tiles/ST_78.png';
import tile79 from './assets/tiles/ST_79.png';
import tile80 from './assets/tiles/ST_80.png';
import tile81 from './assets/tiles/ST_81.png';
import tile82 from './assets/tiles/ST_82.png';
import {
    FactionSelection,
    homeworlds,
    isFactionSelectionWithCustomHomeworlds,
} from './factions';
import { PlanetName } from './planets';

type PlanetlessSystemTile = {
    tileNumber: PlanetlessSystemTileNumber;
    image: string;
};

type SystemWithPlanetsTile = {
    tileNumber: SystemWithPlanetsTileNumber;
    image: string;
    planets: PlanetName[];
};

type SystemTile = PlanetlessSystemTile | SystemWithPlanetsTile;

const isSystemWithPlanetsTile = (t: SystemTile): t is SystemWithPlanetsTile =>
    isSystemWithPlanetsTileNumber(t.tileNumber);

const systemTileImages = [
    tile1,
    tile2,
    tile3,
    tile4,
    tile5,
    tile6,
    tile7,
    tile8,
    tile9,
    tile10,
    tile11,
    tile12,
    tile13,
    tile14,
    tile15,
    tile16,
    tile17,
    tile18,
    tile19,
    tile20,
    tile21,
    tile22,
    tile23,
    tile24,
    tile25,
    tile26,
    tile27,
    tile28,
    tile29,
    tile30,
    tile31,
    tile32,
    tile33,
    tile34,
    tile35,
    tile36,
    tile37,
    tile38,
    tile39,
    tile40,
    tile41,
    tile42,
    tile43,
    tile44,
    tile45,
    tile46,
    tile47,
    tile48,
    tile49,
    tile50,
    tile51,
    tile52,
    tile53,
    tile54,
    tile55,
    tile56,
    tile57,
    tile58,
    tile59,
    tile60,
    tile61,
    tile62,
    tile63,
    tile64,
    tile65,
    tile66,
    tile67,
    tile68,
    tile69,
    tile70,
    tile71,
    tile72,
    tile73,
    tile74,
    tile75,
    tile76,
    tile77,
    tile78,
    tile79,
    tile80,
    tile81,
    tile82,
];

const planetlessSystemTileNumbers = [
    17, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 77, 78, 79, 80, 81,
] as const;

type PlanetlessSystemTileNumber = (typeof planetlessSystemTileNumbers)[number];

const systemWithPlanetsTileNumbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 51, 52, 53,
    54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,
    73, 74, 75, 76, 82,
] as const;

type SystemWithPlanetsTileNumber =
    (typeof systemWithPlanetsTileNumbers)[number];

type SystemTileNumber =
    | PlanetlessSystemTileNumber
    | SystemWithPlanetsTileNumber;

const isSystemWithPlanetsTileNumber = (
    stn: SystemTileNumber
): stn is SystemWithPlanetsTileNumber =>
    !!systemWithPlanetsTileNumbers.find((n) => n === stn);

const isPlanetlessSystemTileNumber = (
    stn: SystemTileNumber
): stn is PlanetlessSystemTileNumber => !isSystemWithPlanetsTileNumber(stn);

const isSystemTileNumber = (n: number): n is SystemTileNumber =>
    Number.isInteger(n) && n >= 1 && n < 82;

const ghostsOfCreussGalaxyTileNumber = 17;
const mecatolRexTileNumber = 18;
const ghostsOfCreussHomeTileNumber = 51;
const malliceTileNumber = 82;

const systemTiles: SystemTile[] = [
    {
        tileNumber: 1,
        image: tile1,
        planets: homeworlds('The Federation of Sol'),
    },
    {
        tileNumber: 2,
        image: tile2,
        planets: homeworlds('The Mentak Coalition'),
    },
    {
        tileNumber: 3,
        image: tile3,
        planets: homeworlds('The Yin Brotherhood'),
    },
    {
        tileNumber: 4,
        image: tile4,
        planets: homeworlds('The Embers of Muaat'),
    },
    {
        tileNumber: 5,
        image: tile5,
        planets: homeworlds('The Arborec'),
    },
    {
        tileNumber: 6,
        image: tile6,
        planets: homeworlds('The L1Z1X Mindnet'),
    },
    {
        tileNumber: 7,
        image: tile7,
        planets: homeworlds('The Winnu'),
    },
    {
        tileNumber: 8,
        image: tile8,
        planets: homeworlds('The Nekro Virus'),
    },
    {
        tileNumber: 9,
        image: tile9,
        planets: homeworlds('The Naalu Collective'),
    },
    {
        tileNumber: 10,
        image: tile10,
        planets: homeworlds('The Barony of Letnev'),
    },
    {
        tileNumber: 11,
        image: tile11,
        planets: homeworlds('The Clan of Saar'),
    },
    {
        tileNumber: 12,
        image: tile12,
        planets: homeworlds('The Universities of Jol-Nar'),
    },
    {
        tileNumber: 13,
        image: tile13,
        planets: homeworlds('Sardakk N’orr'),
    },
    {
        tileNumber: 14,
        image: tile14,
        planets: homeworlds('The Xxcha Kingdom'),
    },
    {
        tileNumber: 15,
        image: tile15,
        planets: homeworlds('The Yssaril Tribes'),
    },
    {
        tileNumber: 16,
        image: tile16,
        planets: homeworlds('The Emirates of Hacan'),
    },
    {
        tileNumber: ghostsOfCreussGalaxyTileNumber,
        image: tile17,
    },
    {
        tileNumber: mecatolRexTileNumber,
        image: tile18,
        planets: ['Mecatol Rex'],
    },
    {
        tileNumber: 19,
        image: tile19,
        planets: ['Wellon'],
    },
    {
        tileNumber: 20,
        image: tile20,
        planets: ['Vefut II'],
    },
    {
        tileNumber: 21,
        image: tile21,
        planets: ['Thibah'],
    },
    {
        tileNumber: 22,
        image: tile22,
        planets: ["Tar'mann"],
    },
    {
        tileNumber: 23,
        image: tile23,
        planets: ['Saudor'],
    },
    {
        tileNumber: 24,
        image: tile24,
        planets: ['Mehar Xull'],
    },
    {
        tileNumber: 25,
        image: tile25,
        planets: ['Quann'],
    },
    {
        tileNumber: 26,
        image: tile26,
        planets: ['Lodor'],
    },
    {
        tileNumber: 27,
        image: tile27,
        planets: ['New Albion', 'Starpoint'],
    },
    {
        tileNumber: 28,
        image: tile28,
        planets: ["Tequ'ran", 'Torkan'],
    },
    {
        tileNumber: 29,
        image: tile29,
        planets: ["Qucen'n", 'Rarron'],
    },
    {
        tileNumber: 30,
        image: tile30,
        planets: ['Mellon', 'Zohbat'],
    },
    {
        tileNumber: 31,
        image: tile31,
        planets: ['Lazar', 'Sakulag'],
    },
    {
        tileNumber: 32,
        image: tile32,
        planets: ['Dal Bootha', 'Xxehan'],
    },
    {
        tileNumber: 33,
        image: tile33,
        planets: ['Corneeq', 'Resculon'],
    },
    {
        tileNumber: 34,
        image: tile34,
        planets: ['Centauri', 'Gral'],
    },
    {
        tileNumber: 35,
        image: tile35,
        planets: ['Bereg', 'Lirta IV'],
    },
    {
        tileNumber: 36,
        image: tile36,
        planets: ['Arnor', 'Lor'],
    },
    {
        tileNumber: 37,
        image: tile37,
        planets: ['Arinam', 'Meer'],
    },
    {
        tileNumber: 38,
        image: tile38,
        planets: ['Abyz', 'Fria'],
    },
    {
        tileNumber: 39,
        image: tile39,
    },
    {
        tileNumber: 40,
        image: tile40,
    },
    {
        tileNumber: 41,
        image: tile41,
    },
    {
        tileNumber: 42,
        image: tile42,
    },
    {
        tileNumber: 43,
        image: tile43,
    },
    {
        tileNumber: 44,
        image: tile44,
    },
    {
        tileNumber: 45,
        image: tile45,
    },
    {
        tileNumber: 46,
        image: tile46,
    },
    {
        tileNumber: 47,
        image: tile47,
    },
    {
        tileNumber: 48,
        image: tile48,
    },
    {
        tileNumber: 49,
        image: tile49,
    },
    {
        tileNumber: 50,
        image: tile50,
    },
    {
        tileNumber: ghostsOfCreussHomeTileNumber,
        image: tile51,
        planets: homeworlds('The Ghosts of Creuss'),
    },
    {
        tileNumber: 52,
        image: tile52,
        planets: homeworlds('The Mahact Gene-Sorcerers'),
    },
    {
        tileNumber: 53,
        image: tile53,
        planets: homeworlds('The Nomad'),
    },
    {
        tileNumber: 54,
        image: tile54,
        planets: homeworlds("The Vuil'Raith Cabal"),
    },
    {
        tileNumber: 55,
        image: tile55,
        planets: homeworlds('The Titans of Ul'),
    },
    {
        tileNumber: 56,
        image: tile56,
        planets: homeworlds('The Empyrean'),
    },
    {
        tileNumber: 57,
        image: tile57,
        planets: homeworlds('The Naaz-Rokha Alliance'),
    },
    {
        tileNumber: 58,
        image: tile58,
        planets: homeworlds('The Argent Flight'),
    },
    {
        tileNumber: 59,
        image: tile59,
        planets: ['Archon Vail'],
    },
    {
        tileNumber: 60,
        image: tile60,
        planets: ['Perimeter'],
    },
    {
        tileNumber: 61,
        image: tile61,
        planets: ['Ang'],
    },
    {
        tileNumber: 62,
        image: tile62,
        planets: ['Sem-lore'],
    },
    {
        tileNumber: 63,
        image: tile63,
        planets: ['Vorhal'],
    },
    {
        tileNumber: 64,
        image: tile64,
        planets: ['Atlas'],
    },
    {
        tileNumber: 65,
        image: tile65,
        planets: ['Primor'],
    },
    {
        tileNumber: 66,
        image: tile66,
        planets: ["Hope's End"],
    },
    {
        tileNumber: 67,
        image: tile67,
        planets: ['Cormund'],
    },
    {
        tileNumber: 68,
        image: tile68,
        planets: ['Everra'],
    },
    {
        tileNumber: 69,
        image: tile69,
        planets: ['Accoen', 'Jeol Ir'],
    },
    {
        tileNumber: 70,
        image: tile70,
        planets: ['Kraag', 'Siig'],
    },
    {
        tileNumber: 71,
        image: tile71,
        planets: ["Ba'kal", 'Alio Prima'],
    },
    {
        tileNumber: 72,
        image: tile72,
        planets: ['Lisis', 'Velnor'],
    },
    {
        tileNumber: 73,
        image: tile73,
        planets: ['Cealdri', 'Xanhact'],
    },
    {
        tileNumber: 74,
        image: tile74,
        planets: ['Vega Major', 'Vega Minor'],
    },
    {
        tileNumber: 75,
        image: tile75,
        planets: ['Abaddon', 'Loki', 'Ashtroth'],
    },
    {
        tileNumber: 76,
        image: tile76,
        planets: ['Rigel I', 'Rigel II', 'Rigel III'],
    },
    {
        tileNumber: 77,
        image: tile77,
    },
    {
        tileNumber: 78,
        image: tile78,
    },
    {
        tileNumber: 79,
        image: tile79,
    },
    {
        tileNumber: 80,
        image: tile80,
    },
    {
        tileNumber: 81,
        image: tile81,
    },
    {
        tileNumber: malliceTileNumber,
        image: tile82,
        planets: ['Mallice'],
    },
];

const systemTileDescription = (stn: SystemTileNumber): string =>
    `${stn} - ${isSystemWithPlanetsTileNumber(stn) ? systemWithPlanetsTileDescription(stn) : planetlessSystemTileDescription(stn)}`;

const systemWithPlanetsTileDescription = (
    stn: SystemWithPlanetsTileNumber
): string =>
    (
        systemTiles
            .filter(isSystemWithPlanetsTile)
            .find((st) => st.tileNumber === stn)?.planets || []
    ).join(', ');

const planetlessSystemTileDescription = (
    stn: PlanetlessSystemTileNumber
): string => {
    switch (stn) {
        case 17:
            return 'The Creuss Gate';
        case 39:
            return 'Alpha wormhole';
        case 40:
            return 'Beta wormhole';
        case 41:
            return 'Gravity rift';
        case 42:
            return 'Nebula';
        case 43:
        case 80:
            return 'Supernova';
        case 44:
        case 45:
            return 'Asteroid field';
        case 46:
        case 47:
        case 48:
        case 49:
        case 50:
        case 77:
        case 78:
            return 'Empty space';
        case 79:
            return 'Alpha wormhole in asteroid field';
        case 81:
            return 'Muaat supernova';
    }
};

const factionSystemTileNumber = (fs: FactionSelection): SystemTileNumber => {
    const factionForSystemTile = isFactionSelectionWithCustomHomeworlds(fs)
        ? fs.homeworldsOf
        : fs;
    return systemTiles
        .filter(isSystemWithPlanetsTile)
        .find((st) => _.isEqual(st.planets, homeworlds(factionForSystemTile)))
        ?.tileNumber as SystemTileNumber;
};

export {
    factionSystemTileNumber,
    ghostsOfCreussGalaxyTileNumber,
    ghostsOfCreussHomeTileNumber,
    isPlanetlessSystemTileNumber,
    isSystemTileNumber,
    isSystemWithPlanetsTile,
    isSystemWithPlanetsTileNumber,
    malliceTileNumber,
    mecatolRexTileNumber,
    PlanetlessSystemTileNumber,
    SystemTile,
    systemTileDescription,
    systemTileImages,
    SystemTileNumber,
    systemTiles,
    tile0,
};
