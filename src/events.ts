import { Faction, PlayerColor } from './domain';
import { PlanetName } from './planets';
import { SystemTileNumber } from './systemTiles';

type PlayerAssignedColorEvent = {
    type: 'PlayerAssignedColor';
    faction: Faction;
    color: PlayerColor;
};

type MapTileSelectedEvent = {
    type: 'MapTileSelected';
    systemTileNumber: SystemTileNumber;
    position: number;
};

type RoundStartedEvent = {
    type: 'RoundStarted';
    time: number;
};

type ActionPhaseStartedEvent = {
    type: 'ActionPhaseStarted';
    time: number;
};

type PlayerFinishedTurnEvent = {
    type: 'PlayerFinishedTurn';
    time: number;
    faction: Faction;
};

type PlayerScoredVictoryPointEvent = {
    type: 'PlayerScoredVictoryPoint';
    faction: Faction;
    delta: 1 | -1;
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
    type: 'RoundStarted';
    time: number;
};

const isPlayerAssignedColorEvent = (e: Event): e is PlayerAssignedColorEvent =>
    e.type === 'PlayerAssignedColor';

const isMapTileSelectedEvent = (e: Event): e is MapTileSelectedEvent =>
    e.type === 'MapTileSelected';

const isPlanetControlledEvent = (e: Event): e is PlanetControlledEvent =>
    e.type === 'PlanetControlled';

const isPlayerScoredVictoryPointEvent = (
    e: Event
): e is PlayerScoredVictoryPointEvent => e.type === 'PlayerScoredVictoryPoint';

type Event =
    | ActionPhaseStartedEvent
    | MapTileSelectedEvent
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
    isMapTileSelectedEvent,
    isPlanetControlledEvent,
    isPlayerAssignedColorEvent,
    isPlayerScoredVictoryPointEvent,
    MapTileSelectedEvent,
    PlanetControlledEvent,
};
