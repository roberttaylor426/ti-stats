import React, { useState } from 'react';
import _ from 'underscore';

import { Event, isPlayerAssignedColorEvent } from '../events';
import { Faction } from '../factions';
import { AdminPageProps } from './adminPageProps';
import { Button, Select } from './components';

type Props = {
    currentRoundNumber: number;
    setCurrentRoundPlayerOrder: (fs: Faction[]) => void;
};

const PlayerOrderSelectionPage: React.FC<Props & AdminPageProps> = ({
    currentRoundNumber,
    setCurrentRoundPlayerOrder,
    events,
    publishNewEvents,
}) => {
    const [playerOrderByRound, setPlayerOrderByRound] = useState<
        Record<number, Faction[]>
    >({});

    const publishActionPhaseStartedEvent = async (roundNumber: number) => {
        if (
            _.uniq(playerOrderByRound[roundNumber]).length ===
            events.filter(isPlayerAssignedColorEvent).length
        ) {
            const newEvent: Event = {
                type: 'ActionPhaseStarted',
                time: new Date().getTime(),
            };

            if (await publishNewEvents([newEvent])) {
                setCurrentRoundPlayerOrder(playerOrderByRound[roundNumber]);
            }
        }
    };

    return (
        <>
            <span>{`Round ${currentRoundNumber} player order`}</span>
            {events.filter(isPlayerAssignedColorEvent).map((_, index) => (
                <Select
                    key={index}
                    onChange={(e) =>
                        setPlayerOrderByRound({
                            ...playerOrderByRound,
                            [currentRoundNumber]: Object.assign(
                                [],
                                playerOrderByRound[currentRoundNumber],
                                {
                                    [index]: e.target.value as Faction,
                                }
                            ),
                        })
                    }
                >
                    <option value={''}>--Faction--</option>
                    {events
                        .filter(isPlayerAssignedColorEvent)
                        .filter(
                            (e) =>
                                playerOrderByRound[currentRoundNumber]?.[
                                    index
                                ] === e.faction ||
                                !Object.values(
                                    playerOrderByRound[currentRoundNumber] || []
                                ).includes(e.faction)
                        )
                        .map((e) => (
                            <option key={e.faction} value={e.faction}>
                                {e.faction}
                            </option>
                        ))}
                </Select>
            ))}
            <Button
                onClick={() =>
                    publishActionPhaseStartedEvent(currentRoundNumber)
                }
            >
                Continue
            </Button>
        </>
    );
};

export { PlayerOrderSelectionPage };
