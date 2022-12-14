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
  }
)

User.prototype.verifyPassword = async function (password) {
  const match = await bcrypt.compare(password, this.password)
  return match
}

User.prototype.toJSON = function () {
  var values = Object.assign({}, this.get())

  delete values.password
  return values
}

module.exports = { User }
