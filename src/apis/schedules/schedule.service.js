import ScheduleModel from './schedule.model'
import error from '../../constants/error'
import UserService from '../users/user.service'
const userService = new UserService()

class ScheduleService{
    async CreateOne(data) {
        try {
            const newSchedule = await new ScheduleModel(data)
            await newSchedule.save()
            return newSchedule
        } catch (error) {
            throw error
        }
    }

    async findAll(){
        try {
            const schedules = ScheduleModel.find().limit(20).populate('vehicleID', 'busID')
            if(!schedules){
                throw {
                    code: 404,
                    name: 'NotFoundSchedule'
                }
            }
            return schedules
        } catch (error) {
            throw error
        }
    }

    async findMany(query){
        try {
            console.log(query)
            // const schedules = await ScheduleModel.find(query).populate({
            //     path: 'busID',
            //     populate: {
            //         path: 'agencyID',
            //         model: 'agencys'
            //     },
                
            // }).populate({
            //     path: 'busID',
            //     populate: {
            //         path: 'routeID',
            //         model: 'routes'
            //     },
            // })

             const schedules = await ScheduleModel.find(query).populate('agencyID').populate('routeID').populate('busID')

            if(!schedules){
                throw {
                    code: 404,
                    name: 'NotFoundSchedule'
                }
            }
            return schedules
        } catch (error) {
            throw error
        }
    }

    async findOne(query){
        try {
            const schedule = await ScheduleModel.findOne(query).populate('agencyID').populate('routeID').populate('busID')
            if(!schedule){
                throw{
                    code: 404,
                    name: 'NotFoundSchedule'
                }
            }

            return schedule
        } catch (error) {
            throw error
        }
    }

    async delete(query){
        try {
            const schedule = ScheduleModel.findOne(query)
            if(!schedule){
                throw{
                    code: 404,
                    name: 'NotFoundSchedule'
                }
            }
           
            await ScheduleModel.remove(schedule)
            return true
        } catch (error) {
            throw error
        }
    }


    async update(id , data){
       try {
           const schedule = await ScheduleModel.findById(id)
           if(!schedule){
               throw{
                   code: 404,
                   name: 'NotFoundSchedule'
               }
           }
           const scheduleUpdate = await ScheduleModel.save({
               ...schedule,
               ...data,
           })

           return scheduleUpdate
       } catch (error) {
           throw error
       }
    }
}

export default ScheduleService