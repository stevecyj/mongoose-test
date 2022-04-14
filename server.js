const http = require("http");
const headers = require("./headers");
const Room = require("./models/room");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

// console.log(process.env.PORT);

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

// connect db
mongoose
  .connect(DB)
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
  } else if (req.url == "/rooms" && req.method == "DELETE") {
    const rooms = await Room.deleteMany({});
    res.writeHead(200, headers);
    res.write(JSON.stringify({ status: "success", rooms: [] }));
    res.end();
  } else if (req.method == "OPTIONS") {
    res.writeHead(200, headers);
    res.end();
  } else {
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({
        status: "false",
        message: "無此網站路由",
      })
    );
    res.end();
  }
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT);
