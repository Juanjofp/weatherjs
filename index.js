
  /**
  * Get the weather from lat an lng http://api.openweathermap.org/data/2.5/find?lat=55.5&lon=37.5&cnt=10
  */
var Promisenode = require('promise');
var http = require('http');
var options = {
  host: 'api.openweathermap.org',
  path: '/data/2.5/find?cnt=1&units=metric',
};


module.exports.weather = function(lat, lng, error, success){

  options.path = options.path + '&lat='+lat+'&lon='+lng;

  var callback = function(response){
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      //console.log(str);
      // Process response
      try{
        var data = JSON.parse(str);
        var info = data.list[0];
        var result = {
          name: info.name,
          position: info.coord,
          temp: {
            current: info.main.temp,
            max: info.main.temp_max,
            min: info.main.temp_min
          },
          wind: info.wind,
          pressure: info.main.pressure,
          humidity: info.main.humidity
        };
        success(result);
      }catch(ex){
        console.log("Weather Json Error", ex);
        error(ex);
      }
    });
  };
  var req = http.request(options, callback);
  req.on('error', function(e){
    console.log('Error weather', e);
    error(e);
  });
  req.end();
};

module.exports.weatherPromise = function(lat, lng){
  return new Promisenode(function(fulfill, reject){
    options.path = options.path + '&lat='+lat+'&lon='+lng;

    var callback = function(response){
      var str = '';

      //another chunk of data has been recieved, so append it to `str`
      response.on('data', function (chunk) {
        str += chunk;
      });

      //the whole response has been recieved, so we just print it out here
      response.on('end', function () {
        //console.log(str);
        // Process response
        try{
          var data = JSON.parse(str);
          var info = data.list[0];
          var result = {
            name: info.name,
            position: info.coord,
            temp: {
              current: info.main.temp,
              max: info.main.temp_max,
              min: info.main.temp_min
            },
            wind: info.wind,
            pressure: info.main.pressure,
            humidity: info.main.humidity
          };
          fulfill(result);
        }catch(ex){
          console.log("Weather Json Error", ex);
          reject(ex);
        }
      });
    };
    var req = http.request(options, callback);
    req.on('error', function(e){
      console.log('Error weather', e);
      reject(e);
    });
    req.end();
  });
};
