import React, { useState } from 'react';
import styled from 'styled-components';
import _ from 'underscore';
import useAsyncEffect from 'use-async-effect';

import {
    currentPlayerTurnInActionPhase,
    currentPlayerTurnInStrategyPhase,
    currentRoundNumber,
    Event,
    isAgendaPhaseStartedEvent,
    isMapTilesSelectedEvent,
    isRoundEndedEvent,
    isRoundStartedEvent,
    lastIndexOfEventType,
    playerSelectedStrategyCardEventFromLastStrategyPhase,
} from '../events';
import { numberOfPlayersInGame } from '../playerColors';
import { AgendaPhasePage } from './agendaPhasePage';
import { EndOfRoundScoringPage } from './endOfRoundScoringPage';
import { FactionAssignmentPage } from './factionAssignmentPage';
import { PlayerOrderSelectionPage } from './playerOrderSelectionPage';
import { PlayerTurnPage } from './playerTurnPage';
import { StartRoundPage } from './startRoundPage';
import { StrategyCardSelectionPage } from './strategyCardSelectionPage';
import { TileSelectionPage } from './tileSelectionPage';
import { UndoLastEventPage } from './undoLastEventPage';

const AdminPages: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [undoLastEventModeEnabled, setUndoLastEventModeEnabled] =
        useState<boolean>(false);

    useAsyncEffect(async () => {
        try {
            const response = await fetch('/api');

            if (response.status === 200) {
                const responseJson = await response.json();

                setEvents(responseJson);
            }
        } catch {}
    }, []);

    const updateEvents = async (updatedEvents: Event[]): Promise<boolean> => {
        const response = await fetch('/api', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedEvents),
        });

        if (response.status === 200) {
            setEvents(updatedEvents);
            return true;
        }

        return false;
    };

    const publishNewEvents = async (newEvents: Event[]): Promise<boolean> => {
        const updatedEvents = [...events, ...newEvents];

        return await updateEvents(updatedEvents);
    };

    const undoLastEvent = async (): Promise<boolean> => {
        const updatedEvents = events.slice(0, -1);

        return await updateEvents(updatedEvents);
    };

    const adminPageProps = {
        events,
        publishNewEvents,
        undoLastEvent,
        toggleUndoLastEventMode: () =>
            setUndoLastEventModeEnabled(!undoLastEventModeEnabled),
    };

    const mapTilesSelectedEvent = _.last(
        events.filter(isMapTilesSelectedEvent)
    );
    const activePlayerInStrategyPhase =
        currentPlayerTurnInStrategyPhase(events);
    const activePlayerInActionPhase = currentPlayerTurnInActionPhase(events);

    return (
        <StyledAdminPage>
            {undoLastEventModeEnabled ? (
                <UndoLastEventPage {...adminPageProps} />
            ) : events.length === 0 ? (
                <FactionAssignmentPage {...adminPageProps} />
            ) : !mapTilesSelectedEvent ? (
                <TileSelectionPage {...adminPageProps} />
            ) : isStartRoundPageVisible(events) ? (
                <StartRoundPage
                    {...adminPageProps}
                    currentRoundNumber={currentRoundNumber(events)}
                />
            ) : activePlayerInStrategyPhase &&
              isSelectStrategyCardPageVisible(events) ? (
                <StrategyCardSelectionPage
                    {...adminPageProps}
                    activePlayer={activePlayerInStrategyPhase}
                />
            ) : _.last(events)?.type === 'PlayerSelectedStrategyCard' ? (
                <PlayerOrderSelectionPage
                    {...adminPageProps}
                    currentRoundNumber={currentRoundNumber(events)}
                />
            ) : isAgendaPhasePageVisible(events) ? (
                <AgendaPhasePage
                    {...adminPageProps}
                    currentRoundNumber={currentRoundNumber(events)}
                />
            ) : activePlayerInActionPhase ? (
                <PlayerTurnPage
                    {...adminPageProps}
                    activePlayerInActionPhase={activePlayerInActionPhase}
                    mapTilesSelectedEvent={mapTilesSelectedEvent}
                />
            ) : (
                <EndOfRoundScoringPage {...adminPageProps} />
            )}
        </StyledAdminPage>
    );
};

const isStartRoundPageVisible = (events: Event[]) => {
    const lastMapTilesSelectedIndex = lastIndexOfEventType(
        events,
        isMapTilesSelectedEvent
    );
    const lastRoundStartedIndex = lastIndexOfEventType(
        events,
        isRoundStartedEvent
    );
    const lastRoundEndedIndex = lastIndexOfEventType(events, isRoundEndedEvent);

    return (
        lastMapTilesSelectedIndex > lastRoundStartedIndex ||
        lastRoundEndedIndex > lastRoundStartedIndex
    );
};

const isSelectStrategyCardPageVisible = (events: Event[]) =>
    playerSelectedStrategyCardEventFromLastStrategyPhase(events).length <
    numberOfPlayersInGame;

const isAgendaPhasePageVisible = (events: Event[]) => {
    const lastAgendaPhaseStartedIndex = lastIndexOfEventType(
        events,
        isAgendaPhaseStartedEvent
    );
    const lastRoundEndedIndex = lastIndexOfEventType(events, isRoundEndedEvent);

    return lastAgendaPhaseStartedIndex > lastRoundEndedIndex;
};

const StyledAdminPage = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    font-size: 2.25rem;
`;

export { AdminPages };
