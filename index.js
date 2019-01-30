'use strict';

const http = require('https');
const queryString = require('querystring');

const API_URL = 'https://api.apixu.com/';
const API_VERSION = 'v1';
const FORMAT = 'json';
const HTTP_TIMEOUT = 20000;
const DOC_WEATHER_CONDITIONS_URL = 'https://www.apixu.com/doc/Apixu_weather_conditions.';

const httpStatusOK = 200;
const httpStatusNotFound = 404;
const httpStatusInternalServerError = 404;

const config = {
	apikey: null,
};

class Apixu {
	constructor(config) {
		this.config = config
	}

	conditions() {
		const url = DOC_WEATHER_CONDITIONS_URL + FORMAT;
		return request(url)
	}

	current(query) {
		const params = {
			key: this.config.apikey,
			q: query,
		};
		const url = getUrl('current', params);
		return request(url)
	}

	forecast(query, days) {
		const params = {
			key: this.config.apikey,
			q: query,
			days: days,
		};
		const url = getUrl('forecast', params);
		return request(url)
	}

	history(query, since) {
		if (!(since instanceof Date)) {
			return new Promise((resolve, reject) => {
				reject({'code' : 0, 'message' : 'Param \'since\' must be of Date type.'})
			})
		}

		const params = {
			key: this.config.apikey,
			q: query,
			dt: since.getFullYear() + '-' + (since.getMonth() + 1) + '-' + since.getDate(),
		};
		const url = getUrl('history', params);
		return request(url)
	}

	search(query) {
		const params = {
			key: this.config.apikey,
			q: query,
		};
		const url = getUrl('search', params);
		return request(url)
	}
}

module.exports = {
	config: config,
	Apixu: Apixu,
};

const getUrl = (method, params) => {
	return API_URL + API_VERSION + '/' + method + '.' + FORMAT + '?' + queryString.stringify(params)
};

const request = (url) => {
	let response = '';
	return new Promise((resolve, reject) => {
		const request = http.get(url, (res) => {
			res.setEncoding('utf8');

			const { statusCode } = res;

			if (statusCode !== httpStatusOK) {
				if (statusCode === httpStatusNotFound) {
					reject({'code': statusCode, message: 'Not found'});
				} else if (statusCode >= httpStatusInternalServerError) {
					reject({'code': statusCode, message: 'Interval server error'});
				}
			}

			res.on('data', (chunk) => {
				response += chunk;
			});

			res.on('end', () => {
				const r = JSON.parse(response);

				if (r.error !== undefined) {
					reject(r.error);
				}

				resolve(r)
			});
		}).on('error', (err) => {
			reject(err);
		}).end();

		request.setTimeout(HTTP_TIMEOUT, () => {
			request.abort();
			reject({'code': 0, message: 'The request took too long.'});
		});
	})
};
