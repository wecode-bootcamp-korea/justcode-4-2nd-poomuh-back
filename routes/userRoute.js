const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//post
router.post("/login", userController.logIn);

module.exports = router;
