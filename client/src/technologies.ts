import aiDevelopmentAlgorithmImage from './assets/techCards/AIDevelopmentAlgorithm.webp';
import antimassDeflectorsImage from './assets/techCards/AntimassDeflectors.webp';
import bioStimsImage from './assets/techCards/BioStims.webp';
import daxciveAnimatorsImage from './assets/techCards/DacxiveAnimators.webp';
import darkEnergyTapImage from './assets/techCards/DarkEnergyTap.webp';
import fleetLogisticsImage from './assets/techCards/FleetLogistics.webp';
import gravitonLaserSystemImage from './assets/techCards/GravitonLaserSystem.webp';
import gravityDriveImage from './assets/techCards/GravityDrive.webp';
import magenDefenseGridImage from './assets/techCards/MagenDefenseGridOmega.webp';
import neuralMotivatorImage from './assets/techCards/NeuralMotivator.webp';
import plasmaScoringImage from './assets/techCards/PlasmaScoring.webp';
import predictiveIntelligenceImage from './assets/techCards/PredictiveIntelligence.webp';
import psychoArchaeologyImage from './assets/techCards/Psychoarchaeology.webp';
import sarweenToolsImage from './assets/techCards/SarweenTools.webp';
import scanlinkDroneNetworkImage from './assets/techCards/ScanlinkDroneNetwork.webp';
import selfAssemblyRoutinesImage from './assets/techCards/SelfAssemblyRoutines.webp';
import slingRelayImage from './assets/techCards/SlingRelay.webp';
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
    image: string;
    faction?: Faction;
};

const sarweenTools: Technology = {
    name: 'Sarween Tools',
    type: 'Cybernetic',
    image: sarweenToolsImage,
};

const predictiveIntelligence: Technology = {
    name: 'Predictive Intelligence',
    type: 'Cybernetic',
    image: predictiveIntelligenceImage,
};

const gravitonLaserSystem: Technology = {
    name: 'Graviton Laser System',
    type: 'Cybernetic',
    image: gravitonLaserSystemImage,
};

const scanlinkDroneNetwork: Technology = {
    name: 'Scanlink Drone Network',
    type: 'Cybernetic',
    image: scanlinkDroneNetworkImage,
};

const neuralMotivator: Technology = {
    name: 'Neural Motivator',
    type: 'Biotic',
    image: neuralMotivatorImage,
};

const psychoArchaeology: Technology = {
    name: 'Psychoarchaeology',
    type: 'Biotic',
    image: psychoArchaeologyImage,
};

const daxciveAnimators: Technology = {
    name: 'Daxcive Animators',
    type: 'Biotic',
    image: daxciveAnimatorsImage,
};

const bioStims: Technology = {
    name: 'Bio Stims',
    type: 'Biotic',
    image: bioStimsImage,
};

const plasmaScoring: Technology = {
    name: 'Plasma Scoring',
    type: 'Warfare',
    image: plasmaScoringImage,
};

const aiDevelopmentAlgorithm: Technology = {
    name: 'AI Development Algorithm',
    type: 'Warfare',
    image: aiDevelopmentAlgorithmImage,
};

const selfAssemblyRoutines: Technology = {
    name: 'Self Assembly Routines',
    type: 'Warfare',
    image: selfAssemblyRoutinesImage,
};

const magenDefenseGrid: Technology = {
    name: 'Magen Defense Grid',
    type: 'Warfare',
    image: magenDefenseGridImage,
};

const antimassDeflectors: Technology = {
    name: 'Antimass Deflectors',
    type: 'Propulsion',
    image: antimassDeflectorsImage,
};

const darkEnergyTap: Technology = {
    name: 'Dark Energy Tap',
    type: 'Propulsion',
    image: darkEnergyTapImage,
};

const gravityDrive: Technology = {
    name: 'Gravity Drive',
    type: 'Propulsion',
    image: gravityDriveImage,
};

