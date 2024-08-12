import React, { useState } from 'react';
import styled from 'styled-components';
import _ from 'underscore';

import { Event } from '../events';
import { SystemTileNumber, systemTiles } from '../systemTiles';
import { range } from '../util';
import { AdminPageProps } from './adminPageProps';
import { Button, Select } from './components';

const TileSelectionPage: React.FC<AdminPageProps> = ({ publishNewEvents }) => {
    const [tileSelections, setTileSelections] = useState<
        Record<number, SystemTileNumber>
    >({});

    const publishMapTileSelectionEvents = async () => {
        if (_.uniq(Object.keys(tileSelections)).length === 37) {
            const newEvents: Event[] = [
                ...range(37).map(
                    (n) =>
                        ({
                            type: 'MapTileSelected',
                            systemTileNumber: tileSelections[n + 1],
                            position: n,
                        }) as const
                ),
            ];

            await publishNewEvents(newEvents);
        }
    };

    return (
        <>
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
                        {systemTiles.map((st) => (
                            <option key={st.tileNumber} value={st.tileNumber}>
                                {st.tileNumber}
                            </option>
                        ))}
                    </Select>
                </MapTileSelectionRow>
            ))}
            <Button onClick={publishMapTileSelectionEvents}>Continue</Button>
        </>
    );
};

const MapTileSelectionRow = styled.div`
    display: flex;
    gap: 2rem;

    > :nth-child(2) {
        flex: 1 1 0;
    }
`;

export { TileSelectionPage };
