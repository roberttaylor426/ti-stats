const strategyCards = [
    'Leadership',
    'Diplomacy',
    'Politics',
    'Construction',
    'Trade',
    'Warfare',
    'Technology',
    'Imperial',
] as const;

type StrategyCard = (typeof strategyCards)[number];

const initiative = (sc: StrategyCard): number => {
    switch (sc) {
        case 'Leadership':
            return 1;
        case 'Diplomacy':
            return 2;
        case 'Politics':
            return 3;
        case 'Construction':
            return 4;
        case 'Trade':
            return 5;
        case 'Warfare':
            return 6;
        case 'Technology':
            return 7;
        case 'Imperial':
            return 8;
    }
};

export { initiative,StrategyCard, strategyCards };
