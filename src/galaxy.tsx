import React from 'react';
import styled from 'styled-components';
import _, { identity } from 'underscore';

import tile1 from './assets/tiles/ST_1.png';
import tile2 from './assets/tiles/ST_2.png';
import tile3 from './assets/tiles/ST_3.png';
import tile4 from './assets/tiles/ST_4.png';
import tile5 from './assets/tiles/ST_5.png';
import tile6 from './assets/tiles/ST_6.png';
import tile7 from './assets/tiles/ST_7.png';
import tile8 from './assets/tiles/ST_8.png';
import tile9 from './assets/tiles/ST_9.png';
import tile10 from './assets/tiles/ST_10.png';
import tile11 from './assets/tiles/ST_11.png';
import tile12 from './assets/tiles/ST_12.png';
import tile13 from './assets/tiles/ST_13.png';
import tile14 from './assets/tiles/ST_14.png';
import tile15 from './assets/tiles/ST_15.png';
import tile16 from './assets/tiles/ST_16.png';
import tile17 from './assets/tiles/ST_17.png';
import tile18 from './assets/tiles/ST_18.png';
import tile19 from './assets/tiles/ST_19.png';
import tile20 from './assets/tiles/ST_20.png';
import tile21 from './assets/tiles/ST_21.png';
import tile22 from './assets/tiles/ST_22.png';
import tile23 from './assets/tiles/ST_23.png';
import tile24 from './assets/tiles/ST_24.png';
import tile25 from './assets/tiles/ST_25.png';
import tile26 from './assets/tiles/ST_26.png';
import tile27 from './assets/tiles/ST_27.png';
import tile28 from './assets/tiles/ST_28.png';
import tile29 from './assets/tiles/ST_29.png';
import tile30 from './assets/tiles/ST_30.png';
import tile31 from './assets/tiles/ST_31.png';
import tile32 from './assets/tiles/ST_32.png';
import tile33 from './assets/tiles/ST_33.png';
import tile34 from './assets/tiles/ST_34.png';
import tile35 from './assets/tiles/ST_35.png';
import tile36 from './assets/tiles/ST_36.png';
import tile37 from './assets/tiles/ST_37.png';
import tile38 from './assets/tiles/ST_38.png';
import tile39 from './assets/tiles/ST_39.png';
import tile40 from './assets/tiles/ST_40.png';
import tile41 from './assets/tiles/ST_41.png';
import tile42 from './assets/tiles/ST_42.png';
import tile43 from './assets/tiles/ST_43.png';
import tile44 from './assets/tiles/ST_44.png';
import tile45 from './assets/tiles/ST_45.png';
import tile46 from './assets/tiles/ST_46.png';
import tile47 from './assets/tiles/ST_47.png';
import tile48 from './assets/tiles/ST_48.png';
import tile49 from './assets/tiles/ST_49.png';
import tile50 from './assets/tiles/ST_50.png';
import tile51 from './assets/tiles/ST_51.png';
import tile52 from './assets/tiles/ST_52.png';
import tile53 from './assets/tiles/ST_53.png';
import tile54 from './assets/tiles/ST_54.png';
import tile55 from './assets/tiles/ST_55.png';
import tile56 from './assets/tiles/ST_56.png';
import tile57 from './assets/tiles/ST_57.png';
import tile58 from './assets/tiles/ST_58.png';
import tile59 from './assets/tiles/ST_59.png';
import tile60 from './assets/tiles/ST_60.png';
import tile61 from './assets/tiles/ST_61.png';
import tile62 from './assets/tiles/ST_62.png';
import tile63 from './assets/tiles/ST_63.png';
import tile64 from './assets/tiles/ST_64.png';
import tile65 from './assets/tiles/ST_65.png';
import tile66 from './assets/tiles/ST_66.png';
import tile67 from './assets/tiles/ST_67.png';
import tile68 from './assets/tiles/ST_68.png';
import tile69 from './assets/tiles/ST_69.png';
import tile70 from './assets/tiles/ST_70.png';
import tile71 from './assets/tiles/ST_71.png';
import tile72 from './assets/tiles/ST_72.png';
import tile73 from './assets/tiles/ST_73.png';
import tile74 from './assets/tiles/ST_74.png';
import tile75 from './assets/tiles/ST_75.png';
import tile76 from './assets/tiles/ST_76.png';
import tile77 from './assets/tiles/ST_77.png';
import tile78 from './assets/tiles/ST_78.png';
import tile79 from './assets/tiles/ST_79.png';
import tile80 from './assets/tiles/ST_80.png';
import tile81 from './assets/tiles/ST_81.png';
import tile82 from './assets/tiles/ST_82.png';
import tile82Back from './assets/tiles/ST_82_Back.png';
import { Faction, PlayerColor } from './domain';

/*
 Tiles according map tile selection
 Players taking control of planets
 */

const range = (n: number) => [...Array(n).keys()];

const tiles = [
    tile1,
    tile2,
    tile3,
    tile4,
    tile5,
    tile6,
    tile7,
    tile8,
    tile9,
    tile10,
    tile11,
    tile12,
    tile13,
    tile14,
    tile15,
    tile16,
    tile17,
    tile18,
    tile19,
    tile20,
    tile21,
    tile22,
    tile23,
    tile24,
    tile25,
    tile26,
    tile27,
    tile28,
    tile29,
    tile30,
    tile31,
    tile32,
    tile33,
    tile34,
    tile35,
    tile36,
    tile37,
    tile38,
    tile39,
    tile40,
    tile41,
    tile42,
    tile43,
    tile44,
    tile45,
    tile46,
    tile47,
    tile48,
    tile49,
    tile50,
    tile51,
    tile52,
    tile53,
    tile54,
    tile55,
    tile56,
    tile57,
    tile58,
    tile59,
    tile60,
    tile61,
    tile62,
    tile63,
    tile64,
    tile65,
    tile66,
    tile67,
    tile68,
    tile69,
    tile70,
    tile71,
    tile72,
    tile73,
    tile74,
    tile75,
    tile76,
    tile77,
    tile78,
    tile79,
    tile80,
    tile81,
    tile82,
];

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

const columnCount = 7;

const tilesPerColumn = (index: number) =>
    index > Math.floor(columnCount / 2)
        ? columnCount - index + Math.floor(columnCount / 2)
        : columnCount - (Math.floor(columnCount / 2) - index);

const tileIndex = (columnIndex: number, rowIndex: number) =>
    range(columnIndex).reduce((acc, n) => acc + tilesPerColumn(n), 0) +
    rowIndex;

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
                    {range(columnCount).map((columnIndex) => (
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
        <Tile src={tiles[tileIndex]} alt={`System tile ${tileIndex}`} />
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

const hexColor = (pc: PlayerColor): string => {
    switch (pc) {
        case 'Black':
            return '#ffffff';
        case 'Red':
            return '#f81204';
        case 'Blue':
            return '#1751e8';
        case 'Green':
            return '#099f35';
        case 'Yellow':
            return '#fde414';
        case 'Orange':
            return '#f07f0b';
        case 'Pink':
            return '#f212c1';
        case 'Purple':
            return '#c57fef';
    }
};

export { Galaxy, hexColor };
