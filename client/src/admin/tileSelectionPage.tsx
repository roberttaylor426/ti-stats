import React, { useState } from 'react';
import styled from 'styled-components';
import _ from 'underscore';

import { Event, factionSelections } from '../events';
import {
    FactionSelection,
    factionsWithFixedHomeworlds,
    homeworlds,
    isFactionSelectionWithCustomHomeworlds,
} from '../factions';
import {
    ghostsOfCreussGalaxyTileNumber,
    ghostsOfCreussHomeTileNumber,
    isSystemTileNumber,
    isSystemWithPlanetsTile,
    malliceTileNumber,
    mecatolRexTileNumber,
    SystemTile,
    systemTileDescription,
    SystemTileNumber,
    systemTiles,
} from '../systemTiles';
import { range } from '../util';
import { AdminPageProps } from './adminPageProps';
import { Button } from './components/button';
import { PageTitle } from './components/pageTitle';
import { Select } from './components/select';
import { TextInput } from './input';

const TileSelectionPage: React.FC<AdminPageProps> = (props) => {
    const { events, publishNewEvents } = props;

    const [tileSelections, setTileSelections] = useState<
        Record<number, SystemTileNumber>
    >(initialTileSelections);

    const publishMapTileSelectionEvents = async () => {
        if (_.uniq(Object.keys(tileSelections)).length === 37) {
            const newEvents: Event[] = [
                {
                    type: 'MapTilesSelected',
                    time: new Date().getTime(),
                    selections: range(37).reduce(
                        (acc, n) => ({
                            ...acc,
                            [n]: tileSelections[n + 1],
                        }),
                        {}
                    ),
                },
            ];

            await publishNewEvents(newEvents);
        }
    };

    const updateSelectionsFromTtsMapString = (s: string) => {
        const tileSelections = parseTtsMapString(s);

        if (tileSelections) {
            setTileSelections(tileSelections);
        }
    };

    return (
        <>
            <PageTitle {...props} title={'Choose map tiles'} />
            <TtsMapStringContainer>
                <span>TTS map string</span>
                <TextInput
                    onChange={(e) =>
                        updateSelectionsFromTtsMapString(e.target.value)
                    }
                />
            </TtsMapStringContainer>
            {range(37).map((n) => (
                <MapTileSelectionRow key={n}>
                    <span>{n + 1}</span>
                    <Select
                        value={tileSelections[n + 1]}
                        onChange={(e) =>
                            setTileSelections({
                                ...tileSelections,
                                [n + 1]: Number.parseInt(
                                    e.target.value
                                ) as SystemTileNumber,
                            })
                        }
                    >
                        <option value={''}>--Tile--</option>
                        {tilesAvailableForGalaxyIndex(
                            n + 1,
                            factionSelections(events)
                        )
                            .filter(
                                (st) =>
                                    tileSelections[n + 1] === st.tileNumber ||
                                    !Object.values(tileSelections).includes(
                                        st.tileNumber
                                    )
                            )
                            .map((st) => (
                                <option
                                    key={st.tileNumber}
                                    value={st.tileNumber}
                                >
                                    {systemTileDescription(st.tileNumber)}
                                </option>
                            ))}
                    </Select>
                </MapTileSelectionRow>
            ))}
            <Button onClick={publishMapTileSelectionEvents}>Continue</Button>
        </>
    );
};

const initialTileSelections = { 19: mecatolRexTileNumber } as const;

const parseTtsMapString = (
    s: string
): Record<number, SystemTileNumber> | undefined => {
    const tiles = s
        .split(' ')
        .map((s) => s.trim())
        .map((s) => Number.parseInt(s))
        .filter(isSystemTileNumber);

    if (tiles.length === 36) {
        return {
            1: tiles[33],
            2: tiles[32],
            3: tiles[31],
            4: tiles[30],
            5: tiles[34],
            6: tiles[16],
            7: tiles[15],
            8: tiles[14],
            9: tiles[29],
            10: tiles[35],
            11: tiles[17],
            12: tiles[5],
            13: tiles[4],
            14: tiles[13],
            15: tiles[28],
            16: tiles[18],
            17: tiles[6],
            18: tiles[0],
            ...initialTileSelections,
            20: tiles[3],
            21: tiles[12],
            22: tiles[27],
            23: tiles[19],
            24: tiles[7],
            25: tiles[1],
            26: tiles[2],
            27: tiles[11],
            28: tiles[26],
            29: tiles[20],
            30: tiles[8],
            31: tiles[9],
            32: tiles[10],
            33: tiles[25],
            34: tiles[21],
            35: tiles[22],
            36: tiles[23],
            37: tiles[24],
        };
    }

    return undefined;
};

const tilesAvailableForGalaxyIndex = (
    n: number,
    factionSelections: FactionSelection[]
) => {
    if (n === 1 || n === 4 || n === 16 || n === 22 || n === 34 || n === 37) {
        return homeworldTilesForGalaxy(factionSelections);
    }

    return nonHomeworldTilesForGalaxy();
};

const homeworldTilesForGalaxy = (
    factionSelections: FactionSelection[]
): SystemTile[] =>
    systemTiles.filter((st) =>
        factionSelections.some((fs) =>
            fs === 'The Ghosts of Creuss'
                ? st.tileNumber === ghostsOfCreussGalaxyTileNumber
                : isFactionSelectionWithCustomHomeworlds(fs)
                  ? isSystemWithPlanetsTile(st) &&
                    _.isEqual(homeworlds(fs.homeworldsOf), st.planets)
                  : isSystemWithPlanetsTile(st) &&
                    _.isEqual(homeworlds(fs), st.planets)
        )
    );

const nonHomeworldTilesForGalaxy = (): SystemTile[] =>
    systemTiles
        .filter(
            (st) =>
                !isSystemWithPlanetsTile(st) ||
                !factionsWithFixedHomeworlds.find((f) =>
                    _.isEqual(homeworlds(f), st.planets)
                )
        )
        .filter(
            (st) =>
                st.tileNumber !== ghostsOfCreussGalaxyTileNumber &&
                st.tileNumber !== ghostsOfCreussHomeTileNumber &&
                st.tileNumber !== malliceTileNumber
        );

const TtsMapStringContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const MapTileSelectionRow = styled.div`
    display: flex;
    gap: 2rem;

    > :nth-child(2) {
        flex: 1 1 0;
    }
`;

export { TileSelectionPage };
