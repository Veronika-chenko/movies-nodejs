const { HttpError } = require('../../helpers/errorHandler');
const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
const { addMovieSchema, updateMovieStatus } = require('../../utils/validation/movieSchema');

function validateMovie(req, res, next) {
    const schema = addMovieSchema;
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    };

    next();
}

function updateStatusValidation(req, res, next) {
    const schema = updateMovieStatus;
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    };

    next();
}

async function auth(req, res, next) {
    const authHeader = req.headers.authorization || "";
    const [type, token] = authHeader.split(" ");
    
    if (type !== 'Bearer') {
        throw HttpError(401, "token type is not valid");
    };

    if (!token) {
        throw HttpError(401, "no token provided");
    };

    try {
        const { id } = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(id);

        req.user = user;
    } catch (err) {
        if (err.name === 'TokenExpiredError' || 
            err.name === 'JsonWebTokenError') {
            console.log("err name: ", err.name)
            throw HttpError(401, "jwt token is not valid");
        }
        throw err
    }

    next()
}

module.exports = {
    validateMovie,
    updateStatusValidation,
    auth,
}