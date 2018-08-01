const User = require('../models/User');
const jwt = require('jsonwebtoken');

const { SECRET } = process.env;

async function tokenParser (req, res, next) {
    console.log(req.headers.authorization)
    console.log(req && req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'bearer' && req.headers.authorization.split(' ')[1] !== 'null')
    if (req && req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'bearer' && req.headers.authorization.split(' ')[1] !== 'null') {
        const token = await req.headers.authorization.split(' ')[1];
        console.log('tokeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeen parser')
        console.log(token)
        const {_id} = await jwt.verify(token, SECRET);
        console.log(_id)
        await User.findById(_id)
        .then((response) => {
            req.user = response;
        }, (error) => {
            req.user = undefined
        });
    } else {
        req.user = undefined
    }
    next();
}

module.exports = tokenParser;
