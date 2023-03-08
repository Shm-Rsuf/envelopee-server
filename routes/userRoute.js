const express = require("express");
const { registerUser } = require("../controllers/userController.js");

//router
const router = express.Router();

//routes
router.post("/register", registerUser);

module.exports = router;
