const User = require('../../../models/User');


function getUserProfile (req, res) {
  console.log(req.user)
  const userData = req.user;
  const {id} = req.params;
  // Checking if user it's not logged
  if (!userData) {
    User.find({_id: id})
      .then(profileData => User.populate(profileData, {path: 'articles'}, function (err, articles) {
        if (err) res.status(400).json({err: 'Ha ocurrido un error al recuperar la información del usuario'})
        res.render('viewUser', {title: `${profileData[0].name}'s profile`, profileData: profileData[0], userData: userData, ownProfile: false});
      })
    );
  // Checking if the user it's visiting his own profile
  } else if (userData._id == id) {
    User.find({_id: id})
      .then(profileData => User.populate(profileData, {path: 'articles'}, function (err, articles) {
        res.render('viewUser', {title: `${profileData[0].name}'s profile`, profileData: profileData[0], userData: userData, ownProfile: true});
      })
    );
  // User it's logged but it's visiting another profile
  } else {
    User.find({_id: id})
      .then(profileData => User.populate(profileData, {path: 'articles'}, function (err, articles) {
        res.render('viewUser', {title: `${profileData[0].name}'s profile`, profileData: profileData[0], userData: userData, ownProfile: false});
      })
    );
  }
}

module.exports = getUserProfile;
