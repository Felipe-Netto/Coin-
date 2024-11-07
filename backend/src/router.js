const express = require('express');
const userController = require('./controllers/userController')
const categoryController = require('./controllers/categoriaController')
const lancamentoController = require('./controllers/lancamentoController')

const router = express.Router();

router.post('/user', userController.findUser);
router.post('/criar-usuario', userController.createUser);
router.post('/user/token', userController.findUserByToken);
router.post('/find-user-by-id', userController.findUserById);

router.post('/adicionar-categoria', categoryController.addCategory);
router.get('/listar-categorias', categoryController.listCategories);

router.post('/adicionar-lancamento', lancamentoController.addTransaction);

module.exports = router;