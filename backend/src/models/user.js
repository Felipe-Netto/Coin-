const prisma = require('../../lib/prisma.js');

const createUser = async (name, email, password) => {
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    });

    return user;
}

const findUser = async (email, password) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
            password: password
        }
    });

    return user;
}

const findUserByToken = async (token) => {
    const user = await prisma.user.findUnique({
        where: {
            token: token
        }
    });

    return user;
};

module.exports = {
    createUser,
    findUser,
    findUserByToken
};