const express = require('express')
const { CustomApiError } = require('../error/CustomApiError')
const { Blog } = require('../models')

const router = express.Router()

const blogFinder = async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id)

  if (!blog) {
    throw new CustomApiError('Blog cannot be found!!', 404)
  }

  req.blog = blog
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  return res.status(200).json(blogs.map((item) => item.toJSON()))
})

router.post('/', async (req, res) => {
  const newBlog = await Blog.create(req.body)
  return res.status(201).json(newBlog.toJSON())
})

router.get('/:id', blogFinder, (req, res) => {
  const { blog } = req
  return res.json({ blog: blog.toJSON() })
})

router.delete('/:id', blogFinder, async (req, res) => {
  const { blog } = req

  await blog.destroy()
  return res.status(204).send()
})

module.exports = router
