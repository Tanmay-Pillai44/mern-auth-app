const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require("../models/userModel");
const asyncHandler = require('express-async-handler')

const signupController = asyncHandler(async (req, res) => {

    const { email, username, password } = req.body

    if(!email || !username || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExists = await User.findOne({ username })

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
        email,
        username,
        password: encryptedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            email: user.email,
            username: user.username,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

const loginController = asyncHandler(async (req, res) => {

    const { username, password } = req.body

    const user = await User.findOne({ username })

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            email: user.email,
            username: user.username,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

const userController = asyncHandler(async (req, res) => {
    // const { _id, email, username } = await User.findById(req.user.id)
    // res.status(200).json({
    //     id: _id,
    //     email,
    //     username
    // })

    // user already found in middleware
    res.status(200).json(req.user)
})


module.exports = {
    signupController,
    loginController,
    userController
}