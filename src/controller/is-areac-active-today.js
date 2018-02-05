var moment = require('moment');

class Controller {
  constructor() {}

  isActive(now) {

    const todayHours = this.getAreaCHoursToday(now);

    if(now.isBetween(todayHours.startsAt, todayHours.endsAt)) {
      return { result: true, description: 'Yes' };
    }

    return { result: false, description: 'No' };
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
