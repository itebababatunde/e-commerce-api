import { Router } from 'express'
import authRouter from './auth.js'
import productRouter from './product.js'
import collectionRouter from './collection'
import paymentRouter from './payment'

const router = Router()

router.use('/auth', authRouter)
router.use('/products', productRouter)
router.use('/collections', collectionRouter)
router.use('/order', paymentRouter)

export default router
