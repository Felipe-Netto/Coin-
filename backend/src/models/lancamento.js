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

module.exports = {
    addTransaction,
}