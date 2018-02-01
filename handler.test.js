const isAreaCActiveToday = require('./handler').isAreaCActiveToday,
      chai = require('chai'),
      expect = require('chai').expect,
      asserttype = require('chai-asserttype');

chai.use(asserttype);

describe('avout handler.js', () => {
  it('should return a valid value', (done) => {
    var event = {}, context = {};

    var callback = (ctx, response) => {
      const body = JSON.parse(response.body);

      expect(response.statusCode).to.equal(200);
      expect(body.result).to.be.boolean();
      expect(body.description).to.be.string();
      done();
    }

    isAreaCActiveToday(event, context, callback);
  })
});
