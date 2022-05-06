const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const { keyErrorLogIn, keyErrorSignUp } = require('../middlewares/keyError');
// const { agentValidateToken } = require("../middlewares/agentValidateToken");

//post
router.post('/signup', keyErrorSignUp, agentController.signUp);
router.post('/login', keyErrorLogIn, agentController.logIn);

module.exports = router;
