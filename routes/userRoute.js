const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { validateLogin } = require("../middleware/validateLogin");

//post
router.post("/login", validateLogin, userController.logIn);

module.exports = router;
