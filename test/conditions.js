'use strict';

const fs = require('fs');
const validate = require('jsonschema').validate;
const expect = require('chai').expect;

const client = require('..');
const apixu = new client.Apixu();

const schema = JSON.parse(fs.readFileSync(__dirname + '/conditions.json'));

describe('Conditions', () => {
	it('it should retrieve weather conditions list', (done) => {
		apixu.conditions().then((conditions) => {
			const v = validate(conditions, schema);
			expect(v.errors, v).to.have.length(0);
			done();
		}, (err) => {
			console.log(err)
		});
	});
});
