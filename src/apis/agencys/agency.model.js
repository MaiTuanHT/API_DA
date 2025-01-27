import mongose, { model, Schema, Types } from 'mongoose'

const agencySchema = new Schema({
    nameAgency: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    author: {
        type: Types.ObjectId,
        ref: 'users',
        required: true,
    },
    discription: {
        type: String,
        required: false
    },
    policy: {
        type: String,
        required: false
    },
    utilities: {
        type: String,
        required: false
    },
    ticketPaymentDealine: {
        type: Number,
        required: false
    },
    scoreRate: {
        type: Number,
        default: 0
    },
    totalRate: {
        type: Number,
        default: 0
    }
})

export default model('agencys', agencySchema)