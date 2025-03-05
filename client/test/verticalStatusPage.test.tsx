import { Event } from '../src/events';
import { ActionPhaseDisplayMode, nextDisplayMode } from '../src/statusPage2';

describe('vertical status page', () => {
    describe('action phase', () => {
        describe('in round 1', () => {
            const events: Event[] = [
                {
                    type: 'RoundStarted',
                    time: new Date().getTime(),
                },
            ];

            const scenarios: Scenario[] = [
                {
                    initialState: 'resources and influence',
                    expectedNext: 'strategy card',
                },
                {
                    initialState: 'strategy card',
                    expectedNext: 'planets',
                },
                {
                    initialState: 'planets',
                    expectedNext: 'resources and influence',
                },
            ];

            it.each(scenarios)(
                'time taken is not shown',
                ({ initialState, expectedNext }) => {
                    const result = nextDisplayMode(initialState, events);

                    expect(result).toBe(expectedNext);
                }
            );
        });
    });

    describe('after round 1', () => {
        const events: Event[] = [
            {
                type: 'RoundStarted',
                time: new Date().getTime(),
            },
            {
                type: 'RoundStarted',
                time: new Date().getTime(),
            },
        ];

        const scenarios: Scenario[] = [
            {
                initialState: 'resources and influence',
                expectedNext: 'strategy card',
            },
            {
                initialState: 'strategy card',
                expectedNext: 'planets',
            },
            {
                initialState: 'planets',
                expectedNext: 'time taken',
            },
            {
                initialState: 'time taken',
                expectedNext: 'resources and influence',
            },
        ];

        it.each(scenarios)(
            'time taken is shown after planets',
            ({ initialState, expectedNext }) => {
                const result = nextDisplayMode(initialState, events);

                expect(result).toBe(expectedNext);
            }
        );
    });
});

type Scenario = {
    initialState: ActionPhaseDisplayMode;
    expectedNext: ActionPhaseDisplayMode;
};
