import React from 'react';
import styled, { css } from 'styled-components';
import { random } from 'underscore';

import { range } from './util';

const Stars: React.FC = () => (
    <>
        <SmallStars />
        <MediumStars />
        <LargeStars />
    </>
);

const starCoordinatesCss = (n: number) =>
    range(n)
        .map((_) => [random(10_000), random(10_000)])
        .map(([x, y]) => `${x / 50}vw ${y / 50}vh #fff`)
        .join(', ');

const starsCss = css`
    z-index: -1;
    background: transparent;

    @keyframes animateStar {
        from {
            transform: translateY(0px);
        }
        to {
            transform: translateY(-100vh);
        }
    }
`;

const SmallStars = styled.div`
    ${starsCss};
    width: 1px;
    height: 1px;
    box-shadow: ${starCoordinatesCss(5_000)};
    animation: animateStar 250s linear infinite;
`;

const MediumStars = styled.div`
    ${starsCss};
    width: 2px;
    height: 2px;
    box-shadow: ${starCoordinatesCss(500)};
    animation: animateStar 150s linear infinite;
`;

const LargeStars = styled.div`
    ${starsCss};
    width: 3px;
    height: 3px;
    box-shadow: ${starCoordinatesCss(50)};
    animation: animateStar 100s linear infinite;
`;

export { Stars };
