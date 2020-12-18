import { Router } from 'express'
import ImageController from './image.controller'
import authenticate from '../../middlewares/authentication/jwt.strategy'
import authorization from '../../middlewares/authentication/authorization'

const router = Router()

router.post('', authenticate, authorization("Manager"), ImageController.CreateImage)

export default router