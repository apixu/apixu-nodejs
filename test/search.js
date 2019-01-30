/* global describe it */
'use strict';

const validate = require('jsonschema').validate;
const expect = require('chai').expect;

const client = require('..');
const config = client.config;

config.apikey = process.env.APIXUKEY;
const apixu = new client.Apixu(config);

const schema = require('./schema').read('search.json');

describe('Search', () => {
  it('it should search location by given query', (done) => {
    apixu.search('London').then((current) => {
      const v = validate(current, schema);
      expect(v.errors, v).to.have.length(0);
      done();
    }, (err) => {
      console.log(err);
    });
  });
});
