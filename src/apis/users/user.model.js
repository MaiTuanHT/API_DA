import { object } from 'joi'
import { Schema, model, Types, models, objectId } from 'mongoose'

const userSchema = new Schema({
    fullName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        default: null,
    },
    agencyID: {
        type: String
    }
})
export default model('users', userSchema)