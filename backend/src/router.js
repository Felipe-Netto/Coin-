const express = require('express');
const userController = require('./controllers/userController')
const categoryController = require('./controllers/categoriaController')
const lancamentoController = require('./controllers/lancamentoController')
const metaController = require('./controllers/metaController')

const router = express.Router();

router.post('/user', userController.findUser);
router.post('/criar-usuario', userController.createUser);
router.post('/user/token', userController.findUserByToken);
router.post('/find-user-by-id', userController.findUserById);

router.post('/adicionar-categoria', categoryController.addCategory);
router.get('/listar-categorias/:id_user', categoryController.listCategories);
router.get('/listar-top-categorias', categoryController.listTopCategories);

router.post('/adicionar-lancamento', lancamentoController.addTransaction);
router.get('/total-gastos/:id_user', lancamentoController.totalGastos);

router.post('/adicionar-meta', metaController.addMeta);
router.get('/listar-metas/:id_user', metaController.listMetas);
router.delete('/deletar-meta/:id_meta', metaController.deleteMeta);

module.exports = router;