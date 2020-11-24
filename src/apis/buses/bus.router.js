import { Router } from 'express'
import BusController from './bus.controller'
import authenticate from '../../middlewares/authentication/jwt.strategy'
import authorization from '../../middlewares/authentication/authorization'

const router = Router()

// router.post('', authenticate, authorization("Staff"),BusController.createOneBus)
router.post('',BusController.createOneBus)

router.get('', BusController.findAllBus)
router.get('/:busID', BusController.findOneBus)
router.delete('/:busID',authenticate, authorization("Staff"),BusController.deleteBus)

export default router