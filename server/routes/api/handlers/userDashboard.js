const User = require('../../../models/User')
const moment = require('moment')

function userDashboard (req, res) {
  User.find()
  .then(users => {
    const json = {}
    json.recentUsers = users.filter(user => {
      let timeSinzeRegistration = moment(user.date_of_creation, 'DD-MM-YYYY, hh:mm:ss').fromNow().split(' ')[0]
      if (timeSinzeRegistration === 'a') timeSinzeRegistration = 1
      return (parseInt(timeSinzeRegistration) <= 7)
    }).length
    json.totalUsers = users.length
    json.totalAdmins = (users.filter(user => user.user_type === 1)).length
    json.userList = users
    console.log(json)
    res.status(200).json(json)
  })
}

module.exports = userDashboard
