import { Router } from 'express'
import authRouter from './auth.js'
import productRouter from './product.js'
import collectionRouter from './collection.js'
import paymentRouter from './payment.js'

const router = Router()

router.use('/auth', authRouter)
router.use('/products', productRouter)
router.use('/collections', collectionRouter)
router.use('/order', paymentRouter)

export default router
