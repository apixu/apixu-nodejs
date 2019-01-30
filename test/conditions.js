'use strict';

const validate = require('jsonschema').validate;

const expect = require('chai').expect;

const client = require('..');
const apixu = new client.Apixu();

const schema = {
	"type": "array",
	"minItems": 1,
	"items": {
		"type": "object",
		"required": ["code"],
		"properties": {
			"code" : {
				"type": "number",
			},
			"day" : {
				"type": "string",
			},
			"night" : {
				"type": "string",
			},
			"icon" : {
				"type": "number",
			},
		},
	},
};

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
