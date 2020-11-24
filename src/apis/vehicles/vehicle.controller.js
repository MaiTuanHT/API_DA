import VehicleService from './vehicle.service'

import checkError from '../../helpers/checkError'


const vehicleService = new VehicleService()


async function createOneVehicle(req, res) {
    try {
        const data = req.body;
        if(!data.agencyID || data.agencyID == undefined || !data.licensePlate || data.licensePlate == undefined||
            !data.priceTicket || data.priceTicket == undefined){
            throw{
                code: 400,
                name: 'ErrorEmpty'
            }
        }
        const newVehicke = await vehicleService.CreateOne(data)
       return res.status(201).json(newVehicke)
    } catch (error) {
        checkError(error, res)
    }
}

async function findAllVehicle(req, res) {
    try {
        const vehicles = await vehicleService.findAll()
        console.log(vehicles);
        return res.status(200).json(vehicles);
    } catch (error) {
        checkError(error,res)
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

async function deleteVehicle(req , res) {
    try {
        const { vehicleID } = req.params
        await vehicleService.delete({_id: vehicleID})
        return res.status(200).json(true)
    } catch (error) {
        checkError(error, res)
    }
}


export default {
    createOneVehicle,
    findAllVehicle,
    findOneVehicle,
    deleteVehicle,
}