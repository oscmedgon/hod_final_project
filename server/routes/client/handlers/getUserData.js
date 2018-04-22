const User = require('../../../models/User');

const checkActivation = require('./checkActivation')

async function getUserData (data) {
  let user = null;
  if (data) {
    const activarionState = await checkActivation(data);
    const id = data;
    const response = await User.findById(id);
    if (response) user = response;
  }
  return user;
}

module.exports = getUserData;
