require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const { SELECT_ALL, CREATE_BLOGS } = require('./commands.sql')

const sequelize = new Sequelize(process.env.FLY_POSTGRE_URL)

const main = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.query(CREATE_BLOGS, { type: QueryTypes.CREATE })
    console.log('Connection establihed!!')
    const notes = await sequelize.query(SELECT_ALL, { type: QueryTypes.SELECT })
    notes.forEach((note) => {
      console.log(`${note.author}: "${note.title}", ${note.likes} likes`)
    })
    sequelize.close()
  } catch (error) {
    console.log(error)
  }
}

main()
