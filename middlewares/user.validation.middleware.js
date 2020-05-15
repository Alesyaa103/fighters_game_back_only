const {
    user
} = require('../models/user');
const {
    checkOnExtraParam,
    checkRequiredParam,
    checkOnParamType
} = require('../helpers/validation.helper')
const phoneNumberRegex = new RegExp(/^[0-9]{9}$/)

const userValidation = (userData, allParams) => {
    const {
        email,
        phoneNumber,
        password
    } = userData
    if (!checkOnExtraParam(userData, allParams)) {
        return {
            status: 400,
            message: 'Check fighter on extra credentials'
        }
    }
    if (!checkOnParamType(userData, allParams)) {
        return {
            status: 400,
            message: 'Invalid type of value'
        }
    }
    if (email.indexOf("@gmail.com") <= 0) {
        return {
            status: 400,
            message: 'Add valid email with pattern gmail'
        }
    }
    if (phoneNumber.indexOf("+380") !== 0) {
        return {
            status: 400,
            message: 'Phone number witch begins with +380'
        }
    }
    if (phoneNumber.length !== 13) {
        return {
            status: 400,
            message: 'Phone number must contain 12 numbers'
        }
    }
    if (!phoneNumberRegex.test(phoneNumber.split("+380")[1])) {
        return {
            status: 400,
            message: 'Enter valid phone number'
        }
    }

    if (password.length < 3) {
        return {
            status: 400,
            message: 'Password must include more than 3 symbols'
        }
    }
    return {
        status: 200
    }
}
const createUserValid = (req, res, next) => {
    const userData = req.body;
    const {
        id,
        ...allParams
    } = user;
    try {
        if (!checkRequiredParam(allParams, userData)) {
            throw ({
                status: 400,
                message: 'Check fighter on missing credentials'
            })
        }
        const validationErrors = userValidation(userData, allParams)
        if (validationErrors.status !== 200) {
            throw (validationErrors)
        }
        next()
    } catch (err) {
        return res.status(err.status)
            .json({
                error: true,
                message: err.message,
            });
    }
}

const updateUserValid = (req, res, next) => {
    const userData = req.body;
    const {
        id,
        ...allParams
    } = user;
    try {
        const validationErrors = userValidation(userData, allParams)
        if (validationErrors.status !== 200) {
            throw (validationErrors)
        }
        next()
    } catch (err) {
        return res.status(err.status)
            .json({
                error: true,
                message: err.message,
            });
    }
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;