import React, { ReactNode } from 'react';
import styled from 'styled-components';
import _, { identity } from 'underscore';

import gammaWormholeToken from './assets/tiles/GammaToken.webp';
import mirageToken from './assets/tiles/MirageToken.webp';
import tile51 from './assets/tiles/ST_51.webp';
import tile82 from './assets/tiles/ST_82.webp';
import tile82Back from './assets/tiles/ST_82_Back.webp';
import {
    Event,
    factionsInGame,
    hasGammaWormholeBeenFoundOnSystemTileWithNumber,
    hasMiragePlanetBeenFoundOnSystemTileWithNumber,
    isMapTileAddedToBoardEvent,
    isMapTilesSelectedEvent,
    latestPlanetControlledEventsByPlanet,
    latestPlanetlessSystemControlledEventsBySystem,
    MapTileAddedToBoardEvent,
    playerFactionsAndColors,
    resourcesAndInfluenceForFaction,
    systemTileNumbersInPlay,
} from './events';
import { Faction } from './factions';
import { galaxyColumnCount, tileIndex, tilesPerColumn } from './galaxy';
import { PlanetMeta } from './planets';
import { hexPlayerColor, PlayerColor } from './playerColors';
import { Scoreboard, ScoreboardRow } from './scoreboard';
import { Stars } from './stars';
import { StatsContainer, StatsTitle } from './stats';
import {
    ghostsOfCreussHomeTileNumber,
    isPlanetlessSystemTileNumber,
    isSystemWithPlanetsTile,
    systemTile,
    systemTileImage,
    SystemTileNumber,
    SystemWithPlanetsTileNumber,
} from './systemTiles';
import { useAttackAlarms } from './useAttackAlarms';
import { useEvents } from './useEvents';
import { notUndefined, range } from './util';

/*
 Extract common scoreboard component
 Extract all pages into separate files
 Support tile changes in game (Creuss, Muaat heroes)
 Digitize the VP tracks
 Ability to lose a tech (Jol Nar)
 Can we keep track of votes?
 Mallice and Creuss tiles overlap certain tiles added to the galaxy
 Rename stuff in statusPage and tickerPage
*/

