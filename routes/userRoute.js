const express = require("express");
const {
  registerUser,
  loginUser,
  findUser,
  findAllUsers,
} = require("../controllers/userController.js");

//router
const router = express.Router();

//routes
router.get("/", findAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/find/:userId", findUser);

module.exports = router;
