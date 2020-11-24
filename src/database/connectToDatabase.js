import { connect } from 'mongoose'

const connectToDatabase = async (connectString) => {
    try {
       const connection = await connect(connectString, { useNewUrlParser: true})
    } catch (error) {
        console.log(error)
    }
}

export default connectToDatabase