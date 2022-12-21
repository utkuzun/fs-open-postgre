const express = require('express')
const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../utils/config')

const { CustomApiError } = require('../error/CustomApiError')
const { User } = require('../models/User')

const router = express.Router()

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    throw new CustomApiError('Please provide a username and a password!!', 401)
  }

  const user = await User.findOne({
    where: {
      username,
    },
  })

  if (!user) {
    throw new CustomApiError('User not found!!', 404)
  }

  const passMatch = await user.verifyPassword(password)

  if (!passMatch) {
    throw new CustomApiError('Invalid credentials!!', 404)
  }

  if (user.disabled) {
    throw new CustomApiError('This user is disabled!!', 403)
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, JWT_SECRET)

  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = router
