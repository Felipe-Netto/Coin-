const prisma = require('../../lib/prisma.js');

const addCategory = async (nome, descricao) => {
    const category = await prisma.categorias.create({
        data: {
            nome,
            descricao
        }
    });

    return category;
}

const listCategories = async () => {
    const categories = await prisma.categorias.findMany({
        include: {
            lancamentos: {
                select: {
                    valor: true,
                },
                where: {
                    saida: true,
                }
            }
        }
    });

    const categoriesWithTotals = categories.map(category => {
        const totalGastos = category.lancamentos?.reduce((acc, lancamento) => acc + Number(lancamento.valor), 0) || 0;
        return {
            id_categoria: category.id_categoria,
            nome: category.nome,
            descricao: category.descricao,
            totalGastos: totalGastos
        };
    });
    

    return categoriesWithTotals;
}

module.exports = {
    addCategory,
    listCategories
}