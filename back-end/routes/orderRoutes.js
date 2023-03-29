const router = require("express").Router();
const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");

//creating an order
router.post("/", async (req, res) => {
  const { userId, cart, phone, address } = req.body;
  const { returnDate, takeBookDate, ship } = req.body;
  try {
    const user = await User.findById(userId);
    const arrayCart = Object.keys(cart);
    const order = await Order.create({
      owner: user._id,
      products: cart,
      phone,
      address,
      returnDate,
      takeBookDate,
      ship,
    });
    arrayCart.map(async (product_id) => {
      const product = await Product.findById(product_id);
      product.quantity -= cart[product_id];
      await product.save();
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
    // get owner object contain email, name, studentID, order fields
    const orders = await Order.find().populate("owner", [
      "email",
      "name",
      "studentID",
      "orders",
    ]);
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

//shipping order

router.patch("/:id/mark-shipped", async (req, res) => {
  const { ownerId } = req.body;
  const { id } = req.params;
  try {
    const user = await User.findById(ownerId);
    await Order.findByIdAndUpdate(id, { status: "Sách đã được gửi đi" });
    const orders = await Order.find().populate("owner", [
      "email",
      "name",
      "studentID",
    ]);
    await user.save();
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json(e.message);
  }
});
module.exports = router;
