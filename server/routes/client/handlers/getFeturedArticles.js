const Articles = require('../../../models/Article');
const User = require('../../../models/User');
const getUserData = require('./getUserData');
async function getFeturedArticles (req, res) {
  const limit = 5;
  const page = parseInt(req.query.page) || 1;
  const skip = (page * limit) - limit;
  const userData = await getUserData(req.cookies.user);
  Articles.find({featured: true})
    .sort({date_of_creation: -1})
    .limit(5)
    .skip(skip)
    .then(articles => User.populate(articles, {path: 'author'}, function (err, articles) {
      articles.map(article => {
        article.body = article.body.split('<p>&nbsp;</p>')[0];
        return article;
      });
      if (err) res.redirect('/');
      res.render('index', {baseUrl: '/?page=', page: page, sectionTitle: 'destacados', userData, featuredArticle: articles[0], articles: articles.slice(1)});
    })
    );
}

module.exports = getFeturedArticles;
