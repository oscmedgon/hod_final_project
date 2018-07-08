const User = require('../../../models/User');

function adminCheck (req, res) {
const user = req.cookies.user;
console.log(req.headers)

User.findById(user)
    .then((response) => {
        console.log(response)
        res.status(200).json(response)
    })
    .catch((error) => {
        console.log(error)
        res.status(400).json({err: error})
    })
}

module.exports = adminCheck;
