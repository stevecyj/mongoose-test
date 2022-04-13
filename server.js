const http = require("http");
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

// schema
const roomSchema = new mongoose.Schema(
  {
    name: String,
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    rating: Number,
  },
  { versionKey: false }
);

// model
const Room = mongoose.model("Room", roomSchema);

// 實體
const testRoom = new Room({
  name: "海景套房4",
  price: 200,
  rating: 4.5,
});

// 新增資料
testRoom
  .save()
  .then(() => {
    console.log("新增資料成功");
  })
  .catch((err) => {
    console.log(err.errors.price.properties.message);
  });

const requestListener = (req, res) => {
  console.log(req.url);
  res.end();
};

const server = http.createServer(requestListener);
server.listen(3005);
