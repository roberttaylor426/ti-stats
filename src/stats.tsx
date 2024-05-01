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

import { Faction, hexColor, PlayerColor } from './domain';
import { Event, isPlayerScoredVictoryPointEvent } from './events';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend);

type Props = {
    events: Event[];
    factionsInGame: Faction[];
    playerColors: Record<Faction, PlayerColor>;
    timeTakenPerPlayer: {
        faction: Faction;
        playerColor: PlayerColor;
        avTimeTakenInMillis: number;
    }[];
    timeTakenPerRound: {
        round: number;
        timeTakenInMillis: number;
    }[];
};

Chart.defaults.color = 'white';

const Stats: React.FC<Props> = ({
    events,
    playerColors,
    factionsInGame,
    timeTakenPerPlayer,
    timeTakenPerRound,
}) => {
    const playerScores = factionsInGame.map((f) => ({
        faction: f,
        playerColor: playerColors[f],
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
            factionsInGame.reduce(
                (acc, n) => ({ ...acc, [n]: 0 }),
                {} as Record<Faction, number>
            ),
        ]
    );

    //     factionsInGame.map((f) => ({
    //     faction: f,
    //     playerColor: playerColors[f],
    //     score: events
    //         .filter(isPlayerScoredVictoryPointEvent)
    //         .filter((e) => e.faction === f)
    //         .reduce((acc, n) => acc + n.delta, 0),
    // }));

    return (
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
                <Line
                    data={{
                        datasets: factionsInGame.map((f) => ({
                            borderColor: hexColor(playerColors[f]),
                            pointBackgroundColor: hexColor(playerColors[f]),
                            data: [
                                0,
                                ...playerScoresByRound.map((sbr) => sbr[f]),
                            ],
                        })),
                        labels: [
                            '',
                            ...playerScoresByRound.map(
                                (_, index) => `Round ${index + 1}`
                            ),
                        ],
                    }}
                    options={{
                        elements: {
                            point: {
                                radius: 10,
                            },
                        },
                        scales: {
                            x: {
                                ticks: {
                                    font: { family: 'Handel Gothic', size: 16 },
                                },
                            },
                            y: {
                                ticks: {
                                    stepSize: 1,
                                    font: { family: 'Handel Gothic', size: 16 },
                                },
                            },
                        },
                        plugins: { legend: { display: false } },
                    }}
                />
            </VpScores>
            <Scoreboard>
                <ScoreboardRow
                    title={'Av. time taken per turn'}
                    color={'white'}
                    value={''}
                />
                {_.sortBy(timeTakenPerPlayer, (ps) => ps.avTimeTakenInMillis)
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
                    title={'Time taken per round'}
                    color={'white'}
                    value={''}
                />
                {_.sortBy(timeTakenPerRound, (ps) => ps.round).map((ps) => (
                    <ScoreboardRow
                        key={ps.round}
                        title={`Round ${ps.round}`}
                        color={'white'}
                        value={`${formatDuration(
                            intervalToDuration({
                                start: 0,
                                end: ps.timeTakenInMillis,
                            }),
                            { format: ['hours', 'minutes', 'seconds'] }
                        )}`}
                    />
                ))}
            </Scoreboard>
        </StyledStats>
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
    font-size: 2rem;
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

export { Stats };
