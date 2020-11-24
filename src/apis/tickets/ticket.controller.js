import TicketService from './ticket.service'
import checkError from '../../helpers/checkError'
const ticketService = new TicketService()

async function createOneTicket(req, res) {
    try {
        const {user} = req
        console.log(user)

        let data = req.body;
        if(!user._id || user._id == undefined || !data.scheduleID || data.scheduleID== undefined){
            throw{
                code: 400,
                name: 'ErrorEmpty'
            }
        }
        data.userID = user._id
        const newTicket = await ticketService.createOne(data)
       return res.status(201).json(newTicket)
    } catch (error) {
        checkError(error,res)
    }
}

async function findAllTicket(req, res) {
    try {
        const tickets = await ticketService.findAll()
        console.log(tickets);
        return res.status(200).json(tickets);
    } catch (error) {
        checkError(error,res)
    }
}

async function findManyTicket(req , res) {
    try {
        const {user} = req
        if (!user) {
            return res.status(401).json({
                code: 401,
                name: 'UnAuthorization'
            })
        }
        const userID = user._id

        const tickets = await ticketService.findMany({userID})
        return res.status(200).json(tickets)
    } catch (error) {
         return res.status(401).json({
                code: 401,
                name: 'UnAuthorization'
            })
    }

}

async function findOneTicket(req, res) {
    try {
        const { ticketID } = req.params
        const ticket = await ticketService.findOne({
            _id: ticketID
        })
        return res.status(200).json(ticket)
    } catch (error) {
        checkError(error, res)
    }
}

// async function updateTicket(req, res) {
//     try {
//         const {ticketID} = req.params
//         const data = req.body
//         const ticketUpdate = await ticketService.update(ticketID, data)
//         return res.status(200).json(ticketUpdate)
//     } catch (error) {
//         checkError(error, res)
//     }
// }

async function deleteTicket(req , res) {
    try {
        const { ticketID } = req.params
        await ticketService.delete({_id: ticketID})
        return res.status(200).json(true)
    } catch (error) {
        checkError(error, res)
    }
}


export default {
    createOneTicket,
    findAllTicket,
    findManyTicket,
    findOneTicket,
    // updateTicket,
    deleteTicket,
}