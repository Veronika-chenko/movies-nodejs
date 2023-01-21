const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const { app } = require('./src/app');
mongoose.set("strictQuery", false);

const { HOST_URI } = process.env;
const PORT = 8081;
    
(async function () {
    try {
        await mongoose.connect(HOST_URI)
        console.log("contacted to db")
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        })
    } catch (error) {
        console.log("Server failed", error.message)
    }
})();
