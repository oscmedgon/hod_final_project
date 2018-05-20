const {auth} = require('firebase');
const User = require('../../../models/User');

function registerUserOnFirebase (email, password) {
  return auth().createUserWithEmailAndPassword(email, password)
    .then(response => {
      const {uid} = response;
      User.findOneAndUpdate({email: email}, {firebase_id: uid})
        .then(() => {
          auth().signInWithEmailAndPassword(email, password)
            .then(response => {
              return response;
            });
        });
    });
}

module.exports = registerUserOnFirebase;
