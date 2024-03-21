const httpStatus = require('http-status');
const { generateToken, respondWithJson, comparePassword } = require("../utils/helper");
const { loginUser } = require('../services/user.service');
const bcrypt = require('bcryptjs');


module.exports = {

    // Login a user
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if the user exists
            const data = await loginUser({ email, password });

            if (!data) {
                return respondWithJson(res, httpStatus.NOT_FOUND, { error: 'User not found' });
            }
            // Send the response
            return respondWithJson(res, httpStatus.OK, { data });

        } catch (error) {
            console.log('error', error?.message);
            respondWithJson(res, httpStatus.BAD_REQUEST, { message: "Internal Server Error", error: error?.message })
        }
    },



};

