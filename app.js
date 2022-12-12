require('dotenv').config()
const { Sequelize, DataTypes, Model } = require('sequelize')
const express = require('express')

const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.FLY_POSTGRE_URL)

const PORT = process.env.PORT || 3000

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
  }
)

Blog.sync()

app.get('/', (req, res) => {
  try {
    console.log('entered api')
    return res.send('an api')
  } catch (error) {
    console.log(error)
  }
})

app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.findAll()

    return res.status(200).json(blogs.map((item) => item.toJSON()))
  } catch (error) {
    console.log(error)
  }
})

app.post('/api/blogs', async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body)
    return res.status(201).json(newBlog.toJSON())
  } catch (error) {
    console.log(error)
  }
})

app.delete('/api/blogs/:id', async (req, res) => {
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

const main = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection establihed!!')
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()
