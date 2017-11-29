const User = require('../../../models/User')
const moment = require('moment')

function userDashboard (req, res) {
  User.find()
  .then(users => {
    const json = {}
    json.recentUsers = users.filter(user => {
      let timeSinzeRegistration = moment(user.date_of_creation, 'DD-MM-YYYY, HH:mm:ss').fromNow().split(' ')
      if (timeSinzeRegistration.includes('seconds') || timeSinzeRegistration.includes('minutes') || timeSinzeRegistration.includes('hour') || timeSinzeRegistration.includes('hours')) {
        return true
      } else if (timeSinzeRegistration.includes('day')) {
        if (timeSinzeRegistration[0] === 'a') {
          return true
        }
      } else if (timeSinzeRegistration.includes('days')) {
        return (parseInt(timeSinzeRegistration[0]) <= 7)
      }
    }).length
    json.totalUsers = users.length
    json.totalAdmins = (users.filter(user => user.user_type === 1)).length
    json.userList = users
    res.status(200).json(json)
  })
}

module.exports = userDashboard
