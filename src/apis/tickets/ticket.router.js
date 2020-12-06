import { Router } from 'express'
import TicketController from './ticket.controller'
import authenticate from '../../middlewares/authentication/jwt.strategy'
import authorization from '../../middlewares/authentication/authorization'

const router = Router()

router.get('/many/:phone/:date', authenticate, authorization("Client"), TicketController.findTicketForSearch)

router.post('', authenticate, authorization("Client"), TicketController.createTicket)
router.post('/create', authenticate, authorization("Staff"), TicketController.createTicket)
router.delete('/:ticketID', authenticate, authorization("Staff"), TicketController.deleteTicket)
router.get('/schedule/:scheduleID', authenticate, authorization("Staff"), TicketController.findManyTicketOfSchedule)
router.get('', TicketController.findAllTicket)

router.get('/:userID', authenticate, authorization("Client"), TicketController.findManyTicket)
router.get('/:ticketID', TicketController.findOneTicket)
router.delete('/:ticketID', TicketController.deleteTicket)

export default router