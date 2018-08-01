const jwt = require('jsonwebtoken');

const {auth} = require('firebase');
const User = require('../../../models/User');
const checkUserOnDatabase = require('./checkUserOnDatabase');
const { SECRET } = process.env;

function userLogin (req, res) {
    console.log(req.body)
    const {email, password} = req.body;
    auth().signInWithEmailAndPassword(email, password)
    .then((response) => {
        User.find({email: email})
        .then(async (query) => {
            if (query.length === 1) {
                const {_id} = await checkUserOnDatabase(email);
                const token = jwt.sign({ _id }, SECRET);
                res.status(200).json({
                    msg: `Login sucess`,
                    token: await token
                });
            }
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        res.status(400).json({msg: errorMessage});
        
    });
}

module.exports = userLogin;
