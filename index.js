
  /**
  * Get the weather from lat an lng http://api.openweathermap.org/data/2.5/find?lat=55.5&lon=37.5&cnt=10
  */
var http = require('http');
var options = {
  host: 'api.openweathermap.org',
  path: '/data/2.5/find?cnt=1&units=metric',
};


module.exports.weather = function(lat, lng, success){

  options.path = options.path + '&lat='+lat+'&lon='+lng;

  var callback = function(response){
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      console.log(str);
      // Process response
      var data = JSON.parse(str);
      var info = data.list[0];
      var result = {
        name: info.name,
        position: info.coord,
        temp: info.main,
        wind: info.wind
      };
      success(result);
    });
  };
  http.request(options, callback).end();
};
