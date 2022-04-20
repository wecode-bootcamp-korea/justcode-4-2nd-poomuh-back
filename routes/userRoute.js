const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { validateSignup } = require('../middlewares/validateSignup');

router.post('/signup', validateSignup, userController.signUp);

module.exports = router;
