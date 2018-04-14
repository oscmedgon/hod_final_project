const {auth} = require('firebase');
const User = require('../../../models/User');

function userLogin (req, res) {
  const {email, password} = req.body;
  auth().signInWithEmailAndPassword(email, password)
    .then(response => {
      res.status(200).json({msg: `Login sucess, a email validation link was sent to ${email}`});
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
