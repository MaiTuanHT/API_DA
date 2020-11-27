import TicketService from './ticket.service'
import checkError from '../../helpers/checkError'
import ScheduleService from '../schedules/schedule.service'

const scheduleService = new ScheduleService()
const ticketService = new TicketService()

async function createTicket(req, res) {
    try {
        const{fullName , email , phone , scheduleID} = req.body
        let {seat} = req.body
        if(seat == null || seat == undefined){
            seat = 1;
        }
        
        if(!fullName || fullName == undefined || !email ||email== undefined||
            !phone || phone == undefined || !scheduleID ||scheduleID== undefined ){
            throw{
                code: 400,
                name: 'ErrorEmpty'
            }
        }
        const schedule = await scheduleService.findOne({_id: scheduleID})
        const  data = {
                fullName,
                email,
                phone,
                scheduleID: schedule._id
            }
        let tickets = []
        // data.userID = user._id

        const promises = []

        console.log("number seat : " + seat)
        for (var i = 0 ; i< seat ; i++) {
            promises.push(ticketService.createOne(data))
        }

        tickets = await Promise.all(promises)
        console.log(tickets)
       return res.status(201).json(tickets)
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

async function findTicketForSearch(req, res) {
    try {
        const {phone , date} = req.query;
        console.log(phone)
        console.log(date)
        let ticketSearch = []
        const tickets = await ticketService.findAll()
        // console.log(tickets);
        
        tickets.forEach(ticket => {
            if(ticket.phone == phone && ticket.scheduleID.date == date){
                ticketSearch.push(ticket)
            }
        });
       if(ticketSearch){
            console.log(ticketSearch)
        return res.status(200).json(ticketSearch);
       }
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
    createTicket,
    findAllTicket,
    findManyTicket,
    findOneTicket,
    // updateTicket,
    findTicketForSearch,
    deleteTicket,
}