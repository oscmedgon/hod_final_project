const User = require('../../../models/User');

async function getUserData (data) {
  let user = null;
  if (data) {
    const id = data;
    const response = await User.findById(id);
    if (response) user = response;
  }
  return user;
}

module.exports = getUserData;
