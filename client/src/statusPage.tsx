import { intervalToDuration } from 'date-fns';
import { formatDate } from 'date-fns/format';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import _ from 'underscore';

import { agendaCardBack, agendaCardFaces } from './agendaCards';
import { accentColor } from './colors';
import {
    currentPlayerTurn,
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
    playerScore,
    resourcesAndInfluenceForFaction,
} from './events';
import { Stars } from './stars';
import { useEvents } from './useEvents';

const StatusPage: React.FC = () => {
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

    const activePlayer = currentPlayerTurn(events);

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
            <Stars />
            {lastEvent ? (
                winningPlayer ? (
                    <SpreadColumnContainer>
                        <TitleContainer />
                        <Title>{`${winningPlayer.faction} wins!`}</Title>

                        <CentralContainer>
                            <Title>Time taken:</Title>
                            <TotalTime
                                events={events}
                                currentTime={lastEvent.time}
                            />
                        </CentralContainer>
                        <BottomContainer />
                    </SpreadColumnContainer>
                ) : events.filter(isRoundStartedEvent).length > 0 ? (
                    isRoundStartedEvent(lastEvent) ? (
                        <SpreadColumnContainer>
                            <TitleContainer>
                                <Title>{`Round ${currentRoundNumber(events)}`}</Title>
                                <SubTitle>Strategy Phase</SubTitle>
                            </TitleContainer>
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
                    ) : isRoundEndedEvent(lastEvent) ? (
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
                            <TotalTimeSpan>
                                {timeElapsedLabel(
                                    _.first(
                                        events.filter(isRoundStartedEvent)
                                    )!,
                                    currentTime
                                )}
                            </TotalTimeSpan>
                        </SpreadColumnContainer>
                    ) : activePlayer ? (
                        <SpreadColumnContainer>
                            <TitleContainer>
                                <Title>{`Round ${currentRoundNumber(events)}`}</Title>
                                <SubTitle>Action Phase</SubTitle>
                            </TitleContainer>
                            <CentralContainer>
                                <PlayerTurn>{`${activePlayer} turn`}</PlayerTurn>
                                <ScoresRow>
                                    <ScoresContent>
                                        <VpScore>{`${playerScore(events, activePlayer)}VP`}</VpScore>
                                        <ResourcesScore>{`${resourcesAndInfluenceForFaction(events, activePlayer).resources}`}</ResourcesScore>
                                        <InfluenceScore>{`${resourcesAndInfluenceForFaction(events, activePlayer).influence}`}</InfluenceScore>
                                    </ScoresContent>
                                </ScoresRow>
                            </CentralContainer>
                            {lastEventWhenPlayerTurnStarted && (
                                <BottomContainer>
                                    <TimeSpan>
                                        {timeElapsedLabel(
                                            lastEventWhenPlayerTurnStarted,
                                            currentTime
                                        )}
                                    </TimeSpan>
                                    <TotalTime
                                        events={events}
                                        currentTime={currentTime}
                                    />
                                </BottomContainer>
                            )}
                        </SpreadColumnContainer>
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

    > * {
        grid-area: layer;
    }
`;

const SpreadColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 1 0;
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: ${accentColor}88 solid 1px;
    background-color: black;
`;

const Title = styled.h1`
    font-size: 11vw;
    padding: 0 0.5rem;
    text-align: center;
`;

const SubTitle = styled.h2`
    font-size: 11vw;
    color: ${accentColor};
    text-align: center;
    text-transform: uppercase;
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

const TimeSpan = styled.span`
    font-family: 'Alarm Clock', 'sans-serif';
    font-size: 22vw;
    text-align: center;
    color: yellow;
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
        <SubTitle>{formatDate(new Date(currentTime), 'PPP')}</SubTitle>
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

export { StatusPage };
