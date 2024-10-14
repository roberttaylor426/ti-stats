import _ from 'underscore';

import {
    Faction,
    FactionSelection,
    isFactionSelectionWithCustomHomeworlds,
} from './factions';
import { PlanetName } from './planets';
import { PlayerColor } from './playerColors';
import { SystemTileNumber } from './systemTiles';
import { Technology } from './technologies';

type PlayersAssignedFactionsAndColorsEvent = {
    type: 'PlayersAssignedFactionsAndColors';
    colorAssignments: Record<Faction, PlayerColor>;
    factionSelections: FactionSelection[];
};

type MapTilesSelectedEvent = {
    type: 'MapTilesSelected';
    selections: Record<number, SystemTileNumber>;
};

type RoundStartedEvent = {
    type: 'RoundStarted';
    time: number;
};

type ActionPhaseStartedEvent = {
    type: 'ActionPhaseStarted';
    time: number;
    playerOrder: Faction[];
};

type TechnologyResearchedEvent = {
    type: 'TechnologyResearched';
    technology: Technology;
    faction: Faction;
};

type PlayerFinishedTurnEvent = {
    type: 'PlayerFinishedTurn';
    time: number;
    faction: Faction;
    pass: boolean;
};

type PlayerScoredVictoryPointEvent = {
    type: 'PlayerScoredVictoryPoint';
    faction: Faction;
    delta: number;
};

type PlanetEnhancedEvent = {
    type: 'PlanetEnhanced';
    planet: PlanetName;
    extraResources: number;
    extraInfluence: number;
};

type PlanetControlledEvent = {
    type: 'PlanetControlled';
    planet: PlanetName;
    faction: Faction;
};

type PlanetDestroyedEvent = {
    type: 'PlanetDestroyed';
    planet: PlanetName;
};

type AgendaPhaseStartedEvent = {
    type: 'AgendaPhaseStarted';
    time: number;
};

type RoundEndedEvent = {
    type: 'RoundEnded';
    time: number;
};

const isPlayersAssignedFactionsAndColorsEvent = (
    e: Event
): e is PlayersAssignedFactionsAndColorsEvent =>
    e.type === 'PlayersAssignedFactionsAndColors';

const isMapTilesSelectedEvent = (e: Event): e is MapTilesSelectedEvent =>
    e.type === 'MapTilesSelected';

const isActionPhaseStartedEvent = (e: Event): e is ActionPhaseStartedEvent =>
    e.type === 'ActionPhaseStarted';

const isPlanetControlledEvent = (e: Event): e is PlanetControlledEvent =>
    e.type === 'PlanetControlled';

const isTechnologyResearchedEvent = (
    e: Event
): e is TechnologyResearchedEvent => e.type === 'TechnologyResearched';

const isPlayerScoredVictoryPointEvent = (
    e: Event
): e is PlayerScoredVictoryPointEvent => e.type === 'PlayerScoredVictoryPoint';

const isRoundStartedOrEndedEvent = (
    e: Event
): e is RoundStartedEvent | RoundEndedEvent =>
    e.type === 'RoundStarted' || e.type === 'RoundEnded';

const isRoundEndedEvent = (e: Event): e is RoundEndedEvent =>
    e.type === 'RoundEnded';

const isPlanetEnhancedEvent = (e: Event): e is PlanetEnhancedEvent =>
    e.type === 'PlanetEnhanced';

const isPlanetDestroyedEvent = (e: Event): e is PlanetDestroyedEvent =>
    e.type === 'PlanetDestroyed';

type Event =
    | ActionPhaseStartedEvent
    | AgendaPhaseStartedEvent
    | MapTilesSelectedEvent
    | PlanetControlledEvent
    | PlanetDestroyedEvent
    | PlanetEnhancedEvent
    | PlayersAssignedFactionsAndColorsEvent
    | PlayerFinishedTurnEvent
    | PlayerScoredVictoryPointEvent
    | RoundEndedEvent
    | RoundStartedEvent
    | TechnologyResearchedEvent;

const playerFactionsAndColors = (
    events: Event[]
): Record<Faction, PlayerColor> =>
    _.last(events.filter(isPlayersAssignedFactionsAndColorsEvent))
        ?.colorAssignments || ({} as Record<Faction, PlayerColor>);

const factionSelections = (events: Event[]): FactionSelection[] =>
    _.last(events.filter(isPlayersAssignedFactionsAndColorsEvent))
        ?.factionSelections || [];

const factionsInGame = (events: Event[]): Faction[] =>
    factionSelections(events).map((fs) =>
        isFactionSelectionWithCustomHomeworlds(fs) ? fs.faction : fs
    );

const technologiesResearchedByFaction = (
    faction: Faction,
    events: Event[]
): Technology[] =>
    events
        .filter(isTechnologyResearchedEvent)
        .filter((e) => e.faction === faction)
        .map((e) => e.technology);

const hasMecatolRexBeenCaptured = (events: Event[]): boolean =>
    events.some(
        (e) => e.type === 'PlanetControlled' && e.planet === 'Mecatol Rex'
    );

export {
    Event,
    factionSelections,
    factionsInGame,
    hasMecatolRexBeenCaptured,
    isActionPhaseStartedEvent,
    isMapTilesSelectedEvent,
    isPlanetControlledEvent,
    isPlanetDestroyedEvent,
    isPlanetEnhancedEvent,
    isPlayersAssignedFactionsAndColorsEvent,
    isPlayerScoredVictoryPointEvent,
    isRoundEndedEvent,
    isRoundStartedOrEndedEvent,
    isTechnologyResearchedEvent,
    MapTilesSelectedEvent,
    PlanetControlledEvent,
    playerFactionsAndColors,
    PlayerFinishedTurnEvent,
    technologiesResearchedByFaction,
};
