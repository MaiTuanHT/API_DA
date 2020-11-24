import { Router } from 'express'
import UserController from './user.controller'
import authenticate from '../../middlewares/authentication/jwt.strategy'
import authorization from '../../middlewares/authentication/authorization'
import cors from 'cors'
import userController from './user.controller'
const router = Router()

router.post('',authenticate, authorization('Manager'),UserController.createOneUser)
router.post('/register', UserController.singUp)
router.post('/logIn', cors(), UserController.signIn)
// router.get('/logout' , userController.signOut)
 router.get('', authenticate, authorization('Manager') , UserController.findAllUser)

router.get('',UserController.findAllUser)

// router.get('/users', authenticate, authorization('Manager') ,UserController.findAllUser)
router.get('/:userID', UserController.findOneUser)
router.delete('/:userID',UserController.deleteUser)

export default router