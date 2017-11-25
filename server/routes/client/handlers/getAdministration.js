const path = require('path')

function getArticle (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
}

module.exports = getArticle
