import _ from 'underscore';

import {
    Faction,
    FactionSelection,
    isFactionSelectionWithCustomHomeworlds,
} from './factions';
import { PlanetName, planets, ResourcesAndInfluence } from './planets';
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

type EventGuard<T extends Event> = (x: Event) => x is T;

const isUnion =
    <T1 extends Event, T2 extends Event>(
        isT1: EventGuard<T1>,
        isT2: EventGuard<T2>
    ) =>
    (x: Event): x is T1 | T2 =>
        isT1(x) || isT2(x);

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

const isPlayerFinishedTurnEvent = (e: Event): e is PlayerFinishedTurnEvent =>
    e.type === 'PlayerFinishedTurn';

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

const currentRoundPlayerOrder = (events: Event[]): Faction[] =>
    _.last(events.filter(isActionPhaseStartedEvent))?.playerOrder || [];

const turnsFinishedThisActionPhase = (
    events: Event[]
): PlayerFinishedTurnEvent[] =>
    events.reduce((acc, n) => {
        if (n.type === 'ActionPhaseStarted') {
            return [];
        }
        if (n.type === 'PlayerFinishedTurn') {
            return [...acc, n];
        }
        return acc;
    }, [] as PlayerFinishedTurnEvent[]);

const unpassedPlayers = (events: Event[]): Faction[] =>
    currentRoundPlayerOrder(events).filter(
        (f) =>
            !turnsFinishedThisActionPhase(events).some(
                (e) => e.faction === f && e.pass
            )
    );

const currentPlayerTurn = (events: Event[]): Faction | undefined => {
    const turnsFinished = turnsFinishedThisActionPhase(events);
    const lastPlayerToHaveATurn = _.last(turnsFinished);
    const playerOrder = currentRoundPlayerOrder(events);

    const indexOfPlayerAfterLastToHaveATurn = !lastPlayerToHaveATurn
        ? 0
        : playerOrder.indexOf(lastPlayerToHaveATurn.faction) + 1;

    return findNextUnpassedPlayer(
        playerOrder,
        unpassedPlayers(events),
        indexOfPlayerAfterLastToHaveATurn
    );
};

const findNextUnpassedPlayer = (
    playerOrder: Faction[],
    unpassedPlayers: Faction[],
    fromIndex: number
): Faction | undefined => {
    if (unpassedPlayers.length === 0) {
        return undefined;
    }

    const potentialNextPlayer = playerOrder[fromIndex % playerOrder.length];

    if (unpassedPlayers.includes(potentialNextPlayer)) {
        return potentialNextPlayer;
    }

    return findNextUnpassedPlayer(playerOrder, unpassedPlayers, fromIndex + 1);
};

const currentRoundNumber = (events: Event[]): number =>
    events.filter(isRoundEndedEvent).length + 1;

const planetDestroyedEvents = (events: Event[]) =>
    events.filter(isPlanetDestroyedEvent);

const latestPlanetControlledEventsByPlanet = (events: Event[]) =>
    events
        .filter(isPlanetControlledEvent)
        .reverse()
        .reduce(
            (acc: PlanetControlledEvent[], n) =>
                acc.find((e) => e.planet === n.planet) ? acc : [...acc, n],
            []
        )
        .filter(
            (e) =>
                !planetDestroyedEvents(events).some(
                    (de) => de.planet === e.planet
                )
        );

const planetsControlledByFaction = (
    events: Event[],
    faction: Faction
): PlanetName[] =>
    latestPlanetControlledEventsByPlanet(events)
        .filter((e) => e.faction === faction)
        .filter(
            (e) =>
                !planetDestroyedEvents(events).some(
                    (de) => de.planet === e.planet
                )
        )
        .map((e) => e.planet);

const resourcesAndInfluenceForFaction = (
    events: Event[],
    f: Faction
): ResourcesAndInfluence => {
    const planetEnhancedEvents = events.filter(isPlanetEnhancedEvent);

    return planetsControlledByFaction(events, f)
        .map((p) => ({
            resources:
                planets[p].resources +
                planetEnhancedEvents
                    .filter((e) => e.planet === p)
                    .reduce((acc, n) => acc + n.extraResources, 0),
            influence:
                planets[p].influence +
                planetEnhancedEvents
                    .filter((e) => e.planet === p)
                    .reduce((acc, n) => acc + n.extraInfluence, 0),
        }))
        .reduce(
            (acc, n) => ({
                resources: acc.resources + n.resources,
                influence: acc.influence + n.influence,
            }),
            {
                resources: 0,
                influence: 0,
            }
        );
};

const playerScore = (events: Event[], f: Faction) =>
    events
        .filter(isPlayerScoredVictoryPointEvent)
        .filter((e) => e.faction === f)
        .reduce((acc, n) => acc + n.delta, 0);

export {
    ActionPhaseStartedEvent,
    currentPlayerTurn,
    currentRoundNumber,
    Event,
    factionSelections,
    factionsInGame,
    hasMecatolRexBeenCaptured,
    isActionPhaseStartedEvent,
    isMapTilesSelectedEvent,
    isPlanetControlledEvent,
    isPlanetDestroyedEvent,
    isPlanetEnhancedEvent,
    isPlayerFinishedTurnEvent,
    isPlayersAssignedFactionsAndColorsEvent,
    isPlayerScoredVictoryPointEvent,
    isRoundEndedEvent,
    isRoundStartedOrEndedEvent,
    isTechnologyResearchedEvent,
    isUnion,
    latestPlanetControlledEventsByPlanet,
    MapTilesSelectedEvent,
    PlanetControlledEvent,
    playerFactionsAndColors,
    PlayerFinishedTurnEvent,
    playerScore,
    resourcesAndInfluenceForFaction,
    technologiesResearchedByFaction,
};
