'use strict';

const server = require('./server');

const init = async () => {
  const  serverInstance = await server;
  try {
    await serverInstance.start();

    console.info({
      message: `App running on ${serverInstance.info.protocol}:
    ${serverInstance.info.host}:${serverInstance.info.port}`,
    });

  } catch (error) {
    console.info({ message: `App failed to start ${error.message}` });
  }
};

init();
