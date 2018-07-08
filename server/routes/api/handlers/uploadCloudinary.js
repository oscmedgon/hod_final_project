const cloudinary = require('cloudinary');
const del = require('del');
const path = require('path');

const uploadFolderPath = path.join(global.__base, process.env.UPLOAD_FOLDER);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

function uploadCloudinary (req, res) {
  console.log(req.file)
  if (req.file) {
    cloudinary.uploader.upload(req.file.path, ({ secure_url }) => {
      if (secure_url) {
        req.imageLink = secure_url;
        // delete files inside folder but not the folder itself
        del.sync([`${uploadFolderPath}/**`, `!${uploadFolderPath}`]);
      } else {
        res.status(404).send('Oh uh, something went wrong');
      }
    });
  } else if (req && req.body && req.body.image) {
    const {image} = req.body;
    cloudinary.uploader.upload(image, ({secure_url}) => {
      if (secure_url) {
        res.status(200).json({image: secure_url, status: 'ok'});
      } else {
        res.status(404).send('Oh uh, something went wrong');
      }
    });
  }
}

module.exports = uploadCloudinary;
