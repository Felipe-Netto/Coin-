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
    findUserByToken
};