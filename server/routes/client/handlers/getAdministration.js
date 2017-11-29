const path = require('path')
function getArticle (req, res) {
  const administrationPath = path.join(global.__base, 'server/public/administration')
  res.sendFile(path.join(administrationPath, '/index.html'))
}

module.exports = getArticle
