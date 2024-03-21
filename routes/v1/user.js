const express = require('express');
const { create } = require('../../controllers/user.controller');

const userRouter = express.Router();

userRouter.post('/', create);

module.exports = userRouter;
