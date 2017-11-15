const User = require('../../../models/User')
const getUserData = require('./getUserData')

function userModifyData (req, res) {
  const userData = getUserData(req.user)
  const {id} = req.params
  console.log(id, id == userData._id, userData._id)
  if (!userData) {
    console.log('Unautorized to modify user, you are not that user')
    res.redirect('/')
  } else if (id == userData._id) {
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

// function userModifyData (req, res) {
//   const userData = getUserData(req.user)
//   const {id} = req.params
//   if (!userData) {
//     console.log('Unautorized to modify user, you are not that user')
//     res.redirect('/')
//   } else if (req.params.id == req.user._id) {
//     const data = req.body
//     console.log('Hola que ase')
//     User.findByIdAndUpdate({_id: req.user._id}, data)
//     .then(response => {
//       console.log(response)
//       res.status(200).send({msg: 'Perfil modificado'})
//     }, response => {
//       res.status(500).send({msg: 'Ha habido un problema al actualizar su avatar, intentelo de nuevo más tarde'})
//     })
//   } else {
//     console.log('Unautorized to modify user, you are not that user')
//     res.redirect('/')
//   }
// }

module.exports = userModifyData
