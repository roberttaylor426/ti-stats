import {
    CategoryScale,
    Chart,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
} from 'chart.js';
import { formatDuration, intervalToDuration } from 'date-fns';
import React from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import _ from 'underscore';

import {
    factionsInGame,
    isRoundEndedEvent,
    isRoundStartedEvent,
    isUnion,
    playerFactionsAndColors,
    playerScore,
    timesTakenPerPlayer,
} from './events';
import { Faction } from './factions';
import { hexPlayerColor } from './playerColors';
import { Scoreboard, ScoreboardRow } from './scoreboard';
import { Stars } from './stars';
import { StatsContainer, StatsTitle } from './stats';
import { useEvents } from './useEvents';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend);

Chart.defaults.color = 'white';

const StatsPage: React.FC = () => {
    const { events } = useEvents();

    const playerScores = factionsInGame(events).map((f) => ({
        faction: f,
        playerColor: playerFactionsAndColors(events)[f],
        score: playerScore(events, f),
    }));

    const playerScoresByRound: Record<Faction, number>[] = events.reduce(
        (acc, n) => {
            const currentRoundScores = _.last(acc) as Record<Faction, number>;

            if (n.type === 'RoundEnded') {
                return [...acc, currentRoundScores];
            }

            if (n.type === 'PlayerScoredVictoryPoint') {
                return [
                    ..._.initial(acc),
                    {
                        ...currentRoundScores,
                        [n.faction]: currentRoundScores[n.faction] + n.delta,
                    },
                ];
            }

            return acc;
        },
        [
            factionsInGame(events).reduce(
                (acc, n) => ({ ...acc, [n]: 0 }),
                {} as Record<Faction, number>
            ),
        ]
    );

    const roundEndedEvents = events.filter(isRoundEndedEvent);

    const roundStartedAndEndedEvents = events.filter(
        isUnion(isRoundStartedEvent, isRoundEndedEvent)
    );

    const timeTakenPerRound = roundStartedAndEndedEvents
        .filter(
            (e, index) =>
                !(
                    index === roundStartedAndEndedEvents.length - 1 &&
                    e.type === 'RoundStarted'
                )
        )
        .reduce((acc, n) => {
            if (n.type === 'RoundStarted') {
                return [...acc, n.time];
            }

            return [..._.initial(acc), n.time - (_.last(acc) as number)];
        }, [] as number[]);

    return (
        <div>
            <Stars />
            <StyledStats>
                <VpScores>
                    <Scoreboard>
                        <StatsTitle>Scores</StatsTitle>
                        <StatsContainer>
                            {_.sortBy(playerScores, (ps) => ps.score)
                                .reverse()
                                .map((ps) => (
                                    <ScoreboardRow
                                        key={ps.faction}
                                        title={ps.faction}
                                        titleColor={hexPlayerColor(
                                            ps.playerColor
                                        )}
                                        value={`${ps.score}VP`}
                                    />
                                ))}
                            {playerScoresByRound.length > 2 && (
                                <Line
                                    data={{
                                        datasets: factionsInGame(events).map(
                                            (f) => ({
                                                borderColor: hexPlayerColor(
                                                    playerFactionsAndColors(
                                                        events
                                                    )[f]
                                                ),
                                                pointBackgroundColor:
                                                    hexPlayerColor(
                                                        playerFactionsAndColors(
                                                            events
                                                        )[f]
                                                    ),
                                                data: [
                                                    0,
                                                    ...playerScoresByRound.map(
                                                        (sbr) => sbr[f]
                                                    ),
                                                ],
                                            })
                                        ),
                                        labels: [
                                            '',
                                            ..._.tail(playerScoresByRound).map(
                                                (_, index) =>
                                                    `ROUND ${index + 1}`
                                            ),
                                        ],
                                    }}
                                    options={{
                                        animation: { duration: 0 },
                                        elements: {
                                            point: {
                                                radius: 10,
                                            },
                                        },
                                        scales: {
                                            x: {
                                                ticks: {
                                                    font: {
                                                        family: 'Handel Gothic',
                                                        size: 16,
                                                    },
                                                    color: 'white',
                                                },
                                            },
                                            y: {
                                                ticks: {
                                                    stepSize: 1,
                                                    font: {
                                                        family: 'Handel Gothic',
                                                        size: 24,
                                                    },
                                                    color: 'white',
                                                },
                                            },
                                        },
                                        plugins: { legend: { display: false } },
                                    }}
                                />
                            )}
                        </StatsContainer>
                    </Scoreboard>
                </VpScores>
                {roundEndedEvents.length > 0 && (
                    <>
                        <Scoreboard>
                            <StatsTitle>Average time taken per turn</StatsTitle>
                            <StatsContainer>
                                {_.sortBy(
                                    timesTakenPerPlayer(events),
                                    (ps) => ps.avTimeTakenInMillis
                                )
                                    .reverse()
                                    .map((ps) => (
                                        <ScoreboardRow
                                            key={ps.faction}
                                            title={ps.faction}
                                            titleColor={hexPlayerColor(
                                                ps.playerColor
                                            )}
                                            value={`${formatDuration(
                                                intervalToDuration({
                                                    start: 0,
                                                    end: ps.avTimeTakenInMillis,
                                                }),
                                                {
                                                    format: [
                                                        'hours',
                                                        'minutes',
                                                        'seconds',
                                                    ],
                                                }
                                            )}`}
                                        />
                                    ))}
                            </StatsContainer>
                        </Scoreboard>
                        <Scoreboard>
                            <StatsTitle>Max time taken on a turn</StatsTitle>
                            <StatsContainer>
                                {_.sortBy(
                                    timesTakenPerPlayer(events),
                                    (ps) => ps.maxTimeTakenInMillis
                                )
                                    .reverse()
                                    .map((ps) => (
                                        <ScoreboardRow
                                            key={ps.faction}
                                            title={ps.faction}
                                            titleColor={hexPlayerColor(
                                                ps.playerColor
                                            )}
                                            value={`${formatDuration(
                                                intervalToDuration({
                                                    start: 0,
                                                    end: ps.maxTimeTakenInMillis,
                                                }),
                                                {
                                                    format: [
                                                        'hours',
                                                        'minutes',
                                                        'seconds',
                                                    ],
                                                }
                                            )}`}
                                        />
                                    ))}
                            </StatsContainer>
                        </Scoreboard>
                        <Scoreboard>
                            <StatsTitle>Time taken per round</StatsTitle>
                            <StatsContainer>
                                {timeTakenPerRound.map((ps, index) => (
                                    <ScoreboardRow
                                        key={index}
                                        title={`Round ${index + 1}`}
                                        titleColor={'white'}
                                        value={`${formatDuration(
                                            intervalToDuration({
                                                start: 0,
                                                end: ps,
                                            }),
                                            {
                                                format: [
                                                    'hours',
                                                    'minutes',
                                                    'seconds',
                                                ],
                                            }
                                        )}`}
                                    />
                                ))}
                            </StatsContainer>
                        </Scoreboard>
                    </>
                )}
            </StyledStats>
        </div>
    );
};

const StyledStats = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 4rem;
    gap: 4rem;
`;

const VpScores = styled.section`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export { StatsPage };
