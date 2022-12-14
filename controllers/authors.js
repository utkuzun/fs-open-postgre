const express = require('express')
const { fn, col } = require('sequelize')

const { Blog } = require('../models')

const router = express.Router()

router.get('/', async (req, res) => {
  const result = await Blog.findAll({
    group: 'author',
    attributes: [
      [fn('SUM', col('likes')), 'likes'],
      'author',
      [fn('COUNT', col('likes')), 'articles'],
    ],
    order: [['likes', 'DESC']],
  })

  return res.json({ result })
})

module.exports = router
