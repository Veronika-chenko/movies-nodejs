const { HttpError } = require("../helpers/errorHandler");
const { User } = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

async function registerController(req, res, next) {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
    try {
        const savedUser = await User.create({
            email, password: hashPassword
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
        throw new HttpError(401, "emailis not valid")
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