import _ from 'underscore';

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
    }
};

export {
    Faction,
    factions,
    FactionSelection,
    factionsWithDynamicHomeworlds,
    factionsWithFixedHomeworlds,
    FactionWithDynamicHomeworlds,
    FactionWithFixedHomeworlds,
    homeworlds,
    homeworldsForFactionSelection,
    isFactionSelectionWithCustomHomeworlds,
    isFactionWithDynamicHomeworlds,
    selectedFaction,
    startingTechsForFaction,
};
