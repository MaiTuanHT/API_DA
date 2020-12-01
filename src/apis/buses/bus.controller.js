import BusService from './bus.service'
import RouteService from '../routes/route.service'

import checkError from '../../helpers/checkError'
// import RoleService from '../roles/role.service'
import RoleService from '../roles/role.service'

const roleService = new RoleService()

const busService = new BusService()
const routeService = new RouteService()


async function createOneBus(req, res) {
    try {

        const { routeID, departureTime, seat } = req.body

        // const data = req.body;
        // console.log(data)
        if (!routeID || routeID == undefined ||
            !departureTime || departureTime == undefined ||
            !seat || seat == undefined) {
            throw {
                code: 400,
                name: 'ErrorEmpty'
            }
        }

        // const routeID = data.routeID;

        const { user } = req
        if (!user) {
            throw {
                code: 401,
                name: "Unauthorazation"
            }
        }


        const role = await roleService.findOne({ userID: user._id, roleName: "Staff" })

        const bus = {
            routeID,
            agencyID: role.agencyID,
            departureTime,
            seat,
        }
        console.log(bus)
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

        console.log(role)
            // const agencyID = req.query
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
        await busService.delete({ _id: busID })
        return res.status(200).json(true)
    } catch (error) {
        checkError(error, res)
    }
}


export default {
    createOneBus,
    findAllBus,
    findOneBus,
    deleteBus,
    findAllBusOfAgency
}