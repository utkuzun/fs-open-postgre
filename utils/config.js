require('dotenv').config()

const DATABASE_URI = process.env.FLY_POSTGRE_URL
const PORT = process.env.PORT || 3000
const JWT_SECRET = process.env.JWT_SECRET

module.exports = { DATABASE_URI, PORT, JWT_SECRET }
