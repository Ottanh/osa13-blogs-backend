import express  from 'express'
import 'express-async-errors'
import { PORT } from './util/config.js'
import { connectToDatabase } from './util/db.js'
import blogsRouter from './controllers/blogs.js'
import userRouter from './controllers/user.js'
import loginRouter from './controllers/login.js'
import authorRouter from './controllers/author.js'
import errorHandler from './util/errorHandler.js'
import './models/index.js'

const app = express()

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/author', authorRouter)

app.use(errorHandler)

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start();