const Joi = require('joi');

const addMovieSchema = Joi.object({
    title: Joi.string().min(3).required(),
    favorite: Joi.boolean()
})

const updateMovieStatus = Joi.object({
    favorite: Joi.boolean().required()
})

module.exports = {
    addMovieSchema,
    updateMovieStatus
}