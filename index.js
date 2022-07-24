import dotenv from 'dotenv';
dotenv.config();

import { Sequelize, Model, DataTypes } from 'sequelize';
import express  from 'express';

const app = express()
app.use(express.json())


const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

class Blog extends Model {}
Blog.init({  
  id: {    
    type: DataTypes.INTEGER,    
    primaryKey: true,    
    autoIncrement: true  
  },  
  author: {    
    type: DataTypes.TEXT,      
  },  
  url: {    
    type: DataTypes.TEXT,
    allowNull: false 
  },  
  title: {    
    type: DataTypes.TEXT,
    allowNull: false 
  },
  likes: {    
    type: DataTypes.INTEGER,
    defaultValue: 0 
  }
}, {  
  sequelize,  
  underscored: true,  
  timestamps: false,  
  modelName: 'blog'
})

app.get('/api/blogs', async (_req, res) => {
  const notes = await Blog.findAll()  
  res.json(notes)
})

app.post('/api/blogs', async (req, res) => {
  console.log(req.body)
  try {
    const note = await Blog.create(req.body)
    res.json(note)
  } catch {

  }
})

app.delete('/api/blogs/:id', async (request, response) => {
  const blog = await Blog.findByPk(request.params.id)
  await blog.destroy()
  response.status(204).end()
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})