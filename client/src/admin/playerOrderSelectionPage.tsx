import React, { useState } from 'react';
import _ from 'underscore';

import { Event, isPlayerAssignedColorEvent } from '../events';
import { Faction } from '../factions';
import { AdminPageProps } from './adminPageProps';
import { Button, PageTitle, Select } from './components';

type Props = {
    currentRoundNumber: number;
};

const PlayerOrderSelectionPage: React.FC<Props & AdminPageProps> = ({
    currentRoundNumber,
    events,
    publishNewEvents,
}) => {
    const [playerOrder, setPlayerOrder] = useState<Faction[]>([]);

    const publishActionPhaseStartedEvent = async () => {
        if (
            _.uniq(playerOrder).length ===
            events.filter(isPlayerAssignedColorEvent).length
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
            <PageTitle title={`Round ${currentRoundNumber} player order`} />
            {events.filter(isPlayerAssignedColorEvent).map((_, index) => (
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
                    {events
                        .filter(isPlayerAssignedColorEvent)
                        .filter(
                            (e) =>
                                playerOrder[index] === e.faction ||
                                !Object.values(playerOrder).includes(e.faction)
                        )
                        .map((e) => (
                            <option key={e.faction} value={e.faction}>
                                {e.faction}
                            </option>
                        ))}
                </Select>
            ))}
            <Button onClick={publishActionPhaseStartedEvent}>Continue</Button>
        </>
    );
};

export { PlayerOrderSelectionPage };
