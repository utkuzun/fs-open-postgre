const { Sequelize } = require('sequelize')

const { DATABASE_URI } = require('./config')

const sequelize = new Sequelize(DATABASE_URI)

const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('DB is connected!!')
  } catch (error) {
    console.log('failed to connect to the database')
    return process.exit(1)
  }

  return null
}

module.exports = { sequelize, connectDB }
