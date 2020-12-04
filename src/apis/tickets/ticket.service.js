import TicketModel from './ticket.model'

class TicketService {
    async createOne(data) {
        try {
            const newTicket = await new TicketModel(data)
            await newTicket.save()
            return newTicket
        } catch (error) {
            throw error
        }
    }

    async findAll() {
        try {
            const tickets = TicketModel.find().populate('scheduleID')
            if (!tickets) {
                throw {
                    code: 404,
                    name: 'NotFoundTicket'
                }
            }
            return tickets
        } catch (error) {
            throw error
        }
    }

    async findMany(query) {
        try {
            const tickets = TicketModel.find(query)
            return tickets
        } catch (error) {
            throw error
        }
    }

    async findOne(query) {
        try {
            const ticket = await TicketModel.findOne(query).populate('scheduleID')
            if (!ticket) {
                throw {
                    code: 404,
                    name: 'NotFoundTicket'
                }
            }
            return ticket
        } catch (error) {
            throw error
        }
    }

    async delete(query) {
        try {
            const ticket = TicketModel.findOne(query)
            if (!ticket) {
                throw {
                    code: 404,
                    name: 'NotFoundTicket'
                }
            }
            await TicketModel.remove(ticket)
            return true
        } catch (error) {
            throw error
        }
    }


}

export default TicketService