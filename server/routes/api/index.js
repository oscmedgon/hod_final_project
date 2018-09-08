const express = require('express');
const userModifyAvatar = require('./handlers/userModifyAvatar');
const userModifyData = require('./handlers/userModifyData');
const getUsersAllUsers = require('./handlers/getUsersAllUsers');
const getUsersAllAdministrators = require('./handlers/getUsersAllAdministrators');
const getAllArticles = require('./handlers/getAllArticles');
const getFeaturedArticles = require('./handlers/getFeaturedArticles');
const getAtriclesByCategory = require('./handlers/getAtriclesByCategory');
const getDashboard = require('./handlers/getDashboard');
const userDashboard = require('./handlers/userDashboard');
const articleDashboard = require('./handlers/articleDashboard');
const newArticle = require('./handlers/newArticle');
const removeArticle = require('./handlers/removeArticle');

const verifyDiscordLink = require('./handlers/verifyDiscordLink');
const signDiscordLink = require('./handlers/signDiscordLink');
const discordLink = require('./handlers/discordLink');

const newComent = require('./handlers/newComent');

// Requiring dependencies
const path = require('path');
const getArticleToModify = require('./handlers/getArticleToModify');
const modifyArticle = require('./handlers/modifyArticle');
const multer = require('multer');

// Loading cloudinary configuration
const uploadCloudinary = require('./handlers/uploadCloudinary');
const uploadFolderPath = path.join(global.__base, process.env.UPLOAD_FOLDER);
const upload = multer({
  dest: uploadFolderPath
});

const router = express.Router();
// User coments
router.post('/coment/add', newComent);

// Discord Link
router.get('/api/discord/:token', verifyDiscordLink);
router.post('/api/discord/sign', signDiscordLink);
router.post('/api/discord/link', discordLink);

// Webpage API
router.get('/api/users/', getUsersAllUsers);
router.get('/api/users/admin', getUsersAllAdministrators);
router.get('/api/articles/', getAllArticles);
router.get('/api/articles/featured', getFeaturedArticles);
router.get('/api/articles/:category', getAtriclesByCategory);
router.get('/api/dashboard', getDashboard);
router.get('/api/dashboard/user', userDashboard);
router.get('/api/dashboard/article', articleDashboard);
router.post('/user/:id/modify/avatar', upload.single('file'), uploadCloudinary, userModifyAvatar);
router.post('/user/:id/modify/data', userModifyData);
router.delete('/api/article/:id/remove', removeArticle);
router.put('/api/article/:id/modify', modifyArticle);
router.post('/api/upload', upload.single('file'), uploadCloudinary);

router.get('/api/article/:id', getArticleToModify);
router.post('/api/article/new', newArticle);

module.exports = router;
