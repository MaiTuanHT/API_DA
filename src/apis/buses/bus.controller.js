import BusService from './bus.service'
import RouteService from '../routes/route.service'

import checkError from '../../helpers/checkError'
// import RoleService from '../roles/role.service'
import RoleService from '../roles/role.service'
import ScheduleService from '../schedules/schedule.service'

const roleService = new RoleService()

const busService = new BusService()
const routeService = new RouteService()
const scheduleServie = new ScheduleService()


async function createOneBus(req, res) {
    try {
        console.log("vao day")
        const { routeID, departureTime, seat } = req.body
        if (!routeID || routeID == undefined ||
            !departureTime || departureTime == undefined ||
            !seat || seat == undefined) {
            throw {
                code: 400,
                name: 'ErrorEmpty'
            }
        }
        const { user } = req

        const list_bus = await busService.findMany({})

        console.log("list bus : ", list_bus)

        for (var i = 0; i < list_bus.length; i++) {
            if (list_bus[i].routeID._id == routeID && list_bus[i].departureTime == departureTime) {

                throw {
                    code: 400,
                    name: 'Already Exis'
                }
            }
        }
        const role = await roleService.findOne({ userID: user._id, roleName: "Staff" })

        const bus = {
            routeID,
            agencyID: role.agencyID,
            departureTime,
            seat,
        }
        const newbus = await busService.CreateOne(bus)
        return res.status(201).json(newbus)
    } catch (error) {
        checkError(error, res)
    }
}

async function findAllBus(req, res) {
    try {
        const buses = await busService.findMany({})
        console.log(buses);
        return res.status(200).json(buses);
    } catch (error) {
        checkError(error, res)
    }
}

async function findAllBusOfAgency(req, res) {
    try {
        const { user } = req
        if (!user) {
            throw {
                code: 401,
                name: "Unauthorazation"
            }
        }
        const role = await roleService.findOne({ userID: user._id, roleName: "Staff" })

        const buses = await busService.findMany({ agencyID: role.agencyID })
        return res.status(200).json(buses);
    } catch (error) {
        checkError(error, res)
    }
}

async function findOneBus(req, res) {
    try {
        const { busID } = req.params
        const bus = await busService.findOne({
            _id: busID
        })
        return res.status(200).json(bus)
    } catch (error) {
        checkError(error, res)
    }
}

async function deleteBus(req, res) {
    try {
        const { busID } = req.params
        console.log("bus ID : ", busID)
        await busService.delete({ _id: busID })
        await scheduleServie.deleteMany({ busID: busID })
        return res.status(200).json(true)
    } catch (error) {
        checkError(error, res)
    }
}


async function updateBus(req, res) {
    try {
        const { busID } = req.params
        console.log("bus id : ", busID)
        const { departureTime, seat, routeID } = req.body
        let data = {}
        if (departureTime) {
            data.departureTime = departureTime
        }
        if (seat) {
            data.seat = seat
        }

        if (routeID) {
            data.routeID = routeID
        }

        const list_bus = await busService.findMany({})

        for (var i = 0; i < list_bus.length; i++) {
            if (list_bus[i].routeID == routeID && list_bus[i].departureTime == departureTime) {
                throw {
                    code: 400,
                    name: 'Already Exis'
                }
            }
        }
        const busUpdate = await busService.update(busID, data)
        return res.status(200).json(busUpdate)
    } catch (error) {
        checkError(error, res)
    }
}


export default {
    createOneBus,
    findAllBus,
    findOneBus,
    updateBus,
    deleteBus,
    findAllBusOfAgency
}