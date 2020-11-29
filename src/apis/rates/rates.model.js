import { number } from 'joi'
import mongose, { model, Schema, Types } from 'mongoose'

const rateSchema = new Schema({
    userID: {
        type: Types.ObjectId,
        ref: 'users',
        required: true,
    },
    agencyID: {
        type: Types.ObjectId,
        ref: 'agencys',
        required: true,
    },
    quality: {
        type: Number,
        required: true
    },
    service: {
        type: Number,
        required: true
    },
    medium: {
        type: Number,
        required: true
    }
})

export default model('rates' , rateSchema)