require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoute = require("./routes/userRoute");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");

//express app
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//endspoints
app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/messages", messageRoute);

//port
const PORT = process.env.PORT || 4000;

//connect to db
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    //listening for requests
    app.listen(PORT, (res, req) => {
      console.log(`connected to db and server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
