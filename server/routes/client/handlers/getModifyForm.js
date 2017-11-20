const User = require('../../../models/User')
const getUserData = require('./getUserData')

function getModifyForm (req, res) {
  const userData = getUserData(req.user)
  const {id} = req.params
  const unautorizedUrl = '/user/' + id
  if (!userData) {
    console.log('Unautorized to modify user, you are not that user')
    res.redirect(unautorizedUrl)
  } else if (userData._id == id) {
    User.find({_id: id})
    .then(userData => {
      res.render('modifyUser', {title: `${userData[0].name} modify`, userData: userData[0]})
    })
  } else {
    console.log('Unautorized to modify user, you are not that user')
    res.redirect(unautorizedUrl)
  }
}

module.exports = getModifyForm
