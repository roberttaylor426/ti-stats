import React, { useState } from 'react';
import _ from 'underscore';

import {
    Event,
    factionsInGame,
    isPlayersAssignedFactionsAndColorsEvent,
} from '../events';
import { Faction } from '../factions';
import { AdminPageProps } from './adminPageProps';
import { Button, PageTitle, Select } from './components';

type Props = {
    currentRoundNumber: number;
};

const PlayerOrderSelectionPage: React.FC<Props & AdminPageProps> = (props) => {
    const { currentRoundNumber, events, publishNewEvents } = props;
    const [playerOrder, setPlayerOrder] = useState<Faction[]>([]);

    const publishActionPhaseStartedEvent = async () => {
        if (
            _.uniq(playerOrder).length ===
            events.filter(isPlayersAssignedFactionsAndColorsEvent).length
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
            {factionsInGame(events).map((_, index) => (
                <Select
                    key={index}
                    onChange={(e) =>
                        setPlayerOrder(
                            Object.assign([], playerOrder, {
                                [index]: e.target.value as Faction,
                            })
                        )
                    }
                >
                    <option value={''}>--Faction--</option>
                    {factionsInGame(events)
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
