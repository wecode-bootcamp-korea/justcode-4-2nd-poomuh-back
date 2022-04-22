const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const { validateSignup } = require('../middlewares/validateSignup');
const { validateLogin } = require('../middlewares/validateLogin');
// const { agentValidateToken } = require("../middlewares/agentValidateToken");

//post
router.post('/signup', validateSignup, agentController.signUp);
router.post('/login', validateLogin, agentController.logIn);

module.exports = router;
