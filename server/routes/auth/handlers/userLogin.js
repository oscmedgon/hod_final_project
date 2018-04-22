const {auth} = require('firebase');
const User = require('../../../models/User');

function userLogin (req, res) {
  const {email, password} = req.body;
  auth().signInWithEmailAndPassword(email, password)
    .then(response => {
      User.find({email: email})
        .then(query => {
          if (query.length === 1) {
            res.cookie('user', query[0].id, { maxAge: 900000, httpOnly: true });
            console.log(res.cookie);
            res.status(200).json({msg: `Login sucess`});
          }
        });
    }, () => {
      User.find({email: email})
        .then(response => {
          if (response.length && response[0].email === email) {
            console.log('Datos de usuario validados, registrando usuario');
            req.body.username = response.username;
            auth().createUserWithEmailAndPassword(email, password)
              .then(response => {
                const firebase_id = response.uid;
                User.findOneAndUpdate({email: email}, {$set: {firebase_id: firebase_id}})
                  .then(() => {
                    auth().signInWithEmailAndPassword(email, password);
                    res.status(200).json({msg: `Account migrated successfuly to firebase`});
                  });
              });
          }
        }, error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          res.status(400).json({msg: errorMessage});
        });
    }
    );
}

module.exports = userLogin;
