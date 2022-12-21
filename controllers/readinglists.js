const express = require('express')
const { CustomApiError } = require('../error/CustomApiError')

const { UserNotes } = require('../models')
const { authenticate } = require('../utils/middleware')

const router = express.Router()

router.post('/', authenticate, async (req, res) => {
  console.log(req.user.userId, req.body.userId)
  if (req.user.userId !== Number(req.body.userId)) {
    throw new CustomApiError('Unauthorized!!', 403)
  }

  const readinglist = await UserNotes.create(req.body)
  return res.status(201).json(readinglist.toJSON())
})

router.put('/:id', async (req, res) => {
  await UserNotes.update(req.body, {
    where: { id: req.params.id },
  })

  res.status(200).end()
})

module.exports = router
