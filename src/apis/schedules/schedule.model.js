import { date } from 'joi'
import mongose, { model, Schema, Types } from 'mongoose'

const scheduleSchema = new Schema({
    date: {
        type: String,
        required: true,
    },
    busID:{
        type: Types.ObjectId,
        required: true,
        ref: 'buses'
    },
    agencyID:{
        type: Types.ObjectId,
        required : true,
        ref : 'agencys'
    }
})

export default model('schedules' , scheduleSchema)