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

type SystemTile = {
    tileNumber: TileNumber;
    image: string;
    planets: Planet[];
};

const tileImages = [
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

type TileNumber =
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31
    | 32
    | 33
    | 34
    | 35
    | 36
    | 37
    | 38
    | 39
    | 40
    | 41
    | 42
    | 43
    | 44
    | 45
    | 46
    | 47
    | 48
    | 49
    | 50
    | 51
    | 52
    | 53
    | 54
    | 55
    | 56
    | 57
    | 58
    | 59
    | 60
    | 61
    | 62
    | 63
    | 64
    | 65
    | 66
    | 67
    | 68
    | 69
    | 70
    | 71
    | 72
    | 73
    | 74
    | 75
    | 76
    | 77
    | 78
    | 79
    | 80
    | 81
    | 82;

export { tileImages,TileNumber };
