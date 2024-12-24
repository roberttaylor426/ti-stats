import React, { useState } from 'react';
import _ from 'underscore';

import {
    Event,
    playerSelectedStrategyCardEventFromLastStrategyPhase,
} from '../events';
import { Faction } from '../factions';
import { initiative, StrategyCard, strategyCards } from '../strategyCards';
import { AdminPageProps } from './adminPageProps';
import { Button } from './components/button';
import { PageTitle } from './components/pageTitle';
import { Select } from './components/select';

type Props = {
    activePlayer: Faction;
};

const StrategyCardSelectionPage: React.FC<Props & AdminPageProps> = (props) => {
    const { activePlayer, events, publishNewEvents } = props;
    const [selectedStrategyCard, setSelectedStrategyCard] =
        useState<StrategyCard>();
    const playerSelectedStrategyCardEvents =
        playerSelectedStrategyCardEventFromLastStrategyPhase(events);

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
            <Select
                onChange={(e) =>
                    setSelectedStrategyCard(
                        e.currentTarget.value as StrategyCard
                    )
                }
            >
                <option value={''}>--Strategy card--</option>
                {_.sortBy(
                    strategyCards.filter(
                        (sc) =>
                            !playerSelectedStrategyCardEvents.find(
                                (sce) => sce.strategyCard === sc
                            )
                    ),
                    initiative
                ).map((sc) => (
                    <option key={sc} value={sc}>
                        {sc}
                    </option>
                ))}
            </Select>
            <Button
                onClick={async () => {
                    if (selectedStrategyCard) {
                        await publishPlayerSelectedStrategyCardEvent(
                            activePlayer,
                            selectedStrategyCard
                        );
                    }
                }}
            >
                Select
            </Button>
        </>
    );
};

export { StrategyCardSelectionPage };
