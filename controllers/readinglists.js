const express = require('express')
// const { CustomApiError } = require('../error/CustomApiError')

const { UserNotes } = require('../models')
const { authenticate } = require('../utils/middleware')

const router = express.Router()

router.post('/', authenticate, async (req, res) => {
  const readinglist = await UserNotes.create(req.body)
  return res.status(201).json(readinglist.toJSON())
})

module.exports = router
