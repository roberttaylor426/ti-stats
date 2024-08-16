import React, { useState } from 'react';
import styled from 'styled-components';

import { Event } from '../events';
import { Faction, factions, homeworlds } from '../factions';
import { PlayerColor, playerColors } from '../playerColor';
import { range } from '../util';
import { AdminPageProps } from './adminPageProps';
import { Button, PageTitle, Select } from './components';

const FactionAssignmentPage: React.FC<AdminPageProps> = ({
    publishNewEvents,
}) => {
    const [selectedFactions, setSelectedFactions] = useState<
        Record<number, Faction>
    >({});

    const [selectedPlayerColors, setSelectedPlayerColors] = useState<
        Record<number, PlayerColor>
    >({});

    const publishPlayerFactionAndColorAssignmentEvents = async () => {
        if (
            Object.keys(selectedFactions).length === 6 &&
            Object.keys(selectedPlayerColors).length === 6
        ) {
            const newEvents: Event[] = [
                {
                    type: 'PlayersAssignedFactionsAndColors',
                    assignments: range(6).reduce(
                        (acc, n) => ({
                            ...acc,
                            [selectedFactions[n + 1]]:
                                selectedPlayerColors[n + 1],
                        }),
                        {} as Record<Faction, PlayerColor>
                    ),
                },
                ...Object.values(selectedFactions).flatMap((f) =>
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
            <PageTitle title={'Choose factions'} />
            {range(6).map((n) => (
                <FactionSelectionRow
                    key={n}
                    rowIndex={n}
                    selectedFactions={selectedFactions}
                    selectedPlayerColors={selectedPlayerColors}
                    onFactionSelected={(f) =>
                        setSelectedFactions({ ...selectedFactions, [n + 1]: f })
                    }
                    onPlayerColorSelected={(c) =>
                        setSelectedPlayerColors({
                            ...selectedPlayerColors,
                            [n + 1]: c,
                        })
                    }
                />
            ))}
            <Button onClick={publishPlayerFactionAndColorAssignmentEvents}>
                Continue
            </Button>
        </>
    );
};

type FactionSelectionRowProps = {
    rowIndex: number;
    selectedFactions: Record<number, Faction>;
    selectedPlayerColors: Record<number, PlayerColor>;
    onFactionSelected: (f: Faction) => void;
    onPlayerColorSelected: (p: PlayerColor) => void;
};

const FactionSelectionRow: React.FC<FactionSelectionRowProps> = ({
    rowIndex,
    selectedFactions,
    selectedPlayerColors,
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
            {factions
                .filter(
                    (f) =>
                        selectedFactions[rowIndex + 1] === f ||
                        !Object.values(selectedFactions).includes(f)
                )
                .map((f) => (
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
            {playerColors
                .filter(
                    (c) =>
                        selectedPlayerColors[rowIndex + 1] === c ||
                        !Object.values(selectedPlayerColors).includes(c)
                )
                .map((c) => (
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

export { FactionAssignmentPage };
