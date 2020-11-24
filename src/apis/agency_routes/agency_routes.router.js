import { Router } from 'express'
import AgencyRouteController from './agency_routes.controller'
import authenticate from '../../middlewares/authentication/jwt.strategy'
import authorization from '../../middlewares/authentication/authorization'
import agencyController from './agency_routes.controller'

const router = Router()

router.post('',authenticate,AgencyRouteController.createOneAgencyRoute)
router.get('',AgencyRouteController.findAllAgencyRoute)
// router.get('/listAgnecy',AgencyController.findManyAgency)

// router.get('/list' , AgencyRouteController.findManyAgencyByRoute)
// router.get('/:route',AgencyRouteController.findManyAgency)
router.get('/:agency_route_ID', AgencyRouteController.findOneAgencyRoute)
router.delete('/:agencyID',AgencyRouteController.deleteAgencyRoute)

export default router