import * as userCtrl from '../controllers/user.controller'
import { authorization, validator } from '../middlewares'
import { Router } from 'express'

const router = Router()

router.get('/', [
    authorization.verifyToken,
    authorization.isAdmin
], userCtrl.getUsers)

router.get('/:userId', [
    authorization.verifyToken,
    authorization.isAdmin
], userCtrl.getUserById)

router.put('/:userId', [
    authorization.verifyToken,
    authorization.isAdmin,
    validator.checkRolesExisted
], userCtrl.updateUserById)

router.delete('/:userId', [
    authorization.verifyToken,
    authorization.isAdmin
], userCtrl.deleteUserById)

export default router