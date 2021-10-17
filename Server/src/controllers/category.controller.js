/* -------------------------------------------------------------------------- */
/*                             Category Controller                            */
/* -------------------------------------------------------------------------- */

const Category = require("../models/Category");

exports.getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find({}).select("type");
    res.status(200).json(categories);
  } catch (e) {
    return res.status(400).end();
  }
};
