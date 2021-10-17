/* -------------------------------------------------------------------------- */
/*                                 Test Router                                */
/* -------------------------------------------------------------------------- */

const { Router } = require("express");
const router = Router();
const testController = require("../controllers/test.controller");

router.get("/category", testController.getAllCategory);
router.post("/category", testController.categoryCreate);
router.post("/product", testController.productCreate);
router.get("/product", testController.getAllProducts);
router.post("/cart", testController.createCart);
router.get("/cart/:id", testController.checkIfExist);

module.exports = router;
