import React, { useState } from 'react';
import styled from 'styled-components';
import _, { identity } from 'underscore';
import useAsyncEffect from 'use-async-effect';

import {
    Event,
    factionsInGame,
    isActionPhaseStartedEvent,
    isMapTilesSelectedEvent,
    isPlanetControlledEvent,
    isPlanetDestroyedEvent,
    isPlanetEnhancedEvent,
    isPlayerScoredVictoryPointEvent,
    isRoundEndedEvent,
    PlanetControlledEvent,
    PlayerFinishedTurnEvent,
} from '../events';
import { Faction } from '../factions';
import { PlanetName, planets } from '../planets';
import { systemTiles } from '../systemTiles';
import { Button, PageTitle, Select } from './components';
import { FactionAssignmentPage } from './factionAssignmentPage';
import { PlayerOrderSelectionPage } from './playerOrderSelectionPage';
import { StartRoundPage } from './startRoundPage';
import { TileSelectionPage } from './tileSelectionPage';
import { UndoLastEventPage } from './undoLastEventPage';

const AdminPages: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [undoLastEventModeEnabled, setUndoLastEventModeEnabled] =
        useState<boolean>(false);

    useAsyncEffect(async () => {
        try {
            const response = await fetch('/api');

            if (response.status === 200) {
                const responseJson = await response.json();

                setEvents(responseJson);
            }
        } catch {}
    }, []);

    const [selectedPlanetToControl, setSelectedPlanetToControl] =
        useState<PlanetName>();

    const [selectedPlanetToEnhance, setSelectedPlanetToEnhance] =
        useState<PlanetName>();
    const [resourcesToEnhance, setResourcesToEnhance] = useState(0);
    const [influenceToEnhance, setInfluenceToEnhance] = useState(0);

    const [playerToScoreVps, setPlayerToScoreVps] = useState<Faction>();
    const [vpsToAdd, setVpsToAdd] = useState<number>(0);

    const [planetToDestroy, setPlanetToDestroy] = useState<PlanetName>();

    const updateEvents = async (updatedEvents: Event[]): Promise<boolean> => {
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

    const publishNewEvents = async (newEvents: Event[]): Promise<boolean> => {
        const updatedEvents = [...events, ...newEvents];

        return await updateEvents(updatedEvents);
    };

    const undoLastEvent = async (): Promise<boolean> => {
        const updatedEvents = events.slice(0, -1);

        return await updateEvents(updatedEvents);
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

    const publishVpScoredEvent = async (
        f: Faction,
        delta: number
    ): Promise<boolean> => {
        const newEvent: Event = {
            type: 'PlayerScoredVictoryPoint',
            faction: f,
            delta,
        };

        return await publishNewEvents([newEvent]);
    };

    const publishPlanetDestroyedEvent = async (
        p: PlanetName
    ): Promise<boolean> => {
        const newEvent: Event = {
            type: 'PlanetDestroyed',
            planet: p,
        };

        return await publishNewEvents([newEvent]);
    };

    const planetsOnTheBoard: PlanetName[] = [
        ...Object.values(
            _.last(events.filter(isMapTilesSelectedEvent))?.selections || {}
        )
            .flatMap(
                (stn) =>
                    systemTiles.find((t) => t.tileNumber === stn)?.planets || []
            )
            .filter(
                (p) =>
                    !events
                        .filter(isPlanetDestroyedEvent)
                        .some((dp) => dp.planet === p)
            ),
        'Mallice',
    ];

    const factionCurrentlyControllingPlanet = (p: PlanetName) =>
        latestPlanetControlledEventsByPlanet(events).find((e) => e.planet === p)
            ?.faction;

    const planetNameWithControllingFaction = (p: PlanetName) =>
        `${p}${factionCurrentlyControllingPlanet(p) ? ` (${factionCurrentlyControllingPlanet(p)})` : ''}`;

    const planetResourcesAndInfluence = (p: PlanetName) => ({
        resources:
            planets[p].resources +
            events
                .filter(isPlanetEnhancedEvent)
                .filter((e) => e.planet === p)
                .reduce((acc, n) => acc + n.extraResources, 0),
        influence:
            planets[p].influence +
            events
                .filter(isPlanetEnhancedEvent)
                .filter((e) => e.planet === p)
                .reduce((acc, n) => acc + n.extraInfluence, 0),
    });

    const planetNameWithResourcesAndInfluence = (p: PlanetName) =>
        `${p} (${planetResourcesAndInfluence(p).resources}R, ${planetResourcesAndInfluence(p).influence}I)`;

    const adminPageProps = {
        events,
        publishNewEvents,
        undoLastEvent,
        toggleUndoLastEventMode: () =>
            setUndoLastEventModeEnabled(!undoLastEventModeEnabled),
    };

    const activePlayer = currentPlayerTurn(events);

    return (
        <StyledAdminPage>
            {undoLastEventModeEnabled ? (
                <UndoLastEventPage {...adminPageProps} />
            ) : events.length === 0 ? (
                <FactionAssignmentPage {...adminPageProps} />
            ) : !events.find(isMapTilesSelectedEvent) ? (
                <TileSelectionPage {...adminPageProps} />
            ) : _.last(events)?.type === 'MapTilesSelected' ||
              _.last(events)?.type === 'RoundEnded' ? (
                <StartRoundPage
                    {...adminPageProps}
                    currentRoundNumber={currentRoundNumber(events)}
                />
            ) : _.last(events)?.type === 'RoundStarted' ? (
                <PlayerOrderSelectionPage
                    {...adminPageProps}
                    currentRoundNumber={currentRoundNumber(events)}
                />
            ) : activePlayer ? (
                <PlayerTurnPage>
                    <PageTitle
                        {...adminPageProps}
                        title={`${currentPlayerTurn(events)} turn`}
                    />
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
                                        activePlayer
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
                    <ScoreVpsRow>
                        <NumberInput
                            onChange={(e) =>
                                setVpsToAdd(Number.parseInt(e.target.value))
                            }
                        />
                        <Button
                            onClick={async () => {
                                if (vpsToAdd) {
                                    await publishVpScoredEvent(
                                        activePlayer,
                                        vpsToAdd
                                    );
                                }
                            }}
                        >
                            Score
                        </Button>
                    </ScoreVpsRow>
                    <DestroyPlanetContainer>
                        <Select
                            onChange={(e) =>
                                setPlanetToDestroy(e.target.value as PlanetName)
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
                                if (planetToDestroy) {
                                    await publishPlanetDestroyedEvent(
                                        planetToDestroy
                                    );
                                }
                            }}
                        >
                            Destroy planet
                        </Button>
                    </DestroyPlanetContainer>
                    <ButtonsContainer>
                        <Button
                            onClick={() =>
                                publishTurnFinishedEvent(activePlayer, false)
                            }
                        >
                            Turn finished
                        </Button>
                    </ButtonsContainer>
                    <ButtonsContainer>
                        <Button
                            onClick={() =>
                                publishTurnFinishedEvent(activePlayer, true)
                            }
                        >
                            Pass
                        </Button>
                    </ButtonsContainer>
                </PlayerTurnPage>
            ) : (
                <>
                    <PageTitle
                        {...adminPageProps}
                        title={'End of round scoring'}
                    />
                    <FactionScoresVpsContainer>
                        <Select
                            onChange={(e) =>
                                setPlayerToScoreVps(e.target.value as Faction)
                            }
                        >
                            <option value={''}>--Faction--</option>
                            {factionsInGame(events).map((f) => (
                                <option key={f} value={f}>
                                    {`${f} (${events
                                        .filter(isPlayerScoredVictoryPointEvent)
                                        .filter((vpe) => vpe.faction === f)
                                        .reduce(
                                            (acc, n) => acc + n.delta,
                                            0
                                        )}vp)`}
                                </option>
                            ))}
                        </Select>
                        <ScoreVpsRow>
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
                        </ScoreVpsRow>
                    </FactionScoresVpsContainer>
                    <Button onClick={publishRoundEndedEvent}>
                        {`End Round ${currentRoundNumber(events)}`}
                    </Button>
                </>
            )}
        </StyledAdminPage>
    );
};

