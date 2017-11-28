const express = require('express')
const userModifyAvatar = require('./handlers/userModifyAvatar')
const userModifyData = require('./handlers/userModifyData')
const getUsersAllUsers = require('./handlers/getUsersAllUsers')
const getUsersAllAdministrators = require('./handlers/getUsersAllAdministrators')
const getAllArticles = require('./handlers/getAllArticles')
const getFeaturedArticles = require('./handlers/getFeaturedArticles')
const getAtriclesByCategory = require('./handlers/getAtriclesByCategory')
const getDashboard = require('./handlers/getDashboard')
const userDashboard = require('./handlers/userDashboard')
const articleDashboard = require('./handlers/articleDashboard')
const newArticle = require('./handlers/newArticle')
const removeArticle = require('./handlers/removeArticle')

// Requiring dependencies
const path = require('path')
const getArticleToModify = require('./handlers/getArticleToModify')
const modifyArticle = require('./handlers/modifyArticle')
const multer = require('multer')

// Loading cloudinary configuration
const uploadCloudinary = require('./handlers/uploadCloudinary')
const uploadFolderPath = path.join(global.__base, process.env.UPLOAD_FOLDER)
console.log(uploadFolderPath)
const upload = multer({
  dest: uploadFolderPath
})

const router = express.Router()

router.get('/api/users/', getUsersAllUsers)
router.get('/api/users/admin', getUsersAllAdministrators)
router.get('/api/articles/', getAllArticles)
router.get('/api/articles/featured', getFeaturedArticles)
router.get('/api/articles/:category', getAtriclesByCategory)
router.get('/api/dashboard', getDashboard)
router.get('/api/dashboard/user', userDashboard)
router.get('/api/dashboard/article', articleDashboard)
router.get('/api/article/:id', getArticleToModify)
router.post('/api/article/new', newArticle)
router.post('/user/:id/modify/avatar', upload.single('file'), uploadCloudinary, userModifyAvatar)
router.post('/user/:id/modify/data', userModifyData)
router.delete('/api/article/:id/remove', removeArticle)
router.put('/api/article/:id/modify', modifyArticle)
router.post('/api/upload', upload.single('file'), uploadCloudinary, (req, res) => {
  const { imageLink } = req
  res.status(200).json({ imageLink })
})

module.exports = router
