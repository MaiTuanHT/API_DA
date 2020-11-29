import { Router } from 'express'
import RateController from './rate.controller'
import authenticate from '../../middlewares/authentication/jwt.strategy'
import authorization from '../../middlewares/authentication/authorization'

const router = Router()

router.post('', RateController.createOneRate)
router.get('',  RateController.findAllRate)
router.get('/agency/', RateController.rateAgency)
router.get('/:rateID', RateController.findOneRate)
router.delete('/:rateID',RateController.deleteRate)

export default router