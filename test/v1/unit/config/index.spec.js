'use strict';

const { expect } = require('chai');
const objSinon = require('sinon');
const adapters = require('../../../../v1/adapters');
const configWrapper = require('../../../../v1/adapters/config');
const config = require('../../../../config');

let mockDependencies;

const resp = {
  app: {
    httpsPort: 3002,
    port: 3001,
  },
};

describe('Unit tests for config adapter', () => {
  beforeEach('send message', () => {
    mockDependencies = {
      config,
      onSuccess: objSinon.spy(onSuccess => onSuccess),
      onError: objSinon.spy(onError => onError),
      util: {
        refreshConfig: objSinon.spy(() => resp),
      },
    };
  });

  context('smoke tests', () => {
    it('should have a updateConfig adapter created', () => {
      const { updateConfig } = adapters(mockDependencies);
      expect(updateConfig).to.be.a('function');
    });

    it('should have a get configWrapper created', async () => {
      const { updateConfig } = configWrapper(mockDependencies);
      expect(updateConfig).to.be.a('function');
    });
  });

  context('Get ok', () => {
    it('should return object success when updateConfig method is not undefined', async () => {
      await configWrapper(mockDependencies).updateConfig(mockDependencies);
      const result = mockDependencies.onSuccess.returnValues[0];
      expect(result).to.contain('Configurações atualizadas');
    });

    it('should return object success when updateConfig method is undefined', async () => {
      mockDependencies.util = {
        refreshConfig: objSinon.spy(() => undefined),
      };
      await configWrapper(mockDependencies).updateConfig(mockDependencies);
      const result = mockDependencies.onSuccess.returnValues[0];
      expect(result).to.contain('Configurações atualizadas');
    });
  });

  context('Get error', () => {
    it('should return error', async () => {
      mockDependencies.config = null;
      mockDependencies.util = null;
      mockDependencies.onSuccess = null;
      const result = await configWrapper(mockDependencies).updateConfig(mockDependencies);
      expect(result).to.have.property('message');
    });
  });
});
