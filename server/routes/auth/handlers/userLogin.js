// const jwt = require('jsonwebtoken')
// const { SECRET } = process.env

function userLogin (req, res) {
  // const {username} = req.body
  // const token = jwt.sign({ username }, SECRET)
  console.log('-----> req.session')
  console.log(req.cookie)
  if (req.user) {
    res.status(200).json({msg: 'Login success'})
  } else {
    res.status(400).json({msg: 'Login failed'})
  }
}

module.exports = userLogin
