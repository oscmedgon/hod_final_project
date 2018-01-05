const jwt = require('jsonwebtoken')
const { SECRET } = process.env

function signDiscordLink (req, res) {
  console.log('Me has llamado?')
  const { id, username } = req.body
  console.log(id, username)
  const token = jwt.sign({ id, username }, SECRET)
  console.log(token)
  res.status(200).json({token: token})
}

module.exports = signDiscordLink
