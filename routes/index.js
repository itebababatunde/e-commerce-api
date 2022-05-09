import { Router } from 'express'
import authRouter from './auth.js'
import productRouter from './product.js'
import collectionRouter from './collection'

const router = Router()

router.use('/auth', authRouter)
router.use('/products', productRouter)
router.use('/collections', collectionRouter)

export default router
