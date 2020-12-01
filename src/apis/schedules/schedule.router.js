import { Router } from 'express'
import ScheduleController from './schedule.controller'
import authenticate from '../../middlewares/authentication/jwt.strategy'
import authorization from '../../middlewares/authentication/authorization'
import scheduleController from './schedule.controller'

const router = Router()

router.post('', authenticate, authorization("Staff"), ScheduleController.createOneSchedule)

router.get('', ScheduleController.findAllSchedule)
router.get('/agency', authenticate, authorization("Staff"), ScheduleController.findAllScheduleOfAgency)
router.get('/many/', scheduleController.findAllScheduleForSearch)

router.get('/:agencyID', ScheduleController.findManySchedule)

router.get('/findone/:scheduleID', ScheduleController.findOneSchedule)
router.delete('/:scheduleID', authenticate, authorization("Staff"), ScheduleController.deleteSchedule)

export default router