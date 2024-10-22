import React from 'react';
import styled from 'styled-components';
import _ from 'underscore';

import { Event } from '../events';
import { AdminPageProps } from './adminPageProps';
import { Button, PageTitle } from './components';

const UndoLastEventPage: React.FC<AdminPageProps> = ({
    events,
    undoLastEvent,
    toggleUndoLastEventMode,
}) => {
    const lastEvent = _.last(events);

    return (
        <>
            <PageTitle
                toggleUndoLastEventMode={toggleUndoLastEventMode}
                title={'Undo last'}
                buttonLabelOverride={'Back'}
            />
            <EventLabel>
                {lastEvent ? humanReadableEventLabel(lastEvent) : ''}
            </EventLabel>
            <Button onClick={undoLastEvent}>Undo</Button>
        </>
    );
};

const humanReadableEventLabel = (e: Event): string => {
    switch (e.type) {
        case 'ActionPhaseStarted':
            return 'Action phase started';
        case 'AgendaPhaseStarted':
            return 'Agenda phase started';
        case 'AgendaCardRevealed':
            return 'Agenda card revealed';
        case 'MapTilesSelected':
            return 'Map tiles selected';
        case 'PlanetControlled':
            return `Planet controlled - ${e.planet}`;
        case 'PlanetDestroyed':
            return `Planet destroyed - ${e.planet}`;
        case 'PlanetEnhanced':
            return `Planet enhanced - ${e.planet}`;
        case 'PlayersAssignedFactionsAndColors':
            return 'Player factions and colors assigned';
        case 'PlayerFinishedTurn':
            return `Player finished turn - ${e.faction}`;
        case 'PlayerPlayedStrategyCard':
            return `Strategy card played - ${e.faction} / ${e.strategyCard}`;
        case 'PlayerResearchedTechnology':
            return `Tech researched - ${e.faction} / ${e.technology.name}`;
        case 'PlayerScoredVictoryPoint':
            return `Player scored victory point - ${e.faction}`;
        case 'PlayerSelectedStrategyCard':
            return `Player selected strategy card - ${e.faction} / ${e.strategyCard}`;
        case 'RoundEnded':
            return 'Round ended';
        case 'RoundStarted':
            return 'Round started';
        case 'SpeakerAssigned':
            return 'Speaker assigned';
    }
};

const EventLabel = styled.span`
    color: red;
`;

export { UndoLastEventPage };
