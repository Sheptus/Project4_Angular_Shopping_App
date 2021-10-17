/* -------------------------------------------------------------------------- */
/*                               Category Router                              */
/* -------------------------------------------------------------------------- */

const { Router } = require("express");
const router = Router();
const categoryController = require("../controllers/category.controller");

router.get("/", categoryController.getAllCategory);

module.exports = router;
