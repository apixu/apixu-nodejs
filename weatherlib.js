http = require('http');

var apiKey = 'cacdf29dc2be47d484a105606152306'

var options = {
  host: 'api.apixu.com',
  port: 80,
  path: '/v1/current.json?key=' + apiKey + '&q=',
  method: 'GET'
};



exports.currentWeather = function currentWeather(query, callback){
	options.path = '/v1/current.json?key=' + apiKey + '&q=' + query;
	http.request(options, function(res) {
	  res.setEncoding('utf8');
	  res.on('data', function (chunk) {
		console.log(chunk);
	  });
	  res.on('end', function (chunk) {
	  });
	}).on('error', function(err) {
        // handle errors with the request itself
        console.error('Error with the request:', err.message);
        callback(err);
    }).end();
}





exports.forecastWeather = function forecastWeather(query, noOfDays, callback){
	options.path = '/v1/forecast.json?key=' + apiKey + '&q=' + query + '&days=' + noOfDays;
	http.request(options, function(res) {
	  res.setEncoding('utf8');
	  res.on('data', function (chunk) {
		console.log(chunk);
	  });
	  res.on('end', function (chunk) {
	  });
	}).on('error', function(err) {
        // handle errors with the request itself
        console.error('Error with the request:', err.message);
        callback(err);
    }).end();
}