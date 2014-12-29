var expect = require('chai').expect,
    weather = require('../index').weather,
    promise = require('../index').weatherPromise;

describe('Module Weather', function(){

  it('get info from coords', function(){
    weather(38.032024, -1.124372, function(data){
      expect(data).to.be.an('object');
      expect(data).to.include.keys('name');
      expect(data).to.include.keys('position');
      expect(data).to.include.keys('temp');
      expect(data).to.include.keys('wind');
    });
  });

  it('get info from coords in a Promise', function(){
    promise(38.032024, -1.124372).then(function(data){
      expect(data).to.be.an('object');
      expect(data).to.include.keys('name');
      expect(data).to.include.keys('position');
      expect(data).to.include.keys('temp');
      expect(data).to.include.keys('wind');
    });
  });
});
