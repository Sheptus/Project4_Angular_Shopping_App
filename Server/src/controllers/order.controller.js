/* -------------------------------------------------------------------------- */
/*                              Order Controller                              */
/* -------------------------------------------------------------------------- */

const Order = require("../models/Order");
const CartInfo = require("../models/CartInfo");

exports.createOrder = async (req, res) => {
  const { user, cart, price, city, street, dateOfOrder, card } = req.body;
  console.log("ORDER BODY = ", req.body);
  try {
    const newOrder = await Order.create({
      user,
      cart,
      price,
      city,
      street,
      dateOfOrder,
      card,
    });
    res.status(200).json(newOrder);
  } catch (e) {
    res.status(400).json(e);
  }
};

exports.amountOfOrders = async (req, res) => {
  try {
    const orders = await Order.countDocuments({});
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json(e);
  }
};

// exports.createReception = async (req, res) => {
// 	const fs = require('fs');
// 	const { id } = req.params;
// 	try {
// 		const order = await Order.findById({ _id: id });
// 		const cart = await CartInfo.findById({cartID: })
// 		fs.writeFile('./reception.txt', order, (err) => {
// 			if (err) res.status(200).json({ msg: 'file saved' });
// 		});
// 	} catch (e) {
// 		res.status(401).json(e);
// 	}
// };
