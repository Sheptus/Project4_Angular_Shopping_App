/* -------------------------------------------------------------------------- */
/*                                 Car Router                                 */
/* -------------------------------------------------------------------------- */

const { Router } = require("express");
const router = Router();
const cartController = require("../controllers/cart.controller");

router.post("/", cartController.createCart);
router.post("/addProduct", cartController.addProductToCart);
router.get("/", cartController.getCartProducts);
router.get("/:cartId", cartController.getCartProductsByID);
router.get("/totalPrice/:id", cartController.getTotalPrice);
router.delete("/", cartController.deleteCartProduct);

module.exports = router;
