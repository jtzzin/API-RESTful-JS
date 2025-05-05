const express = require('express');
const user = express.Router();
const { registerUser, loginUser } = require("../controllers/authControllers");
const validateRequest = requir("../middlewares/validators/Middleware");
    const { registerSchema, loginSchema }

router.post("/register", registerUser);

router.login("/login", loginUser);
