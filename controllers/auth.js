const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const { User } = require('../models')
const bcrypt = require('bcrypt')

const register = async (req, res) => {

  const queryObject = {}
  const { username, email, password } = req.body

  if (password.startsWith(process.env.ADMIN_AUTH)) {
    queryObject.admin = true
  }
  queryObject.username = username
  queryObject.email = email
  const salt = await bcrypt.genSalt(10)
  queryObject.password = await bcrypt.hash(password, salt)

  const user = await User.create({ ...queryObject })

  res.status(StatusCodes.CREATED).json({ user: user.username, msg: 'New User Registered!'})
}

const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    throw new BadRequestError('Username and Password Required!')
  }

  const user = await User.findOne({where: {username}})
  console.log(user)
  if(!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  const passwordCorrect = await bcrypt.compare(password, user.password)
  if (!passwordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  
  res.status(StatusCodes.OK).json({user: user.username})
}

module.exports = { register, login }
