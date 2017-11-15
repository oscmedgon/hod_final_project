const User = require('../../../models/User')
const getUserData = require('./getUserData')

function userModifyAvatar (req, res) {
  const userData = getUserData(req.user)
  const {id} = req.params
  if (!userData) {
    console.log('Unautorized to modify user, you are not that user')
    res.redirect('/')
  } else if (req.params.id == req.user._id) {
    const data = req.body
    User.findByIdAndUpdate({_id: req.user._id}, data)
    .then(response => {
      res.status(200).send({msg: 'Avatar modificado correctamente'})
    }, response => {
      res.status(500).send({msg: 'Ha habido un problema al actualizar su avatar, intentelo de nuevo más tarde'})
    })
  } else {
    console.log('Unautorized to modify user, you are not that user')
    res.redirect('/')
  }
}

module.exports = userModifyAvatar
