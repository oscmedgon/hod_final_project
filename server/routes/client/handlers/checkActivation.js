const firebase = require('firebase')

const User = require('../../../models/User');

async function checkActivation (id) {
  const FBuser = await firebase.auth().currentUser;
  const user = await User.findById(id);
  if (FBuser) {
    const {emailVerified} = FBuser;
    console.log(emailVerified)
  }
  console.log(FBuser)
  console.log(user)
}

module.exports = checkActivation;
