const Articles = require('../../../models/Article');
const User = require('../../../models/User');

async function getFeturedArticles (req, res) {
    const limit = 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page * limit) - limit;
    const userData = req.user;
    Articles.find({featured: true})
    .sort({date_of_creation: -1})
    .limit(limit)
    .skip(skip)
    .then(articles => User.populate(articles, {path: 'author'}, function (err, articles) {
        const response = articles.map(article => {
            article.body = article.body.split('<p>&nbsp;</p>')[0];
            return article;
        });
        res.status(200).json({
            data: response,
            msg: 'Featured articles fetch success'
        })
    }))
    .catch(err => {
        res.status(500).json(err)
    })
}

module.exports = getFeturedArticles;
