var expect = require('chai').expect,
    weather = require('../index').weather;

describe('Module Weather', function(){
  var fake = {
    position: {lat: 38.032024, lng: -1.124372},
    temperature: {max: 22, min: 8, current: 12, pressure: 1013, humidity: 89},
    wind: {speed: 9, deg: 187.020}
  };

  it('get coords from param', function(){
    expect(weather(38.032024, -1.124372)).to.deep.equal(fake);
  });
});
