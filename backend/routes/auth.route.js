const express = require("express")
const authRoutes = express.Router();
const { signupController, loginController, userController } = require("../controllers/auth.controller")
const { protect } = require('../middlewares/auth.middleware')

authRoutes.post('/signup', signupController);
authRoutes.post('/login', loginController);
authRoutes.get('/users/me', protect, userController)

module.exports = authRoutes;