const mongoose = require("mongoose");

// Format date
const formattedDate = new Date()
  .toLocaleString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
  .replace(/(\d+)\/(\d+)\/(\d+)/, "$2/$1/$3");

// Data
const OrderSchema = mongoose.Schema(
  {
    products: {
      type: Object,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "Đang xử lý",
    },
    count: {
      type: Number,
      default: 0,
    },
    date: {
      type: String,
      default: formattedDate,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    ship: {
      type: Boolean,
      default: false,
    },
    returnDate: {
      type: String,
      default: "",
    },
    takeBookDate: {
      type: String,
      default: "",
    },
  },
  { minimize: false }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
