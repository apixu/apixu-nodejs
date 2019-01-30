'use strict';

const client = require('..');
const apixu = new client.Apixu();

apixu.conditions().then((conditions) => {
  for (const i in conditions) {
    console.log(conditions[i].code, conditions[i].day);
  }
}, (err) => {
  console.log(err.code, err.message);
});

/*
[
    {
        "code" : 1000,
        "day" : "Sunny",
        "night" : "Clear",
        "icon" : 113
    }
]
*/
