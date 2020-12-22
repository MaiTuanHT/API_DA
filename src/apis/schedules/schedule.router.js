import { Router } from 'express'
import ScheduleController from './schedule.controller'
import authenticate from '../../middlewares/authentication/jwt.strategy'
import authorization from '../../middlewares/authentication/authorization'
import scheduleController from './schedule.controller'

const router = Router()

router.post('', authenticate, authorization("Staff"), ScheduleController.createOneSchedule)
router.put('/:scheduleID', authenticate, authorization("Staff"), ScheduleController.updateSchedule)

router.delete('/:scheduleID', authenticate, authorization("Staff"), ScheduleController.deleteSchedule)

router.get('', ScheduleController.findAllSchedule)
router.get('/schedule/:scheduleID', ScheduleController.findOneSchedule)

router.get('/scheduleOfRoute/:scheduleID', ScheduleController.findScheduleOfRoute)

router.get('/key/:key', ScheduleController.findScheduleOfKey)

router.get('/agency', authenticate, authorization("Staff"), ScheduleController.findAllScheduleOfAgency)
router.get('/many/', scheduleController.findAllScheduleForSearch)

router.get('/agency-route/:agencyID/:startLocation/:stopLocation', scheduleController.findScheduleOfAgencyRoute)

router.get('/:agencyID', ScheduleController.findManySchedule)

router.get('/findone/:scheduleID', authenticate, authorization("Staff"), ScheduleController.findOneSchedule),
    router.get('/findSchedule/:scheduleID', authenticate, authorization("Client"), ScheduleController.findOneSchedule)
router.delete('/:scheduleID', authenticate, authorization("Staff"), ScheduleController.deleteSchedule)

export default router