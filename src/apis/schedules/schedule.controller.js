import ScheduleService from './schedule.service'
import BusService from '../buses/bus.service'

import checkError from '../../helpers/checkError'
import RoleService from '../roles/role.service'

const roleService = new RoleService()
const scheduleService = new ScheduleService()
const busService = new BusService()



async function createOneSchedule(req, res) {
    try {
        const { busID, date } = req.body
        if (!busID || busID == "" || !date || date == "") {
            throw {
                code: 400,
                name: 'ErrorEmpty'
            }
        }

        const bus = await busService.findOne({ _id: busID })
        const schedule = {
            busID: busID,
            agencyID: bus.agencyID,
            routeID: bus.routeID,
            date: date
        }
        const newSchedule = await scheduleService.CreateOne(schedule)
        return res.status(201).json(newSchedule)
    } catch (error) {
        checkError(error, res)
    }
}

async function findAllSchedule(req, res) {
    try {
        const schedules = await scheduleService.findMany({})
        console.log(schedules);
        return res.status(200).json(schedules);
    } catch (error) {
        checkError(error, res)
    }
}

async function findAllScheduleForSearch(req, res) {
    try {
        const { stopLocation, startLocation } = req.query;
        const schedules = await scheduleService.findMany({})
        let list = []
        if (schedules) {
            schedules.forEach(schedule => {
                if (schedule.routeID.startLocation == startLocation && schedule.routeID.stopLocation == stopLocation) {
                    list.push(schedule)
                }
            });
        }
        // console.log(stopLocation)
        // const schedules = await scheduleService.findMany({stopLocation: stopLocation })
        // console.log(schedules);
        return res.status(200).json(list);
    } catch (error) {
        checkError(error, res)
    }
}

async function findManySchedule(req, res) {
    try {
        const { agencyID } = req.params;
        console.log("id : " + agencyID)
        const schedules = await scheduleService.findMany({ agencyID: agencyID })
        console.log(schedules)
            // console.log(schedules);
        return res.status(200).json(schedules);
    } catch (error) {
        checkError(error, res)
    }
}

async function findAllScheduleOfAgency(req, res) {
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
        const routes = await scheduleService.findMany({ agencyID: role.agencyID })
        return res.status(200).json(routes);
    } catch (error) {
        checkError(error, res)
    }
}


async function findOneSchedule(req, res) {
    try {
        const { scheduleID } = req.params
            // console.log("id find one: " + scheduleID)
        const schedule = await scheduleService.findOne({
            _id: scheduleID
        })
        console.log(schedule)
        return res.status(200).json(schedule)
    } catch (error) {
        checkError(error, res)
    }
}

async function deleteSchedule(req, res) {
    try {
        const { scheduleID } = req.params
        await scheduleService.delete({ _id: scheduleID })
        return res.status(200).json(true)
    } catch (error) {
        checkError(error, res)
    }
}


export default {
    createOneSchedule,
    findAllSchedule,
    findOneSchedule,
    deleteSchedule,
    findManySchedule,
    findAllScheduleForSearch,
    findAllScheduleOfAgency
}