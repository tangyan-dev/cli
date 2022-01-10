'use strict'
const { createLogger, format, transports } = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')
const { combine, timestamp } = format
const { isArray, isObject, isString, isFunction, isNumber } = require('@tangyansoft/toolkit-common');
const isShowLog = process.env.NODE_ENV !== 'production'

const logger = createLogger({
    level: isShowLog ? 'debug' : 'info',
    format: combine(timestamp(), format.json()),
    transports: [
        new transports.File({ filename: './logs/error.log', level: 'error' }),
        new transports.File({ filename: './logs/out.log' }),
    ],
})
logger.configure({
    level: 'verbose',
    transports: [
        new DailyRotateFile({
            filename: './logs/log-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '7d',
        }),
    ],
})

const parseInfo = (info, message = []) => {
    if (isObject(info)) {
        Object.keys(info).forEach((key) => {
            message.push(info[key])
        });
    }
    if (isArray(info)) {
        info.forEach((item) => {
            message.push(item)
        });
    }
    if (info && (isString(info) || isNumber(info))) {
        message.push(info);
    }
    return message;
}

const parseRequestInfo = (ctx, message = []) => {
    isObject(ctx) &&
        [['originalUrl'], ['User-Agent', ''], ['X-Real-IP', '0.0.0.0'], ['referer', 'noreferer']].forEach((item) => {
            message.push(isFunction(item) ? item() : ctx[item[0]] || ctx.get(item[0]) || item[1])
        });
    return message;
}

const parseErrorInfo = (err, message = []) => {
    message.push(err && err.stack ? err.stack : 'error');
    return message;
}

const parseLogInfo = (info, ctx) => parseRequestInfo(ctx, parseInfo(info)).join(' | ').replace(/"/g, '\\"')

module.exports = {
    debug: (info, ctx) => {
        const msg = parseLogInfo(info, ctx);
        logger.debug(msg);
        isShowLog && console.log(msg);
    },
    info: (info, ctx) => {
        const msg = parseLogInfo(info, ctx);
        logger.info(msg);
        if (isShowLog) {
            console.log();
            console.log(msg);
        }
    },
    warn: (info, ctx) => {
        const msg = parseLogInfo(info, ctx);
        logger.warn(msg);
        isShowLog && console.error(msg);
    },
    error: (info, err, ctx) => {
        const msg = parseRequestInfo(ctx, parseErrorInfo(err, parseInfo(info)))
            .join(' | ')
            .replace(/"/g, '\\"')
            .replace(/\n/g, '\\n');
        logger.error(msg);
        isShowLog && console.error(msg);
    },
}