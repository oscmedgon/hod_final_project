const Article = require('../../../models/Article')
const User = require('../../../models/User')
const moment = require('moment')

function newArticle (req, res) {
  const { title, category, featured, body } = req.body
  const date_of_creation = Date.now()
  const date_pretty = moment().format('DD-MM-YYYY, HH:mm:ss')
  const author = req.user._id
  const image = req.body.image || 'https://thumb1.shutterstock.com/display_pic_with_logo/1072949/278165597/stock-photo-stamp-default-in-red-over-white-background-278165597.jpg'
  const article = new Article({title, category, featured, body, date_of_creation, date_pretty, author, image})
  const {_id} = article
  article.save(article, err => {
    if (err) res.status(400).json({msg: 'Error creating article'})
    else {
      User.findByIdAndUpdate(author, {
        $addToSet: {'articles': {_id}}
      }, {'new': true})
      .then(res.status(200).json({msg: 'Article succesfully created!'}))
    }
  })
}

module.exports = newArticle
