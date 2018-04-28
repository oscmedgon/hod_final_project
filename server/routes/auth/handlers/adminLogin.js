const jwt = require('jsonwebtoken');
const {auth} = require('firebase');

const checkUserOnDatabase = require('./checkUserOnDatabase');
const registerUserOnFirebase = require('./registerUserOnFirebase');

const { SECRET } = process.env;

function userLogin (req, res) {
  const {email, password} = req.body;
  auth().signInWithEmailAndPassword(email, password)
    .then(response => {
      const {uid} = response;
      const token = jwt.sign({ uid }, SECRET);
      res.status(200).json({token: token});
    }, async () => {
      await checkUserOnDatabase(email);
      registerUserOnFirebase(email, password)
        .then(response => {
          const {uid} = response;
          const token = jwt.sign({ uid }, SECRET);
          res.status(200).json({token: token});
        }, error => {
          res.status(403).json({msg: error});
        });
    });
}

module.exports = userLogin;
