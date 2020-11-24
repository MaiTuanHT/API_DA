import ScheduleService from './schedule.service'
import BusService from '../buses/bus.service'

import checkError from '../../helpers/checkError'


const scheduleService = new ScheduleService()
const busService = new BusService()


async function createOneSchedule(req, res) {
    try {
        const data = req.body
        if(!data.date || data.date == undefined || !data.busID || data.busID == undefined){
            throw{
                code: 400,
                name: 'ErrorEmpty'
            }
        }

        const bus = await busService.findOne({_id: data.busID})
        const schedule = {
            busID: data.busID,
            agencyID: bus.agencyID,
            date : data.date
        }
        const newSchedule = await scheduleService.CreateOne(schedule)
       return res.status(201).json(newSchedule)
    } catch (error) {
        checkError(error, res)
    }
}

async function findAllSchedule(req, res) {
    try {
        const schedules = await scheduleService.findAll()
        console.log(schedules);
        return res.status(200).json(schedules);
    } catch (error) {
        checkError(error,res)
    }
}

async function findManySchedule(req, res) {
    try {
        // const {agencyID} = req.params;
        // console.log("id : "+ agencyID)
        const schedules = await scheduleService.findMany({agencyID: "5fbb1db537e7483b6877db09"})
        console.log(schedules);
        return res.status(200).json(schedules);
    } catch (error) {
        checkError(error,res)
    }
}

async function findOneSchedule(req, res) {
    try {
        const { scheduleID } = req.params
        const schedule = await scheduleService.findOne({
            _id: scheduleID
        })
        return res.status(200).json(schedule)
    } catch (error) {
        checkError(error, res)
    }
}

async function deleteSchedule(req , res) {
    try {
        const { scheduleID } = req.params
        await scheduleService.delete({_id: scheduleID})
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
}