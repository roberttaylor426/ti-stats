import { AdminPageProps } from 'admin/adminPageProps';
import React, { useEffect, useState } from 'react';

import {
    Event,
    initiativeOrderWhenMostRecentActionPhaseStarted,
    isPlayerScoredVictoryPointEvent,
    PlayerScoredVictoryPointEvent,
} from '../../events';
import { Faction } from '../../factions';
import { Button } from './button';
import { InputsColumn } from './inputsColumn';
import { InputsRow } from './inputsRow';
import { Select } from './select';

type Props = {
    defaultFaction?: Faction;
};

const VpScoringContainer: React.FC<Props & AdminPageProps> = ({
    defaultFaction,
    events,
    publishNewEvents,
}) => {
    const [playerToScoreVps, setPlayerToScoreVps] = useState<
        Faction | undefined
    >();

    const initiativeOrder =
        initiativeOrderWhenMostRecentActionPhaseStarted(events);

    const initialSelection = defaultFaction || initiativeOrder[0];

    useEffect(() => {
        setPlayerToScoreVps(initialSelection);
    }, [initialSelection]);

    const publishVpScoredEvent = async (
        f: Faction,
        delta: number
    ): Promise<boolean> => {
        const newEvent: Event = {
            type: 'PlayerScoredVictoryPoint',
            time: new Date().getTime(),
            faction: f,
            delta,
        };

        return await publishNewEvents([newEvent]);
    };

    return (
        <InputsColumn key={defaultFaction}>
            <Select
                onChange={(e) => setPlayerToScoreVps(e.target.value as Faction)}
                defaultValue={initialSelection}
            >
                {initiativeOrderWhenMostRecentActionPhaseStarted(events).map(
                    (f) => (
                        <option key={f} value={f}>
                            {`${events
                                .filter(isPlayerScoredVictoryPointEvent)
                                .filter((vpe) => vpe.faction === f)
                                .reduce(
                                    (acc, n) => acc + n.delta,
                                    0
                                )}vp - ${f}`}
                        </option>
                    )
                )}
            </Select>
            <InputsRow>
                {[-1, 1, 2, 3].map((n) => (
                    <Button
                        key={n}
                        onClick={async () => {
                            if (playerToScoreVps) {
                                await publishVpScoredEvent(playerToScoreVps, n);
                            }
                        }}
                    >
                        {n < 0 ? `${n}` : `+${n}`}
                    </Button>
                ))}
            </InputsRow>
        </InputsColumn>
    );
};

const playerScoredVictoryPointEvent = (
    f: Faction,
    delta: number
): PlayerScoredVictoryPointEvent => ({
    type: 'PlayerScoredVictoryPoint',
    time: new Date().getTime(),
    faction: f,
    delta,
});

export { playerScoredVictoryPointEvent, VpScoringContainer };
