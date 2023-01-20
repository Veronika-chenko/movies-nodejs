const express = require('express');
const routerMovies = express.Router();

const { tryCatchWrapper } = require('../../helpers/errorHandler');
const { validateMovie } = require('../middlewares/movieMiddleware');

const {
    getMoviesController,
    getMovieByIdController,
    addMovieController,
    deleteMovieController
} = require('../../controllers/moviesControllers');

routerMovies.get('/', tryCatchWrapper(getMoviesController));
routerMovies.get('/:id', tryCatchWrapper(getMovieByIdController));
routerMovies.post('/', validateMovie, tryCatchWrapper(addMovieController));
routerMovies.delete('/:id', tryCatchWrapper(deleteMovieController));

module.exports = {
    routerMovies,
};