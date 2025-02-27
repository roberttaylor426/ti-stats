import { intervalToDuration } from 'date-fns';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import _ from 'underscore';

import { accentColor } from './colors';
import {
    currentPlayerTurnInActionPhase,
    currentRoundNumber,
    Event,
    isRoundStartedEvent,
} from './events';
import { Faction, shortName } from './factions';
import {
    planetlessSystemTileDescription,
    systemWithPlanetsTileDescription,
} from './systemTiles';
import { useEvents } from './useEvents';

const TickerPage: React.FC = () => {
    const { events } = useEvents(3_000);
    const [currentTime, setCurrentTime] = useState(new Date().getTime());

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

    // const activePlayerInStrategyPhase =
    //     currentPlayerTurnInStrategyPhase(events);
    const activePlayerInActionPhase = currentPlayerTurnInActionPhase(events);
    // const strategyCardSelectedByActivePlayerInActionPhase =
    //     playerSelectedStrategyCardEventFromLastStrategyPhase(events).find(
    //         (e) => e.faction === activePlayerInActionPhase
    //     )?.strategyCard;

    // const winningPlayer = _.first(
    //     factionsInGame(events)
    //         .map((f) => ({
    //             faction: f,
    //             score: playerScore(events, f),
    //         }))
    //         .filter((fs) => fs.score >= 10)
    // );

    return (
        <StyledTickerPage>
            {lastEvent && activePlayerInActionPhase ? (
                <Ticker>
                    <TickerRow>
                        <RoundAndPhase>
                            <RoundAndPhaseColumn>
                                <SubTitle>ACTION</SubTitle>
                                <SubTitle>PHASE</SubTitle>
                            </RoundAndPhaseColumn>
                            <RoundAndPhaseColumnTriangle />
                        </RoundAndPhase>
                        <TickerContent>
                            <TickerText>
                                <KeyTitle>
                                    {`${shortName(activePlayerInActionPhase)}`}{' '}
                                    turn
                                </KeyTitle>
                            </TickerText>
                            <TickerTriangle />
                        </TickerContent>
                        <Times>
                            <TimeSpan>
                                {timeElapsedLabel(lastEvent, currentTime)}
                            </TimeSpan>
                            <TotalTime
                                events={events}
                                currentTime={currentTime}
                            />
                        </Times>
                    </TickerRow>
                    <ScrollingTickerContainer>
                        <ScrollingTicker>
                            <ScrollingTickerText>
                                {generateMarqueeText(events)}&nbsp;++&nbsp;
                            </ScrollingTickerText>
                            <ScrollingTickerText>
                                {generateMarqueeText(events)}&nbsp;++&nbsp;
                            </ScrollingTickerText>
                        </ScrollingTicker>
                        <ScrollingTickerRoundOverlayContainer>
                            <ScrollingTickerRoundOverlay>
                                <Title>{`Round ${currentRoundNumber(events)}`}</Title>
                            </ScrollingTickerRoundOverlay>
                            <ScrollingTickerRoundOverlayTriangle />
                        </ScrollingTickerRoundOverlayContainer>
                    </ScrollingTickerContainer>
                </Ticker>
            ) : (
                <h1>TODO</h1>
            )}
        </StyledTickerPage>
    );
};

const factionWithLowercaseArticle = (f: Faction): string =>
    f.replace(/^The/, 'the');

const randomStrategyCardSelectionVerb = (t: number): string => {
    const verbs = [
        'picked',
        'selected',
        'chose',
        'grabbed',
        'took',
        'snatched',
        'nabbed',
        'went for',
        'opted for',
    ];
    return verbs[t % (verbs.length - 1)];
};

const randomStrategyCardPlayedVerb = (t: number): string => {
    const verbs = ['played', 'popped', 'used'];
    return verbs[t % (verbs.length - 1)];
};

const randomPlanetControlledVerb = (t: number): string => {
    const verbs = ['captured', 'controlled', 'conquered', 'took'];
    return verbs[t % (verbs.length - 1)];
};

