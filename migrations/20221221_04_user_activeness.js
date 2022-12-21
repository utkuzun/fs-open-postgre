const { DataTypes, fn, UUIDV4 } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'disabled', {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    })

    await queryInterface.createTable('block_token', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      token: {
        type: DataTypes.STRING,
        unique: true,
      },
    })

    await queryInterface.createTable('sessions', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      session_id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      login_time: {
        type: DataTypes.DATE,
        defaultValue: fn('NOW'),
      },
      logout_time: {
        type: DataTypes.DATE,
      },
    })
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'disabled')
    await queryInterface.dropTable('block_token')
    await queryInterface.dropTable('sessions')
  },
}
