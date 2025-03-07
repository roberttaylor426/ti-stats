import { formatDuration, intervalToDuration } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled, { css } from 'styled-components';
import _ from 'underscore';

import { agendaCardBack, agendaCardFaces } from './agendaCards';
import galaxyPhoto from './assets/ti-artwork.webp';
import { accentColor } from './colors';
import {
    currentPlayerTurnInActionPhase,
    currentPlayerTurnInStrategyPhase,
    currentRoundNumber,
    Event,
    factionsInGame,
    isAgendaCardRevealedEvent,
    isAgendaPhaseStartedEvent,
    isItAgendaPhase,
    isRoundEndedEvent,
    isRoundStartedEvent,
    isUnion,
    lastIndexOfEventType,
    planetsControlledByFaction,
    playerScore,
    playerSelectedStrategyCardEventsFromStrategyPhaseThisRound,
    resourcesAndInfluenceForFaction,
    strategyCardPlayedByPlayerOnPreviousTurnThisRound,
    TimesTaken,
    timesTakenPerPlayer,
} from './events';
import { Faction, factionSheetImage, superShortName } from './factions';
import {
    PlanetName,
    planets,
    PlanetTrait,
    ResourcesAndInfluence,
} from './planets';
import { numberOfPlayersInGame } from './playerColors';
import { strategyCardImage } from './strategyCards';
import { useEvents } from './useEvents';

