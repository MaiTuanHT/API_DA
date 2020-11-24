import config from '../../configs/index'
import jwt from 'jsonwebtoken'
import UserService from '../../apis/users/user.service'
const userService = new UserService()

const authenticate = (req, res, next ) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1]

        if (!accessToken) {
            return res.status(401).json({
                code: 401,
                name: 'UnAuthorization',
            })
        }

        const payload = jwt.verify(accessToken, config.jwt_secret)

        userService.findOne({
            _id: payload.userID
        }).then(user => {
            if (!user) {
                return res.status(401).json({
                    code: 401,
                    name: 'UnAuthorization',
                }) 
            }
    
            req.user = user
    
            return next()
        }).catch(error => {
            return res.status(401).json({
                code: 401,
                name: 'UnAuthorization',
                error
            }) 
        })
    } catch (error) {
        return res.status(401).json({
            code: 401,
            name: 'UnAuthorization'
        })
    }
}

export default authenticate