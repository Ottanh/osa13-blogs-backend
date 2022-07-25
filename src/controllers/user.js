import express from 'express'
import Blog from '../models/blog.js'
const router = express.Router()
import User from '../models/user.js'

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {      
      model: Blog  
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: {      
      model: Blog  
    }
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:id', async (req, res) => {
  const user = await User.findOne({ username: req.params.username })
  if (user) {
    user.username = req.body.username
    const updatedUser = await user.save()
    res.json(updatedUser)
  } else {
    res.status(404).end()
  }
})

export default router