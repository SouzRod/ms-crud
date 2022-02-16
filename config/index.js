'use strict';

require('dotenv').config();

module.exports = {
  stripPrefix: {
    path: `/api/${process.env.SERVICE_NAME.replace(/-/g, '')}`,
  },
  plugins: {
    swagger: {
      basePath: Object.is(process.env.SWAGGER_VERSIONING, 'true')
        ? `/api/${process.env.SERVICE_NAME.replace(/-/g, '')}/` : '/',
    },
  },
  app: {
    port: process.env.PORT,
    httpsPort: process.env.HTTPS_PORT,
  },
  mongo:{
    uri: process.env.MONGO_URI,
    base: process.env.MONGO_DATABASE,
    collections: {
      users: process.env.MONGO_USERS_COLLECTION,
    },
  }
};
