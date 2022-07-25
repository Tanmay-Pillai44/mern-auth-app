const express = require("express");
const { showEmployeesController, addEmployeeController, editEmployeeController, deleteEmployeeController } = require("../controllers/employees.controller");
const { protect } = require("../middlewares/auth.middleware");

const employeesRoutes = express.Router();

employeesRoutes.route('/').get(protect, showEmployeesController).post(protect, addEmployeeController)

employeesRoutes.route('/:id').put(protect, editEmployeeController).delete(protect, deleteEmployeeController)

module.exports = employeesRoutes;