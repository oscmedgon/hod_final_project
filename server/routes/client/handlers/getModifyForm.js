const User = require('../../../models/User')
const getUserData = require('./getUserData')

function getModifyForm (req, res) {
  const userData = getUserData(req.user)
  const {id} = req.params
  if (!userData) {
    console.log('Unautorized to modify user, you are not that user')
    res.redirect('/')
  } else if (userData._id == id) {
    User.find({_id: id})
    .then(userData => {
      console.log(userData)
      res.render('modifyUser', {userData: userData[0]})
    })
  } else {
    console.log('Unautorized to modify user, you are not that user')
    res.redirect('/')
  }
}

module.exports = getModifyForm
