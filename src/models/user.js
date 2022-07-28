import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'
import Blog from './blog.js'

class User extends Model {
  static async getTokens(id) { 
    return await User.unscoped().findByPk(id, {
      attributes: ['tokens']
    })
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  disabled: {
    type: DataTypes.BOOLEAN,
    default: false
  },
  tokens: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'user',
  defaultScope: {
    attributes: { exclude: ['tokens'] }
  }
})



export default User