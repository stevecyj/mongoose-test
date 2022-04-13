const http = require("http");
const Room = require("./models/room");
const mongoose = require("mongoose");

// connect db
mongoose
  .connect("mongodb://192.168.0.100:27017/hotel")
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

// create
Room.create({
  name: "海景套房-module",
  price: 200,
  rating: 4.5,
})
  .then(() => {
    console.log("create success");
  })
  .catch((err) => {
    console.log(err.errors);
  });

const requestListener = (req, res) => {
  console.log(req.url);
  res.end();
};

const server = http.createServer(requestListener);
server.listen(3005);
