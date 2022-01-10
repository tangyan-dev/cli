'use strict';

const healthRouter = require('./health');

module.exports = (app, options) => {
    app.use('/health', healthRouter);
};