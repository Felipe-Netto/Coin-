const { log } = require('console');
const usersModel = require('../models/user');

const findUser = async (request, response) => {
    const { email } = request.body;

    const user = await usersModel.findUser(email);

    return response.status(200).json(user);
}

const createUser = async (request, response) => {
    console.log(request.body);
    const { name, email, password } = request.body;

    const user = await usersModel.createUser(name, email, password);

    return response.status(201).json(user);
}

module.exports = {
    createUser,
    findUser
}