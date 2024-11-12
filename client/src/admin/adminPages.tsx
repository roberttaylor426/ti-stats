import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import _, { identity } from 'underscore';
import useAsyncEffect from 'use-async-effect';

import {
    currentPlayerTurnInActionPhase,
    currentPlayerTurnInStrategyPhase,
    currentRoundNumber,
    Event,
    factionsInGame,
    hasMecatolRexBeenCaptured,
    isMapTilesSelectedEvent,
    isPlanetControlledEvent,
    isPlanetDestroyedEvent,
    isPlanetEnhancedEvent,
    isPlanetlessSystemControlledEvent,
    isPlayerScoredVictoryPointEvent,
    isRoundEndedEvent,
    isRoundStartedEvent,
    lastIndexOfEventType,
    MapTilesSelectedEvent,
    PlanetControlledEvent,
    PlanetlessSystemControlledEvent,
    playerSelectedStrategyCardEventFromLastStrategyPhase,
    strategyCardPlayedByPlayerOnPreviousTurnThisRound,
    strategyCardPlayedByPlayerThisTurn,
    systemTileNumbersInPlay,
    technologiesResearchedByFaction,
} from '../events';
import { Faction, shortName } from '../factions';
import { PlanetName, planets } from '../planets';
import { numberOfPlayersInGame } from '../playerColors';
import { StrategyCard } from '../strategyCards';
import {
    isPlanetlessSystemTileNumber,
    isSystemWithPlanetsTile,
    PlanetlessSystemTileNumber,
    systemTileDescription,
    systemTiles,
} from '../systemTiles';
import { technologies, Technology } from '../technologies';
import { AgendaPhasePage } from './agendaPhasePage';
import { Button, PageTitle, Select } from './components';
import { FactionAssignmentPage } from './factionAssignmentPage';
import { NumberInput } from './input';
import { PlayerOrderSelectionPage } from './playerOrderSelectionPage';
import { StartRoundPage } from './startRoundPage';
import { StrategyCardSelectionPage } from './strategyCardSelectionPage';
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

    const pageTitleRef = useRef<HTMLDivElement>(null);
    const scrollToTop = () => {
        pageTitleRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const [selectedPlanetToControl, setSelectedPlanetToControl] =
        useState<PlanetName>();

    const [
        selectedPlanetlessSystemToControl,
        setSelectedPlanetlessSystemToControl,
    ] = useState<PlanetlessSystemTileNumber>();

    const [selectedPlanetToEnhance, setSelectedPlanetToEnhance] =
        useState<PlanetName>();
    const [resourcesToEnhance, setResourcesToEnhance] = useState(0);
    const [influenceToEnhance, setInfluenceToEnhance] = useState(0);

    const [techToResearch, setTechToResearch] = useState<Technology>();
    const [factionToResearchTech, setFactionToResearchTech] =
        useState<Faction>();

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
            time: new Date().getTime(),
            planet: p,
            faction: f,
        };

        await publishNewEvents([newEvent]);
    };

    const publishPlanetlessSystemControlledEvent = async (
        stn: PlanetlessSystemTileNumber,
        f: Faction | undefined
    ) => {
        const newEvent: Event = {
            type: 'PlanetlessSystemControlled',
            time: new Date().getTime(),
            tileNumber: stn,
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
            time: new Date().getTime(),
            planet: p,
            extraResources,
            extraInfluence,
        };

        await publishNewEvents([newEvent]);
    };

    const publishPlayerResearchedTechnologyEvent = async (
        t: Technology,
        f: Faction
    ) => {
        const newEvent: Event = {
            type: 'PlayerResearchedTechnology',
            time: new Date().getTime(),
            technology: t,
            faction: f,
        };

        await publishNewEvents([newEvent]);
    };

    const publishPlayerPlayedStrategyCardEvent = async (
        sc: StrategyCard,
        f: Faction
    ) => {
        const newEvent: Event = {
            type: 'PlayerPlayedStrategyCard',
            time: new Date().getTime(),
            strategyCard: sc,
            faction: f,
        };

        await publishNewEvents([newEvent]);
    };

    const publishTurnFinishedEvent = async (f: Faction, pass: boolean) => {
        const newEvent: Event = {
            type: 'PlayerFinishedTurn',
            time: new Date().getTime(),
            faction: f,
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

    const publishAgendaPhaseStartedEvent = async () => {
        const newEvent: Event = {
            type: 'AgendaPhaseStarted',
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
            time: new Date().getTime(),
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
            time: new Date().getTime(),
            planet: p,
        };

        return await publishNewEvents([newEvent]);
    };

    const planetsOnTheBoard: PlanetName[] = systemTileNumbersInPlay(events)
        .flatMap(
            (stn) =>
                systemTiles
                    .filter(isSystemWithPlanetsTile)
                    .find((t) => t.tileNumber === stn)?.planets || []
        )
        .filter(
            (p) =>
                !events
                    .filter(isPlanetDestroyedEvent)
                    .some((dp) => dp.planet === p)
        );

    const planetlessSystemTilesOnTheBoard: PlanetlessSystemTileNumber[] =
        systemTileNumbersInPlay(events).filter(isPlanetlessSystemTileNumber);

    const factionCurrentlyControllingPlanet = (p: PlanetName) =>
        latestPlanetControlledEventsByPlanet(events).find((e) => e.planet === p)
            ?.faction;

    const planetNameWithControllingFaction = (p: PlanetName) => {
        const faction = factionCurrentlyControllingPlanet(p);
        return `${p}${faction ? ` (${shortName(faction)})` : ''}`;
    };

    const factionCurrentlyControllingPlanetlessSystemTile = (
        stn: PlanetlessSystemTileNumber
    ): Faction | undefined =>
        latestPlanetlessSystemControlledEventsBySystem(events).find(
            (e) => e.tileNumber === stn
        )?.faction;

    const planetlessSystemTileWithControllingFaction = (
        stn: PlanetlessSystemTileNumber
    ) => {
        const faction = factionCurrentlyControllingPlanetlessSystemTile(stn);
        return `${systemTileDescription(stn)}${faction ? ` (${shortName(faction)})` : ''}`;
    };

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

    const techsAvailableToResearch = (
        f: Faction | undefined,
        events: Event[]
    ): Technology[] =>
        f
            ? _.sortBy(
                  technologies
                      .filter((t) => t.faction === f || !t.faction)
                      .filter(
                          (t) =>
                              !technologiesResearchedByFaction(f, events).some(
                                  (trbf) => t.name === trbf.name
                              )
                      ),
                  (t) => t.name
              )
            : [];

    const adminPageProps = {
        events,
        publishNewEvents,
        undoLastEvent,
        toggleUndoLastEventMode: () =>
            setUndoLastEventModeEnabled(!undoLastEventModeEnabled),
    };

    const mapTilesSelectedEvent = _.last(
        events.filter(isMapTilesSelectedEvent)
    );
    const activePlayerInStrategyPhase =
        currentPlayerTurnInStrategyPhase(events);
    const activePlayerInActionPhase = currentPlayerTurnInActionPhase(events);
    const strategyCardSelectedByActivePlayerInActionPhase =
        playerSelectedStrategyCardEventFromLastStrategyPhase(events).find(
            (e) => e.faction === activePlayerInActionPhase
        )?.strategyCard;

    return (
        <StyledAdminPage>
            {undoLastEventModeEnabled ? (
                <UndoLastEventPage {...adminPageProps} />
            ) : events.length === 0 ? (
                <FactionAssignmentPage {...adminPageProps} />
            ) : !mapTilesSelectedEvent ? (
                <TileSelectionPage {...adminPageProps} />
            ) : isStartRoundPageVisible(events) ? (
                <StartRoundPage
                    {...adminPageProps}
                    currentRoundNumber={currentRoundNumber(events)}
                />
            ) : activePlayerInStrategyPhase &&
              isSelectStrategyCardPageVisible(events) ? (
                <StrategyCardSelectionPage
                    {...adminPageProps}
                    activePlayer={activePlayerInStrategyPhase}
                />
            ) : _.last(events)?.type === 'PlayerSelectedStrategyCard' ? (
                <PlayerOrderSelectionPage
                    {...adminPageProps}
                    currentRoundNumber={currentRoundNumber(events)}
                />
            ) : _.last(events)?.type === 'AgendaPhaseStarted' ||
              _.last(events)?.type === 'AgendaCardRevealed' ? (
                <AgendaPhasePage
                    {...adminPageProps}
                    currentRoundNumber={currentRoundNumber(events)}
                />
            ) : activePlayerInActionPhase ? (
                <PlayerTurnPage>
                    <div ref={pageTitleRef}>
                        <PageTitle
                            {...adminPageProps}
                            title={`${currentPlayerTurnInActionPhase(events)} turn`}
                        />
                    </div>
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
                                        activePlayerInActionPhase
                                    );
                                }
                            }}
                        >
                            Take control
                        </Button>
                    </StyledPlanetControlledRow>
                    <StyledPlanetControlledRow>
                        <Select
                            onChange={(e) =>
                                setSelectedPlanetlessSystemToControl(
                                    Number.parseInt(
                                        e.target.value
                                    ) as PlanetlessSystemTileNumber
                                )
                            }
                        >
                            <option value={''}>--Planetless system--</option>
                            <option
                                value={''}
                                disabled
                            >{`Index 1: ${systemTileDescription(mapTilesSelectedEvent.selections[0])}`}</option>
                            {_.sortBy(planetlessSystemTilesOnTheBoard, (stn) =>
                                tileIndexOnBoard(stn, mapTilesSelectedEvent)
                            ).map((stn) => (
                                <option key={stn} value={stn}>
                                    {`#${tileIndexOnBoard(stn, mapTilesSelectedEvent)}: ${planetlessSystemTileWithControllingFaction(
                                        stn
                                    )}`}
                                </option>
                            ))}
                        </Select>
                        <Button
                            onClick={async () => {
                                if (selectedPlanetlessSystemToControl) {
                                    await publishPlanetlessSystemControlledEvent(
                                        selectedPlanetlessSystemToControl,
                                        activePlayerInActionPhase
                                    );
                                }
                            }}
                        >
                            Take control
                        </Button>
                        <Button
                            disabled={
                                !selectedPlanetlessSystemToControl ||
                                factionCurrentlyControllingPlanetlessSystemTile(
                                    selectedPlanetlessSystemToControl
                                ) !== activePlayerInActionPhase
                            }
                            onClick={async () => {
                                if (selectedPlanetlessSystemToControl) {
                                    await publishPlanetlessSystemControlledEvent(
                                        selectedPlanetlessSystemToControl,
                                        undefined
                                    );
                                }
                            }}
                        >
                            Lose control
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
                    <StyledTechResearchedRow>
                        <Select
                            onChange={(e) =>
                                setFactionToResearchTech(
                                    e.target.value as Faction
                                )
                            }
                        >
                            <option value={''}>--Faction--</option>
                            {_.sortBy(factionsInGame(events)).map((f) => (
                                <option key={f} value={f}>
                                    {f}
                                </option>
                            ))}
                        </Select>
                        <Select
                            onChange={(e) =>
                                setTechToResearch(
                                    technologies.find(
                                        (t) => e.target.value === t.name
                                    )
                                )
                            }
                        >
                            <option value={''}>--Tech--</option>
                            {_.sortBy(
                                techsAvailableToResearch(
                                    factionToResearchTech,
                                    events
                                )
                            ).map(({ name }) => (
                                <option key={name} value={name}>
                                    {name}
                                </option>
                            ))}
                        </Select>
                        <Button
                            onClick={async () => {
                                if (factionToResearchTech && techToResearch) {
                                    await publishPlayerResearchedTechnologyEvent(
                                        techToResearch,
                                        factionToResearchTech
                                    );

                                    if (
                                        techToResearch.name ===
                                        'I.I.H.Q Modernization'
                                    ) {
                                        await publishPlanetControlledEvent(
                                            'Custodia Vigilia',
                                            factionToResearchTech
                                        );
                                    }
                                }
                            }}
                        >
                            Research
                        </Button>
                    </StyledTechResearchedRow>
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
                                        activePlayerInActionPhase,
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
                    {!strategyCardPlayedByPlayerOnPreviousTurnThisRound(
                        events,
                        activePlayerInActionPhase
                    ) &&
                        strategyCardSelectedByActivePlayerInActionPhase && (
                            <ButtonsContainer>
                                <Button
                                    disabled={strategyCardPlayedByPlayerThisTurn(
                                        events,
                                        activePlayerInActionPhase
                                    )}
                                    onClick={() =>
                                        publishPlayerPlayedStrategyCardEvent(
                                            strategyCardSelectedByActivePlayerInActionPhase,
                                            activePlayerInActionPhase
                                        )
                                    }
                                >
                                    Play strategy card
                                </Button>
                            </ButtonsContainer>
                        )}
                    <ButtonsContainer>
                        <Button
                            onClick={async () => {
                                await publishTurnFinishedEvent(
                                    activePlayerInActionPhase,
                                    false
                                );

                                scrollToTop();
                            }}
                        >
                            Turn finished
                        </Button>
                    </ButtonsContainer>
                    {strategyCardPlayedByPlayerOnPreviousTurnThisRound(
                        events,
                        activePlayerInActionPhase
                    ) && (
                        <ButtonsContainer>
                            <Button
                                onClick={async () => {
                                    await publishTurnFinishedEvent(
                                        activePlayerInActionPhase,
                                        true
                                    );

                                    scrollToTop();
                                }}
                            >
                                Pass
                            </Button>
                        </ButtonsContainer>
                    )}
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
                    {hasMecatolRexBeenCaptured(events) ? (
                        <Button onClick={publishAgendaPhaseStartedEvent}>
                            {`Start Agenda Phase`}
                        </Button>
                    ) : (
                        <Button onClick={publishRoundEndedEvent}>
                            {`End Round ${currentRoundNumber(events)}`}
                        </Button>
                    )}
                </>
            )}
        </StyledAdminPage>
    );
};

