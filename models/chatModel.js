const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    membars: Array,
  },
  {
    timestamps: true,
  }
);

const chatModel = mongoose.model("Chat", chatSchema);

module.exports = chatModel;
