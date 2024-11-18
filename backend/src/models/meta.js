const prisma = require('../../lib/prisma.js');

const addMeta = async (id_user, nome, descricao, valor_alvo, data_alvo) => {
    const meta = await prisma.metas.create({
        data: {
            id_user,
            nome,
            descricao,
            valor_alvo,
            data_alvo: new Date(data_alvo),
        }
    });

    return meta;
}

const listMetas = async (id_user) => {
    try {
      const metas = await prisma.metas.findMany({
        where: {
          id_user: parseInt(id_user),
        },
        include: {
          lancamentos: true, // Inclui os lançamentos associados a cada meta
        },
      });
  
      const metasComQuantidade = metas.map(meta => ({
        ...meta,
        quantidade_lancamentos: meta.lancamentos.length,
      }));
  
      return metasComQuantidade;
    } catch (error) {
      throw new Error('Erro ao listar metas: ' + error.message);
    }
  };

const deleteMeta = async (id_meta) => {
    const meta = await prisma.metas.delete({
        where: {
            id_meta: parseInt(id_meta)
        }
    });

    return meta;
}

const findMetaById = async (id_meta) => {
    const meta = await prisma.metas.findUnique({
        where: {
            id_meta: parseInt(id_meta)
        }
    });

    return meta;
}

module.exports = { listMetas };

module.exports = {
    addMeta,
    listMetas,
    deleteMeta,
    findMetaById
}