const isStartRoundPageVisible = (events: Event[]) => {
    const lastMapTilesSelectedIndex = lastIndexOfEventType(
        events,
        isMapTilesSelectedEvent
    );
    const lastRoundStartedIndex = lastIndexOfEventType(
        events,
        isRoundStartedEvent
    );
    const lastRoundEndedIndex = lastIndexOfEventType(events, isRoundEndedEvent);

    return (
        lastMapTilesSelectedIndex > lastRoundStartedIndex ||
        lastRoundEndedIndex > lastRoundStartedIndex
    );
};

const isSelectStrategyCardPageVisible = (events: Event[]) =>
    playerSelectedStrategyCardEventFromLastStrategyPhase(events).length <
    numberOfPlayersInGame;

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

const latestPlanetlessSystemControlledEventsBySystem = (
    events: Event[]
): PlanetlessSystemControlledEvent[] =>
    events
        .filter(isPlanetlessSystemControlledEvent)
        .reverse()
        .reduce(
            (acc: PlanetlessSystemControlledEvent[], n) =>
                acc.find((e) => e.tileNumber === n.tileNumber)
                    ? acc
                    : [...acc, n],
            []
        );

const tileIndexOnBoard = (
    stn: PlanetlessSystemTileNumber,
    mapTilesSelectedEvent: MapTilesSelectedEvent
): number =>
    Number.parseInt(
        (Object.entries(mapTilesSelectedEvent.selections).find(
            ([_, v]) => v === stn
        ) || ['-1'])[0]
    ) + 1;

const StyledAdminPage = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    font-size: 2.25rem;
`;

const PlayerTurnPage = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4rem;
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

const StyledTechResearchedRow = styled.div`
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

export { AdminPages };
