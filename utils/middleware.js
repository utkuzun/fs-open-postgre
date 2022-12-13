const { CustomApiError } = require('../error/CustomApiError')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./config')

const { User } = require('../models')

const notFound = (req, res) => {
  return res.status(404).json({ error: `${req.url} not found` })
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, _next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    message: err.message || 'Internal server error',
  }

  return res
    .status(customError.statusCode)
    .json({ message: customError.message })
}

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization

  if (!token || !token.toLowerCase().startsWith('bearer ')) {
    throw new CustomApiError('Invalid token!!', 403)
  }

  const userDecoded = jwt.verify(token.substring(7), JWT_SECRET)

  if (!userDecoded) {
    throw new CustomApiError('Invalid token!!', 403)
  }

  const { username, id: userId } = userDecoded

  const user = await User.findOne({
    where: {
      username,
    },
  })

  if (!user) {
    throw new CustomApiError('Invalid username!!', 403)
  }

  req.user = { username, userId }

  next()
}

module.exports = { notFound, errorHandler, authenticate }
