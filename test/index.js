var expect = require('chai').expect,
    weather = require('../index').weather;

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
});
