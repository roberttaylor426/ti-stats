import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import HandelGothic from './assets/fonts/HandelGothic/font.woff';
import { Galaxy } from './galaxy';

const App: React.FC = () => (
    <>
        <GlobalStyle />
        <FullScreenPage>
            <Galaxy />
        </FullScreenPage>
    </>
);

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Handel Gothic';
        src: url(${HandelGothic}) format('woff');
        font-weight: 300;
    }

    * {
        margin: 0;
    }

    body {
        font-family: 'Handel Gothic', 'sans-serif';
    }
`;

const FullScreenPage = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    background: black;

    * {
        max-width: 100vw;
        max-height: 100vh;
    }

    > * {
        flex: 1 1 0;
    }
`;

export { App };
