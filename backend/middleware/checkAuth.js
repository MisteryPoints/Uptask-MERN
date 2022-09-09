const checkAuth = (req, res, next) => {
    console.log(req.headers.authorization)

    next()
}

export default checkAuth