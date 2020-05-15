const responseMiddleware = (req, res, next) => {
    if (res.err) {
        const {message, status} = res.err;
        return res.status(status).json({
            error: true,
            message
        })
    }
    return res.status(200).json(res.data)
}

exports.responseMiddleware = responseMiddleware;