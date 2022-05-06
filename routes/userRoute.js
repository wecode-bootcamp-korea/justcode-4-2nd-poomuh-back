const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { keyErrorLogIn, keyErrorSignUp } = require('../middlewares/keyError');

//post
router.post('/signup', keyErrorSignUp, userController.signUp);
router.post('/login', keyErrorLogIn, userController.logIn);

module.exports = router;
