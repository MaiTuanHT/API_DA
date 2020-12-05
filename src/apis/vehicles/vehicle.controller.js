import VehicleService from './vehicle.service'

import checkError from '../../helpers/checkError'
import UserService from '../users/user.service'


const vehicleService = new VehicleService()
const userService = new UserService()


async function createOneVehicle(req, res) {
    try {
        const { user } = req

        const { licensePlate, numberSeat } = req.body

        const userAgency = await userService.findOne({ _id: user._id })
        if (!licensePlate || !numberSeat) {
            throw {
                code: 400,
                name: 'ErrorEmpty'
            }
        }

        const vehicles = await vehicleService.findMany({})

        let check = false
        vehicles.forEach(vehicle => {
            if (vehicle.licensePlate == licensePlate && vehicle.numberSeat == numberSeat) {
                check = true
            }
        });
        if (check) {
            throw {
                code: 401,
                name: "Already Exis"
            }
        } else {
            const data = {
                agencyID: userAgency.agencyID,
                licensePlate,
                numberSeat
            }
            const newVehicke = await vehicleService.CreateOne(data)
            return res.status(201).json(newVehicke)
        }
    } catch (error) {
        checkError(error, res)
    }
}

async function updateVehicle(req, res) {
    try {
        const { vehicleID } = req.params
        console.log("Vehicle update : ", vehicleID)
        const { licensePlate, numberSeat } = req.body
        console.log(licensePlate)
        let data = {}

        if (licensePlate) {
            data.licensePlate = licensePlate
        }

        if (numberSeat) {
            data.numberSeat = numberSeat
        }

        const vehicles = await vehicleService.findMany({})


        vehicles.forEach(vehicle => {
            if (vehicle.licensePlate == licensePlate && vehicle.numberSeat == numberSeat) {
                throw {
                    code: 400,
                    name: "Already Exis"
                }
            }
        });

        const vehicleUpdate = await vehicleService.update(vehicleID, data)

        return res.status(200).json(vehicleUpdate)

    } catch (error) {
        checkError(error, res)
    }
}

async function findVehicleOfAgency(req, res) {
    try {
        const { user } = req
        const userAgency = await userService.findOne({ _id: user._id })
        const vehicles = await vehicleService.findMany({ agencyID: userAgency.agencyID })
        return res.status(200).json(vehicles);
    } catch (error) {
        checkError(error, res)
    }
}

async function findOneVehicle(req, res) {
    try {
        const { vehicleID } = req.params
        const vehicle = await vehicleService.findOne({
            _id: vehicleID
        })
        return res.status(200).json(vehicle)
    } catch (error) {
        checkError(error, res)
    }
}

async function deleteVehicle(req, res) {
    try {
        const { vehicleID } = req.params
        await vehicleService.delete({ _id: vehicleID })
        return res.status(200).json(true)
    } catch (error) {
        checkError(error, res)
    }
}

export default {
    createOneVehicle,
    findVehicleOfAgency,
    findOneVehicle,
    deleteVehicle,
    updateVehicle
}