const GalaxyPage: React.FC = () => {
    const { events } = useEvents();

    useAttackAlarms(events);

    const mapTilesSelectedEvent = _.last(
        events.filter(isMapTilesSelectedEvent)
    );

    const factionResourcesAndInfluence: FactionResourcesAndInfluence[] =
        factionsInGame(events).map((f) => ({
            faction: f,
            playerColor: playerFactionsAndColors(events)[f],
            resourcesAndInfluence: resourcesAndInfluenceForFaction(events, f),
        }));

    const mapTileAddedToBoardEvents: MapTileAddedToBoardEvent[] = events.filter(
        isMapTileAddedToBoardEvent
    );

    return (
        <StyledGalaxy>
            <Stars />
            <GalaxyContainer
                $tilesToOffsetBy={calculateTileOffset(
                    tilesAddedToBeginningOfColumn,
                    numberOfDummyTilesAtBeginningOfColumn,
                    events
                )}
            >
                <StandardGalaxy>
                    <TileColumnRow>
                        {columnOutsideOfInitialGalaxy(-2, events)}
                        {columnOutsideOfInitialGalaxy(-1, events)}
                        {range(galaxyColumnCount).map((columnIndex) => (
                            <TileColumn
                                $firstColumn={
                                    !mapTileAddedToBoardEvents.find(
                                        (e) => e.position.column < 0
                                    ) && columnIndex === 0
                                }
                                $numberOfColumns={numberOfColumns(
                                    mapTileAddedToBoardEvents
                                )}
                                key={columnIndex}
                            >
                                {tilesAtBeginningOfColumn(columnIndex, events)}
                                {range(tilesPerColumn(columnIndex)).map(
                                    (rowIndex) => {
                                        const systemTileNumber =
                                            mapTilesSelectedEvent?.selections[
                                                tileIndex(columnIndex, rowIndex)
                                            ];
                                        return (
                                            <HighlightableSystemTile
                                                key={`tile ${tileIndex(columnIndex, rowIndex)}`}
                                                systemTileNumber={
                                                    systemTileNumber
                                                }
                                                controllingPlayerColors={controllingPlayerColors(
                                                    systemTileNumber,
                                                    events
                                                )}
                                                systemUnderAttack={
                                                    !systemTileNumber ||
                                                    isSystemUnderAttack(
                                                        systemTileNumber,
                                                        events
                                                    )
                                                }
                                                showMirageToken={
                                                    !!systemTileNumber &&
                                                    isPlanetlessSystemTileNumber(
                                                        systemTileNumber
                                                    ) &&
                                                    hasMiragePlanetBeenFoundOnSystemTileWithNumber(
                                                        events,
                                                        systemTileNumber
                                                    )
                                                }
                                                showGammaWormholeToken={
                                                    !!systemTileNumber &&
                                                    hasGammaWormholeBeenFoundOnSystemTileWithNumber(
                                                        events,
                                                        systemTileNumber
                                                    )
                                                }
                                            />
                                        );
                                    }
                                )}
                                {tilesAtEndOfColumn(columnIndex, events)}
                            </TileColumn>
                        ))}
                        {columnOutsideOfInitialGalaxy(7, events)}
                        {columnOutsideOfInitialGalaxy(8, events)}
                    </TileColumnRow>
                </StandardGalaxy>
            </GalaxyContainer>
            <ExtraTiles
                $tilesToOffsetBy={calculateTileOffset(
                    tilesAddedToEndOfColumn,
                    numberOfDummyTilesAtEndOfColumn,
                    events
                )}
            >
                <MalliceTile
                    controllingPlayerColor={
                        latestPlanetControlledEventsByPlanet(events)
                            .filter((e) => e.planet === 'Mallice')
                            .map(
                                (e) =>
                                    playerFactionsAndColors(events)[e.faction]
                            )[0]
                    }
                />
                {systemTileNumbersInPlay(events).includes(
                    ghostsOfCreussHomeTileNumber
                ) ? (
                    <GhostsOfCreussHomeTile
                        controllingPlayerColor={
                            controllingPlayerColors(
                                ghostsOfCreussHomeTileNumber,
                                events
                            )?.playerColors[0] as PlayerColor
                        }
                    />
                ) : (
                    <div />
                )}
            </ExtraTiles>
            <ResourcesAndInfluenceStats>
                <Scoreboard>
                    <StatsTitle>Resources</StatsTitle>
                    <StatsContainer>
                        {_.sortBy(
                            factionResourcesAndInfluence,
                            (fsi) => fsi.resourcesAndInfluence.resources
                        )
                            .reverse()
                            .map((fsi) => (
                                <ScoreboardRow
                                    key={fsi.faction}
                                    title={fsi.faction}
                                    titleColor={hexPlayerColor(fsi.playerColor)}
                                    value={`${fsi.resourcesAndInfluence.resources}`}
                                    valueColor={'yellow'}
                                />
                            ))}
                    </StatsContainer>
                </Scoreboard>
                <Scoreboard>
                    <StatsTitle>Influence</StatsTitle>
                    <StatsContainer>
                        {_.sortBy(
                            factionResourcesAndInfluence,
                            (fsi) => fsi.resourcesAndInfluence.influence
                        )
                            .reverse()
                            .map((fsi) => (
                                <ScoreboardRow
                                    key={fsi.faction}
                                    title={fsi.faction}
                                    titleColor={hexPlayerColor(fsi.playerColor)}
                                    value={`${fsi.resourcesAndInfluence.influence}`}
                                    valueColor={'deepskyblue'}
                                />
                            ))}
                    </StatsContainer>
                </Scoreboard>
            </ResourcesAndInfluenceStats>
        </StyledGalaxy>
    );
};

const isSystemUnderAttack = (
    stn: SystemTileNumber,
    events: Event[]
): boolean => {
    const lastEvent = _.last(events);
    return (
        lastEvent?.type === 'PlayerAttackedSystem' &&
        lastEvent.tileNumber === stn
    );
};

const calculateTileOffset = (
    tilesAdded: (n: number, events: Event[]) => MapTileAddedToBoardEvent[],
    numberOfDummyTiles: (n: number, events: Event[]) => number,
    events: Event[]
): number =>
    tilesAdded(3, events).length >=
    Math.max(...[2, 4].map((n) => numberOfDummyTiles(n, events)))
        ? 0
        : Math.max(...[1, 5].map((n) => tilesAdded(n, events).length)) >
            Math.max(...[2, 4].map((n) => tilesAdded(n, events).length))
          ? 1
          : 0.5;

