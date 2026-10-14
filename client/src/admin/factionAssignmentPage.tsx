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
import { PlayerColor, playerColors } from '../playerColors';
import { isPlanetlessSystemTile } from '../systemTiles';
import { notUndefined, range } from '../util';
import { AdminPageProps } from './adminPageProps';
import { Button } from './components/button';
import { PageTitle } from './components/pageTitle';
import { Select } from './components/select';

const maxNumberOfPlayersInGame = 6;
const minNumberOfPlayersInGame = 3;

const FactionAssignmentPage: React.FC<AdminPageProps> = (props) => {
    const { publishNewEvents } = props;
    const [factionSelections, setFactionSelections] = useState<
        FactionSelection[]
    >(Array(maxNumberOfPlayersInGame));

    const [playerColorSelections, setPlayerColorSelections] = useState<
        PlayerColor[]
    >(Array(maxNumberOfPlayersInGame));

    const publishPlayerFactionAndColorAssignmentEvents = async () => {
        const factionColorAssignments = factionSelections
            .map((f, index) => ({
                faction: f,
                color: playerColorSelections[index],
            }))
            .filter((a) => a.faction && a.color);

        const factionsWithAssignedColors = factionColorAssignments.map(
            (fca) => fca.faction
        );

        if (factionColorAssignments.length >= minNumberOfPlayersInGame) {
            const newEvents: Event[] = [
                {
                    type: 'PlayersAssignedFactionsAndColors',
                    time: new Date().getTime(),
                    colorAssignments: factionColorAssignments.reduce(
                        (acc, n) => ({
                            ...acc,
                            [selectedFaction(n.faction)]: n.color,
                        }),
                        {} as Record<Faction, PlayerColor>
                    ),
                    factionSelections: factionsWithAssignedColors,
                },
                ...factionsWithAssignedColors.flatMap((fs) =>
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
                ...factionsWithAssignedColors.flatMap((fs) =>
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
                ...factionsWithAssignedColors
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
                ...factionsWithAssignedColors
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
                    factionSelectedOnRow={factionSelections[n]}
                    playerColorSelectedOnRow={playerColorSelections[n]}
                    factionSelections={factionSelections}
                    playerColorSelections={playerColorSelections}
                    onFactionSelected={(f) =>
                        setFactionSelections([
                            ...factionSelections.slice(0, n),
                            f,
                            ...factionSelections.slice(n + 1),
                        ])
                    }
                    onPlayerColorSelected={(c) =>
                        setPlayerColorSelections([
                            ...playerColorSelections.slice(0, n),
                            c,
                            ...playerColorSelections.slice(n + 1),
                        ])
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
    factionSelections: FactionSelection[];
    playerColorSelections: PlayerColor[];
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
                            !factionSelections
                                .filter(notUndefined)
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
                                !factionSelections
                                    .filter(notUndefined)
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
                            !playerColorSelections.includes(c)
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
