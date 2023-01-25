const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { HttpError } = require("../helpers/errorHandler");
const { User } = require("../models/user");

async function registerController(req, res, next) {
    const { email, password } = req.body;

    try {
        const savedUser = await User.create({
            email,
            password,
        });
        
        console.log("register: ", email, password)
        res.status(201).json({
            data: {
                user: {
                    email,
                    id: savedUser._id
                },
            },
        });
        
    } catch (error) {
        if (error.message.includes('E11000 duplicate key error')) {
            throw new HttpError(409, "User with this email already exists")
        }
        throw error
    }
};

async function loginController(req, res, next) {
    const { email, password } = req.body; 
    const storedUser = await User.findOne({
        email
    })

    if (!storedUser) {
        throw new HttpError(401, "email is not valid")
    }

    const isPasswordValid = await bcrypt.compare(password, storedUser.password)
    if (!isPasswordValid) {
        throw new HttpError(401, "password is not valid")
    }

    const token = jwt.sign({id: storedUser._id}, JWT_SECRET)
    res.json({
        data: {
            token: token,
            user: {

            }
        }
    })
}


module.exports = {
    registerController,
    loginController
}