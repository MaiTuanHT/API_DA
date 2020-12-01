import RoleService from './role.service'
import checkError from '../../helpers/checkError'
import error from '../../constants/error'
const roleService = new RoleService()

async function createOneRole(role, req, res) {
    try {
        if (!role || role == undefined) {
            throw {
                code: 400,
                name: 'ErrorEmpty'
            }
        }
        const newRole = await roleService.createOne(role)
        console.log("new role : ", newRole)
    } catch (error) {
        checkError(error, res)
    }
}


async function findAllRole(req, res) {
    try {
        const roles = await roleService.findAllRole()
        return res.status(200).json(roles);
    } catch (error) {
        checkError(error, res)
    }
}

async function findAllRole(req, res) {
    try {
        const roles = await roleService.findAllRole()
        return res.status(200).json(roles);
    } catch (error) {
        checkError(error, res)
    }
}



export default {
    createOneRole,
    findAllRole,
    findAllRole,
}