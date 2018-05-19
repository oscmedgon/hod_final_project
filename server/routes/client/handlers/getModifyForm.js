const User = require('../../../models/User')
const getUserData = require('./getUserData')

function getModifyForm (req, res) {
  const userData = req.user;
  const {id} = req.params
  const unautorizedUrl = '/user/' + id
  if (!userData) {
    res.redirect(unautorizedUrl)
  } else if (userData._id == id) {
    User.find({_id: id})
    .then(userData => {
      res.render('modifyUser', {title: `${userData[0].name} modify`, userData: userData[0]})
    })
  } else {
    res.redirect(unautorizedUrl)
  }
}

module.exports = getModifyForm
