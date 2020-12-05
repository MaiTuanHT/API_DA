import RoleModel from './role.model'

class RoleService {
    async createOne(role) {
        try {
            const newRole = await new RoleModel(role)
            await newRole.save()
            return newRole
        } catch (error) {
            throw error
        }
    }

    async findOne(query) {
        try {
            const role = await RoleModel.findOne(query)
            if (!role) {
                throw {
                    code: 404,
                    name: 'RoleNotFound'
                }
            }
            return role
        } catch (error) {
            throw error
        }
    }


    async findAllRole() {
        try {
            const roles = await RoleModel.find()
            return roles
        } catch (error) {
            throw error
        }
    }

    async findMany(query) {
        try {
            const roles = await RoleModel.find(query).populate('userID')
            return roles
        } catch (error) {
            throw error
        }
    }
    async delete(query) {
        try {
            console.log("Vao delete role roi    ")
            const role = await RoleModel.findOne(query)

            console.log(role)

            if (!role) {
                throw {
                    code: 404,
                    name: 'RoleNotFound'
                }
            }
            await RoleModel.remove(role)
            return true
        } catch (error) {
            throw error
        }
    }

    async deleteMany(query) {
        try {
            await RoleModel.deleteMany(query)
        } catch (error) {
            throw error
        }
    }

}

export default RoleService