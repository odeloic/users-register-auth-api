/* eslint-disable no-useless-catch */
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from './user.model'
import config from './config'


const userExists = async (username) => {
  try {
    const userFound = await User.findOne({ username }).exec()
    return userFound
  } catch (err) {
    throw err
  }
}

const encryptUserPassword = (plainPassword) => bcrypt.hashSync(plainPassword, config.saltRounds)

const checkPassword = (plainPassword, hash) => bcrypt.compareSync(plainPassword, hash)

const generateToken = (userId) => jwt.sign({ id: userId }, config.secret, { expiresIn: 60 * 60 })
const verifyToken = (token) => jwt.verify(token, config.secret)

export {
  userExists, encryptUserPassword, checkPassword, generateToken, verifyToken
}
