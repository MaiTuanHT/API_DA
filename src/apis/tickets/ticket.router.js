import { Router } from 'express'
import TicketController from './ticket.controller'
import authenticate from '../../middlewares/authentication/jwt.strategy'
import authorization from '../../middlewares/authentication/authorization'

const router = Router()

// router.post('', authenticate, authorization("Client"),TicketController.createOneTicket)
router.post('', authenticate, authorization("Client"), TicketController.createTicket)
router.post('/create', authenticate, authorization("Staff"), TicketController.createTicket)
router.delete('/:ticketID', authenticate, authorization("Staff"), TicketController.deleteTicket)
    // router.post('/:ticketID', authenticate, authorization("Staff"),TicketController.updateTicket)
    // router.post('',TicketController.createOneTicket)
router.get('/schedule/:scheduleID', authenticate, authorization("Client"), TicketController.findManyTicketOfSchedule)
router.get('', TicketController.findAllTicket)
router.get('/many/', TicketController.findTicketForSearch)
router.get('/:userID', authenticate, authorization("Client"), TicketController.findManyTicket)
router.get('/:ticketID', TicketController.findOneTicket)
router.delete('/:ticketID', TicketController.deleteTicket)

export default router