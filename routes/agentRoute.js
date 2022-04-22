const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const { validateSignup } = require('../middlewares/validateSignup');
const { validateLogin } = require('../middleware/validateLogin');
// const { agentValidateToken } = require("../middleware/agentValidateToken");

//post
router.post('/signup', validateSignup, agentController.signUp);
router.post('/login', validateLogin, agentController.logIn);

module.exports = router;
