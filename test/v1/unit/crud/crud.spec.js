'use strict';

const { expect }      = require('chai');
const objSinon        = require('sinon');
const adapters        = require('../../../../v1/adapters');
const crudWrapper   = require('../../../../v1/adapters/crud');
const config          = require('../../../../config');

let mockDependencies;

describe('Unit tests for crud adapter', () => {
  beforeEach('send message', () => {
    mockDependencies = {
      config,
      headers: {
        host: 'http://localhost:8080',
      },
      payload: {}, /* repositoryMongoDb: {
        testCollection: {
          findOne: objSinon.spy(() => Promise.resolve({})),
        },
      }, */
      onSuccess: objSinon.spy(onSuccess => onSuccess),
      onError: objSinon.spy(onError => onError),
    };
  });

  context('smoke tests', () => {
    it('should have a get adapter created', () => {
      const { get } = adapters(mockDependencies);
      expect(get).to.be.a('function');
    });

    it('should have a get crudWrapper created', async () => {
      const { get } = crudWrapper(mockDependencies);
      expect(get).to.be.a('function');
    });
  });

  context('Get ok', () => {
    it('should return object success when get method', async () => {
      await crudWrapper(mockDependencies).get(mockDependencies);
      const result = mockDependencies.onSuccess.returnValues[0];
      expect(result).to.be.contain('Running application on port 3001...');
    });
  });

  context('Get error', () => {
    it('should return error 500 in get method', async () => {
      mockDependencies.config = null;
      const result = await crudWrapper(mockDependencies).get(mockDependencies);
      expect(result).to.have.property('stack');
      expect(result).to.have.property('message');
    });
  });
});
