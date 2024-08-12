import React, { useState } from 'react';
import styled from 'styled-components';

import { Event } from '../events';
import { Faction, factions, homeworlds } from '../factions';
import { PlayerColor, playerColors } from '../playerColor';
import { range } from '../util';
import { AdminPageProps } from './adminPageProps';
import { Button, Select } from './components';

const FactionSelectionPage: React.FC<AdminPageProps> = ({
    publishNewEvents,
}) => {
    const [factions, setFactions] = useState<Record<number, Faction>>({});

    const [playerColors, setPlayerColors] = useState<
        Record<number, PlayerColor>
    >({});

    const publishPlayerColorAssignmentEvents = async () => {
        if (
            Object.keys(factions).length === 6 &&
            Object.keys(playerColors).length === 6
        ) {
            const newEvents: Event[] = [
                ...range(6).map(
                    (n) =>
                        ({
                            type: 'PlayerAssignedColor',
                            faction: factions[n + 1],
                            color: playerColors[n + 1],
                        }) as const
                ),
                ...Object.values(factions).flatMap((f) =>
                    homeworlds(f).map(
                        (p) =>
                            ({
                                type: 'PlanetControlled',
                                planet: p,
                                faction: f,
                            }) as const
                    )
                ),
            ];

            await publishNewEvents(newEvents);
        }
    };

    return (
        <>
            {range(6).map((n) => (
                <FactionSelectionRow
                    key={n}
                    onFactionSelected={(f) =>
                        setFactions({ ...factions, [n + 1]: f })
                    }
                    onPlayerColorSelected={(c) =>
                        setPlayerColors({ ...playerColors, [n + 1]: c })
                    }
                />
            ))}
            <Button onClick={publishPlayerColorAssignmentEvents}>
                Continue
            </Button>
        </>
    );
};

type FactionSelectionRowProps = {
    onFactionSelected: (f: Faction) => void;
    onPlayerColorSelected: (p: PlayerColor) => void;
};

const FactionSelectionRow: React.FC<FactionSelectionRowProps> = ({
    onFactionSelected,
    onPlayerColorSelected,
}) => (
    <StyledFactionSelectionRow>
        <Select
            name={'faction'}
            id={'faction'}
            onChange={(e) => {
                onFactionSelected(e.target.value as Faction);
            }}
        >
            <option value={''}>--Faction--</option>
            {factions.map((f) => (
                <option key={f} value={f}>
                    {f}
                </option>
            ))}
        </Select>
        <Select
            name={'color'}
            id={'color'}
            onChange={(e) => {
                onPlayerColorSelected(e.target.value as PlayerColor);
            }}
        >
            <option value={''}>--Color--</option>
            {playerColors.map((c) => (
                <option key={c} value={c}>
                    {c}
                </option>
            ))}
        </Select>
    </StyledFactionSelectionRow>
);

const StyledFactionSelectionRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    column-gap: 2rem;
    row-gap: 1rem;

    > * {
        flex: 1 1 0;
    }
`;

export { FactionSelectionPage };
