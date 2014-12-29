var weather = require('../index').weather;

weather(38.032024, -1.124372, function(data){
  console.log(data);
});
