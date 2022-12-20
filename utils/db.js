const { Sequelize } = require('sequelize')
const { Umzug, SequelizeStorage } = require('umzug')

const { DATABASE_URI } = require('./config')

const sequelize = new Sequelize(DATABASE_URI)

const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}
const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}

const connectDB = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('DB is connected!!')
  } catch (error) {
    console.log(error)
    console.log('Failed to connect to the database...')
    return process.exit(1)
  }

  return null
}

module.exports = { sequelize, connectDB, rollbackMigration }
