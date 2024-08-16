import { useState } from 'react';
import _ from 'underscore';
import useAsyncEffect from 'use-async-effect';
import useInterval from 'use-interval';

import { Event, isPlayerAssignedColorEvent } from './events';
import { Faction } from './factions';
import { PlayerColor } from './playerColor';

const useEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useAsyncEffect(async () => {
        try {
            const response = await fetch('/api');

            if (response.status === 200) {
                const responseJson = await response.json();

                if (responseJson.length > events.length) {
                    setEvents(responseJson);
                }
            }
        } catch {}
    }, [refreshTrigger]);

    useInterval(() => {
        setRefreshTrigger(refreshTrigger + 1);
    }, 15_000);

    const factionsInGame = _.uniq(
        events.filter(isPlayerAssignedColorEvent).map((e) => e.faction)
    );

    const playerColors = events
        .filter(isPlayerAssignedColorEvent)
        .reduce(
            (acc, n) => ({ ...acc, [n.faction]: n.color }),
            {} as Record<Faction, PlayerColor>
        );

    return { events, factionsInGame, playerColors };
};

export { useEvents };
