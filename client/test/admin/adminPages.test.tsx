import { currentPlayerTurnInActionPhase } from '../../src/events';

describe('player turn page', () => {
    for (let i = 4261; i < 4277; i++) {
        console.log(`import tile${i} from './assets/tiles/ST_${i}.webp';`);
    }

    `{
        tileNumber: 4270,
        image: tile4270,
        planets: [],
    }`;

    describe('determines next player', () => {
        it('when no one has finished a turn', () => {
            expect(
                currentPlayerTurnInActionPhase([
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
                currentPlayerTurnInActionPhase([
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
                currentPlayerTurnInActionPhase([
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
                currentPlayerTurnInActionPhase([
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
                currentPlayerTurnInActionPhase([
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
                currentPlayerTurnInActionPhase([
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
            expect(currentPlayerTurnInActionPhase([])).toEqual(undefined);
        });
    });
});
