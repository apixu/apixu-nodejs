'use strict';

const client = require('..');
const config = client.config;

config.apikey = process.env.APIXUKEY;
const apixu = new client.Apixu(config);

apixu.search('London').then((search) => {
  for (const i in search) {
    console.log(search[i].id);
    console.log(search[i].name);
    console.log(search[i].region);
    console.log();
  }
}, (err) => {
  console.log(err.code, err.message);
});

/*
[
   {
      "id":2801268,
      "name":"London, City of London, Greater London, United Kingdom",
      "region":"City of London, Greater London",
      "country":"United Kingdom",
      "lat":51.52,
      "lon":-0.11,
      "url":"london-city-of-london-greater-london-united-kingdom"
   }
]
*/
