'use strict';

const { expect }      = require('chai');
const objSinon        = require('sinon');
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
      payload: {},
      repository: {
        usersCollection: {
          findMany: objSinon.spy(() => Promise.resolve({ id: '123456', name: 'Leo Santander' })),
          insert: objSinon.spy(() => Promise.resolve({ id: '123456', name: 'Leo Santander' })),
        },
      },
      onSuccess: objSinon.spy(onSuccess => onSuccess),
      onError: objSinon.spy(onError => onError),
    };
  });

  context('smoke tests', () => {
    it('should have a get crudWrapper created', async () => {
      const { get, post } = crudWrapper(mockDependencies);
      expect(get).to.be.a('function');
      expect(post).to.be.a('function');
    });
  });

  context('ok', () => {
    it('should return object success when get method', async () => {
      await crudWrapper(mockDependencies).get(mockDependencies);
      const result = mockDependencies.onSuccess.returnValues[0];
      expect(result.name).to.be.equal('Leo Santander');
    });

    it('should return object success when post method', async () => {
      await crudWrapper(mockDependencies).post(mockDependencies);
      const result = mockDependencies.onSuccess.returnValues[0];
      expect(result.name).to.be.equal('Leo Santander');
    });
  });

  context('error', () => {
    it('get should return error when database returns error', async () => {
      mockDependencies.repository = {
        usersCollection: {
          findOne: objSinon.spy(() => Promise.reject(new Error('Error'))),
        },
      };
      const result = await crudWrapper(mockDependencies).get(mockDependencies);
      expect(result).to.have.property('stack');
      expect(result).to.have.property('message');
    });

    it('post should return error when database returns error', async () => {
      mockDependencies.repository = {
        usersCollection: {
          findOne: objSinon.spy(() => Promise.reject(new Error('Error'))),
        },
      };
      const result = await crudWrapper(mockDependencies).post(mockDependencies);
      expect(result).to.have.property('stack');
      expect(result).to.have.property('message');
    });
  });
});
