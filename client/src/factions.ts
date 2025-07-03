import _ from 'underscore';

import cabal from './assets/factionSheets/cabal.webp';
import dihmon from './assets/factionSheets/dih.webp';
import berserkers from './assets/factionSheets/kjal.webp';
import l1z1x from './assets/factionSheets/l1z1x.webp';
import rohdna from './assets/factionSheets/rohdna.webp';
import tnelis from './assets/factionSheets/tnelis.webp';
import { PlanetName } from './planets';
import {
    aiDevelopmentAlgorithm,
    antimassDeflectors,
    bioStims,
    darkEnergyTap,
    daxciveAnimators,
    gravitonLaserSystem,
    gravityDrive,
    magenDefenseGrid,
    neuralMotivator,
    plasmaScoring,
    predictiveIntelligence,
    psychoArchaeology,
    sarweenTools,
    scanlinkDroneNetwork,
    selfAssemblyRoutines,
    slingRelay,
    Technology,
} from './technologies';

const factionsWithFixedHomeworlds = [
    'Sardakk N’orr',
    'The Arborec',
    'The Argent Flight',
    'The Barony of Letnev',
    'The Clan of Saar',
    'The Embers of Muaat',
    'The Emirates of Hacan',
    'The Empyrean',
    'The Federation of Sol',
    'The Ghosts of Creuss',
    'The L1Z1X Mindnet',
    'The Mahact Gene-Sorcerers',
    'The Mentak Coalition',
    'The Naalu Collective',
    'The Naaz-Rokha Alliance',
    'The Nekro Virus',
    'The Nomad',
    'The Titans of Ul',
    'The Universities of Jol-Nar',
    "The Vuil'Raith Cabal",
    'The Winnu',
    'The Xxcha Kingdom',
    'The Yin Brotherhood',
    'The Yssaril Tribes',
    'The Shipwrights of Ark',
    'The Celdauri Trade Confederation',
    'The Savages of Cymiae',
    'The Dih-Mohn Flotilla',
    'The Florzen Profiteers',
    'The Free Systems Compact',
    'The Ghemina Raiders',
    'The Augurs of Illyxum',
    'The Kollecc Society',
    'The Kortali Tribunal',
    'The Li-Zho Dynasty',
    "The L'tokk Khrask",
    'The Mirveda Protectorate',
    'The Glimmer of Mortheus',
    'The Myko-Mentori',
    'The Nivyn Star of Kings',
    'The Olradin League',
    'The Zealots of Rhodun',
    "Roh'Dhna Mechatronics",
    'The Tnelis Syndicate',
    'The Vaden Banking Clans',
    'The Vaylerian Scourge',
    'The Veldyr Sovereignty',
    'The Zelian Purifier',
    'The Bentor Conglomerate',
    'The Cheiran Hordes',
    'The Edyn Mandate',
    'The Ghoti Wayfarers',
    'The GLEdge Union',
    'The Berserkers of Kjalengard',
    'The Monks of Kolume',
    'The Kyro Sodality',
    'The Lanefir Remants',
    'The Nokar Sellships',
] as const;

type FactionWithFixedHomeworlds = (typeof factionsWithFixedHomeworlds)[number];

const factionsWithDynamicHomeworlds = ['The Council Keleres'] as const;

type FactionWithDynamicHomeworlds =
    (typeof factionsWithDynamicHomeworlds)[number];

type Faction = FactionWithFixedHomeworlds | FactionWithDynamicHomeworlds;

const isFactionWithDynamicHomeworlds = (
    f: string
): f is FactionWithDynamicHomeworlds =>
    factionsWithDynamicHomeworlds.some((fwdh) => fwdh === f);

const factions = _.sortBy([
    ...factionsWithFixedHomeworlds,
    ...factionsWithDynamicHomeworlds,
]);

const shortName = (f: Faction): string => f.replace('The ', '');

