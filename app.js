require('dotenv').config()
const express = require('express')

const app = express()

const PORT = process.env.PORT || 3000

const main = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()
