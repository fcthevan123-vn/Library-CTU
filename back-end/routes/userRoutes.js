const router = require("express").Router();
const User = require("../models/User");
const Order = require("../models/Order");

// Sing Up
// Use async, await for get data
router.post("/signup", async (req, res) => {
  const { name, email, studentID, password } = req.body;
  try {
    // Check if studentID is already exists
    const existingUser = await User.findOne({ studentID: studentID });
    if (existingUser) {
      return res.status(400).send("Mã số sinh viên đã tồn tại!");
    }
    const user = await User.create({ name, email, password, studentID });
    // convert to JSON
    res.json(user);
  } catch (e) {
    if (e.code === 11000) return res.status(400).send("Email đã tồn tại");
    res.status(400).send(e.message);
  }
});

// login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    res.json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// get users;

router.get("/", async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }).populate("orders");
    res.json(users);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// get user orders

router.get("/:id/orders", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("orders");
    res.json(user.orders);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