const superShortName = (f: Faction): string => {
    switch (f) {
        case 'Sardakk N’orr':
            return 'Sardakk';
        case 'The Arborec':
            return 'Arborec';
        case 'The Argent Flight':
            return 'Argent';
        case 'The Barony of Letnev':
            return 'Barony';
        case 'The Clan of Saar':
            return 'Saar';
        case 'The Embers of Muaat':
            return 'Muatt';
        case 'The Emirates of Hacan':
            return 'Hacan';
        case 'The Empyrean':
            return 'Empyrean';
        case 'The Federation of Sol':
            return 'Sol';
        case 'The Ghosts of Creuss':
            return 'Ghosts';
        case 'The L1Z1X Mindnet':
            return 'L1Z1X';
        case 'The Mahact Gene-Sorcerers':
            return 'Mahact';
        case 'The Mentak Coalition':
            return 'Mentak';
        case 'The Naalu Collective':
            return 'Naalu';
        case 'The Naaz-Rokha Alliance':
            return 'Naaz-Rokha';
        case 'The Nekro Virus':
            return 'Nekro';
        case 'The Nomad':
            return 'Nomad';
        case 'The Titans of Ul':
            return 'Titans';
        case 'The Universities of Jol-Nar':
            return 'Jol-Nar';
        case "The Vuil'Raith Cabal":
            return "Vuil'Raith";
        case 'The Winnu':
            return 'Winnu';
        case 'The Xxcha Kingdom':
            return 'Xxcha';
        case 'The Yin Brotherhood':
            return 'Yin';
        case 'The Yssaril Tribes':
            return 'Yssaril';
        case 'The Shipwrights of Ark':
            return 'Shipwrights';
        case 'The Celdauri Trade Confederation':
            return 'Celdauri';
        case 'The Savages of Cymiae':
            return 'Savages';
        case 'The Dih-Mohn Flotilla':
            return 'Dih-Mohn';
        case 'The Florzen Profiteers':
            return 'Florzen';
        case 'The Free Systems Compact':
            return 'Compact';
        case 'The Ghemina Raiders':
            return 'Ghemina';
        case 'The Augurs of Illyxum':
            return 'Augurs';
        case 'The Kollecc Society':
            return 'Kollecc';
        case 'The Kortali Tribunal':
            return 'Kortali';
        case 'The Li-Zho Dynasty':
            return 'Li-Zho';
        case "The L'tokk Khrask":
            return "L'tokk";
        case 'The Mirveda Protectorate':
            return 'Mirveda';
        case 'The Glimmer of Mortheus':
            return 'Glimmer';
        case 'The Myko-Mentori':
            return 'Myko-Mentori';
        case 'The Nivyn Star of Kings':
            return 'Nivyn';
        case 'The Olradin League':
            return 'Olradin';
        case 'The Zealots of Rhodun':
            return 'Zealots';
        case "Roh'Dhna Mechatronics":
            return "Roh'Dhna";
        case 'The Tnelis Syndicate':
            return 'Tnelis';
        case 'The Vaden Banking Clans':
            return 'Vaden';
        case 'The Vaylerian Scourge':
            return 'Vaylerian';
        case 'The Veldyr Sovereignty':
            return 'Veldyr';
        case 'The Zelian Purifier':
            return 'Zelian';
        case 'The Bentor Conglomerate':
            return 'Bentor';
        case 'The Cheiran Hordes':
            return 'Cheiran';
        case 'The Edyn Mandate':
            return 'Edyn';
        case 'The Ghoti Wayfarers':
            return 'Ghoti';
        case 'The GLEdge Union':
            return 'GLEdge';
        case 'The Berserkers of Kjalengard':
            return 'Berserkers';
        case 'The Monks of Kolume':
            return 'Monks';
        case 'The Kyro Sodality':
            return 'Kyro';
        case 'The Lanefir Remants':
            return 'Lanefir';
        case 'The Nokar Sellships':
            return 'Nokar';
        case 'The Council Keleres':
            return 'Keleres';
    }
};

