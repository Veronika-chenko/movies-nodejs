const express = require('express');
const moviesRouter = express.Router();

const { tryCatchWrapper } = require('../../helpers/errorHandler');
const { validateMovie, updateStatusValidation } = require('../middlewares/movieMiddleware');

const {
    getMovies,
    getMovieById,
    addMovie,
    deleteMovie,
    updateMovieStatus
} = require('../../controllers/moviesControllers');

moviesRouter.get('/', tryCatchWrapper(getMovies));
moviesRouter.get('/:id', tryCatchWrapper(getMovieById));
moviesRouter.post('/', validateMovie, tryCatchWrapper(addMovie));
moviesRouter.delete('/:id', tryCatchWrapper(deleteMovie));
moviesRouter.patch('/:id/favorite', updateStatusValidation, tryCatchWrapper(updateMovieStatus));

module.exports = {
    moviesRouter
}