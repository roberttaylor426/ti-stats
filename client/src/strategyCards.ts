import constructionStrategyCard from './assets/strategyCards/construction.webp';
import constructionStrategyCardBack from './assets/strategyCards/construction-back.webp';
import constructionStrategyCardCompact from './assets/strategyCards/construction-compact.webp';
import diplomacyStrategyCard from './assets/strategyCards/diplomacy.webp';
import diplomacyStrategyCardBack from './assets/strategyCards/diplomacy-back.webp';
import diplomacyStrategyCardCompact from './assets/strategyCards/diplomacy-compact.webp';
import imperialStrategyCard from './assets/strategyCards/imperial.webp';
import imperialStrategyCardBack from './assets/strategyCards/imperial-back.webp';
import imperialStrategyCardCompact from './assets/strategyCards/imperial-compact.webp';
import leadershipStrategyCard from './assets/strategyCards/leadership.webp';
import leadershipStrategyCardBack from './assets/strategyCards/leadership-back.webp';
import leadershipStrategyCardCompact from './assets/strategyCards/leadership-compact.webp';
import politicsStrategyCard from './assets/strategyCards/politics.webp';
import politicsStrategyCardBack from './assets/strategyCards/politics-back.webp';
import politicsStrategyCardCompact from './assets/strategyCards/politics-compact.webp';
import technologyStrategyCard from './assets/strategyCards/technology.webp';
import technologyStrategyCardBack from './assets/strategyCards/technology-back.webp';
import technologyStrategyCardCompact from './assets/strategyCards/technology-compact.webp';
import tradeStrategyCard from './assets/strategyCards/trade.webp';
import tradeStrategyCardBack from './assets/strategyCards/trade-back.webp';
import tradeStrategyCardCompact from './assets/strategyCards/trade-compact.webp';
import warfareStrategyCard from './assets/strategyCards/warfare.webp';
import warfareStrategyCardBack from './assets/strategyCards/warfare-back.webp';
import warfareStrategyCardCompact from './assets/strategyCards/warfare-compact.webp';

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

const strategyCardImage = (sc: StrategyCard, showBack: boolean): string => {
    switch (sc) {
        case 'Leadership':
            return showBack
                ? leadershipStrategyCardBack
                : leadershipStrategyCard;
        case 'Diplomacy':
            return showBack ? diplomacyStrategyCardBack : diplomacyStrategyCard;
        case 'Politics':
            return showBack ? politicsStrategyCardBack : politicsStrategyCard;
        case 'Construction':
            return showBack
                ? constructionStrategyCardBack
                : constructionStrategyCard;
        case 'Trade':
            return showBack ? tradeStrategyCardBack : tradeStrategyCard;
        case 'Warfare':
            return showBack ? warfareStrategyCardBack : warfareStrategyCard;
        case 'Technology':
            return showBack
                ? technologyStrategyCardBack
                : technologyStrategyCard;
        case 'Imperial':
            return showBack ? imperialStrategyCardBack : imperialStrategyCard;
    }
};

const compactStrategyCardImage = (sc: StrategyCard): string => {
    switch (sc) {
        case 'Leadership':
            return leadershipStrategyCardCompact;
        case 'Diplomacy':
            return diplomacyStrategyCardCompact;
        case 'Politics':
            return politicsStrategyCardCompact;
        case 'Construction':
            return constructionStrategyCardCompact;
        case 'Trade':
            return tradeStrategyCardCompact;
        case 'Warfare':
            return warfareStrategyCardCompact;
        case 'Technology':
            return technologyStrategyCardCompact;
        case 'Imperial':
            return imperialStrategyCardCompact;
    }
};

export {
    compactStrategyCardImage,
    initiative,
    StrategyCard,
    strategyCardImage,
    strategyCards,
};
