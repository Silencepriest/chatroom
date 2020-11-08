import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: [String],
      default: ['user']
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamp: true
  }
)

// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = bcrypt.hashSync(this.password)
  return next()
})

userSchema.method({
  passwordMatches(password) {
    return bcrypt.compareSync(password, this.password)
  }
})

userSchema.statics = {
  async findAndValidateUser({ username, password }) {
    if (!username) {
      throw Error('No Username')
    }
    if (!password) {
      throw Error('No password')
    }
    const user = await this.findOne({ username }).exec()
    if (!user) {
      throw Error('No user found')
    }
    const isPasswordOk = await user.passwordMatches(password)
    if (!isPasswordOk) {
      throw Error('Password Incorrect')
    }
    return user
  }
}

export default mongoose.model('users', userSchema)
