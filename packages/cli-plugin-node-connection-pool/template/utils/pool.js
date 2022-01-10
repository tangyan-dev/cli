// https://www.npmjs.com/package/generic-pool

const genericPool = require('generic-pool');

class Pool {
    constructor(create = () => { /*return DbDriver.createClient(); */ }, destroy = (client) => { /* client.quit(); */ }, options = { max: 100, min: 10 }) {
        this.pool = genericPool.createPool({
            create,
            destroy
        }, options);
    }
    connect() {
        return this.pool.acquire();
    }
    release(client) {
        this.pool.release(client);
    }
    destroy() {
        try {
            this.pool.drain().then(() => {
                this.pool.clear();
            });
        } catch (e) { }
    }
};

module.exports = Pool;