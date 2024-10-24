const connection = require('./connection');
const prisma = require('../../lib/prisma.js');

const getAll = async () => {
    const users = await prisma.user.findMany();
    return users;
};

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

module.exports = {
    getAll,
    createUser
};