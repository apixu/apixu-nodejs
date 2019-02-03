/* global describe it */
'use strict';

const validate = require('jsonschema').validate;
const expect = require('chai').expect;

const client = require('..');
const config = client.config;

config.apikey = process.env.APIXUKEY;
const apixu = new client.Apixu(config);

const schema = require('./schema').read('current.json');

describe('Current', () => {
  it('it should retrieve current weather data by given query', (done) => {
    apixu.current('London').then((current) => {
      const v = validate(current, schema);
      expect(v.errors, v).to.have.length(0);
      done();
    }, (err) => {
      console.log(err);
    });
  });
});
