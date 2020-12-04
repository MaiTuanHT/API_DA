import BusModel from './bus.model'
class BusService {
    async CreateOne(data) {
        try {
            const newBus = await new BusModel(data)
            await newBus.save()
            return newBus
        } catch (error) {
            throw error
        }
    }

    async findMany(query) {
        try {
            const buses = BusModel.find(query).populate('routeID')
            if (!buses) {
                throw {
                    code: 404,
                    name: 'NotFoundBus'
                }
            }
            return buses
        } catch (error) {
            throw error
        }
    }

    async findOne(query) {
        try {
            const bus = (await BusModel.findOne(query)).populate('routeID')
            if (!bus) {
                throw {
                    code: 404,
                    name: 'NotFoundBus'
                }
            }
            return bus
        } catch (error) {
            throw error
        }
    }

    async delete(query) {
        try {
            const bus = BusModel.findOne(query)
            if (!bus) {
                throw {
                    code: 404,
                    name: 'NotFoundBus'
                }
            }

            await BusModel.remove(bus)
            return true
        } catch (error) {
            throw error
        }
    }

    async update(id, data) {
        try {
            const bus = await BusModel.findById(id)
            console.log("bus : ", bus)
            if (!bus) {
                throw {
                    code: 404,
                    name: 'NotFoundRoute'
                }
            }
            const busUpdate = await BusModel.updateOne({ _id: id }, data)
            return busUpdate
        } catch (error) {
            throw error
        }
    }


}

export default BusService