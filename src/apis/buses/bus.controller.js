import BusService from './bus.service'
import RouteService from '../routes/route.service'

import checkError from '../../helpers/checkError'
// import RoleService from '../roles/role.service'


const busService = new BusService()
const routeService = new RouteService()


async function createOneBus(req, res) {
    try {
        const data = req.body;
        // console.log(data)
        if(!data.routeID || data.routeID == undefined || !data.departureTime || data.departureTime == undefined){
            throw{
                code: 400,
                name: 'ErrorEmpty'
            }
        }
        
        const routeID = data.routeID;

        const route = await routeService.findOne({_id: routeID})

        const bus = {
            routeID: data.routeID,
            agencyID: route.agencyID,
            departureTime : data.departureTime
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
        const buses = await busService.findAll()
        console.log(buses);
        return res.status(200).json(buses);
    } catch (error) {
        checkError(error,res)
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

async function deleteBus(req , res) {
    try {
        const { busID } = req.params
        await busService.delete({_id: busID})
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
}