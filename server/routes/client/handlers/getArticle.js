const Article = require('../../../models/Article')
const Coment = require('../../../models/Coment')
const User = require('../../../models/User')
const getUserData = require('./getUserData')

function getArticle (req, res) {
    const userData = req.user
    const {id} = req.params
    Article.find({_id: id})
    .then(article => User.populate(article, {path: 'author'}, function (err, article) {
        if (err) res.status(400).json(err)
        Coment.find({article: id})
        .then(coments => User.populate(coments, {path: 'author'}, function (err, coments) {
            if (err) res.status(400).json(err)
            res.status(200).json({
                data: {
                    ...article[0]._doc,
                    coments
                },
                msg: 'Featured articles fetch success'
            })
        }))
    }))
}

module.exports = getArticle
