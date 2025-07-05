import { useEffect, useState } from 'react';
import _ from 'underscore';
import useSound from 'use-sound';

import alarm1 from './assets/alarms/alarm-1.mp3';
import alarm2 from './assets/alarms/alarm-2.mp3';
import alarm3 from './assets/alarms/alarm-3.mp3';
import alarm4 from './assets/alarms/alarm-4.mp3';
import alarm5 from './assets/alarms/alarm-5.mp3';
import alarm6 from './assets/alarms/alarm-6.mp3';
import { Event, factionsInGame } from './events';

const useAttackAlarms = (events: Event[]) => {
    const [playAlarm1] = useSound(alarm1);
    const [playAlarm2] = useSound(alarm2);
    const [playAlarm3] = useSound(alarm3);
    const [playAlarm4] = useSound(alarm4);
    const [playAlarm5] = useSound(alarm5);
    const [playAlarm6] = useSound(alarm6);

    const [lastAlarmPlayed, setLastAlarmPlayed] = useState<number>();

    const lastEvent = _.last(events);

    useEffect(() => {
        if (
            lastEvent?.type === 'PlayerAttackedSystem' &&
            lastAlarmPlayed !== lastEvent.time
        ) {
            [
                playAlarm1,
                playAlarm2,
                playAlarm3,
                playAlarm4,
                playAlarm5,
                playAlarm6,
            ][_.sortBy(factionsInGame(events)).indexOf(lastEvent.defender)]();
            setLastAlarmPlayed(lastEvent.time);
        }
    }, [
        events,
        lastEvent,
        playAlarm1,
        playAlarm2,
        playAlarm3,
        playAlarm4,
        playAlarm5,
        playAlarm6,
        lastAlarmPlayed,
    ]);
};

export { useAttackAlarms };
