import React from 'react';
import _ from 'underscore';

import {
    Event,
    playerSelectedStrategyCardEventsFromStrategyPhaseThisRound,
} from '../events';
import { Faction } from '../factions';
import { initiative, StrategyCard, strategyCards } from '../strategyCards';
import { AdminPageProps } from './adminPageProps';
import { Button } from './components/button';
import { PageTitle } from './components/pageTitle';

type Props = {
    activePlayer: Faction;
};

const StrategyCardSelectionPage: React.FC<Props & AdminPageProps> = (props) => {
    const { activePlayer, events, publishNewEvents } = props;
    const playerSelectedStrategyCardEvents =
        playerSelectedStrategyCardEventsFromStrategyPhaseThisRound(events);

    const publishPlayerSelectedStrategyCardEvent = async (
        f: Faction,
        sc: StrategyCard
    ) => {
        const newEvent: Event = {
            type: 'PlayerSelectedStrategyCard',
            time: new Date().getTime(),
            faction: f,
            strategyCard: sc,
        };

        await publishNewEvents([newEvent]);
    };

    return (
        <>
            <PageTitle {...props} title={`${activePlayer} strategy card`} />
            {_.sortBy(
                strategyCards.filter(
                    (sc) =>
                        !playerSelectedStrategyCardEvents.find(
                            (sce) => sce.strategyCard === sc
                        )
                ),
                initiative
            ).map((sc) => (
                <Button
                    key={sc}
                    onClick={async () => {
                        await publishPlayerSelectedStrategyCardEvent(
                            activePlayer,
                            sc
                        );
                    }}
                >
                    {sc}
                </Button>
            ))}
        </>
    );
};

export { StrategyCardSelectionPage };
