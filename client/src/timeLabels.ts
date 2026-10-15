import { intervalToDuration } from 'date-fns';

import { Event } from './events';
import { Faction } from './factions';

const targetTurnTimeInMillis = 110_000;

const timeRemainingLabel = (timeRemainingInMillis: number): string =>
    `${timeRemainingInMillis < 0 ? '-' : ''}${timeComponent(
        intervalToDuration({
            start: 0,
            end: Math.abs(timeRemainingInMillis),
        }).minutes
    )}:${timeComponent(
        intervalToDuration({
            start: 0,
            end: Math.abs(timeRemainingInMillis),
        }).seconds
    )}`;

const timeRemainingForCurrentObligationInMillis = (
    faction: Faction,
    timesTakenPerPlayerPerTurn: Record<Faction, number[]>,
    timeCurrentObligationStarted: number,
    currentTime: number
): number => {
    const allowableTimeInMillis =
        (timesTakenPerPlayerPerTurn[faction].length + 1) *
        targetTurnTimeInMillis;
    const timeTakenInMillis = timesTakenPerPlayerPerTurn[faction].reduce(
        (acc, n) => acc + n,
        0
    );
    return (
        allowableTimeInMillis -
        timeTakenInMillis -
        (currentTime - timeCurrentObligationStarted)
    );
};

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

export {
    timeElapsedLabel,
    timeRemainingForCurrentObligationInMillis,
    timeRemainingLabel,
};
