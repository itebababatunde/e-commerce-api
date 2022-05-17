import dotenv from 'dotenv'
dotenv.config()
const NODE_ENV = process.env.NODE_ENV

const DEVELOPMENT = 'development'

const errorMiddleWare = async (error, req, res, next) => {
  const body = {}
  body.status = 'error'
  body.message = error.message

  // if (NODE_ENV === DEVELOPMENT) {
  //   body.error = error.stack
  // }

  // if status code is not set, set it to 500
  if (!error.statusCode) {
    error.statusCode = 500
  }

  if (NODE_ENV !== DEVELOPMENT && error.statusCode >= 500) {
    error.message = 'Something went very wrong'
  }
  res.status(error.statusCode).json(body)
  return error
}

export default errorMiddleWare
