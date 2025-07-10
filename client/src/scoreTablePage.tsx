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
import styled from 'styled-components';
import _ from 'underscore';

import { factionsInGame, playerFactionsAndColors, playerScore } from './events';
import { hexPlayerColor } from './playerColors';
import { Scoreboard, ScoreboardRow } from './scoreboard';
import { Stars } from './stars';
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
                        </StatsContainer>
                    </Scoreboard>
                </VpScores>
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

export { ScoreTablePage };
