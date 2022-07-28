import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { SECRET } from './config.js'

export const userExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
    req.user = await User.findByPk(req.decodedToken.id)
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

export const serverSession = async (req, res, next) => {
  const authorization = req.get('authorization')
  const tokens = (await User.getTokens(req.user.id)).dataValues.tokens

  if(!tokens.includes(authorization.substring(7))){
    return res.status(401).json({ error: 'invalid session' })
  }
  next()
}

