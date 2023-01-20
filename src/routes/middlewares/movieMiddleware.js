const { addMovieSchema } = require('../../utils/validation/movieSchema');

function validateMovie(req, res, next) {
    const schema = addMovieSchema;
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    };

    next();
}

module.exports = {
    validateMovie
}