'use strict';

const { MongoClient } = require('mongodb');

async function connect(state, url, dbName, mongoClient = MongoClient, promise = Promise) {
  try {
    const client = await mongoClient.connect(url, {
      promiseLibrary: promise,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    state.db = client.db(dbName);
    return state;
  } catch (err) {
    console.log(`Mongo failed to connect ${err}`);
    throw new Error(`Mongo failed to connect ${err}`);
  }
}

const factory = state => ({

  isConnected() {
    return state.db && state.db.serverConfig && state.db.serverConfig.isConnected();
  },

  disconnect() {
    state.db.serverConfig.close();
    state.db = null;
    return state.db;
  },

  async collection(collectionName, configConnection) {
    if ((!state.db || !state.db.serverConfig.isConnected()) && configConnection) {
      await connect(state, configConnection.uri, configConnection.base);
    }

    return state.db.collection(collectionName);
  },

  db() {
    return state.db;
  },
});

module.exports = factory;
