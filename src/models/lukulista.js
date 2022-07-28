import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'

class Lukulista extends Model {}

Lukulista.init({  
  id: {    
    type: DataTypes.INTEGER,    
    primaryKey: true,    
    autoIncrement: true  
  },  
  luettu: {    
    type: DataTypes.BOOLEAN,      
    defaultValue: false
  },  
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'blogs', key: 'id' },
  },

}, {  
  sequelize,  
  underscored: true,  
  timestamps: false,
  modelName: 'lukulista'
})


export default Lukulista