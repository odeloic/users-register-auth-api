import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRouter from './user.route'
import { verifyToken } from './user.utils'
import User from './user.model'

const app = express()
const dbUrl = 'mongodb://localhost:27017/new-users-api-db'

const protectRoute = async (req, res, next) => {
  const bearer = req.headers.authorization
  if (!bearer || !bearer.startsWith('Bearer ')) res.status(404).end({ success: false, message: 'Not Authorized' })
  const [str, token] = bearer.split('Bearer ')
  const { id } = verifyToken(token)
  if (!id) res.status(401).send({ success: false, message: 'Not Authorized' })
  const user = await User.findById(id)
  if (!user) res.status(401).send({ success: false, message: 'Not Authorized' })
  req.user = user
  next()
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect(dbUrl, { useNewUrlParser: true })
  .then(() => console.log('Database connected'))
  .catch((e) => console.log(`error: ${e.message}`))

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Gunna Gunna!!' })
})

app.use('/user', userRouter)
// app.get('/test-auth', protectRoute, (req, res, next) => {
//   console.log
//   res.send()
// })

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`server running @ ${port}`)
})
