const express = require('express');
const userController = require('./controllers/userController')

const router = express.Router();

router.post('/user', userController.findUser);
router.post('/criar-usuario', userController.createUser);
router.post('/user/token', userController.findUserByToken);

module.exports = router;