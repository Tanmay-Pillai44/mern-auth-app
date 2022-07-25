const asyncHandler = require('express-async-handler')
const Employee = require('../models/employeeModel')



const showEmployeesController = asyncHandler(async (req, res) => {

    const employees = await Employee.find()

    res.status(200).json(employees)
})

const addEmployeeController = asyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const employee = await Employee.create({
        name: req.body.name,
        designation: req.body.designation,
        date_of_joining: req.body.date_of_joining,
        address: req.body.address,
        city: req.body.city,
        date_of_birth: req.body.date_of_birth,
        gender: req.body.gender,
        hobbies: req.body.hobbies
    })

    res.status(200).json(employee)
})

const editEmployeeController = asyncHandler(async (req, res) => {

    const employee = await Employee.findById(req.params.id)

    if(!employee) {
        res.status(400)
        throw new Error('Employee not found')
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedEmployee)
})

const deleteEmployeeController = asyncHandler(async (req, res) => {

    const employee = await Employee.findById(req.params.id)

    if(!employee) {
        res.status(400)
        throw new Error('Employee not found')
    }

    await employee.remove()

    res.status(200).json({ id: req.params.id })
})


module.exports = {
    showEmployeesController,
    addEmployeeController,
    editEmployeeController,
    deleteEmployeeController
}