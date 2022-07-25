const errorHandler = (error, request, response, next) => {
  if (error.message === 'Validation error: Validation isEmail on username failed') {
    console.log(error.message)
    return response.status(400).json({ error: 'Username must a valid email' })
  } else if (error) {
    console.log(error.message)
    return response.status(400).json({ error })
  } 
  next()
}

export default errorHandler;