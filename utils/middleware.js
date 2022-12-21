const { CustomApiError } = require('../error/CustomApiError')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./config')

const { User, Blog, Session, BlockToken } = require('../models')

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

const blogFinder = async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id, {
    include: {
      model: User,
      attributes: { exclude: ['password'] },
    },
  })

  if (!blog) {
    throw new CustomApiError('Blog cannot be found!!', 404)
  }

  req.blog = blog
  next()
}

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization

  if (!token || !token.toLowerCase().startsWith('bearer ')) {
    throw new CustomApiError('Invalid token!!', 403)
  }

  const isBlocked = await BlockToken.findOne({
    where: { token: token.substring(7) },
  })

  if (isBlocked) {
    throw new CustomApiError('This token is revoked!!', 403)
  }

  const userDecoded = jwt.verify(token.substring(7), JWT_SECRET)

  if (!userDecoded) {
    throw new CustomApiError('Invalid token!!', 403)
  }

  const { username, id: userId, sessionId } = userDecoded

  const user = await User.findOne({
    where: {
      username,
    },
  })

  if (!user) {
    throw new CustomApiError('Invalid username!!', 403)
  }

  const currentSession = await Session.findByPk(sessionId, {
    include: { model: User, attributes: ['id'] },
  })

  if (currentSession.logoutTime) {
    throw new CustomApiError('Your session is expired!!', 403)
  }

  req.user = {
    username,
    userId,
    userToken: token.substring(7),
    sessionId: currentSession.id,
  }

  next()
}

module.exports = { notFound, errorHandler, authenticate, blogFinder }
