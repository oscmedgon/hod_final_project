const User = require('../../../models/users')

function registerUser (req, res) {
  const { username, password, avatar, email } = req.body
  const account = new User({ username, avatar, email })

  User.register(account, password, (err, user) => {
    if (err) res.status(500).json({msg: 'Error creating user'})
    res.status(200).json({msg: 'User succesfully created!'})
  })
}

module.exports = registerUser
