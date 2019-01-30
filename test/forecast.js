/* global describe it */
'use strict';

const fs = require('fs');
const validate = require('jsonschema').validate;
const expect = require('chai').expect;

const client = require('..');
const config = client.config;

config.apikey = process.env.APIXUKEY;
const apixu = new client.Apixu(config);

const schema = JSON.parse(fs.readFileSync(__dirname + '/forecast.json'));

describe('Forecast', () => {
  it('it should retrieve forecast by given query and days', (done) => {
    apixu.forecast('London', 2).then((forecast) => {
      const v = validate(forecast, schema);
      expect(v.errors, v).to.have.length(0);
      done();
    }, (err) => {
      console.log(err);
    });
  });
});