type FactionResourcesAndInfluence = {
    faction: Faction;
    playerColor: PlayerColor;
    resourcesAndInfluence: PlanetMeta;
};

const maxTilesAddedToBeginningOfCenterThreeColumns = (
    events: MapTileAddedToBoardEvent[]
) =>
    Math.max(
        ...[2, 3, 4].map(
            (n) =>
                events.filter(
                    (e) => e.position.column === n && e.position.row < 0
                ).length
        )
    );

const maxTilesAddedToEndOfCenterThreeColumns = (
    events: MapTileAddedToBoardEvent[]
) =>
    Math.max(
        ...[2, 3, 4].map(
            (n) =>
                events.filter(
                    (e) => e.position.column === n && e.position.row > 0
                ).length
        )
    );

const numberOfColumns = (events: MapTileAddedToBoardEvent[]): number =>
    7 +
    _.uniq(events.map((e) => e.position.column)).filter((c) =>
        [-2, -1, 7, 8].includes(c)
    ).length;

const tileNumbersInColumnOutsideOfInitialGalaxy = (
    c: -2 | -1 | 7 | 8,
    mapTileAddedToBoardEvents: MapTileAddedToBoardEvent[]
): readonly (SystemWithPlanetsTileNumber | -1)[] => {
    const tiles =
        c === -2 || c === 8
            ? ([-1, -1, -1, -1, -1, -1] as const)
            : ([-1, -1, -1, -1, -1, -1, -1] as const);

    const tilesAddedToColumn = mapTileAddedToBoardEvents.filter(
        (e) => e.position.column === c
    );

    return tiles.map(
        (t, index) =>
            tilesAddedToColumn.find((t) => t.position.row === index - 2)
                ?.tileNumber || t
    );
};

const columnOutsideOfInitialGalaxy = (
    c: -2 | -1 | 7 | 8,
    events: Event[]
): ReactNode => {
    const mapTileAddedToBoardEvents = events.filter(isMapTileAddedToBoardEvent);

    const tileNumbers = tileNumbersInColumnOutsideOfInitialGalaxy(
        c,
        mapTileAddedToBoardEvents
    );

    return tileNumbers.some((tn) => tn !== -1) ? (
        <TileColumn
            $firstColumn={
                c == -2 ||
                (c == -1 &&
                    tileNumbersInColumnOutsideOfInitialGalaxy(
                        -2,
                        mapTileAddedToBoardEvents
                    ).every((tn) => tn === -1))
            }
            $numberOfColumns={numberOfColumns(mapTileAddedToBoardEvents)}
            key={c}
        >
            {range(
                maxTilesAddedToBeginningOfCenterThreeColumns(
                    mapTileAddedToBoardEvents
                )
            ).map((i) => (
                <DummyTile key={`beginning of column dummy tile ${i}`} />
            ))}
            {tileNumbersInColumnOutsideOfInitialGalaxy(
                c,
                mapTileAddedToBoardEvents
            ).map((t, i) =>
                t === -1 ? (
                    <DummyTile key={`dummy tile ${i}`} />
                ) : (
                    <HighlightableSystemTile
                        key={`tile ${t}`}
                        systemTileNumber={t}
                        controllingPlayerColors={controllingPlayerColors(
                            t,
                            events
                        )}
                        systemUnderAttack={isSystemUnderAttack(t, events)}
                        showMirageToken={false}
                        showGammaWormholeToken={false}
                    />
                )
            )}
            {range(
                maxTilesAddedToEndOfCenterThreeColumns(
                    mapTileAddedToBoardEvents
                )
            ).map((i) => (
                <DummyTile key={`end of column dummy tile ${i}`} />
            ))}
        </TileColumn>
    ) : (
        <></>
    );
};

const numberOfDummyTilesAtBeginningOfColumn = (
    c: number,
    events: Event[]
): number => {
    const mapTileAddedToBoardEvents = events.filter(isMapTileAddedToBoardEvent);

    const tilesAddedToBeginningOfColumn = mapTileAddedToBoardEvents.filter(
        (e) => e.position.column === c && e.position.row < 0
    );

    const tilesAddedToEndOfColumn = mapTileAddedToBoardEvents.filter(
        (e) => e.position.column === c && e.position.row > 0
    );

    const oneOfCenterThreeColumns = [2, 3, 4].includes(c);

    return oneOfCenterThreeColumns
        ? maxTilesAddedToBeginningOfCenterThreeColumns(
              mapTileAddedToBoardEvents
          ) - tilesAddedToBeginningOfColumn.length
        : maxTilesAddedToBeginningOfCenterThreeColumns(
              mapTileAddedToBoardEvents
          ) +
              Math.max(
                  tilesAddedToEndOfColumn.length -
                      tilesAddedToBeginningOfColumn.length,
                  0
              );
};

