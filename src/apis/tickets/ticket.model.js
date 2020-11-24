
import { boolean } from 'joi'
import{ model, Schema, Types } from 'mongoose'

const ticketSchema = new Schema({
    userID: {
        type: Types.ObjectId,
        ref: 'users',
        required: true
    },
    scheduleID:{
        type: Types.ObjectId,
        ref: 'schedules',
        required: true,
    },
    status:{
        type: String,
        default: "false",
    }
})

export default model('tickets' , ticketSchema)