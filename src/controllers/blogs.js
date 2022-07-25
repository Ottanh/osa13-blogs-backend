import express from 'express'
const router = express.Router()
import User from '../models/user.js'
import Blog from '../models/blog.js'
import jwt  from 'jsonwebtoken'
import { Op } from 'sequelize'

const getTokenFrom = request => {  
  const authorization = request.get('authorization')  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {    
    return authorization.substring(7)  
  }  
  return null
}

router.get('/', async (req, res) => {
  const notes = await Blog.findAll({
    include: {      
      model: User
    },
    where: {
      [Op.or]: {
        title: {        
          [Op.substring]: req.query.search ? req.query.search : ''      
        },
        author: {
          [Op.substring]: req.query.search ? req.query.search : ''
        }
      }
    },
    order: [
      ['likes', 'DESC']
    ]
  })  
  res.json(notes)
})

router.post('/', async (req, res) => {
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)  
  if (!token || !decodedToken.id) {    
    return response.status(401).json({ error: 'token missing or invalid' })  
  }  
  const user = await User.findByPk(decodedToken.id)
  const note = await Blog.create({ ...req.body, userId: user.id })
  res.json(note)
})

router.delete('/:id', async (req, res) => {
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)  
  if (!token || !decodedToken.id) {    
    return response.status(401).json({ error: 'token missing or invalid' })  
  }  
  const user = await User.findByPk(decodedToken.id)
  const blog = await Blog.findByPk(req.params.id)

  if(blog && (user.id === blog.userId)) {
    await blog.destroy()
  }
  res.status(204).end()
})

router.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if(blog) {
    blog.likes = req.body.likes
    const updatedBlog = await blog.save()
    res.json(updatedBlog)
  }
})



export default router;