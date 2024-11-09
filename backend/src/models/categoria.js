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

const listTopCategories = async (limit = 4, id_user) => {
    const categories = await prisma.categorias.findMany({
        include: {
            lancamentos: {
                select: {
                    valor: true,
                    id_user: true
                },
                where: {
                    saida: true,
                    id_user: parseInt(id_user, 10) // Converte id_user para inteiro
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

    const topCategories = categoriesWithTotals.sort((a, b) => b.totalGastos - a.totalGastos).slice(0, limit);

    return topCategories;
}

module.exports = {
    addCategory,
    listCategories,
    listTopCategories
}