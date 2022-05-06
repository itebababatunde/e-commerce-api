import { Router } from 'express'
import joiMiddleware from '../middlewares/joiMiddleware.js'
import {
  signUpSchema,
  loginSchema,
  resetPasswordSchema,
} from '../utils/schema.js'
import ServiceLocator from '../di/serviceLocator.js'
import AuthController from '../controllers/AuthController'
import Email from '../utils/Email.js'

const controller = new AuthController(ServiceLocator.authService, Email)

const router = Router()

router.post('/signup', joiMiddleware(signUpSchema), controller.signUp)
router.post('/login', joiMiddleware(loginSchema), controller.logIn)
router.post('/forgot-password', controller.forgotPassword)
router.post(
  '/reset-password/:token',
  joiMiddleware(resetPasswordSchema),
  controller.resetPassword
)

export default router
