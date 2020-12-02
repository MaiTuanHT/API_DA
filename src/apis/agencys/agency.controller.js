import AgencyService from './agency.service'

import checkError from '../../helpers/checkError'
import roleControler from '../roles/role.controller'
import RouteService from '../routes/route.service'
import RoleService from '../roles/role.service'
import { query } from 'express-validator'


const agencyService = new AgencyService()
const routeService = new RouteService()


async function createOneAgency(req, res) {
    try {
        const { user } = req

        if (!user) {
            throw {
                code: 401,
                name: "Unauthorazation"
            }
        }

        const { nameAgency, phoneNumber, discription, utilities, policy } = req.body
        console.log(nameAgency)
        console.log(phoneNumber)
        if (!nameAgency || nameAgency == undefined || !phoneNumber || phoneNumber == undefined) {

            throw {
                code: 400,
                name: 'ErrorEmpty'
            }
        }
        const data = {
            nameAgency,
            phoneNumber,
            author: user._id,
            discription,
            utilities,
            policy
        }
        const newAgency = await agencyService.CreateOne(data)
        if (newAgency) {
            const userID = user._id
            const roleNameM = 'Manager'
            const roleNameS = 'Staff'
            const roleM = {
                userID,
                roleName: roleNameM,
                agencyID: newAgency._id
            }
            const roleS = {
                userID,
                roleName: roleNameS,
                agencyID: newAgency._id
            }
            roleControler.createOneRole(roleM, res)
            roleControler.createOneRole(roleS, res)
        }
        return res.status(201).json(newAgency)
    } catch (error) {
        checkError(error, res)
    }
}

async function findAllAgency(req, res) {
    try {
        const agencys = await agencyService.findAll()
            // console.log(agencys);
        return res.status(200).json(agencys);
    } catch (error) {
        checkError(error, res)
    }
}

async function findOneAgency(req, res) {
    try {
        const { agencyID } = req.params
        const agency = await agencyService.findOne({
            _id: agencyID
        })
        return res.status(200).json(agency)
    } catch (error) {
        checkError(error, res)
    }
}

async function deleteAgency(req, res) {
    try {
        const { agencyID } = req.params
        await agencyService.delete({ _id: agencyID })
        return res.status(200).json(true)
    } catch (error) {
        checkError(error, res)
    }
}

async function findManyAgencyByRoute(req, res) {
    try {
        const { startLocation, stopLocation } = req.query

        const agencys = await routeService.findManyAgency({
            startLocation,
            stopLocation,
        })
        return res.status(200).json(agencys)
    } catch (error) {
        checkError(error, res)
    }
}


async function findManyAgency(req, res) {
    try {
        const { route } = req.params
        const agencys = await agencyService.findOne({
            startLocation: route.startLocation,
            stopLocation: route.stopLocation
        })
        return res.status(200).json(agencys)
    } catch (error) {
        checkError(error, res)
    }
}

export default {
    createOneAgency,
    findAllAgency,
    findOneAgency,
    deleteAgency,
    findManyAgency,
    findManyAgencyByRoute,
}