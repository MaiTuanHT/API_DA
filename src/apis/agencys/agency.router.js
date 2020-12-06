import { Router } from 'express'
import AgencyController from './agency.controller'
import authenticate from '../../middlewares/authentication/jwt.strategy'
import authorization from '../../middlewares/authentication/authorization'
import agencyController from './agency.controller'

const router = Router()

router.post('', authenticate, authorization("Client"), AgencyController.createOneAgency)
router.delete('/:agencyID', authenticate, authorization("Admin"), AgencyController.deleteAgency)

router.get('', AgencyController.findAllAgency)
router.get('/admin', authenticate, authorization("Admin"), AgencyController.findAllAgency)
    // router.get('/listAgnecy',AgencyController.findManyAgency)
router.get('/list', AgencyController.findManyAgencyByRoute)
router.get('/:route', AgencyController.findManyAgency)
router.get('/:agencyID', AgencyController.findOneAgency)
router.delete('/:agencyID', AgencyController.deleteAgency)

export default router