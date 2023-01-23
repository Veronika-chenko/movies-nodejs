const express = require('express');
const { tryCatchWrapper } = require('../../helpers/errorHandler');

const {
    registerController,
    loginController
} = require('../../controllers/authControllers');

const authRouter = express.Router();

authRouter.post('/register', tryCatchWrapper(registerController));
authRouter.get('/login', tryCatchWrapper(loginController));


module.exports = {
    authRouter
}