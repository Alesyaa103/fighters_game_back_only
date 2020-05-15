const {
    fighter
} = require('../models/fighter');
const {
    checkOnExtraParam,
    checkRequiredParam,
    checkOnParamType
} = require('../helpers/validation.helper')

const fighterValidation = (fighterData, fighter) => {
    const {
        id,
        ...allParams
    } = fighter
    if (!checkOnExtraParam(fighterData, allParams)) {
        return {
            status: 400,
            message: 'Check fighter on extra credentials'
        }
    }
    if (!checkOnParamType(fighterData, fighter)) {
        return {
            status: 400,
            message: 'Invalid type of value'
        }
    }
    if (fighterData.power > fighter.health || fighterData.power <= 0) {
        return {
            status: 400,
            message: 'Health can not be higher than 100 and lower than 0'
        }
    }
    return {
        status: 200
    }
}

const createFighterValid = (req, res, next) => {
    const fighterData = req.body
    const {
        health: fighterHealth,
        ...requiredParamsFighter
    } = fighterData
    const {
        id,
        health,
        ...requiredParamsSchema
    } = fighter
    try {
        if (!checkRequiredParam(requiredParamsFighter, requiredParamsSchema)) {
            throw ({
                status: 400,
                message: 'Check fighter on missing credentials'
            })
        }
        const validationErrors = fighterValidation(fighterData, fighter);
        if (validationErrors.status !== 200) {
            throw (validationErrors)
        }
        if (!fighterHealth) {
            req.body["health"] = fighter.health;
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

const updateFighterValid = (req, res, next) => {
    const fighterData = req.body
    const {
        health: fighterHealth,
        ...requiredParamsFighter
    } = fighterData
    const {
        id,
        ...allParams
    } = fighter
    const {
        health,
        ...requiredParamsSchema
    } = allParams

    try {
        const validationErrors = fighterValidation(fighterData, fighter);
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

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;