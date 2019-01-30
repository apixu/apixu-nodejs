/* global describe it */
'use strict';

const expect = require('chai').expect;

const client = require('..');
const apixu = new client.Apixu({});

describe('Error', () => {
  it('it should return an error', (done) => {
    apixu.search('London').then(() => {}, (err) => {
      expect(err).to.be.an('error');
      expect(err.code).to.be.eql(1002);
      expect(err.message).to.have.lengthOf.greaterThan(0);
      done();
    });
  });
});
