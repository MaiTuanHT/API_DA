import { boolean } from 'joi'
import { model, Schema, Types } from 'mongoose'

const ticketSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    scheduleID: {
        type: Types.ObjectId,
        ref: 'schedules',
        required: true,
    }
})

export default model('tickets', ticketSchema)