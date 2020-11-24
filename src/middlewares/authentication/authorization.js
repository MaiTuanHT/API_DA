import RoleService from '../../apis/roles/role.service'

const authorizate = (scope) => {
    const roleService = new RoleService()

    return (req, res, next) => {
        try {
            const currentUser = req.user

        if (!currentUser) {
            return res.status(401).json({
                code: 401,
                name: 'UnAuthorization'
            })
        }

        const { _id: userID } = currentUser

        roleService.findMany({userID}).then(roleUser => {
            if(!roleUser || !roleUser.length){
                return res.status(401).json({
                    code: 401,
                    name: 'UnAuthorization'
                })
            }

    
            roleUser.forEach(element => {
                console.log(element)
                if(element.roleName && element.roleName === scope) {
                     next()
                }
            });
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
}

export default authorizate