import User from './user.model'

export const userLoginController = async (req, res, next) => {
  res.send({ message: 'NOT IMPLEMENTED: user log in' })
}

export const userSignupController = async (req, res, next) => {
  /**
   * Check if user exists
   * if user exists 400 -> Sorry, this spot is already taken!
   * Encrypt password
   * Then save the hashed password
   * When do we actually create the fucking jwt and how ?
   */
  const {
    username = '', email = '', password = '', firstName = '', lastName = ''
  } = req.body
  if (!username) return res.status(400).send({ error: 'Check if all the data required are there' })
  if (!email) return res.status(400).send({ error: 'Check if all the data required are there' })
  if (!password) return res.status(400).send({ error: 'Check if all the data required are there' })

  const newUser = new User({
    username,
    email,
    firstName,
    lastName,
    password
  })
  await User.findOne({ username, email })
    .then(async (user) => {
      if (user) res.status(400).send({ error: 'user already exists' })
      else {
        await newUser
          .save()
          .then(() => res.status(200).send(newUser))
          .catch((e) => res.status(400).send({ error: e.message }))
      }
    })
    .catch((e) => res.status(400).send({ error: e.message }))
}
