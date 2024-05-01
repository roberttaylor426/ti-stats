import React from 'react';
import styled from 'styled-components';
import _, { identity } from 'underscore';

import tile51 from './assets/tiles/ST_51.png';
import tile82 from './assets/tiles/ST_82.png';
import tile82Back from './assets/tiles/ST_82_Back.png';
import { Faction, hexColor, notUndefined, PlayerColor } from './domain';
import {
    Event,
    isMapTileSelectedEvent,
    isPlanetControlledEvent,
    PlanetControlledEvent,
} from './events';
import { PlanetName, planets, ResourcesAndInfluence } from './planets';
import { systemTileImages, systemTiles, tile0 } from './systemTiles';

/*
 Extract common scoreboard component
 Background of scoreboard titles
 Don't score, don't show control if planet destroyed
 Only show Creuss tile optionally
 Support planet enhanced events
 */

const range = (n: number) => [...Array(n).keys()];

type Props = {
    events: Event[];
    factionsInGame: Faction[];
    playerColors: Record<Faction, PlayerColor>;
};

const Galaxy: React.FC<Props> = ({ events, factionsInGame, playerColors }) => {
    const latestPlanetControlledEventsByPlanet = events
        .filter(isPlanetControlledEvent)
        .reverse()
        .reduce(
            (acc: PlanetControlledEvent[], n) =>
                acc.find((e) => e.planet === n.planet) ? acc : [...acc, n],
            []
        );

    const planetsControlledByFaction = (faction: Faction): PlanetName[] =>
        latestPlanetControlledEventsByPlanet
            .filter((e) => e.faction === faction)
            .map((e) => e.planet);

    const factionResourcesAndInfluence: FactionResourcesAndInfluence[] =
        factionsInGame.map((f) => ({
            faction: f,
            playerColor: playerColors[f],
            resourcesAndInfluence: planetsControlledByFaction(f)
                .map((p) => planets[p])
                .reduce(
                    (acc, n) => ({
                        resources: acc.resources + n.resources,
                        influence: acc.influence + n.influence,
                    }),
                    {
                        resources: 0,
                        influence: 0,
                    }
                ),
        }));

    return (
        <StyledGalaxy>
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
                                        const systemTileNumber = events
                                            .filter(isMapTileSelectedEvent)
                                            .find(
                                                (e) =>
                                                    e.position ===
                                                    tileIndex(
                                                        columnIndex,
                                                        rowIndex
                                                    )
                                            )?.systemTileNumber;

                                        return (
                                            <HighlightableSystemTile
                                                key={`tile ${tileIndex(columnIndex, rowIndex)}`}
                                                systemTileNumber={
                                                    systemTileNumber
                                                }
                                                controllingPlayerColors={
                                                    systemTiles
                                                        .find(
                                                            (st) =>
                                                                st.tileNumber ===
                                                                systemTileNumber
                                                        )
                                                        ?.planets.map((p) =>
                                                            latestPlanetControlledEventsByPlanet.find(
                                                                (e) =>
                                                                    e.planet ===
                                                                    p
                                                            )
                                                        )
                                                        .filter(notUndefined)
                                                        .map(
                                                            (e) =>
                                                                playerColors[
                                                                    e.faction
                                                                ]
                                                        ) || []
                                                }
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
                <MalliceTile controllingPlayerColor={undefined} />
                <GhostsOfCreussHomeTile controllingPlayerColor={'Green'} />
            </ExtraTiles>
            <Scoreboard>
                <ResourcesInfluenceScoreboardRow
                    title={''}
                    color={'white'}
                    resources={'Resources'}
                    influence={'Influence'}
                />
                {_.sortBy(
                    factionResourcesAndInfluence,
                    (fsi) => fsi.faction
                ).map((fsi) => (
                    <ResourcesInfluenceScoreboardRow
                        key={fsi.faction}
                        title={fsi.faction}
                        color={hexColor(fsi.playerColor)}
                        resources={`${fsi.resourcesAndInfluence.resources}`}
                        influence={`${fsi.resourcesAndInfluence.influence}`}
                    />
                ))}
            </Scoreboard>
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

const Scoreboard = styled.section`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 2.25rem;
    margin-top: 8rem;
    margin-left: 4rem;
    margin-right: 4rem;
`;

type ResourcesInfluenceScoreboardRowProps = {
    title: string;
    color: string;
    resources: string;
    influence: string;
};

const ResourcesInfluenceScoreboardRow: React.FC<
    ResourcesInfluenceScoreboardRowProps
> = ({ title, color, resources, influence }) => (
    <StyledResourcesInfluenceScoreboardRow>
        <Title $color={color}>{title}</Title>
        <Resources>{resources}</Resources>
        <Influence>{influence}</Influence>
    </StyledResourcesInfluenceScoreboardRow>
);

const StyledResourcesInfluenceScoreboardRow = styled.div`
    display: flex;
`;

type TitleProps = {
    $color: string;
};

const Title = styled.span<TitleProps>`
    color: ${(props) => props.$color};
    width: 60%;
`;

const Resources = styled.span`
    color: yellow;
    width: 20%;
    text-align: end;
`;

const Influence = styled.span`
    color: deepskyblue;
    width: 20%;
    text-align: end;
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
                    $color={hexColor(
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
            controllingPlayerColor && hexColor(controllingPlayerColor)
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
        $highlightColor={hexColor(controllingPlayerColor)}
    />
);

export { Galaxy };
