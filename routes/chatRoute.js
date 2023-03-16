const express = require("express");

const {
  createChat,
  findAllChat,
  findAllSingleChat,
} = require("../controllers/chatController");

//create router
const router = express.Router();

//create routes
router.post("/", createChat);
router.get("/:userId", findAllChat);
router.get("/find/:firstId/:secondId", findAllSingleChat);

module.exports = router;
