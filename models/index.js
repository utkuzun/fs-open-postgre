const { Blog } = require('./Blog')
const { User } = require('./User')
const { UserNotes } = require('./UserBlogs')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: UserNotes, as: 'readings' })
Blog.belongsToMany(User, { through: UserNotes, as: 'readinglists' })

module.exports = { Blog, User, UserNotes }
