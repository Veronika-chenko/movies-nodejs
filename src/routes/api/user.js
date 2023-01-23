const express = require('express');
const userRouter = express.Router();

const { tryCatchWrapper } = require('../../helpers/errorHandler');
const { auth } = require('../middlewares/movieMiddleware');

const {
    createMovie,
    getMovies,
    getCurrentUser
} = require('../../controllers/userController');

userRouter.get('/movies', tryCatchWrapper(auth), tryCatchWrapper(getMovies));
userRouter.post('/movies', tryCatchWrapper(auth), tryCatchWrapper(createMovie));
userRouter.get('/me', tryCatchWrapper(auth), tryCatchWrapper(getCurrentUser));

module.exports = {
    userRouter,
};