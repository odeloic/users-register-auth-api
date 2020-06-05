import express from 'express'
import {
  userLoginController, userSignupController, getUsers, getUser
} from './user.controller'

import { protectRoute } from './middlewares'

const userRouter = express.Router()

userRouter.post('/login', userLoginController)
userRouter.post('/new', userSignupController)
userRouter.get('/', getUsers)
userRouter.get('/:username', protectRoute, getUser)

module.exports = userRouter
