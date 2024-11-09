const prisma = require('../../lib/prisma.js');

const addTransaction = async (id_user, id_categoria, saida, valor, descricao) => {
    const lancamento = await prisma.lancamentos.create({
        data: {
            id_user,
            id_categoria,
            saida,
            valor,
            descricao
        }
    });

    await prisma.user.update({
        where: { id_user: id_user },
        data: {
            saldo: saida ? { decrement: valor } : { increment: valor }
        }
    });

    return lancamento;
}

const totalGastos = async (id_user) => {
    const lancamentos = await prisma.lancamentos.findMany({
        where: {
            id_user: parseInt(id_user, 10),
            saida: true
        }
    });

    const totalGastos = lancamentos.reduce((acc, lancamento) => acc + Number(lancamento.valor), 0);

    return totalGastos;
}

module.exports = {
    addTransaction,
    totalGastos
}