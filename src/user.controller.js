import User from './user.model'
import {
  userExists,
  encryptUserPassword,
  checkPassword,
  generateToken
} from './user.utils'

export const userLoginController = async (req, res, next) => {
  const { username, password: inputPassword } = req.body
  if (!username || !inputPassword) res.status(400).json({ success: false, error: 'Username or Passowrd not given' })
  const userFound = await userExists(username)
  if (!userFound) res.status(400).json({ success: false, error: 'User does not exist' })
  const { password: hash } = userFound
  if (!checkPassword(inputPassword, hash)) res.status(400).json({ success: false, error: 'Password does not match' })
  const userToken = generateToken(userFound.id)
  res.status(200).json({ success: true, data: { token: userToken }, message: 'User Logged in successfully' })
}

export const userSignupController = async (req, res, next) => {
  const {
    username = '', email = '', password = '', firstName = '', lastName = ''
  } = req.body
  if (!username) return res.status(400).json({ success: false, error: 'Check if all the data required are there' })
  if (!email) return res.status(400).json({ success: false, error: 'Check if all the data required are there' })
  if (!password) return res.status(400).json({ success: false, error: 'Check if all the data required are there' })

  const userFound = await userExists(username)
  if (userFound) res.status(400).send({ success: false, error: 'user already exists' })

  const newUser = new User({
    username,
    email,
    firstName,
    lastName,
    password: encryptUserPassword(password)
  })

  await newUser
    .save()
    .then(() => {
      const token = generateToken(newUser.id)
      res.status(200).json({ success: true, data: { user: newUser, token }, message: 'User created successfully!' })
    })
    .catch((e) => res.status(400).json({ success: false, error: e.message }))
}


export const getUsers = async (req, res, next) => {
  await User.find({})
    .then((users) => {
      res.status(200).json({ success: true, data: { users } })
    })
    .catch((e) => {
      res.status(400).json({ success: false, error: e.message })
    })
}

export const getUser = async (req, res, next) => {
  console.log(req.headers.authorization)
  const { username } = req.params
  await User.findOne({ username })
    .then((user) => {
      res.status(200).json({ success: true, data: { user } })
    })
    .catch((e) => {
      res.status(404).json({ success: false, message: 'user not found' })
      next(e)
    })
}
