const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = require('express')();

const port = 9999;

app.use(bodyParser.json());

// const events = [
//     { type: 'PlayerAssignedColor', faction: 'Sardakk N’orr', color: 'Red' },
//     {
//         type: 'PlayerAssignedColor',
//         faction: 'The Mahact Gene-Sorcerers',
//         color: 'Yellow',
//     },
//     {
//         type: 'PlayerAssignedColor',
//         faction: 'The Xxcha Kingdom',
//         color: 'Black',
//     },
//     {
//         type: 'PlayerAssignedColor',
//         faction: 'The L1Z1X Mindnet',
//         color: 'Pink',
//     },
//     {
//         type: 'PlayerAssignedColor',
//         faction: 'The Yin Brotherhood',
//         color: 'Green',
//     },
//     {
//         type: 'PlayerAssignedColor',
//         faction: 'The Clan of Saar',
//         color: 'Orange',
//     },
//     {
//         type: 'MapTileSelected',
//         systemTileNumber: 1,
//         position: 0,
//     },
//     {
//         type: 'MapTileSelected',
//         systemTileNumber: 10,
//         position: 1,
//     },
//     {
//         type: 'RoundStarted',
//         time: 0,
//     },
//     {
//         type: 'ActionPhaseStarted',
//         time: 0,
//     },
//     {
//         type: 'PlanetControlled',
//         planet: 'Jord',
//         faction: 'Sardakk N’orr',
//     },
//     {
//         type: 'PlanetControlled',
//         planet: 'Jord',
//         faction: 'The Mahact Gene-Sorcerers',
//     },
//     {
//         type: 'PlanetControlled',
//         planet: 'Wren Terra',
//         faction: 'Sardakk N’orr',
//     },
//     {
//         type: 'PlanetControlled',
//         planet: 'Arc Prime',
//         faction: 'The Mahact Gene-Sorcerers',
//     },
//     {
//         type: 'PlanetDestroyed',
//         planet: 'Arc Prime',
//     },
//     {
//         type: 'PlanetEnhanced',
//         planet: 'Jord',
//         extraResources: 1,
//         extraInfluence: 2,
//     },
//     {
//         type: 'PlayerScoredVictoryPoint',
//         faction: 'Sardakk N’orr',
//         delta: 1,
//     },
//     {
//         type: 'PlayerScoredVictoryPoint',
//         faction: 'Sardakk N’orr',
//         delta: 1,
//     },
//     {
//         type: 'PlayerFinishedTurn',
//         faction: 'Sardakk N’orr',
//         time: new Date().getTime(),
//     },
//     {
//         type: 'PlayerFinishedTurn',
//         faction: 'The Mahact Gene-Sorcerers',
//         time: new Date().getTime() + 120_000,
//     },
//     {
//         type: 'PlayerFinishedTurn',
//         faction: 'Sardakk N’orr',
//         time: new Date().getTime() + 180_000,
//     },
//     {
//         type: 'RoundEnded',
//         time: new Date().getTime(),
//     },
//     {
//         type: 'RoundStarted',
//         time: new Date().getTime(),
//     },
//     {
//         type: 'PlayerScoredVictoryPoint',
//         faction: 'Sardakk N’orr',
//         delta: 1,
//     },
//     {
//         type: 'PlayerScoredVictoryPoint',
//         faction: 'The Clan of Saar',
//         delta: 1,
//     },
//     {
//         type: 'RoundEnded',
//         time: new Date().getTime() + 120_000,
//     },
//     {
//         type: 'RoundStarted',
//         time: new Date().getTime() + 120_000,
//     },
//     {
//         type: 'RoundEnded',
//         time: new Date().getTime() + 220_000,
//     },
//     {
//         type: 'RoundStarted',
//         time: new Date().getTime() + 120_000,
//     },
//     {
//         type: 'RoundEnded',
//         time: new Date().getTime() + 220_000,
//     },
//     {
//         type: 'RoundStarted',
//         time: new Date().getTime() + 120_000,
//     },
//     {
//         type: 'RoundEnded',
//         time: new Date().getTime() + 220_000,
//     },
//     {
//         type: 'RoundStarted',
//         time: new Date().getTime() + 120_000,
//     },
//     {
//         type: 'RoundEnded',
//         time: new Date().getTime() + 220_000,
//     },
//     {
//         type: 'RoundStarted',
//         time: new Date().getTime() + 120_000,
//     },
//     {
//         type: 'RoundEnded',
//         time: new Date().getTime() + 220_000,
//     },
// ];

let events = [];

app.get('/api', (req, res) => {
    res.send(JSON.stringify(events));
});

app.put('/api', async (req, res) => {
    events = req.body;
    res.end();
});

app.use(
    '*',
    createProxyMiddleware({
        target: 'http://localhost:8888',
        ws: true,
    })
);

app.listen(port, () => {
    console.log(
        '\x1b[32m%s\x1b[0m',
        `TI Stats server waiting for requests on port ${port}!`
    );
});
