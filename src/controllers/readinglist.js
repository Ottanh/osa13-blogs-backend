import express from 'express'
const router = express.Router()
import Lukulista from '../models/lukulista.js'
import { serverSession, userExtractor } from '../util/middleware.js'

router.post('/', async (request, response) => {
  const readinglist = await Lukulista.create({ ...request.body })
  response.json(readinglist);
})

router.put('/:id', userExtractor, serverSession, async (req, res) => {
  const user = req.user
  const lukulista = await Lukulista.findByPk(req.params.id)
  if(lukulista && (lukulista.blogId === user.id)) {
    lukulista.luettu = req.body.luettu;
    const updatedBlog = await lukulista.save()
    res.json(updatedBlog)
  }
})


export default router