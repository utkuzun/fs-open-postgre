const { Model, DataTypes, fn, UUIDV4 } = require('sequelize')
const { sequelize } = require('../utils/db')

class Session extends Model {}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sessionId: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    loginTime: {
      type: DataTypes.DATE,
      defaultValue: fn('NOW'),
    },
    logoutTime: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'session',
  }
)

module.exports = { Session }
