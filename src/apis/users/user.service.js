import UserModel from './user.model'

class UserService {


    async createOne(data) {
        try {
            const newUser = await new UserModel(data)
            await newUser.save()
            return newUser
        } catch (error) {
            throw error
        }
    }

    // async update(id,data){
    //     try {
    //         const staff = await StaffModel.findById(id)
    //         if (!staff) {
    //             throw {
    //                 code: 404,
    //                 name: 'StaffNotFound'
    //             }
    //         }
    //         const staffUpdate = await StaffModel.save({
    //             ...staff,
    //             ...data,
    //         })

    //         return staffUpdate
    //     } catch (error) {
    //         throw error
    //     }
    // }

    async findOne(query) {
        try {
            const user = await UserModel.findOne(query)
            if (!user) {
                throw {
                    code: 404,
                    name: 'UserNotFound'
                }
            }
            return user
        } catch (error) {
            throw error
        }
    }

    async findAllUser() {
        try {
            const users = await UserModel.find()
            return users
        } catch (error) {
            throw error
        }
    }

    async findMany(query) {
        try {
            const users = await UserModel.find(query)
            return users
        } catch (error) {
            throw error
        }
    }

    async checkEmail(email) {
        try {
            const user = await UserModel.findOne({ email: email });
            if (!user) {
                return false
            }
            return true
        } catch (error) {
            throw error
        }
    }


    async delete(id) {
        try {
            const user = await UserModel.findById(id)
            if (!staff) {
                throw {
                    code: 404,
                    name: 'UserNotFound'
                }
            }
            await UserModel.remove(user)
            return true
        } catch (error) {
            throw error
        }
    }
}

export default UserService