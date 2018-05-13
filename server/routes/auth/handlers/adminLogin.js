const jwt = require('jsonwebtoken');
const {auth} = require('firebase');

const checkUserOnDatabase = require('./checkUserOnDatabase');
const registerUserOnFirebase = require('./registerUserOnFirebase');

const { SECRET } = process.env;

function userLogin (req, res) {
  const {email, password} = req.body;
  auth().signInWithEmailAndPassword(email, password)
    .then(async response => {
      const {_id} = await checkUserOnDatabase(email);
      const token = jwt.sign({ _id }, SECRET);
      res.status(200).json({token: token});
    }, async () => {
      const {_id} = await checkUserOnDatabase(email);
      registerUserOnFirebase(email, password)
        .then(response => {
          const token = jwt.sign({ _id }, SECRET);
          res.status(200).json({token: token});
        }, error => {
          res.status(403).json({msg: error});
        });
    });
}

module.exports = userLogin;
