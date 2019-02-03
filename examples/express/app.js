'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;

const client = require('apixu');
const config = client.config;
config.apikey = process.env.APIXUKEY;
const apixu = new client.Apixu(config);

app.get('/weather', (req, res) => {
  const query = req.query.q;

  apixu.current(query).then((current) => {
    res.send(current);
  }, (err) => {
    console.log(err.code, err.message);
    res.send({error: err.message});
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
