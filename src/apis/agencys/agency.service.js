import AgencyModel from './agency.model'
import error from '../../constants/error'
import UserService from '../users/user.service'
const userService = new UserService()

class AgencyService {
    async CreateOne(data) {
        try {
            const newAgency = await new AgencyModel(data)
            await newAgency.save()
            return newAgency
        } catch (error) {
            throw error
        }
    }

    async findAll() {
        try {
            const agencys = AgencyModel.find().populate('author').limit(20)
            if (!agencys) {
                throw {
                    code: 404,
                    name: 'NotFoundAgency'
                }
            }
            return agencys
        } catch (error) {
            throw error
        }
    }

    async findOne(query) {
        try {
            const agency = await AgencyModel.findOne(query).populate('author')
            if (!agency) {
                throw {
                    code: 404,
                    name: 'NotFoundAgency'
                }
            }
            return agency
        } catch (error) {
            throw error
        }
    }

    async findMany(query) {
        try {
            const agencys = await AgencyModel.find(query)
            if (!agency) {
                throw {
                    code: 404,
                    name: 'NotFoundAgency'
                }
            }
            return agencys
        } catch (error) {
            throw error
        }
    }

    async delete(query) {
        try {
            const agency = AgencyModel.findOne(query)
            if (!agency) {
                throw {
                    code: 404,
                    name: 'NotFoundAgency'
                }
            }

            await AgencyModel.remove(agency)
            return true
        } catch (error) {
            throw error
        }
    }


    async update(id, data) {
        try {
            const agency = await AgencyModel.findById(id)
            if (!agency) {
                throw {
                    code: 404,
                    name: 'NotFoundAgency'
                }
            }

            console.log(agency)

            const agencyUpdate = await AgencyModel.updateOne({ _id: id }, data)

            return agencyUpdate
        } catch (error) {
            throw error
        }
    }
}

export default AgencyService