const tilesAddedToBeginningOfColumn = (
    c: number,
    events: Event[]
): MapTileAddedToBoardEvent[] => {
    const mapTileAddedToBoardEvents = events.filter(isMapTileAddedToBoardEvent);

    return mapTileAddedToBoardEvents.filter(
        (e) => e.position.column === c && e.position.row < 0
    );
};

const tilesAtBeginningOfColumn = (c: number, events: Event[]) => [
    ...range(numberOfDummyTilesAtBeginningOfColumn(c, events)).map((_, i) => (
        <DummyTile key={`beginning of column dummy tile ${i}`} />
    )),
    ..._.sortBy(
        tilesAddedToBeginningOfColumn(c, events),
        (e) => e.position.row
    ).map((e) => (
        <HighlightableSystemTile
            key={`tile ${e.tileNumber}`}
            systemTileNumber={e.tileNumber}
            controllingPlayerColors={controllingPlayerColors(
                e.tileNumber,
                events
            )}
            systemUnderAttack={isSystemUnderAttack(e.tileNumber, events)}
            showMirageToken={false}
            showGammaWormholeToken={hasGammaWormholeBeenFoundOnSystemTileWithNumber(
                events,
                e.tileNumber
            )}
        />
    )),
];

const tilesAddedToEndOfColumn = (
    c: number,
    events: Event[]
): MapTileAddedToBoardEvent[] => {
    const mapTileAddedToBoardEvents = events.filter(isMapTileAddedToBoardEvent);

    return mapTileAddedToBoardEvents.filter(
        (e) => e.position.column === c && e.position.row > 0
    );
};

const numberOfDummyTilesAtEndOfColumn = (
    c: number,
    events: Event[]
): number => {
    const mapTileAddedToBoardEvents = events.filter(isMapTileAddedToBoardEvent);

    const tilesAddedToBeginningOfColumn = mapTileAddedToBoardEvents.filter(
        (e) => e.position.column === c && e.position.row < 0
    );

    const tilesAddedToEndOfColumn = mapTileAddedToBoardEvents.filter(
        (e) => e.position.column === c && e.position.row > 0
    );

    const oneOfCenterThreeColumns = [2, 3, 4].includes(c);

    return oneOfCenterThreeColumns
        ? maxTilesAddedToEndOfCenterThreeColumns(mapTileAddedToBoardEvents) -
              tilesAddedToEndOfColumn.length
        : maxTilesAddedToEndOfCenterThreeColumns(mapTileAddedToBoardEvents) +
              Math.max(
                  tilesAddedToBeginningOfColumn.length -
                      tilesAddedToEndOfColumn.length,
                  0
              );
};

const tilesAtEndOfColumn = (c: number, events: Event[]) => [
    ..._.sortBy(tilesAddedToEndOfColumn(c, events), (e) => e.position.row).map(
        (e) => (
            <HighlightableSystemTile
                key={`tile ${e.tileNumber}`}
                systemTileNumber={e.tileNumber}
                controllingPlayerColors={controllingPlayerColors(
                    e.tileNumber,
                    events
                )}
                systemUnderAttack={isSystemUnderAttack(e.tileNumber, events)}
                showMirageToken={false}
                showGammaWormholeToken={hasGammaWormholeBeenFoundOnSystemTileWithNumber(
                    events,
                    e.tileNumber
                )}
            />
        )
    ),
    ...range(numberOfDummyTilesAtEndOfColumn(c, events)).map((_, i) => (
        <DummyTile key={`end of column dummy tile ${i}`} />
    )),
];

const ResourcesAndInfluenceStats = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 4rem;
    margin-left: 4rem;
    margin-right: 4rem;
    gap: 2rem;

    > * {
        flex: 1 1 0;
    }
`;

const hexagonWidthToHeightRatio = 1.1547005;

const StyledGalaxy = styled.div`
    display: flex;

    @media (orientation: portrait) {
        flex-direction: column;
    }
