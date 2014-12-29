var weather = require('../index').weather;
var weatherPromise = require('../index').weatherPromise;

weather(38.032024, -1.124372, function(error){
  console.log(error);
},function(data){
  console.log(data);
});

weatherPromise(38.032024, -1.124372).then(function(data){
  console.log("Promise ok", data);
}, function(error){
  console.log("Promise error", error);
});
