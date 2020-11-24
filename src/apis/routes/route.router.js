import { Router } from 'express'
import RouteController from './route.controller'
import authenticate from '../../middlewares/authentication/jwt.strategy'
import authorization from '../../middlewares/authentication/authorization'
import routeController from './route.controller'

const router = Router()

router.post('', RouteController.createOneRoute)
router.get('',  RouteController.findAllRoute)
router.get('/:routeID', RouteController.findOneRoute)
router.delete('/:routeID',RouteController.deleteRoute)

export default router