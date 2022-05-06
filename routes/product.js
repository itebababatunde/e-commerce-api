import { Router } from 'express'
import joiMiddleware from '../middlewares/joiMiddleware.js'
import { createProductSchema } from '../utils/schema.js'
import ServiceLocator from '../di/serviceLocator.js'
import ProductController from '../controllers/ProductController.js'
import { requireSignIn } from '../middlewares/auth'

const controller = new ProductController(ServiceLocator.productService)

const router = Router()

router.post(
  '/add',
  requireSignIn,
  joiMiddleware(createProductSchema),
  controller.createProduct
)

export default router
