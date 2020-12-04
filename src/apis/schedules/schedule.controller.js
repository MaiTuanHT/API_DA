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

        const list_schedule = await scheduleService.findMany({})
        for (var i = 0; i < list_schedule.length; i++) {
            if (list_schedule[i].busID == busID && list_schedule[i].date == date) {
                throw {
                    code: 400,
                    name: 'Already Exis'
                }
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
        return res.status(200).json(list);
    } catch (error) {
        checkError(error, res)
    }
}

async function findManySchedule(req, res) {
    try {
        const { agencyID } = req.params;
        const schedules = await scheduleService.findMany({ agencyID: agencyID })
        console.log(schedules)
        return res.status(200).json(schedules);
    } catch (error) {
        checkError(error, res)
    }
}

async function findScheduleOfAgencyRoute(req, res) {
    try {
        console.log("da vao day")
        const { agencyID, startLocation, stopLocation } = req.params;
        const list = [];
        const schedules = await scheduleService.findMany({ agencyID })
        console.log(" length : ", schedules.length)
        for (var i = 0; i < schedules.length; i++) {
            console.log("compare : ", (schedules[i].routeID.startLocation === startLocation) && (schedules[i].routeID.stopLocation === stopLocation))
            if (schedules[i].routeID.startLocation === startLocation && schedules[i].routeID.stopLocation === stopLocation) {
                list.push(schedules[i])
            }
        }
        console.log("lenth list", list.length)
        return res.status(200).json(list);
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
        console.log("da vao day")
        const { scheduleID } = req.params
        console.log("schedule ID : ", scheduleID)
        const schedule = await scheduleService.findOne({
            _id: scheduleID
        })

        console.log("schedule : ", schedule)

        return res.status(200).json(schedule)
    } catch (error) {
        checkError(error, res)
    }
}

async function updateSchedule(req, res) {
    try {
        const { scheduleID } = req.params
        const { busID, date } = req.body
        let data = {}
        if (busID) {
            data.busID = busID
        }
        if (date) {
            data.date = date
        }

        const list_schedule = await scheduleService.findMany({})
        for (var i = 0; i < list_schedule.length; i++) {
            if (list_schedule[i].busID == busID && list_schedule[i].date == date) {
                throw {
                    code: 400,
                    name: 'Already Exis'
                }
            }
        }

        const scheduleUpdate = await scheduleService.update(scheduleID, data)

        return res.status(200).json(scheduleUpdate)
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
    findAllScheduleOfAgency,
    updateSchedule,
    findScheduleOfAgencyRoute
}