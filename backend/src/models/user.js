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

const findUser = async (email) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    return user;
}

module.exports = {
    createUser,
    findUser
};