const compareRoute = (router1, router2) => {
    if (router1.startLocation === router2.startLocation && router1.stopLocation === router2.stopLocation) {
        return true
    }
    return false
}

const checkIncludeRoute = (listRouter, router) => {
    return listRouter.some(each => compareRoute(each, router))
}

export default checkIncludeRoute