import User from '../models/user.js'
import Blog from '../models/blog.js'
import Lukulista from '../models/lukulista.js'

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Lukulista, as: 'readings' })
Blog.belongsToMany(User, { through: Lukulista, as: 'readings' })

