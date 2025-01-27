import AgencyService from './agency.service'

import checkError from '../../helpers/checkError'
import roleControler from '../roles/role.controller'
import RouteService from '../routes/route.service'
import RoleService from '../roles/role.service'
import { query } from 'express-validator'
import AgencyRouteService from '../agency_routes/agency_routes.service'
import UserService from '../users/user.service'
import VehicleService from '../vehicles/vehicle.service'
import BusService from '../buses/bus.service'
import ScheduleService from '../schedules/schedule.service'
import RateService from '../rates/rates.service'


const agencyService = new AgencyService()
const routeService = new RouteService()
const agencyRouteService = new AgencyRouteService()

const userService = new UserService()
const roleService = new RoleService()

const vehicleService = new VehicleService()
const busService = new BusService()
const scheduleService = new ScheduleService()
const rateService = new RateService()

async function createOneAgency(req, res) {
    try {
        const { user } = req

        if (!user) {
            throw {
                code: 401,
                name: "Unauthorazation"
            }
        }

        const { nameAgency, phoneNumber, discription, utilities, policy, ticketPaymentDealine } = req.body
        console.log(nameAgency)
        console.log(phoneNumber)
        if (!nameAgency || nameAgency == undefined || !phoneNumber || phoneNumber == undefined) {

            throw {
                code: 400,
                name: 'ErrorEmpty'
            }
        }
        let data = {
            nameAgency,
            phoneNumber,
            author: user._id,
            discription,
            utilities,
            policy
        }

        if (ticketPaymentDealine) {
            data.ticketPaymentDealine = ticketPaymentDealine
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

            const userUpdate = await userService.update(userID, { agencyID: newAgency._id })

            return res.status(201).json(newAgency)
        }
    } catch (error) {
        checkError(error, res)
    }
}

async function findAllAgency(req, res) {
    try {
        const agencys = await agencyService.findAll()
        console.log("agency", agencys);
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

async function findAgencyOfManager(req, res) {
    try {
        const { user } = req
        const manage = await userService.findOne({ _id: user._id })
        const agency = await agencyService.findOne({
            _id: manage.agencyID
        })
        return res.status(200).json(agency)
    } catch (error) {
        checkError(error, res)
    }
}

async function deleteAgency(req, res) {
    try {
        const { agencyID } = req.params
        const agency = await agencyService.findOne({ _id: agencyID });
        const userID = agency.author._id;
        await agencyService.delete({ _id: agencyID })
        await agencyRouteService.deleteMany({ agencyID })
        await userService.deleteMany({ agencyID })
        await roleService.deleteMany({ agencyID })
        await roleService.delete({ userID })
        await vehicleService.deleteMany({ agencyID })
        await routeService.deleteMany({ agencyID })
        await busService.deleteMany({ agencyID })
        await scheduleService.deleteMany({ agencyID })
        await rateService.deleteMany({ agencyID })

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


async function updateAgency(req, res) {
    try {

        console.log("vao day")

        const { user } = req
        if (!user) {
            throw {
                code: 401,
                name: 'UnAuthorization'
            }
        }
        const role = await roleService.findOne({ userID: user._id, roleName: "Manager" })
        if (!role || role == undefined || role == null) {
            throw {
                code: 401,
                name: 'NotFound'
            }
        }

        const { nameAgency, phoneNumber, discription, policy, utilities, ticketPaymentDealine } = req.body
        let data = {}
        if (nameAgency) {
            data.nameAgency = nameAgency
        }
        if (phoneNumber) {
            data.phoneNumber = phoneNumber
        }


        if (discription) {
            data.discription = discription
        }

        if (policy) {
            data.policy = policy
        }

        if (utilities) {
            data.utilities = utilities
        }

        if (ticketPaymentDealine) {
            data.ticketPaymentDealine = ticketPaymentDealine
        }


        const AgencyUpdate = await agencyService.update(role.agencyID, data)

        return res.status(200).json(AgencyUpdate)
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
    updateAgency,
    findAgencyOfManager
}