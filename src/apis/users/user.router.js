import { Router } from 'express'
import UserController from './user.controller'
import authenticate from '../../middlewares/authentication/jwt.strategy'
import authorization from '../../middlewares/authentication/authorization'
import cors from 'cors'
import userController from './user.controller'
import UserService from './user.service'
const router = Router()

router.post('', authenticate, authorization("Manager"), UserController.createOneUser)

// router.post('/createAdmin', UserController.createAdmin)

router.delete('/:userID', authenticate, authorization("Manager"), UserController.deleteUser)
router.delete('/admin/:userID', authenticate, authorization('Admin'), UserController.deleteUser)

router.post('/register', UserController.singUp)
router.post('/logIn', cors(), UserController.signIn)


router.get('/list-staff', authenticate, authorization('Manager'), UserController.findUserOfAgency)

router.get('/client', authenticate, authorization('Admin'), UserController.findAllClient)

router.get('/:userID', authenticate, UserController.findOneUser)


export default router