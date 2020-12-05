import UserService from './user.service'
import checkError from '../../helpers/checkError'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../configs/index'
import error from '../../constants/error'
import roleControler from '../roles/role.controller'
import RoleService from '../roles/role.service'

const userService = new UserService()
const roleService = new RoleService()

async function createOneUser(req, res) {
    try {
        const { user } = req
        if (!user) {
            throw {
                code: 401,
                name: 'UnAuthorization'
            }
        }
        const role = await roleService.findOne({ userID: user._id, roleName: "Manager" })
        if (!role || role == undefined || role == null) {
            throw {
                code: 401,
                name: 'NotFound'
            }
        }

        const { fullName, email, password, phoneNumber } = req.body
        if (!fullName || !email || !password || !phoneNumber) {
            throw {
                code: 400,
                name: 'ValidateErorr'
            }
        }
        const checkEmail = await userService.checkEmail(email)
        if (checkEmail == undefined) {
            checkError(error, res)
        }
        if (checkEmail) {
            throw {
                code: 400,
                name: 'EmailAlreadyExist'
            }
        }
        const hash = bcrypt.hashSync(password, 10)
        const data = {
            fullName: fullName,
            email: email,
            password: hash,
            phoneNumber: phoneNumber,
            agencyID: role.agencyID
        }

        const newUser = await userService.createOne(data)

        if (!newUser || newUser == undefined || newUser == null) {
            throw {
                name: 'NotCreate'
            }
        }
        const userID = newUser._id
        const roleName = 'Staff'
        const agencyID = role.agencyID
        const newrole = { userID, agencyID, roleName }
        await roleControler.createOneRole(newrole, res)

        console.log("new user : ", newUser)
        return res.status(201).json(newUser)

    } catch (error) {
        checkError(error, res)
    }
}

async function singUp(req, res) {
    try {
        const { fullName, email, password, phoneNumber } = req.body

        if (!fullName || !email || !password || !phoneNumber) {
            throw {
                code: 400,
                name: 'ValidateErorr'
            }
        }
        const checkEmail = await userService.checkEmail(email)

        if (checkEmail == undefined) {
            checkError(error, res)
        }
        if (checkEmail) {
            throw {
                code: 400,
                name: 'EmailAlreadyExist'
            }
        }
        const hash = bcrypt.hashSync(password, 10)
        const data = {
            fullName: fullName,
            email: email,
            password: hash,
            phoneNumber: phoneNumber
        }

        const newUser = await userService.createOne(data)
        if (newUser) {
            const userID = newUser._id
            const roleName = 'Client'
            const role = { userID, roleName }
            roleControler.createOneRole(role, res)
        }

        return res.status(201).json(newUser)

    } catch (error) {
        checkError(error, res)
    }
}

async function signIn(req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            throw {
                code: 400,
                name: 'EmptyEmailOrPassword'
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
        const isCorectPassword = await bcrypt.compare(password, user.password)

        if (!isCorectPassword) {
            throw {
                code: 400,
                name: 'InvalidPassword'
            }
        }
        const payload = {
            userID: user._id,
            fullName: user.fullName,
            email: user.email,
        }

        const accessToken = await jwt.sign(payload, config.jwt_secret, { expiresIn: '30d' })
        return res.status(200).json({
            message: 'login succesfully',
            accessToken: accessToken
        })
    } catch (error) {
        checkError(error, res)
    }
}


async function findAllUser(req, res) {
    try {
        const users = await userService.findAllUser()

        return res.status(200).json(users);
    } catch (error) {
        checkError(error, res)
    }
}

async function findUserOfAgency(req, res) {
    try {
        const { user } = req
        const role = await roleService.findOne({ userID: user._id, roleName: 'Manager' })

        const staffs = await userService.findMany({ agencyID: role.agencyID })
        console.log(staffs)
        return res.status(200).json(staffs);
    } catch (error) {
        checkError(error, res)
    }
}

async function findOneUser(req, res) {
    try {
        const { userID } = req.params
        const user = await userService.findOne({
            _id: userID
        })
        return res.status(200).json(user)
    } catch (error) {
        checkError(error, res)
    }
}

async function deleteUser(req, res) {
    try {
        const { userID } = req.params
        const roles = await roleService.findMany({ userID })
        let checkManager = false
        roles.forEach(role => {
            if (role.roleName == "Manager") {
                checkManager = true
            }
        });

        if (checkManager) {
            throw {
                code: 400,
                name: "Không được xóa Manager"
            }
        } else {
            console.log("vao dell")
            await userService.delete({ _id: userID })
            await roleService.delete({ userID })
            return res.status(200).json(true)
        }
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
    findUserOfAgency,
    //signOut
}