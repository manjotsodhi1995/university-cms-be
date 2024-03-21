const httpStatus = require('http-status');
const { createUser, getUserByEmail } = require('../services/user.service');
const { respondWithJson } = require('../utils/helper');

module.exports = {
    create: async (req, res) => {
        try {
            const { body } = req;
            const existingUser = await getUserByEmail(body.email);

            if (existingUser) {
                throw new Error('User already exists');
            }
            const result = await createUser(body);
            respondWithJson(res, httpStatus.CREATED, { message: 'User created successfully', data: result.data, token: result.token });

        } catch (error) {
            if (error.message === 'User already exists') {
                console.log('error', error?.message);
                respondWithJson(res, httpStatus.CONFLICT, { message: 'User already exists' })
            }
            console.log('error', error?.message);

            respondWithJson(res, httpStatus.BAD_REQUEST, { message: "Internal Server Error", error: error?.message })

        }
    }
};
