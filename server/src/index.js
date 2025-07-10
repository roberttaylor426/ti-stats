const bodyParser = require('body-parser');
const fs = require('node:fs');
const {createProxyMiddleware} = require('http-proxy-middleware');
const express = require("express");

const app = require('express')();

const port = 9999;

app.use('/music', express.static('music'));

app.use(bodyParser.json());

let events = [];

app.get('/api', (req, res) => {
    res.send(JSON.stringify(events));
});

app.put('/api', async (req, res) => {
    events = req.body;
    fs.writeFile('out/event-log.json', JSON.stringify(events), err => {
        if (err) {
            console.error(err);
        } else {
            console.log('Successfully wrote events');
        }
    });
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
