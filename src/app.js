const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { routerMovies } = require('./routes/api/movies');

const app = express();

//  middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//  routes
app.use("/api/movies", routerMovies)

// 404
app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
})

//  error handling
app.use((err, req, res, next) => {
    if (err.status) {
        return res.status(err.status).json({
            message: err.message
        })
    }
    if (err.message.includes("Cast to ObjectId failed for value")) {
        console.log(2)
        return res.status(400).json({
            message: "id is invalid"
        });
    }
    console.log("API Error:", err.message)

    res.status(500).json({message: "Internal server error"})
})

module.exports = {
    app
}
