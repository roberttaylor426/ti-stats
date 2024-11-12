import React from 'react';
import styled from 'styled-components';
import _, { identity } from 'underscore';

import tile51 from './assets/tiles/ST_51.png';
import tile82 from './assets/tiles/ST_82.png';
import tile82Back from './assets/tiles/ST_82_Back.png';
import {
    Event,
    factionsInGame,
    isMapTilesSelectedEvent,
    latestPlanetControlledEventsByPlanet,
    playerFactionsAndColors,
    resourcesAndInfluenceForFaction,
    systemTileNumbersInPlay,
} from './events';
import { Faction } from './factions';
import { ResourcesAndInfluence } from './planets';
import { hexPlayerColor, PlayerColor } from './playerColors';
import { Scoreboard, ScoreboardRow } from './scoreboard';
import { Stars } from './stars';
import { StatsContainer, StatsTitle } from './stats';
import {
    ghostsOfCreussHomeTileNumber,
    isSystemWithPlanetsTile,
    systemTileImages,
    SystemTileNumber,
    systemTiles,
    tile0,
} from './systemTiles';
import { useEvents } from './useEvents';
import { notUndefined, range } from './util';

/*
 Extract common scoreboard component
 Extract all pages into separate files
 Support tile changes in game (Creuss, Muaat heroes)
 Support players losing control of systems without planets
 Show systems without planets controlled by players
*/

const GalaxyPage: React.FC = () => {
    const { events } = useEvents();

    const mapTilesSelectedEvent = _.last(
        events.filter(isMapTilesSelectedEvent)
    );

    const factionResourcesAndInfluence: FactionResourcesAndInfluence[] =
        factionsInGame(events).map((f) => ({
            faction: f,
            playerColor: playerFactionsAndColors(events)[f],
            resourcesAndInfluence: resourcesAndInfluenceForFaction(events, f),
        }));

    return (
        <StyledGalaxy>
            <Stars />
            <GalaxyContainer>
                <StandardGalaxy>
                    <TileColumnRow>
                        {range(galaxyColumnCount).map((columnIndex) => (
                            <TileColumn
                                $columnIndex={columnIndex}
                                key={columnIndex}
                            >
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
                                            />
                                        );
                                    }
                                )}
                            </TileColumn>
                        ))}
                    </TileColumnRow>
                </StandardGalaxy>
            </GalaxyContainer>
            <ExtraTiles>
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
                            )[0]
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

type FactionResourcesAndInfluence = {
    faction: Faction;
    playerColor: PlayerColor;
    resourcesAndInfluence: ResourcesAndInfluence;
};

const galaxyColumnCount = 7;

const tilesPerColumn = (index: number) =>
    index > Math.floor(galaxyColumnCount / 2)
        ? galaxyColumnCount - index + Math.floor(galaxyColumnCount / 2)
        : galaxyColumnCount - (Math.floor(galaxyColumnCount / 2) - index);

const tileIndex = (columnIndex: number, rowIndex: number): number =>
    range(columnIndex).reduce((acc, n) => acc + tilesPerColumn(n), 0) +
    rowIndex;

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

const GalaxyContainer = styled.section`
    display: flex;
    justify-content: center;
`;

const StandardGalaxy = styled.div`
    display: flex;
    aspect-ratio: 1 / ${hexagonWidthToHeightRatio};
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
    $columnIndex: number;
};

const TileColumn = styled.div<TileColumnProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;

    margin-left: ${(props) => (props.$columnIndex > 0 ? '-4.599%' : '0')};

    ${Tile} {
        width: 100%;
    }
`;

const ExtraTiles = styled.div`
    display: flex;
    margin-top: -4rem;
    justify-content: space-around;
    align-items: center;

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

const controllingPlayerColors = (
    systemTileNumber: SystemTileNumber | undefined,
    events: Event[]
): PlayerColor[] =>
    systemTiles
        .filter(isSystemWithPlanetsTile)
        .find((st) => st.tileNumber === systemTileNumber)
        ?.planets.map((p) =>
            latestPlanetControlledEventsByPlanet(events).find(
                (e) => e.planet === p
            )
        )
        .filter(notUndefined)
        .map((e) => playerFactionsAndColors(events)[e.faction]) || [];

type HighlightableTileProps = {
    systemTileNumber?: number;
    controllingPlayerColors: PlayerColor[];
};

const HighlightableSystemTile: React.FC<HighlightableTileProps> = ({
    systemTileNumber,
    controllingPlayerColors,
}) => (
    <StyledHighlightableTile>
        <Tile
            src={
                systemTileNumber
                    ? systemTileImages[systemTileNumber - 1]
                    : tile0
            }
            alt={`System tile ${systemTileNumber}`}
        />
        <HexHighlight controllingPlayerColors={controllingPlayerColors} />
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
    controllingPlayerColors: PlayerColor[];
};

const HexHighlight: React.FC<HexHighlightProps> = ({
    controllingPlayerColors,
}) => (
    <>
        {controllingPlayerColors.length > 0 &&
            [0, 60, 120, 180, 240, 300].map((rotation, index) => (
                <HexHighlightSegment
                    key={rotation}
                    $rotation={rotation}
                    $color={hexPlayerColor(
                        _.sortBy(controllingPlayerColors, identity)[
                            Math.floor(
                                controllingPlayerColors.length * (index / 6)
                            )
                        ]
                    )}
                />
            ))}
    </>
);

const highlightPercentage = 5;
const standardHexTransparency = 'ff';

type HexHighlightSegmentProps = {
    $rotation: number;
    $color: string;
};

const HexHighlightSegment = styled.div<HexHighlightSegmentProps>`
    background: ${(props) => props.$color}${standardHexTransparency};
    transform: rotate(${(props) => props.$rotation}deg);
    clip-path: polygon(
        0% 50%,
        ${highlightPercentage}% 50%,
        ${(50 * tanFromDegrees(30)) / hexagonWidthToHeightRatio +
            sinFromDegrees(30) * highlightPercentage}%
            ${highlightPercentage}%,
        ${(50 * tanFromDegrees(30)) / hexagonWidthToHeightRatio}% 0%
    );
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
