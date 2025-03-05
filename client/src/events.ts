import _ from 'underscore';

import { AgendaCard } from './agendaCards';
import {
    Faction,
    FactionSelection,
    isFactionSelectionWithCustomHomeworlds,
    selectedFaction,
} from './factions';
import { PlanetName, planets, ResourcesAndInfluence } from './planets';
import { numberOfPlayersInGame, PlayerColor } from './playerColors';
import { StrategyCard } from './strategyCards';
import {
    factionSystemTileNumber,
    ghostsOfCreussHomeTileNumber,
    isSystemWithPlanetsTile,
    malliceTileNumber,
    PlanetlessSystemTile,
    PlanetlessSystemTileNumber,
    systemTile,
    SystemTileNumber,
    SystemWithPlanetsTileNumber,
} from './systemTiles';
import { Technology } from './technologies';
import { notUndefined } from './util';

type PlayersAssignedFactionsAndColorsEvent = {
    type: 'PlayersAssignedFactionsAndColors';
    time: number;
    colorAssignments: Record<Faction, PlayerColor>;
    factionSelections: FactionSelection[];
};

type MapTilesSelectedEvent = {
    type: 'MapTilesSelected';
    time: number;
    selections: Record<number, SystemTileNumber>;
};

type SpeakerAssignedEvent = {
    type: 'SpeakerAssigned';
    time: number;
    faction: Faction;
};

type RoundStartedEvent = {
    type: 'RoundStarted';
    time: number;
};

type PlayerSelectedStrategyCardEvent = {
    type: 'PlayerSelectedStrategyCard';
    time: number;
    faction: Faction;
    strategyCard: StrategyCard;
};

type ActionPhaseStartedEvent = {
    type: 'ActionPhaseStarted';
    time: number;
    playerOrder: Faction[];
};

type PlayerResearchedTechnologyEvent = {
    type: 'PlayerResearchedTechnology';
    time: number;
    technology: Technology;
    faction: Faction;
};

type PlayerPlayedStrategyCardEvent = {
    type: 'PlayerPlayedStrategyCard';
    time: number;
    strategyCard: StrategyCard;
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
    time: number;
    faction: Faction;
    delta: number;
};

type PlanetEnhancedEvent = {
    type: 'PlanetEnhanced';
    time: number;
    planet: PlanetName;
    extraResources: number;
    extraInfluence: number;
};

type PlanetControlledEvent = {
    type: 'PlanetControlled';
    time: number;
    planet: PlanetName;
    faction: Faction;
};

type PlanetlessSystemControlledEvent = {
    type: 'PlanetlessSystemControlled';
    time: number;
    tileNumber: PlanetlessSystemTileNumber;
    faction: Faction | undefined;
};

type MiragePlanetFoundEvent = {
    type: 'MiragePlanetFound';
    time: number;
    tileNumber: PlanetlessSystemTileNumber;
    faction: Faction;
};

type PlanetDestroyedEvent = {
    type: 'PlanetDestroyed';
    time: number;
    planet: PlanetName;
    faction: Faction;
};

type MapTileAddedToBoardPosition =
    | {
          column: -2 | 8;
          row: -1 | 0 | 1 | 2 | 3;
      }
    | {
          column: -1 | 7;
          row: -2 | -1 | 0 | 1 | 2 | 3 | 4;
      }
    | {
          column: 0 | 6;
          row: -2 | -1 | 4 | 5;
      }
    | {
          column: 1 | 5;
          row: -2 | -1 | 5 | 6;
      }
    | {
          column: 2 | 4;
          row: -2 | -1 | 6 | 7;
      }
    | {
          column: 3;
          row: -1 | 7;
      };

type ColumnForNewMapTile = -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type RowForNewMapTile = -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

const possibleRowsForNewMapTile = (
    c: ColumnForNewMapTile | undefined
): RowForNewMapTile[] => {
    switch (c) {
        case -2:
        case 8:
            return [-1, 0, 1, 2, 3];
        case -1:
        case 7:
            return [-2, -1, 0, 1, 2, 3, 4];
        case 0:
        case 6:
            return [-2, -1, 4, 5];
        case 1:
        case 5:
            return [-2, -1, 5, 6];
        case 2:
        case 4:
            return [-2, -1, 6, 7];
        case 3:
            return [-1, 7];
        case undefined:
            return [];
    }
};

