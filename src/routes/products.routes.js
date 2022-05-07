import * as productsCtrl from '../controllers/products.controller'
import { authorization } from '../middlewares'
import { Router } from 'express'

const router = Router()

router.get('/', productsCtrl.getProducts)

router.post('/', [authorization.verifyToken, authorization.isModerator], productsCtrl.createProduct)

router.get('/:productId', productsCtrl.getProductById)

router.put('/:productId', [authorization.verifyToken, authorization.isAdmin], productsCtrl.updateProductById)

router.delete('/:productId', [authorization.verifyToken, authorization.isAdmin], productsCtrl.deleteProductById)

export default router