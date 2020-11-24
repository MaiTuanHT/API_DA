import AgencyRouteService from './agency_routes.service'

import checkError from '../../helpers/checkError'
import roleControler from '../roles/role.controller'
import RouteService from '../routes/route.service'
import RoleService from '../roles/role.service'
import { query } from 'express-validator'


const agency_route_Service = new AgencyRouteService()
// const routeService = new RouteService()


async function createOneAgencyRoute(agency_route, req, res) {
    try {
        // const data = req.body;
        // console.log(data)
        if(!agency_route || agency_route== undefined){
            throw{
                code: 400,
                name: 'ErrorEmpty'
            }
        }
        const newAgencyRoute = await agency_route_Service.CreateOne(agency_route)
    //    return res.status(201).json(newAgencyRoute)
    } catch (error) {
        checkError(error, res)
    }
}

async function findAllAgencyRoute(req, res) {
    try {
        const agencys = await agency_route_Service.findAll()
        // console.log(agencys);
        return res.status(200).json(agencys);
    } catch (error) {
        checkError(error,res)
    }
}

async function findOneAgencyRoute(req, res) {
    try {
        const { agency_route_ID } = req.params
        const agency_route = await agency_route_Service.findOne({
            _id: agency_route_ID
        })
        return res.status(200).json(agency_route)
    } catch (error) {
        checkError(error, res)
    }
}



async function deleteAgencyRoute(req , res) {
    try {
        const { agency_route_ID } = req.params
        await agency_route_Service.delete({_id: agency_route_ID})
        return res.status(200).json(true)
    } catch (error) {
        checkError(error, res)
    }
}

// async function findManyAgencyByRoute(req , res) {
//     try {
//         const { startLocation, stopLocation } = req.query
//         console.log("request.query : " + req.query)
//         console.log("startLocation : " + startLocation)

//         const agencys = await routeService.findManyAgency({
//             startLocation,
//             stopLocation,
//         })
//         return res.status(200).json(agencys)
//     } catch (error) {
//         checkError(error , res)
//     }
// }


// async function findManyAgency(req , res) {
//     try {
//         const {route} = req.params
//         const agencys = await agencyService.findOne({
//             startLocation: route.startLocation,
//             stopLocation: route.stopLocation
//         })
//         return res.status(200).json(agencys)
//     } catch (error) {
//         checkError(error, res)
//     }
// }

export default {
    createOneAgencyRoute,
    findAllAgencyRoute,
    findOneAgencyRoute,
    deleteAgencyRoute,
    // findManyAgency,
    // findManyAgencyByRoute,
}