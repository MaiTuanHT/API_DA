import UserService from './user.service'
import checkError from '../../helpers/checkError'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../configs/index'
import error from '../../constants/error'
import roleControler from '../roles/role.controller'

const userService = new UserService()

async function createOneUser(req, res) {
    try {
        const {fullName , email , password , phoneNumber } = req.body
        // console.log(req.body)
        if(!fullName || !email || !password || ! phoneNumber){
            throw {
                code : 400 ,
                name : 'ValidateErorr'
            }
        }
       const checkEmail = await userService.checkEmail(email)
       console.log(checkEmail)
       if(checkEmail == undefined){
           checkError(error ,res)
       }
       if(checkEmail){
           console.log("Email da ton tai")
           throw{
               code : 400,
               name : 'EmailAlreadyExist'
           }
       }
        const hash = bcrypt.hashSync(password,10)
        const data = {
            fullName: fullName ,
            email: email ,
            password: hash,
            phoneNumber : phoneNumber
       }

       const newUser = await userService.createOne(data)
        if(newUser){
            const userID = newUser._id
            const roleName = 'Staff'
            const {agencyID} = req.body
            const role = {userID , roleName , agencyID}
            roleControler.createOneRole(role, res)
        }

       return res.status(201).json(newUser)
    } catch (error) {
        checkError(error, res)
    }
}

async function singUp(req , res) {
    try {
        const {fullName , email , password , phoneNumber} = req.body
        console.log(req.body)
        if(!fullName || !email || !password || ! phoneNumber){
            throw {
                code : 400 ,
                name : 'ValidateErorr'
            }
        }
       const checkEmail = await userService.checkEmail(email)
       console.log(checkEmail)
       if(checkEmail == undefined){
           checkError(error ,res)
       }
       if(checkEmail){
           console.log("Email da ton tai")
           throw{
               code : 400,
               name : 'EmailAlreadyExist'
           }
       }
        const hash = bcrypt.hashSync(password,10)
        const data = {
            fullName: fullName ,
            email: email ,
            password: hash,
            phoneNumber : phoneNumber
       }

       const newUser = await userService.createOne(data)
        if(newUser){
            const userID = newUser._id
            const roleName = 'Client'
            const role = {userID , roleName}
            roleControler.createOneRole(role, res)
        }

       return res.status(201).json(newUser)

    } catch (error) {
        checkError(error, res)
    }
}

async function signIn(req , res) {
    try {
        const { email , password} = req.body
        // console.log(req.body)

        if(!email || !password){
            throw {
                code : 400,
                name : 'EmptyEmailOrPassword'
            }
        }
        const user = await userService.findOne({
            email
        })

        if (!user) {
            throw {
                code: 400,
                name: 'EmailIsNotExist'
            }
        }
        const isCorectPassword = await bcrypt.compare(password , user.password)

        if(!isCorectPassword){
            throw {
                code : 400,
                name : 'InvalidPassword'
            }
        }

        const payload = {
            userID: user._id,
            fullName: user.fullName,
            email: user.email,
            // userPassword: user.password,
        }

        const accessToken = await jwt.sign(payload, config.jwt_secret , {expiresIn: '30d'})
        return res.status(200).json({
            message : 'login succesfully',
            accessToken : accessToken
        })
    } catch (error) {
        checkError(error, res)
    }
}


async function findAllUser(req, res) {
    try {
        const users = await userService.findAllUser()
        //console.log(users);
        return res.status(200).json(users);
    } catch (error) {
        checkError(error,res)
    }
}

async function findOneUser(req, res) {
    try {
        const { userID } = req.params
        //console.log(staffID)
        const user = await userService.findOne({
            _id: userID
        })
        return res.status(200).json(user)
    } catch (error) {
        checkError(error, res)
    }
}

async function deleteUser(req , res) {
    try {
        const { userID } = req.params
        await userService.delete(userID)
        return res.status(200).json(true)
    } catch (error) {
        checkError(error, res)
    }
}


export default {
    createOneUser,
    findAllUser,
    findOneUser,
    deleteUser,
    singUp,
    signIn,
    //signOut
}