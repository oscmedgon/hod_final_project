const User = require('../../../models/User')

function registerUser (req, res) {
  const { username, password, email } = req.body
  const account = new User({ username, email })

  User.register(account, password, err => {
    if (err) res.status(400).json({msg: 'Error creating user'})
    else res.status(200).json({msg: 'User succesfully created!'})
  })
}

module.exports = registerUser
