import jwt from 'jsonwebtoken'
import ServiceLocator from '../di/ServiceLocator'
import AppError from '../utils/error'

import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
//import UserModel, { User } from '../models/User';

/**
 * Ensures a user is signed in
 */
const requireSignIn = async (req, res, next) => {
  //get bearer token from request header
  let token = req.headers.authorization

  //if token does not exist
  if (!token) {
    return next(new AppError(400, 'Authentication is required'))
  }

  //if token is not bearer token
  if (!token.startsWith('Bearer')) {
    return next(new AppError(400, 'Invalid Token'))
  }
  token = token.split(' ')[1]

  try {
    //verify the token and get the user id
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        return next(new AppError(400, 'Invalid or expired token'))
      }
      const store = await ServiceLocator.storeRepository.findById(decoded.id)

      if (!store) {
        return next(new AppError(404, 'User not found'))
      }

      req.user = store
      next()
    })
  } catch (err) {
    return next(err)
  }
}

export { requireSignIn }
