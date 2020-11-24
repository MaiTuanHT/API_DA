import { Router } from 'express'
import RoleController from './role.controller'
import authenticate from '../../middlewares/authentication/jwt.strategy'

const router = Router()

router.post('/roles', RoleController.createOneRole)
router.get('/roles', RoleController.findAllRole)

export default router