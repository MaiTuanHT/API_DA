import RouteModel from './route.model'
import error from '../../constants/error'

class RouteService{
    async CreateOne(data) {
        try {
            const newRoute = await new RouteModel(data)
            await newRoute.save()
            return newRoute
        } catch (error) {
            throw error
        }
    }

    async findManyAgency(query){
        try {
            const agencys = await RouteModel.find(query).select('agencyID').populate('agencyID')
            if(!agencys){
                throw {
                    code: 404,
                    name: 'NotFoundAgency'
                }
            }
            return agencys
        } catch (error) {
            throw error
        }
    }

    async findAll(){
        try {
            const routes = RouteModel.find().limit(20).populate('agencyID')
            if(!routes){
                throw {
                    code: 404,
                    name: 'NotFoundRoute'
                }
            }
            return routes
        } catch (error) {
            throw error
        }
    }

    async findOne(query){
        try {
            const route = await RouteModel.findOne(query).populate('agencyID')
            if(!route){
                throw{
                    code: 404,
                    name: 'NotFoundRoute'
                }
            }
            return route
        } catch (error) {
            throw error
        }
    }

    async delete(query){
        try {
            const route = RouteModel.findOne(query)
            if(!route){
                throw{
                    code: 404,
                    name: 'NotFoundRoute'
                }
            }
           
            await RouteModel.remove(route)
            return true
        } catch (error) {
            throw error
        }
    }


    async update(id , data){
       try {
           const route = await RouteModel.findById(id)
           if(!route){
               throw{
                   code: 404,
                   name: 'NotFoundRoute'
               }
           }
           const routeUpdate = await RouteModel.save({
               ...route,
               ...data,
           })

           return routeUpdate
       } catch (error) {
           throw error
       }
    }
}

export default RouteService