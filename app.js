require('dotenv').config()
const express = require('express')

const { PORT } = require('./utils/config')

const { connectDB } = require('./utils/db')

const blogRouter = require('./controllers/blogs')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  try {
    console.log('entered api')
    return res.send('an api')
  } catch (error) {
    console.log(error)
  }
})

app.use('/api/blogs', blogRouter)

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
