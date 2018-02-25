const User = require('../../../models/User')
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;
function activateAcount (req, res) {
  const {token} = req.params
  const data = jwt.verify(token, SECRET)
  User.findByIdAndUpdate(data._id, {active: true})
  .then(result => {
    res.status(200).json({msg: `El usuario '${data.username}' con email '${data.email}' se ha validado correctamente.`}),
    error => {
      res.status(400).json({msg: error})
    }
  })
}

module.exports = activateAcount
