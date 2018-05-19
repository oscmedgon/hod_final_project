const User = require('../../../models/User')
const getUserData = require('./getUserData')

function userModifyData (req, res) {
  const userData = req.user
  const {id} = req.params
  if (!userData) {
    res.redirect('/')
  } else if (id == userData._id) {
    const data = req.body
    if (data.website) {
      if (data.website.slice(0, 8) !== 'https://' && data.website.slice(0, 7) !== 'http://') {
        data.website = 'http://' + data.website
      }
    }
    User.findByIdAndUpdate({_id: req.user._id}, data)
    .then(response => {
      res.status(200).send({msg: 'Información modificada correctamente correctamente'})
    }, response => {
      res.status(500).send({msg: 'Ha habido un problema al actualizar su avatar, intentelo de nuevo más tarde'})
    })
  } else {
    res.redirect('/')
  }
}

module.exports = userModifyData
