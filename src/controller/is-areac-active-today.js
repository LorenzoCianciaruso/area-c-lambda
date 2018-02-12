var moment = require('moment'),
    bankHolidays = require('../../res/bank-holidays-2018').bankHolidaysDates;

class Controller {

  constructor() {
    this.todayIsActive = { result: true, description: 'Yes' };
    this.todayIsNotActive = { result: false, description: 'No' };
  }

  isActive(now) {
    const todayHours = this.getAreaCHoursToday(now);

    if(this.isBankHoliday(now)){
      return this.todayIsNotActive;
    }

    if(now.isBetween(todayHours.startsAt, todayHours.endsAt)) {
      return this.todayIsActive;
    }

    return this.todayIsNotActive;
  }

  isBankHoliday(now) {
    return bankHolidays.has(now.format('YYYY-MM-DD'));
  }

  getAreaCHoursToday(now) {
    switch(now.day()){
      case 0:
      case 6:
      return {
        startsAt: moment(now).hour(0).minute(0).second(0),
        endsAt: moment(now).hour(0).minute(0).second(0)
      }

      case 4:
      return {
        startsAt: moment(now).hour(7).minute(30).second(0),
        endsAt: moment(now).hour(18).minute(0).second(0)
      }
    }

    return {
      startsAt: moment(now).hour(7).minute(30).second(0),
      endsAt: moment(now).hour(19).minute(30).second(0)
    }
  }
}

module.exports = Controller;
