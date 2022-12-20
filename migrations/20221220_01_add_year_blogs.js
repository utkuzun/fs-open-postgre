const { DataTypes, fn } = require('sequelize')
const { CustomApiError } = require('../error/CustomApiError')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      defaultValue: fn('date_part', 'year', fn('NOW')),
      validate: {
        yearValidation(value) {
          const currentYear = new Date().getFullYear()
          if (value < 1991 || value > currentYear) {
            throw new CustomApiError(
              'year must be between 1991 and current year',
              401
            )
          }
        },
      },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
  },
}
