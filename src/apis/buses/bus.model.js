import mongose, { model, Schema, Types } from 'mongoose'

const busSchema = new Schema({
    routeID: {
        type: Types.ObjectId,
        ref: 'routes',
        required: true,
    },
    agencyID:{
        type: Types.ObjectId,
        ref: 'agencys',
        required: true
    },
    departureTime: {
        type: String,
        required: true
    }
})

export default model('buses' , busSchema)