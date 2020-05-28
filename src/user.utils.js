/* eslint-disable no-useless-catch */
import User from './user.model'

const userExists = (user) => {
  const { username, email } = user
  console.log({ username, email })
  User.findOne({ username, email })
    .lean()
    .exec()
    .then((user) => {
      if (user) {
        return 1
      }
      return 0
    })
    .catch((e) => { throw (e) })
}

module.exports = {
  userExists
}
