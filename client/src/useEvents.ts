import { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import useInterval from 'use-interval';

import { Event } from './events';

const useEvents = (
    refreshIntervalInMillis?: number
): {
    events: Event[];
} => {
    const [events, setEvents] = useState<Event[]>([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useAsyncEffect(async () => {
        try {
            const response = await fetch('/api');

            if (response.status === 200) {
                const responseJson = await response.json();

                setEvents(responseJson);
            }
        } catch {}
    }, [refreshTrigger]);

    useInterval(() => {
        setRefreshTrigger(refreshTrigger + 1);
    }, refreshIntervalInMillis || 15_000);

    return { events };
};

export { useEvents };
