import { AdminPageProps } from 'admin/adminPageProps';
import React, { useState } from 'react';

import {
    Event,
    factionsInGame,
    isPlayerScoredVictoryPointEvent,
} from '../../events';
import { Faction } from '../../factions';
import { NumberInput } from '../input';
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
    const [playerToScoreVps, setPlayerToScoreVps] = useState<Faction>();
    const [vpsToAdd, setVpsToAdd] = useState<number>(0);

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
        <InputsColumn>
            <Select
                onChange={(e) => setPlayerToScoreVps(e.target.value as Faction)}
                defaultValue={defaultFaction}
            >
                {!defaultFaction && <option value={''}>--Faction--</option>}
                {factionsInGame(events).map((f) => (
                    <option key={f} value={f}>
                        {`${f} (${events
                            .filter(isPlayerScoredVictoryPointEvent)
                            .filter((vpe) => vpe.faction === f)
                            .reduce((acc, n) => acc + n.delta, 0)}vp)`}
                    </option>
                ))}
            </Select>
            <InputsRow>
                <NumberInput
                    onChange={(e) =>
                        setVpsToAdd(Number.parseInt(e.target.value))
                    }
                />
                <Button
                    onClick={async () => {
                        if (playerToScoreVps && vpsToAdd) {
                            await publishVpScoredEvent(
                                playerToScoreVps,
                                vpsToAdd
                            );
                        }
                    }}
                >
                    Score
                </Button>
            </InputsRow>
        </InputsColumn>
    );
};

export { VpScoringContainer };