const generateMarqueeText = (events: Event[]) => {
    const singleMarqueeMessage = events
        .map((e) => {
            switch (e.type) {
                case 'AgendaPhaseStarted':
                case 'ActionPhaseStarted':
                case 'AgendaCardRevealed':
                case 'MapTilesSelected':
                case 'PlayersAssignedFactionsAndColors':
                case 'PlayerFinishedTurn':
                case 'PlayerScoredVictoryPoint':
                case 'RoundEnded':
                case 'RoundStarted':
                case 'PlanetEnhanced':
                    return '';
                case 'MapTileAddedToBoard':
                    return `Star charts reveal new planets: ${systemWithPlanetsTileDescription(e.tileNumber)}`;
                case 'MiragePlanetFound':
                    return `Mirage revealed by ${factionWithLowercaseArticle(e.faction)}`;
                case 'PlanetControlled':
                    return `${e.planet} ${randomPlanetControlledVerb(e.time)} by ${factionWithLowercaseArticle(e.faction)}`;
                case 'PlanetDestroyed':
                    return `${e.planet} DESTROYED by ${factionWithLowercaseArticle(e.faction)}`;
                case 'PlanetlessSystemControlled':
                    return `${e.faction} established control of a planet-less system: ${planetlessSystemTileDescription(e.tileNumber)}`;
                case 'PlayerSelectedStrategyCard':
                    return `${e.faction} ${randomStrategyCardSelectionVerb(e.time)} ${e.strategyCard}`;
                case 'SpeakerAssigned':
                    return `${e.faction} became speaker`;
                case 'PlayerPlayedStrategyCard':
                    return `${e.faction} ${randomStrategyCardPlayedVerb(e.time)} ${e.strategyCard}`;
                case 'PlayerResearchedTechnology':
                    return `${e.faction} researched ${e.technology.name}`;
            }
        })
        .filter((t) => t.length > 0)
        .slice(-10)
        .join(' ++ ');
    return [singleMarqueeMessage, singleMarqueeMessage].join(' ++ ');
};

const Ticker = styled.div`
    display: flex;
    flex-direction: column;
`;

const TickerRow = styled.div`
    display: flex;
    background-color: white;
    gap: 10vh;

    > :nth-child(2) {
        flex-grow: 1;
    }
`;

const RoundAndPhase = styled.div`
    display: flex;
    filter: drop-shadow(4vh 0 4vh grey);
`;

const RoundAndPhaseColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${accentColor};
    text-shadow: black 1vh 1vh 2vh;
    padding: 5vh;
`;

const RoundAndPhaseColumnTriangle = styled.div`
    width: 30vh;
    background-color: ${accentColor};
    clip-path: polygon(0 0, 0 100%, 100% 0);
`;

const TickerContent = styled.div`
    display: flex;
    clip-path: polygon(0 0, 0 100%, 110% 100%, 110% 0);
    filter: drop-shadow(4vh 0 4vh grey);

    > :nth-child(1) {
        flex-grow: 1;
    }
`;

const TickerText = styled.div`
    display: flex;
    align-items: center;
    background-color: white;
    padding-right: 10vh;
`;

const TickerTriangle = styled.div`
    width: 30vh;
    background-color: white;
    clip-path: polygon(0 0, 0 100%, 100% 0);
`;

const ScrollingTickerContainer = styled.div`
    display: grid;
    grid-template-areas: 'layer';

    > * {
        grid-area: layer;
    }
`;

const ScrollingTicker = styled.div`
    display: flex;
    align-items: center;
    background-color: yellow;
    padding: 2vh 0;
    white-space: nowrap;
    overflow: hidden;
`;

const ScrollingTickerText = styled.span`
    color: black;
    font-size: 15vh;
    max-width: none !important;
    animation: marquee 120s linear infinite;

    @keyframes marquee {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(-100%, 0);
        }
    }
`;

const ScrollingTickerRoundOverlayContainer = styled.div`
    display: flex;
    filter: drop-shadow(4vh 0 4vh grey);
`;

const ScrollingTickerRoundOverlay = styled.div`
    display: flex;
    background-color: red;
    text-shadow: black 1vh 1vh 2vh;
    padding: 2vh 5vh;
`;

const ScrollingTickerRoundOverlayTriangle = styled.div`
    width: 12vh;
    background-color: red;
    clip-path: polygon(0 0, 0 100%, 100% 0);
`;

// const isRoundEndedPageShown = (events: Event[]): boolean => {
//     const lastRoundEndedIndex = lastIndexOfEventType(events, isRoundEndedEvent);
//     const lastRoundStartedIndex = lastIndexOfEventType(
//         events,
//         isRoundStartedEvent
//     );
//
//     return lastRoundEndedIndex > lastRoundStartedIndex;
// };
//
// const timeElapsedBetweenEvents = (e1: Event, e2: Event): string =>
//     timeElapsedLabel(e1, e2.time);

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

const StyledTickerPage = styled.div`
    display: grid;
    grid-template-areas: 'layer';
    line-height: 1.1;

    > * {
        grid-area: layer;
    }
`;

const Title = styled.h1`
    font-size: 20vh;
    text-align: center;
`;

const SubTitle = styled.h2`
    font-size: 25vh;
    text-align: center;
    text-transform: uppercase;
`;

const KeyTitle = styled.h1`
    font-size: 30vh;
    color: black;
    line-height: 1;
`;

const Times = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5vh;
    text-shadow: black 1vh 1vh 2vh;
`;

const TimeSpan = styled.span`
    font-family: 'Alarm Clock', 'sans-serif';
    font-size: 35vh;
    text-align: center;
    line-height: 0.9;
    color: red;
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
    color: ${accentColor};
`;

export { TickerPage };
