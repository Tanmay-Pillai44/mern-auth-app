const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    designation: {
        type: String,
        required: [true, 'Please add designation'],
    },
    date_of_joining: {
        type: String,
        required: [true, 'Please add date of joining'],
    },
    address: {
        type: String,
        required: [true, 'Please add address']
    },
    city: {
        type: String,
        required: [true, 'Please add a city']
    },
    date_of_birth: {
        type: String,
        required: [true, 'Please add date of birth'],
    },
    gender: {
        type: String,
        required: [true, 'Please add gender']
    },
    hobbies: {
        type: [String],
        required: [true, 'Please add hobbies']
    }
})

module.exports = mongoose.model('Employee', employeeSchema)