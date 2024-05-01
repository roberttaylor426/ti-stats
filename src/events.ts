import { Faction, PlayerColor } from './domain';
import { TileNumber } from './tiles';

type PlayerAssignedColorEvent = {
    type: 'PlayerAssignedColor';
    player: Faction;
    color: PlayerColor;
};

type MapTileSelectedEvent = {
    type: 'MapTileSelected';
    tile: TileNumber;
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

type Event =
    | PlayerAssignedColorEvent
    | MapTileSelectedEvent
    | RoundStartedEvent
    | ActionPhaseStartedEvent
    | PlayerFinishedTurnEvent
    | PlanetEnhancedEvent
    | PlanetControlledEvent
    | RoundEndedEvent;
