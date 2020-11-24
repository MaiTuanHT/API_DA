import RoleService from './role.service'
import checkError from '../../helpers/checkError'
import error from '../../constants/error'
const roleService = new RoleService()

async function createOneRole(role, req , res) {
    try {
        if(!role || role == undefined){
            throw {
                code: 400,
                name: 'ErrorEmpty'
            }
        }
        console.log(role)
        const newRole = await roleService.createOne(role)
        console.log(newRole)
    } catch (error) {
        checkError(error, res)
    }
}


async function findAllRole(req, res) {
    try {
        const roles = await roleService.findAllRole()
        console.log(roles);
        return res.status(200).json(roles);
    } catch (error) {
        checkError(error,res)
    }
}

async function findAllRole(req, res) {
    try {
        const roles = await roleService.findAllRole()
        console.log(roles);
        return res.status(200).json(roles);
    } catch (error) {
        checkError(error,res)
    }
}



export default {
    createOneRole,
    findAllRole,
    findAllRole,
}