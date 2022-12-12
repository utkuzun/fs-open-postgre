const express = require('express')
const { Blog } = require('../models')

const router = express.Router()

const blogFinder = async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id)
  req.blog = blog
  next()
}

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll()

    return res.status(200).json(blogs.map((item) => item.toJSON()))
  } catch (error) {
    console.log(error)
  }
})

router.post('/', async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body)
    return res.status(201).json(newBlog.toJSON())
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:id', blogFinder, async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (!blog) {
      return res.status(404).send('Blog can not be found!!')
    }

    await blog.destroy()
    return res.status(204).send()
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
