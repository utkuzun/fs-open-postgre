const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../utils/db')

class BlockToken extends Model {}

BlockToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    tableName: 'block_token',
  }
)

module.exports = { BlockToken }
