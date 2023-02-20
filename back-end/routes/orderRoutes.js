const router = require("express").Router();
const Order = require("../models/Order");
const User = require("../models/User");

//creating an order
router.post("/", async (req, res) => {
  const { userId, cart, phone, address } = req.body;
  const { returnDate, takeBookDate, ship } = req.body;
  try {
    const user = await User.findById(userId);
    const order = await Order.create({
      owner: user._id,
      products: cart,
      phone,
      address,
      returnDate,
      takeBookDate,
      ship,
    });
    order.count = user.cart.length;
    await order.save();
    user.cart = {};
    user.orders.push(order);
    user.markModified("orders");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

// getting all orders;
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("owner", ["email", "name"]);
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

//shipping order

router.patch("/:id/mark-shipped", async (req, res) => {
  const io = req.app.get("socketio");
  const { ownerId } = req.body;
  const { id } = req.params;
  try {
    const user = await User.findById(ownerId);
    await Order.findByIdAndUpdate(id, { status: "shipped" });
    const orders = await Order.find().populate("owner", ["email", "name"]);
    const notification = {
      status: "unread",
      message: `Order ${id} shipped with success`,
      time: new Date(),
    };
    io.sockets.emit("notification", notification, ownerId);
    user.notifications.push(notification);
    await user.save();
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json(e.message);
  }
});
module.exports = router;