const homeworlds = (f: FactionWithFixedHomeworlds): PlanetName[] => {
    switch (f) {
        case 'Sardakk N’orr':
            return ["Tren'lak", 'Quinarra'];
        case 'The Arborec':
            return ['Nestphar'];
        case 'The Argent Flight':
            return ['Valk', 'Avar', 'Ylir'];
        case 'The Barony of Letnev':
            return ['Arc Prime', 'Wren Terra'];
        case 'The Clan of Saar':
            return ['Lisis II', 'Ragh'];
        case 'The Embers of Muaat':
            return ['Muaat'];
        case 'The Emirates of Hacan':
            return ['Arretze', 'Hercant', 'Kamdorn'];
        case 'The Empyrean':
            return ['The Dark'];
        case 'The Federation of Sol':
            return ['Jord'];
        case 'The Ghosts of Creuss':
            return ['Creuss'];
        case 'The L1Z1X Mindnet':
            return ['[0.0.0]'];
        case 'The Mahact Gene-Sorcerers':
            return ['Ixth'];
        case 'The Mentak Coalition':
            return ['Moll Primus'];
        case 'The Naalu Collective':
            return ['Maaluuk', 'Druaa'];
        case 'The Naaz-Rokha Alliance':
            return ['Naazir', 'Rohka'];
        case 'The Nekro Virus':
            return ['Mordai II'];
        case 'The Nomad':
            return ['Arcturus'];
        case 'The Titans of Ul':
            return ['Elysium'];
        case 'The Universities of Jol-Nar':
            return ['Jol', 'Nar'];
        case "The Vuil'Raith Cabal":
            return ['Acheron'];
        case 'The Winnu':
            return ['Winnu'];
        case 'The Xxcha Kingdom':
            return ['Archon Ren', 'Archon Tau'];
        case 'The Yin Brotherhood':
            return ['Darien'];
        case 'The Yssaril Tribes':
            return ['Retillion', 'Shalloq'];
        case 'The Shipwrights of Ark':
            return ['Axis'];
        case 'The Celdauri Trade Confederation':
            return ['Louk', 'Auldane'];
        case 'The Savages of Cymiae':
            return ['Cymiae'];
        case 'The Dih-Mohn Flotilla':
            return ['Abyssus'];
        case 'The Florzen Profiteers':
            return ['Delmor', 'Kyd'];
        case 'The Free Systems Compact':
            return ['Idyn', 'Kroll', 'Cyrra'];
        case 'The Ghemina Raiders':
            return ['Drah', 'Trykk'];
        case 'The Augurs of Illyxum':
            return ['Chrion', 'Demis'];
        case 'The Kollecc Society':
            return ['Susuros'];
        case 'The Kortali Tribunal':
            return ['Ogdun', 'Brthkul'];
        case 'The Li-Zho Dynasty':
            return ['Pax', 'Vess', 'Kyr'];
        case "The L'tokk Khrask":
            return ['Bohl-Dhur'];
        case 'The Mirveda Protectorate':
            return ['Aldra', 'Beata'];
        case 'The Glimmer of Mortheus':
            return ['Biaheo', 'Empero'];
        case 'The Myko-Mentori':
            return ['Shi-Halaum'];
        case 'The Nivyn Star of Kings':
            return ['Ellas'];
        case 'The Olradin League':
            return ['Sanctuary'];
        case 'The Zealots of Rhodun':
            return ['Poh', 'Orad'];
        case "Roh'Dhna Mechatronics":
            return ['Prind'];
        case 'The Tnelis Syndicate':
            return ['Discordia'];
        case 'The Vaden Banking Clans':
            return ['Vadarian', 'Norvus'];
        case 'The Vaylerian Scourge':
            return ['Vaylar'];
        case 'The Veldyr Sovereignty':
            return ['Rhune'];
        case 'The Zelian Purifier':
            return ['Zelian', 'Gen'];
        case 'The Bentor Conglomerate':
            return ['Benc', 'Hau'];
        case 'The Cheiran Hordes':
            return ['Gghurn Theta', 'Arche'];
        case 'The Edyn Mandate':
            return ['Edyn', 'Ekko', 'Okke'];
        case 'The Ghoti Wayfarers':
            return [];
        case 'The GLEdge Union':
            return ['Last Stop'];
        case 'The Berserkers of Kjalengard':
            return ['Kjalengard', 'Hulgade'];
        case 'The Monks of Kolume':
            return ['Alesna', 'Azle'];
        case 'The Kyro Sodality':
            return ['Avicenna'];
        case 'The Lanefir Remants':
            return ["Aysis' Rest", 'Solitude'];
        case 'The Nokar Sellships':
            return ['Zarr', 'Nokk'];
    }
};

