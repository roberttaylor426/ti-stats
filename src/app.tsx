import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { Galaxy } from './galaxy';

const App: React.FC = () => (
    <>
        <GlobalStyle />
        <Galaxy />
    </>
);

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
    }
`;

export { App };
