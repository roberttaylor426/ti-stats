import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from 'chart.js';
import { formatDuration, intervalToDuration } from 'date-fns';
import React from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import _ from 'underscore';

import { Faction, PlayerColor } from './domain';
import { hexColor } from './galaxy';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

type Props = {
    playerScores: {
        faction: Faction;
        playerColor: PlayerColor;
        score: number;
    }[];
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

const Stats: React.FC<Props> = ({
    playerScores,
    timeTakenPerPlayer,
    timeTakenPerRound,
}) => (
    <StyledStats>
        <Scoreboard>
            <ScoreboardRow title={'Scores'} color={'white'} value={''} />
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
            data={{ datasets: [{ data: [2, 3, 4] }], labels: ['a', 'b', 'c'] }}
        />
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

const StyledStats = styled.div`
    display: flex;
    flex-direction: column;
`;

const Scoreboard = styled.section`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 2rem;
    margin-top: 8rem;
    margin-left: 4rem;
    margin-right: 4rem;
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
