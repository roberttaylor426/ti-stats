import React, { useState } from 'react';
import styled from 'styled-components';

import { Event } from './events';
import { Faction, factions, homeworlds } from './factions';
import { PlayerColor, playerColors } from './playerColor';
import { SystemTileNumber, systemTiles } from './systemTiles';
import { range } from './util';

type AdminPageProps = {
    events: Event[];
    setEvents: (updatedEvents: Event[]) => void;
};

const AdminPage: React.FC<AdminPageProps> = ({ events, setEvents }) => {
    const [factions, setFactions] = useState<Record<number, Faction>>({});
    const [playerColors, setPlayerColors] = useState<
        Record<number, PlayerColor>
    >({});

    const [tileSelections, setTileSelections] = useState<
        Record<number, SystemTileNumber>
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

            const updatedEvents = [...events, ...newEvents];

            const response = await fetch('/api', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedEvents),
            });

            if (response.status === 200) {
                setEvents(updatedEvents);
            }
        }
    };

    const publishMapTileSelectionEvents = async () => {
        if (Object.keys(tileSelections).length === 37) {
            const newEvents: Event[] = [
                ...range(37).map(
                    (n) =>
                        ({
                            type: 'MapTileSelected',
                            systemTileNumber: tileSelections[n + 1],
                            position: n,
                        }) as const
                ),
            ];

            const updatedEvents = [...events, ...newEvents];

            const response = await fetch('/api', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedEvents),
            });

            if (response.status === 200) {
                setEvents(updatedEvents);
            }
        }
    };

    return (
        <StyledAdminPage>
            {events.length === 0 ? (
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
            ) : events.filter((e) => e.type === 'MapTileSelected').length <
              37 ? (
                <>
                    {range(37).map((n) => (
                        <MapTileSelectionRow key={n}>
                            <span>{n + 1}</span>
                            <Select
                                onChange={(e) =>
                                    setTileSelections({
                                        ...tileSelections,
                                        [n + 1]: Number.parseInt(
                                            e.target.value
                                        ) as SystemTileNumber,
                                    })
                                }
                            >
                                <option value={''}>--Tile--</option>
                                {systemTiles.map((st) => (
                                    <option
                                        key={st.tileNumber}
                                        value={st.tileNumber}
                                    >
                                        {st.tileNumber}
                                    </option>
                                ))}
                            </Select>
                        </MapTileSelectionRow>
                    ))}
                    <Button onClick={publishMapTileSelectionEvents}>
                        Continue
                    </Button>
                </>
            ) : (
                <h1>Harrow!</h1>
            )}
        </StyledAdminPage>
    );
};

const StyledAdminPage = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    font-size: 2.25rem;
`;

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

const MapTileSelectionRow = styled.div`
    display: flex;
    gap: 2rem;

    > :nth-child(2) {
        flex: 1 1 0;
    }
`;

const Select = styled.select`
    font-size: 2.25rem;
`;

const Button = styled.button`
    font-size: 2.25rem;
`;

export { AdminPage };
