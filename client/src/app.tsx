import React, { useState } from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import _ from 'underscore';
import useAsyncEffect from 'use-async-effect';
import useInterval from 'use-interval';

import { AdminPage } from './adminPage';
import HandelGothic from './assets/fonts/HandelGothic/font.woff';
import { Event, isPlayerAssignedColorEvent } from './events';
import { Faction } from './factions';
import { GalaxyPage } from './galaxyPage';
import { PlayerColor } from './playerColor';
import { StatsPage } from './statsPage';

const App: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useAsyncEffect(async () => {
        try {
            const response = await fetch('/api');

            if (response.status === 200) {
                const responseJson = await response.json();

                if (responseJson.length > events.length) {
                    setEvents(responseJson);
                }
            }
        } catch {}
    }, [refreshTrigger]);

    useInterval(() => {
        setRefreshTrigger(refreshTrigger + 1);
    }, 15_000);

    const playerColors = events
        .filter(isPlayerAssignedColorEvent)
        .reduce(
            (acc, n) => ({ ...acc, [n.faction]: n.color }),
            {} as Record<Faction, PlayerColor>
        );

    const factionsInGame = _.uniq(
        events.filter(isPlayerAssignedColorEvent).map((e) => e.faction)
    );

    return (
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
                                    <GalaxyPage
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
                                    <StatsPage
                                        {...{
                                            events,
                                            playerColors,
                                            factionsInGame,
                                        }}
                                    />
                                }
                            />,
                            <Route
                                key="admin"
                                path={'/admin'}
                                element={
                                    <AdminPage {...{ events, setEvents }} />
                                }
                            />,
                        ])
                    )}
                />
            </FullScreenPage>
        </>
    );
};

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
