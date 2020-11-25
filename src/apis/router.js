import UserRouter from './users/user.router'
import AgencyRouter from './agencys/agency.router'
import RouteRouter from './routes/route.router'
import BusRouter from './buses/bus.router'
import VehicleRouter from './vehicles/vehicle.router'
import AgencyRouteRouter from './agency_routes/agency_routes.router'
import TicketRouter from './tickets/ticket.router'
import RateRouter from './rates/rates.router'
import ScheduleRouter from './schedules/schedule.router'
// import ScheduleAgencyRouter from './schedules/scheduleAgency.route'
import Router from 'express'

const api = Router()

api.use('/users/', UserRouter)
api.use('/agencys/' , AgencyRouter)
api.use('/routes/' , RouteRouter)
api.use('/buses/' , BusRouter)
api.use('/vehicles/' , VehicleRouter)
api.use('/tickets/' , TicketRouter)
api.use('/rates/' , RateRouter)
api.use('/schedules/', ScheduleRouter)
// api.use('/scheduleAgency/' , ScheduleAgencyRouter)
api.use('/agency_route/', AgencyRouteRouter)


export default api

