const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    respondWithJson: (res, status, data) => {
        return res.status(status).json(data);
    },
    getHashedPassword: async (password) => {
        return await bcrypt.hash(password, 10);
    },

    comparePassword: async (password, userPassword) => {
        return await bcrypt.compare(password, userPassword);
    }
    ,
    generateToken: (userData) => {
        return jwt.sign({ ...userData }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    }
};


