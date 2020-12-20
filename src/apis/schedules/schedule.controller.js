import ScheduleService from './schedule.service'
import BusService from '../buses/bus.service'

import checkError from '../../helpers/checkError'
import RoleService from '../roles/role.service'
import TicketService from '../tickets/ticket.service'

const roleService = new RoleService()
const scheduleService = new ScheduleService()
const busService = new BusService()
const ticketService = new TicketService()



async function createOneSchedule(req, res) {
    try {
        const { busID, date, price, vehicleID } = req.body
        if (!busID || busID == "" || !date || date == "" || !price || price == 0) {
            throw {
                code: 400,
                name: 'ErrorEmpty'
            }
        }
        const list_schedule = await scheduleService.findMany({})

        for (var i = 0; i < list_schedule.length; i++) {

            if (list_schedule[i].busID._id == busID && list_schedule[i].date == date) {
                throw {
                    code: 400,
                    name: 'Already Exis'
                }
            }
        }

        const bus = await busService.findOne({ _id: busID })
        let schedule = {
            busID: busID,
            agencyID: bus.agencyID,
            routeID: bus.routeID,
            date: date,
            price
        }
        if (vehicleID) {
            schedule.vehicleID = vehicleID
        }
        const newSchedule = await scheduleService.CreateOne(schedule)
        return res.status(201).json(newSchedule)
    } catch (error) {
        checkError(error, res)
    }
}

async function findAllSchedule(req, res) {
    try {

        var today = new Date()
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        console.log("Ngay : ", date)

        let listSchedule = []

        const schedules = await scheduleService.findMany({})

        schedules.forEach(schedule => {

            // console.log()

            if (schedule.date >= date) {
                listSchedule.push(schedule)
            }
        });

        console.log("length : ", listSchedule.length)
            // console.log(schedules);
        return res.status(200).json(listSchedule);
    } catch (error) {
        checkError(error, res)
    }
}

async function findAllScheduleForSearch(req, res) {
    try {
        const { stopLocation, startLocation, date } = req.query;
        const schedules = await scheduleService.findMany({})

        var today = new Date()
        var dateNow = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        let list = []
        if (schedules) {
            schedules.forEach(schedule => {
                if (schedule.routeID.startLocation == startLocation && schedule.routeID.stopLocation == stopLocation &&
                    schedule.date == date && schedule.date >= dateNow) {
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

        let listSchedule = []
        var today = new Date()
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        schedules.forEach(schedule => {
            if (schedule.date >= date) {
                listSchedule.push(schedule)
            }
        });
        console.log(schedules)
        return res.status(200).json(listSchedule);
    } catch (error) {
        checkError(error, res)
    }
}

async function findScheduleOfAgencyRoute(req, res) {
    try {
        var today = new Date()
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        console.log("da vao day")
        const { agencyID, startLocation, stopLocation } = req.params;
        const list = [];
        const schedules = await scheduleService.findMany({ agencyID })
        console.log(" length : ", schedules.length)
        for (var i = 0; i < schedules.length; i++) {
            console.log("compare : ", (schedules[i].routeID.startLocation === startLocation) && (schedules[i].routeID.stopLocation === stopLocation))
            if (schedules[i].routeID.startLocation === startLocation &&
                schedules[i].routeID.stopLocation === stopLocation && schedules[i].date >= date) {
                list.push(schedules[i])
            }
        }
        console.log("lenth list", list.length)
        return res.status(200).json(list);
    } catch (error) {
        checkError(error, res)
    }
}

async function findScheduleOfKey(req, res) {
    try {


        var today = new Date()
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


        const { key } = req.params
        const listSchedule = [];
        const schedules = await scheduleService.findMany({})

        for (var i = 0; i < schedules.length; i++) {
            let keyIn = schedules[i].routeID.startLocation + "-" + schedules[i].routeID.stopLocation
            if (keyIn == key && schedules[i].date >= date) {
                listSchedule.push(schedules[i])
            }
        }
        console.log("lenth list", listSchedule.length)
        return res.status(200).json(listSchedule);
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
        const routes = await scheduleService.findMany({ agencyID: role.agencyID })
        return res.status(200).json(routes);
    } catch (error) {
        checkError(error, res)
    }
}




async function findOneSchedule(req, res) {
    try {

        console.log("da vao tim kiem 1 lich trinh")

        const { scheduleID } = req.params
        console.log("schedule ID : ", scheduleID)
        const schedule = await scheduleService.findOne({
            _id: scheduleID
        })
        return res.status(200).json(schedule)
    } catch (error) {
        checkError(error, res)
    }
}

async function updateSchedule(req, res) {
    try {
        const { scheduleID } = req.params
        const { busID, date, price, vehicleID } = req.body
        let data = {}
        if (busID) {
            data.busID = busID
        }
        if (date) {
            data.date = date
        }
        if (price) {
            data.price = price
        }

        if (vehicleID) {
            data.vehicleID = vehicleID
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
        const schedule = await scheduleService.findOne({ _id: scheduleID })
        if (schedule && schedule.booked > 0) {
            throw {
                code: 400,
                name: "Bạn Không thể xóa lịch trình đã có người đặt vé"
            }
        }
        console.log("schedule id : ", scheduleID)
        await scheduleService.delete({ _id: scheduleID })
        await ticketService.deleteMany({ scheduleID: scheduleID })
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
    findScheduleOfAgencyRoute,
    findScheduleOfKey
}