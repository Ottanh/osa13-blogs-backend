import User from '../models/user.js'
import Blog from '../models/blog.js'

User.hasMany(Blog)
Blog.belongsTo(User)

Blog.sync({ alter: true })
User.sync({ alter: true })



