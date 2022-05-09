import AppError from '../utils/error.js'

/**
 * Used to validate schmea of request body
 */
const joiMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate({ ...req.body, ...req.params })
    if (!error) {
      return next()
    } else {
      const { details } = error
      let message = ''
      details.forEach((element) => {
        message += element.message + ' '
      })

      return next(new AppError(400, message))
    }
  }
}

export default joiMiddleware
