import RateModel from './rates.model'
class RateService {
    async CreateOne(data) {
        try {
            const newRate = await new RateModel(data)
            await newRate.save()
            return newRate
        } catch (error) {
            throw error
        }
    }

    async findMany(query) {
        try {
            const rates = RateModel.find(query)
            if (!rates) {
                throw {
                    code: 404,
                    name: 'NotFoundRate'
                }
            }
            return rates
        } catch (error) {
            throw error
        }
    }

    async findOne(query) {
        try {
            const rate = await RateModel.findOne(query).populate('agencyID').populate('userID')
            return rate
        } catch (error) {
            throw error
        }
    }

    async delete(query) {
        try {
            const rate = RateModel.findOne(query)
            if (!rate) {
                throw {
                    code: 404,
                    name: 'NotFoundRate'
                }
            }
            await RateModel.remove(rate)
            return true
        } catch (error) {
            throw error
        }
    }

    async deleteMany(query) {
        try {
            await RateModel.deleteMany(query)
            return true
        } catch (error) {
            throw error
        }
    }


    async update(id, data) {
        try {
            const rate = await RateModel.findById(id)
            if (!rate) {
                throw {
                    code: 404,
                    name: 'NotFoundRate'
                }
            }
            const rateUpdate = await RateModel.updateOne({ _id: id }, data)

            return rateUpdate
        } catch (error) {
            throw error
        }
    }
}

export default RateService