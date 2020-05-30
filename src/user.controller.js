import User from './user.model'
import {
  userExists,
  encryptUserPassword,
  checkPassword,
  generateToken
} from './user.utils'

export const userLoginController = async (req, res, next) => {
  const { username, password: inputPassword } = req.body
  if (!username || !inputPassword) res.status(400).send({ success: false, error: 'Username or Passowrd not given' })
  const userFound = await userExists(username)
  if (!userFound) res.status(400).send({ success: false, error: 'User does not exist' })
  const { password: hash } = userFound
  if (!checkPassword(inputPassword, hash)) res.status(400).send({ success: false, error: 'Password does not match' })
  const userToken = generateToken(userFound.id)
  res.status(200).json({ success: true, data: { token: userToken }, message: 'User Logged in successfully' })
}

export const userSignupController = async (req, res, next) => {
  const {
    username = '', email = '', password = '', firstName = '', lastName = ''
  } = req.body
  if (!username) return res.status(400).send({ success: false, error: 'Check if all the data required are there' })
  if (!email) return res.status(400).send({ success: false, error: 'Check if all the data required are there' })
  if (!password) return res.status(400).send({ success: false, error: 'Check if all the data required are there' })

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
    .catch((e) => res.status(400).send({ success: false, error: e.message }))
}
