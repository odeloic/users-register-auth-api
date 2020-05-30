import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  }
})

module.exports = mongoose.model('user', userSchema)
