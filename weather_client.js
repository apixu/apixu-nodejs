var weather = require('./weatherlib');

errorHandler = function (){
	console.log('got some error')
}
	
//current weather takes pin code or location as first parameter, error handler callback as second
weather.currentWeather(20500, errorHandler);

//forecast weather takes pin code or location as first parameter, number of days as second, error handler callback as second
weather.forecastWeather(20500, 2, errorHandler);