`;

type GalaxyContainerProps = {
    $tilesToOffsetBy: number;
};

const GalaxyContainer = styled.section<GalaxyContainerProps>`
    display: flex;
    justify-content: center;
    margin-top: -${(props) => `${props.$tilesToOffsetBy * 16}vw`};
`;

const StandardGalaxy = styled.div`
    display: flex;
`;

const TileColumnRow = styled.div`
    display: flex;

    > * {
        flex: 1 1 0;
    }
`;

const Tile = styled.img`
    min-width: 0;
    min-height: 0;
`;

const DummyTile = styled.div`
    min-width: 0;
    min-height: 0;
    aspect-ratio: ${hexagonWidthToHeightRatio} / 1;
    flex-shrink: 0;
`;

const MirageTokenContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    > * {
        width: 50%;
    }
`;

const GammaWormholeTokenContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 20%;
    padding-bottom: 20%;

    > * {
        width: 40%;
    }
`;

const SystemTileToken = styled.img`
    min-width: 0;
    min-height: 0;
`;

type ExtraTileProps = {
    $highlightColor: string | undefined;
};

const ExtraTile = styled.img<ExtraTileProps>`
    min-width: 0;
    min-height: 0;
    object-fit: contain;

    @media (orientation: portrait) {
        border: ${(props) =>
            props.$highlightColor
                ? `0.75vw solid ${props.$highlightColor}${standardHexTransparency}`
                : 'none'};
    }

    @media (orientation: landscape) {
        border: ${(props) =>
            props.$highlightColor
                ? `0.75vh solid ${props.$highlightColor}${standardHexTransparency}`
                : 'none'};
    }
`;

type TileColumnProps = {
    $firstColumn: boolean;
    $numberOfColumns: number;
};

const TileColumn = styled.div<TileColumnProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;

    margin-left: ${(props) =>
        props.$firstColumn ? '0' : `-${32 / props.$numberOfColumns}%`};

    ${Tile}, ${DummyTile} {
        width: 100%;
    }
`;

type ExtraTilesProps = {
    $tilesToOffsetBy: number;
};

const ExtraTiles = styled.div<ExtraTilesProps>`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: -${(props) => `${props.$tilesToOffsetBy * 16}vw`};

    @media (orientation: portrait) {
        flex-direction: row;

        > * {
            width: 25%;
        }
    }

    @media (orientation: landscape) {
        flex-direction: column;

        > * {
            height: 25%;
        }
    }
`;

type ControllingPlayerColors = {
    style: 'solid' | 'dashed';
    playerColors: PlayerColor[];
};

const controllingPlayerColors = (
    systemTileNumber: SystemTileNumber | undefined,
    events: Event[]
): ControllingPlayerColors | undefined => {
    const st = systemTileNumber ? systemTile(systemTileNumber) : undefined;

    if (!st) {
        return undefined;
    }

    if (isSystemWithPlanetsTile(st)) {
        return {
            style: 'solid',
            playerColors:
                st.planets
                    .map((p) =>
                        latestPlanetControlledEventsByPlanet(events).find(
                            (e) => e.planet === p
                        )
                    )
                    .filter(notUndefined)
                    .map((e) => playerFactionsAndColors(events)[e.faction]) ||
                [],
        };
    }

    const factionControllingMirage = latestPlanetControlledEventsByPlanet(
        events
    ).find((e) => e.planet === 'Mirage')?.faction;
    if (
        hasMiragePlanetBeenFoundOnSystemTileWithNumber(events, st.tileNumber) &&
        factionControllingMirage
    ) {
        return {
            style: 'solid',
            playerColors: [
                playerFactionsAndColors(events)[factionControllingMirage],
            ],
        };
    }

    const controllingFaction = latestPlanetlessSystemControlledEventsBySystem(
        events
    ).find((e) => e.tileNumber === systemTileNumber)?.faction;

    return controllingFaction
        ? {
              style: 'dashed',
              playerColors: [
                  playerFactionsAndColors(events)[controllingFaction],
              ],
          }
        : undefined;
};

type HighlightableTileProps = {
    systemTileNumber?: SystemTileNumber;
    controllingPlayerColors: ControllingPlayerColors | undefined;
    systemUnderAttack: boolean;
    showMirageToken: boolean;
    showGammaWormholeToken: boolean;
};

