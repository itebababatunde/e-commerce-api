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
import { requireSignIn } from '../middlewares/auth.js'
const controller = new ProductController(ServiceLocator.productService)

const router = Router()
router.post(
  '/:storeId/create',
  requireSignIn,
  joiMiddleware(createCollectionSchema),
  controller.createCollection
)
router.get(
  '/:storeId/:collectionId',
  requireSignIn,
  joiMiddleware(getCollectionSchema),
  controller.getCollection
)

router.post(
  '/:storeId/:collectionId/add-product',
  requireSignIn,
  joiMiddleware(addProductSchema),
  controller.addToCollection
)

router.post(
  '/:storeId/:collectionId/remove-product',
  requireSignIn,
  joiMiddleware(addProductSchema),
  controller.removeFromCollection
)

router.patch(
  '/:storeId/:collectionId',
  requireSignIn,
  joiMiddleware(updateCollectionSchema),
  controller.updateCollection
)

router.delete(
  '/:storeId//:collectionId',
  requireSignIn,
  controller.deleteCollection
)
export default router
