import { intervalToDuration } from 'date-fns';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import _ from 'underscore';

import { agendaCardBack, agendaCardFaces } from './agendaCards';
import { accentColor } from './colors';
import {
    currentPlayerTurn,
    currentRoundNumber,
    Event,
    isActionPhaseStartedEvent,
    isAgendaCardRevealedEvent,
    isAgendaPhaseStartedEvent,
    isPlayerFinishedTurnEvent,
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

    return (
        <StyledStatusPage>
            <Stars />
            {lastEvent &&
                (isRoundStartedEvent(lastEvent) ? (
                    <SpreadColumnContainer>
                        <TitleContainer>
                            <Title>{`Round ${currentRoundNumber(events)}`}</Title>
                            <SubTitle>Strategy Phase</SubTitle>
                        </TitleContainer>
                        <TimeSpan>
                            {timeElapsedLabel(lastEvent, currentTime)}
                        </TimeSpan>
                    </SpreadColumnContainer>
                ) : activePlayer ? (
                    <SpreadColumnContainer>
                        <TitleContainer>
                            <Title>{`Round ${currentRoundNumber(events)}`}</Title>
                            <SubTitle>Action Phase</SubTitle>
                        </TitleContainer>
                        <CentralContainer>
                            <PlayerTurn>{`${activePlayer}`}</PlayerTurn>
                            <ScoresRow>
                                <ScoreComponent>(</ScoreComponent>
                                <ScoresContent>
                                    <VpScore>{`${playerScore(events, activePlayer)}VP`}</VpScore>
                                    <ResourcesScore>{`${resourcesAndInfluenceForFaction(events, activePlayer).resources}R`}</ResourcesScore>
                                    <InfluenceScore>{`${resourcesAndInfluenceForFaction(events, activePlayer).influence}I`}</InfluenceScore>
                                </ScoresContent>
                                <ScoreComponent>)</ScoreComponent>
                            </ScoresRow>
                        </CentralContainer>
                        {lastEventWhenPlayerTurnStarted && (
                            <TimeSpan>
                                {timeElapsedLabel(
                                    lastEventWhenPlayerTurnStarted,
                                    currentTime
                                )}
                            </TimeSpan>
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
                                            : agendaCardFaces[lastEvent.card]
                                    }
                                />
                            </AgendaCardContainer>
                        )}
                        <TimeSpan>
                            {timeElapsedLabel(lastEvent, currentTime)}
                        </TimeSpan>
                    </SpreadColumnContainer>
                ))}
        </StyledStatusPage>
    );
};

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
    display: flex;
    flex-direction: row;
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
`;

const Title = styled.h1`
    font-size: 11vw;
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
    gap: 2rem;
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
`;

const ScoreComponent = styled.h3`
    font-size: 10vw;
    text-transform: uppercase;
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
    color: red;
    text-align: center;
`;

const AgendaCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 40vh;

    > * {
        flex: 1 1 0;
    }
`;
const AgendaCard = styled.img`
    min-width: 0;
    min-height: 0;
`;

export { StatusPage };