const slingRelay: Technology = {
    name: 'Sling Relay',
    type: 'Propulsion',
    image: slingRelayImage,
};

const technologies: Technology[] = [
    neuralMotivator,
    psychoArchaeology,
    daxciveAnimators,
    bioStims,
    {
        name: 'Hyper Metabolism',
        type: 'Biotic',
        image: plasmaScoringImage,
    },
    {
        name: 'X-89 Bacterial Weapon',
        type: 'Biotic',
        image: plasmaScoringImage,
    },
    {
        name: 'Bioplasmosis',
        type: 'Biotic',
        faction: 'The Arborec',
        image: plasmaScoringImage,
    },
    {
        name: 'Production Biomes',
        type: 'Biotic',
        faction: 'The Emirates of Hacan',
        image: plasmaScoringImage,
    },
    {
        name: 'Neuroglaive',
        type: 'Biotic',
        faction: 'The Naalu Collective',
        image: plasmaScoringImage,
    },
    {
        name: 'Instinct Training',
        type: 'Biotic',
        faction: 'The Xxcha Kingdom',
        image: plasmaScoringImage,
    },
    {
        name: 'Yin Spinner',
        type: 'Biotic',
        faction: 'The Yin Brotherhood',
        image: plasmaScoringImage,
    },
    {
        name: 'Transparasteel Plating',
        type: 'Biotic',
        faction: 'The Yssaril Tribes',
        image: plasmaScoringImage,
    },
    {
        name: 'Mageon Implants',
        type: 'Biotic',
        faction: 'The Yssaril Tribes',
        image: plasmaScoringImage,
    },
    {
        name: 'Voidwatch',
        type: 'Biotic',
        faction: 'The Empyrean',
        image: plasmaScoringImage,
    },
    {
        name: 'Genetic Recombination',
        type: 'Biotic',
        faction: 'The Mahact Gene-Sorcerers',
        image: plasmaScoringImage,
    },
    {
        name: 'Pre-Fab Arcologies',
        type: 'Biotic',
        faction: 'The Naaz-Rokha Alliance',
        image: plasmaScoringImage,
    },
    sarweenTools,
    scanlinkDroneNetwork,
    gravitonLaserSystem,
    predictiveIntelligence,
    {
        name: 'Transit Diodes',
        type: 'Cybernetic',
        image: plasmaScoringImage,
    },
    {
        name: 'Integrated Economy',
        type: 'Cybernetic',
        image: plasmaScoringImage,
    },
    {
        name: 'Temporal Command Suite',
        type: 'Cybernetic',
        faction: 'The Nomad',
        image: plasmaScoringImage,
    },
    {
        name: 'Aerie Hololattice',
        type: 'Cybernetic',
        faction: 'The Argent Flight',
        image: plasmaScoringImage,
    },
    {
        name: 'L4 Disruptors',
        type: 'Cybernetic',
        faction: 'The Barony of Letnev',
        image: plasmaScoringImage,
    },
    {
        name: 'I.I.H.Q Modernization',
        type: 'Cybernetic',
        faction: 'The Council Keleres',
        image: plasmaScoringImage,
    },
    {
        name: 'Agency Supply Network',
        type: 'Cybernetic',
        faction: 'The Council Keleres',
        image: plasmaScoringImage,
    },
    {
        name: 'Quantum Datahub Node',
        type: 'Cybernetic',
        faction: 'The Emirates of Hacan',
        image: plasmaScoringImage,
    },
    {
        name: 'Inheritance Systems',
        type: 'Cybernetic',
        faction: 'The L1Z1X Mindnet',
        image: plasmaScoringImage,
    },
    {
        name: 'Salvage Operations',
        type: 'Cybernetic',
        faction: 'The Mentak Coalition',
        image: plasmaScoringImage,
    },
    {
        name: 'Mirror Computing',
        type: 'Cybernetic',
        faction: 'The Mentak Coalition',
        image: plasmaScoringImage,
    },
    {
        name: 'E-Res Siphons',
        type: 'Cybernetic',
        faction: 'The Universities of Jol-Nar',
        image: plasmaScoringImage,
    },
    {
        name: 'Hegemonic Trade Policy',
        type: 'Cybernetic',
        faction: 'The Winnu',
        image: plasmaScoringImage,
    },
    {
        name: 'Nullification Field',
        type: 'Cybernetic',
        faction: 'The Xxcha Kingdom',
        image: plasmaScoringImage,
    },
    {
        name: 'Impulse Core',
        type: 'Cybernetic',
        faction: 'The Yin Brotherhood',
        image: plasmaScoringImage,
    },
    antimassDeflectors,
    darkEnergyTap,
    gravityDrive,
    slingRelay,
    {
        name: 'Fleet Logistics',
        type: 'Propulsion',
        image: fleetLogisticsImage,
    },
    {
        name: 'Light/Wave Deflector',
        type: 'Propulsion',
        image: plasmaScoringImage,
    },
    {
        name: 'Chaos Mapping',
        type: 'Propulsion',
        faction: 'The Clan of Saar',
        image: plasmaScoringImage,
    },
    {
        name: 'Wormhole Generator',
        type: 'Propulsion',
        faction: 'The Ghosts of Creuss',
        image: plasmaScoringImage,
    },
    {
        name: 'Spacial Conduit Cylinder',
        type: 'Propulsion',
        faction: 'The Universities of Jol-Nar',
        image: plasmaScoringImage,
    },
    {
        name: 'Lazax Gate Folding',
        type: 'Propulsion',
        faction: 'The Winnu',
        image: plasmaScoringImage,
    },
    {
        name: 'Aetherstream',
        type: 'Propulsion',
        faction: 'The Empyrean',
        image: plasmaScoringImage,
    },
    plasmaScoring,
    aiDevelopmentAlgorithm,
    magenDefenseGrid,
    selfAssemblyRoutines,
    {
        name: 'Duranium Armor',
        type: 'Warfare',
        image: plasmaScoringImage,
    },
    {
        name: 'Assault Cannon',
        type: 'Warfare',
        image: plasmaScoringImage,
    },
    {
        name: 'Non-Euclidean Shielding',
        type: 'Warfare',
        faction: 'The Barony of Letnev',
        image: plasmaScoringImage,
    },
    {
        name: 'Magmus Reactor',
        type: 'Warfare',
        faction: 'The Embers of Muaat',
        image: plasmaScoringImage,
    },
    {
        name: 'Dimensional Splicer',
        type: 'Warfare',
        faction: 'The Ghosts of Creuss',
        image: plasmaScoringImage,
    },
    {
        name: 'Valkyrie Particle Weave',
        type: 'Warfare',
        faction: 'Sardakk N’orr',
        image: plasmaScoringImage,
    },
    {
        name: 'Supercharge',
        type: 'Warfare',
        faction: 'The Naaz-Rokha Alliance',
        image: plasmaScoringImage,
    },
    {
        name: 'Vortex',
        type: 'Warfare',
        faction: "The Vuil'Raith Cabal",
        image: plasmaScoringImage,
    },
    {
        name: 'Carrier II',
        type: 'Unit',
        image: plasmaScoringImage,
    },
    {
        name: 'Advanced Carrier II',
        type: 'Unit',
        faction: 'The Federation of Sol',
        image: plasmaScoringImage,
    },
    {
        name: 'Cruiser II',
        type: 'Unit',
        image: plasmaScoringImage,
    },
    {
        name: 'Saturn Engine II',
        type: 'Unit',
        faction: 'The Titans of Ul',
        image: plasmaScoringImage,
    },
    {
        name: 'Destroyer II',
        type: 'Unit',
        image: plasmaScoringImage,
    },
    {
        name: 'Strike Wing Alpha II',
        type: 'Unit',
        faction: 'The Argent Flight',
        image: plasmaScoringImage,
    },
    {
        name: 'Dreadnought II',
        type: 'Unit',
        image: plasmaScoringImage,
    },
    {
        name: 'Super-Dreadnought II',
        type: 'Unit',
        faction: 'The L1Z1X Mindnet',
        image: plasmaScoringImage,
    },
    {
        name: 'Exotrireme II',
        type: 'Unit',
        faction: 'Sardakk N’orr',
        image: plasmaScoringImage,
    },
    {
        name: 'Fighter II',
        type: 'Unit',
        image: plasmaScoringImage,
    },
    {
        name: 'Hybrid Crystal Fighter II',
        type: 'Unit',
        faction: 'The Naalu Collective',
        image: plasmaScoringImage,
    },
    {
        name: 'Infantry II',
        type: 'Unit',
        image: plasmaScoringImage,
    },
    {
        name: 'Spec Ops II',
        type: 'Unit',
        faction: 'The Federation of Sol',
        image: plasmaScoringImage,
    },
    {
        name: 'Letani Warrior II',
        type: 'Unit',
        faction: 'The Arborec',
        image: plasmaScoringImage,
    },
    {
        name: 'Crimson Legionnaire II',
        type: 'Unit',
        faction: 'The Mahact Gene-Sorcerers',
        image: plasmaScoringImage,
    },
    {
        name: 'PDS II',
        type: 'Unit',
        image: plasmaScoringImage,
    },
    {
        name: 'Hel Titan II',
        type: 'Unit',
        faction: 'The Titans of Ul',
        image: plasmaScoringImage,
    },
    {
        name: 'Space Dock II',
        type: 'Unit',
        image: plasmaScoringImage,
    },
    {
        name: 'Floating Factory II',
        type: 'Unit',
        faction: 'The Clan of Saar',
        image: plasmaScoringImage,
    },
    {
        name: 'Dimensional Tear II',
        type: 'Unit',
        faction: "The Vuil'Raith Cabal",
        image: plasmaScoringImage,
    },
    {
        name: 'War Sun',
        type: 'Unit',
        image: plasmaScoringImage,
    },
    {
        name: 'Prototype War Sun II',
        type: 'Unit',
        faction: 'The Embers of Muaat',
        image: plasmaScoringImage,
    },
    {
        name: 'Memoria II',
        type: 'Unit',
        faction: 'The Nomad',
        image: plasmaScoringImage,
    },
    {
        name: 'Impressment Programs',
        type: 'Cybernetic',
        faction: 'The Dih-Mohn Flotilla',
        image: plasmaScoringImage,
    },
    {
        name: 'Aegis II',
        type: 'Unit',
        faction: 'The Dih-Mohn Flotilla',
        image: plasmaScoringImage,
    },
    {
        name: 'Contractual Obligations',
        type: 'Cybernetic',
        faction: "Roh'Dhna Mechatronics",
        image: plasmaScoringImage,
    },
    {
        name: 'Terrafactory II',
        type: 'Unit',
        faction: "Roh'Dhna Mechatronics",
        image: plasmaScoringImage,
    },
    {
        name: 'Zhrgar Stimulants',
        type: 'Biotic',
        faction: 'The Berserkers of Kjalengard',
        image: plasmaScoringImage,
    },
    {
        name: 'Star Dragon II',
        type: 'Unit',
        faction: 'The Berserkers of Kjalengard',
        image: plasmaScoringImage,
    },
    {
        name: 'Daedalon Flight System',
        type: 'Cybernetic',
        faction: 'The Tnelis Syndicate',
        image: plasmaScoringImage,
    },
    {
        name: 'Blockade Runner II',
        type: 'Unit',
        faction: 'The Tnelis Syndicate',
        image: plasmaScoringImage,
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
