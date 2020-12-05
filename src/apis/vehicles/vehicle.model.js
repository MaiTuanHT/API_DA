import { number } from 'joi'
import mongose, { model, Schema, Types } from 'mongoose'

const vehicleSchema = new Schema({
    agencyID: {
        type: Types.ObjectId,
        ref: 'agencys',
        required: true,
    },
    licensePlate: {
        type: String,
        required: true
    },
    numberSeat: {
        type: Number,
        required: true,
    }
})

export default model('vehicles', vehicleSchema)