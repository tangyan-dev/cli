// https://docs.mongodb.com/drivers/node/current/fundamentals/connection/

'use strict';

const { MongoClient } = require('mongodb');

const CONFIG = {
    dbs: {
        test: {
            uri: 'mongodb://localhost',
            collections: []
        }
    }
};

const run = async (dbName, cb) => {
    const client = new MongoClient(CONFIG.dbs[dbName].uri);
    try {
        await client.connect();
        const database = client.db(dbName);
        await cb(database);
    } catch (err) {
        throw err;
    }
    finally {
        await client.close();
    }
};

const createActions = (collectionName, dbName) => {
    const create = (method, arg) => new Promise(async (resolve, reject) => {
        run(dbName, async db => {
            const collection = db.collection(collectionName);
            const result = await collection[method](...arg);
            resolve(result);
        }).catch(err => reject(err));
    });

    return {
        findOne: (query = {}, options = { projection: { _id: 0 } }) => {
            return create('findOne', [query, options]);
        },
        findMany: (query = {}, options = { projection: { _id: 0 } }) => {
            return create('find', [query, options]).toArray();
        },
        insertOne: (doc) => {
            return create('insertOne', [doc]);
        },
        insertMany: (docs) => {
            return create('insertMany', [docs]);
        },
        updateOne: (filter, updateDoc, options = {}) => {
            return create('updateOne', [filter, updateDoc, options]);
        },
        updateMany: (filter, updateDoc, options = {}) => {
            return create('updateMany', [filter, updateDoc, options]);
        },
        replaceOne: (query, replacement) => {
            return create('replaceOne', [filter, updateDoc, options]);
        },
        deleteOne: (query) => {
            return create('deleteOne', [query]);
        },
        deleteMany: (query) => {
            return create('deleteMany', [query]);
        },
    }
};

module.exports = {
    createActions
};