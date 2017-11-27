const moment = require('moment')
const Article = require('../../../models/Article')
const User = require('../../../models/User')

function getDashboard (req, res) {
  const userInfo = getUserDashboard()
  const articleInfo = getArticleDashboard()
  Promise.all([userInfo, articleInfo])
    .then(data => res.status(200).send(data))
}
function getUserDashboard () {
  const data = []
  return User.find({}, {_id: 0})
  .then(response => {
    data.push({title: 'Total users', body: response.length})
    data.push({title: 'Total admin users', body: response.filter(user => user.user_type === 1).length})
    const recentUsers = response.filter(user => {
      let timeSinzeRegistration = moment(user.date_of_creation, 'DD-MM-YYYY, HH:mm:ss').fromNow().split(' ')
      console.log(timeSinzeRegistration)
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
    data.push({title: 'Registered users this week', body: recentUsers})
    return data
  })
}
function getArticleDashboard () {
  const data = []
  return Article.find({}, {_id: 0})
  .then(response => {
    data.push({title: 'Total articles', body: response.length})
    data.push({title: 'Total articles featured', body: response.filter(article => article.featured === true).length})
    const recentArticles = response.filter(article => {
      let timeSinzePublishing = moment(article.date_of_creation).fromNow().split(' ')
      if (timeSinzePublishing.includes('seconds') || timeSinzePublishing.includes('minutes') || timeSinzePublishing.includes('hour') || timeSinzePublishing.includes('hours')) {
        return true
      } else if (timeSinzePublishing.includes('day')) {
        if (timeSinzePublishing[0] === 'a') {
          return true
        }
      } else if (timeSinzePublishing.includes('days')) {
        return (parseInt(timeSinzePublishing[0]) <= 7)
      } else {
        return false
      }
    }).length
    data.push({title: 'Articles published in the last week: ', body: recentArticles})
    return data
  })
}

module.exports = getDashboard
