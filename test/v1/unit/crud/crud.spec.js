'use strict';

const { expect }      = require('chai');
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
          findMany: () => Promise.resolve({ id: '123456', name: 'Leo Santander' }),
          insert: () => Promise.resolve({ id: '123456', name: 'Leo Santander' }),
          updateAndFind: () => Promise.resolve({ id: '123456', name: 'Leo Santander' }),
          deleteOne: () => Promise.resolve({ id: '123456', name: 'Leo Santander' }),
        },
      },
      onSuccess: onSuccess => onSuccess,
      onError: onError => onError,
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
      const result = await crudWrapper(mockDependencies).get(mockDependencies);
      expect(result.name).to.be.equal('Leo Santander');
    });

    it('should return object success when post method', async () => {
      const result = await crudWrapper(mockDependencies).post(mockDependencies);
      expect(result.name).to.be.equal('Leo Santander');
    });

    it('should return object success when put method', async () => {
      const result = await crudWrapper(mockDependencies).put(mockDependencies);
      expect(result.name).to.be.equal('Leo Santander');
    });

    it('should return object success when del method', async () => {
      const result = await crudWrapper(mockDependencies).del(mockDependencies);
      expect(result.message).to.be.equal('User has been successfully deleted!');
    });
  });

  context('error', () => {
    it('get should return error when database returns error', async () => {
      mockDependencies.repository = {
        usersCollection: {
          findMany: () => Promise.reject(new Error('Error')),
        },
      };
      const result = await crudWrapper(mockDependencies).get(mockDependencies);
      expect(result).to.have.property('stack');
      expect(result).to.have.property('message');
    });

    it('post should return error when database returns error', async () => {
      mockDependencies.repository = {
        usersCollection: {
          insert: () => Promise.reject(new Error('Error')),
        },
      };
      const result = await crudWrapper(mockDependencies).post(mockDependencies);
      expect(result).to.have.property('stack');
      expect(result).to.have.property('message');
    });

    it('put should return error when database returns error', async () => {
      mockDependencies.repository = {
        usersCollection: {
          updateAndFind: () => Promise.reject(new Error('Error')),
        },
      };
      const result = await crudWrapper(mockDependencies).put(mockDependencies);
      expect(result).to.have.property('stack');
      expect(result).to.have.property('message');
    });

    it('del should return error when database returns error', async () => {
      mockDependencies.repository = {
        usersCollection: {
          deleteOne: () => Promise.reject(new Error('Error')),
        },
      };
      const result = await crudWrapper(mockDependencies).del(mockDependencies);
      expect(result).to.have.property('stack');
      expect(result).to.have.property('message');
    });
  });
});
