import React, { useState } from 'react';
import styled from 'styled-components';
import _, { identity } from 'underscore';

import {
    Event,
    isMapTileSelectedEvent,
    isPlanetControlledEvent,
    isPlanetEnhancedEvent,
    isPlayerAssignedColorEvent,
    isRoundEndedEvent,
    PlanetControlledEvent,
    PlayerFinishedTurnEvent,
} from './events';
import { Faction, factions, homeworlds } from './factions';
import { PlanetName, planets } from './planets';
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

    const [playerOrderByRound, setPlayerOrderByRound] = useState<
        Record<number, Faction[]>
    >({});

    const storedPlayerOrder = localStorage.getItem('playerOrder');
    const [currentRoundPlayerOrder, setCurrentRoundPlayerOrder] = useState<
        Faction[]
    >(storedPlayerOrder ? JSON.parse(storedPlayerOrder) : []);

    const [selectedPlanetToControl, setSelectedPlanetToControl] =
        useState<PlanetName>();

    const [selectedPlanetToEnhance, setSelectedPlanetToEnhance] =
        useState<PlanetName>();
    const [resourcesToEnhance, setResourcesToEnhance] = useState(0);
    const [influenceToEnhance, setInfluenceToEnhance] = useState(0);

    const turnsFinishedThisActionPhase = events.reduce((acc, n) => {
        if (n.type === 'ActionPhaseStarted') {
            return [];
        }
        if (n.type === 'PlayerFinishedTurn') {
            return [...acc, n];
        }
        return acc;
    }, [] as PlayerFinishedTurnEvent[]);

    const unpassedPlayersInOrder = currentRoundPlayerOrder.filter(
        (f) =>
            !turnsFinishedThisActionPhase.some((e) => e.faction === f && e.pass)
    );

    const latestPlanetControlledEventsByPlanet = events
        .filter(isPlanetControlledEvent)
        .reverse()
        .reduce(
            (acc: PlanetControlledEvent[], n) =>
                acc.find((e) => e.planet === n.planet) ? acc : [...acc, n],
            []
        );

    const publishNewEvents = async (newEvents: Event[]): Promise<boolean> => {
        const updatedEvents = [...events, ...newEvents];

        const response = await fetch('/api', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedEvents),
        });

        if (response.status === 200) {
            setEvents(updatedEvents);
            return true;
        }

        return false;
    };

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

    const publishMapTileSelectionEvents = async () => {
        if (_.uniq(Object.keys(tileSelections)).length === 37) {
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

            await publishNewEvents(newEvents);
        }
    };

    const publishRoundStartedEvent = async () => {
        const newEvent: Event = {
            type: 'RoundStarted',
            time: new Date().getTime(),
        };

        await publishNewEvents([newEvent]);
    };

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
                localStorage.setItem(
                    'playerOrder',
                    JSON.stringify(playerOrderByRound[roundNumber])
                );
                setCurrentRoundPlayerOrder(playerOrderByRound[roundNumber]);
            }
        }
    };

    const publishPlanetControlledEvent = async (p: PlanetName, f: Faction) => {
        const newEvent: Event = {
            type: 'PlanetControlled',
            planet: p,
            faction: f,
        };

        await publishNewEvents([newEvent]);
    };

    const publishPlanetEnhancedEvent = async (
        p: PlanetName,
        extraResources: number,
        extraInfluence: number
    ) => {
        const newEvent: Event = {
            type: 'PlanetEnhanced',
            planet: p,
            extraResources,
            extraInfluence,
        };

        await publishNewEvents([newEvent]);
    };

    const publishTurnFinishedEvent = async (f: Faction, pass: boolean) => {
        const newEvent: Event = {
            type: 'PlayerFinishedTurn',
            faction: f,
            time: new Date().getTime(),
            pass,
        };

        await publishNewEvents([newEvent]);
    };

    const publishRoundEndedEvent = async () => {
        const newEvent: Event = {
            type: 'RoundEnded',
            time: new Date().getTime(),
        };

        await publishNewEvents([newEvent]);
    };

    const planetsOnTheBoard: PlanetName[] = [
        ...events
            .filter(isMapTileSelectedEvent)
            .flatMap(
                (e) =>
                    systemTiles.find((t) => t.tileNumber === e.systemTileNumber)
                        ?.planets || []
            ),
        'Mallice',
    ];

    const currentRoundNumber = () =>
        events.filter(isRoundEndedEvent).length + 1;

    const currentPlayerTurn = () => {
        const lastPlayerToHaveATurn = _.last(turnsFinishedThisActionPhase);

        const currentPlayerToHaveATurn = !lastPlayerToHaveATurn
            ? 0
            : (unpassedPlayersInOrder.indexOf(lastPlayerToHaveATurn.faction) +
                  1) %
              unpassedPlayersInOrder.length;

        return unpassedPlayersInOrder[currentPlayerToHaveATurn];
    };

    const factionCurrentlyControllingPlanet = (p: PlanetName) =>
        latestPlanetControlledEventsByPlanet.find((e) => e.planet === p)
            ?.faction;

    const planetNameWithControllingFaction = (p: PlanetName) =>
        `${p}${factionCurrentlyControllingPlanet(p) ? ` (${factionCurrentlyControllingPlanet(p)})` : ''}`;

    const currentPlanetResourcesAndInfluence = (p: PlanetName) => ({
        resources:
            planets[p].resources +
            events
                .filter(isPlanetEnhancedEvent)
                .reduce((acc, n) => acc + n.extraResources, 0),
        influence:
            planets[p].influence +
            events
                .filter(isPlanetEnhancedEvent)
                .reduce((acc, n) => acc + n.extraInfluence, 0),
    });

    const planetNameWithResourcesAndInfluence = (p: PlanetName) =>
        `${p} (${currentPlanetResourcesAndInfluence(p).resources}R, ${currentPlanetResourcesAndInfluence(p).influence}I)`;

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
            ) : events.filter(isMapTileSelectedEvent).length < 37 ? (
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
            ) : _.last(events)?.type === 'MapTileSelected' ||
              _.last(events)?.type === 'RoundEnded' ? (
                <Button onClick={publishRoundStartedEvent}>
                    {`Start Round ${currentRoundNumber()}`}
                </Button>
            ) : _.last(events)?.type === 'RoundStarted' ? (
                <>
                    <span>{`Round ${currentRoundNumber()} player order`}</span>
                    {events
                        .filter(isPlayerAssignedColorEvent)
                        .map((_, index) => (
                            <Select
                                key={index}
                                onChange={(e) =>
                                    setPlayerOrderByRound({
                                        ...playerOrderByRound,
                                        [currentRoundNumber()]: Object.assign(
                                            [],
                                            playerOrderByRound[
                                                currentRoundNumber()
                                            ],
                                            {
                                                [index]: e.target
                                                    .value as Faction,
                                            }
                                        ),
                                    })
                                }
                            >
                                <option value={''}>--Faction--</option>
                                {events
                                    .filter(isPlayerAssignedColorEvent)
                                    .map((e) => (
                                        <option
                                            key={e.faction}
                                            value={e.faction}
                                        >
                                            {e.faction}
                                        </option>
                                    ))}
                            </Select>
                        ))}
                    <Button
                        onClick={() =>
                            publishActionPhaseStartedEvent(currentRoundNumber())
                        }
                    >
                        Continue
                    </Button>
                </>
            ) : unpassedPlayersInOrder.length > 0 ? (
                <PlayerTurnPage>
                    <span>{`${currentPlayerTurn()} turn`}</span>
                    <StyledPlanetControlledRow>
                        <Select
                            onChange={(e) =>
                                setSelectedPlanetToControl(
                                    e.target.value as PlanetName
                                )
                            }
                        >
                            <option value={''}>--Planet--</option>
                            {_.sortBy(planetsOnTheBoard, identity).map((p) => (
                                <option key={p} value={p}>
                                    {planetNameWithControllingFaction(p)}
                                </option>
                            ))}
                        </Select>
                        <Button
                            onClick={async () => {
                                if (selectedPlanetToControl) {
                                    await publishPlanetControlledEvent(
                                        selectedPlanetToControl,
                                        currentPlayerTurn()
                                    );
                                }
                            }}
                        >
                            Take control
                        </Button>
                    </StyledPlanetControlledRow>
                    <StyledPlanetEnhancedRow>
                        <Select
                            onChange={(e) =>
                                setSelectedPlanetToEnhance(
                                    e.target.value as PlanetName
                                )
                            }
                        >
                            <option value={''}>--Planet--</option>
                            {_.sortBy(planetsOnTheBoard, identity).map((p) => (
                                <option key={p} value={p}>
                                    {planetNameWithResourcesAndInfluence(p)}
                                </option>
                            ))}
                        </Select>
                        <PlanetEnhancementInputsRow>
                            <NumberInput
                                placeholder={'Resources'}
                                onChange={(e) =>
                                    setResourcesToEnhance(
                                        Number.parseInt(e.target.value)
                                    )
                                }
                            />
                            <NumberInput
                                placeholder={'Influence'}
                                onChange={(e) =>
                                    setInfluenceToEnhance(
                                        Number.parseInt(e.target.value)
                                    )
                                }
                            />
                        </PlanetEnhancementInputsRow>
                        <Button
                            onClick={async () => {
                                if (
                                    selectedPlanetToEnhance &&
                                    resourcesToEnhance &&
                                    influenceToEnhance
                                ) {
                                    await publishPlanetEnhancedEvent(
                                        selectedPlanetToEnhance,
                                        resourcesToEnhance,
                                        influenceToEnhance
                                    );
                                }
                            }}
                        >
                            Enhance
                        </Button>
                    </StyledPlanetEnhancedRow>
                    <ButtonsContainer>
                        <Button
                            onClick={() =>
                                publishTurnFinishedEvent(
                                    currentPlayerTurn(),
                                    true
                                )
                            }
                        >
                            Pass
                        </Button>
                        <Button
                            onClick={() =>
                                publishTurnFinishedEvent(
                                    currentPlayerTurn(),
                                    false
                                )
                            }
                        >
                            Turn finished
                        </Button>
                    </ButtonsContainer>
                </PlayerTurnPage>
            ) : (
                <Button onClick={publishRoundEndedEvent}>
                    {`End Round ${currentRoundNumber()}`}
                </Button>
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

const PlayerTurnPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

const StyledPlanetControlledRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    column-gap: 2rem;
    row-gap: 1rem;

    > * {
        flex: 1 1 0;
    }
`;

const StyledPlanetEnhancedRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    column-gap: 2rem;
    row-gap: 1rem;

    > * {
        flex: 1 1 0;
    }
`;

const PlanetEnhancementInputsRow = styled.div`
    display: flex;
    column-gap: 2rem;
    row-gap: 1rem;

    > * {
        flex: 1 1 0;
    }
`;

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Select = styled.select`
    font-size: 2.25rem;
`;

const Button = styled.button`
    font-size: 2.25rem;
`;

const NumberInput = styled.input.attrs(() => ({ type: 'number' }))`
    min-width: 0;
    font-size: 2.25rem;
`;

export { AdminPage };
