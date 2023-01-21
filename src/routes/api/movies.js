const express = require('express');
const routerMovies = express.Router();

const { tryCatchWrapper } = require('../../helpers/errorHandler');
const { validateMovie, updateStatusValidation } = require('../middlewares/movieMiddleware');

const {
    getMoviesController,
    getMovieByIdController,
    addMovieController,
    deleteMovieController,
    updateMovieStatusController
} = require('../../controllers/moviesControllers');

routerMovies.get('/', tryCatchWrapper(getMoviesController));
routerMovies.get('/:id', tryCatchWrapper(getMovieByIdController));
routerMovies.post('/', validateMovie, tryCatchWrapper(addMovieController));
routerMovies.delete('/:id', tryCatchWrapper(deleteMovieController));
routerMovies.patch('/:id/favorite', updateStatusValidation, tryCatchWrapper(updateMovieStatusController));

module.exports = {
    routerMovies,
};