import React from 'react';
import styled from 'styled-components';
import _, { identity } from 'underscore';

import tile51 from './assets/tiles/ST_51.png';
import tile82 from './assets/tiles/ST_82.png';
import tile82Back from './assets/tiles/ST_82_Back.png';
import { Faction, hexColor, PlayerColor } from './domain';
import { tileImages } from './tiles';

/*
 Tiles according to map tile selection
 Extract common scoreboard component
 Players taking control of planets
 Background of titles
 Only show Creuss tile optionally
 Only show stats graph if round 2 has finished
 */

const range = (n: number) => [...Array(n).keys()];

const controlledTiles: (PlayerColor[] | undefined)[] = [
    ['Red', 'Blue', 'Black'],
    ['Red'],
    ['Yellow'],
    ['Yellow'],
    ['Black'],
    ['Blue'],
    ['Orange'],
    ['Purple'],
    ['Pink'],
    ['Green'],
];

type ResourcesAndInfluence = {
    resources: number;
    influence: number;
};

type FactionResourcesAndInfluence = {
    faction: Faction;
    playerColor: PlayerColor;
    resourcesAndInfluence: ResourcesAndInfluence;
};

const factionScores: FactionResourcesAndInfluence[] = [
    {
        faction: 'Sardakk N’orr',
        playerColor: 'Red',
        resourcesAndInfluence: { resources: 9, influence: 10 },
    },
    {
        faction: 'The Arborec',
        playerColor: 'Green',
        resourcesAndInfluence: { resources: 9, influence: 10 },
    },
    {
        faction: 'The Ghosts of Creuss',
        playerColor: 'Blue',
        resourcesAndInfluence: { resources: 9, influence: 10 },
    },
    {
        faction: 'The Argent Flight',
        playerColor: 'Orange',
        resourcesAndInfluence: { resources: 9, influence: 10 },
    },
    {
        faction: 'The Empyrean',
        playerColor: 'Purple',
        resourcesAndInfluence: { resources: 9, influence: 10 },
    },
    {
        faction: 'The Clan of Saar',
        playerColor: 'Black',
        resourcesAndInfluence: { resources: 9, influence: 10 },
    },
];

const Galaxy: React.FC = () => (
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
                                (rowIndex) => (
                                    <HighlightableTile
                                        key={`tile ${tileIndex(columnIndex, rowIndex)}`}
                                        tileIndex={tileIndex(
                                            columnIndex,
                                            rowIndex
                                        )}
                                        controllingPlayerColors={
                                            controlledTiles[
                                                tileIndex(columnIndex, rowIndex)
                                            ] || []
                                        }
                                    />
                                )
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
            {_.sortBy(factionScores, (fsi) => fsi.faction).map((fsi) => (
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
    font-size: 2rem;
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
    tileIndex: number;
    controllingPlayerColors: PlayerColor[];
};

const HighlightableTile: React.FC<HighlightableTileProps> = ({
    tileIndex,
    controllingPlayerColors,
}) => (
    <StyledHighlightableTile>
        <Tile src={tileImages[tileIndex]} alt={`System tile ${tileIndex}`} />
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
