import { Faction } from './factions';
import { PlanetName } from './planets';
import { PlayerColor } from './playerColor';
import { SystemTileNumber } from './systemTiles';

type PlayerAssignedColorEvent = {
    type: 'PlayerAssignedColor';
    faction: Faction;
    color: PlayerColor;
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

type RoundEndedEvent = {
    type: 'RoundEnded';
    time: number;
};

const isPlayerAssignedColorEvent = (e: Event): e is PlayerAssignedColorEvent =>
    e.type === 'PlayerAssignedColor';

const isMapTilesSelectedEvent = (e: Event): e is MapTilesSelectedEvent =>
    e.type === 'MapTilesSelected';

const isActionPhaseStartedEvent = (e: Event): e is ActionPhaseStartedEvent =>
    e.type === 'ActionPhaseStarted';

const isPlanetControlledEvent = (e: Event): e is PlanetControlledEvent =>
    e.type === 'PlanetControlled';

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
    | MapTilesSelectedEvent
    | PlanetControlledEvent
    | PlanetDestroyedEvent
    | PlanetEnhancedEvent
    | PlayerAssignedColorEvent
    | PlayerFinishedTurnEvent
    | PlayerScoredVictoryPointEvent
    | RoundEndedEvent
    | RoundStartedEvent;

export {
    Event,
    isActionPhaseStartedEvent,
    isMapTilesSelectedEvent,
    isPlanetControlledEvent,
    isPlanetDestroyedEvent,
    isPlanetEnhancedEvent,
    isPlayerAssignedColorEvent,
    isPlayerScoredVictoryPointEvent,
    isRoundEndedEvent,
    isRoundStartedOrEndedEvent,
    MapTilesSelectedEvent,
    PlanetControlledEvent,
    PlayerFinishedTurnEvent,
};
