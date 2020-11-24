import errorConstants from '../constants/error'

function checkError (error, res) {
    console.log(error)
    if (error && error.code === 400) {
        return res.status(400).json({
            ...error,
            message: errorConstants.badRequestError[error.name],
        })
    }

    if (error && error.code === 404) {
        return res.status(404).json({
            ...error,
            message: errorConstants.notFoundError[error.name],
        })
    }

    if (!error || !error.code) {
        return res.status(500).json({
            code: 500,
            name: 'ServerError',
        })
    }

    return res.status(500).json({
        code: 500,
        name: 'ServerError',
    })
}

export default checkError