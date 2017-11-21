const User = require('../../../models/User')

function getAllArticles (req, res) {
  User.find()
  .then(users => res.status(200).json(users))
}

module.exports = getAllArticles
