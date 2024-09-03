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
import { SystemTile, SystemTileNumber, systemTiles } from '../systemTiles';
import { range } from '../util';
import { AdminPageProps } from './adminPageProps';
import { Button, PageTitle, Select } from './components';

const TileSelectionPage: React.FC<AdminPageProps> = (props) => {
    const { events, publishNewEvents } = props;

    const [tileSelections, setTileSelections] = useState<
        Record<number, SystemTileNumber>
    >({});

    const publishMapTileSelectionEvents = async () => {
        if (_.uniq(Object.keys(tileSelections)).length === 37) {
            const newEvents: Event[] = [
                {
                    type: 'MapTilesSelected',
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

    return (
        <>
            <PageTitle {...props} title={'Choose map tiles'} />
            {range(37).map((n) => (
                <MapTileSelectionRow key={n}>
                    <span>{n + 1}</span>
                    <Select
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
                        {systemTilesForGame(factionSelections(events))
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
                                    {tileLabel(st.tileNumber)}
                                </option>
                            ))}
                    </Select>
                </MapTileSelectionRow>
            ))}
            <Button onClick={publishMapTileSelectionEvents}>Continue</Button>
        </>
    );
};

const ghostsOfCreussHomeTileNumber = 51;
const malliceTileNumber = 82;

const systemTilesForGame = (
    factionSelections: FactionSelection[]
): SystemTile[] => {
    const factionSystemTilesNotInPlay = factionsWithFixedHomeworlds.filter(
        (f) =>
            !factionSelections.some((fs) =>
                isFactionSelectionWithCustomHomeworlds(fs)
                    ? fs.homeworldsOf === f
                    : fs === f
            )
    );

    return systemTiles
        .filter(
            (st) =>
                !factionSystemTilesNotInPlay.find((f) =>
                    _.isEqual(homeworlds(f), st.planets)
                )
        )
        .filter(
            (st) =>
                st.tileNumber !== ghostsOfCreussHomeTileNumber &&
                st.tileNumber !== malliceTileNumber
        );
};

const tileLabel = (tileNumber: SystemTileNumber): string => {
    const systemTilePlanets =
        systemTiles.find((st) => st.tileNumber === tileNumber)?.planets || [];
    return `${tileNumber}${systemTilePlanets.length > 0 ? ` - ${systemTilePlanets?.join(', ')}` : ''}`;
};

const MapTileSelectionRow = styled.div`
    display: flex;
    gap: 2rem;

    > :nth-child(2) {
        flex: 1 1 0;
    }
`;

export { TileSelectionPage };
