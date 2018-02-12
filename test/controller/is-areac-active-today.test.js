const Controller = require('../../src/controller/is-areac-active-today'),
 expect = require('chai').expect,
 moment = require('moment');

describe('about isActive', () => {
  const controller = new Controller();

  const activeExpectation = { result: true, description: 'Yes' };
  const notActiveExpectation = { result: false, description: 'No' };

  describe('on Mondays, Tuesdays, Wednesdays and Fridays', () => {
    it('should return active response', () => {
      const now = moment('2018-01-24T12:30');

      expect(controller.isActive(now)).to.deep.equal(activeExpectation);
    });

    it('should return not active if has not started yet', () => {
      const now = moment('2018-01-24T07:29');

      expect(controller.isActive(now)).to.deep.equal(notActiveExpectation);
    });

    it('should return not active if has already finished', () => {
      const now = moment('2018-01-24T19:31');

      expect(controller.isActive(now)).to.deep.equal(notActiveExpectation);
    });
  });

  describe('on Thursdays', () => {
    it('should return active response', () => {
      const now = moment('2018-01-25T12:30');

      expect(controller.isActive(now)).to.deep.equal(activeExpectation);
    });

    it('should return not active if has not started yet', () => {
      const now = moment('2018-01-25T07:29');

      expect(controller.isActive(now)).to.deep.equal(notActiveExpectation);
    });

    it('should return not active if has already finished', () => {
      const now = moment('2018-01-25T18:01');

      expect(controller.isActive(now)).to.deep.equal(notActiveExpectation);
    });
  });

  describe('on Saturdays and Sundays', () => {
    it('should return not active if saturday', () => {
      const now = moment('2018-01-27T10:00');

      expect(controller.isActive(now)).to.deep.equal(notActiveExpectation);
    });

    it('should return not active if sunday', () => {
      const now = moment('2018-01-28T10:00');

      expect(controller.isActive(now)).to.deep.equal(notActiveExpectation);
    });
  });

  describe('on Bank Holidays', () => {

    const bankHolidaysSet = require('../../res/bank-holidays-2018').bankHolidaysDates,
          bankHolidays = Array.from(bankHolidaysSet);

    bankHolidays.forEach((bankHoliday) => {
      it('should always return non active', () => {
          const now = moment(bankHoliday + 'T10:00');
          expect(controller.isActive(now)).to.deep.equal(notActiveExpectation);
      });
    });
  });
});
