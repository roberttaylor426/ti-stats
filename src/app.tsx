import React from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import HandelGothic from './assets/fonts/HandelGothic/font.woff';
import { Galaxy } from './galaxy';
import { Stats } from './stats';

const App: React.FC = () => (
    <>
        <GlobalStyle />
        <FullScreenPage>
            <RouterProvider
                router={createBrowserRouter(
                    createRoutesFromElements([
                        <Route
                            key="galaxy"
                            path={'/galaxy'}
                            element={<Galaxy />}
                        />,
                        <Route
                            key="stats"
                            path={'/stats'}
                            element={
                                <Stats
                                    playerScores={[
                                        {
                                            faction: 'Sardakk N’orr',
                                            playerColor: 'Red',
                                            score: 1,
                                        },
                                        {
                                            faction: 'The Arborec',
                                            playerColor: 'Green',
                                            score: 3,
                                        },
                                        {
                                            faction: 'The Ghosts of Creuss',
                                            playerColor: 'Blue',
                                            score: 5,
                                        },
                                        {
                                            faction: 'The Argent Flight',
                                            playerColor: 'Orange',
                                            score: 3,
                                        },
                                        {
                                            faction: 'The Empyrean',
                                            playerColor: 'Purple',
                                            score: 4,
                                        },
                                        {
                                            faction: 'The Clan of Saar',
                                            playerColor: 'Black',
                                            score: 2,
                                        },
                                    ]}
                                    timeTakenPerPlayer={[
                                        {
                                            faction: 'Sardakk N’orr',
                                            playerColor: 'Red',
                                            avTimeTakenInMillis: 1000000,
                                        },
                                        {
                                            faction: 'The Arborec',
                                            playerColor: 'Green',
                                            avTimeTakenInMillis: 30000,
                                        },
                                        {
                                            faction: 'The Ghosts of Creuss',
                                            playerColor: 'Blue',
                                            avTimeTakenInMillis: 500000,
                                        },
                                        {
                                            faction: 'The Argent Flight',
                                            playerColor: 'Orange',
                                            avTimeTakenInMillis: 1000,
                                        },
                                        {
                                            faction: 'The Empyrean',
                                            playerColor: 'Purple',
                                            avTimeTakenInMillis: 400000,
                                        },
                                        {
                                            faction: 'The Clan of Saar',
                                            playerColor: 'Black',
                                            avTimeTakenInMillis: 200000,
                                        },
                                    ]}
                                    timeTakenPerRound={[
                                        {
                                            round: 1,
                                            timeTakenInMillis: 30000,
                                        },
                                        {
                                            round: 2,
                                            timeTakenInMillis: 30000001,
                                        },
                                    ]}
                                />
                            }
                        />,
                    ])
                )}
            />
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
        background: black;

        font-family: 'Handel Gothic', 'sans-serif';
        color: white;
    }
`;

const FullScreenPage = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;

    * {
        max-width: 100vw;
        max-height: 100vh;
    }

    > * {
        flex: 1 1 0;
    }
`;

export { App };
