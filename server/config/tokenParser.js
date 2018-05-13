const User = require('../models/User');
const jwt = require('jsonwebtoken');

const { SECRET } = process.env;

async function tokenParser (req, res, next) {
  if (req && req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'bearer' && req.headers.authorization.split(' ')[1] !== 'null') {
    const token = await req.headers.authorization.split(' ')[1];
    const {_id} = await jwt.verify(token, SECRET);
    await User.findById(_id)
      .then((response) => {
        console.log(response)
        req.user = response;
        console.log('---------------------midleware')
        console.log(req.user)
      }, (error) => {
        console.error(error);
      });
  }
  next();
}

module.exports = tokenParser;
