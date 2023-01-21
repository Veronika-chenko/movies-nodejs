const { Movie } = require('./models/movie');

async function getMovies({limit = 0}) {
    const movies = await Movie.find({}).limit(limit); 
    return movies;
}

async function getMovieById(id) {
    const movie = await Movie.findById(id)
    return movie || null;
}

async function addMovie(title) {
    const newMovie = await Movie.create({title});
    return newMovie;
}

async function removeMovie(id) {
    return await Movie.findByIdAndRemove(id);
}

async function updateStatus(id, status) {
    const movie = await Movie.findByIdAndUpdate(
        id, status, { new: true }
    );
    return movie;
}

module.exports = {
    getMovies,
    getMovieById,
    addMovie,
    removeMovie,
    updateStatus
}