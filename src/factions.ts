import { PlanetName } from './planets';

const factions = [
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

type Faction = (typeof factions)[number];

const homeworlds = (f: Faction): PlanetName[] => {
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

export { Faction, factions, homeworlds };
