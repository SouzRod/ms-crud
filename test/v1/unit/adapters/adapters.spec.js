'use strict';

const { expect }      = require('chai');
const adapterWrapper   = require('../../../../v1/adapters');


let mockDependencies;
describe('Unit tests for adapters dependencies', () => {
  beforeEach('create spies', () => {
    mockDependencies = {};
  });

  context('test dependencies tests', () => {
    it('should have a crud adapter created', () => {
      const { get } = adapterWrapper(mockDependencies);
      expect(get).to.be.a('function');
    });

    it('should be crud an item in some data', async () => {
      expect(adapterWrapper).to.be.a('function');
      const adapterInstance = adapterWrapper(mockDependencies);
      expect(adapterInstance).to.be.instanceOf(Object);
      expect(adapterInstance.get).to.be.a('function');
    });
  });
});
