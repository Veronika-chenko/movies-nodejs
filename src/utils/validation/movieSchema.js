const Joi = require('joi');

const addMovieSchema = Joi.object({
    title: Joi.string().min(3).required(),
})

module.exports = {
    addMovieSchema
}