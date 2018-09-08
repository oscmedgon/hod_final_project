const express = require('express');
const firebase = require('firebase');

const getFeturedArticles = require('./handlers/getFeturedArticles');
const getCategoryArticles = require('./handlers/getCategoryArticles');
const getArticle = require('./handlers/getArticle');
const getUserProfile = require('./handlers/getUserProfile');
const getModifyForm = require('./handlers/getModifyForm');
const getAdministration = require('./handlers/getAdministration');
const activateAcount = require('./handlers/activateAcount');
const getComentsForArticle = require('./handlers/getComentsForArticle');

const router = express.Router();

router.get('/articles', getFeturedArticles);
router.get('/articles/:category', getCategoryArticles);
router.get('/article/coments/:id', getComentsForArticle)
router.get('/article/:id', getArticle);
router.get('/user/:id', getUserProfile);
router.get('/user/:id/modify', getModifyForm);
router.get('/administration*$', getAdministration);
router.get('/administration/*$', getAdministration);
router.get('/activate/:token', activateAcount);
router.get('/login', (req, res) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('login', {title: 'Iniciar sesión'});
  }
});

router.get('/logout', (req, res) => {
  firebase.auth().signOut().then(function () {
    res.clearCookie('user');
    res.redirect('/');
  });
});
module.exports = router;
