const express = require('express')
const { CustomApiError } = require('../error/CustomApiError')

const { User, Blog } = require('../models')

const router = express.Router()

const userFinder = async (req, res, next) => {
  const user = await User.findOne({
    where: { username: req.params.username },
  })

  if (!user) {
    throw new CustomApiError('User can not be found!!', 404)
  }

  req.user = user
  next()
}

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: ['url', 'id', 'author', 'title'],
    },
  })
  return res.status(200).json(users.map((user) => user.toJSON()))
})

router.post('/', async (req, res) => {
  const newUser = await User.create(req.body)
  return res.status(201).json(newUser.toJSON())
})

router.put('/:username', userFinder, async (req, res) => {
  await User.update(req.body, {
    where: {
      username: req.user.username,
    },
  })

  return res.status(200).end()
})

module.exports = router
