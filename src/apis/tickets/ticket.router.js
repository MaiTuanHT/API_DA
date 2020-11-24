import { Router } from 'express'
import TicketController from './ticket.controller'
import authenticate from '../../middlewares/authentication/jwt.strategy'
import authorization from '../../middlewares/authentication/authorization'

const router = Router()

router.post('', authenticate, authorization("Client"),TicketController.createOneTicket)
// router.post('/:ticketID', authenticate, authorization("Staff"),TicketController.updateTicket)
router.get('', TicketController.findAllTicket)
router.get('/:userID' , authenticate, authorization("Client"), TicketController.findManyTicket)
router.get('/:ticketID', TicketController.findOneTicket)
router.delete('/:ticketID',TicketController.deleteTicket)

export default router