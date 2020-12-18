import ImageModel from './image.model'
const path = require('path')
const fileType = require('file-type')

class ImageService {
    async CreateOne(data) {
        try {
            const newImage = await new ImageModel(data)
            await newImage.save()
            return newImage
        } catch (error) {
            throw error
        }
    }


    async findOne(query) {
        try {
            const image = await ImageModel.findOne(query)
            if (!agenimagecy) {
                throw {
                    code: 404,
                    name: 'NotFound'
                }
            }
            return image
        } catch (error) {
            throw error
        }
    }

}

export default ImageService