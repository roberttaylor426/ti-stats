import _ from 'underscore';

import tile0 from './assets/tiles/ST_0.webp';
import tile1 from './assets/tiles/ST_1.webp';
import tile2 from './assets/tiles/ST_2.webp';
import tile3 from './assets/tiles/ST_3.webp';
import tile4 from './assets/tiles/ST_4.webp';
import tile5 from './assets/tiles/ST_5.webp';
import tile6 from './assets/tiles/ST_6.webp';
import tile7 from './assets/tiles/ST_7.webp';
import tile8 from './assets/tiles/ST_8.webp';
import tile9 from './assets/tiles/ST_9.webp';
import tile10 from './assets/tiles/ST_10.webp';
import tile11 from './assets/tiles/ST_11.webp';
import tile12 from './assets/tiles/ST_12.webp';
import tile13 from './assets/tiles/ST_13.webp';
import tile14 from './assets/tiles/ST_14.webp';
import tile15 from './assets/tiles/ST_15.webp';
import tile16 from './assets/tiles/ST_16.webp';
import tile17 from './assets/tiles/ST_17.webp';
import tile18 from './assets/tiles/ST_18.webp';
import tile19 from './assets/tiles/ST_19.webp';
import tile20 from './assets/tiles/ST_20.webp';
import tile21 from './assets/tiles/ST_21.webp';
import tile22 from './assets/tiles/ST_22.webp';
import tile23 from './assets/tiles/ST_23.webp';
import tile24 from './assets/tiles/ST_24.webp';
import tile25 from './assets/tiles/ST_25.webp';
import tile26 from './assets/tiles/ST_26.webp';
import tile27 from './assets/tiles/ST_27.webp';
import tile28 from './assets/tiles/ST_28.webp';
import tile29 from './assets/tiles/ST_29.webp';
import tile30 from './assets/tiles/ST_30.webp';
import tile31 from './assets/tiles/ST_31.webp';
import tile32 from './assets/tiles/ST_32.webp';
import tile33 from './assets/tiles/ST_33.webp';
import tile34 from './assets/tiles/ST_34.webp';
import tile35 from './assets/tiles/ST_35.webp';
import tile36 from './assets/tiles/ST_36.webp';
import tile37 from './assets/tiles/ST_37.webp';
import tile38 from './assets/tiles/ST_38.webp';
import tile39 from './assets/tiles/ST_39.webp';
import tile40 from './assets/tiles/ST_40.webp';
import tile41 from './assets/tiles/ST_41.webp';
import tile42 from './assets/tiles/ST_42.webp';
import tile43 from './assets/tiles/ST_43.webp';
import tile44 from './assets/tiles/ST_44.webp';
import tile45 from './assets/tiles/ST_45.webp';
import tile46 from './assets/tiles/ST_46.webp';
import tile47 from './assets/tiles/ST_47.webp';
import tile48 from './assets/tiles/ST_48.webp';
import tile49 from './assets/tiles/ST_49.webp';
import tile50 from './assets/tiles/ST_50.webp';
import tile51 from './assets/tiles/ST_51.webp';
import tile52 from './assets/tiles/ST_52.webp';
import tile53 from './assets/tiles/ST_53.webp';
import tile54 from './assets/tiles/ST_54.webp';
import tile55 from './assets/tiles/ST_55.webp';
import tile56 from './assets/tiles/ST_56.webp';
import tile57 from './assets/tiles/ST_57.webp';
import tile58 from './assets/tiles/ST_58.webp';
import tile59 from './assets/tiles/ST_59.webp';
import tile60 from './assets/tiles/ST_60.webp';
import tile61 from './assets/tiles/ST_61.webp';
import tile62 from './assets/tiles/ST_62.webp';
import tile63 from './assets/tiles/ST_63.webp';
import tile64 from './assets/tiles/ST_64.webp';
import tile65 from './assets/tiles/ST_65.webp';
import tile66 from './assets/tiles/ST_66.webp';
import tile67 from './assets/tiles/ST_67.webp';
import tile68 from './assets/tiles/ST_68.webp';
import tile69 from './assets/tiles/ST_69.webp';
import tile70 from './assets/tiles/ST_70.webp';
import tile71 from './assets/tiles/ST_71.webp';
import tile72 from './assets/tiles/ST_72.webp';
import tile73 from './assets/tiles/ST_73.webp';
import tile74 from './assets/tiles/ST_74.webp';
import tile75 from './assets/tiles/ST_75.webp';
import tile76 from './assets/tiles/ST_76.webp';
import tile77 from './assets/tiles/ST_77.webp';
import tile78 from './assets/tiles/ST_78.webp';
import tile79 from './assets/tiles/ST_79.webp';
import tile80 from './assets/tiles/ST_80.webp';
import tile81 from './assets/tiles/ST_81.webp';
import tile82 from './assets/tiles/ST_82.webp';
import tile3201 from './assets/tiles/ST_3201.webp';
import tile3202 from './assets/tiles/ST_3202.webp';
import tile3203 from './assets/tiles/ST_3203.webp';
import tile3204 from './assets/tiles/ST_3204.webp';
import tile3205 from './assets/tiles/ST_3205.webp';
import tile3206 from './assets/tiles/ST_3206.webp';
import tile3207 from './assets/tiles/ST_3207.webp';
import tile3208 from './assets/tiles/ST_3208.webp';
import tile3209 from './assets/tiles/ST_3209.webp';
import tile3210 from './assets/tiles/ST_3210.webp';
import tile3211 from './assets/tiles/ST_3211.webp';
import tile3212 from './assets/tiles/ST_3212.webp';
import tile3213 from './assets/tiles/ST_3213.webp';
import tile3214 from './assets/tiles/ST_3214.webp';
import tile3215 from './assets/tiles/ST_3215.webp';
import tile3216 from './assets/tiles/ST_3216.webp';
import tile3217 from './assets/tiles/ST_3217.webp';
import tile3218 from './assets/tiles/ST_3218.webp';
import tile3219 from './assets/tiles/ST_3219.webp';
import tile3220 from './assets/tiles/ST_3220.webp';
import tile3221 from './assets/tiles/ST_3221.webp';
import tile3222 from './assets/tiles/ST_3222.webp';
import tile3223 from './assets/tiles/ST_3223.webp';
import tile3224 from './assets/tiles/ST_3224.webp';
import tile3226 from './assets/tiles/ST_3226.webp';
import tile3227 from './assets/tiles/ST_3227.webp';
import tile3228 from './assets/tiles/ST_3228.webp';
import tile3229 from './assets/tiles/ST_3229.webp';
import tile3230 from './assets/tiles/ST_3230.webp';
import tile3231 from './assets/tiles/ST_3231.webp';
import tile3232 from './assets/tiles/ST_3232.webp';
import tile3233 from './assets/tiles/ST_3233.webp';
import tile3234 from './assets/tiles/ST_3234.webp';
import tile3235 from './assets/tiles/ST_3235.webp';
import tile4253 from './assets/tiles/ST_4253.webp';
import tile4254 from './assets/tiles/ST_4254.webp';
import tile4255 from './assets/tiles/ST_4255.webp';
import tile4256 from './assets/tiles/ST_4256.webp';
import tile4257 from './assets/tiles/ST_4257.webp';
import tile4258 from './assets/tiles/ST_4258.webp';
import tile4259 from './assets/tiles/ST_4259.webp';
import tile4260 from './assets/tiles/ST_4260.webp';
import tile4261 from './assets/tiles/ST_4261.webp';
import tile4262 from './assets/tiles/ST_4262.webp';
import tile4263 from './assets/tiles/ST_4263.webp';
import tile4264 from './assets/tiles/ST_4264.webp';
import tile4265 from './assets/tiles/ST_4265.webp';
import tile4266 from './assets/tiles/ST_4266.webp';
import tile4267 from './assets/tiles/ST_4267.webp';
import tile4268 from './assets/tiles/ST_4268.webp';
import tile4269 from './assets/tiles/ST_4269.webp';
import tile4270 from './assets/tiles/ST_4270.webp';
import tile4271 from './assets/tiles/ST_4271.webp';
import tile4272 from './assets/tiles/ST_4272.webp';
import tile4273 from './assets/tiles/ST_4273.webp';
import tile4274 from './assets/tiles/ST_4274.webp';
import tile4275 from './assets/tiles/ST_4275.webp';
import tile4276 from './assets/tiles/ST_4276.webp';
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
    3232, 4270, 4271, 4272, 4273, 4274, 4275, 4276,
] as const;

