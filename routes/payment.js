import { Router } from 'express'
import joiMiddleware from '../middlewares/joiMiddleware.js'
import { createOrderSchema } from '../utils/schema.js'
import ServiceLocator from '../di/serviceLocator.js'
import PaymentController from '../controllers/PaymentController'
import PaymentDependencies from '../services/Payment/paymentHelper.js'
import { requireSignIn } from '../middlewares/auth.js'
const paymentDependencies = new PaymentDependencies()

const controller = new PaymentController(
  ServiceLocator.paymentService,
  paymentDependencies
)

const router = Router()

router.post('/', joiMiddleware(createOrderSchema), controller.createOrder)
router.get('/:orderId', controller.getOrder)
router.post('/:orderId', controller.initiateTransction)
router.post('/webhook', controller.processPaymentUpdate)

export default router
