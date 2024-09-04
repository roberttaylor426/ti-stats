import styled, { css } from 'styled-components';

import { accentColor } from './colors';

const StatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: ${accentColor}88 solid 1px;
    padding: 1rem 2rem;

    > :nth-child(even) {
        background-color: ${accentColor}00;
    }

    > :nth-child(odd) {
        background-color: ${accentColor}22;
    }

    > * + canvas {
        margin-top: 2rem;
    }
`;

const statsTitleCss = css`
    background-color: ${accentColor}44;
    text-transform: uppercase;
    padding: 0 1rem;
`;

const StatsTitle = styled.h4`
    color: white;
    ${statsTitleCss};
`;

export { StatsContainer, StatsTitle, statsTitleCss };