const HighlightableSystemTile: React.FC<HighlightableTileProps> = ({
    systemTileNumber,
    controllingPlayerColors,
    systemUnderAttack,
    showMirageToken,
    showGammaWormholeToken,
}) => (
    <StyledHighlightableTile>
        <Tile
            src={systemTileImage(systemTileNumber)}
            alt={`System tile ${systemTileNumber}`}
        />
        {showMirageToken && (
            <MirageTokenContainer>
                <SystemTileToken src={mirageToken} alt={`Mirage token`} />
            </MirageTokenContainer>
        )}
        {showGammaWormholeToken && (
            <GammaWormholeTokenContainer>
                <SystemTileToken
                    src={gammaWormholeToken}
                    alt={`Gamma wormhole token`}
                />
            </GammaWormholeTokenContainer>
        )}
        {systemTileNumber && (
            <HexHighlight
                controllingPlayerColors={controllingPlayerColors}
                systemUnderAttack={systemUnderAttack}
            />
        )}
    </StyledHighlightableTile>
);

const StyledHighlightableTile = styled.div`
    display: grid;
    grid-template-areas: 'fill';

    > * {
        grid-area: fill;
    }
`;

const sinFromDegrees = (degrees: number) => Math.sin((degrees * Math.PI) / 180);

const tanFromDegrees = (degrees: number) => Math.tan((degrees * Math.PI) / 180);

type HexHighlightProps = {
    controllingPlayerColors: ControllingPlayerColors | undefined;
    systemUnderAttack: boolean;
};

const HexHighlight: React.FC<HexHighlightProps> = ({
    controllingPlayerColors,
    systemUnderAttack,
}) => (
    <>
        {controllingPlayerColors &&
            controllingPlayerColors.playerColors.length > 0 &&
            [0, 60, 120, 180, 240, 300].map((rotation, index) => (
                <HexHighlightSegment
                    key={rotation}
                    $rotation={rotation}
                    $color={hexPlayerColor(
                        _.sortBy(
                            controllingPlayerColors.playerColors,
                            identity
                        )[
                            Math.floor(
                                controllingPlayerColors.playerColors.length *
                                    (index / 6)
                            )
                        ]
                    )}
                    $dashedBorder={controllingPlayerColors.style === 'dashed'}
                    $pulse={systemUnderAttack}
                />
            ))}
    </>
);

const highlightPercentage = 5;
const standardHexTransparency = 'ff';

type HexHighlightSegmentProps = {
    $rotation: number;
    $color: string;
    $dashedBorder: boolean;
    $pulse: boolean;
};

const HexHighlightSegment = styled.div<HexHighlightSegmentProps>`
    background: ${(props) =>
        props.$dashedBorder
            ? `repeating-linear-gradient(
        45deg,
        ${props.$color}${standardHexTransparency} 0%,
        ${props.$color}${standardHexTransparency} 12%,
        transparent 12%,
        transparent 18%
    )`
            : `${props.$color}${standardHexTransparency}`};
    transform: rotate(${(props) => props.$rotation}deg);
    clip-path: polygon(
        0% 50%,
        ${highlightPercentage}% 50%,
        ${(50 * tanFromDegrees(30)) / hexagonWidthToHeightRatio +
            sinFromDegrees(30) * highlightPercentage}%
            ${highlightPercentage}%,
        ${(50 * tanFromDegrees(30)) / hexagonWidthToHeightRatio}% 0%
    );
    animation: ${(props) => (props.$pulse ? 'pulse 2s infinite' : 'none')};

    @keyframes pulse {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
`;

type MalliceTileProps = {
    controllingPlayerColor: PlayerColor | undefined;
};

const MalliceTile: React.FC<MalliceTileProps> = ({
    controllingPlayerColor,
}) => (
    <ExtraTile
        src={controllingPlayerColor ? tile82Back : tile82}
        alt={`Wormhole nexus tile`}
        $highlightColor={
            controllingPlayerColor && hexPlayerColor(controllingPlayerColor)
        }
    />
);

type GhostsOfCresussHomeTileProps = {
    controllingPlayerColor: PlayerColor;
};

const GhostsOfCreussHomeTile: React.FC<GhostsOfCresussHomeTileProps> = ({
    controllingPlayerColor,
}) => (
    <ExtraTile
        src={tile51}
        alt={`Ghosts of Creuss homeworld tile`}
        $highlightColor={hexPlayerColor(controllingPlayerColor)}
    />
);

export { GalaxyPage };
