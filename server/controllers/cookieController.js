const db = require('../models/procrastinationModels');

const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  console.log('from the cookie ', res.locals.result);
  const { userid, username } = res.locals.result;
  res.cookie('user', { userid, username })

  return next();

}

module.exports = cookieController;