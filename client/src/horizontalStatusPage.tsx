import { intervalToDuration } from 'date-fns';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import _ from 'underscore';

import { agendaCardBoldText } from './agendaCards';
import { accentColor } from './colors';
import {
    currentPlayerTurnInActionPhase,
    currentPlayerTurnInStrategyPhase,
    currentRoundNumber,
    Event,
    factionsInGame,
    GammaWormholeFoundEvent,
    hasGameStarted,
    isActionPhaseStartedEvent,
    isAgendaCardRevealedEvent,
    isAgendaPhaseStartedEvent,
    isItAgendaPhase,
    isPlayerFinishedTurnEvent,
    isPlayerScoredVictoryPointEvent,
    isRoundStartedEvent,
    isUnion,
    PlayerAttackedSystemEvent,
    playerScore,
} from './events';
import { Faction, shortName } from './factions';
import {
    isPlanetlessSystemTileNumber,
    planetlessSystemTileDescription,
    systemWithPlanetsTile,
    systemWithPlanetsTileDescription,
} from './systemTiles';
import { useAttackAlarms } from './useAttackAlarms';
import { useEvents } from './useEvents';

const HorizontalStatusPage: React.FC = () => {
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

    useAttackAlarms(events);

    const activePlayerInStrategyPhase =
        currentPlayerTurnInStrategyPhase(events);
    const activePlayerInActionPhase = currentPlayerTurnInActionPhase(events);

    const winningPlayer = _.first(
        factionsInGame(events)
            .map((f) => ({
                faction: f,
                score: playerScore(events, f),
                asOf: _.last(events.filter(isPlayerScoredVictoryPointEvent))
                    ?.time,
            }))
            .filter((fs) => fs.score >= 10)
    );

    return (
        <StyledHorizontalStatusPage>
            {lastEvent ? (
                <Ticker>
                    <TickerRow>
                        <RoundAndPhase>
                            <RoundAndPhaseColumn
                                $invisible={!hasGameStarted(events)}
                            >
                                {(activePlayerInActionPhase
                                    ? 'ACTION PHASE'
                                    : activePlayerInStrategyPhase ||
                                        _.last(events)?.type ===
                                            'PlayerSelectedStrategyCard'
                                      ? 'STRATEGY PHASE'
                                      : _.last(events)?.type === 'RoundEnded'
                                        ? 'ROUND END'
                                        : isItAgendaPhase(events)
                                          ? 'AGENDA PHASE'
                                          : 'STATUS PHASE'
                                )
                                    .split(' ')
                                    .map((s, i) => (
                                        <SubTitle
                                            key={i}
                                            $invisible={!hasGameStarted(events)}
                                        >
                                            {s}
                                        </SubTitle>
                                    ))}
                            </RoundAndPhaseColumn>
                            <RoundAndPhaseColumnTriangle />
                        </RoundAndPhase>
                        <TickerContent>
                            <TickerText>
                                <KeyTitle>
                                    {!hasGameStarted(events)
                                        ? 'Pax Magnifica, Bellum Gloriosum'
                                        : winningPlayer
                                          ? `${winningPlayer.faction} win!`
                                          : activePlayerInStrategyPhase
                                            ? `${shortName(activePlayerInStrategyPhase)} pick`
                                            : lastEvent.type ===
                                                'PlayerSelectedStrategyCard'
                                              ? 'All strategy cards picked'
                                              : lastEvent.type ===
                                                  'PlayerAttackedSystem'
                                                ? `${shortName(lastEvent.faction)} attack!`
                                                : activePlayerInActionPhase
                                                  ? `${shortName(activePlayerInActionPhase)} turn`
                                                  : lastEvent.type ===
                                                      'PlayerFinishedTurn'
                                                    ? 'Score objectives, initiative order'
                                                    : lastEvent.type ===
                                                        'ObjectivesScoredDuringStatusPhase'
                                                      ? 'Reveal public objective'
                                                      : lastEvent.type ===
                                                          'PublicObjectiveRevealedDuringStatusPhase'
                                                        ? 'Draw action cards'
                                                        : lastEvent.type ===
                                                            'ActionCardsDrawnDuringStatusPhase'
                                                          ? 'Remove command tokens from board'
                                                          : lastEvent.type ===
                                                              'CommandTokensRemovedDuringStatusPhase'
                                                            ? 'Gain and redistribute command tokens'
                                                            : lastEvent.type ===
                                                                'CardsReadiedDuringStatusPhase'
                                                              ? 'Repair units'
                                                              : lastEvent.type ===
                                                                  'UnitsRepairedDuringStatusPhase'
                                                                ? 'Return strategy cards'
                                                                : isItAgendaPhase(
                                                                        events
                                                                    )
                                                                  ? agendaCardTextToShowDuringAgendaPhase(
                                                                        events
                                                                    )
                                                                  : ''}
                                </KeyTitle>
                            </TickerText>
                            <TickerTriangle />
                        </TickerContent>
                        <Times>
                            <TimeSpan>
                                {hasGameStarted(events)
                                    ? timeElapsedLabel(
                                          activePlayerInActionPhase &&
                                              lastEventWhenPlayerTurnStarted
                                              ? lastEventWhenPlayerTurnStarted
                                              : lastEvent,
                                          winningPlayer?.asOf
                                              ? winningPlayer.asOf
                                              : currentTime
                                      )
                                    : noTimeElapsedString}
                            </TimeSpan>
                            <TotalTime
                                events={events}
                                currentTime={
                                    winningPlayer?.asOf
                                        ? winningPlayer.asOf
                                        : currentTime
                                }
                            />
                        </Times>
                    </TickerRow>
                    <ScrollingTickerContainer>
                        <ScrollingTicker>
                            <ScrollingTickerText
                                $invisible={!hasGameStarted(events)}
                            >
                                {generateMarqueeText(events)}&nbsp;++&nbsp;
                            </ScrollingTickerText>
                            <ScrollingTickerText
                                $invisible={!hasGameStarted(events)}
                            >
                                {generateMarqueeText(events)}&nbsp;++&nbsp;
                            </ScrollingTickerText>
                        </ScrollingTicker>
                        <ScrollingTickerRoundOverlayContainer>
                            <ScrollingTickerRoundOverlay
                                $invisible={!hasGameStarted(events)}
                            >
                                <Title
                                    $invisible={!hasGameStarted(events)}
                                >{`Round ${currentRoundNumber(events)}`}</Title>
                            </ScrollingTickerRoundOverlay>
                            <ScrollingTickerRoundOverlayTriangle />
                        </ScrollingTickerRoundOverlayContainer>
                    </ScrollingTickerContainer>
                </Ticker>
            ) : (
                <h1>TODO</h1>
            )}
        </StyledHorizontalStatusPage>
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
                case 'ActionCardsDrawnDuringStatusPhase':
                case 'ActionPhaseStarted':
                case 'AgendaCardRevealed':
                case 'AgendaPhaseStarted':
                case 'CardsReadiedDuringStatusPhase':
                case 'CommandTokensGainedAndRedistributedDuringStatusPhase':
                case 'CommandTokensRemovedDuringStatusPhase':
                case 'MapTilesSelected':
                case 'ObjectivesScoredDuringStatusPhase':
                case 'PlanetEnhanced':
                case 'PlayersAssignedFactionsAndColors':
                case 'PlayerCompletedStrategyCardPrimaryAction':
                case 'PlayerFinishedTurn':
                case 'PlayerScoredVictoryPoint':
                case 'PublicObjectiveRevealedDuringStatusPhase':
                case 'RoundEnded':
                case 'RoundStarted':
                case 'UnitsRepairedDuringStatusPhase':
                    return '';
                case 'GammaWormholeFound':
                    return `Gamma wormhole found ${generateMarqueeSuffixForEventOccurringOnSystemTile(e)}`;
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
                case 'PlayerAttackedSystem':
                    return `${e.faction} ATTACKED ${shortName(e.defender)} ${generateMarqueeSuffixForEventOccurringOnSystemTile(e)}`;
            }
        })
        .filter((t) => t.length > 0)
        .slice(-10)
        .join(' ++ ');
    return [singleMarqueeMessage, singleMarqueeMessage].join(' ++ ');
};

