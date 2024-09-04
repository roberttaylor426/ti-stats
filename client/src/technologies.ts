import { Faction } from './factions';

type TechnologyType =
    | 'Biotic'
    | 'Propulsion'
    | 'Cybernetic'
    | 'Warfare'
    | 'Unit';

type Technology = {
    name: string;
    type: TechnologyType;
    faction?: Faction;
};

const sarweenTools: Technology = {
    name: 'Sarween Tools',
    type: 'Cybernetic',
};

const predictiveIntelligence: Technology = {
    name: 'Predictive Intelligence',
    type: 'Cybernetic',
};

const gravitonLaserSystem: Technology = {
    name: 'Graviton Laser System',
    type: 'Cybernetic',
};

const scanlinkDroneNetwork: Technology = {
    name: 'Scanlink Drone Network',
    type: 'Cybernetic',
};

const neuralMotivator: Technology = {
    name: 'Neural Motivator',
    type: 'Biotic',
};

const psychoArchaeology: Technology = {
    name: 'Psychoarchaeology',
    type: 'Biotic',
};

const daxciveAnimators: Technology = {
    name: 'Daxcive Animators',
    type: 'Biotic',
};

const bioStims: Technology = {
    name: 'Bio Stims',
    type: 'Biotic',
};

const plasmaScoring: Technology = {
    name: 'Plasma Scoring',
    type: 'Warfare',
};

const aiDevelopmentAlgorithm: Technology = {
    name: 'AI Development Algorithm',
    type: 'Warfare',
};

const selfAssemblyRoutines: Technology = {
    name: 'Self Assembly Routines',
    type: 'Warfare',
};

const magenDefenseGrid: Technology = {
    name: 'Magen Defense Grid',
    type: 'Warfare',
};

const antimassDeflectors: Technology = {
    name: 'Antimass Deflectors',
    type: 'Propulsion',
};

const darkEnergyTap: Technology = {
    name: 'Dark Energy Tap',
    type: 'Propulsion',
};

const gravityDrive: Technology = {
    name: 'Gravity Drive',
    type: 'Propulsion',
};

const slingRelay: Technology = {
    name: 'Sling Relay',
    type: 'Propulsion',
};

