import React from 'react';
import styled from 'styled-components';

const Scoreboard = styled.section`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 2.25rem;
`;

type ScoreboardRowProps = {
    title: string;
    titleColor: string;
    value: string;
    valueColor?: string;
};

const ScoreboardRow: React.FC<ScoreboardRowProps> = ({
    title,
    titleColor,
    value,
    valueColor,
}) => (
    <StyledScoreboardRow>
        <Title $color={titleColor}>{title}</Title>
        <Value $color={valueColor}>{value}</Value>
    </StyledScoreboardRow>
);

const StyledScoreboardRow = styled.div`
    display: flex;
    justify-content: space-between;
`;

type TitleProps = {
    $color: string;
};

const Title = styled.span<TitleProps>`
    color: ${(props) => props.$color};
`;

type ValueProps = {
    $color?: string;
};

const Value = styled.span<ValueProps>`
    color: ${(props) => props.$color || 'white'};
    text-align: end;
`;

export { Scoreboard, ScoreboardRow };
