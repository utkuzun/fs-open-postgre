const express = require('express')

const { User } = require('../models/User')

const router = express.Router()

router.get('/', async (req, res) => {
  const users = await User.findAll()
  return res.status(200).json(users.map((user) => user.toJSON()))
})

router.post('/', async (req, res) => {
  const newUser = await User.create(req.body)
  return res.status(201).json(newUser.toJSON())
})

module.exports = router
