require('dotenv').config()
const express = require('express')
const app = express()
require('express-async-errors')

const { notFound, errorHandler } = require('./utils/middleware')

const { PORT } = require('./utils/config')

const { connectDB } = require('./utils/db')

const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const authRouter = require('./controllers/auth')
const authorsRouter = require('./controllers/authors')
const readingListsRoter = require('./controllers/readinglists')

app.use(express.json())

app.get('/', (req, res) => {
  console.log('entered api')
  return res.send('an api')
})

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/auth', authRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/readinglists', readingListsRoter)

app.use(notFound)
app.use(errorHandler)

const main = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()
