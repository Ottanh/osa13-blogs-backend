import express from 'express'
const router = express.Router()
import User from '../models/user.js'
import Blog from '../models/blog.js'
import { Op } from 'sequelize'
import { userExtractor, serverSession } from '../util/middleware.js'


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

router.post('/', userExtractor, serverSession, async (req, res) => {
  const user = req.user
  const note = await Blog.create({ ...req.body, userId: user.id })
  res.json(note)
})

router.delete('/:id', userExtractor, serverSession, async (req, res) => {
  const user = req.user
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