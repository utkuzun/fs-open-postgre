const express = require('express')
const { Op } = require('sequelize')

const { CustomApiError } = require('../error/CustomApiError')
const { Blog, User } = require('../models')
const { authenticate, blogFinder } = require('../utils/middleware')

const router = express.Router()

router.get('/', async (req, res) => {
  let where = {}

  const { search } = req.query

  if (search) {
    where = {
      ...where,
      [Op.or]: {
        title: { [Op.substring]: search.toLowerCase() },
        author: { [Op.substring]: search.toLowerCase() },
      },
    }
  }

  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: ['name', 'id'],
    },
    attributes: { exclude: ['userId'] },
    where,
    order: [['likes', 'DESC']],
  })
  return res.status(200).json(blogs.map((item) => item.toJSON()))
})

router.post('/', authenticate, async (req, res) => {
  const { userId } = req.user

  const newBlog = await Blog.create({ ...req.body, userId })
  return res.status(201).json(newBlog.toJSON())
})

router.get('/:id', blogFinder, (req, res) => {
  const { blog } = req
  return res.json({ blog: blog.toJSON() })
})

router.put('/:id', blogFinder, async (req, res) => {
  const updatedBlog = await Blog.update(req.body, {
    where: {
      id: req.blog.id,
    },
  })

  return res.status(203).json({ blog: updatedBlog })
})

router.delete('/:id', authenticate, blogFinder, async (req, res) => {
  const { blog } = req
  const { userId } = req.user

  if (userId !== blog.userId) {
    throw new CustomApiError('Not authorized!!', 403)
  }

  await blog.destroy()
  return res.status(204).send()
})

module.exports = router
