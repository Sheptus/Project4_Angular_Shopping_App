const Category = require("../models/Category");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

exports.getAllCategories = async (req, res) => {
  try {
    const ids = await Category.find({ type: "milk" }).select("_id");
    res.json(ids);
  } catch (e) {
    res.json({ e });
  }
};

exports.categoryCreate = async (req, res) => {
  const { type } = req.body;
  try {
    const category = await Category.create({
      type,
    });
    res.json({ category });
  } catch (e) {
    res.json({ e });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const p = await Product.find({});
    res.json({ products: p, user: req.user });
  } catch (e) {
    res.json(e);
  }
};

exports.productCreate = async (req, res) => {
  const { pName, categoryID, cost, imageURL } = req.body;
  try {
    const product = await Product.create({
      pName,
      categoryID,
      cost,
      imageURL,
    });
    res.json({ product });
  } catch (e) {
    res.json({ e });
  }
};

exports.createCart = async (req, res) => {
  const { userID } = req.body;
  try {
    const cart = await Cart.create({ userID });
    res.json(cart);
  } catch (e) {
    res.json(e);
  }
};

exports.checkIfExist = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Cart.find({ userID: id });
    const [result] = user;
    if (user[0].completed) console.log(" completed");
    else console.log("not completed");
    res.json(result.completed);
  } catch (e) {
    res.json([]);
  }
};
