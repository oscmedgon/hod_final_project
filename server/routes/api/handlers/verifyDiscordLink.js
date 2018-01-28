const User = require('../../../models/User')
const jwt = require('jsonwebtoken')
const getUserData = require('../../api/handlers/getUserData')

const { SECRET } = process.env

function verifyDiscordLink (req, res) {
  const userData = getUserData(req.user)
  const { token } = req.params
  try {
    const discordData = jwt.verify(token, SECRET)
    const error = {}
    const data = {}
    if (!req.user) {
      error.status = true
      error.msg = 'No hay ninguna sesión iniciada, inicie sesión en la página web y vuelva a intentarlo.'
    } else if (req.user.discord.status) {
      error.status = true
      error.msg = 'Tu usuario ya tiene una cuenta de discord vinculada contacte con administración para revisar su caso.'
    } else {
      error.status = false
      data.token = jwt.sign({ user: req.user._id, discordData }, SECRET)
    }
    res.render('discord', {userData, discord: discordData, error: error, data})
  } catch (error) {
    const errorExp = {
      status: true,
      msg: 'La solicitud ha expirado, vuelva a discord para reiniciar el proceso'
    }
    res.render('discord', {userData, error: errorExp})
  }
}

module.exports = verifyDiscordLink
