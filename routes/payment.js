import { Router } from 'express'
import joiMiddleware from '../middlewares/joiMiddleware.js'
import {
  createOrderSchema,
  initiateTransactionSchema,
  getOrderSchema,
} from '../utils/schema.js'
import ServiceLocator from '../di/serviceLocator.js'
import PaymentController from '../controllers/PaymentController'
import PaymentDependencies from '../services/Payment/paymentHelper.js'
const paymentDependencies = new PaymentDependencies()

const controller = new PaymentController(
  ServiceLocator.paymentService,
  paymentDependencies
)

const router = Router()

router.post('/', joiMiddleware(createOrderSchema), controller.createOrder)
router.get('/:orderId', joiMiddleware(getOrderSchema), controller.getOrder)
router.post(
  '/:orderId',
  joiMiddleware(initiateTransactionSchema),
  controller.initiateTransction
)
router.post('/payment/webhook', controller.processPaymentUpdate)

export default router
