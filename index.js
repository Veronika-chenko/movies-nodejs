const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { routerMovies } = require('./src/routes/api/movies');

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
    console.log("API Error:", err.message)

    res.status(500).json({message: "Internal server error"})
})

const PORT = 8081

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})