const http = require("http");
const headers = require("./headers");
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
// Room.create({
//   name: "海景套房-module",
//   price: 200,
//   rating: 4.5,
// })
//   .then(() => {
//     console.log("create success");
//   })
//   .catch((err) => {
//     console.log(err.errors);
//   });

const requestListener = async (req, res) => {
  if (req.url == "/rooms" && req.method == "GET") {
    const rooms = await Room.find();
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: "success",
        rooms,
      })
    );
    res.end();
  }
};

const server = http.createServer(requestListener);
server.listen(3005);
