import RouteService from './route.service'
import AgencyRouteService from '../agency_routes/agency_routes.service'

import checkError from '../../helpers/checkError'
import AgencyRoute from '../agency_routes/agency_routes.controller'

import RoleService from '../roles/role.service'


const roleService = new RoleService()
const routeService = new RouteService()
const agencyRouteService = new AgencyRouteService()


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
        if (!user) {
            throw {
                code: 401,
                name: "Unauthorazation"
            }
        }


        const role = await roleService.findOne({ userID: user._id, roleName: "Staff" })

        const data = {
            agencyID: role.agencyID,
            startLocation,
            stopLocation,
        }

        const newRoute = await routeService.CreateOne(data)
        if (newRoute) {
            const agencyID = newRoute.agencyID
            const routeID = newRoute._id
            const agency_route = { agencyID, routeID }
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

async function deleteRoute(req, res) {
    try {
        const { routeID } = req.params
        await routeService.delete({ _id: routeID })
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
    findAllRouteOfAgency
}