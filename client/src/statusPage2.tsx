import { intervalToDuration } from 'date-fns';
import { formatDate } from 'date-fns/format';
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
    isRoundEndedEvent,
    isRoundStartedEvent,
    isUnion,
    lastIndexOfEventType,
    planetsControlledByFaction,
    playerScore,
    playerSelectedStrategyCardEventFromLastStrategyPhase,
    resourcesAndInfluenceForFaction,
    strategyCardPlayedByPlayerOnPreviousTurnThisRound,
} from './events';
import { Faction, shortName, superShortName } from './factions';
import {
    PlanetName,
    planets,
    PlanetTrait,
    ResourcesAndInfluence,
} from './planets';
import { strategyCardImage } from './strategyCards';
import { useEvents } from './useEvents';

const StatusPage2: React.FC = () => {
    const { events } = useEvents(3_000);
    const [currentTime, setCurrentTime] = useState(new Date().getTime());
    const [actionPhaseDisplayMode, setActionPhaseDisplayMode] =
        useState<ActionPhaseDisplayMode>('resources and influence');

    const [actionPhaseDisplayModeVisible, setActionPhaseDisplayModeVisible] =
        useState<ActionPhaseDisplayMode>('resources and influence');

    const resourcesAndInfluenceNodeRef = useRef(null);
    const strategyCardNodeRef = useRef(null);
    const planetsNodeRef = useRef(null);

    const lastEvent = _.last(events);

    // const lastEventWhenPlayerTurnStarted = _.last(
    //     events.filter(
    //         isUnion(isActionPhaseStartedEvent, isPlayerFinishedTurnEvent)
    //     )
    // );

    useEffect(() => {
        const interval = setInterval(
            () => setCurrentTime(new Date().getTime()),
            1_000
        );
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActionPhaseDisplayMode(
                actionPhaseDisplayModes[
                    (actionPhaseDisplayModes.indexOf(actionPhaseDisplayMode) +
                        1) %
                        actionPhaseDisplayModes.length
                ]
            );
        }, 10_000);
        return () => clearInterval(interval);
    }, [actionPhaseDisplayMode]);

    const activePlayerInStrategyPhase =
        currentPlayerTurnInStrategyPhase(events);
    const activePlayerInActionPhase = currentPlayerTurnInActionPhase(events);
    const strategyCardSelectedByActivePlayerInActionPhase =
        playerSelectedStrategyCardEventFromLastStrategyPhase(events).find(
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

    const winningPlayer = _.first(
        factions
            .map((f) => ({
                faction: f,
                score: playerScore(events, f),
            }))
            .filter((fs) => fs.score >= 10)
    );

    return (
        <StyledStatusPage>
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
                        <SpreadColumnContainer>
                            <TitleContainer>
                                <Title>{`Round ${currentRoundNumber(events)}`}</Title>
                                <SubTitle>Strategy Phase</SubTitle>
                            </TitleContainer>
                            {activePlayerInStrategyPhase && (
                                <CentralContainer>
                                    <PlayerTurn>{`${shortName(activePlayerInStrategyPhase)}`}</PlayerTurn>
                                </CentralContainer>
                            )}
                            <BottomContainer>
                                <TimeSpan>
                                    {timeElapsedLabel(lastEvent, currentTime)}
                                </TimeSpan>
                                <TotalTime
                                    events={events}
                                    currentTime={currentTime}
                                />
                            </BottomContainer>
                        </SpreadColumnContainer>
                    ) : isRoundEndedPageShown(events) ? (
                        <SpreadColumnContainer>
                            <TitleContainer>
                                <Title>{`Round ${currentRoundNumber(events) - 1} complete`}</Title>
                            </TitleContainer>
                            <CentralContainer>
                                <Title>Time taken:</Title>
                                <TimeSpan>
                                    {timeElapsedBetweenEvents(
                                        _.last(
                                            events.filter(isRoundStartedEvent)
                                        )!,
                                        lastEvent
                                    )}
                                </TimeSpan>
                            </CentralContainer>
                            <BottomContainer>
                                <TotalTimeSpan>
                                    {timeElapsedLabel(
                                        _.first(
                                            events.filter(isRoundStartedEvent)
                                        )!,
                                        currentTime
                                    )}
                                </TotalTimeSpan>
                            </BottomContainer>
                        </SpreadColumnContainer>
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
                                    timeout={500}
                                    classNames={'fadein'}
                                    onExited={() =>
                                        setActionPhaseDisplayModeVisible(
                                            'strategy card'
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
                                                    position={resourcesPosition(
                                                        resourcesAndInfluenceForEachFaction,
                                                        activePlayerInActionPhase
                                                    )}
                                                    color={'yellow'}
                                                />

                                                <Stat
                                                    mode={'large'}
                                                    title={'Influence'}
                                                    stat={`${resourcesAndInfluenceForEachFaction[activePlayerInActionPhase].influence}`}
                                                    position={influencePosition(
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
                                    timeout={500}
                                    classNames={'fadein'}
                                    onExited={() =>
                                        setActionPhaseDisplayModeVisible(
                                            'planets'
                                        )
                                    }
                                >
                                    <SpaceAroundColumn
                                        ref={strategyCardNodeRef}
                                    >
                                        {strategyCardSelectedByActivePlayerInActionPhase && (
                                            <StrategyCardContainer>
                                                <StrategyCard
                                                    src={strategyCardImage(
                                                        strategyCardSelectedByActivePlayerInActionPhase,
                                                        strategyCardPlayedByPlayerOnPreviousTurnThisRound(
                                                            events,
                                                            activePlayerInActionPhase
                                                        )
                                                    )}
                                                />
                                            </StrategyCardContainer>
                                        )}
                                    </SpaceAroundColumn>
                                </CSSTransition>
                            ) : (
                                <CSSTransition
                                    nodeRef={planetsNodeRef}
                                    in={actionPhaseDisplayMode === 'planets'}
                                    timeout={500}
                                    classNames={'fadein'}
                                    onExited={() =>
                                        setActionPhaseDisplayModeVisible(
                                            'resources and influence'
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
                                                        position={planetsControlledPosition(
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
                                                        position={planetsControlledPosition(
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
                                                        position={planetsControlledPosition(
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
                                                        position={planetsControlledPosition(
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
                            )}
                        </ColumnWithTitleContainer>
                    ) : (
                        <SpreadColumnContainer>
                            <TitleContainer>
                                <Title>{`Round ${currentRoundNumber(events)}`}</Title>
                                <SubTitle>{`${isUnion(isAgendaPhaseStartedEvent, isAgendaCardRevealedEvent)(lastEvent) ? 'Agenda' : 'Status'} Phase`}</SubTitle>
                            </TitleContainer>
                            {isUnion(
                                isAgendaPhaseStartedEvent,
                                isAgendaCardRevealedEvent
                            )(lastEvent) && (
                                <AgendaCardContainer>
                                    <AgendaCard
                                        src={
                                            isAgendaPhaseStartedEvent(lastEvent)
                                                ? agendaCardBack
                                                : agendaCardFaces[
                                                      lastEvent.card
                                                  ]
                                        }
                                    />
                                </AgendaCardContainer>
                            )}
                            <BottomContainer>
                                <TimeSpan>
                                    {timeElapsedLabel(lastEvent, currentTime)}
                                </TimeSpan>
                                <TotalTime
                                    events={events}
                                    currentTime={currentTime}
                                />
                            </BottomContainer>
                        </SpreadColumnContainer>
                    )
                ) : (
                    <HoldingScreen currentTime={currentTime} />
                )
            ) : (
                <HoldingScreen currentTime={currentTime} />
            )}
        </StyledStatusPage>
    );
};

const actionPhaseDisplayModes = [
    'resources and influence',
    'strategy card',
    'planets',
] as const;

type ActionPhaseDisplayMode = (typeof actionPhaseDisplayModes)[number];

const planetsControlledPosition = (
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
            (n === faction ||
            numberOfPlanetsControlledByEachFaction[faction] >=
                numberOfPlanetsControlledByEachFaction[n]
                ? 0
                : 1),
        0
    );

    return positionLabel(
        numberOfFactionsControllingMorePlanets,
        anotherFactionHasTheSameNumberOfPlanetsControlled
    );
};

const resourcesPosition = (
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
            (n === faction ||
            resourcesForEachFaction[faction].resources >=
                resourcesForEachFaction[n].resources
                ? 0
                : 1),
        0
    );

    return positionLabel(
        numberOfFactionsWithMoreResources,
        anotherFactionHasTheSameAmountOfResources
    );
};

const influencePosition = (
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
            (n === faction ||
            resourcesForEachFaction[faction].influence >=
                resourcesForEachFaction[n].influence
                ? 0
                : 1),
        0
    );

    return positionLabel(
        numberOfFactionsWithMoreInfluence,
        anotherFactionHasTheSameAmountOfInfluence
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

const StyledStatusPage = styled.div`
    display: grid;
    grid-template-areas: 'layer';
    line-height: 1.1;
    background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
        url(${galaxyPhoto});
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
    align-items: center;
    gap: 1rem;
`;

const BottomContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: ${accentColor}88 solid 1px;
    background-color: black;
    padding: 0.5rem 0;
`;

const PlayerTurn = styled.h1`
    font-size: 16vw;
    text-align: center;
`;

const StrategyCardContainer = styled.div`
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

type HoldingScreenProps = {
    currentTime: number;
};

const HoldingScreen: React.FC<HoldingScreenProps> = ({ currentTime }) => (
    <SpreadColumnContainer>
        <div />
        <Title>{'Pax Magnifica Bellum Gloriosum'}</Title>
        <SubTitle>
            {formatDate(new Date(currentTime), 'PPP').replace(/,/g, '')}
        </SubTitle>
        <div />
    </SpreadColumnContainer>
);

const AgendaCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 45vh;

    > * {
        flex: 1 1 0;
    }
`;

const AgendaCard = styled.img`
    min-width: 0;
    min-height: 0;
`;

export { StatusPage2 };
