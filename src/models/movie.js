const mongoose = require('mongoose');

const movieSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const Movie = mongoose.model('movie', movieSchema);

module.exports = {
    Movie
}