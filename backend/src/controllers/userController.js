const usersModel = require('../models/user');
const { v4: uuid } = require('uuid');

const findUser = async (request, response) => {
    try {
        const { email, password } = request.body;

        const user = await usersModel.findUser(email, password);

        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        const token = uuid();

        user.update({
            data: {
                token: token
            }
        });

        return response.status(200).json({token, user});
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
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