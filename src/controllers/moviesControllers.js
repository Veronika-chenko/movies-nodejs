const { HttpError } = require('../helpers/errorHandler');

const {
    getMovies,
    getMovieById,
    addMovie,
    removeMovie
} = require("../services")

async function getMoviesController(req, res) {
    const { limit } = req.query;
    const movies = await getMovies({limit})
    res.json(movies)
}

async function getMovieByIdController(req, res, next) {
    const { id } = req.params; 
    const movie = await getMovieById(id);
    if (!movie) {
        return next(HttpError(404, "Movie not found"))
    }
    res.json(movie)
}

async function addMovieController (req, res) {
    const { title } = req.body;
    const newMovie = await addMovie(title)
    res.status(201).json(newMovie)
}

async function deleteMovieController (req, res, next) {
    const { id } = req.params;
    const movie = await getMovieById(id);
    if (!movie) {
        return next(HttpError(404, "Movie not found"))
    }
    await removeMovie(id)

    res.status(204).json({})
}

module.exports = {
    getMoviesController,
    getMovieByIdController,
    addMovieController,
    deleteMovieController
}