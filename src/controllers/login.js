import jwt from 'jsonwebtoken'
import express from 'express'
const router = express.Router()

import { SECRET } from '../util/config.js'
import User from '../models/user.js'
import { userExtractor } from '../util/middleware.js'

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'salainen'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  if (user.disabled === true) {
    return response.status(401).json({
      error: 'user is disabled'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }
  const token = jwt.sign(userForToken, SECRET)

  console.log(user.tokens)
  user.tokens = user.tokens ? [...user.tokens, token] : [token];
  console.log(user.tokens)
  await user.save();

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

router.delete('/', userExtractor, async (request, response) => {
  const user = request.user
  user.tokens = []
  await user.save()
  response.status(204).end()
})

export default router