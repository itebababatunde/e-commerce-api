import { Router } from 'express'
import joiMiddleware from '../middlewares/joiMiddleware.js'
import {
  createCollectionSchema,
  addProductSchema,
  getCollectionSchema,
  updateCollectionSchema,
} from '../utils/schema.js'
import ServiceLocator from '../di/serviceLocator.js'
import ProductController from '../controllers/ProductController.js'
import { requireSignIn } from '../middlewares/auth'
const controller = new ProductController(ServiceLocator.productService)

const router = Router()
router.post(
  '/create',
  requireSignIn,
  joiMiddleware(createCollectionSchema),
  controller.createCollection
)
router.get(
  '/:collectionId',
  requireSignIn,
  joiMiddleware(getCollectionSchema),
  controller.getCollection
)

router.post(
  '/:collectionId/add-product',
  requireSignIn,
  joiMiddleware(addProductSchema),
  controller.addToCollection
)

router.post(
  '/:collectionId/remove-product',
  requireSignIn,
  joiMiddleware(addProductSchema),
  controller.removeFromCollection
)

router.patch(
  '/:collectionId',
  requireSignIn,
  joiMiddleware(updateCollectionSchema),
  controller.updateCollection
)

router.delete('/:collectionId', requireSignIn, controller.deleteCollection)
export default router
