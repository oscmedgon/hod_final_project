const User = require('../../../models/User')

function userDashboard (req, res) {
  User.find()
  .then(users => {
    const json = {}
    json.totalUsers = users.length
    json.totalAdmins = (users.filter(user => user.user_type === 1)).length
    json.userList = users
    res.status(200).json(json)
  })
}

module.exports = userDashboard