type MapTileAddedToBoardEvent = {
    type: 'MapTileAddedToBoard';
    time: number;
    tileNumber: SystemWithPlanetsTileNumber;
    position: MapTileAddedToBoardPosition;
};

type AgendaPhaseStartedEvent = {
    type: 'AgendaPhaseStarted';
    time: number;
};

type AgendaCardRevealedEvent = {
    type: 'AgendaCardRevealed';
    time: number;
    card: AgendaCard;
};

type ObjectivesScoredDuringStatusPhaseEvent = {
    type: 'ObjectivesScoredDuringStatusPhase';
    time: number;
};

type PublicObjectivesRevealedDuringStatusPhaseEvent = {
    type: 'PublicObjectivesRevealedDuringStatusPhase';
    time: number;
};

type ActionCardsDrawnDuringStatusPhaseEvent = {
    type: 'ActionCardsDrawnDuringStatusPhase';
    time: number;
};

type CommandTokensRemovedDuringStatusPhaseEvent = {
    type: 'CommandTokensRemovedDuringStatusPhase';
    time: number;
};

type CommandTokensGainedAndRedistributedDuringStatusPhaseEvent = {
    type: 'CommandTokensGainedAndRedistributedDuringStatusPhase';
    time: number;
};

type CardsReadiedDuringStatusPhaseEvent = {
    type: 'CardsReadiedDuringStatusPhase';
    time: number;
};

