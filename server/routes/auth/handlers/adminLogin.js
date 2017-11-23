const jwt = require('jsonwebtoken')
const { SECRET } = process.env
const User = require('../../../models/User')

function userLogin (req, res) {
  const {username} = req.body
  const token = jwt.sign({ username }, SECRET)
  User.find({username: username, user_type: 1})
  .then(response => {
    if (response.length) {
      res.status(200).json({token: token})
    } else {
      res.status(403).json({msg: `Access denied, don't try this at home, ${response}`})
    }
  })
}

module.exports = userLogin