const currentRoundPlayerOrder = (events: Event[]): Faction[] =>
    _.last(events.filter(isActionPhaseStartedEvent))?.playerOrder || [];

const turnsFinishedThisActionPhase = (
    events: Event[]
): PlayerFinishedTurnEvent[] =>
    events.reduce((acc, n) => {
        if (n.type === 'ActionPhaseStarted') {
            return [];
        }
        if (n.type === 'PlayerFinishedTurn') {
            return [...acc, n];
        }
        return acc;
    }, [] as PlayerFinishedTurnEvent[]);

const unpassedPlayers = (events: Event[]): Faction[] =>
    currentRoundPlayerOrder(events).filter(
        (f) =>
            !turnsFinishedThisActionPhase(events).some(
                (e) => e.faction === f && e.pass
            )
    );

const latestPlanetControlledEventsByPlanet = (
    events: Event[]
): PlanetControlledEvent[] =>
    events
        .filter(isPlanetControlledEvent)
        .reverse()
        .reduce(
            (acc: PlanetControlledEvent[], n) =>
                acc.find((e) => e.planet === n.planet) ? acc : [...acc, n],
            []
        );

const currentRoundNumber = (events: Event[]): number =>
    events.filter(isRoundEndedEvent).length + 1;

const currentPlayerTurn = (events: Event[]): Faction | undefined => {
    const turnsFinished = turnsFinishedThisActionPhase(events);
    const lastPlayerToHaveATurn = _.last(turnsFinished);
    const playerOrder = currentRoundPlayerOrder(events);

    const indexOfPlayerAfterLastToHaveATurn = !lastPlayerToHaveATurn
        ? 0
        : playerOrder.indexOf(lastPlayerToHaveATurn.faction) + 1;

    return findNextUnpassedPlayer(
        playerOrder,
        unpassedPlayers(events),
        indexOfPlayerAfterLastToHaveATurn
    );
};

const findNextUnpassedPlayer = (
    playerOrder: Faction[],
    unpassedPlayers: Faction[],
    fromIndex: number
): Faction | undefined => {
    if (unpassedPlayers.length === 0) {
        return undefined;
    }

    const potentialNextPlayer = playerOrder[fromIndex % playerOrder.length];

    if (unpassedPlayers.includes(potentialNextPlayer)) {
        return potentialNextPlayer;
    }

    return findNextUnpassedPlayer(playerOrder, unpassedPlayers, fromIndex + 1);
};

const StyledAdminPage = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    font-size: 2.25rem;
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
    column-gap: 1rem;

    > * {
        flex: 1 1 0;
    }
`;

const FactionScoresVpsContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;

const ScoreVpsRow = styled.div`
    display: flex;
    column-gap: 1rem;
    row-gap: 1rem;

    > * {
        flex: 1 1 0;
    }
`;

const DestroyPlanetContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
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

const NumberInput = styled.input.attrs(() => ({ type: 'number' }))`
    min-width: 0;
    font-size: 2.25rem;
`;

export { AdminPages, currentPlayerTurn };
