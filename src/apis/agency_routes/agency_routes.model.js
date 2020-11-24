import { object } from 'joi'
import mongose, { model, Schema, Types } from 'mongoose'

const agency_route_Schema = new Schema({
    agencyID: {
        type: Types.ObjectId,
        ref: 'agencys',
        required: true,
    },
    routeID: {
        type: Types.ObjectId,
        ref: 'routes',
        required: true
    }
})

export default model('agency_routes' , agency_route_Schema)