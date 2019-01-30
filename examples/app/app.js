'use strict';

require('dotenv').config();

const client = require('apixu');
const config = client.config;
config.apikey = process.env.APIXUKEY;
const apixu = new client.Apixu(config);

const query = 'London';

apixu.current(query).then((current) => {
  console.log(current.location);
}, (err) => {
  console.log(err.code, err.message);
});
