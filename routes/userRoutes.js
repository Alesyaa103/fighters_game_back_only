const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.post('/', createUserValid, (req, res, next) => {
  const data = req.body;
  try {
    const user = UserService.createUser(data);
    if (!user) {
      throw ({
        message: "The same user already exist",
        status: 400
      })
    }
    res.data = user
  } catch (err) {
    res.err = err
  } finally {
    next();
  }
}, responseMiddleware);

router.get('/', (req, res, next) => {
  try {
    const users = UserService.getAllUsers();
    if (!users) {
      throw ({
        message: "Nothig was found",
        status: 404
      })
    }
    res.data = users;
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
    const user = UserService.search({
      id
    });
    if (!user) {
      throw ({
        message: "Nothig was found",
        status: 404
      })
    }
    res.data = user;
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
    const user = UserService.deleteUser(id);
    if (!user) {
      throw ({
        message: "Could not delete user",
        status: 404
      })
    }
    res.data = "User was deleted"
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware)

router.put('/:id', updateUserValid, (req, res, next) => {
  const {
    id
  } = req.params;
  const data = req.body;
  try {
    const isOriginal = UserService.isOriginalUser(id, data)
    if (!isOriginal) {
      throw ({
        message: "Email and phone number must be unique",
        status: 400
      })
    }
    const user = UserService.updateUser(id, data);
    if (!user) {
      throw ({
        message: "User was not found",
        status: 404
      })
    }
    res.data = user
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware)

module.exports = router;