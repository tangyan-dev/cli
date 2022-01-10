'use strict'

const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const appConfig = require('./app.config');
const router = require('./src/router/index');

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', (err, ctx) => {
    ctx.body = 'error';
});

app.listen(appConfig.port);
