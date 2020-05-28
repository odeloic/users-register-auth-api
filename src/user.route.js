import express from 'express'
import { userLoginController, userSignupController } from './user.controller'

const userRouter = express.Router()

userRouter.post('/login', userLoginController)
userRouter.post('/new', userSignupController)

module.exports = userRouter
