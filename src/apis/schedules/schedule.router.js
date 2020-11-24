import { Router } from 'express'
import ScheduleController from './schedule.controller'
import authenticate from '../../middlewares/authentication/jwt.strategy'
import authorization from '../../middlewares/authentication/authorization'

const router = Router()

router.post('',ScheduleController.createOneSchedule)
router.get('', ScheduleController.findAllSchedule)
router.get('/scheduleAgency/:agencyID', ScheduleController.findManySchedule)
// router.get('/:scheduleID', ScheduleController.findOneSchedule)
router.delete('/:scheduleID',authenticate, authorization("Staff"),ScheduleController.deleteSchedule)

export default router