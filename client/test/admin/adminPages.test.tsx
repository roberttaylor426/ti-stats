import { currentPlayerTurn } from '../../src/events';

describe('player turn page', () => {
    describe('determines next player', () => {
        it('when no one has finished a turn', () => {
            expect(
                currentPlayerTurn([
                    {
                        type: 'ActionPhaseStarted',
                        time: new Date().getTime(),
                        playerOrder: [
                            'Sardakk N’orr',
                            'The Arborec',
                            'The Argent Flight',
                        ],
                    },
                ])
            ).toEqual('Sardakk N’orr');
        });

        it('when one player has finished a turn', () => {
            expect(
                currentPlayerTurn([
                    {
                        type: 'ActionPhaseStarted',
                        time: new Date().getTime(),
                        playerOrder: [
                            'Sardakk N’orr',
                            'The Arborec',
                            'The Argent Flight',
                        ],
                    },
                    {
                        type: 'PlayerFinishedTurn',
                        time: new Date().getTime(),
                        faction: 'Sardakk N’orr',
                        pass: false,
                    },
                ])
            ).toEqual('The Arborec');
        });

        it('when one player has finished a turn and one player has passed', () => {
            expect(
                currentPlayerTurn([
                    {
                        type: 'ActionPhaseStarted',
                        time: new Date().getTime(),
                        playerOrder: [
                            'Sardakk N’orr',
                            'The Arborec',
                            'The Argent Flight',
                        ],
                    },
                    {
                        type: 'PlayerFinishedTurn',
                        time: new Date().getTime(),
                        faction: 'Sardakk N’orr',
                        pass: false,
                    },
                    {
                        type: 'PlayerFinishedTurn',
                        time: new Date().getTime(),
                        faction: 'The Arborec',
                        pass: true,
                    },
                ])
            ).toEqual('The Argent Flight');
        });

        it('when everyone has finished a turn', () => {
            expect(
                currentPlayerTurn([
                    {
                        type: 'ActionPhaseStarted',
                        time: new Date().getTime(),
                        playerOrder: [
                            'Sardakk N’orr',
                            'The Arborec',
                            'The Argent Flight',
                        ],
                    },
                    {
                        type: 'PlayerFinishedTurn',
                        time: new Date().getTime(),
                        faction: 'Sardakk N’orr',
                        pass: false,
                    },
                    {
                        type: 'PlayerFinishedTurn',
                        time: new Date().getTime(),
                        faction: 'The Arborec',
                        pass: true,
                    },
                    {
                        type: 'PlayerFinishedTurn',
                        time: new Date().getTime(),
                        faction: 'The Argent Flight',
                        pass: true,
                    },
                ])
            ).toEqual('Sardakk N’orr');
        });

        it('when everyone has finished a turn but the first player passed', () => {
            expect(
                currentPlayerTurn([
                    {
                        type: 'ActionPhaseStarted',
                        time: new Date().getTime(),
                        playerOrder: [
                            'Sardakk N’orr',
                            'The Arborec',
                            'The Argent Flight',
                        ],
                    },
                    {
                        type: 'PlayerFinishedTurn',
                        time: new Date().getTime(),
                        faction: 'Sardakk N’orr',
                        pass: true,
                    },
                    {
                        type: 'PlayerFinishedTurn',
                        time: new Date().getTime(),
                        faction: 'The Arborec',
                        pass: false,
                    },
                    {
                        type: 'PlayerFinishedTurn',
                        time: new Date().getTime(),
                        faction: 'The Argent Flight',
                        pass: true,
                    },
                ])
            ).toEqual('The Arborec');
        });

        it('when everyone has passed', () => {
            expect(
                currentPlayerTurn([
                    {
                        type: 'ActionPhaseStarted',
                        time: new Date().getTime(),
                        playerOrder: [
                            'Sardakk N’orr',
                            'The Arborec',
                            'The Argent Flight',
                        ],
                    },
                    {
                        type: 'PlayerFinishedTurn',
                        time: new Date().getTime(),
                        faction: 'Sardakk N’orr',
                        pass: true,
                    },
                    {
                        type: 'PlayerFinishedTurn',
                        time: new Date().getTime(),
                        faction: 'The Arborec',
                        pass: true,
                    },
                    {
                        type: 'PlayerFinishedTurn',
                        time: new Date().getTime(),
                        faction: 'The Argent Flight',
                        pass: true,
                    },
                ])
            ).toEqual(undefined);
        });

        it('when the round has not yet started', () => {
            expect(currentPlayerTurn([])).toEqual(undefined);
        });
    });
});
