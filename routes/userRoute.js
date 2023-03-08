const express = require("express");
const {
  registerUser,
  loginUser,
  findUser,
} = require("../controllers/userController.js");

//router
const router = express.Router();

//routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/find/:userId", findUser);

module.exports = router;
