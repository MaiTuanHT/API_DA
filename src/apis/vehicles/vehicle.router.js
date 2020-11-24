import { Router } from 'express'
import VehicleController from './vehicle.controller'
import authenticate from '../../middlewares/authentication/jwt.strategy'
import authorization from '../../middlewares/authentication/authorization'

const router = Router()

router.post('',authenticate, authorization("Staff"), VehicleController.createOneVehicle)
router.get('', authenticate, authorization("Staff"), VehicleController.findAllVehicle)
router.get('/:vehicleID',authenticate, authorization("Staff"), VehicleController.findOneVehicle)
router.delete('/:vehicleID',authenticate, authorization("Staff"),VehicleController.deleteVehicle)

export default router