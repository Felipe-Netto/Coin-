const usersModel = require('../models/user');
const { v4: uuid } = require('uuid');
const prisma = require('../../lib/prisma.js');

const createUser = async (request, response) => {
    console.log(request.body);
    const { name, email, password } = request.body;

    const user = await usersModel.createUser(name, email, password);

    return response.status(201).json(user);
}

const findUser = async (request, response) => {
    try {
        const { email, password } = request.body;

        const user = await usersModel.findUser(email, password);

        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        const token = uuid();

        await prisma.User.update({
            where: {
                id_user: user.id_user
            },
            data: {
                token: token
            }
        });

        return response.status(200).json({token, user});
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}

const findUserByToken = async (request, response) => {
    try {
        const token = request.body;
        console.log(token);

        return;
        const user = await usersModel.findUserByToken(token);

        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.status(200).json(user);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}

module.exports = {
    createUser,
    findUser,
    findUserByToken
}