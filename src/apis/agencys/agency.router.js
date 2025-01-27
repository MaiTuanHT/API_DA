import { Router } from 'express'
import AgencyController from './agency.controller'
import authenticate from '../../middlewares/authentication/jwt.strategy'
import authorization from '../../middlewares/authentication/authorization'
import agencyController from './agency.controller'

const router = Router()

router.post('', authenticate, authorization("Client"), AgencyController.createOneAgency)
router.put('/update', authenticate, authorization("Manager"), AgencyController.updateAgency)
router.delete('/:agencyID', authenticate, authorization("Admin"), AgencyController.deleteAgency)

router.get('', AgencyController.findAllAgency)
router.get('/admin', authenticate, authorization("Admin"), AgencyController.findAllAgency)
router.get('/list', AgencyController.findManyAgencyByRoute)
router.get('/:route', AgencyController.findManyAgency)
router.get('/:agencyID', AgencyController.findOneAgency)
router.get('/agency', authenticate, authorization("Manager"), AgencyController.findAgencyOfManager)
router.delete('/:agencyID', AgencyController.deleteAgency)

export default router