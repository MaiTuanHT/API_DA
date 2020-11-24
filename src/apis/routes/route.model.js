import mongose, { model, Schema, Types } from 'mongoose'

const routeSchema = new Schema({
    agencyID:{
        type: Types.ObjectId,
        ref: 'agencys',
        required: true
    },
    startLocation: {
        type: String,
        required: true,
    },
    stopLocation: {
        type: String,
        required: true,
    },
})

export default model('routes' , routeSchema)