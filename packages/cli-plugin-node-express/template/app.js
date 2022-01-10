'use strict';

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const appConfig = require('./app.config');

const PORT = appConfig.port;
const rawBodySaver = (req, res, buf) => {
    req.rawBody = buf;
};
const requestLimit = '1024mb';
const defaultBodySavingOptions = {
    limit: requestLimit,
    verify: rawBodySaver,
};
const rawBodySavingOptions = {
    limit: requestLimit,
    verify: rawBodySaver,
    type: '*/*',
};
const urlEncodedOptions = {
    limit: requestLimit,
    verify: rawBodySaver,
    extended: true
};
app.enable('trust proxy');
app.disable('x-powered-by');
app.use(cookieParser());
app.use(bodyParser.json(defaultBodySavingOptions));
app.use(bodyParser.text(defaultBodySavingOptions));
app.use(bodyParser.urlencoded(urlEncodedOptions));
app.use(bodyParser.raw(rawBodySavingOptions));

app.use((req, res, next) => {
    res.status(404).send('Not Found!');
});

app.use((err, req, res, next) => {
    res.status(500).send('Error');
});

const server = http.createServer(app).listen(PORT, () => {
    console.info(`start a server at http://127.0.0.1:${PORT}`);
});

process.on('uncaughtException', (error) => {
    console.error(error);
});

