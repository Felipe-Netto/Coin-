const metaModel = require('../models/meta');

const addMeta = async (request, response) => {
    try {
        const { id_user, nome, descricao, valor_alvo, data_alvo } = request.body;
        const data_alvo_formatada = new Date(data_alvo);


        const meta = await metaModel.addMeta(id_user, nome, descricao, valor_alvo, data_alvo_formatada);

        return response.status(201).json(meta);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

const listMetas = async (request, response) => {
    try {
        const { id_user } = request.params;

        const metas = await metaModel.listMetas(id_user);
        
        return response.status(200).json(metas);
    } catch (error) {
        console.log('Erro ao listar metas: ', error);
        return response.status(500).json({ error: error.message });
    }
}

const deleteMeta = async (request, response) => {
    try {
        const { id_meta } = request.params;

        const meta = await metaModel.deleteMeta(id_meta);

        return response.status(200).json(meta);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

const findMetaById = async (request, response) => {
    try {
        const { id_meta } = request.params;

        const meta = await metaModel.findMetaById(id_meta);

        return response.status(200).json(meta);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

module.exports = {
    addMeta,
    listMetas,
    deleteMeta,
    findMetaById
}