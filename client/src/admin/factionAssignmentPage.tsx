import React, { useState } from 'react';
import styled from 'styled-components';

import { Event } from '../events';
import {
    Faction,
    factions,
    FactionSelection,
    factionSystemTile,
    FactionWithDynamicHomeworlds,
    FactionWithFixedHomeworlds,
    homeworldsForFactionSelection,
    isFactionWithDynamicHomeworlds,
    planetsOutsideOfGalaxy,
    selectedFaction,
    startingTechsForFaction,
} from '../factions';
import {
    numberOfPlayersInGame,
    PlayerColor,
    playerColors,
} from '../playerColors';
import { isPlanetlessSystemTile } from '../systemTiles';
import { notUndefined, range } from '../util';
import { AdminPageProps } from './adminPageProps';
import { Button } from './components/button';
import { PageTitle } from './components/pageTitle';
import { Select } from './components/select';

const FactionAssignmentPage: React.FC<AdminPageProps> = (props) => {
    const { publishNewEvents } = props;
    const [factionSelections, setFactionSelections] = useState<
        Record<number, FactionSelection>
    >({});

    const [playerColorSelections, setPlayerColorSelections] = useState<
        Record<number, PlayerColor>
    >({});

    const publishPlayerFactionAndColorAssignmentEvents = async () => {
        if (
            Object.keys(factionSelections).length === numberOfPlayersInGame &&
            Object.keys(playerColorSelections).length === numberOfPlayersInGame
        ) {
            const newEvents: Event[] = [
                {
                    type: 'PlayersAssignedFactionsAndColors',
                    time: new Date().getTime(),
                    colorAssignments: range(numberOfPlayersInGame).reduce(
                        (acc, n) => ({
                            ...acc,
                            [selectedFaction(factionSelections[n + 1])]:
                                playerColorSelections[n + 1],
                        }),
                        {} as Record<Faction, PlayerColor>
                    ),
                    factionSelections: Object.values(factionSelections),
                },
                ...Object.values(factionSelections).flatMap((fs) =>
                    homeworldsForFactionSelection(fs).map(
                        (p) =>
                            ({
                                type: 'PlanetControlled',
                                time: new Date().getTime(),
                                planet: p,
                                faction: selectedFaction(fs),
                            }) as const
                    )
                ),
                ...Object.values(factionSelections).flatMap((fs) =>
                    planetsOutsideOfGalaxy(selectedFaction(fs)).map(
                        (p) =>
                            ({
                                type: 'PlanetControlled',
                                time: new Date().getTime(),
                                planet: p,
                                faction: selectedFaction(fs),
                            }) as const
                    )
                ),
                ...Object.values(factionSelections)
                    .map((fs) => {
                        const fst = factionSystemTile(fs);
                        return isPlanetlessSystemTile(fst)
                            ? ({
                                  type: 'PlanetlessSystemControlled',
                                  time: new Date().getTime(),
                                  tileNumber: fst.tileNumber,
                                  faction: selectedFaction(fs),
                              } as const)
                            : undefined;
                    })
                    .filter(notUndefined),
                ...Object.values(factionSelections)
                    .map((fs) => selectedFaction(fs))
                    .flatMap((f) =>
                        startingTechsForFaction(f).map(
                            (t) =>
                                ({
                                    type: 'PlayerResearchedTechnology',
                                    time: new Date().getTime(),
                                    technology: t,
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
            <PageTitle {...props} title={'Choose factions'} />
            {range(6).map((n) => (
                <FactionSelectionRow
                    key={n}
                    factionSelectedOnRow={factionSelections[n + 1]}
                    playerColorSelectedOnRow={playerColorSelections[n + 1]}
                    factionSelections={factionSelections}
                    playerColorSelections={playerColorSelections}
                    onFactionSelected={(f) =>
                        setFactionSelections({
                            ...factionSelections,
                            [n + 1]: f,
                        })
                    }
                    onPlayerColorSelected={(c) =>
                        setPlayerColorSelections({
                            ...playerColorSelections,
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
    factionSelectedOnRow: FactionSelection | undefined;
    playerColorSelectedOnRow: PlayerColor | undefined;
    factionSelections: Record<number, FactionSelection>;
    playerColorSelections: Record<number, PlayerColor>;
    onFactionSelected: (f: FactionSelection) => void;
    onPlayerColorSelected: (p: PlayerColor) => void;
};

const FactionSelectionRow: React.FC<FactionSelectionRowProps> = ({
    factionSelectedOnRow,
    playerColorSelectedOnRow,
    factionSelections,
    playerColorSelections,
    onFactionSelected,
    onPlayerColorSelected,
}) => {
    const [
        selectedFactionWithDynamicHomeworlds,
        setSelectedFactionWithDynamicHomeworlds,
    ] = useState<FactionWithDynamicHomeworlds>();

    return (
        <StyledFactionSelectionRow>
            <Select
                name={'faction'}
                id={'faction'}
                onChange={(e) => {
                    const selection = e.target.value;
                    if (isFactionWithDynamicHomeworlds(selection)) {
                        setSelectedFactionWithDynamicHomeworlds(selection);
                    } else {
                        setSelectedFactionWithDynamicHomeworlds(undefined);
                        onFactionSelected(
                            selection as FactionWithFixedHomeworlds
                        );
                    }
                }}
            >
                <option value={''}>--Faction--</option>
                {factions
                    .filter(
                        (f) =>
                            (factionSelectedOnRow &&
                                selectedFaction(factionSelectedOnRow) === f) ||
                            !Object.values(factionSelections)
                                .map((fs) => selectedFaction(fs))
                                .includes(f)
                    )
                    .map((f) => (
                        <option key={f} value={f}>
                            {f}
                        </option>
                    ))}
            </Select>
            {selectedFactionWithDynamicHomeworlds === 'The Council Keleres' && (
                <Select
                    name={'homeworlds'}
                    id={'homeworlds'}
                    onChange={(e) => {
                        const selection = e.target.value;
                        onFactionSelected({
                            faction: selectedFactionWithDynamicHomeworlds,
                            homeworldsOf:
                                selection as FactionWithFixedHomeworlds,
                        });
                    }}
                >
                    <option value={''}>--Homeworlds--</option>
                    {(
                        [
                            'The Argent Flight',
                            'The Mentak Coalition',
                            'The Xxcha Kingdom',
                        ] as const
                    )
                        .filter(
                            (f) =>
                                (factionSelectedOnRow &&
                                    selectedFaction(factionSelectedOnRow) ===
                                        f) ||
                                !Object.values(factionSelections)
                                    .map((fs) => selectedFaction(fs))
                                    .includes(f)
                        )
                        .map((f) => (
                            <option key={f} value={f}>
                                {f}
                            </option>
                        ))}
                </Select>
            )}
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
                            playerColorSelectedOnRow === c ||
                            !Object.values(playerColorSelections).includes(c)
                    )
                    .map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
            </Select>
        </StyledFactionSelectionRow>
    );
};

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
