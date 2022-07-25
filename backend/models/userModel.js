const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    username: {
        type: String,
        required: [true, 'Please add an username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add an password'],
        unique: true
    },
})

module.exports = mongoose.model('User', userSchema)