type PlanetlessSystemTileNumber = (typeof planetlessSystemTileNumbers)[number];

const systemWithPlanetsTileNumbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 51, 52, 53,
    54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,
    73, 74, 75, 76, 82, 3201, 3202, 3203, 3204, 3205, 3206, 3207, 3208, 3209,
    3210, 3211, 3212, 3213, 3214, 3215, 3216, 3217, 3218, 3219, 3220, 3221,
    3222, 3223, 3224, 3225, 3226, 3227, 3228, 3229, 3230, 3231, 3233, 3234,
    3235, 4253, 4254, 4255, 4256, 4257, 4258, 4259, 4260, 4261, 4262, 4263,
    4264, 4265, 4266, 4267, 4268, 4269,
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
    {
        tileNumber: 3201,
        image: tile3201,
        planets: homeworlds('The Veldyr Sovereignty'),
    },
    {
        tileNumber: 3202,
        image: tile3202,
        planets: homeworlds('The Free Systems Compact'),
    },
    {
        tileNumber: 3203,
        image: tile3203,
        planets: homeworlds('The Li-Zho Dynasty'),
    },
    {
        tileNumber: 3204,
        image: tile3204,
        planets: homeworlds('The Kortali Tribunal'),
    },
    {
        tileNumber: 3205,
        image: tile3205,
        planets: homeworlds('The Ghemina Raiders'),
    },
    {
        tileNumber: 3206,
        image: tile3206,
        planets: homeworlds('The Vaden Banking Clans'),
    },
    {
        tileNumber: 3207,
        image: tile3207,
        planets: homeworlds('The Glimmer of Mortheus'),
    },
    {
        tileNumber: 3208,
        image: tile3208,
        planets: homeworlds('The Augurs of Illyxum'),
    },
    {
        tileNumber: 3209,
        image: tile3209,
        planets: homeworlds('The Shipwrights of Ark'),
    },
    {
        tileNumber: 3210,
        image: tile3210,
        planets: homeworlds('The Olradin League'),
    },
    {
        tileNumber: 3211,
        image: tile3211,
        planets: homeworlds('The Myko-Mentori'),
    },
    {
        tileNumber: 3212,
        image: tile3212,
        planets: homeworlds('The Tnelis Syndicate'),
    },
    {
        tileNumber: 3213,
        image: tile3213,
        planets: homeworlds('The Savages of Cymiae'),
    },
    {
        tileNumber: 3214,
        image: tile3214,
        planets: homeworlds("Roh'Dhna Mechatronics"),
    },
    {
        tileNumber: 3215,
        image: tile3215,
        planets: homeworlds('The Zelian Purifier'),
    },
    {
        tileNumber: 3216,
        image: tile3216,
        planets: homeworlds('The Vaylerian Scourge'),
    },
    {
        tileNumber: 3217,
        image: tile3217,
        planets: homeworlds('The Florzen Profiteers'),
    },
    {
        tileNumber: 3218,
        image: tile3218,
        planets: homeworlds('The Dih-Mohn Flotilla'),
    },
    {
        tileNumber: 3219,
        image: tile3219,
        planets: homeworlds('The Celdauri Trade Confederation'),
    },
    {
        tileNumber: 3220,
        image: tile3220,
        planets: homeworlds('The Nivyn Star of Kings'),
    },
    {
        tileNumber: 3221,
        image: tile3221,
        planets: homeworlds('The Mirveda Protectorate'),
    },
    {
        tileNumber: 3222,
        image: tile3222,
        planets: homeworlds("The L'tokk Khrask"),
    },
    {
        tileNumber: 3223,
        image: tile3223,
        planets: homeworlds('The Kollecc Society'),
    },
    {
        tileNumber: 3224,
        image: tile3224,
        planets: homeworlds('The Zealots of Rhodun'),
    },
    {
        tileNumber: 3226,
        image: tile3226,
        planets: homeworlds('The Berserkers of Kjalengard'),
    },
    {
        tileNumber: 3227,
        image: tile3227,
        planets: homeworlds('The Bentor Conglomerate'),
    },
    {
        tileNumber: 3228,
        image: tile3228,
        planets: homeworlds('The Nokar Sellships'),
    },
    {
        tileNumber: 3229,
        image: tile3229,
        planets: homeworlds('The GLEdge Union'),
    },
    {
        tileNumber: 3230,
        image: tile3230,
        planets: homeworlds('The Lanefir Remants'),
    },
    {
        tileNumber: 3231,
        image: tile3231,
        planets: homeworlds('The Kyro Sodality'),
    },
    {
        tileNumber: 3232,
        image: tile3232,
    },
    {
        tileNumber: 3233,
        image: tile3233,
        planets: homeworlds('The Monks of Kolume'),
    },
    {
        tileNumber: 3234,
        image: tile3234,
        planets: homeworlds('The Cheiran Hordes'),
    },
    {
        tileNumber: 3235,
        image: tile3235,
        planets: homeworlds('The Edyn Mandate'),
    },
    {
        tileNumber: 4253,
        image: tile4253,
        planets: ['Silence'],
    },
    {
        tileNumber: 4254,
        image: tile4254,
        planets: ['Echo'],
    },
    {
        tileNumber: 4255,
        image: tile4255,
        planets: ['Tarrock'],
    },
    {
        tileNumber: 4256,
        image: tile4256,
        planets: ['Prism'],
    },
    {
        tileNumber: 4257,
        image: tile4257,
        planets: ['Troac'],
    },
    {
        tileNumber: 4258,
        image: tile4258,
        planets: ['Etir V'],
    },
    {
        tileNumber: 4259,
        image: tile4259,
        planets: ['Vioss'],
    },
    {
        tileNumber: 4260,
        image: tile4260,
        planets: ['Fakrenn'],
    },
    {
        tileNumber: 4260,
        image: tile4260,
        planets: ['Fakrenn'],
    },
    {
        tileNumber: 4260,
        image: tile4260,
        planets: ['Fakrenn'],
    },
    {
        tileNumber: 4261,
        image: tile4261,
        planets: ['San-vit', 'Lodran'],
    },
    {
        tileNumber: 4262,
        image: tile4262,
        planets: ['Dorvok', 'Derbrae'],
    },
    {
        tileNumber: 4263,
        image: tile4263,
        planets: ['Moln', 'Rysaa'],
    },
    {
        tileNumber: 4264,
        image: tile4264,
        planets: ['Salin', 'Gwiyun'],
    },
    {
        tileNumber: 4265,
        image: tile4265,
        planets: ['Inan', 'Swog'],
    },
    {
        tileNumber: 4266,
        image: tile4266,
        planets: ['Detic', 'Lliot'],
    },
    {
        tileNumber: 4267,
        image: tile4267,
        planets: ['Qaak', 'Larred', 'Nairb'],
    },
    {
        tileNumber: 4268,
        image: tile4268,
        planets: ['Sierpen', 'Mandle', 'Regnem'],
    },
    {
        tileNumber: 4269,
        image: tile4269,
        planets: ['Domna'],
    },
    {
        tileNumber: 4270,
        image: tile4270,
    },
    {
        tileNumber: 4271,
        image: tile4271,
    },
    {
        tileNumber: 4272,
        image: tile4272,
    },
    {
        tileNumber: 4273,
        image: tile4273,
    },
    {
        tileNumber: 4274,
        image: tile4274,
    },
    {
        tileNumber: 4275,
        image: tile4275,
    },
    {
        tileNumber: 4276,
        image: tile4276,
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
        case 3232:
            return 'Ghoti Wayfarers home system';
        case 4272:
            return 'Beta wormhole in nebula';
        case 4273:
            return 'Asteroid field in nebula';
        case 4274:
            return 'Gravity rift in asteroid field';
        case 4275:
            return 'Gamma wormhole next to gravity rift';
        case 4276:
            return 'Alpha and beta wormhole in supernova';
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
        case 4270:
        case 4271:
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
