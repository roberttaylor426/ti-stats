import constructionStrategyCard from './assets/strategyCards/construction.webp';
import constructionStrategyCardBack from './assets/strategyCards/construction-back.webp';
import diplomacyStrategyCard from './assets/strategyCards/diplomacy.webp';
import diplomacyStrategyCardBack from './assets/strategyCards/diplomacy-back.webp';
import imperialStrategyCard from './assets/strategyCards/imperial.webp';
import imperialStrategyCardBack from './assets/strategyCards/imperial-back.webp';
import leadershipStrategyCard from './assets/strategyCards/leadership.webp';
import leadershipStrategyCardBack from './assets/strategyCards/leadership-back.webp';
import politicsStrategyCard from './assets/strategyCards/politics.webp';
import politicsStrategyCardBack from './assets/strategyCards/politics-back.webp';
import technologyStrategyCard from './assets/strategyCards/technology.webp';
import technologyStrategyCardBack from './assets/strategyCards/technology-back.webp';
import tradeStrategyCard from './assets/strategyCards/trade.webp';
import tradeStrategyCardBack from './assets/strategyCards/trade-back.webp';
import warfareStrategyCard from './assets/strategyCards/warfare.webp';
import warfareStrategyCardBack from './assets/strategyCards/warfare-back.webp';

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

const strategyCardImage = (sc: StrategyCard, back?: true): string => {
    switch (sc) {
        case 'Leadership':
            return back ? leadershipStrategyCardBack : leadershipStrategyCard;
        case 'Diplomacy':
            return back ? diplomacyStrategyCardBack : diplomacyStrategyCard;
        case 'Politics':
            return back ? politicsStrategyCardBack : politicsStrategyCard;
        case 'Construction':
            return back
                ? constructionStrategyCardBack
                : constructionStrategyCard;
        case 'Trade':
            return back ? tradeStrategyCardBack : tradeStrategyCard;
        case 'Warfare':
            return back ? warfareStrategyCardBack : warfareStrategyCard;
        case 'Technology':
            return back ? technologyStrategyCardBack : technologyStrategyCard;
        case 'Imperial':
            return back ? imperialStrategyCardBack : imperialStrategyCard;
    }
};

export { initiative, StrategyCard, strategyCardImage, strategyCards };
