const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        match: [/[a-z0-9]+@[a-z0-9]+/, "useremail is not valid"],
    },
    password: {
        type: String,
        minLength: [6, "password should be at least 6 characters long"],
    },
    movies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "movie",
        },
    ],
},
    {
        versionKey: false,
        timestamps: true,
    }
);

schema.pre("save", async function() {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword;
})


const User = mongoose.model("user", schema);

module.exports = {
    User,
};