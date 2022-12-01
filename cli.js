require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.FLY_POSTGRE_URL)

const query = 'SELECT * from blogs'

const main = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection establihed!!')
    const notes = await sequelize.query(query, { type: QueryTypes.SELECT })
    notes.forEach((note) => {
      console.log(`${note.author}: ${note.content}, ${note.likes} likes`)
    })
    sequelize.close()
  } catch (error) {
    console.log(error)
  }
}

main()
