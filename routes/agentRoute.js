const express = require('express');
const router = express.Router();

const agentController = require('../controllers/agentController');
const { validateSignup } = require('../middlewares/validateSignup');

router.post('/signup', validateSignup, agentController.signUp);

module.exports = router;
