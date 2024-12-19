const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/authenticate");

const cartController = require("../controllers/cartController");

router.get("/", authenticate, cartController.getCartByUserId);
router.post("/", authenticate, cartController.addItemToCart);
router.delete("/", authenticate, cartController.removeItemFromCart);
router.patch("/", authenticate, cartController.updateItemQuantity);
router.delete("/clear", authenticate, cartController.clearCart);

module.exports = router;
