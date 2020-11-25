import express from 'express'
import config from './src/configs'
import http from 'http'
import connectToDatabase from './src/database/connectToDatabase'
import bodyParser from 'body-parser'
import cors from 'cors'
import api from './src/apis/router'
import ev from 'express-validation'


async function boostrapServer() {

       const app = express()
    await connectToDatabase(config.database)

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    app.use(api)
    app.use(cors())
    app.use(handleValidationError)

    app.listen(config.port, (error) => {
        if (error) {
            return console.log(error)
        }

        console.log(`our app is listening on port ${config.port}`)
    })
}


function handleValidationError(error, req, res, _) {
  if (error instanceof ev.ValidationError) {
    return res.status(error.status).json({
      code: error.status,
      message: error.errors[0].messages[0].split('"').join('').split('undefined').join('')
    })
  }
}

boostrapServer()