import React from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import _ from 'underscore';

import HandelGothic from './assets/fonts/HandelGothic/font.woff';
import { Faction, PlayerColor } from './domain';
import { Event, isPlayerAssignedColorEvent } from './events';
import { Galaxy } from './galaxy';
import { Stats } from './stats';

const events: Event[] = [
    { type: 'PlayerAssignedColor', faction: 'Sardakk N’orr', color: 'Red' },
    {
        type: 'PlayerAssignedColor',
        faction: 'The Mahact Gene-Sorcerers',
        color: 'Yellow',
    },
    {
        type: 'MapTileSelected',
        systemTileNumber: 1,
        position: 0,
    },
    {
        type: 'MapTileSelected',
        systemTileNumber: 10,
        position: 1,
    },
    {
        type: 'PlanetControlled',
        planet: 'Jord',
        faction: 'Sardakk N’orr',
    },
    {
        type: 'PlanetControlled',
        planet: 'Jord',
        faction: 'The Mahact Gene-Sorcerers',
    },
    {
        type: 'PlanetControlled',
        planet: 'Wren Terra',
        faction: 'Sardakk N’orr',
    },
    {
        type: 'PlanetControlled',
        planet: 'Arc Prime',
        faction: 'The Mahact Gene-Sorcerers',
    },
    {
        type: 'PlayerScoredVictoryPoint',
        faction: 'Sardakk N’orr',
        delta: 1,
    },
];

const playerColors = events
    .filter(isPlayerAssignedColorEvent)
    .reduce(
        (acc, n) => ({ ...acc, [n.faction]: n.color }),
        {} as Record<Faction, PlayerColor>
    );

const factionsInGame = _.uniq(
    events.filter(isPlayerAssignedColorEvent).map((e) => e.faction)
);

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
                            element={
                                <Galaxy
                                    {...{
                                        events,
                                        playerColors,
                                        factionsInGame,
                                    }}
                                />
                            }
                        />,
                        <Route
                            key="stats"
                            path={'/stats'}
                            element={
                                <Stats
                                    {...{
                                        events,
                                        playerColors,
                                        factionsInGame,
                                    }}
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
