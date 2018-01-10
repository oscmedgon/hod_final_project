const User = require('../../../models/User')
const jwt = require('jsonwebtoken')

const { SECRET } = process.env

function removeArticle (req, res) {
  const { user } = req.body
  const { token } = req.params
  const userData = jwt.verify(token, SECRET)
  console.log(userData)
  console.log(req.user)
}

module.exports = removeArticle
