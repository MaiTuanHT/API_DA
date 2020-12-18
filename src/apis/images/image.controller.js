import ImageService from './image.service'
import UserService from '../users/user.service'

import multer from 'multer'
import path from 'path'
import fileType from 'file-type'
import { ContextBuilder } from 'express-validator/src/context-builder'

const imageService = new ImageService()
const userService = new UserService()


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PATH);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

let upload = multer({
    storage: storage
});


async function CreateImage(req, res) {


    console.log("da vao tao anh")

    try {
        const { user } = req

        if (!user) {
            throw {
                code: 401,
                name: "Unauthorazation"
            }
        }

        const userAgency = await userService.findOne({ _id: user._id })

        upload.single(image)
        console("file : ", req.file)
        const data = {
            name: images,
            image_path,
            agencyID: userAgency.agencyID
        }

        const image = await imageService.CreateOne(data)
        return image

    } catch (error) {
        throw error
    }
}

export default {
    CreateImage
}