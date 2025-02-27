import { intervalToDuration } from 'date-fns';
import { formatDate } from 'date-fns/format';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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
    isActionPhaseStartedEvent,
    isAgendaCardRevealedEvent,
    isAgendaPhaseStartedEvent,
    isPlayerFinishedTurnEvent,
    isRoundEndedEvent,
    isRoundStartedEvent,
    isUnion,
    lastIndexOfEventType,
    playerScore,
    playerSelectedStrategyCardEventFromLastStrategyPhase,
} from './events';
import { shortName, superShortName } from './factions';
import { useEvents } from './useEvents';

const StatusPage2: React.FC = () => {
    const { events } = useEvents(3_000);
    const [currentTime, setCurrentTime] = useState(new Date().getTime());

    const lastEvent = _.last(events);

    const lastEventWhenPlayerTurnStarted = _.last(
        events.filter(
            isUnion(isActionPhaseStartedEvent, isPlayerFinishedTurnEvent)
        )
    );

    useEffect(() => {
        const interval = setInterval(
            () => setCurrentTime(new Date().getTime()),
            1_000
        );
        return () => clearInterval(interval);
    }, []);

    const activePlayerInStrategyPhase =
        currentPlayerTurnInStrategyPhase(events);
    const activePlayerInActionPhase = currentPlayerTurnInActionPhase(events);
    const strategyCardSelectedByActivePlayerInActionPhase =
        playerSelectedStrategyCardEventFromLastStrategyPhase(events).find(
            (e) => e.faction === activePlayerInActionPhase
        )?.strategyCard;

    const winningPlayer = _.first(
        factionsInGame(events)
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
                                <Title>STATS</Title>
                            </TitleContainer>
                            <StatsColumn>
                                <StatsRow>
                                    <Stat
                                        title={'Resources'}
                                        stat={'12'}
                                        position={'6th'}
                                        color={'yellow'}
                                    />
                                    <Stat
                                        title={'Influence'}
                                        stat={'9'}
                                        position={'1st'}
                                        color={accentColor}
                                    />
                                </StatsRow>
                                <StatsRow>
                                    <Stat
                                        title={'Planets'}
                                        stat={'7'}
                                        position={'2nd'}
                                    />
                                    <Stat
                                        title={'VPs'}
                                        stat={'2'}
                                        position={'1st'}
                                    />
                                </StatsRow>
                            </StatsColumn>
                            {/*<StrategyCardContainer>*/}
                            {/*    <StrategyCard*/}
                            {/*        src={strategyCardImage(*/}
                            {/*            strategyCardSelectedByActivePlayerInActionPhase,*/}
                            {/*            strategyCardPlayedByPlayerOnPreviousTurnThisRound(*/}
                            {/*                events,*/}
                            {/*                activePlayerInActionPhase*/}
                            {/*            )*/}
                            {/*        )}*/}
                            {/*    />*/}
                            {/*</StrategyCardContainer>*/}
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
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
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
    box-shadow: 0 1vh 1vh grey;
`;

const Title = styled.h1`
    font-size: 6vh;
    padding: 0 0.5rem;
    background-color: ${accentColor};
    text-align: center;
    text-transform: uppercase;
    text-shadow: 0.3vh 0.3vh 0.6vh black;
    animation: flip 2s;

    @keyframes flip {
        0%,
        80% {
            transform: rotateX(360deg);
        }
    }
`;

const SubTitle = styled.h2`
    font-size: 8vh;
    color: white;
    text-align: center;
    background-color: black;
    text-shadow: 0.3vh 0.3vh 0.6vh grey;
`;

const StatsColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const StatsRow = styled.div`
    display: flex;
    justify-content: space-around;

    > * {
        flex: 1 1 0;
    }
`;

type StatProps = {
    title: string;
    stat: string;
    position: string;
    color?: string;
};

const Stat: React.FC<StatProps> = ({ title, stat, position, color }) => (
    <StyledStat>
        <StatTitle>{title}</StatTitle>
        <StatValue $color={color}>{stat}</StatValue>
        <StatPosition>{position}</StatPosition>
    </StyledStat>
);

const StyledStat = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StatTitle = styled.span`
    font-size: 5vh;
`;

type StatValueProps = {
    $color?: string;
};

const StatValue = styled.span<StatValueProps>`
    font-size: 15vh;
    color: ${(props) => props.$color || 'white'};
`;

const StatPosition = styled.span`
    font-size: 5vh;
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

const ScoresRow = styled.div`
    display: flex;
    justify-content: center;
`;

const ScoresContent = styled.div`
    display: flex;
    justify-content: center;
    gap: 2rem;
    line-height: 1;

    > * + * {
        border-left: 0.125rem white solid;
        padding-left: 2rem;
    }
`;

const ScoreComponent = styled.h3`
    font-size: 10vw;
`;

const VpScore = styled(ScoreComponent)`
    color: white;
`;

const ResourcesScore = styled(ScoreComponent)`
    color: yellow;
`;

const InfluenceScore = styled(ScoreComponent)`
    color: ${accentColor};
`;

const StrategyCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 25vh;
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
