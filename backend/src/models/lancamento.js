const prisma = require('../../lib/prisma.js');

const addTransaction = async (id_user, id_categoria, id_meta, saida, valor, descricao) => {
    const lancamento = await prisma.lancamentos.create({
        data: {
            id_user,
            id_categoria,
            id_meta,
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

const listarLancamentosDoMes = async (id_user, mes, ano) => {
    const parsedUserId = parseInt(id_user, 10);
    const parsedMes = parseInt(mes, 10);
    const parsedAno = parseInt(ano, 10);

    const lancamentos = await prisma.lancamentos.findMany({
        where: {
            id_user: parsedUserId,
            created_at: {
                gte: new Date(parsedAno, parsedMes - 1, 1), // Maior ou igual ao primeiro dia do mês
                lt: new Date(parsedAno, parsedMes, 1) // Menor que o primeiro dia do próximo mês
            }
        }
    });

    return lancamentos;
}

module.exports = {
    addTransaction,
    totalGastos,
    listarLancamentosDoMes
}