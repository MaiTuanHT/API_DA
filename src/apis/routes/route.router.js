import { Router } from 'express'
import RouteController from './route.controller'
import authenticate from '../../middlewares/authentication/jwt.strategy'
import authorization from '../../middlewares/authentication/authorization'
import routeController from './route.controller'

const router = Router()

router.post('', authenticate, authorization("Staff"), RouteController.createOneRoute)
router.put('/:routeID', authenticate, authorization("Staff"), RouteController.updateRoute)
router.get('', RouteController.findAllRoute)
router.get('/agency', authenticate, authorization("Staff"), RouteController.findAllRouteOfAgency)

router.get('/:routeID', RouteController.findOneRoute)
router.delete('/:routeID', RouteController.deleteRoute)

export default router