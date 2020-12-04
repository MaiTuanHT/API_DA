import { date } from 'joi'
import mongose, { model, Schema, Types } from 'mongoose'

const scheduleSchema = new Schema({
    date: {
        type: String,
        required: true,
    },
    busID: {
        type: Types.ObjectId,
        required: true,
        ref: 'buses'
    },
    agencyID: {
        type: Types.ObjectId,
        required: true,
        ref: 'agencys'
    },
    routeID: {
        type: Types.ObjectId,
        required: true,
        ref: 'routes'
    },
    booked: {
        type: Number,
        default: 0
    }
})

export default model('schedules', scheduleSchema)