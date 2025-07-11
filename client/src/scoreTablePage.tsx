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
import styled from 'styled-components';
import _ from 'underscore';

import {
    factionsInGame,
    isRoundEndedEvent,
    playerFactionsAndColors,
    playerScore,
    timesTakenPerPlayer,
} from './events';
import { hexPlayerColor } from './playerColors';
import { Scoreboard, ScoreboardRow } from './scoreboard';
import { StatsContainer, StatsTitle } from './stats';
import { useEvents } from './useEvents';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend);

Chart.defaults.color = 'white';

const ScoreTablePage: React.FC = () => {
    const { events } = useEvents();

    const playerScores = factionsInGame(events).map((f) => ({
        faction: f,
        playerColor: playerFactionsAndColors(events)[f],
        score: playerScore(events, f),
    }));

    const roundEndedEvents = events.filter(isRoundEndedEvent);

    return (
        <div>
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
    margin: 2rem;
    gap: 2rem;
`;

const VpScores = styled.section`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export { ScoreTablePage };
