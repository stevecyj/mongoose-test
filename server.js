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

const requestListener = async (req, res) => {
  // body parser
  let body = "";
  req.on("data", (chunk) => {
    // console.log(chunk);
    body += chunk.toString();
  });

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
  } else if (req.url == "/rooms" && req.method == "POST") {
    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        // console.log(data);

        // create
        const newRoom = await Room.create({
          name: data.name,
          price: data.price,
          rating: data.rating,
        });

        res.writeHead(200, headers);
        res.write(
          JSON.stringify({
            status: "success",
            rooms: newRoom,
          })
        );
        res.end();
      } catch (error) {
        res.writeHead(400, headers);
        res.write(
          JSON.stringify({
            status: "false",
            message: "欄位不正確",
            error: error,
          })
        );
        // console.log(error);
        res.end();
      }
    });
  }
};

const server = http.createServer(requestListener);
server.listen(3005);
