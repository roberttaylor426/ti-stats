import React from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import { AdminPages } from './admin/adminPages';
import HandelGothic from './assets/fonts/HandelGothic/font.woff';
import { GalaxyPage } from './galaxyPage';
import { StatsPage } from './statsPage';
import { TechPage } from './techPage';

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
                            element={<GalaxyPage />}
                        />,
                        <Route
                            key="stats"
                            path={'/stats'}
                            element={<StatsPage />}
                        />,
                        <Route
                            key="tech"
                            path={'/tech'}
                            element={<TechPage />}
                        />,
                        <Route
                            key="admin"
                            path={'/admin'}
                            element={<AdminPages />}
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
