const lancamentoModel = require('../models/lancamento');
const prisma = require('../../lib/prisma.js');

const addTransaction = async (request, response) => {
    try {
        console.log(request.body);
        const { id_user, id_categoria, id_meta, saida, valor, descricao } = request.body;

        const transaction = await lancamentoModel.addTransaction(id_user, id_categoria, id_meta, saida, valor, descricao);

        return response.status(201).json(transaction);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}

const totalGastos = async (request, response) => {
    try {
        const { id_user } = request.params;
        const total = await lancamentoModel.totalGastos(id_user);

        return response.status(200).json(total);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}

const listarLancamentosDoMes = async (request, response) => {
    try {
        const { id_user, mes, ano } = request.params;

        console.log(id_user, mes, ano);
        const lancamentos = await lancamentoModel.listarLancamentosDoMes(id_user, mes, ano);

        return response.status(200).json(lancamentos);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}

module.exports = {
    addTransaction,
    totalGastos,
    listarLancamentosDoMes
}