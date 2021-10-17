/* -------------------------------------------------------------------------- */
/*                               Product Router                               */
/* -------------------------------------------------------------------------- */

const { Router } = require("express");
const router = Router();
const productController = require("../controllers/product.controller");

router.get("/", productController.getAllProducts);
router.get("/s/c", productController.searchProductByCategory);
router.get("/:search", productController.searchByInput);
router.get("/t/p", productController.amountOfProducts);
router.put("/", productController.updateProductByID);
router.post("/", productController.createProduct);

module.exports = router;
