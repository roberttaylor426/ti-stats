import React from 'react';
import styled from 'styled-components';
import _, { identity } from 'underscore';

import tile51 from './assets/tiles/ST_51.png';
import tile82 from './assets/tiles/ST_82.png';
import tile82Back from './assets/tiles/ST_82_Back.png';
import {
    factionsInGame,
    isMapTilesSelectedEvent,
    isPlanetControlledEvent,
    isPlanetDestroyedEvent,
    isPlanetEnhancedEvent,
    PlanetControlledEvent,
    playerFactionsAndColors,
} from './events';
import { Faction } from './factions';
import { PlanetName, planets, ResourcesAndInfluence } from './planets';
import { PlayerColor } from './playerColor';
import { Stars } from './stars';
import { StatsContainer, statsTitleCss } from './stats';
import { systemTileImages, systemTiles, tile0 } from './systemTiles';
import { useEvents } from './useEvents';
import { hexColor, notUndefined, range } from './util';

/*
 Background of scoreboard titles and scoreboards
 Extract common scoreboard component
 Extract all pages into separate files
 */

const GalaxyPage: React.FC = () => {
    const { events } = useEvents();

    const mapTilesSelectedEvent = _.last(
        events.filter(isMapTilesSelectedEvent)
    );
    const planetEnhancedEvents = events.filter(isPlanetEnhancedEvent);
    const planetDestroyedEvents = events.filter(isPlanetDestroyedEvent);

    const latestPlanetControlledEventsByPlanet = events
        .filter(isPlanetControlledEvent)
        .reverse()
        .reduce(
            (acc: PlanetControlledEvent[], n) =>
                acc.find((e) => e.planet === n.planet) ? acc : [...acc, n],
            []
        )
        .filter(
            (e) => !planetDestroyedEvents.some((de) => de.planet === e.planet)
        );

    const planetsControlledByFaction = (faction: Faction): PlanetName[] =>
        latestPlanetControlledEventsByPlanet
            .filter((e) => e.faction === faction)
            .filter(
                (e) =>
                    !planetDestroyedEvents.some((de) => de.planet === e.planet)
            )
            .map((e) => e.planet);

    const factionResourcesAndInfluence: FactionResourcesAndInfluence[] =
        factionsInGame(events).map((f) => ({
            faction: f,
            playerColor: playerFactionsAndColors(events)[f],
            resourcesAndInfluence: planetsControlledByFaction(f)
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
                ),
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
                                                                playerFactionsAndColors(
                                                                    events
                                                                )[e.faction]
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
                <MalliceTile
                    controllingPlayerColor={
                        latestPlanetControlledEventsByPlanet
                            .filter((e) => e.planet === 'Mallice')
                            .map(
                                (e) =>
                                    playerFactionsAndColors(events)[e.faction]
                            )[0]
                    }
                />
                {Object.values(
                    mapTilesSelectedEvent?.selections || {}
                ).includes(51) ? (
                    <GhostsOfCreussHomeTile controllingPlayerColor={'Green'} />
                ) : (
                    <div />
                )}
            </ExtraTiles>
            <Scoreboard>
                <ResourcesInfluenceScoreboardRow
                    title={''}
                    color={'white'}
                    resources={'Resources'}
                    influence={'Influence'}
                />
                <StatsContainer>
                    {_.sortBy(
                        factionResourcesAndInfluence,
                        (fsi) =>
                            fsi.resourcesAndInfluence.influence +
                            fsi.resourcesAndInfluence.resources
                    )
                        .reverse()
                        .map((fsi) => (
                            <ResourcesInfluenceScoreboardRow
                                key={fsi.faction}
                                title={fsi.faction}
                                color={hexColor(fsi.playerColor)}
                                resources={`${fsi.resourcesAndInfluence.resources}`}
                                influence={`${fsi.resourcesAndInfluence.influence}`}
                            />
                        ))}
                </StatsContainer>
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
    font-size: 1.25rem;
    margin-top: 8rem;
    margin-left: 4rem;
    margin-right: 4rem;

    @media (min-width: 1024px) {
        font-size: 2.25rem;
    }
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
    ${statsTitleCss};
`;

type TitleProps = {
    $color: string;
};

const Title = styled.span<TitleProps>`
    color: ${(props) => props.$color};
    width: 60%;
`;

const Resources = styled.h4`
    color: yellow;
    width: 25%;
    text-align: end;
`;

const Influence = styled.h4`
    color: deepskyblue;
    width: 25%;
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

export { GalaxyPage };
