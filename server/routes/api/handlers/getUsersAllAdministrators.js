const User = require('../../../models/User')

function getUsersAllAdministrators (req, res) {
  User.find({user_type: 1})
  .select({hash: 0, salt: 0})
  .then(users => res.status(200).json(users))
}

module.exports = getUsersAllAdministrators
