/* -------------------------------------------------------------------------- */
/*                             Product Controller                             */
/* -------------------------------------------------------------------------- */

const Product = require("../models/Product");
const Category = require("../models/Category");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate("categoryID");
    const user = req.user;
    res.status(200).json(products);
  } catch (e) {
    return res.status(400).end();
  }
};

exports.searchByInput = async (req, res) => {
  try {
    const searchText = req.params.search;
    const products = await Product.find({}).populate("categoryID");
    const filtredProducts = products.filter((p) =>
      p.pName.toLowerCase().includes(searchText.toLowerCase())
    );
    res.status(200).json(filtredProducts);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.searchProductByCategory = async (req, res) => {
  try {
    const searchQuery = req.query.search;
    const products = await Product.find({}).populate("categoryID");
    const filtredProducts = products.filter(
      (p) => p.categoryID.type === searchQuery
    );
    res.status(200).json(filtredProducts);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.updateProductByID = async (req, res) => {
  console.log("BODY = ", req.body);
  const { _id, pName, price, imageURL, type, typeID } = req.body;
  try {
    const category = await Category.find({ type });
    if (!category.length) {
      const newCategory = await Category.create({ type });
      const updatedProduct = await Product.updateOne(
        { _id },
        { $set: { pName, price, imageURL, categoryID: newCategory._id } }
      );
      return res
        .status(200)
        .json({ msg: "updated, new category created", updatedProduct });
    }
    const updatedProduct = await Product.updateOne(
      { _id },
      { $set: { pName, price, imageURL } }
    );
    res
      .status(200)
      .json({ msg: "updated, no category created", updatedProduct });
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.createProduct = async (req, res) => {
  const { name, image, type, price } = req.body;
  console.log("new category body", req.body);
  try {
    const category = await Category.find({ type });

    //not found
    if (!category.length) {
      const newCategory = await Category.create({ type });

      const product = await Product.create({
        pName: name,
        imageURL: image,
        price,
        categoryID: newCategory._id,
      });
      return res.status(201).json({
        msg: "category not found, new category created",
        product,
      });
    }
    //category found
    const product = await Product.create({
      pName: name,
      imageURL: image,
      price,
      categoryID: category[0]._id,
    });
    res.status(200).json({ msg: "category found", product });
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.amountOfProducts = async (req, res) => {
  try {
    const products = await Product.countDocuments({});
    res.status(200).json(products);
  } catch (e) {
    res.status(400).json(e);
  }
};
