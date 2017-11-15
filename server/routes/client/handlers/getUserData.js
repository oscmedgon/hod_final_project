function getUserData (data) {
  if (data && data.username) {
    return data
  } else {
    return null
  }
}

module.exports = getUserData
