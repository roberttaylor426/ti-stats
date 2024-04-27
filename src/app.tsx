import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

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
    * {
        margin: 0;
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
