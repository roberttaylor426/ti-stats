import styled from 'styled-components';

import { accentColor } from './colors';

const StatsContainer = styled.div`
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

export { StatsContainer };