const factionSheetImage = (f: Faction): string => {
    switch (f) {
        case 'Sardakk N’orr':
            return '';
        case 'The Arborec':
            return '';
        case 'The Argent Flight':
            return '';
        case 'The Barony of Letnev':
            return '';
        case 'The Clan of Saar':
            return '';
        case 'The Embers of Muaat':
            return '';
        case 'The Emirates of Hacan':
            return '';
        case 'The Empyrean':
            return '';
        case 'The Federation of Sol':
            return '';
        case 'The Ghosts of Creuss':
            return '';
        case 'The L1Z1X Mindnet':
            return l1z1x;
        case 'The Mahact Gene-Sorcerers':
            return '';
        case 'The Mentak Coalition':
            return '';
        case 'The Naalu Collective':
            return '';
        case 'The Naaz-Rokha Alliance':
            return '';
        case 'The Nekro Virus':
            return '';
        case 'The Nomad':
            return '';
        case 'The Titans of Ul':
            return '';
        case 'The Universities of Jol-Nar':
            return '';
        case "The Vuil'Raith Cabal":
            return cabal;
        case 'The Winnu':
            return '';
        case 'The Xxcha Kingdom':
            return '';
        case 'The Yin Brotherhood':
            return '';
        case 'The Yssaril Tribes':
            return '';
        case 'The Shipwrights of Ark':
            return '';
        case 'The Celdauri Trade Confederation':
            return '';
        case 'The Savages of Cymiae':
            return '';
        case 'The Dih-Mohn Flotilla':
            return dihmon;
        case 'The Florzen Profiteers':
            return '';
        case 'The Free Systems Compact':
            return '';
        case 'The Ghemina Raiders':
            return '';
        case 'The Augurs of Illyxum':
            return '';
        case 'The Kollecc Society':
            return '';
        case 'The Kortali Tribunal':
            return '';
        case 'The Li-Zho Dynasty':
            return '';
        case "The L'tokk Khrask":
            return '';
        case 'The Mirveda Protectorate':
            return '';
        case 'The Glimmer of Mortheus':
            return '';
        case 'The Myko-Mentori':
            return '';
        case 'The Nivyn Star of Kings':
            return '';
        case 'The Olradin League':
            return '';
        case 'The Zealots of Rhodun':
            return '';
        case "Roh'Dhna Mechatronics":
            return rohdna;
        case 'The Tnelis Syndicate':
            return tnelis;
        case 'The Vaden Banking Clans':
            return '';
        case 'The Vaylerian Scourge':
            return '';
        case 'The Veldyr Sovereignty':
            return '';
        case 'The Zelian Purifier':
            return '';
        case 'The Bentor Conglomerate':
            return '';
        case 'The Cheiran Hordes':
            return '';
        case 'The Edyn Mandate':
            return '';
        case 'The Ghoti Wayfarers':
            return '';
        case 'The GLEdge Union':
            return '';
        case 'The Berserkers of Kjalengard':
            return berserkers;
        case 'The Monks of Kolume':
            return '';
        case 'The Kyro Sodality':
            return '';
        case 'The Lanefir Remants':
            return '';
        case 'The Nokar Sellships':
            return '';
        case 'The Council Keleres':
            return '';
    }
};

