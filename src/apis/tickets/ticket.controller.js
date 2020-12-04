import TicketService from './ticket.service'
import checkError from '../../helpers/checkError'
import ScheduleService from '../schedules/schedule.service'

const scheduleService = new ScheduleService()
const ticketService = new TicketService()

async function createTicket(req, res) {
    try {
        const { fullName, phone, scheduleID } = req.body
        let { seat } = req.body
        if (seat == null || seat == undefined) {
            seat = 1;
        }

        if (!fullName || fullName == undefined ||
            !phone || phone == undefined || !scheduleID || scheduleID == undefined) {
            throw {
                code: 400,
                name: 'ErrorEmpty'
            }
        }
        const schedule = await scheduleService.findOne({ _id: scheduleID })
        const data = {
            fullName,
            phone,
            scheduleID: schedule._id
        }
        let tickets = []
        const promises = []

        for (var i = 0; i < seat; i++) {
            promises.push(ticketService.createOne(data))
        }
        tickets = await Promise.all(promises)

        const booked = seat + schedule.booked

        const dataUpdate = {
            booked
        }
        await scheduleService.update(schedule._id, dataUpdate)
        return res.status(201).json(tickets)
    } catch (error) {
        checkError(error, res)
    }
}

async function findAllTicket(req, res) {
    try {
        const tickets = await ticketService.findAll()
        console.log(tickets);
        return res.status(200).json(tickets);
    } catch (error) {
        checkError(error, res)
    }
}

async function findTicketForSearch(req, res) {
    try {
        const { phone, date } = req.query;
        console.log(phone)
        console.log(date)
        let ticketSearch = []
        const tickets = await ticketService.findAll()
            // console.log(tickets);

        tickets.forEach(ticket => {
            if (ticket.phone == phone && ticket.scheduleID.date == date) {
                ticketSearch.push(ticket)
            }
        });
        if (ticketSearch) {
            console.log(ticketSearch)
            return res.status(200).json(ticketSearch);
        }
    } catch (error) {
        checkError(error, res)
    }
}

async function findManyTicket(req, res) {
    try {
        const { user } = req
        if (!user) {
            return res.status(401).json({
                code: 401,
                name: 'UnAuthorization'
            })
        }
        const userID = user._id

        const tickets = await ticketService.findMany({ userID })
        return res.status(200).json(tickets)
    } catch (error) {
        return res.status(401).json({
            code: 401,
            name: 'UnAuthorization'
        })
    }

}

async function findManyTicketOfSchedule(req, res) {
    try {

        const { scheduleID } = req.params
        console.log(scheduleID)
        const tickets = await ticketService.findMany({ scheduleID })
        console.log(tickets)
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

async function deleteTicket(req, res) {
    try {
        const { ticketID } = req.params

        const ticket = await ticketService.findOne({ _id: ticketID })
        const schedule = await scheduleService.update(ticket.scheduleID._id, { booked: ticket.scheduleID.booked - 1 })

        await ticketService.delete({ _id: ticketID })
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
    findTicketForSearch,
    deleteTicket,
    findManyTicketOfSchedule
}