const generateMarqueeSuffixForEventOccurringOnSystemTile = (
    e: PlayerAttackedSystemEvent | GammaWormholeFoundEvent
): string => {
    if (isPlanetlessSystemTileNumber(e.tileNumber)) {
        switch (e.tileNumber) {
            case 17:
                return 'at the Creuss Gate';
            case 39:
            case 79:
                return 'near the Alpha wormhole';
            case 40:
            case 4272:
                return 'near the Beta wormhole';
            case 41:
            case 4274:
                return 'near a gravity rift';
            case 42:
            case 4273:
                return 'in a nebula';
            case 4275:
                return 'near the Gamma wormhole';
            case 4276:
            case 43:
            case 80:
            case 81:
                return 'in a supernova';
            case 44:
            case 45:
                return 'in an asteroid field';
            case 3232:
            case 46:
            case 47:
            case 48:
            case 49:
            case 50:
            case 77:
            case 78:
            case 4270:
            case 4271:
                return 'in empty space';
        }
    }

    return `in the ${systemWithPlanetsTile(e.tileNumber).planets.join(', ')} system`;
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

const RoundAndPhaseColumn = styled.div<DisplayProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${accentColor};
    text-shadow: ${(props) =>
        props.$invisible ? 'none' : 'black 1vh 1vh 2vh'};
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

const ScrollingTickerText = styled.span<DisplayProps>`
    color: ${(props) => (props.$invisible ? 'transparent' : 'black')};
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

const ScrollingTickerRoundOverlay = styled.div<DisplayProps>`
    display: flex;
    background-color: red;
    text-shadow: ${(props) =>
        props.$invisible ? 'none' : 'black 1vh 1vh 2vh'};
    padding: 2vh 5vh;
`;

const ScrollingTickerRoundOverlayTriangle = styled.div`
    width: 12vh;
    background-color: red;
    clip-path: polygon(0 0, 0 100%, 100% 0);
`;

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

const StyledHorizontalStatusPage = styled.div`
    display: grid;
    grid-template-areas: 'layer';
    line-height: 1.1;

    > * {
        grid-area: layer;
    }
`;

type DisplayProps = {
    $invisible: boolean;
};

const Title = styled.h1<DisplayProps>`
    font-size: 20vh;
    text-align: center;
    color: ${(props) => (props.$invisible ? 'transparent' : 'white')};
`;

const SubTitle = styled.h2<DisplayProps>`
    font-size: 25vh;
    text-align: center;
    text-transform: uppercase;
    color: ${(props) => (props.$invisible ? 'transparent' : 'white')};
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

const noTimeElapsedString = '00:00:00';

type TotalTimeProps = {
    events: Event[];
    currentTime: number;
};

const TotalTime: React.FC<TotalTimeProps> = ({ events, currentTime }) => (
    <TotalTimeSpan>
        {hasGameStarted(events)
            ? timeElapsedLabel(
                  _.first(events.filter(isRoundStartedEvent))!,
                  currentTime
              )
            : noTimeElapsedString}
    </TotalTimeSpan>
);

const TotalTimeSpan = styled(TimeSpan)`
    color: ${accentColor};
`;

const agendaCardTextToShowDuringAgendaPhase = (events: Event[]): string => {
    const lastAgendaPhaseEvent = _.last(
        events.filter(
            isUnion(isAgendaPhaseStartedEvent, isAgendaCardRevealedEvent)
        )
    );

    return !!lastAgendaPhaseEvent &&
        isAgendaCardRevealedEvent(lastAgendaPhaseEvent)
        ? agendaCardBoldText[lastAgendaPhaseEvent.card]
        : 'Speaker to reveal an agenda card';
};

export { HorizontalStatusPage };
