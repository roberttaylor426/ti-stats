import { Faction, PlayerColor } from './domain';
import { SystemTileNumber } from './systemTiles';

type PlayerAssignedColorEvent = {
    type: 'PlayerAssignedColor';
    player: Faction;
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
    player: Faction;
};

type PlanetEnhancedEvent = {
    type: 'PlanetEnhanced';
    planet: string;
    extraResources: number;
    extraInfluence: number;
};

type PlanetControlledEvent = {
    type: 'PlanetControlled';
    planet: string;
    player: Faction;
};

type RoundEndedEvent = {
    type: 'RoundStarted';
    time: number;
};

const isMapTileSelected = (e: Event): e is MapTileSelectedEvent =>
    e.type === 'MapTileSelected';

type Event =
    | PlayerAssignedColorEvent
    | MapTileSelectedEvent
    | RoundStartedEvent
    | ActionPhaseStartedEvent
    | PlayerFinishedTurnEvent
    | PlanetEnhancedEvent
    | PlanetControlledEvent
    | RoundEndedEvent;

export { Event, isMapTileSelected, MapTileSelectedEvent };
