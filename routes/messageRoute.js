const express = require("express");
const {
  createMessage,
  getMessages,
} = require("../controllers/messageController");

//create router
const router = express.Router();

//create route
router.post("/", createMessage);
router.get("/:chatId", getMessages);

module.exports = router;
