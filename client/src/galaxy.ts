import {
    Event,
    isCreussHeroPlayedEvent,
    isMapTileAddedToBoardEvent,
    isMapTilesSelectedEvent,
    MapTileAddedToBoardPosition,
} from './events';
import { SystemTileNumber, SystemWithPlanetsTileNumber } from './systemTiles';
import { range } from './util';

const galaxyColumnCount = 7;

const tilesPerColumn = (index: number) =>
    index > Math.floor(galaxyColumnCount / 2)
        ? galaxyColumnCount - index + Math.floor(galaxyColumnCount / 2)
        : galaxyColumnCount - (Math.floor(galaxyColumnCount / 2) - index);

const tileIndex = (columnIndex: number, rowIndex: number): number =>
    range(columnIndex).reduce((acc, n) => acc + tilesPerColumn(n), 0) +
    rowIndex;

const buildGalaxy = (events: Event[]): Galaxy =>
    events.reduce(
        (acc, n) => {
            if (isMapTilesSelectedEvent(n)) {
                return {
                    ...acc,
                    initialSystemTiles: n.selections,
                };
            }

            if (isMapTileAddedToBoardEvent(n)) {
                return {
                    ...acc,
                    systemTilesAdded: [
                        ...acc.systemTilesAdded,
                        { tileNumber: n.tileNumber, position: n.position },
                    ],
                };
            }

            if (isCreussHeroPlayedEvent(n)) {
                return {
                    ...acc,
                    initialSystemTiles: Object.entries(
                        acc.initialSystemTiles
                    ).reduce(
                        (acc, [k, v]) => ({
                            ...acc,
                            [Number.parseInt(k)]:
                                v === n.tileNumberOne
                                    ? n.tileNumberTwo
                                    : v === n.tileNumberTwo
                                      ? n.tileNumberOne
                                      : v,
                        }),
                        {} as Record<number, SystemTileNumber>
                    ),
                    systemTilesAdded: acc.systemTilesAdded.map(
                        (sta) =>
                            ({
                                ...sta,
                                tileNumber:
                                    sta.tileNumber === n.tileNumberOne
                                        ? n.tileNumberTwo
                                        : sta.tileNumber === n.tileNumberTwo
                                          ? n.tileNumberOne
                                          : sta.tileNumber,
                            }) as SystemTileAdded
                    ),
                };
            }

            return acc;
        },
        {
            initialSystemTiles: {} as Record<number, SystemTileNumber>,
            systemTilesAdded: [] as SystemTileAdded[],
        }
    );

type Galaxy = {
    initialSystemTiles: Record<number, SystemTileNumber>;
    systemTilesAdded: SystemTileAdded[];
};

type SystemTileAdded = {
    tileNumber: SystemWithPlanetsTileNumber;
    position: MapTileAddedToBoardPosition;
};

export {
    buildGalaxy,
    Galaxy,
    galaxyColumnCount,
    SystemTileAdded,
    tileIndex,
    tilesPerColumn,
};
