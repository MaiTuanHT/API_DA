import AgencyRouteModel from './agency_routes.model'
import error from '../../constants/error'
import checkIncludeRoute from '../../helpers/checks'
// import UserService from '../users/user.service'
// const userService = new UserService()

class AgencyRouteService{
    async CreateOne(data) {
        try {
            const newAgencyRoute = await new AgencyRouteModel(data)
            await newAgencyRoute.save()
            return newAgencyRoute
        } catch (error) {
            throw error
        }
    }

    async findAll(){
        try {
            const agency_routes = await AgencyRouteModel.find().populate('agencyID').populate('routeID').limit(20)
            if(!agency_routes){
                throw {
                    code: 404,
                    name: 'NotFoundAgency'
                }
            }

            const expectData = {}

            const routeKeys = []

            agency_routes.forEach(each => {

                const routeKey = `${each.routeID.startLocation}-${each.routeID.stopLocation}`

                if (!routeKeys.includes(routeKey)) {
                    routeKeys.push(routeKey)
                    expectData[routeKey] = []
                }

                expectData[routeKey].push(each)
            })
            return expectData
        } catch (error) {
            throw error
        }
    }

    async findOne(query){
        try {
            const agency_route = await AgencyRouteModel.findOne(query).populate('agencyID')
            if(!agency_route){
                throw{
                    code: 404,
                    name: 'NotFoundAgency'
                }
            }
            return agency_route
        } catch (error) {
            throw error
        }
    }

    // async findAgencyFromRoute(query){
    //     try {
    //         const agencys = await (await AgencyRouteModel.find(query))
    //         if(!agency_route){
    //             throw{
    //                 code: 404,
    //                 name: 'NotFoundAgency'
    //             }
    //         }
    //         return agency_route
    //     } catch (error) {
    //         throw error
    //     }
    // }

   

    // async findMany(query){
    //     try {
    //         const agencys = await AgencyModel.find(query)
    //         if(!agency){
    //             throw{
    //                 code: 404,
    //                 name: 'NotFoundAgency'
    //             }
    //         }

    //         return agencys
    //     } catch (error) {
    //         throw error
    //     }
    // }

    async findMany(query){
        try {
            const agency_routes = await AgencyRouteModel.find(query).populate('agencyID').populate('routeID')
                    if(!agency_routes){
                        throw{
                            code: 404,
                            name: 'NotFoundAgency'
                        }
                    }
                    return agency_routes
        } catch (error) {
            throw error
        }
    }

    async groupAgencyOnRoute(){
        // try {
        //     const agency_routes = await AgencyRouteModel.find().populate('agencyID').populate('routeID')
            
        //     if(agency_routes){
        //         const groups = []
        //         // const key = agency_routes[0].routeID.starLocation + agency_routes[0].routeID.starLocation;

        //         // for(var i = 1 ; i < agency_routes.length ; i++){
        //         //     agency_routes[i].routeID.startLocation 
        //         // }
        //     }
        // } catch (error) {
        //     throw error
        // }
    }

    async delete(query){
        try {
            const agency_route = await AgencyRouteModel.findOne(query)
            if(!agency_route){
                throw{
                    code: 404,
                    name: 'NotFoundAgency'
                }
            }
           
            await AgencyRouteModel.remove(agency_route)
            return true
        } catch (error) {
            throw error
        }
    }


    // async update(id , data){
    //    try {
    //        const agency = await AgencyModel.findById(id)
    //        if(!agency){
    //            throw{
    //                code: 404,
    //                name: 'NotFoundAgency'
    //            }
    //        }
    //        const agencyUpdate = await AgencyModel.save({
    //            ...agency,
    //            ...data,
    //        })

    //        return agencyUpdate
    //    } catch (error) {
    //        throw error
    //    }
    // }
}

export default AgencyRouteService