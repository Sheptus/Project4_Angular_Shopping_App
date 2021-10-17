/* -------------------------------------------------------------------------- */
/*                                 Auth Route                                 */
/* -------------------------------------------------------------------------- */

const { Router } = require("express");
const router = Router();

const authController = require("../controllers/auth.controller");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/username", authController.verifyUser);
router.get("/user/:id", authController.getLoggedUser);

module.exports = router;
