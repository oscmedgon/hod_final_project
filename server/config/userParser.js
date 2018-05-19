const User = require('../models/User');

async function userParser (req, res, next) {
  if (req && req.cookies && req.cookies.user) {
    const {user} = req.cookies;
    const response = await User.findById(user);
    req.user = response;
  }
  next();
}

module.exports = userParser;
