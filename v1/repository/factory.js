'use strict';

const UUID = require('uuid');

const defaultProjection = {
  projection: {
    _id: 0,
  },
};
const defaultUpdateConfigs = ({
  upsert: false,
  multi: true,
});
const defaultFindUpdateConfig = ({
  new: true,
  fields: { _id: 0 },
});

module.exports = ({ db, collectionName, configConnection }) => ({
  insert: async (item) => {
    const collection = await db.collection(collectionName, configConnection);
    const result = await collection.insertOne(Object.assign({ _id: UUID('v4') }, item));
    return result.ops[0];
  },
  createOrUpdateWithWhere: async (filter, data) => {
    const collection = await db.collection(collectionName, configConnection);
    return collection.update(filter, data, { upsert: true });
  },
  update: async (filter, item, configs = defaultUpdateConfigs) => {
    const collection = await db.collection(collectionName, configConnection);
    return collection.update(filter, item, configs);
  },
  updateAndFind: async (filter, item, config = defaultFindUpdateConfig, sort = []) => {
    const collection = await db.collection(collectionName, configConnection);
    const result = await collection.findAndModify(filter, sort, item, config);
    return result.value;
  },
  findOne: async (filter, projection = defaultProjection) => {
    const collection = await db.collection(collectionName, configConnection);
    return collection.findOne(filter, projection);
  },
  findMany: async (filter) => {
    const collection = await db.collection(collectionName, configConnection);
    return collection.find(filter).toArray();
  },
  findWithProjection: async (filter, projection = defaultProjection) => {
    const collection = await db.collection(collectionName, configConnection);
    return collection.findOne(filter, { projection });
  },
  deleteOne: async (filter) => {
    const collection = await db.collection(collectionName, configConnection);
    const { result } = await collection.deleteOne(filter);
    return result;
  },
  count: async (item) => {
    const collection = await db.collection(collectionName, configConnection);
    return collection.find(item).count();
  },
});
