/* -------------------------------------------------------------------------- */
/*                                Order Router                                */
/* -------------------------------------------------------------------------- */

const { Router } = require("express");
const router = Router();

const orderController = require("../controllers/order.controller");

router.get("/t/o", orderController.amountOfOrders);
router.post("/", orderController.createOrder);
// router.get('/', orderController.createReception);

module.exports = router;
