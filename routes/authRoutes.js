const {
    Router
} = require('express');
const AuthService = require('../services/authService');
const {
    responseMiddleware
} = require('../middlewares/response.middleware');

const router = Router();

router.post('/login', (req, res, next) => {
    try {
        const data = req.body;
        const user = AuthService.login(data)
        if (!user) {
            throw ({
                message: "User was not found",
                status: 404
            })
        }
        res.data = user;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;