import React, { useState } from 'react';
import styled from 'styled-components';
import _, { identity } from 'underscore';

import {
    Event,
    isActionPhaseStartedEvent,
    isMapTileSelectedEvent,
    isPlanetControlledEvent,
    isPlanetDestroyedEvent,
    isPlanetEnhancedEvent,
    isPlayerAssignedColorEvent,
    isPlayerScoredVictoryPointEvent,
    isRoundEndedEvent,
    PlanetControlledEvent,
    PlayerFinishedTurnEvent,
} from '../events';
import { Faction } from '../factions';
import { PlanetName, planets } from '../planets';
import { systemTiles } from '../systemTiles';
import { Button, PageTitle, Select } from './components';
import { FactionSelectionPage } from './factionSelectionPage';
import { PlayerOrderSelectionPage } from './playerOrderSelectionPage';
import { TileSelectionPage } from './tileSelectionPage';

type AdminPageProps = {
    events: Event[];
    setEvents: (updatedEvents: Event[]) => void;
};

const AdminPages: React.FC<AdminPageProps> = ({ events, setEvents }) => {
    const [selectedPlanetToControl, setSelectedPlanetToControl] =
        useState<PlanetName>();

    const [selectedPlanetToEnhance, setSelectedPlanetToEnhance] =
        useState<PlanetName>();
    const [resourcesToEnhance, setResourcesToEnhance] = useState(0);
    const [influenceToEnhance, setInfluenceToEnhance] = useState(0);

    const [playerToScoreVps, setPlayerToScoreVps] = useState<Faction>();
    const [vpsToAdd, setVpsToAdd] = useState<number>(0);

    const [planetToDestroy, setPlanetToDestroy] = useState<PlanetName>();

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

    const publishRoundStartedEvent = async () => {
        const newEvent: Event = {
            type: 'RoundStarted',
            time: new Date().getTime(),
        };

        await publishNewEvents([newEvent]);
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
        ...events
            .filter(isMapTileSelectedEvent)
            .flatMap(
                (e) =>
                    systemTiles.find((t) => t.tileNumber === e.systemTileNumber)
                        ?.planets || []
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

    const adminPageProps = { events, publishNewEvents };

    const activePlayer = currentPlayerTurn(events);

    return (
        <StyledAdminPage>
            {events.length === 0 ? (
                <FactionSelectionPage {...adminPageProps} />
            ) : events.filter(isMapTileSelectedEvent).length < 37 ? (
                <TileSelectionPage {...adminPageProps} />
            ) : _.last(events)?.type === 'MapTileSelected' ||
              _.last(events)?.type === 'RoundEnded' ? (
                <>
                    <PageTitle title={'Start round'} />
                    <Button onClick={publishRoundStartedEvent}>
                        {`Start Round ${currentRoundNumber(events)}`}
                    </Button>
                </>
            ) : _.last(events)?.type === 'RoundStarted' ? (
                <PlayerOrderSelectionPage
                    {...adminPageProps}
                    currentRoundNumber={currentRoundNumber(events)}
                />
            ) : activePlayer ? (
                <PlayerTurnPage>
                    <PageTitle title={`${currentPlayerTurn(events)} turn`} />
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
                    <PageTitle title={'End of round scoring'} />
                    <FactionScoresVpsContainer>
                        <Select
                            onChange={(e) =>
                                setPlayerToScoreVps(e.target.value as Faction)
                            }
                        >
                            <option value={''}>--Faction--</option>
                            {events
                                .filter(isPlayerAssignedColorEvent)
                                .map((e) => (
                                    <option key={e.faction} value={e.faction}>
                                        {`${e.faction} (${events
                                            .filter(
                                                isPlayerScoredVictoryPointEvent
                                            )
                                            .filter(
                                                (vpe) =>
                                                    vpe.faction === e.faction
                                            )
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
