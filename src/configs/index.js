import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config()

const nodeEnv = process.env.NODE_ENV
let fileName = ''

if (nodeEnv === 'local' || !nodeEnv) {
    fileName = '.env'
}

if (nodeEnv === 'production' ) {
    fileName = '.prod.env'
}

const configData = dotenv.parse(fs.readFileSync(fileName))



const app = {
    database: `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
    host: process.env.HOST,
    port: process.env.PORT,
    jwt_secret: process.env.JWT_SECRET
}

console.log(app)

export default app
