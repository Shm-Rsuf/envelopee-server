const express = require("express");

//router
const router = express.Router();

//routes
router.post("/register", (req, res) => {
  res.json({ message: "registration successful" });
});

module.exports = router;
