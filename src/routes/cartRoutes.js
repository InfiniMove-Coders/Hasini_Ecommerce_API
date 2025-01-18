const express = require("express");
const CartController = require("../controllers/cartController");
const { authenticate } = require("../middlewares/authenticate");

const router = express.Router();
const cartController = new CartController();

router.use(authenticate);

router.post("/add", cartController.addToCart);
router.patch("/update/:itemId", cartController.updateItemQuantity);
router.delete("/remove/:itemId", cartController.removeFromCart);
router.get("/", cartController.getCartByUser);
router.delete("/clear", cartController.clearCart);
router.post("/validate", cartController.validateCart);
module.exports = router;
