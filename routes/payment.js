import { Router } from 'express'
import joiMiddleware from '../middlewares/joiMiddleware.js'
import { createOrderSchema } from '../utils/schema.js'
import ServiceLocator from '../di/serviceLocator.js'
import PaymentController from '../controllers/PaymentController'
import { requireSignIn } from '../middlewares/auth'

const controller = new PaymentController(ServiceLocator.paymentService)

const router = Router()

router.post('/', joiMiddleware(createOrderSchema), controller.createOrder)
router.get('/:orderId', controller.getOrder)

export default router
