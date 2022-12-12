require('dotenv').config()

const DATABASE_URI = process.env.FLY_POSTGRE_URL
const PORT = process.env.PORT || 3000

module.exports = { DATABASE_URI, PORT }
