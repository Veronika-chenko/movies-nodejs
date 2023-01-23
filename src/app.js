const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { moviesRouter } = require('./routes/api/movies')
const { authRouter } = require('./routes/api/auth');
const { userRouter } = require('./routes/api/user');

const app = express();

//  middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//  routes
app.use("/api/movies", moviesRouter)
app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)


// 404
app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
})

//  error handling
app.use((err, req, res, next) => {
    // handle mongoose validation error
    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: err.message,
        });
    };
    console.log("API Error in app:", err.message, err.name)
    // handle ObjectId validation
    if (err.message.includes("Cast to ObjectId failed for value")) {
        console.log(2)
        return res.status(400).json({
            message: "id is invalid"
        });
    }
    
    if (err.status) {
        return res.status(err.status).json({
            message: err.message
        })
    };
    
    res.status(500).json({message: "Internal server error"})
})

module.exports = {
    app
}