const technologies: Technology[] = [
    neuralMotivator,
    psychoArchaeology,
    daxciveAnimators,
    bioStims,
    {
        name: 'Hyper Metabolism',
        type: 'Biotic',
    },
    {
        name: 'X-89 Bacterial Weapon',
        type: 'Biotic',
    },
    {
        name: 'Bioplasmosis',
        type: 'Biotic',
        faction: 'The Arborec',
    },
    {
        name: 'Production Biomes',
        type: 'Biotic',
        faction: 'The Emirates of Hacan',
    },
    {
        name: 'Neuroglaive',
        type: 'Biotic',
        faction: 'The Naalu Collective',
    },
    {
        name: 'Instinct Training',
        type: 'Biotic',
        faction: 'The Xxcha Kingdom',
    },
    {
        name: 'Yin Spinner',
        type: 'Biotic',
        faction: 'The Yin Brotherhood',
    },
    {
        name: 'Transparasteel Plating',
        type: 'Biotic',
        faction: 'The Yssaril Tribes',
    },
    {
        name: 'Mageon Implants',
        type: 'Biotic',
        faction: 'The Yssaril Tribes',
    },
    {
        name: 'Voidwatch',
        type: 'Biotic',
        faction: 'The Empyrean',
    },
    {
        name: 'Genetic Recombination',
        type: 'Biotic',
        faction: 'The Mahact Gene-Sorcerers',
    },
    {
        name: 'Pre-Fab Arcologies',
        type: 'Biotic',
        faction: 'The Naaz-Rokha Alliance',
    },
    sarweenTools,
    scanlinkDroneNetwork,
    gravitonLaserSystem,
    predictiveIntelligence,
    {
        name: 'Transit Diodes',
        type: 'Cybernetic',
    },
    {
        name: 'Integrated Economy',
        type: 'Cybernetic',
    },
    {
        name: 'Temporal Command Suite',
        type: 'Cybernetic',
        faction: 'The Nomad',
    },
    {
        name: 'Aerie Hololattice',
        type: 'Cybernetic',
        faction: 'The Argent Flight',
    },
    {
        name: 'L4 Disruptors',
        type: 'Cybernetic',
        faction: 'The Barony of Letnev',
    },
    {
        name: 'I.I.H.Q Modernization',
        type: 'Cybernetic',
        faction: 'The Council Keleres',
    },
    {
        name: 'Agency Supply Network',
        type: 'Cybernetic',
        faction: 'The Council Keleres',
    },
    {
        name: 'Quantum Datahub Node',
        type: 'Cybernetic',
        faction: 'The Emirates of Hacan',
    },
    {
        name: 'Inheritance Systems',
        type: 'Cybernetic',
        faction: 'The L1Z1X Mindnet',
    },
    {
        name: 'Salvage Operations',
        type: 'Cybernetic',
        faction: 'The Mentak Coalition',
    },
    {
        name: 'Mirror Computing',
        type: 'Cybernetic',
        faction: 'The Mentak Coalition',
    },
    {
        name: 'E-Res Siphons',
        type: 'Cybernetic',
        faction: 'The Universities of Jol-Nar',
    },
    {
        name: 'Hegemonic Trade Policy',
        type: 'Cybernetic',
        faction: 'The Winnu',
    },
    {
        name: 'Nullification Field',
        type: 'Cybernetic',
        faction: 'The Xxcha Kingdom',
    },
    {
        name: 'Impulse Core',
        type: 'Cybernetic',
        faction: 'The Yin Brotherhood',
    },
    antimassDeflectors,
    darkEnergyTap,
    gravityDrive,
    slingRelay,
    {
        name: 'Fleet Logistics',
        type: 'Propulsion',
    },
    {
        name: 'Light/Wave Deflector',
        type: 'Propulsion',
    },
    {
        name: 'Chaos Mapping',
        type: 'Propulsion',
        faction: 'The Clan of Saar',
    },
    {
        name: 'Wormhole Generator',
        type: 'Propulsion',
        faction: 'The Ghosts of Creuss',
    },
    {
        name: 'Spacial Conduit Cylinder',
        type: 'Propulsion',
        faction: 'The Universities of Jol-Nar',
    },
    {
        name: 'Lazax Gate Folding',
        type: 'Propulsion',
        faction: 'The Winnu',
    },
    {
        name: 'Aetherstream',
        type: 'Propulsion',
        faction: 'The Empyrean',
    },
    plasmaScoring,
    aiDevelopmentAlgorithm,
    magenDefenseGrid,
    selfAssemblyRoutines,
    {
        name: 'Duranium Armor',
        type: 'Warfare',
    },
    {
        name: 'Assault Cannon',
        type: 'Warfare',
    },
    {
        name: 'Non-Euclidean Shielding',
        type: 'Warfare',
        faction: 'The Barony of Letnev',
    },
    {
        name: 'Magmus Reactor',
        type: 'Warfare',
        faction: 'The Embers of Muaat',
    },
    {
        name: 'Dimensional Splicer',
        type: 'Warfare',
        faction: 'The Ghosts of Creuss',
    },
    {
        name: 'Valkyrie Particle Weave',
        type: 'Warfare',
        faction: 'Sardakk N’orr',
    },
    {
        name: 'Supercharge',
        type: 'Warfare',
        faction: 'The Naaz-Rokha Alliance',
    },
    {
        name: 'Vortex',
        type: 'Warfare',
        faction: "The Vuil'Raith Cabal",
    },
    {
        name: 'Carrier II',
        type: 'Unit',
    },
    {
        name: 'Advanced Carrier II',
        type: 'Unit',
        faction: 'The Federation of Sol',
    },
    {
        name: 'Cruiser II',
        type: 'Unit',
    },
    {
        name: 'Saturn Engine II',
        type: 'Unit',
        faction: 'The Titans of Ul',
    },
    {
        name: 'Destroyer II',
        type: 'Unit',
    },
    {
        name: 'Strike Wing Alpha II',
        type: 'Unit',
        faction: 'The Argent Flight',
    },
    {
        name: 'Dreadnought II',
        type: 'Unit',
    },
    {
        name: 'Super-Dreadnought II',
        type: 'Unit',
        faction: 'The L1Z1X Mindnet',
    },
    {
        name: 'Exotrireme II',
        type: 'Unit',
        faction: 'Sardakk N’orr',
    },
    {
        name: 'Fighter II',
        type: 'Unit',
    },
    {
        name: 'Hybrid Crystal Fighter II',
        type: 'Unit',
        faction: 'The Naalu Collective',
    },
    {
        name: 'Infantry II',
        type: 'Unit',
    },
    {
        name: 'Spec Ops II',
        type: 'Unit',
        faction: 'The Federation of Sol',
    },
    {
        name: 'Letani Warrior II',
        type: 'Unit',
        faction: 'The Arborec',
    },
    {
        name: 'Crimson Legionnaire II',
        type: 'Unit',
        faction: 'The Mahact Gene-Sorcerers',
    },
    {
        name: 'PDS II',
        type: 'Unit',
    },
    {
        name: 'Hel Titan II',
        type: 'Unit',
        faction: 'The Titans of Ul',
    },
    {
        name: 'Space Dock II',
        type: 'Unit',
    },
    {
        name: 'Floating Factory II',
        type: 'Unit',
        faction: 'The Clan of Saar',
    },
    {
        name: 'Dimensional Tear II',
        type: 'Unit',
        faction: "The Vuil'Raith Cabal",
    },
    {
        name: 'War Sun',
        type: 'Unit',
    },
    {
        name: 'Prototype War Sun II',
        type: 'Unit',
        faction: 'The Embers of Muaat',
    },
    {
        name: 'Memoria II',
        type: 'Unit',
        faction: 'The Nomad',
    },
];

const hexColorForTechnologyType = (t: TechnologyType): string => {
    switch (t) {
        case 'Biotic':
            return '#00a958';
        case 'Propulsion':
            return '#00b0dd';
        case 'Cybernetic':
            return '#f3e736';
        case 'Warfare':
            return '#ff606f';
        case 'Unit':
            return 'white';
    }
};

export {
    aiDevelopmentAlgorithm,
    antimassDeflectors,
    bioStims,
    darkEnergyTap,
    daxciveAnimators,
    gravitonLaserSystem,
    gravityDrive,
    hexColorForTechnologyType,
    magenDefenseGrid,
    neuralMotivator,
    plasmaScoring,
    predictiveIntelligence,
    psychoArchaeology,
    sarweenTools,
    scanlinkDroneNetwork,
    selfAssemblyRoutines,
    slingRelay,
    technologies,
    Technology,
};
