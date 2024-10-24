const { log } = require('console');
const usersModel = require('../models/user');

const getAll = async (request, response) => {
    const users = await usersModel.getAll();

    return response.status(200).json(users);
}

const createUser = async (request, response) => {
    console.log(request.body);
    const { name, email, password } = request.body;

    const user = await usersModel.createUser(name, email, password);

    return response.status(201).json(user);
}

module.exports = {
    getAll,
    createUser
}