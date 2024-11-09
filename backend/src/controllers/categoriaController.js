const categoriaModel = require('../models/categoria');
const prisma = require('../../lib/prisma.js');

const addCategory = async (request, response) => {
    try {
        const { nome, descricao } = request.body;

        const existingCategory = await categoriaModel.findCategoryByName(nome);

        if (existingCategory) {
            return response.status(400).json({ message: 'Essa categoria ja existe' });
        }

        const category = await categoriaModel.addCategory(nome, descricao);

        return response.status(201).json(category);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

const listCategories = async (request, response) => {
    try {
        const { id_user } = request.params;

        const categories = await categoriaModel.listCategories(id_user);
        
        return response.status(200).json(categories);
    } catch (error) {
        console.log('Erro ao listar categorias: ', error);
        return response.status(500).json({ error: error.message });
    }
}

const listTopCategories = async (request, response) => {
    try {
        const { id_user } = request.query;
        const categories = await categoriaModel.listTopCategories(4, id_user);
        
        return response.status(200).json(categories);
    } catch (error) {
        console.log('Erro ao listar categorias: ', error);
        return response.status(500).json({ error: error.message });
    }
}

module.exports = {
    addCategory,
    listCategories,
    listTopCategories
}