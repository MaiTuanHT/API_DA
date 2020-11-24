import { Router } from 'express'
import ScheduleController from './schedule.controller'
import authenticate from '../../middlewares/authentication/jwt.strategy'
import authorization from '../../middlewares/authentication/authorization'

const router = Router()


router.get('/:agencyID', ScheduleController.findManySchedule)
export default router