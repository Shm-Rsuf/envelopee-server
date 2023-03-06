require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//express app
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//port
const PORT = process.env.PORT || 4000;

//routes

app.get("/", (req, res) => {
  res.json({ message: "respose successfull" });
});

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
