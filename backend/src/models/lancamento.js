const prisma = require('../../lib/prisma.js');

const addTransaction = async (id_user, id_categoria, saida, valor) => {
    const lancamento = await prisma.lancamentos.create({
        data: {
            id_user,
            id_categoria,
            saida,
            valor
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