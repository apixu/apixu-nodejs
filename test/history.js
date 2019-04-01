/* global describe it */
'use strict';

const validate = require('jsonschema').validate;
const expect = require('chai').expect;

const client = require('..');
const config = client.config;

config.apikey = process.env.APIXUKEY;
const apixu = new client.Apixu(config);

const schema = require('./schema').read('history.json');

describe('History', () => {
  it('it should retrieve historical data by given query and date', (done) => {
    const since = new Date();
    since.setDate(since.getDate() - 3);

    const until = new Date();
    until.setDate(until.getDate() - 1);

    apixu.history('London', since, until).then((history) => {
      const v = validate(history, schema);
      expect(v.errors, v).to.have.length(0);
      done();
    }, (err) => {
      console.log(err);
    });
  });

  it('it should return an error if since is an invalid date', (done) => {
    apixu.history('London', 'date').then(() => {}, (err) => {
      expect(err).to.be.an('error');
      done();
    });
  });

  it('it should return an error if until is an invalid date', (done) => {
    apixu.history('London', new Date(), 'until').then(() => {}, (err) => {
      expect(err).to.be.an('error');
      done();
    });
  });
});
