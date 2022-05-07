import * as userCtrl from '../controllers/user.controller'
import { authorization, validator } from '../middlewares'
import { Router } from 'express'

const router = Router()

router.post('/', [
    authorization.verifyToken,
    authorization.isAdmin,
    validator.checkRolesExisted
], userCtrl.createUser)

export default router