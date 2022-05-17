import { Router } from 'express'
import joiMiddleware from '../middlewares/joiMiddleware.js'
import { createProductSchema, updateProductSchema } from '../utils/schema.js'
import ServiceLocator from '../di/serviceLocator.js'
import ProductController from '../controllers/ProductController.js'
import { requireSignIn } from '../middlewares/auth.js'

const controller = new ProductController(ServiceLocator.productService)

const router = Router()

router.get('/:storeId/:productId', controller.getProduct)
router.get('/:storeId/search/:key', controller.searchProduct)
router.post(
  '/:storeId/add',
  requireSignIn,
  joiMiddleware(createProductSchema),
  controller.createProduct
)
router.patch(
  '/:storeId/:productId',
  requireSignIn,
  joiMiddleware(updateProductSchema),
  controller.updateProduct
)

router.delete('/:storeId/:productId', requireSignIn, controller.deleteProduct)

export default router
