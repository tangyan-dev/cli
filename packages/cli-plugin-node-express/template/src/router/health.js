'use strict';
const express = require('express');
const router = express.Router();
const serverStatusCode = 200;

// 健康检查
router.get('/:action', (req, res) => {
    let statusCode = 200;
    let { action } = req.params;
    let limit = ['offline', 'online'];
    limit.forEach((item) => {
        if (item === action) {
            if (/127\.0\.0\.1/.test(req.ip)) {
                serverStatusCode = {
                    offline: 503,
                    online: 200
                }[action];
                return;
            }
            statusCode = 403;
        }
    })
    res.status(({ status: serverStatusCode })[action] || statusCode).send(`${req.ip} ${action}`);
});

module.exports = router;