const factionQuote = (f: Faction): string => {
    switch (f) {
        case 'Sardakk N’orr':
            return '';
        case 'The Arborec':
            return '';
        case 'The Argent Flight':
            return '';
        case 'The Barony of Letnev':
            return '';
        case 'The Clan of Saar':
            return '';
        case 'The Embers of Muaat':
            return '';
        case 'The Emirates of Hacan':
            return '';
        case 'The Empyrean':
            return '';
        case 'The Federation of Sol':
            return '';
        case 'The Ghosts of Creuss':
            return '';
        case 'The L1Z1X Mindnet':
            return 'You do not know the meaning of time. You do not comprehend the infinite. Your ignorance is surpassed only by your irrelevance.';
        case 'The Mahact Gene-Sorcerers':
            return '';
        case 'The Mentak Coalition':
            return '';
        case 'The Naalu Collective':
            return '';
        case 'The Naaz-Rokha Alliance':
            return '';
        case 'The Nekro Virus':
            return '';
        case 'The Nomad':
            return '';
        case 'The Titans of Ul':
            return '';
        case 'The Universities of Jol-Nar':
            return '';
        case "The Vuil'Raith Cabal":
            return 'YOUR FORM IS FRAGILE AND WEAK. LET ME RELIEVE YOU OF YOUR HARDSHIPS.';
        case 'The Winnu':
            return '';
        case 'The Xxcha Kingdom':
            return '';
        case 'The Yin Brotherhood':
            return '';
        case 'The Yssaril Tribes':
            return '';
        case 'The Shipwrights of Ark':
            return '';
        case 'The Celdauri Trade Confederation':
            return '';
        case 'The Savages of Cymiae':
            return '';
        case 'The Dih-Mohn Flotilla':
            return 'We are exiles no longer!';
        case 'The Florzen Profiteers':
            return '';
        case 'The Free Systems Compact':
            return '';
        case 'The Ghemina Raiders':
            return '';
        case 'The Augurs of Illyxum':
            return '';
        case 'The Kollecc Society':
            return '';
        case 'The Kortali Tribunal':
            return '';
        case 'The Li-Zho Dynasty':
            return '';
        case "The L'tokk Khrask":
            return '';
        case 'The Mirveda Protectorate':
            return '';
        case 'The Glimmer of Mortheus':
            return 'You do not see. You will know.';
        case 'The Myko-Mentori':
            return '';
        case 'The Nivyn Star of Kings':
            return '';
        case 'The Olradin League':
            return '';
        case 'The Zealots of Rhodun':
            return '';
        case "Roh'Dhna Mechatronics":
            return 'Do not test our patience, valued customer, for it is with our constructions that your wars are fought.';
        case 'The Tnelis Syndicate':
            return 'Syndicate rules? Protect children, healers, and family. Always.';
        case 'The Vaden Banking Clans':
            return '';
        case 'The Vaylerian Scourge':
            return '';
        case 'The Veldyr Sovereignty':
            return '';
        case 'The Zelian Purifier':
            return '';
        case 'The Bentor Conglomerate':
            return "We will find what we seek. Don't make this difficult";
        case 'The Cheiran Hordes':
            return '';
        case 'The Edyn Mandate':
            return '';
        case 'The Ghoti Wayfarers':
            return 'You float through space, seeking to conquer its surface, but ignorant to what you disturbed in the deep.';
        case 'The GLEdge Union':
            return '';
        case 'The Berserkers of Kjalengard':
            return 'There is no glory in crushing the weak.';
        case 'The Monks of Kolume':
            return '';
        case 'The Kyro Sodality':
            return '';
        case 'The Lanefir Remants':
            return '';
        case 'The Nokar Sellships':
            return '';
        case 'The Council Keleres':
            return '';
    }
};

type FactionSelectionWithCustomHomeworlds = {
    faction: FactionWithDynamicHomeworlds;
    homeworldsOf: FactionWithFixedHomeworlds;
};

type FactionSelection =
    | FactionWithFixedHomeworlds
    | FactionSelectionWithCustomHomeworlds;

const isFactionSelectionWithCustomHomeworlds = (
    fs: FactionSelection
): fs is FactionSelectionWithCustomHomeworlds =>
    !!(fs as FactionSelectionWithCustomHomeworlds).homeworldsOf;

const selectedFaction = (fs: FactionSelection): Faction =>
    isFactionSelectionWithCustomHomeworlds(fs) ? fs.faction : fs;

const homeworldsForFactionSelection = (fs: FactionSelection): PlanetName[] =>
    isFactionSelectionWithCustomHomeworlds(fs)
        ? homeworlds(fs.homeworldsOf)
        : homeworlds(fs);

