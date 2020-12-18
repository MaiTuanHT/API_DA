import mongose, { model, Schema, Types } from 'mongoose'

const imageSchema = new Schema({
    name: {
        type: String,
    },
    image_path: {
        type: String
    },
    agencyID: {
        type: Types.ObjectId,
        ref: 'agencys'
    }
})

export default model('images', imageSchema)