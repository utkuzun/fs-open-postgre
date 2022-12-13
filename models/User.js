const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../utils/db')
const bcrypt = require('bcrypt')

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Username must be in email format!!',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'user',
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
      },
    },
    modelMethods: {
      verifyPassword: async function (password) {
        return await bcrypt.compare(password, this.password)
      },
    },
    defaultScope: {
      attributes: {
        exclude: ['password'],
      },
    },
  }
)

module.exports = { User }
