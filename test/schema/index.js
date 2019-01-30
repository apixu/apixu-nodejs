'use strict';

const fs = require('fs');
const path = require('path');

exports.read = (file) => {
  return JSON.parse(fs.readFileSync(path.join(__dirname, file)));
};
