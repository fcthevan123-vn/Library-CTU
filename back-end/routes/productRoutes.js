const router = require("express").Router();
const Product = require("../models/Product");
const User = require("../models/User");

//get products;
router.get("/", async (req, res) => {
  try {
    const sort = { _id: -1 };
    // Sắp xếp product theo thứ tự mới nhất ở đầu tiên
    const products = await Product.find().sort(sort);
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//create product
router.post("/", async (req, res) => {
  try {
    const {
      name,
      author,
      totalPage,
      publisher,
      description,
      quantity,
      category,
      images: pictures,
    } = req.body;
    const product = await Product.create({
      name,
      author,
      description,
      totalPage,
      publisher,
      quantity,
      category,
      pictures,
    });
    const products = await Product.find();
    res.status(201).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// update product

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const {
      name,
      description,
      author,
      totalPage,
      publisher,
      quantity,
      category,
      images: pictures,
    } = req.body;
    const product = await Product.findByIdAndUpdate(id, {
      name,
      description,
      author,
      totalPage,
      publisher,
      quantity,
      category,
      pictures,
    });
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// delete product

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;
  try {
    const user = await User.findById(user_id);
    if (!user.isAdmin) return res.status(401).json("Bạn không phải là admin");
    await Product.findByIdAndDelete(id);

    // Sắp xếp product theo thứ tự mới nhất ở đầu tiên
    const products = await Product.find().sort({ _id: -1 });
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// get product by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    const similar = await Product.find({ category: product.category }).limit(5);
    res.status(200).json({ product, similar });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/category/:category", async (req, res) => {
  const { category } = req.params;
  try {
    let products;
    const sort = { _id: -1 };
    if (category == "all") {
      products = await Product.find().sort(sort);
    } else {
      products = await Product.find({ category }).sort(sort);
    }
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// cart routes

router.post("/add-to-cart", async (req, res) => {
  const { userId, productId, author } = req.body;

  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart[productId] = 1;
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// remove from cart
router.post("/remove-from-cart", async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    delete userCart[productId];
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
