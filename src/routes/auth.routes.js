import * as authCtrl from '../controllers/auth.controller'
import { validator } from '../middlewares'
import { Router } from 'express'

const router = Router()

router.post('/signup', [
    validator.checkDuplicateUsernameOrEmail, 
    validator.checkRolesExisted
], authCtrl.signUp)

router.post('/signin', authCtrl.signIn)

export default router