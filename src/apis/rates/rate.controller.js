import RateService from './rates.service'

import checkError from '../../helpers/checkError'


const rateService = new RateService()


async function createOneRate(req, res) {
    try {
        const data = req.body;
        console.log(data)
        if(!data.userID || data.userID == undefined || !data.agencyID || data.agencyID == undefined
            || !data.score || data.score == undefined){
            throw{
                code: 400,
                name: 'ErrorEmpty'
            }
        }
        const newRate = await rateService.CreateOne(data)
       return res.status(201).json(newRate)
    } catch (error) {
        checkError(error, res)
    }
}

async function findAllRate(req, res) {
    try {
        const rates = await rateService.findAll()
        console.log(rates);
        return res.status(200).json(rates);
    } catch (error) {
        checkError(error,res)
    }
}

async function findOneRate(req, res) {
    try {
        const { rateID } = req.params
        const rate = await rateService.findOne({
            _id: rateID
        })
        return res.status(200).json(rate)
    } catch (error) {
        checkError(error, res)
    }
}

async function deleteRate(req , res) {
    try {
        const { rateID } = req.params
        await rateService.delete({_id: rateID})
        return res.status(200).json(true)
    } catch (error) {
        checkError(error, res)
    }
}


export default {
    createOneRate,
    findAllRate,
    findOneRate,
    deleteRate,
}