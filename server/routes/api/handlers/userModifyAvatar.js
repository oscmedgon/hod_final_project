const User = require('../../../models/User')
const getUserData = require('./getUserData')

function userModifyAvatar (req, res) {
  const {imageLink} = req
  const userData = getUserData(req.cookies.user)
  if (!userData) {
    res.redirect('/')
  } else if (req.params.id == req.user._id) {
    const data = {avatar: imageLink}
    User.findByIdAndUpdate({_id: req.user._id}, data)
    .then(response => {
      res.status(200).send({msg: 'Avatar modificado correctamente'})
    }, response => {
      res.status(500).send({msg: 'Ha habido un problema al actualizar su avatar, intentelo de nuevo más tarde'})
    })
  } else {
    res.redirect('/')
  }
}

module.exports = userModifyAvatar
