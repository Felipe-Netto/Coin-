const usersModel = require('../models/user');
const { v4: uuid } = require('uuid');
const prisma = require('../../lib/prisma.js');

const createUser = async (request, response) => {
    console.log('Criando usuário: ', request.body);
    console.log(request.body);
    const { nome, email, nascimento, telefone, senha } = request.body;

    const userExists = await usersModel.findUser(email);

    if (userExists) {
        return response.status(409).json({ message: 'Usuário ja existente' });
    }

    const user = await usersModel.createUser(nome, email, nascimento, telefone, senha);

    return response.status(201).json(user);
}

const findUser = async (request, response) => {
    try {
        const { email, senha } = request.body;

        const user = await usersModel.findUser(email, senha);

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

const addBalance = async (request, response) => {
    try {
        const { id_user, valor } = request.body;

        const user = await usersModel.addBalance(id_user, valor);

        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.status(200).json(user);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}

const subtractBalance = async (request, response) => {
    try {
        const { id_user, valor } = request.body;

        const user = await usersModel.subtractBalance(id_user, valor);

        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.status(200).json(user);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}

const findUserByToken = async (request, response) => {
    try {
        const token = request.body;
        console.log(request);

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
    addBalance,
    subtractBalance,
    findUserByToken
}