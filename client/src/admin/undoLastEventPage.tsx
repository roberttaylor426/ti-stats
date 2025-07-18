import React from 'react';
import styled from 'styled-components';
import _ from 'underscore';

import { Event } from '../events';
import { systemTileDescription } from '../systemTiles';
import { AdminPageProps } from './adminPageProps';
import { Button } from './components/button';
import { PageTitle } from './components/pageTitle';

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
        case 'ActionCardsDrawnDuringStatusPhase':
            return 'Action cards drawn during status phase';
        case 'ActionPhaseStarted':
            return 'Action phase started';
        case 'AgendaPhaseStarted':
            return 'Agenda phase started';
        case 'AgendaCardRevealed':
            return 'Agenda card revealed';
        case 'CardsReadiedDuringStatusPhase':
            return 'Cards readied during status phase';
        case 'CommandTokensGainedAndRedistributedDuringStatusPhase':
            return 'Command tokens gained and redistributed during status phase';
        case 'CommandTokensRemovedDuringStatusPhase':
            return 'Command tokens removed during status phase';
        case 'GammaWormholeFound':
            return `Gamma wormhole found - ${systemTileDescription(e.tileNumber)}`;
        case 'MapTileAddedToBoard':
            return 'Map tile added to board';
        case 'MapTilesSelected':
            return 'Map tiles selected';
        case 'MiragePlanetFound':
            return 'Mirage found';
        case 'ObjectivesScoredDuringStatusPhase':
            return 'Objectives scored during status phase';
        case 'PlayerCompletedStrategyCardPrimaryAction':
            return `Player completed strategy card primary action - ${e.faction}`;
        case 'PlanetControlled':
            return `Planet controlled - ${e.planet}`;
        case 'PlanetDestroyed':
            return `Planet destroyed - ${e.planet}`;
        case 'PlanetEnhanced':
            return `Planet enhanced - ${e.planet}`;
        case 'PlanetlessSystemControlled':
            return `Planetless system controlled - ${systemTileDescription(e.tileNumber)}`;
        case 'PlayersAssignedFactionsAndColors':
            return 'Player factions and colors assigned';
        case 'PlayerAttackedSystem':
            return `Player attacked system - ${e.faction} / ${systemTileDescription(e.tileNumber)}`;
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
        case 'PublicObjectiveRevealedDuringStatusPhase':
            return 'Public objectives revealed during status phase';
        case 'RoundEnded':
            return 'Round ended';
        case 'RoundStarted':
            return 'Round started';
        case 'SpeakerAssigned':
            return 'Speaker assigned';
        case 'UnitsRepairedDuringStatusPhase':
            return 'Units repaired during status phase';
    }
};

const EventLabel = styled.span`
    color: red;
`;

export { UndoLastEventPage };
