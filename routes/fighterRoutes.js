const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

router.post('/', createFighterValid, (req, res, next) => {
  const data = req.body;
  try {
    const fighter = FighterService.createFighter(data);
    if (!fighter) {
      throw ({
        message: "The same fighter already exist",
        status: 400
      })
    }
    res.data = fighter
  } catch (err) {
    res.err = err
  } finally {
    next();
  }
}, responseMiddleware);

router.get('/', (req, res, next) => {
  try {
    const fighters = FighterService.getAllFighters();
    if (!fighters) {
      throw ({
        message: "Nothig was found",
        status: 404
      })
    }
    res.data = fighters;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware)

router.get('/:id', (req, res, next) => {
  const {
    id
  } = req.params;
  try {
    const fighter = FighterService.search({
      id
    });
    if (!fighter) {
      throw ({
        message: "Nothig was found",
        status: 404
      })
    }
    res.data = fighter;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware)

router.delete('/:id', (req, res, next) => {
  const {
    id
  } = req.params;
  try {
    const fighter = FighterService.deleteFighter(id);
    if (!fighter) {
      throw ({
        message: "Could not delete fighter",
        status: 404
      })
    }
    res.data = "Fighter was deleted"
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware)

router.put('/:id', updateFighterValid, (req, res, next) => {
  const {
    id
  } = req.params;
  const data = req.body;
  try {
    const fighter = FighterService.updateFighter(id, data);
    if (!fighter) {
      throw ({
        message: "Fighter was not updated",
        status: 404
      })
    }
    res.data = fighter
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware)

module.exports = router;