type UnitsRepairedDuringStatusPhaseEvent = {
    type: 'UnitsRepairedDuringStatusPhase';
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

const lastIndexOfEventType = (events: Event[], eg: EventGuard<Event>): number =>
    _.last(
        events.map((e, index) => (eg(e) ? index : -1)).filter((n) => n !== -1)
    ) || -1;

const isPlayersAssignedFactionsAndColorsEvent = (
    e: Event
): e is PlayersAssignedFactionsAndColorsEvent =>
    e.type === 'PlayersAssignedFactionsAndColors';

const isMapTilesSelectedEvent = (e: Event): e is MapTilesSelectedEvent =>
    e.type === 'MapTilesSelected';

const isSpeakerAssignedEvent = (e: Event): e is SpeakerAssignedEvent =>
    e.type === 'SpeakerAssigned';

const isActionPhaseStartedEvent = (e: Event): e is ActionPhaseStartedEvent =>
    e.type === 'ActionPhaseStarted';

const isAgendaPhaseStartedEvent = (e: Event): e is AgendaPhaseStartedEvent =>
    e.type === 'AgendaPhaseStarted';

const isAgendaCardRevealedEvent = (e: Event): e is AgendaCardRevealedEvent =>
    e.type === 'AgendaCardRevealed';

const isPlanetControlledEvent = (e: Event): e is PlanetControlledEvent =>
    e.type === 'PlanetControlled';

const isPlanetlessSystemControlledEvent = (
    e: Event
): e is PlanetlessSystemControlledEvent =>
    e.type === 'PlanetlessSystemControlled';

const isMiragePlanetFoundEvent = (e: Event): e is MiragePlanetFoundEvent =>
    e.type === 'MiragePlanetFound';

const isMapTileAddedToBoardEvent = (e: Event): e is MapTileAddedToBoardEvent =>
    e.type === 'MapTileAddedToBoard';

const isTechnologyResearchedEvent = (
    e: Event
): e is PlayerResearchedTechnologyEvent =>
    e.type === 'PlayerResearchedTechnology';

const isPlayerScoredVictoryPointEvent = (
    e: Event
): e is PlayerScoredVictoryPointEvent => e.type === 'PlayerScoredVictoryPoint';

const isPlayerFinishedTurnEvent = (e: Event): e is PlayerFinishedTurnEvent =>
    e.type === 'PlayerFinishedTurn';

const isRoundStartedEvent = (e: Event): e is RoundStartedEvent =>
    e.type === 'RoundStarted';

const isPlayerSelectedStrategyCardEvent = (
    e: Event
): e is PlayerSelectedStrategyCardEvent =>
    e.type === 'PlayerSelectedStrategyCard';

const isStrategyCardPlayedEvent = (
    e: Event
): e is PlayerPlayedStrategyCardEvent => e.type === 'PlayerPlayedStrategyCard';

const isRoundEndedEvent = (e: Event): e is RoundEndedEvent =>
    e.type === 'RoundEnded';

const isPlanetEnhancedEvent = (e: Event): e is PlanetEnhancedEvent =>
    e.type === 'PlanetEnhanced';

const isPlanetDestroyedEvent = (e: Event): e is PlanetDestroyedEvent =>
    e.type === 'PlanetDestroyed';

type Event =
    | ActionCardsDrawnDuringStatusPhaseEvent
    | ActionPhaseStartedEvent
    | AgendaCardRevealedEvent
    | AgendaPhaseStartedEvent
    | CardsReadiedDuringStatusPhaseEvent
    | CommandTokensGainedAndRedistributedDuringStatusPhaseEvent
    | CommandTokensRemovedDuringStatusPhaseEvent
    | MapTileAddedToBoardEvent
    | MapTilesSelectedEvent
    | MiragePlanetFoundEvent
    | ObjectivesScoredDuringStatusPhaseEvent
    | PlanetControlledEvent
    | PlanetDestroyedEvent
    | PlanetEnhancedEvent
    | PlanetlessSystemControlledEvent
    | PlayersAssignedFactionsAndColorsEvent
    | PlayerFinishedTurnEvent
    | PlayerPlayedStrategyCardEvent
    | PlayerResearchedTechnologyEvent
    | PlayerScoredVictoryPointEvent
    | PlayerSelectedStrategyCardEvent
    | PublicObjectivesRevealedDuringStatusPhaseEvent
    | RoundEndedEvent
    | RoundStartedEvent
    | SpeakerAssignedEvent
    | UnitsRepairedDuringStatusPhaseEvent;

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

const hasMiragePlanetBeenFound = (events: Event[]): boolean =>
    events.some((e) => e.type === 'MiragePlanetFound');

const hasMiragePlanetBeenFoundOnSystemTileWithNumber = (
    events: Event[],
    stn: PlanetlessSystemTileNumber
): boolean => events.find(isMiragePlanetFoundEvent)?.tileNumber === stn;

const hasMiragePlanetBeenFoundOnSystemTile = (
    events: Event[],
    tile: PlanetlessSystemTile
): boolean =>
    hasMiragePlanetBeenFoundOnSystemTileWithNumber(events, tile.tileNumber);

const systemTilePlanets = (
    events: Event[],
    stn: SystemTileNumber
): PlanetName[] => {
    const st = systemTile(stn);

    if (isSystemWithPlanetsTile(st)) {
        return st.planets;
    }

    if (hasMiragePlanetBeenFoundOnSystemTile(events, st)) {
        return ['Mirage'];
    }

    return [];
};

const currentSpeaker = (events: Event[]): Faction | undefined =>
    _.last(events.filter(isSpeakerAssignedEvent))?.faction;

const factionAtTileIndex = (
    tileIndex: number,
    events: Event[]
): Faction | undefined => {
    const mapTilesSelectedEvent = _.last(
        events.filter(isMapTilesSelectedEvent)
    );

    if (!mapTilesSelectedEvent) {
        return undefined;
    }

    const factionSelectionAtIndex = factionSelections(events).find(
        (fs) =>
            factionSystemTileNumber(fs) ===
            mapTilesSelectedEvent.selections[tileIndex - 1]
    );

    return factionSelectionAtIndex
        ? selectedFaction(factionSelectionAtIndex)
        : undefined;
};

const currentStrategyPhasePlayerOrder = (
    events: Event[]
): Faction[] | undefined =>
    [
        factionAtTileIndex(1, events),
        factionAtTileIndex(16, events),
        factionAtTileIndex(34, events),
        factionAtTileIndex(37, events),
        factionAtTileIndex(22, events),
        factionAtTileIndex(4, events),
    ] as Faction[];

const currentPlayerTurnInStrategyPhase = (
    events: Event[]
): Faction | undefined => {
    const speaker = currentSpeaker(events);
    const playerOrder = currentStrategyPhasePlayerOrder(events);

    const playerSelectedStrategyCardEvents =
        playerSelectedStrategyCardEventsFromStrategyPhaseThisRound(events);

    if (
        playerSelectedStrategyCardEvents.length >= numberOfPlayersInGame ||
        !speaker ||
        !playerOrder
    ) {
        return undefined;
    }

    const speakerIndex = playerOrder.indexOf(speaker);

    return playerOrder[
        (speakerIndex + playerSelectedStrategyCardEvents.length) %
            numberOfPlayersInGame
    ];
};

const playerSelectedStrategyCardEventsFromStrategyPhaseThisRound = (
    events: Event[]
): PlayerSelectedStrategyCardEvent[] => {
    const lastRoundStartedIndex = lastIndexOfEventType(
        events,
        isRoundStartedEvent
    );

    return events
        .slice(lastRoundStartedIndex + 1)
        .filter(isPlayerSelectedStrategyCardEvent);
};

const systemTileNumbersInPlay = (events: Event[]): SystemTileNumber[] =>
    [
        ...Object.values(
            _.last(events.filter(isMapTilesSelectedEvent))?.selections || {}
        ),
        ...events.filter(isMapTileAddedToBoardEvent).map((e) => e.tileNumber),
        malliceTileNumber,
        factionsInGame(events).includes('The Ghosts of Creuss')
            ? ghostsOfCreussHomeTileNumber
            : undefined,
    ].filter(notUndefined) as SystemTileNumber[];

const currentActionPhasePlayerOrder = (events: Event[]): Faction[] =>
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

const unpassedPlayersThisActionPhase = (events: Event[]): Faction[] =>
    currentActionPhasePlayerOrder(events).filter(
        (f) =>
            !turnsFinishedThisActionPhase(events).some(
                (e) => e.faction === f && e.pass
            )
    );

const currentPlayerTurnInActionPhase = (
    events: Event[]
): Faction | undefined => {
    const turnsFinished = turnsFinishedThisActionPhase(events);
    const lastPlayerToHaveATurn = _.last(turnsFinished);
    const playerOrder = currentActionPhasePlayerOrder(events);

    const indexOfPlayerAfterLastToHaveATurn = !lastPlayerToHaveATurn
        ? 0
        : playerOrder.indexOf(lastPlayerToHaveATurn.faction) + 1;

    return findNextUnpassedPlayerInActionPhase(
        playerOrder,
        unpassedPlayersThisActionPhase(events),
        indexOfPlayerAfterLastToHaveATurn
    );
};

const findNextUnpassedPlayerInActionPhase = (
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

    return findNextUnpassedPlayerInActionPhase(
        playerOrder,
        unpassedPlayers,
        fromIndex + 1
    );
};

const hasGameStarted = (events: Event[]): boolean =>
    !!events.find(isRoundStartedEvent);

const currentRoundNumber = (events: Event[]): number =>
    events.filter(isRoundStartedEvent).length;

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

const latestPlanetlessSystemControlledEventsBySystem = (
    events: Event[]
): PlanetlessSystemControlledEvent[] =>
    events
        .filter(isPlanetlessSystemControlledEvent)
        .reverse()
        .reduce(
            (acc: PlanetlessSystemControlledEvent[], n) =>
                acc.find((e) => e.tileNumber === n.tileNumber)
                    ? acc
                    : [...acc, n],
            []
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

const strategyCardPlayedByPlayerOnPreviousTurnThisRound = (
    events: Event[],
    faction: Faction
): boolean => {
    const lastRoundStartedIndex = lastIndexOfEventType(
        events,
        isRoundStartedEvent
    );

    const lastPlayerFinishedTurnIndex = lastIndexOfEventType(
        events,
        isPlayerFinishedTurnEvent
    );

    const eventsThisRoundBeforeStartOfTurn = events.slice(
        lastRoundStartedIndex + 1,
        lastPlayerFinishedTurnIndex
    );

    return !!eventsThisRoundBeforeStartOfTurn
        .filter(isStrategyCardPlayedEvent)
        .find((e) => e.faction === faction);
};

const strategyCardPlayedByPlayerThisTurn = (
    events: Event[],
    faction: Faction
): boolean => {
    const lastPlayerFinishedTurnIndex = lastIndexOfEventType(
        events,
        isPlayerFinishedTurnEvent
    );

    const eventsThisTurn = events.slice(lastPlayerFinishedTurnIndex + 1);

    return !!eventsThisTurn
        .filter(isStrategyCardPlayedEvent)
        .find((e) => e.faction === faction);
};

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

const timesTakenPerPlayerPerTurn = (
    events: Event[]
): Record<Faction, number[]> =>
    events.reduce(
        (acc, n) => {
            if (n.type === 'ActionPhaseStarted') {
                return {
                    ...acc,
                    playerTurnStartedTime: n.time,
                };
            }
            if (n.type === 'PlayerFinishedTurn') {
                return {
                    playerTurnTimes: {
                        ...acc.playerTurnTimes,
                        [n.faction]: [
                            ...acc.playerTurnTimes[n.faction],
                            n.time - acc.playerTurnStartedTime,
                        ],
                    },
                    playerTurnStartedTime: n.time,
                };
            }

            return acc;
        },
        {
            playerTurnStartedTime: 0,
            playerTurnTimes: factionsInGame(events).reduce(
                (acc, n) => ({ ...acc, [n]: [] }),
                {} as Record<Faction, number[]>
            ),
        }
    ).playerTurnTimes;

type TimesTaken = {
    faction: Faction;
    playerColor: PlayerColor;
    maxTimeTakenInMillis: number;
    avTimeTakenInMillis: number;
};

const timesTakenPerPlayer = (events: Event[]): TimesTaken[] => {
    const timesTakenPerTurn = timesTakenPerPlayerPerTurn(events);
    return factionsInGame(events).map((f) => ({
        faction: f,
        playerColor: playerFactionsAndColors(events)[f],
        maxTimeTakenInMillis: timesTakenPerTurn[f].reduce(
            (acc, n) => Math.max(acc, n),
            0
        ),
        avTimeTakenInMillis:
            timesTakenPerTurn[f].reduce((acc, n) => acc + n, 0) /
            timesTakenPerTurn[f].length,
    }));
};

const playerScore = (events: Event[], f: Faction): number =>
    events
        .filter(isPlayerScoredVictoryPointEvent)
        .filter((e) => e.faction === f)
        .reduce((acc, n) => acc + n.delta, 0);

const isItAgendaPhase = (events: Event[]) => {
    const lastAgendaPhaseStartedIndex = lastIndexOfEventType(
        events,
        isAgendaPhaseStartedEvent
    );
    const lastRoundEndedIndex = lastIndexOfEventType(events, isRoundEndedEvent);

    return lastAgendaPhaseStartedIndex > lastRoundEndedIndex;
};

export {
    ActionPhaseStartedEvent,
    ColumnForNewMapTile,
    currentPlayerTurnInActionPhase,
    currentPlayerTurnInStrategyPhase,
    currentRoundNumber,
    currentSpeaker,
    Event,
    factionSelections,
    factionsInGame,
    hasGameStarted,
    hasMecatolRexBeenCaptured,
    hasMiragePlanetBeenFound,
    hasMiragePlanetBeenFoundOnSystemTile,
    hasMiragePlanetBeenFoundOnSystemTileWithNumber,
    isActionPhaseStartedEvent,
    isAgendaCardRevealedEvent,
    isAgendaPhaseStartedEvent,
    isItAgendaPhase,
    isMapTileAddedToBoardEvent,
    isMapTilesSelectedEvent,
    isPlanetControlledEvent,
    isPlanetDestroyedEvent,
    isPlanetEnhancedEvent,
    isPlanetlessSystemControlledEvent,
    isPlayerFinishedTurnEvent,
    isPlayersAssignedFactionsAndColorsEvent,
    isPlayerScoredVictoryPointEvent,
    isPlayerSelectedStrategyCardEvent,
    isRoundEndedEvent,
    isRoundStartedEvent,
    isSpeakerAssignedEvent,
    isStrategyCardPlayedEvent,
    isTechnologyResearchedEvent,
    isUnion,
    lastIndexOfEventType,
    latestPlanetControlledEventsByPlanet,
    latestPlanetlessSystemControlledEventsBySystem,
    MapTileAddedToBoardEvent,
    MapTileAddedToBoardPosition,
    MapTilesSelectedEvent,
    PlanetControlledEvent,
    PlanetlessSystemControlledEvent,
    planetsControlledByFaction,
    playerFactionsAndColors,
    PlayerFinishedTurnEvent,
    playerScore,
    playerSelectedStrategyCardEventsFromStrategyPhaseThisRound,
    possibleRowsForNewMapTile,
    resourcesAndInfluenceForFaction,
    RoundStartedEvent,
    RowForNewMapTile,
    strategyCardPlayedByPlayerOnPreviousTurnThisRound,
    strategyCardPlayedByPlayerThisTurn,
    systemTileNumbersInPlay,
    systemTilePlanets,
    technologiesResearchedByFaction,
    TimesTaken,
    timesTakenPerPlayer,
};
