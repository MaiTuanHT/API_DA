const badRequestError = {
    EmailInvalid:  'Email is invalid',
    MissingEmail: 'Email can not be empty !',
    MissingPassword: 'Password can not be empty !',
    EmailAlreadyExist: 'Email is already exist',
    ValidateErorr: 'Validate Erorr',
    EmptyEmailOrPassword: 'username or password can not be empty',
    InvalidPassword : 'Invalid password',

    ErrorEmpty: 'Error Empty'
}

const notFoundError = {
    UserNotFound: 'User Not Found',
    RoleNotFound: 'Role not found',

    AgencyNotFound: 'Agency not found',
    VehicleNotFound: 'Vehicle not found',
    TicketNotFound: 'Ticket not found',
    RouteNotFound: 'Route not found',
    BusNotFound: 'Bus not found',
    RateNotFound: 'Rate not found',
}



export default {
    badRequestError,
    notFoundError,
}