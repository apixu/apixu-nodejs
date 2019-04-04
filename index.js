'use strict';

const http = require('https');
const queryString = require('querystring');

const API_URL = 'https://api.apixu.com/';
const API_VERSION = 'v1';
const FORMAT = 'json';
const HTTP_TIMEOUT = 20000;
const DOC_WEATHER_CONDITIONS_URL =
    'https://www.apixu.com/doc/Apixu_weather_conditions.';

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;

const config = {
  apikey: null,
};

class Apixu {
  constructor(config) {
    this.config = config;
  }

  conditions() {
    const url = DOC_WEATHER_CONDITIONS_URL + FORMAT;
    return request(url);
  }

  current(query) {
    const params = {
      key: this.config.apikey,
      q: query,
    };
    const url = getUrl('current', params);
    return request(url);
  }

  forecast(query, days, hour) {
    let params = {
      key: this.config.apikey,
      q: query,
      days: days,
    };
    if (hour !== undefined) {
      params['hour'] = hour;
    }

    const url = getUrl('forecast', params);
    return request(url);
  }

  history(query, since, until) {
    if (!(since instanceof Date)) {
      return new Promise((resolve, reject) => {
        const error = new Error('Param \'since\' must be of Date type.');
        reject(error);
      });
    }

    if (until !== undefined && !(until instanceof Date)) {
      return new Promise((resolve, reject) => {
        const error = new Error('Param \'until\' must be of Date type.');
        reject(error);
      });
    }

    const params = {
      key: this.config.apikey,
      q: query,
      dt: since.getFullYear() + '-' +
          (since.getMonth() + 1) + '-'
          + since.getDate(),
    };
    if (until instanceof Date) {
      params['end_dt'] = until.getFullYear() + '-' +
        (until.getMonth() + 1) + '-'
        + until.getDate();
    }

    const url = getUrl('history', params);
    return request(url);
  }

  search(query) {
    const params = {
      key: this.config.apikey,
      q: query,
    };
    const url = getUrl('search', params);
    return request(url);
  }
}

module.exports = {
  config: config,
  Apixu: Apixu,
};

const getUrl = (method, params) => {
  return API_URL +
      API_VERSION + '/' +
      method + '.' + FORMAT +
      '?' + queryString.stringify(params);
};

const request = (url) => {
  let response = '';
  return new Promise((resolve, reject) => {
    const request = http.get(url, (res) => {
      res.setEncoding('utf8');

      const { statusCode } = res;

      if (statusCode !== HTTP_STATUS_OK) {
        if (statusCode === HTTP_STATUS_NOT_FOUND) {
          const error = new Error('Not found');
          error.code = statusCode;
          reject(error);
        } else if (statusCode >= HTTP_STATUS_INTERNAL_SERVER_ERROR) {
          const error = new Error('Interval server error');
          error.code = statusCode;
          reject(error);
        }
      }

      res.on('data', (chunk) => {
        response += chunk;
      });

      res.on('end', () => {
        const r = JSON.parse(response);

        if (r.error !== undefined) {
          const error = new Error(r.error.message);
          error.code = r.error.code;
          reject(error);
        }

        resolve(r);
      });
    }).on('error', (err) => {
      reject(err);
    }).end();

    if (request && request.setTimeout !== undefined) {
      request.setTimeout(HTTP_TIMEOUT, () => {
        request.abort();

        const error = new Error('The request took too long.');
        reject(error);
      });
    }
  });
};