const startingTechsForFaction = (f: Faction): Technology[] => {
    switch (f) {
        case 'Sardakk N’orr':
            return [];
        case 'The Arborec':
            return [magenDefenseGrid];
        case 'The Argent Flight':
            return [];
        case 'The Barony of Letnev':
            return [antimassDeflectors, plasmaScoring];
        case 'The Clan of Saar':
            return [antimassDeflectors];
        case 'The Embers of Muaat':
            return [plasmaScoring];
        case 'The Emirates of Hacan':
            return [antimassDeflectors, sarweenTools];
        case 'The Empyrean':
            return [darkEnergyTap];
        case 'The Federation of Sol':
            return [neuralMotivator, antimassDeflectors];
        case 'The Ghosts of Creuss':
            return [gravityDrive];
        case 'The L1Z1X Mindnet':
            return [neuralMotivator, plasmaScoring];
        case 'The Mahact Gene-Sorcerers':
            return [bioStims, predictiveIntelligence];
        case 'The Mentak Coalition':
            return [sarweenTools, plasmaScoring];
        case 'The Naalu Collective':
            return [neuralMotivator, sarweenTools];
        case 'The Naaz-Rokha Alliance':
            return [psychoArchaeology, aiDevelopmentAlgorithm];
        case 'The Nekro Virus':
            return [daxciveAnimators];
        case 'The Nomad':
            return [slingRelay];
        case 'The Titans of Ul':
            return [antimassDeflectors, scanlinkDroneNetwork];
        case 'The Universities of Jol-Nar':
            return [
                neuralMotivator,
                antimassDeflectors,
                sarweenTools,
                plasmaScoring,
            ];
        case "The Vuil'Raith Cabal":
            return [selfAssemblyRoutines];
        case 'The Winnu':
            return [];
        case 'The Xxcha Kingdom':
            return [gravitonLaserSystem];
        case 'The Yin Brotherhood':
            return [sarweenTools];
        case 'The Yssaril Tribes':
            return [neuralMotivator];
        case 'The Council Keleres':
            return [];
        case 'The Shipwrights of Ark':
            return [sarweenTools, aiDevelopmentAlgorithm];
        case 'The Celdauri Trade Confederation':
            return [];
        case 'The Savages of Cymiae':
            return [aiDevelopmentAlgorithm, neuralMotivator];
        case 'The Dih-Mohn Flotilla':
            return [darkEnergyTap, scanlinkDroneNetwork];
        case 'The Florzen Profiteers':
            return [scanlinkDroneNetwork, neuralMotivator];
        case 'The Free Systems Compact':
            return [psychoArchaeology];
        case 'The Ghemina Raiders':
            return [darkEnergyTap, psychoArchaeology];
        case 'The Augurs of Illyxum':
            return [scanlinkDroneNetwork, aiDevelopmentAlgorithm];
        case 'The Kollecc Society':
            return [scanlinkDroneNetwork];
        case 'The Kortali Tribunal':
            return [plasmaScoring, psychoArchaeology];
        case 'The Li-Zho Dynasty':
            return [psychoArchaeology, antimassDeflectors];
        case "The L'tokk Khrask":
            return [scanlinkDroneNetwork, plasmaScoring];
        case 'The Mirveda Protectorate':
            return [aiDevelopmentAlgorithm];
        case 'The Glimmer of Mortheus':
            return [darkEnergyTap];
        case 'The Myko-Mentori':
            return [predictiveIntelligence];
        case 'The Nivyn Star of Kings':
            return [darkEnergyTap, plasmaScoring];
        case 'The Olradin League':
            return [scanlinkDroneNetwork, psychoArchaeology];
        case 'The Zealots of Rhodun':
            return [bioStims];
        case "Roh'Dhna Mechatronics":
            return [sarweenTools, psychoArchaeology];
        case 'The Tnelis Syndicate':
            return [];
        case 'The Vaden Banking Clans':
            return [];
        case 'The Vaylerian Scourge':
            return [darkEnergyTap, neuralMotivator];
        case 'The Veldyr Sovereignty':
            return [darkEnergyTap, aiDevelopmentAlgorithm];
        case 'The Zelian Purifier':
            return [antimassDeflectors, aiDevelopmentAlgorithm];
        case 'The Bentor Conglomerate':
        case 'The Cheiran Hordes':
        case 'The Edyn Mandate':
        case 'The Ghoti Wayfarers':
        case 'The GLEdge Union':
        case 'The Berserkers of Kjalengard':
        case 'The Monks of Kolume':
        case 'The Kyro Sodality':
        case 'The Lanefir Remants':
        case 'The Nokar Sellships':
            return [];
    }
};

export {
    Faction,
    factionQuote,
    factions,
    FactionSelection,
    factionSheetImage,
    factionsWithDynamicHomeworlds,
    factionsWithFixedHomeworlds,
    FactionWithDynamicHomeworlds,
    FactionWithFixedHomeworlds,
    homeworlds,
    homeworldsForFactionSelection,
    isFactionSelectionWithCustomHomeworlds,
    isFactionWithDynamicHomeworlds,
    selectedFaction,
    shortName,
    startingTechsForFaction,
    superShortName,
};
