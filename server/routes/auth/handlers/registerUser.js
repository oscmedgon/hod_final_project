const User = require('../../../models/User')
const moment = require('moment')

function registerUser (req, res) {
  const { username, password, email } = req.body
  const name = username
  const avatar = 'http://res.cloudinary.com/dm303fk5u/image/upload/v1511966508/silueta_fondo_transparente-min_yjgaol.png'
  const description = ''
  const user_type = 0
  const date_of_creation = moment().format('DD-MM-YYYY, HH:mm:ss')
  const website = null
  const account = new User({username, name, email, description, avatar, user_type, date_of_creation, website})

  User.register(account, password, err => {
    if (err) res.status(400).json({msg: 'Error creating user'})
    else res.status(200).json({msg: 'User succesfully created!'})
  })
}

module.exports = registerUser
