const mongoose = require("mongoose");

// schema，開頭小寫，強制加上s
const roomSchema = new mongoose.Schema(
  {
    name: String,
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    rating: Number,
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  { versionKey: false }
);

// model
const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
