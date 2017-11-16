const User = require('../../../models/User')
const getUserData = require('./getUserData')

function getUserProfile (req, res) {
  const userData = getUserData(req.user)
  const {id} = req.params
  // Checking if user it's not logged
  if (!userData) {
    User.find({_id: id})
    .then(profileData => {
      res.render('viewUser', {profileData: profileData[0], userData: userData, ownProfile: false})
    })
  // Checking if the user it's visiting his own profile
  } else if (userData._id == id) {
    User.find({_id: id})
    .then(profileData => {
      res.render('viewUser', {profileData: profileData[0], userData: userData, ownProfile: true})
    })
  // User it's logged but it's visiting another profile
  } else {
    User.find({_id: id})
    .then(profileData => {
      res.render('viewUser', {profileData: profileData[0], userData: userData, ownProfile: false})
    })  }
}

module.exports = getUserProfile
