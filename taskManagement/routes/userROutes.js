const express = require('express');
const userRouter = express.Router();
const { createUser, loginUser } = require('../controller/userController');

userRouter.post('/signUp', createUser);
userRouter.post('/login', loginUser);

module.exports = userRouter;
