import { object, string } from 'joi'
import { Schema, model, Types, models, objectId } from 'mongoose'

const roleSchema = new Schema({
    userID: {
        type: Types.ObjectId,
        ref: 'users',
        require: true
    },
    agencyID: {
        type: Types.ObjectId,
        ref: 'agencys'
    },
    roleName: {
        type: String,
        required: true,
    },
})
export default model('roles', roleSchema)