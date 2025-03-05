import React, { useState } from 'react';
import _ from 'underscore';

import {
    Event,
    factionsInGame,
    playerSelectedStrategyCardEventsFromStrategyPhaseThisRound,
} from '../events';
import { Faction } from '../factions';
import { initiative } from '../strategyCards';
import { AdminPageProps } from './adminPageProps';
import { Button } from './components/button';
import { PageTitle } from './components/pageTitle';
import { Select } from './components/select';

type Props = {
    currentRoundNumber: number;
};

const PlayerOrderSelectionPage: React.FC<Props & AdminPageProps> = (props) => {
    const { currentRoundNumber, events, publishNewEvents } = props;
    const factionsInInitiativeOrder = _.sortBy(
        playerSelectedStrategyCardEventsFromStrategyPhaseThisRound(events),
        (e) =>
            e.faction === 'The Naalu Collective'
                ? 0
                : initiative(e.strategyCard)
    ).map((e) => e.faction);
    const [playerOrder, setPlayerOrder] = useState<Faction[]>(
        factionsInInitiativeOrder
    );

    const publishActionPhaseStartedEvent = async () => {
        if (
            _.uniq(playerOrder).length === factionsInGame(props.events).length
        ) {
            const newEvent: Event = {
                type: 'ActionPhaseStarted',
                time: new Date().getTime(),
                playerOrder,
            };

            await publishNewEvents([newEvent]);
        }
    };

    return (
        <>
            <PageTitle
                {...props}
                title={`Round ${currentRoundNumber} player order`}
            />
            {factionsInGame(events).map((_f, index) => (
                <Select
                    key={index}
                    defaultValue={factionsInInitiativeOrder[index]}
                    onChange={(e) =>
                        setPlayerOrder(
                            Object.assign([], playerOrder, {
                                [index]: e.target.value as Faction,
                            })
                        )
                    }
                >
                    <option value={''}>--Faction--</option>
                    {_.sortBy(factionsInGame(events))
                        .filter(
                            (f) =>
                                playerOrder[index] === f ||
                                !Object.values(playerOrder).includes(f)
                        )
                        .map((f) => (
                            <option key={f} value={f}>
                                {f}
                            </option>
                        ))}
                </Select>
            ))}
            <Button onClick={publishActionPhaseStartedEvent}>Continue</Button>
        </>
    );
};

export { PlayerOrderSelectionPage };
