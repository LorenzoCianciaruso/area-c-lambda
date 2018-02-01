'use strict';

const Controller = require('./controller/is-areac-active-today'),
      moment = require('moment');

module.exports.isAreaCActiveToday = (event, context, callback) => {
  const controller = new Controller();
  const now = moment();

  const response = {
    statusCode: 200,
    headers: {},
    body: JSON.stringify(controller.isActive(now))
  };

  callback(null, response);
};
