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
    },
    orderNumber: {
        type: Number,
        require: true
    },
    status: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export default model('tickets', ticketSchema)