import RateService from './rates.service'

import checkError from '../../helpers/checkError'

import AgencyService from '../agencys/agency.service'

import AgencyController from '../agencys/agency.controller'
import agencyController from '../agencys/agency.controller'


const rateService = new RateService()
const agencyService = new AgencyService()


async function createOneRate(req, res) {
    try {
        const { quality, service, agencyID, userID } = req.body;
        if (!quality || quality == undefined || !service || service == undefined ||
            !agencyID || agencyID == undefined || !userID || userID == undefined) {
            throw {
                code: 400,
                name: 'ErrorEmpty'
            }
        }
        const listRate = await rateService.findMany({})
        let checkRate;
        for (var i = 0; i < listRate.length; i++) {
            if (listRate[i].agencyID == agencyID && listRate[i].userID == userID) {
                checkRate = listRate[i]
                break
            }
        }
        if (checkRate) {
            const dataUpdate = {
                quality,
                service,
                medium: (service + quality) / 2
            }

            const result = await rateService.update(checkRate._id, dataUpdate)

            const rateUpdate = await rateService.findOne({ _id: checkRate._id })

            const agency = await agencyService.findOne({ _id: agencyID })

            const dataAgency = {
                scoreRate: (((agency.scoreRate * agency.totalRate + rateUpdate.medium - checkRate.medium) / agency.totalRate).toPrecision(2))
            }

            const agencyUpdate = await agencyService.update(agencyID, dataAgency)
            return res.status(201).json(rateUpdate)
        } else {
            console.log("vao else")
            const data = {
                quality,
                service,
                agencyID,
                userID,
                medium: (service + quality) / 2
            }
            const newRate = await rateService.CreateOne(data)

            const agency = await agencyService.findOne({ _id: agencyID })

            const newRateAgency = {
                scoreRate: (((agency.scoreRate * agency.totalRate + newRate.medium) / (agency.totalRate + 1)).toPrecision(2)),
                totalRate: agency.totalRate + 1
            }
            const agencyUpdate = await agencyService.update(agencyID, newRateAgency)
            return res.status(201).json(newRate)
        }
    } catch (error) {
        checkError(error, res)
    }
}

async function rateAgency(req, res) {
    try {
        const { agencyID } = req.query
        console.log(agencyID)
        if (!agencyID || agencyID == undefined) {
            throw {
                code: 400,
                name: 'ErrorEmpty'
            }
        }

        const listRateAgency = await rateService.findMany({ agencyID })
        let rate = 0;
        for (let i = 0; i < listRateAgency.length; i++) {
            rate += listRateAgency[i].medium
        }
        if (listRateAgency.length == 0) {
            rate = 5;
        } else {
            rate /= listRateAgency.length
        }

        const data = {
            rate,
            numberReview: listRateAgency.length
        }
        return res.status(200).json(data);
    } catch (error) {
        checkError(error, res)
    }
}

async function findAllRate(req, res) {
    try {
        const rates = await rateService.findMany({})
        console.log(rates);
        return res.status(200).json(rates);
    } catch (error) {
        checkError(error, res)
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

async function deleteRate(req, res) {
    try {
        const { rateID } = req.params
        await rateService.delete({ _id: rateID })
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
    rateAgency
}