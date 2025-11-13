import { intervalToDuration } from 'date-fns';

import { Event } from './events';

const timeElapsedLabel = (e: Event, currentTime: number): string =>
    `${timeComponent(
        intervalToDuration({
            start: e.time,
            end: currentTime,
        }).hours
    )}:${timeComponent(
        intervalToDuration({
            start: e.time,
            end: currentTime,
        }).minutes
    )}:${timeComponent(
        intervalToDuration({
            start: e.time,
            end: currentTime,
        }).seconds
    )}`;

const timeComponent = (n: number | undefined): string => {
    if (!n) {
        return '00';
    }

    if (n < 10) {
        return `0${n}`;
    }

    return `${n}`;
};

export { timeElapsedLabel };
