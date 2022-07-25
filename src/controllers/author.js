import express from 'express'
const router = express.Router()
import Blog from '../models/blog.js'
import { Op } from 'sequelize'
import { sequelize } from '../util/db.js'

router.get('/', async (req, res) => {
  const notes = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('likes')), 'likes'],
      [sequelize.fn('count', sequelize.col('author')), 'blogs']
    ],
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
    group : ['author']
  })  
  res.json(notes)
})

export default router