const express = require('express');
const userRouter = require('./user');
const authRouter = require('./auth');
const universityRouter = require('./university');


const router = express.Router();


router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/university', universityRouter);
module.exports = router;
