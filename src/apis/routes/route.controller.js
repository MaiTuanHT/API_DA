
import RouteService from './route.service'
import AgencyRouteService from '../agency_routes/agency_routes.service'

import checkError from '../../helpers/checkError'
import AgencyRoute from '../agency_routes/agency_routes.controller'


const routeService = new RouteService()
const agencyRouteService = new AgencyRouteService()


async function createOneRoute(req, res) {
    try {
        const data = req.body;
        console.log(data)
        if(!data.agencyID || data.agencyID == undefined || !data.startLocation || data.startLocation == undefined
            || !data.stopLocation || data.stopLocation == undefined){
            throw{
                code: 400,
                name: 'ErrorEmpty'
            }
        }
        const newRoute = await routeService.CreateOne(data)
        if(newRoute){
            const agencyID = newRoute.agencyID
            const routeID = newRoute._id
            const agency_route = {agencyID , routeID }
            AgencyRoute.createOneAgencyRoute(agency_route, req, res)
        }
       return res.status(201).json(newRoute)
    } catch (error) {
        checkError(error, res)
    }
}


async function findAllRoute(req, res) {
    try {
        const routes = await routeService.findAll()
        return res.status(200).json(routes);
    } catch (error) {
        checkError(error,res)
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

async function deleteRoute(req , res) {
    try {
        const { routeID } = req.params
        await routeService.delete({_id: routeID})
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
}