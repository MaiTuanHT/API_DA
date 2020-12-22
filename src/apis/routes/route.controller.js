import RouteService from './route.service'
import AgencyRouteService from '../agency_routes/agency_routes.service'

import checkError from '../../helpers/checkError'
// import AgencyRoute from '../agency_routes/agency_routes.controller'

import RoleService from '../roles/role.service'
import BusService from '../buses/bus.service'
import ScheduleService from '../schedules/schedule.service'

const roleService = new RoleService()
const routeService = new RouteService()
const agencyRouteService = new AgencyRouteService()
const busService = new BusService()
const scheduleService = new ScheduleService()


async function createOneRoute(req, res) {
    try {
        const { startLocation, stopLocation } = req.body;
        console.log(data)
        if (!startLocation || startLocation == undefined ||
            !stopLocation || stopLocation == undefined) {
            throw {
                code: 400,
                name: 'ErrorEmpty'
            }
        }

        const { user } = req
        const role = await roleService.findOne({ userID: user._id, roleName: "Staff" })

        const data = {
            agencyID: role.agencyID,
            startLocation,
            stopLocation,
        }

        const list_route = await routeService.findMany({ agencyID: user.agencyID })


        for (let i = 0; i < list_route.length; i++) {
            if (list_route[i].startLocation == startLocation && list_route[i].stopLocation == stopLocation) {
                throw {
                    code: 400,
                    name: "Already Exis"
                }
            }
        }
        const newRoute = await routeService.CreateOne(data)
        if (newRoute) {
            const agencyID = newRoute.agencyID
            const routeID = newRoute._id

            const dataAgencyRoute = {
                agencyID,
                routeID
            }
            const newAgencyRoute = await agencyRouteService.CreateOne(dataAgencyRoute)
            return res.status(201).json(newRoute)
        }
    } catch (error) {
        checkError(error, res)
    }
}


async function findAllRoute(req, res) {
    try {
        const routes = await routeService.findAll()
        return res.status(200).json(routes);
    } catch (error) {
        checkError(error, res)
    }
}

async function findAllRouteOfAgency(req, res) {
    try {
        const { user } = req
        if (!user) {
            throw {
                code: 401,
                name: "Unauthorazation"
            }
        }
        const role = await roleService.findOne({ userID: user._id, roleName: "Staff" })

        console.log(role)
            // const agencyID = req.query
        const routes = await routeService.findManyRouteOfAgency({ agencyID: role.agencyID })
        return res.status(200).json(routes);
    } catch (error) {
        checkError(error, res)
    }
}

async function findOneRoute(req, res) {
    try {
        const { routeID } = req.params
        const route = await routeService.findOne({
            _id: routeID
        })
        return res.status(200).json(route)
    } catch (error) {
        checkError(error, res)
    }
}

async function updateRoute(req, res) {
    try {
        const { user } = req
        const { routeID } = req.params
        const { startLocation, stopLocation } = req.body

        const schedules = await scheduleService.findMany({ routeID: routeID })
        schedules.forEach(schedule => {
            if (schedule.booked > 0) {
                throw {
                    code: 400,
                    name: "Bạn không thể sửa tuyến này. Trong tuyến này có lịch trình đã có người đặt vé"
                }
            }
        });


        let data = {}
        if (startLocation) {
            data.startLocation = startLocation
        }
        if (stopLocation) {
            data.stopLocation = stopLocation
        }

        const list_route = await routeService.findMany({ agencyID: user.agencyID })

        for (let i = 0; i < list_route.length; i++) {
            if (list_route[i].startLocation == startLocation && list_route[i].stopLocation == stopLocation) {
                throw {
                    code: 400,
                    name: "Already Exis"
                }
            }
        }
        const routeUpdate = await routeService.update(routeID, data)

        return res.status(200).json(routeUpdate)
    } catch (error) {
        checkError(error, res)
    }
}

async function deleteRoute(req, res) {
    try {
        const { routeID } = req.params
        const schedules = await scheduleService.findMany({ routeID: routeID })
        schedules.forEach(schedule => {
            if (schedule.booked > 0) {
                throw {
                    code: 400,
                    name: "Bạn không thể xóa tuyến này. Trong tuyến này có lịch trình đã có người đặt vé"
                }
            }
        });

        await routeService.delete({ _id: routeID })
        await busService.deleteMany({ routeID })
        await scheduleService.deleteMany({ routeID })
        await agencyRouteService.delete({ routeID })
        return res.status(200).json(true)

    } catch (error) {
        checkError(error, res)
    }
}

export default {
    createOneRoute,
    findAllRoute,
    findOneRoute,
    deleteRoute,
    findAllRouteOfAgency,
    updateRoute
}