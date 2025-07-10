import {
    CategoryScale,
    Chart,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import _ from 'underscore';

import {
    currentRoundNumber,
    factionsInGame,
    playerFactionsAndColors,
} from './events';
import { Faction } from './factions';
import { hexPlayerColor } from './playerColors';
import { Scoreboard } from './scoreboard';
import { Stars } from './stars';
import { StatsContainer, StatsTitle } from './stats';
import { useEvents } from './useEvents';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend);

Chart.defaults.color = 'white';

const ScoreGraphPage: React.FC = () => {
    const { events } = useEvents();

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

    return (
        <div>
            <Stars />

            {playerScoresByRound.length > 2 ? (
                <StyledStats>
                    <VpScores>
                        <Scoreboard>
                            <StatsTitle>Scores</StatsTitle>
                            <StatsContainer>
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
                            </StatsContainer>
                        </Scoreboard>
                    </VpScores>
                </StyledStats>
            ) : (
                <RoundContainer>
                    <RoundLabel>{`Round ${currentRoundNumber(events)}`}</RoundLabel>
                </RoundContainer>
            )}
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

const RoundContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
`;

const RoundLabel = styled.span`
    text-align: center;
    text-transform: uppercase;
    font-size: 6rem;
`;

export { ScoreGraphPage };
