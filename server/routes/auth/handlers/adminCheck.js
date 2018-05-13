const jwt = require('jsonwebtoken');

const { SECRET } = process.env;

const User = require('../../../models/User');

function adminCheck (req, res) {
  const token = req.body.data;
  const {_id} = jwt.verify(token, SECRET);
  User.find({_id: _id})
    .then(response => {
      if (response.length && response[0].user_type > 0) {
        res.status(200).json({msg: 'User validater correctly'});
      } else {
        res.status(403).json({msg: 'User doesent exist or unautorized'});
      }
    }, error => {
      res.status(403).json({msg: error});
    });
}

module.exports = adminCheck;
