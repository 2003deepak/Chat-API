// In indexRouter.js (routes)
const express = require('express');
const router = express.Router();

// Import Controllers
const register = require("../controllers/IndexController/register");
const login = require("../controllers/IndexController/login");
const googleLogin = require("../controllers/IndexController/googleLogin");

router.get('/', (req, res) => {
    res.send('Welcome to User API');
});

// Controller to Register new user
router.post("/register", register);

// Controller for user login
router.post("/login", login);

// Correct the route for Google login
router.post("/google-login", googleLogin);  

module.exports = router;