const VerticalStatusPage: React.FC = () => {
    const { events } = useEvents(3_000);
    const [actionPhaseDisplayMode, setActionPhaseDisplayMode] =
        useState<ActionPhaseDisplayMode>('resources and influence');

    const [actionPhaseDisplayModeVisible, setActionPhaseDisplayModeVisible] =
        useState<ActionPhaseDisplayMode>('resources and influence');

    const resourcesAndInfluenceNodeRef = useRef(null);
    const strategyCardNodeRef = useRef(null);
    const planetsNodeRef = useRef(null);
    const timeTakenNodeRef = useRef(null);

    const lastEvent = _.last(events);

    useEffect(() => {
        const interval = setInterval(() => {
            setActionPhaseDisplayMode(
                nextDisplayMode(actionPhaseDisplayMode, events)
            );
        }, 10_000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [actionPhaseDisplayMode]);

    const activePlayerInStrategyPhase =
        currentPlayerTurnInStrategyPhase(events);
    const activePlayerInActionPhase = currentPlayerTurnInActionPhase(events);
    const strategyCardSelectedByActivePlayerInActionPhase =
        playerSelectedStrategyCardEventsFromStrategyPhaseThisRound(events).find(
            (e) => e.faction === activePlayerInActionPhase
        )?.strategyCard;

    const factions = factionsInGame(events);
    const planetsControlledByEachFaction = factions.reduce(
        (acc, n) => ({
            ...acc,
            [n]: planetsControlledByFaction(events, n),
        }),
        {} as Record<Faction, PlanetName[]>
    );
    const resourcesAndInfluenceForEachFaction = factions.reduce(
        (acc, n) => ({
            ...acc,
            [n]: resourcesAndInfluenceForFaction(events, n),
        }),
        {} as Record<Faction, ResourcesAndInfluence>
    );

    const timesTakenForEachFaction = timesTakenPerPlayer(events);

    const winningPlayer = _.first(
        factions
            .map((f) => ({
                faction: f,
                score: playerScore(events, f),
            }))
            .filter((fs) => fs.score >= 10)
    );

    return (
        <StyledVerticalStatusPage
            $backgroundImage={
                activePlayerInActionPhase
                    ? factionSheetImage(activePlayerInActionPhase)
                    : activePlayerInStrategyPhase
                      ? factionSheetImage(activePlayerInStrategyPhase)
                      : galaxyPhoto
            }
        >
            {lastEvent ? (
                winningPlayer ? (
                    <SpreadColumnContainer>
                        <div />
                        <Title>{`${winningPlayer.faction} wins!`}</Title>
                        <CentralContainer>
                            <Title>Time taken:</Title>
                            <TotalTime
                                events={events}
                                currentTime={lastEvent.time}
                            />
                        </CentralContainer>
                        <div />
                    </SpreadColumnContainer>
                ) : events.filter(isRoundStartedEvent).length > 0 ? (
                    activePlayerInStrategyPhase ||
                    _.last(events)?.type === 'PlayerSelectedStrategyCard' ? (
                        <StrategyCardGrid>
                            <StrategyCard
                                src={strategyCardImage(
                                    'Leadership',
                                    !!playerSelectedStrategyCardEventsFromStrategyPhaseThisRound(
                                        events
                                    ).find(
                                        (e) => e.strategyCard === 'Leadership'
                                    )
                                )}
                            />
                            <StrategyCard
                                src={strategyCardImage(
                                    'Diplomacy',
                                    !!playerSelectedStrategyCardEventsFromStrategyPhaseThisRound(
                                        events
                                    ).find(
                                        (e) => e.strategyCard === 'Diplomacy'
                                    )
                                )}
                            />
                            <StrategyCard
                                src={strategyCardImage(
                                    'Politics',
                                    !!playerSelectedStrategyCardEventsFromStrategyPhaseThisRound(
                                        events
                                    ).find((e) => e.strategyCard === 'Politics')
                                )}
                            />
                            <StrategyCard
                                src={strategyCardImage(
                                    'Construction',
                                    !!playerSelectedStrategyCardEventsFromStrategyPhaseThisRound(
                                        events
                                    ).find(
                                        (e) => e.strategyCard === 'Construction'
                                    )
                                )}
                            />
                            <StrategyCard
                                src={strategyCardImage(
                                    'Trade',
                                    !!playerSelectedStrategyCardEventsFromStrategyPhaseThisRound(
                                        events
                                    ).find((e) => e.strategyCard === 'Trade')
                                )}
                            />
                            <StrategyCard
                                src={strategyCardImage(
                                    'Warfare',
                                    !!playerSelectedStrategyCardEventsFromStrategyPhaseThisRound(
                                        events
                                    ).find((e) => e.strategyCard === 'Warfare')
                                )}
                            />
                            <StrategyCard
                                src={strategyCardImage(
                                    'Technology',
                                    !!playerSelectedStrategyCardEventsFromStrategyPhaseThisRound(
                                        events
                                    ).find(
                                        (e) => e.strategyCard === 'Technology'
                                    )
                                )}
                            />
                            <StrategyCard
                                src={strategyCardImage(
                                    'Imperial',
                                    !!playerSelectedStrategyCardEventsFromStrategyPhaseThisRound(
                                        events
                                    ).find((e) => e.strategyCard === 'Imperial')
                                )}
                            />
                        </StrategyCardGrid>
                    ) : isRoundEndedPageShown(events) ? (
                        <ColumnWithTitleContainer>
                            <TitleContainer>
                                <SubTitle>{`Round ${currentRoundNumber(events)}`}</SubTitle>
                            </TitleContainer>
                            <SpaceAroundColumn>
                                <CentralContainer>
                                    <StatTitle $mode={'large'}>
                                        Time taken:
                                    </StatTitle>
                                    <TimeSpan>
                                        {timeElapsedBetweenEvents(
                                            _.last(
                                                events.filter(
                                                    isRoundStartedEvent
                                                )
                                            )!,
                                            lastEvent
                                        )}
                                    </TimeSpan>
                                </CentralContainer>
                            </SpaceAroundColumn>
                        </ColumnWithTitleContainer>
                    ) : activePlayerInActionPhase ? (
                        <ColumnWithTitleContainer>
                            <TitleContainer>
                                <SubTitle>{`${superShortName(activePlayerInActionPhase)}`}</SubTitle>
                            </TitleContainer>

                            {actionPhaseDisplayModeVisible ===
                            'resources and influence' ? (
                                <CSSTransition
                                    nodeRef={resourcesAndInfluenceNodeRef}
                                    in={
                                        actionPhaseDisplayMode ===
                                        'resources and influence'
                                    }
                                    timeout={cssTransitionTimeout}
                                    classNames={'fadein'}
                                    onExited={() =>
                                        setActionPhaseDisplayModeVisible(
                                            nextDisplayMode(
                                                actionPhaseDisplayModeVisible,
                                                events
                                            )
                                        )
                                    }
                                >
                                    <SpaceAroundColumn
                                        ref={resourcesAndInfluenceNodeRef}
                                    >
                                        <StatsColumn>
                                            <InnerStatsColumn>
                                                <Stat
                                                    mode={'large'}
                                                    title={'Resources'}
                                                    stat={`${resourcesAndInfluenceForEachFaction[activePlayerInActionPhase].resources}`}
                                                    position={resourcesPositionLabel(
                                                        resourcesAndInfluenceForEachFaction,
                                                        activePlayerInActionPhase
                                                    )}
                                                    color={'yellow'}
                                                />

                                                <Stat
                                                    mode={'large'}
                                                    title={'Influence'}
                                                    stat={`${resourcesAndInfluenceForEachFaction[activePlayerInActionPhase].influence}`}
                                                    position={influencePositionLabel(
                                                        resourcesAndInfluenceForEachFaction,
                                                        activePlayerInActionPhase
                                                    )}
                                                    color={accentColor}
                                                />
                                            </InnerStatsColumn>
                                        </StatsColumn>
                                    </SpaceAroundColumn>
                                </CSSTransition>
                            ) : actionPhaseDisplayModeVisible ===
                              'strategy card' ? (
                                <CSSTransition
                                    nodeRef={strategyCardNodeRef}
                                    in={
                                        actionPhaseDisplayMode ===
                                        'strategy card'
                                    }
                                    timeout={cssTransitionTimeout}
                                    classNames={'fadein'}
                                    onExited={() =>
                                        setActionPhaseDisplayModeVisible(
                                            nextDisplayMode(
                                                actionPhaseDisplayModeVisible,
                                                events
                                            )
                                        )
                                    }
                                >
                                    <SpaceAroundColumn
                                        ref={strategyCardNodeRef}
                                    >
                                        {strategyCardSelectedByActivePlayerInActionPhase && (
                                            <ActionPhaseStrategyCardContainer>
                                                <StrategyCard
                                                    src={strategyCardImage(
                                                        strategyCardSelectedByActivePlayerInActionPhase,
                                                        strategyCardPlayedByPlayerOnPreviousTurnThisRound(
                                                            events,
                                                            activePlayerInActionPhase
                                                        )
                                                    )}
                                                />
                                            </ActionPhaseStrategyCardContainer>
                                        )}
                                    </SpaceAroundColumn>
                                </CSSTransition>
                            ) : actionPhaseDisplayModeVisible === 'planets' ? (
                                <CSSTransition
                                    nodeRef={planetsNodeRef}
                                    in={actionPhaseDisplayMode === 'planets'}
                                    timeout={cssTransitionTimeout}
                                    classNames={'fadein'}
                                    onExited={() =>
                                        setActionPhaseDisplayModeVisible(
                                            nextDisplayMode(
                                                actionPhaseDisplayModeVisible,
                                                events
                                            )
                                        )
                                    }
                                >
                                    <SpaceAroundColumn ref={planetsNodeRef}>
                                        <StatsRow>
                                            <StatsColumn>
                                                <InnerStatsColumn>
                                                    <Stat
                                                        mode={'small'}
                                                        title={'Planets'}
                                                        stat={`${planetsControlledByEachFaction[activePlayerInActionPhase].length}`}
                                                        position={planetsControlledPositionLabel(
                                                            planetsControlledByEachFaction,
                                                            activePlayerInActionPhase,
                                                            'any'
                                                        )}
                                                        color={'white'}
                                                    />

                                                    <Stat
                                                        mode={'small'}
                                                        title={'Hazardous'}
                                                        stat={`${planetsControlledByEachFaction[activePlayerInActionPhase].filter((p) => planets[p].trait === 'hazardous').length}`}
                                                        position={planetsControlledPositionLabel(
                                                            planetsControlledByEachFaction,
                                                            activePlayerInActionPhase,
                                                            'hazardous'
                                                        )}
                                                        color={'red'}
                                                    />
                                                </InnerStatsColumn>
                                            </StatsColumn>
                                            <StatsColumn>
                                                <InnerStatsColumn>
                                                    <Stat
                                                        mode={'small'}
                                                        title={'Cultural'}
                                                        stat={`${planetsControlledByEachFaction[activePlayerInActionPhase].filter((p) => planets[p].trait === 'cultural').length}`}
                                                        position={planetsControlledPositionLabel(
                                                            planetsControlledByEachFaction,
                                                            activePlayerInActionPhase,
                                                            'cultural'
                                                        )}
                                                        color={accentColor}
                                                    />

                                                    <Stat
                                                        mode={'small'}
                                                        title={'Industrial'}
                                                        stat={`${planetsControlledByEachFaction[activePlayerInActionPhase].filter((p) => planets[p].trait === 'industrial').length}`}
                                                        position={planetsControlledPositionLabel(
                                                            planetsControlledByEachFaction,
                                                            activePlayerInActionPhase,
                                                            'industrial'
                                                        )}
                                                        color={'green'}
                                                    />
                                                </InnerStatsColumn>
                                            </StatsColumn>
                                        </StatsRow>
                                    </SpaceAroundColumn>
                                </CSSTransition>
                            ) : (
                                <CSSTransition
                                    nodeRef={planetsNodeRef}
                                    in={actionPhaseDisplayMode === 'time taken'}
                                    timeout={cssTransitionTimeout}
                                    classNames={'fadein'}
                                    onExited={() =>
                                        setActionPhaseDisplayModeVisible(
                                            nextDisplayMode(
                                                actionPhaseDisplayModeVisible,
                                                events
                                            )
                                        )
                                    }
                                >
                                    <SpaceAroundColumn ref={timeTakenNodeRef}>
                                        <StatsColumn>
                                            <InnerStatsColumn>
                                                <Stat
                                                    mode={'small'}
                                                    title={
                                                        'Av. time taken per turn'
                                                    }
                                                    stat={`${formatDuration(
                                                        intervalToDuration({
                                                            start: 0,
                                                            end:
                                                                timesTakenForEachFaction.find(
                                                                    (t) =>
                                                                        t.faction ===
                                                                        activePlayerInActionPhase
                                                                )
                                                                    ?.avTimeTakenInMillis ||
                                                                0,
                                                        }),
                                                        {
                                                            zero: true,
                                                            format: [
                                                                'hours',
                                                                'minutes',
                                                                'seconds',
                                                            ],
                                                        }
                                                    )}`
                                                        .replace(/ /g, '')
                                                        .replace(/hours/, 'h')
                                                        .replace(/hour/, 'h')
                                                        .replace(/minutes/, 'm')
                                                        .replace(/minute/, 'm')
                                                        .replace('seconds', 's')
                                                        .replace('second', 's')}
                                                    position={avTimesTakenPositionLabel(
                                                        timesTakenForEachFaction,
                                                        activePlayerInActionPhase
                                                    )}
                                                    color={'yellow'}
                                                />

                                                <Stat
                                                    mode={'small'}
                                                    title={
                                                        'Max time taken per turn'
                                                    }
                                                    stat={`${formatDuration(
                                                        intervalToDuration({
                                                            start: 0,
                                                            end:
                                                                timesTakenForEachFaction.find(
                                                                    (t) =>
                                                                        t.faction ===
                                                                        activePlayerInActionPhase
                                                                )
                                                                    ?.maxTimeTakenInMillis ||
                                                                0,
                                                        }),
                                                        {
                                                            format: [
                                                                'hours',
                                                                'minutes',
                                                                'seconds',
                                                            ],
                                                        }
                                                    )}`
                                                        .replace(/ /g, '')
                                                        .replace(/hours/, 'h')
                                                        .replace(/hour/, 'h')
                                                        .replace(/minutes/, 'm')
                                                        .replace(/minute/, 'm')
                                                        .replace('seconds', 's')
                                                        .replace('second', 's')}
                                                    position={maxTimesTakenPositionLabel(
                                                        timesTakenForEachFaction,
                                                        activePlayerInActionPhase
                                                    )}
                                                    color={'yellow'}
                                                />
                                            </InnerStatsColumn>
                                        </StatsColumn>
                                    </SpaceAroundColumn>
                                </CSSTransition>
                            )}
                        </ColumnWithTitleContainer>
                    ) : (
                        <SpaceAroundColumn>
                            {isItAgendaPhase(events) && (
                                <AgendaCardContainer>
                                    <AgendaCard
                                        src={agendaCardImageToShowDuringAgendaPhase(
                                            events
                                        )}
                                    />
                                </AgendaCardContainer>
                            )}
                        </SpaceAroundColumn>
                    )
                ) : (
                    <h1>TODO</h1>
                )
            ) : (
                <h1>TODO</h1>
            )}
        </StyledVerticalStatusPage>
    );
};

const actionPhaseDisplayModes = [
    'resources and influence',
    'strategy card',
    'planets',
    'time taken',
] as const;

type ActionPhaseDisplayMode = (typeof actionPhaseDisplayModes)[number];

const nextDisplayMode = (
    currentDisplayMode: ActionPhaseDisplayMode,
    events: Event[]
): ActionPhaseDisplayMode =>
    actionPhaseDisplayModes[
        (actionPhaseDisplayModes.indexOf(currentDisplayMode) + 1) %
            (currentRoundNumber(events) > 1
                ? actionPhaseDisplayModes.length
                : actionPhaseDisplayModes.length - 1)
    ];

const planetsControlledPositionLabel = (
    planetsControlledByEachFaction: Record<Faction, PlanetName[]>,
    faction: Faction,
    planetTrait: PlanetTrait | 'any'
): string => {
    const factionsInGame = Object.keys(
        planetsControlledByEachFaction
    ) as Faction[];
    const numberOfPlanetsControlledByEachFaction = factionsInGame.reduce(
        (acc, n) => ({
            ...acc,
            [n]: planetsControlledByEachFaction[n].filter(
                (p) => planetTrait === 'any' || planetTrait === planets[p].trait
            ).length,
        }),
        {} as Record<Faction, number>
    );
    const anotherFactionHasTheSameNumberOfPlanetsControlled =
        factionsInGame.some(
            (f) =>
                f !== faction &&
                numberOfPlanetsControlledByEachFaction[f] ===
                    numberOfPlanetsControlledByEachFaction[faction]
        );
    const numberOfFactionsControllingMorePlanets = factionsInGame.reduce(
        (acc, n) =>
            acc +
            (n !== faction &&
            numberOfPlanetsControlledByEachFaction[n] >
                numberOfPlanetsControlledByEachFaction[faction]
                ? 1
                : 0),
        0
    );

    return positionLabel(
        numberOfFactionsControllingMorePlanets,
        anotherFactionHasTheSameNumberOfPlanetsControlled
    );
};

const resourcesPositionLabel = (
    resourcesForEachFaction: Record<Faction, ResourcesAndInfluence>,
    faction: Faction
): string => {
    const factionsInGame = Object.keys(resourcesForEachFaction) as Faction[];

    const anotherFactionHasTheSameAmountOfResources = factionsInGame.some(
        (f) =>
            f !== faction &&
            resourcesForEachFaction[f].resources ===
                resourcesForEachFaction[faction].resources
    );
    const numberOfFactionsWithMoreResources = factionsInGame.reduce(
        (acc, n) =>
            acc +
            (n !== faction &&
            resourcesForEachFaction[n].resources >
                resourcesForEachFaction[faction].resources
                ? 1
                : 0),
        0
    );

    return positionLabel(
        numberOfFactionsWithMoreResources,
        anotherFactionHasTheSameAmountOfResources
    );
};

const influencePositionLabel = (
    resourcesForEachFaction: Record<Faction, ResourcesAndInfluence>,
    faction: Faction
): string => {
    const factionsInGame = Object.keys(resourcesForEachFaction) as Faction[];

    const anotherFactionHasTheSameAmountOfInfluence = factionsInGame.some(
        (f) =>
            f !== faction &&
            resourcesForEachFaction[f].influence ===
                resourcesForEachFaction[faction].influence
    );
    const numberOfFactionsWithMoreInfluence = factionsInGame.reduce(
        (acc, n) =>
            acc +
            (n !== faction &&
            resourcesForEachFaction[n].influence >
                resourcesForEachFaction[faction].influence
                ? 1
                : 0),
        0
    );

    return positionLabel(
        numberOfFactionsWithMoreInfluence,
        anotherFactionHasTheSameAmountOfInfluence
    );
};

const avTimesTakenPositionLabel = (
    timesTaken: TimesTaken[],
    faction: Faction
): string => {
    const factionsInGame = timesTaken.map((tt) => tt.faction);

    const anotherFactionHasTheSameAvTime = factionsInGame.some(
        (f) =>
            f !== faction &&
            timesTaken.find((tt) => tt.faction === f)?.avTimeTakenInMillis ===
                timesTaken.find((tt) => tt.faction === faction)
                    ?.avTimeTakenInMillis
    );
    const numberOfFactionsWithLessAvTime = factionsInGame.reduce(
        (acc, n) =>
            acc +
            (n !== faction &&
            (timesTaken.find((tt) => tt.faction === n)?.avTimeTakenInMillis ||
                0) <
                (timesTaken.find((tt) => tt.faction === faction)
                    ?.avTimeTakenInMillis || 0)
                ? 1
                : 0),
        0
    );

    return timeBasedPositionLabel(
        numberOfFactionsWithLessAvTime,
        anotherFactionHasTheSameAvTime
    );
};

const maxTimesTakenPositionLabel = (
    timesTaken: TimesTaken[],
    faction: Faction
): string => {
    const factionsInGame = timesTaken.map((tt) => tt.faction);

    const anotherFactionHasTheSameMaxTime = factionsInGame.some(
        (f) =>
            f !== faction &&
            timesTaken.find((tt) => tt.faction === f)?.maxTimeTakenInMillis ===
                timesTaken.find((tt) => tt.faction === faction)
                    ?.maxTimeTakenInMillis
    );
    const numberOfFactionsWithLessMaxTime = factionsInGame.reduce(
        (acc, n) =>
            acc +
            (n !== faction &&
            (timesTaken.find((tt) => tt.faction === n)?.maxTimeTakenInMillis ||
                0) <
                (timesTaken.find((tt) => tt.faction === faction)
                    ?.maxTimeTakenInMillis || 0)
                ? 1
                : 0),
        0
    );

    return timeBasedPositionLabel(
        numberOfFactionsWithLessMaxTime,
        anotherFactionHasTheSameMaxTime
    );
};

const positionLabel = (
    numberOfFactionsWithMore: number,
    anotherFactionHasTheSameAmount: boolean
): string => {
    const position = positionGivenNumberOfFactionsAhead(
        numberOfFactionsWithMore
    );

    return anotherFactionHasTheSameAmount ? `${position}=` : position;
};

const timeBasedPositionLabel = (
    numberOfFactionsWithMore: number,
    anotherFactionHasTheSameAmount: boolean
) => {
    const label = positionLabel(
        numberOfFactionsWithMore,
        anotherFactionHasTheSameAmount
    );

    return label === '1st'
        ? 'Fastest'
        : label === `${numberOfPlayersInGame}th`
          ? 'Slowest'
          : `${label} fastest`;
};

const positionGivenNumberOfFactionsAhead = (n: number) =>
    n === 0 ? '1st' : n === 1 ? '2nd' : n === 2 ? '3rd' : `${n + 1}th`;

const isRoundEndedPageShown = (events: Event[]): boolean => {
    const lastRoundEndedIndex = lastIndexOfEventType(events, isRoundEndedEvent);
    const lastRoundStartedIndex = lastIndexOfEventType(
        events,
        isRoundStartedEvent
    );

    return lastRoundEndedIndex > lastRoundStartedIndex;
};

const timeElapsedBetweenEvents = (e1: Event, e2: Event): string =>
    timeElapsedLabel(e1, e2.time);

const timeElapsedLabel = (e: Event, currentTime: number): string =>
    `${timeComponent(
        intervalToDuration({
            start: e.time,
            end: currentTime,
        }).hours
    )}:${timeComponent(
        intervalToDuration({
            start: e.time,
            end: currentTime,
        }).minutes
    )}:${timeComponent(
        intervalToDuration({
            start: e.time,
            end: currentTime,
        }).seconds
    )}`;

const timeComponent = (n: number | undefined): string => {
    if (!n) {
        return '00';
    }

    if (n < 10) {
        return `0${n}`;
    }

    return `${n}`;
};

type StyledVerticalStatusPageProps = {
    $backgroundImage: string;
};

const StyledVerticalStatusPage = styled.div<StyledVerticalStatusPageProps>`
    display: grid;
    grid-template-areas: 'layer';
    line-height: 1.1;
    background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
        url(${(props) => props.$backgroundImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom left;

    > * {
        grid-area: layer;
    }
`;

const SpreadColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
`;

const ColumnWithTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 10vh;

    > :nth-child(2) {
        flex: 1 1 0;
    }
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.h1`
    font-size: 6vh;
    padding: 0 0.5rem;
    background-color: ${accentColor};
    text-align: center;
    text-transform: uppercase;
    text-shadow: 0.3vh 0.3vh 0.6vh black;
`;

const SubTitle = styled.h2`
    font-size: 8vh;
    color: white;
    text-align: center;
    background-color: black;
    text-shadow: 0.3vh 0.3vh 0.6vh grey;
`;

const fadeInCss = css`
    &.fadein-enter {
        opacity: 0;
    }

    &.fadein-enter-active {
        opacity: 1;
        transition: opacity 500ms;
    }

    &.fadein-exit {
        opacity: 1;
    }

    &.fadein-exit-active {
        opacity: 0;
        transition: opacity 500ms;
    }
`;

const SpaceAroundColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    ${fadeInCss};
`;

const StrategyCardGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    grid-gap: 1vh;
    margin: 1vh;
    overflow-y: hidden;
    filter: drop-shadow(1vh 0 1vh grey);

    > * {
        object-fit: contain;
        height: 100%;
        max-width: 100%;
    }
`;

const StatsColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StatsRow = styled.div`
    display: flex;

    > * {
        flex: 1 1 0;
    }
`;

const InnerStatsColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10vh;
`;

type StatMode = 'small' | 'large';

type StatProps = {
    mode: StatMode;
    title: string;
    stat: string;
    position: string;
    color?: string;
};

const Stat: React.FC<StatProps> = ({ mode, title, stat, position, color }) => (
    <StyledStat $mode={mode}>
        <StatTitle $mode={mode}>{title}</StatTitle>
        <StatValue $mode={mode} $color={color}>
            {stat}
        </StatValue>
        <StatPosition $mode={mode}>{position}</StatPosition>
    </StyledStat>
);

type StatModeProps = {
    $mode: StatMode;
};

const StyledStat = styled.div<StatModeProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #000000bb;
    padding: ${(props) => (props.$mode === 'large' ? '2vh 3vh' : '1vh 2vh')};
`;

const StatTitle = styled.span<StatModeProps>`
    font-size: ${(props) => (props.$mode === 'large' ? '5vh' : '4vh')};
`;

type StatValueProps = StatModeProps & {
    $color?: string;
};

const StatValue = styled.span<StatValueProps>`
    font-size: ${(props) => (props.$mode === 'large' ? '15vh' : '12vh')};
    color: ${(props) => props.$color || 'white'};
`;

const StatPosition = styled.span<StatModeProps>`
    font-size: ${(props) => (props.$mode === 'large' ? '5vh' : '4vh')};
`;

const CentralContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #000000bb;
    padding: 2vh 3vh;
    align-items: center;
    gap: 1vh;
`;

const ActionPhaseStrategyCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50vh;
    filter: drop-shadow(1vh 0 1vh grey);

    > * {
        flex: 1 1 0;
    }
`;

const StrategyCard = styled.img`
    min-width: 0;
    min-height: 0;
`;

const TimeSpan = styled.span`
    font-family: 'Alarm Clock', 'sans-serif';
    font-size: 21vw;
    text-align: center;
    color: yellow;
    line-height: 0.9;
`;

type TotalTimeProps = {
    events: Event[];
    currentTime: number;
};

const TotalTime: React.FC<TotalTimeProps> = ({ events, currentTime }) => (
    <TotalTimeSpan>
        {timeElapsedLabel(
            _.first(events.filter(isRoundStartedEvent))!,
            currentTime
        )}
    </TotalTimeSpan>
);

const TotalTimeSpan = styled(TimeSpan)`
    color: red;
`;

const AgendaCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50vh;
    filter: drop-shadow(1vh 0 1vh grey);

    > * {
        flex: 1 1 0;
    }
`;

const AgendaCard = styled.img`
    min-width: 0;
    min-height: 0;
`;

const agendaCardImageToShowDuringAgendaPhase = (events: Event[]): string => {
    const lastAgendaPhaseEvent = _.last(
        events.filter(
            isUnion(isAgendaPhaseStartedEvent, isAgendaCardRevealedEvent)
        )
    );

    return !!lastAgendaPhaseEvent &&
        isAgendaCardRevealedEvent(lastAgendaPhaseEvent)
        ? agendaCardFaces[lastAgendaPhaseEvent.card]
        : agendaCardBack;
};

const cssTransitionTimeout = 500;

export { ActionPhaseDisplayMode, nextDisplayMode, VerticalStatusPage };
