const User = require('../../../models/User')
const jwt = require('jsonwebtoken')
const { SECRET } = process.env

async function signDiscordLink (req, res) {
  const { id, username } = req.body
  const data = await User.find({discord:
  { id: id,
    status: true,
    username: username}
  })
  if (!data.length) {
    const token = jwt.sign({ id, username }, SECRET, {expiresIn: '10m'})
    res.status(200).json({token: token})
  } else {
    res.status(400).json({msg: 'Esta cuenta de discord ya ha sido vinculada con anterioridad, contacte con el servicio técnico si tiene problemas.'})
  }
}

module.exports = signDiscordLink
