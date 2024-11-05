const lancamentoModel = require('../models/lancamento');
const prisma = require('../../lib/prisma.js');

const addTransaction = async (request, response) => {
    try {
        const { id_user, id_categoria, saida, valor } = request.body;

        const transaction = await lancamentoModel.addTransaction(id_user, id_categoria, saida, valor);

        return response.status(201).json(transaction);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}

module.exports = {
    addTransaction,
}