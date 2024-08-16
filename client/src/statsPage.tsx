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
    isPlayerScoredVictoryPointEvent,
    isRoundEndedEvent,
    isRoundStartedOrEndedEvent,
    playerFactionsAndColors,
} from './events';
import { Faction } from './factions';
import { Stars } from './stars';
import { useEvents } from './useEvents';
import { hexColor } from './util';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend);

Chart.defaults.color = 'white';

const StatsPage: React.FC = () => {
    const { events } = useEvents();

    const playerScores = factionsInGame(events).map((f) => ({
        faction: f,
        playerColor: playerFactionsAndColors(events)[f],
        score: events
            .filter(isPlayerScoredVictoryPointEvent)
            .filter((e) => e.faction === f)
            .reduce((acc, n) => acc + n.delta, 0),
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

    const timesTakenPerPlayerPerTurn = events.reduce(
        (acc, n) => {
            if (n.type === 'ActionPhaseStarted') {
                return {
                    ...acc,
                    playerTurnStartedTime: n.time,
                };
            }
            if (n.type === 'PlayerFinishedTurn') {
                return {
                    playerTurnTimes: {
                        ...acc.playerTurnTimes,
                        [n.faction]: [
                            ...acc.playerTurnTimes[n.faction],
                            n.time - acc.playerTurnStartedTime,
                        ],
                    },
                    playerTurnStartedTime: n.time,
                };
            }

            return acc;
        },
        {
            playerTurnStartedTime: 0,
            playerTurnTimes: factionsInGame(events).reduce(
                (acc, n) => ({ ...acc, [n]: [] }),
                {} as Record<Faction, number[]>
            ),
        }
    );

    const averageTimesTakenPerPlayer = factionsInGame(events).map((f) => ({
        faction: f,
        playerColor: playerFactionsAndColors(events)[f],
        maxTimeTakenInMillis: timesTakenPerPlayerPerTurn.playerTurnTimes[
            f
        ].reduce((acc, n) => Math.max(acc, n), 0),
        avTimeTakenInMillis:
            timesTakenPerPlayerPerTurn.playerTurnTimes[f].reduce(
                (acc, n) => acc + n,
                0
            ) / timesTakenPerPlayerPerTurn.playerTurnTimes[f].length,
    }));

    const roundEndedEvents = events.filter(isRoundEndedEvent);

    const roundStartedAndEndedEvents = events.filter(
        isRoundStartedOrEndedEvent
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
                        <ScoreboardRow
                            title={'Scores'}
                            color={'white'}
                            value={''}
                        />
                        {_.sortBy(playerScores, (ps) => ps.score)
                            .reverse()
                            .map((ps) => (
                                <ScoreboardRow
                                    key={ps.faction}
                                    title={ps.faction}
                                    color={hexColor(ps.playerColor)}
                                    value={`${ps.score}VP`}
                                />
                            ))}
                    </Scoreboard>
                    {playerScoresByRound.length > 2 && (
                        <Line
                            data={{
                                datasets: factionsInGame(events).map((f) => ({
                                    borderColor: hexColor(
                                        playerFactionsAndColors(events)[f]
                                    ),
                                    pointBackgroundColor: hexColor(
                                        playerFactionsAndColors(events)[f]
                                    ),
                                    data: [
                                        0,
                                        ...playerScoresByRound.map(
                                            (sbr) => sbr[f]
                                        ),
                                    ],
                                })),
                                labels: [
                                    '',
                                    ..._.tail(playerScoresByRound).map(
                                        (_, index) => `Round ${index + 1}`
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
                                        },
                                    },
                                    y: {
                                        ticks: {
                                            stepSize: 1,
                                            font: {
                                                family: 'Handel Gothic',
                                                size: 16,
                                            },
                                        },
                                    },
                                },
                                plugins: { legend: { display: false } },
                            }}
                        />
                    )}
                </VpScores>
                {roundEndedEvents.length > 0 && (
                    <>
                        <Scoreboard>
                            <ScoreboardRow
                                title={'Average time taken per turn'}
                                color={'white'}
                                value={''}
                            />
                            {_.sortBy(
                                averageTimesTakenPerPlayer,
                                (ps) => ps.avTimeTakenInMillis
                            )
                                .reverse()
                                .map((ps) => (
                                    <ScoreboardRow
                                        key={ps.faction}
                                        title={ps.faction}
                                        color={hexColor(ps.playerColor)}
                                        value={`${formatDuration(
                                            intervalToDuration({
                                                start: 0,
                                                end: ps.avTimeTakenInMillis,
                                            }),
                                            { format: ['minutes', 'seconds'] }
                                        )}`}
                                    />
                                ))}
                        </Scoreboard>
                        <Scoreboard>
                            <ScoreboardRow
                                title={'Max time taken on a turn'}
                                color={'white'}
                                value={''}
                            />
                            {_.sortBy(
                                averageTimesTakenPerPlayer,
                                (ps) => ps.maxTimeTakenInMillis
                            )
                                .reverse()
                                .map((ps) => (
                                    <ScoreboardRow
                                        key={ps.faction}
                                        title={ps.faction}
                                        color={hexColor(ps.playerColor)}
                                        value={`${formatDuration(
                                            intervalToDuration({
                                                start: 0,
                                                end: ps.maxTimeTakenInMillis,
                                            }),
                                            { format: ['minutes', 'seconds'] }
                                        )}`}
                                    />
                                ))}
                        </Scoreboard>
                        <Scoreboard>
                            <ScoreboardRow
                                title={'Time taken per round'}
                                color={'white'}
                                value={''}
                            />
                            {timeTakenPerRound.map((ps, index) => (
                                <ScoreboardRow
                                    key={index}
                                    title={`Round ${index + 1}`}
                                    color={'white'}
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

const Scoreboard = styled.section`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 2.25rem;
`;

type ScoreboardRowProps = {
    title: string;
    color: string;
    value: string;
};

const ScoreboardRow: React.FC<ScoreboardRowProps> = ({
    title,
    color,
    value,
}) => (
    <StyledScoreboardRow>
        <Title $color={color}>{title}</Title>
        <Value>{value}</Value>
    </StyledScoreboardRow>
);

const StyledScoreboardRow = styled.div`
    display: flex;

    > * {
        flex: 1 1 0;
    }
`;

type TitleProps = {
    $color: string;
};

const Title = styled.span<TitleProps>`
    color: ${(props) => props.$color};
`;

const Value = styled.span`
    color: white;
    text-align: end;
`;

export { StatsPage };
