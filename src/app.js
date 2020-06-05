import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import userRouter from './user.route'
import { verifyToken } from './user.utils'
import User from './user.model'

const app = express()
const dbUrl = 'mongodb://localhost:27017/new-users-api-db'


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

mongoose.connect(dbUrl, { useNewUrlParser: true })
  .then(() => console.log('Database connected'))
  .catch((e) => console.log(`error: ${e.message}`))

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Gunna Gunna!!' })
})

app.use('/users', userRouter)
// app.get('/test-auth', protectRoute, (req, res, next) => {
//   console.log
//   res.send()
// })

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`server running @ ${port}`)
})
