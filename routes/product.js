import { Router } from 'express'
import joiMiddleware from '../middlewares/joiMiddleware.js'
import { createProductSchema, updateProductSchema } from '../utils/schema.js'
import ServiceLocator from '../di/serviceLocator.js'
import ProductController from '../controllers/ProductController.js'
import { requireSignIn } from '../middlewares/auth'

const controller = new ProductController(ServiceLocator.productService)

const router = Router()

router.get('/:id', controller.getProduct)
router.post(
  '/add',
  requireSignIn,
  joiMiddleware(createProductSchema),
  controller.createProduct
)
router.patch(
  '/:id',
  requireSignIn,
  joiMiddleware(updateProductSchema),
  controller.updateProduct
)

router.delete('/:id', requireSignIn, controller.deleteProduct)

export default router
