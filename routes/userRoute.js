const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateLogin } = require('../middlewares/validateLogin');
const { validateSignup } = require('../middlewares/validateSignup');

//post
router.post('/signup', validateSignup, userController.signUp);
router.post('/login', validateLogin, userController.logIn);

module.exports = router;
