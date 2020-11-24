import VehicleModel from './vehicle.model'
class VehicleService{
    async CreateOne(data) {
        try {
            const newVehicle = await new VehicleModel(data)
            await newVehicle.save()
            return newVehicle
        } catch (error) {
            throw error
        }
    }

    async findAll(){
        try {
            const vehicles = VehicleModel.find()
            if(!vehicles){
                throw {
                    code: 404,
                    name: 'NotFoundVehicle'
                }
            }
            return vehicles
        } catch (error) {
            throw error
        }
    }

    async findOne(query){
        try {
            const vehicle = VehicleModel.findOne(query)
            if(!vehicle){
                throw{
                    code: 404,
                    name: 'NotFoundVehicle'
                }
            }
            return vehicle
        } catch (error) {
            throw error
        }
    }

    async delete(query){
        try {
            const vehicle = VehicleModel.findOne(query)
            if(!vehicle){
                throw{
                    code: 404,
                    name: 'NotFoundVehicle'
                }
            }
           
            await VehicleModel.remove(vehicle)
            return true
        } catch (error) {
            throw error
        }
    }


    async update(id , data){
       try {
           const vehicle = await VehicleModel.findById(id)
           if(!vehicle){
               throw{
                   code: 404,
                   name: 'NotFoundVehicle'
               }
           }
           const vehicleUpdate = await VehicleModel.save({
               ...vehicle,
               ...data,
           })

           return vehicleUpdate
       } catch (error) {
           throw error
       }
    }
}

export default VehicleService