const prisma = require('../../lib/prisma.js');

const createUser = async (nome, email, nascimento, telefone, senha) => {
    console.log('Criando usuário: ', nome, email, nascimento, telefone, senha);
    const user = await prisma.user.create({
        data: {
            nome,
            email,
            nascimento,
            telefone,
            senha
        }
    });

    return user;
}

const findUser = async (email, senha) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
            senha: senha
        }
    });

    return user;
}

const addBalance = async (id, valor) => {
    const user = await prisma.user.update({
        where: {
            id_user: id
        },
        data: {
            saldo: {
                increment: valor 
            }
        }
    });

    console.log('Adicionando saldo: ', user);

    return user;
}

const subtractBalance = async (id, valor) => {
    const user = await prisma.user.update({
        where: {
            id_user: id
        },
        data: {
            saldo: {
                decrement: valor 
            }
        }
    });

    console.log('Subtraindo saldo: ', user);

    return user;
}

const findUserByToken = async (token) => {
    console.log('Buscando token: ', token);
    const user = await prisma.user.findUnique({
        where: {
            token: token.token
        }
    });

    return user;
};

module.exports = {
    createUser,
    findUser,
    addBalance,
    subtractBalance,
    findUserByToken
};