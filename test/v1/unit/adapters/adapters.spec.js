'use strict';

const { expect }      = require('chai');
const crudWrapper   = require('../../../../v1/adapters/crud');


let mockDependencies;
describe('Unit tests for adapters dependencies', () => {
  beforeEach('create spies', () => {
    mockDependencies = {};
  });

  context('test dependencies tests', () => {
    it('should have a crud adapter created', () => {
      const { get } = crudWrapper(mockDependencies);
      expect(get).to.be.a('function');
    });

    it('should be crud an item in some data', async () => {
      expect(crudWrapper).to.be.a('function');
      const adapterInstance = crudWrapper(mockDependencies);
      expect(adapterInstance).to.be.instanceOf(Object);
      expect(adapterInstance.get).to.be.a('function');
    });
  });
});
