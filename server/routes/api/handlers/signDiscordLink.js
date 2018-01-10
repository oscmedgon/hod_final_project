const jwt = require('jsonwebtoken')
const { SECRET } = process.env

function signDiscordLink (req, res) {
  const { id, username } = req.body
  const token = jwt.sign({ id, username }, SECRET)
  res.status(200).json({token: token})
}

module.exports = signDiscordLink
