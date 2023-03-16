const chatModel = require("../models/chatModel");

//create chat
const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;

  try {
    const chat = await chatModel.findOne({
      membars: { $all: [firstId, secondId] },
    });

    //if chat is available
    if (chat) {
      res.status(200).json(chat);
    }

    //if chat is not available, then
    const newChat = await chatModel.create({
      membars: [firstId, secondId],
    });
    res.status(200).json(newChat);
  } catch (err) {
    res.status(500).json(err);
  }
};

//find all chats
const findAllChat = async (req, res) => {
  const { userId } = req.params;

  try {
    const chats = await chatModel.find({
      membars: { $in: [userId] },
    });
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json(err);
  }
};

//find a single chat
const findAllSingleChat = async (req, res) => {
  const { firstId, secondId } = req.params;

  try {
    const chat = await chatModel.find({
      membars: { $all: [firstId, secondId] },
    });
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { createChat, findAllChat, findAllSingleChat };
