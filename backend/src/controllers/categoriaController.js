const categoriaModel = require('../models/categoria');
const prisma = require('../../lib/prisma.js');

const addCategory = async (request, response) => {
    try {
        const { nome, descricao } = request.body;

        const category = await categoriaModel.addCategory(nome, descricao);

        return response.status(201).json(category);
        console.log('Categoria adicionada: ', category);
    } catch (error) {
        console.log('Erro ao adicionar categoria: ', error);
        return response.status(500).json({ error: error.message });
    }
}

const listCategories = async (request, response) => {
    try {
        const categories = await categoriaModel.listCategories();
        
        console.log('Categorias listadas: ', categories);

        return response.status(200).json(categories);
    } catch (error) {
        console.log('Erro ao listar categorias: ', error);
        return response.status(500).json({ error: error.message });
    }
}

module.exports = {
    addCategory,
    listCategories
}