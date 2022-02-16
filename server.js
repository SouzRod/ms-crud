'use strict';

const Hapi = require('@hapi/hapi');
const config = require('./config');
const routes = require('./v1/routes');
const plugins = require('./plugins');

module.exports = (async () => {
  const server = Hapi.server({ port: config.app.port, router: { isCaseSensitive: false } });
  server.realm.modifiers.route.prefix = config.stripPrefix.path;

  await server.register(plugins);
  server.route(routes);

  return server;
})();
