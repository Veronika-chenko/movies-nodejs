const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid')
const { Movie } = require('../models/movie');
const { HttpError } = require('../helpers/errorHandler');

async function getMovies(req, res) {
    const { page, limit = 5} = req.query;
    const skip = (page - 1) * limit;

    const movies = await Movie.find({}).skip(skip).limit(limit); 
    res.json(movies);
}

async function getMovieById(req, res, next) {
    const { id } = req.params; 
    const movie = await Movie.findById(id);
    if (!movie) {
        return next(HttpError(404, "Movie not found"));
    }
    res.json(movie);
}

async function addMovie (req, res) {
    const { title, favorite } = req.body;
    const newMovie = await Movie.create({
        title,
        favorite,
    });

    res.status(201).json(newMovie);
}

async function deleteMovie (req, res, next) {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
        return next(HttpError(404, "Movie not found"));
    }
    await Movie.findByIdAndRemove(id);

    res.status(204).json({});
}

async function updateMovieStatus(req, res) {
    const { id } = req.params;
    const movie = await Movie.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    );
    if (!movie) {
        return res.status(404).json({ "message": "Contact not found" });
    }

    res.json(movie);
}

async function uploadImage(req, res) {
    const { originalname } = req.file;
    
    const [extention] = originalname.split('.').reverse();
    const newName = `${uuidv4()}.${extention}`;
    const tmpPath = path.resolve(__dirname, '../../tmp', originalname);
    const publicPath = path.resolve(__dirname, '../../public', newName);
    
    try {
        await fs.rename(tmpPath, publicPath);
    } catch (error) {
        await fs.unlink(tmpPath);
        throw error;
    }

    const movieId = req.params.id;

    const imagePath = `/public/${newName}`;
    const movie = await Movie.findByIdAndUpdate(movieId, {
        image: imagePath,
    }, { new: true });
    
    return res.json({
        data: {
            image: movie.image,
        },
    });
}


module.exports = {
    getMovies,
    getMovieById,
    addMovie,
    deleteMovie,
    updateMovieStatus,
    uploadImage
}