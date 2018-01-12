const User = require('../../../models/User')
const jwt = require('jsonwebtoken')

const { SECRET } = process.env

function discordLink (req, res) {
  const {token} = req.body
  const data = jwt.verify(token, SECRET)
  const discordData = {
    username: data.discordData.username,
    status: true,
    id: data.discordData.id
  }
  User.findByIdAndUpdate(data.user, {discord: discordData})
  .then(response => { res.status(200).json({msg: `user ${data.user} succesfuly linked to discord account ${discordData.id}`}) },
        response => { res.status(400).json({msg: `An error ocurred, user ${data.user} not modified`}) }
      )
}

module.exports = discordLink
